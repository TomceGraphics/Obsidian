---
tags:
  - database2
---
MongoDB is a document-oriented no SQL database that stores data as **JSON like documents** called **BSON** - Binary JSON they are flexible object like structures

#### SQL vs MongoDB — Terminology
comparison between SQL and MongoDB

| SQL      | Mongo DB   |
| -------- | ---------- |
| Database | Database   |
| Table    | Collection |
| Row      | Document   |
| Column   | Field      |
#### Document Structure
Here's a quick example. In SQL you might have a `users` table with a row like:
```
id | name   | email
1  | Alice  | alice@example.com
2  | Thomas | thomas@example.com
```

the same data in mongo DB looks like:
```json
{
  "_id": 1,
  "name": "Alice",
  "email": "alice@example.com"
}
```

>💡 `_id` is automatically added by MongoDB as a unique identifier — similar to a primary key in SQL.

#### Flexible Schema (Schemaless)
MongoDB has a **flexible schema** (or being "schemaless"). Each document in a collection _can_ have completely different fields.

So for example, in a `users` collection you could have:
```json
{ "_id": 1, "name": "Alice", "email": "alice@example.com", "phone": "555-1234" }
{ "_id": 2, "name": "Bob", "email": "bob@example.com", "age": 25 }
{ "_id": 3, "name": "Carol" }
```

All three are valid documents in the same collection — no errors, no nulls forced in for missing columns.

Downsides of Flexible Schemas:
- **Data reliability** — you might store `"email"` in one document and `"e_mail"` in another by accident, making queries inconsistent.
- **No enforced relations** — for complex, interconnected data, relational databases handle it more naturally.
  
#### Nested Documents (Embedded Data)

Unlike SQL, MongoDB can store **nested objects and arrays** directly inside a document — no joins needed.
```json
{
  "_id": 1,
  "name": "Alice",
  "address": {
    "city": "London",
    "postcode": "E1 6RF"
  },
  "hobbies": ["reading", "coding"]
}
```

> 💡 This is one of MongoDB's biggest strengths — related data can live together in one document instead of being split across multiple tables.

#### When should MongoDB be used?

MongoDB shines when data is:
- **Variable in structure** (e.g. a notepad app for storing notes)
- **Hierarchical / nested** (e.g. a blog post with embedded comments)
- **High volume and fast-changing** (logs, real-time events)

SQL shines when your data is:
- **Highly relational** (users → orders → products)
- **Needs strict consistency** (banking, medical records)
- **Complex queries with joins across many entities**

|Use MongoDB when...|Use SQL when...|
|---|---|
|Data structure is variable (e.g. a notes app)|Data is highly relational (users → orders)|
|Data is hierarchical/nested (e.g. blog + comments)|Strict consistency is needed (banking, medical)|
|High volume, fast-changing data (logs, events)|Complex queries with joins across many tables|

Related: [[MongoDB query syntax]] 