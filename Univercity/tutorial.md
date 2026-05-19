embeding vs referencing

embedding: copy of the data
referencing: pointer to the data

## tutorials


1.1 High value items
```js
db.products.find({price: {$gt: 100}})
```

---

1.2 Target Demographics
```js
db.customers.find({"address.city": "Skopje", age: {$gte: 21}})
```

---

1.3 status
```js
db.orders.find({status: "delivered"})
```

---

1.4 product popularity
count how times a product has been ordered and sort by popularity
```js
db.orders.aggregate([
    {$group: {_id: "$productId", count: {$sum: 1} } },
    {$sort: {count: -1} },
    {$limit: 10}
])
```

---

1.5 revenue per order
calculate the avarage total for orders, rounded to 2 decimal places
```js
db.orders.aggregate([
    {$group: {_id:null, avgTotal: {$avg: "$total"} } },
    {$set: {avgTotal: {$round: ["$avgTotal", 2]} } }
])
```


the `$lookup` operator 
it perform a left outer join between two collections in the same database

Exercise 2.1: product and brand
```js
db.products.aggregate([
    {$lookup: {
        from: "brands",
        localField: "brandId",
        foreignField: "brandId",
        as: "brand"
    } },
    {$unwind: "$brand"},
    {$project: {
        title: 1,
        price: 1,
        "brand.name": 1,
        "brand.support.email": 1,
    } }
])
```

---

2.2 Filtered joins
find all orders for the electronics that are pending
```js
db.products.aggregate([
  // 1. Filter products first to reduce the dataset early
  { $match: { category: "electronics" } },

  // 2. Join with Orders
  {
    $lookup: {
      from: "orders",
      localField: "productId",
      foreignField: "productId",
      as: "orderDetails"
    }
  },

  // 3. Flatten orders and filter for "pending" status
  { $unwind: "$orderDetails" },
  { $match: { "orderDetails.status": "pending" } },

  // 4. Join with Customers using the ID from the unwrapped order
  {
    $lookup: {
      from: "customers",
      localField: "orderDetails.customerId",
      foreignField: "_id",
      as: "customerDetails"
    }
  },

  // 5. Flatten the customer array
  { $unwind: "$customerDetails" },

  // 6. Final Projection
  {
    $project: {
      _id: 0,
      orderId: "$orderDetails._id",
      product: "$title",
      customer: "$customerDetails.name"
    }
  }
])
```

---

Exercise 2.3: costumer and brand
```js
db.customers.aggregate([
  { $match: { name: "Elena" } },
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "customerId",
      as: "orders"
    }
  },
  { $unwind: "$orders" },
  {
    $lookup: {
      from: "products",
      localField: "orders.productId",
      foreignField: "productId",
      as: "product"
    }
  },
  { $unwind: "$product" },
  {
    $lookup: {
      from: "brands",
      localField: "product.brandId",
      foreignField: "brandId",
      as: "brand"
    }
  },
  { $unwind: "$brand" },
  {
    $project: {
      _id: 0,
      customer: "$name",
      product: "$product.title",
      support: "$brand.support.email"
    }
  }
])
```