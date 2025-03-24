---
title: "MongoDB Performance Tips for Node.js Applications"
date: "2024-03-26"
slug: "mongodb-performance-tips"
featuredImage: "./cover.jpg"
excerpt: "Optimize your MongoDB queries and improve your Node.js application performance with these practical tips"
tags: ["database", "backend", "nodejs"]
technologies: ["MongoDB", "Node.js", "Express"]
---

# MongoDB Performance Tips for Node.js Applications

MongoDB is a popular choice for Node.js applications due to its flexible document model and JavaScript-friendly query language. However, as your application grows, you might encounter performance issues that can impact user experience. In this post, I'll share some practical tips for optimizing MongoDB performance in Node.js applications.

## Understanding Indexes

Indexes are one of the most powerful tools for improving query performance. Without proper indexes, MongoDB has to scan every document in a collection to find matches for your query.

```javascript
// Creating a simple index
await db.collection('users').createIndex({ email: 1 });

// Creating a compound index
await db.collection('products').createIndex({ category: 1, created_at: -1 });

// Creating a text index for search
await db.collection('articles').createIndex({ title: 'text', content: 'text' });
```

To see which indexes exist on a collection:

```javascript
const indexes = await db.collection('users').indexes();
console.log(indexes);
```

Always check if your queries are using indexes with `explain()`:

```javascript
const explanation = await db.collection('users')
  .find({ email: 'user@example.com' })
  .explain('executionStats');

console.log(explanation.executionStats.executionTimeMillis);
console.log(explanation.executionStats.totalDocsExamined);
```

## Efficient Query Patterns

### Use Projections to Return Only Required Fields

```javascript
// Bad: Returns all fields
const user = await db.collection('users').findOne({ _id: userId });

// Good: Returns only needed fields
const user = await db.collection('users').findOne(
  { _id: userId },
  { projection: { name: 1, email: 1, role: 1 } }
);
```

### Avoid Negation Operators

Negation operators like `$ne`, `$nin`, and `$not` often can't use indexes efficiently.

```javascript
// Less efficient - may require full collection scan
const users = await db.collection('users').find({ status: { $ne: 'inactive' } }).toArray();

// More efficient - can use index on status
const users = await db.collection('users').find({ status: 'active' }).toArray();
```

### Use Aggregation for Complex Queries

```javascript
const result = await db.collection('orders').aggregate([
  // Match stage - use indexes
  { $match: { status: 'completed', created_at: { $gte: new Date('2023-01-01') } } },
  
  // Group stage
  { $group: {
    _id: '$customer_id',
    totalSpent: { $sum: '$total' },
    orderCount: { $sum: 1 }
  }},
  
  // Sort stage
  { $sort: { totalSpent: -1 } },
  
  // Limit stage
  { $limit: 10 }
]).toArray();
```

## Connection Management with Mongoose

If you're using Mongoose, make sure to set up connection pooling correctly:

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/myapp', {
  // Maintain up to 10 socket connections
  poolSize: 10,
  // If a connection is idle for more than 30 seconds, close it
  socketTimeoutMS: 30000,
  // Give up connecting to MongoDB after 5 seconds
  connectTimeoutMS: 5000,
  // Keep trying to reconnect for 60 seconds
  serverSelectionTimeoutMS: 60000,
  // Never stop trying to reconnect
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});
```

## Pagination Best Practices

Pagination is essential for performance when dealing with large datasets.

### Offset-Based Pagination

```javascript
const pageSize = 20;
const pageNumber = req.query.page || 1;
const skip = (pageNumber - 1) * pageSize;

const products = await db.collection('products')
  .find({})
  .sort({ created_at: -1 })
  .skip(skip)
  .limit(pageSize)
  .toArray();
```

### Cursor-Based Pagination (More Efficient)

```javascript
const pageSize = 20;
const lastId = req.query.lastId;

const query = lastId 
  ? { _id: { $lt: new ObjectId(lastId) } } 
  : {};

const products = await db.collection('products')
  .find(query)
  .sort({ _id: -1 })
  .limit(pageSize)
  .toArray();

// Return the last ID for the next page
const nextLastId = products.length > 0 
  ? products[products.length - 1]._id 
  : null;
```

## Handling Large Write Operations

For bulk operations, use the bulk operation API:

```javascript
const bulkOp = db.collection('products').initializeUnorderedBulkOp();

// Add operations to the bulk
for (const product of productsToUpdate) {
  bulkOp.find({ _id: product._id }).updateOne({
    $set: { price: product.price, stock: product.stock }
  });
}

// Execute all operations
const result = await bulkOp.execute();
console.log(`Modified ${result.nModified} documents`);
```

## Avoiding N+1 Query Problems

N+1 query problems occur when you fetch a list of items and then make a separate query for each item's related data.

```javascript
// Bad approach (N+1 queries)
const orders = await Order.find({ status: 'processing' });

for (const order of orders) {
  // This makes a separate query for each order!
  const customer = await Customer.findById(order.customer_id);
  order.customerName = customer.name;
}

// Better approach (2 queries)
const orders = await Order.find({ status: 'processing' });
const customerIds = orders.map(order => order.customer_id);
const customers = await Customer.find({ _id: { $in: customerIds } });

// Create a lookup map
const customerMap = {};
customers.forEach(customer => {
  customerMap[customer._id] = customer;
});

// Attach customer data to orders
orders.forEach(order => {
  order.customerData = customerMap[order.customer_id];
});
```

## Using MongoDB Change Streams for Real-time Updates

Change streams allow applications to access real-time data changes:

```javascript
const changeStream = db.collection('orders').watch();

changeStream.on('change', (change) => {
  console.log('Received change:', change);
  
  // Handle different operations
  switch (change.operationType) {
    case 'insert':
      notifyNewOrder(change.fullDocument);
      break;
    case 'update':
      updateOrderStatus(change.documentKey._id, change.updateDescription);
      break;
    case 'delete':
      removeOrderFromUI(change.documentKey._id);
      break;
  }
});
```

## Schema Design Considerations

MongoDB's flexible schema can be both a blessing and a curse. Here are some guidelines:

1. **Embed related data when possible**, especially for one-to-one or one-to-few relationships
2. **Use references for one-to-many relationships** where the "many" side grows unbounded
3. **Denormalize when needed** for performance, but be careful about keeping data in sync
4. **Use appropriate data types** (e.g., Date for dates, not strings)
5. **Consider document size limits** (16MB per document)

```javascript
// Example of embedding (one-to-few)
const user = {
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  addresses: [
    { type: "home", street: "123 Main St", city: "Boston", zip: "02101" },
    { type: "work", street: "456 Corp Ave", city: "Boston", zip: "02101" }
  ]
};

// Example of referencing (one-to-many)
const customer = {
  _id: ObjectId("..."),
  name: "Jane Smith",
  email: "jane@example.com"
};

const orders = [
  { _id: ObjectId("..."), customer_id: customer._id, items: [...], total: 99.99 },
  { _id: ObjectId("..."), customer_id: customer._id, items: [...], total: 149.99 }
];
```

## Monitoring and Profiling

Always monitor your MongoDB performance in production:

1. Enable database profiling to identify slow queries:

```javascript
db.setProfilingLevel(1, { slowms: 100 }); // Log operations that take more than 100ms
```

2. Use MongoDB Atlas monitoring or set up your own monitoring with tools like Prometheus and Grafana
3. Check slow query logs regularly

## Conclusion

Optimizing MongoDB performance is a continuous process that involves proper schema design, indexing, query optimization, and monitoring. By following these best practices, you can ensure your Node.js applications remain responsive and efficient even as your data grows.

In my next post, I'll dive deeper into MongoDB's aggregation framework and show how you can use it to build powerful analytics features for your applications.

What MongoDB performance challenges have you faced in your projects? Share your experiences in the comments!