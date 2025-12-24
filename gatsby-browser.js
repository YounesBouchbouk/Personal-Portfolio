import "./src/styles/global.css"
import ReactGA from "react-ga4"

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// Initialize Google Analytics (GA4) once on the client.
// You can override the measurement id via env: GATSBY_GA_MEASUREMENT_ID
export const onClientEntry = () => {
  if (typeof window === "undefined") return

  const measurementId =
    process.env.GATSBY_GA_MEASUREMENT_ID || "G-6FDYTWRF0X"

  if (!measurementId) return

  // Avoid double-initialization (e.g. hot reload)
  if (window.__GA_INITIALIZED__) return
  window.__GA_INITIALIZED__ = true

  ReactGA.initialize(measurementId)
}

export const onRouteUpdate = ({ location }) => {
  if (typeof window === "undefined") return

  const page = location?.pathname || window.location.pathname
  ReactGA.send({ hitType: "pageview", page })
}
