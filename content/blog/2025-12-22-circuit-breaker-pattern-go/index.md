---
title: "Circuit Breaker Pattern in Go (with a Practical Implementation)"
date: "2025-12-22"
slug: "circuit-breaker-pattern-go"
featuredImage: "./cover.jpg"
excerpt: "Build a thread-safe circuit breaker in Go, understand the Closed/Open/Half-Open state machine, and learn the production-grade considerations that make it reliable."
tags: ["golang", "backend", "resilience", "microservices"]
technologies: ["Go", "Concurrency", "Distributed Systems"]
---

# Circuit Breaker Pattern in Go (with a Practical Implementation)

In distributed systems, we inevitably depend on things we don't control: external APIs, databases, queues, and networks. When one dependency becomes slow or unavailable, naive retries can turn a single failure into **cascading failure**.

The **Circuit Breaker** pattern protects your system by **failing fast** when a dependency is unhealthy, and by **probing for recovery** after a cooldown.

## The problem it solves

When a downstream service is degraded, your application can:

- Waste CPU and goroutines retrying doomed requests
- Exhaust connection pools and timeouts
- Increase latency for healthy requests
- Accidentally DoS an already struggling dependency

Circuit breakers add a lightweight state machine in front of the risky call to prevent repeated failures.

## How a circuit breaker works (3 states)

### 1) Closed (normal)

- Requests are allowed through.
- Failures are monitored.
- When failures exceed a threshold, the breaker **trips** to Open.

### 2) Open (fail fast)

- Requests fail immediately without calling the dependency.
- After a **timeout**, the breaker transitions to Half-Open.

### 3) Half-Open (probe recovery)

- A limited number of requests are allowed as probes.
- If probes succeed, the breaker returns to Closed.
- If a probe fails, the breaker goes back to Open.

### State transition diagram

```text
    [Closed] --failure threshold--> [Open]
        ^                             |
        |                             |
     success                      timeout elapsed
        |                             |
        v                             v
    [Half-Open] --failure--> [Open]
```

## Implementation concepts in Go

These are the non-negotiables for a circuit breaker in a Go service:

- **Thread safety**: the breaker is shared across goroutines.
- **Metrics**: you need counters to decide when to trip.
- **Configurable behavior**: thresholds/timeouts vary per dependency.
- **Context-aware calls**: respect cancellation and deadlines.

## Reference implementation (Go)

Below is the implementation I use as a learning-friendly baseline. It exposes a small interface, tracks metrics, and implements the Closed/Open/Half-Open state machine with locks.

> Note: This is intentionally kept readable. In the “Production hardening” section, I’ll call out the upgrades I’d do before shipping to a high-throughput system.

```go
// Package challenge20 contains the implementation for Challenge 20: Circuit Breaker Pattern
package main

import (
	"context"
	"errors"
	"fmt"
	"sync"
	"time"
)

// State represents the current state of the circuit breaker
type State int

const (
	StateClosed State = iota
	StateOpen
	StateHalfOpen
)

// String returns the string representation of the state
func (s State) String() string {
	switch s {
	case StateClosed:
		return "Closed"
	case StateOpen:
		return "Open"
	case StateHalfOpen:
		return "Half-Open"
	default:
		return "Unknown"
	}
}

// Metrics represents the circuit breaker metrics
type Metrics struct {
	Requests            int64
	Successes           int64
	Failures            int64
	ConsecutiveFailures int64
	LastFailureTime     time.Time
}

// Config represents the configuration for the circuit breaker
type Config struct {
	MaxRequests   uint32                                  // Max requests allowed in half-open state
	Interval      time.Duration                           // Statistical window for closed state
	Timeout       time.Duration                           // Time to wait before half-open
	ReadyToTrip   func(Metrics) bool                      // Function to determine when to trip
	OnStateChange func(name string, from State, to State) // State change callback
}

// CircuitBreaker interface defines the operations for a circuit breaker
type CircuitBreaker interface {
	Call(ctx context.Context, operation func() (interface{}, error)) (interface{}, error)
	GetState() State
	GetMetrics() Metrics
}

// circuitBreakerImpl is the concrete implementation of CircuitBreaker
type circuitBreakerImpl struct {
	name             string
	config           Config
	state            State
	metrics          Metrics
	lastStateChange  time.Time
	halfOpenRequests uint32
	mutex            sync.RWMutex
}

// Error definitions
var (
	ErrCircuitBreakerOpen = errors.New("circuit breaker is open")
	ErrTooManyRequests    = errors.New("too many requests in half-open state")
)

// NewCircuitBreaker creates a new circuit breaker with the given configuration
func NewCircuitBreaker(config Config) CircuitBreaker {
	// Set default values if not provided
	if config.MaxRequests == 0 {
		config.MaxRequests = 1
	}
	if config.Interval == 0 {
		config.Interval = time.Minute
	}
	if config.Timeout == 0 {
		config.Timeout = 30 * time.Second
	}
	if config.ReadyToTrip == nil {
		config.ReadyToTrip = func(m Metrics) bool {
			return m.ConsecutiveFailures >= 5
		}
	}

	return &circuitBreakerImpl{
		name:            "circuit-breaker",
		config:          config,
		state:           StateClosed,
		lastStateChange: time.Now(),
	}
}

// Call executes the given operation through the circuit breaker
func (cb *circuitBreakerImpl) Call(ctx context.Context, operation func() (interface{}, error)) (interface{}, error) {
	if err := ctx.Err(); err != nil {
		return nil, err
	}

	if err := cb.canExecute(); err != nil {
		return nil, err
	}

	result, err := operation()

	cb.mutex.Lock()
	defer cb.mutex.Unlock()

	if err == nil {
		cb.recordSuccess()
	} else {
		cb.recordFailure()
	}
	return result, err
}

// GetState returns the current state of the circuit breaker
func (cb *circuitBreakerImpl) GetState() State {
	cb.mutex.RLock()
	defer cb.mutex.RUnlock()
	return cb.state
}

// GetMetrics returns the current metrics of the circuit breaker
func (cb *circuitBreakerImpl) GetMetrics() Metrics {
	cb.mutex.RLock()
	defer cb.mutex.RUnlock()
	return cb.metrics
}

// setState changes the circuit breaker state and triggers callbacks
// NOTE: Caller MUST hold write lock (mutex.Lock)
func (cb *circuitBreakerImpl) setState(newState State) {
	// Check if state actually changed
	if cb.state == newState {
		return
	}

	oldState := cb.state
	cb.state = newState
	cb.lastStateChange = time.Now()

	// Reset appropriate metrics based on new state
	if newState == StateClosed {
		cb.metrics = Metrics{}
	}
	if newState == StateHalfOpen {
		cb.halfOpenRequests = 0
	}

	// Call OnStateChange callback if configured
	if cb.config.OnStateChange != nil {
		cb.config.OnStateChange(cb.name, oldState, newState)
	}
}

// canExecute determines if a request can be executed in the current state
func (cb *circuitBreakerImpl) canExecute() error {
	cb.mutex.RLock()
	state := cb.state
	lastChange := cb.lastStateChange
	cb.mutex.RUnlock()

	// For StateClosed: always allow
	if state == StateClosed {
		return nil
	}

	// For StateOpen: check if timeout has passed for transition to half-open
	if state == StateOpen {
		if time.Since(lastChange) > cb.config.Timeout {
			// Need to transition to half-open - acquire write lock
			cb.mutex.Lock()
			// Double-check state hasn't changed while we were waiting for lock
			if cb.state == StateOpen {
				cb.setState(StateHalfOpen)
				cb.halfOpenRequests = 1 // Count this request
			} else if cb.state == StateHalfOpen {
				// Another goroutine already transitioned, increment counter
				if cb.halfOpenRequests >= cb.config.MaxRequests {
					cb.mutex.Unlock()
					return ErrTooManyRequests
				}
				cb.halfOpenRequests++
			}
			cb.mutex.Unlock()
			return nil
		}
		return ErrCircuitBreakerOpen
	}

	// For StateHalfOpen: check if we've exceeded MaxRequests
	if state == StateHalfOpen {
		cb.mutex.Lock()
		defer cb.mutex.Unlock()

		if cb.halfOpenRequests >= cb.config.MaxRequests {
			return ErrTooManyRequests
		}
		cb.halfOpenRequests++
		return nil
	}

	return nil
}

// recordSuccess records a successful operation
// NOTE: Caller MUST hold write lock (mutex.Lock)
func (cb *circuitBreakerImpl) recordSuccess() {
	// Increment success and request counters
	cb.metrics.Requests++
	cb.metrics.Successes++

	// Reset consecutive failures
	cb.metrics.ConsecutiveFailures = 0

	// In half-open state, consider transitioning to closed
	if cb.state == StateHalfOpen {
		cb.setState(StateClosed)
	}
}

// recordFailure records a failed operation
// NOTE: Caller MUST hold write lock (mutex.Lock)
func (cb *circuitBreakerImpl) recordFailure() {
	// Increment failure and request counters
	cb.metrics.Requests++
	cb.metrics.Failures++

	// Increment consecutive failures
	cb.metrics.ConsecutiveFailures++

	// Update last failure time
	cb.metrics.LastFailureTime = time.Now()

	// In half-open state, transition back to open immediately
	if cb.state == StateHalfOpen {
		cb.setState(StateOpen)
	} else if cb.config.ReadyToTrip(cb.metrics) {
		// Check if circuit should trip (ReadyToTrip function)
		cb.setState(StateOpen)
	}
}

// shouldTrip determines if the circuit breaker should trip to open state
func (cb *circuitBreakerImpl) shouldTrip() bool {
	cb.mutex.RLock()
	defer cb.mutex.RUnlock()
	return cb.config.ReadyToTrip(cb.metrics)
}

// isReady checks if the circuit breaker is ready to transition from open to half-open
func (cb *circuitBreakerImpl) isReady() bool {
	cb.mutex.RLock()
	defer cb.mutex.RUnlock()
	return time.Since(cb.lastStateChange) > cb.config.Timeout
}

// Example usage and testing helper functions
func main() {
	// Example usage of the circuit breaker
	fmt.Println("Circuit Breaker Pattern Example")

	// Create a circuit breaker configuration
	config := Config{
		MaxRequests: 3,
		Interval:    time.Minute,
		Timeout:     10 * time.Second,
		ReadyToTrip: func(m Metrics) bool {
			return m.ConsecutiveFailures >= 3
		},
		OnStateChange: func(name string, from State, to State) {
			fmt.Printf("Circuit breaker %s: %s -> %s\n", name, from, to)
		},
	}

	cb := NewCircuitBreaker(config)

	// Simulate some operations
	ctx := context.Background()

	// Successful operation
	result, err := cb.Call(ctx, func() (interface{}, error) {
		return "success", nil
	})
	fmt.Printf("Result: %v, Error: %v\n", result, err)

	// Failing operation
	result, err = cb.Call(ctx, func() (interface{}, error) {
		return nil, errors.New("simulated failure")
	})
	fmt.Printf("Result: %v, Error: %v\n", result, err)

	// Print current state and metrics
	fmt.Printf("Current state: %v\n", cb.GetState())
	fmt.Printf("Current metrics: %+v\n", cb.GetMetrics())
}
```

## Production hardening (what I’d improve before shipping)

This reference implementation is a great learning base, but for production workloads I usually harden it in a few ways:

- **Actually use `Interval`**: implement a rolling window (or periodic reset) so “old failures” don’t poison the breaker forever.
- **Classify errors**: don’t count `context.Canceled`, `context.DeadlineExceeded`, or “client errors” (e.g., HTTP 4xx) as breaker failures.
- **Half-open close criteria**: instead of closing after *one* success, require \(N\) successful probe calls to reduce flapping.
- **Avoid lock-heavy hot paths**: consider atomics for counters + a single CAS state machine if the breaker sits on a very hot route.
- **Expose metrics to Prometheus**: state, total, failures, consecutive failures, failure rate, last failure time.
- **Add fallback strategy**: when Open, return cached data, degrade response, or route to an alternate dependency.

## Testing strategy (high-value tests)

If you add this breaker to a real service, the tests that matter most are:

- **State transitions**: Closed → Open, Open → Half-Open after timeout, Half-Open → Closed on success, Half-Open → Open on failure
- **Concurrency**: many goroutines calling `Call()` simultaneously (run with the race detector)
- **Half-open request limit**: ensure `MaxRequests` is enforced under contention

## Where to use it

Common uses in a portfolio-grade backend:

- HTTP client calls to third-party APIs
- Database calls when the DB is intermittently failing
- Calls to internal microservices (especially during deploys/incidents)

## Conclusion

Circuit breakers are one of the simplest (and highest ROI) resilience patterns you can add to a backend system. They help you fail fast, protect your dependencies, and recover automatically—without turning every outage into a cascade.

If you want, I can also refactor the implementation into a reusable package (`breaker`), add unit tests + race tests, and show a real integration example (e.g., wrapping `http.Client`).




