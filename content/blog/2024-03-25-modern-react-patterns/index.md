---
title: "Modern React Patterns for 2024"
date: "2024-03-25"
slug: "modern-react-patterns"
featuredImage: "./cover.jpg"
excerpt: "Explore the latest React patterns and best practices for building maintainable and performant applications"
tags: ["frontend", "react", "javascript"]
technologies: ["React", "TypeScript", "Next.js"]
---

# Modern React Patterns for 2024

As React continues to evolve, so do the patterns and best practices for building applications. In this post, I'll share some of the most effective patterns I've been using in my React projects in 2024.

## The Rise of Server Components

With the introduction of React Server Components in Next.js, we now have a powerful new way to build React applications that blend the best of server-side rendering and client-side interactivity.

```jsx
// app/page.jsx - A Server Component
export default async function Page() {
  // This code runs only on the server
  const data = await fetchData();
  
  return (
    <main>
      <h1>Products</h1>
      <ProductList products={data.products} />
    </main>
  );
}
```

Server Components offer several advantages:

1. **Reduced bundle size**: Server components don't get sent to the client
2. **Direct backend access**: No need for API endpoints for data fetching
3. **Automatic code splitting**: No need to manually set up code splitting
4. **Improved performance**: Less JavaScript to parse and execute on the client

## The Compound Component Pattern

Compound components provide a more expressive and flexible API for complex components by leveraging React's composition model:

```tsx
import React, { createContext, useContext, useState } from 'react';

// Create a context
const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (id: string) => void;
} | null>(null);

// Main component
const Tabs = ({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs-container">
        {children}
      </div>
    </TabsContext.Provider>
  );
};

// Sub-components
const TabList = ({ children }: { children: React.ReactNode }) => {
  return <div className="tab-list">{children}</div>;
};

const Tab = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within a Tabs component');
  
  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === id;
  
  return (
    <button
      className={`tab ${isActive ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
};

const TabPanels = ({ children }: { children: React.ReactNode }) => {
  return <div className="tab-panels">{children}</div>;
};

const TabPanel = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within a Tabs component');
  
  const { activeTab } = context;
  if (activeTab !== id) return null;
  
  return <div className="tab-panel">{children}</div>;
};

// Attach sub-components
Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;

export { Tabs };
```

Usage:

```tsx
<Tabs defaultTab="tab1">
  <Tabs.TabList>
    <Tabs.Tab id="tab1">Users</Tabs.Tab>
    <Tabs.Tab id="tab2">Products</Tabs.Tab>
    <Tabs.Tab id="tab3">Orders</Tabs.Tab>
  </Tabs.TabList>
  
  <Tabs.TabPanels>
    <Tabs.TabPanel id="tab1">
      <UsersList />
    </Tabs.TabPanel>
    <Tabs.TabPanel id="tab2">
      <ProductsList />
    </Tabs.TabPanel>
    <Tabs.TabPanel id="tab3">
      <OrdersList />
    </Tabs.TabPanel>
  </Tabs.TabPanels>
</Tabs>
```

## The Builder Pattern for Complex Forms

When dealing with complex forms, the builder pattern can help create a more maintainable structure:

```tsx
import { useState } from 'react';
import { z } from 'zod';

// Define schema
const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18 years old"),
});

type UserFormData = z.infer<typeof userSchema>;

// Form builder
function useFormBuilder<T extends Record<string, any>>(
  initialValues: T,
  validationSchema: z.ZodType<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const fieldValue = type === 'number' ? Number(value) : value;
    
    setValues({
      ...values,
      [name]: fieldValue,
    });
  };
  
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    
    setTouched({
      ...touched,
      [name]: true,
    });
    
    // Validate field on blur
    try {
      const fieldSchema = validationSchema.shape[name as keyof T];
      fieldSchema.parse(values[name as keyof T]);
      setErrors({
        ...errors,
        [name]: undefined,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0]?.message || 'Invalid field';
        setErrors({
          ...errors,
          [name]: fieldError,
        });
      }
    }
  };
  
  const validate = (): boolean => {
    try {
      validationSchema.parse(values);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors = error.errors.reduce((acc, curr) => {
          const field = curr.path[0] as keyof T;
          acc[field] = curr.message;
          return acc;
        }, {} as Partial<Record<keyof T, string>>);
        
        setErrors(newErrors);
      }
      return false;
    }
  };
  
  const handleSubmit = (onSubmit: (values: T) => void) => {
    return (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        onSubmit(values);
      }
    };
  };
  
  const getFieldProps = (name: keyof T) => ({
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
  });
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
    validate,
  };
}

// Usage
function UserForm() {
  const form = useFormBuilder<UserFormData>(
    { name: '', email: '', age: 0 },
    userSchema
  );
  
  const submitForm = (values: UserFormData) => {
    console.log('Form submitted with:', values);
    // Submit to API
  };
  
  return (
    <form onSubmit={form.handleSubmit(submitForm)}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          {...form.getFieldProps('name')}
        />
        {form.touched.name && form.errors.name && (
          <div className="error">{form.errors.name}</div>
        )}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...form.getFieldProps('email')}
        />
        {form.touched.email && form.errors.email && (
          <div className="error">{form.errors.email}</div>
        )}
      </div>
      
      <div>
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...form.getFieldProps('age')}
        />
        {form.touched.age && form.errors.age && (
          <div className="error">{form.errors.age}</div>
        )}
      </div>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## State Management with Zustand

While Redux has been the go-to state management solution for years, Zustand offers a simpler API with less boilerplate:

```tsx
import create from 'zustand';

interface CartState {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  addItem: (item: { id: string; name: string; price: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  
  addItem: (item) => set((state) => {
    const existingItem = state.items.find((i) => i.id === item.id);
    
    if (existingItem) {
      return {
        items: state.items.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        ),
      };
    }
    
    return {
      items: [...state.items, { ...item, quantity: 1 }],
    };
  }),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter((item) => item.id !== id),
  })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ),
  })),
  
  clearCart: () => set({ items: [] }),
}));

// Usage in components
function CartCount() {
  const itemCount = useCartStore((state) => 
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  );
  
  return <span>Cart: {itemCount}</span>;
}

function AddToCartButton({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  
  return (
    <button onClick={() => addItem(product)}>
      Add to Cart
    </button>
  );
}
```

## Conclusion

These modern React patterns can help you write cleaner, more maintainable code while taking advantage of the latest features in the React ecosystem. By adopting these patterns, you'll be well-positioned to build performant and scalable applications in 2024 and beyond.

In my next post, I'll explore how these patterns can be combined with Go microservices to build full-stack applications that scale.

What patterns are you using in your React applications? Let me know in the comments!