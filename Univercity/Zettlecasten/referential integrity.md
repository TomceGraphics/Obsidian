---
tags:
  - data-management
  - databases
  - concept
---
A database constraint that ensures relationships between tables remain valid.

## The rule
A **foreign key** value in one table must always match a **primary key** value in the related table — or be NULL.

## Why it matters
Without it, you can end up with "orphan records" — data that references something that no longer exists.

**Example of a violation:**  
An `Orders` table has a `CustomerID = 99`, but Customer 99 was deleted from the `Customers` table. That order now points to nothing.

## How DBMSs enforce it
- **ON DELETE RESTRICT** — prevents deleting a parent record if children exist
- **ON DELETE CASCADE** — automatically deletes child records when parent is deleted
- **ON DELETE SET NULL** — sets the foreign key to NULL when parent is deleted

## Related
- [[normalization]]
- [[entity relationship]]
- [[conceptual and physical design]]