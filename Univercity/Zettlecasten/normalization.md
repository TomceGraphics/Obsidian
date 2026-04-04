---
tags:
  - data-management
  - databases
  - concept
---
The process of structuring a relational database to reduce redundancy and improve data integrity.

## The core problem it solves
Without normalization, the same data appears in multiple places. When it changes, you must update it everywhere — and inconsistencies creep in.

## Normal forms (simplified)
| Form | Rule |
|---|---|
| 1NF | No repeating groups; each cell holds one value |
| 2NF | Every non-key attribute depends on the *whole* primary key |
| 3NF | No non-key attribute depends on another non-key attribute |

Most real-world databases aim for **3NF**.

## Example
A table storing `OrderID, CustomerName, CustomerCity` violates 3NF — `CustomerCity` depends on `CustomerName`, not on `OrderID`. Fix: split into an Orders table and a Customers table.

## Trade-off
Highly normalized databases are cleaner but require more **JOIN** operations, which can slow queries. Data warehouses often *de-normalize* intentionally for read performance.

## Related
- [[conceptual and physical design]]
- [[referential integrity]]
- [[entity relationship]]