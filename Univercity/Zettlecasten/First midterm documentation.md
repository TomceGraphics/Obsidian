---
tags:
  - database2
---
# MongoDB First Midterm Master Documentation

## 1. Database & Collection Management (The Basics)

| **Command**                     | **Purpose**                                      |
| ------------------------------- | ------------------------------------------------ |
| `show dbs` / `show collections` | List all databases or collections in current DB. |
| `use <dbName>`                  | Switch context to a specific database.           |
| `db.createCollection("name")`   | Manually create a collection.                    |
| `db.collection.drop()`          | **Permanent** deletion of a collection.          |
| `.editor`                       | Opens terminal mode for multi-line code pasting. |

## 2. CRUD Operations (Create, Read, Update, Delete)

### Create (Insert)
- `insertOne({ ... })`: Add one document.
- `insertMany([ { ... }, { ... } ])`: Add multiple documents (requires an array).

### Read (Find)
- `find({filter})`: Returns a **cursor** to all matches.
- `findOne({filter})`: Returns the **first** actual document matching the filter.

- **Comparison Operators:**
    - `$gt` (>), `$gte` (>=), `$lt` (<), `$lte` (<=), `$in` (matches any in list).
    
- **Logical Operators:**
    - `$or: [ {cond1}, {cond2} ]`: Matches if _either_ is true.
    - `$and: [ {cond1}, {cond2} ]`: Matches if _both_ are true (implied by commas).
    
- **Sub-documents & Arrays:**
    - `"attr.subAttr"`: Use dot-notation in quotes for nested fields.
    - `$elemMatch`: Use when you need to match multiple conditions inside the **same** array element.

### Update & Delete
- `updateOne({filter}, { $set: {field: value} })`: Modifies the first match.
- `updateMany(...)`: Modifies all matches.
- `upsert: true`: If no match is found, create a new document.
- `deleteOne({filter})` / `deleteMany({filter})`: Remove matches.
- `replaceOne(...)`: Replaces the whole document but keeps the `_id`.

## 3. Performance & Indexing (Theory Heavy)
_Indexes make read queries faster but write queries (inserts/updates) slightly slower._

- **Creation:** `db.collection.createIndex({ attribute: 1 })` (1 = Asc, -1 = Desc).
- **Compound Index:** `createIndex({ a: 1, b: -1 })`.
    - **Rule:** Order matters! Equality fields > Sorting fields > Range fields.

- **Explain Plan:** `db.collection.explain("executionStats").find(...)`
    - **IXSCAN:** Using an index (Fast).
    - **COLLSCAN:** Scanning the whole collection (Slow/Bad).
    - **Covered Query:** The index contains all requested data; no need to fetch the actual document.

## 4. The Aggregation Pipeline ($aggregate)
_A sequence of stages where the output of one stage is the input of the next._
### Core Stages

1. **`$match`**: Filtering. **Theory:** Always put first to optimize performance.
2. **`$group`**: Categorizing.
    - `_id`: The field to group by (use `null` to group everything into one).
    - **Accumulators:**
        - `count: { $sum: 1 }`: Count documents.
        - `total: { $sum: "$price" }`: Sum values.
        - `avgVal: { $avg: "$field" }`: Average values.

3. **`$sort`**: Ordering (1 for low-to-high, -1 for high-to-low).
4. **`$limit`**: Restricting results (e.g., Top 5).
5. **`$project`**: Reshaping.
    - `field: 1` (show), `field: 0` (hide).
    - `new: "$old"` (rename).

6. **`$set`**: Adding new fields without removing old ones.
7. **`$out`**: Saving results to a new collection. **Theory:** Must be the last stage.
    

### Advanced Logic

- **`$cond` (The IF Statement):**
    ```
    { $cond: { if: { $gt: ["$pageCount", 500] }, then: "Long", else: "Short" } }
    ```
    
- **`$round`:** `{ $round: ["$field", decimals] }`
- **`$concat`:** `{ $concat: ["$firstName", " ", "$lastName"] }`
