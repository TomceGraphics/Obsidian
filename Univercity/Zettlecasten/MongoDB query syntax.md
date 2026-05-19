---
tags:
  - database2
---
MongoDB queries are written as **JSON objects**.

---

## Basic Find
```js
db.collection.find({ field: value })

// Exact match example:
db.users.find({ name: "Alice" })

// Find ALL documents (no filter):
db.users.find({})
```

>💡 `find()` returns all matching documents. Use `findOne()` to return only the first match.

---

### Comparison Operators
For comparisons (not exact matches), MongoDB uses special `$` operator keywords:

| SQL  | MongoDB | Meaning               |
| ---- | ------- | --------------------- |
| `>`  | `$gt`   | greater than          |
| `<`  | `$lt`   | less than             |
| `>=` | `$gte`  | greater than or equal |
| `<=` | `$lte`  | less than or equal    |
| `!=` | `$ne`   | not equal             |

Syntax pattern for comparisons:

```js
//Syntax
db.collection.find({ field: { $operator: value } })


//Example
db.users.find({
 age: { $gt: 25 } 
 })

```

---

## Multiple Conditions (AND)

Separate conditions with commas inside the query object — acts as an implicit **AND**:

```js
db.users.find({
  age: { $gt: 25 },
  city: "London"
})
```

> SQL equivalent: `SELECT * FROM users WHERE age > 25 AND city = 'London'`

---

## OR Conditions

Use the `$or` operator with an array of conditions:

```js
db.users.find({
  $or: [
    { city: "London" },
    { city: "Paris" }
  ]
})
```

> SQL equivalent: `SELECT * FROM users WHERE city = 'London' OR city = 'Paris'`

---

## Projections (Selecting Specific Fields)

By default `find()` returns all fields. A second argument controls which fields to return:
```js
// Return only name and email (exclude _id)
db.users.find({}, { name: 1, email: 1, _id: 0 })

// 1 = include | 0 = exclude
```

> SQL equivalent: `SELECT name, email FROM users`

---

## Querying Nested Documents

Use **dot notation** to query inside nested objects:
```js
db.users.find({ "address.city": "London" })
```

---

## Quick Reference

|SQL|MongoDB|
|---|---|
|`SELECT * FROM users`|`db.users.find({})`|
|`SELECT * FROM users WHERE name='Alice'`|`db.users.find({ name: "Alice" })`|
|`WHERE age > 25`|`{ age: { $gt: 25 } }`|
|`WHERE age > 25 AND city='London'`|`{ age: { $gt: 25 }, city: "London" }`|
|`WHERE city='London' OR city='Paris'`|`{ $or: [{ city: "London" }, { city: "Paris" }]}`|
|`SELECT name, email FROM users`|`db.users.find({}, { name: 1, email: 1 })`|

## Sorting


 the basic syntax is `.sort({key:value})`. We chain the `.sort()` method to the end of our `find()` query. It works very similarly to a **Projection**. You provide an object where the **key** is the field you want to sort by, and the **value** determines the direction:
- `1` = **Ascending** (Smallest to largest, A-Z)
- `-1` = **Descending** (Largest to smallest, Z-A)
 
```js
//EXAMPLE
db.collection.find({}).sort({ someField: 1 })

-1 //decending
1 //acending
```
