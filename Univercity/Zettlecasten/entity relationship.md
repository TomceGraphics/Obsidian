---
tags:
  - data-management
  - databases
  - concept
---
# Entity-Relationship (ER) diagrams

A visual tool for modeling the data a system needs to store, used during [[conceptual and physical design|conceptual design]].

## Core components
| Component | Meaning | Example |
|---|---|---|
| Entity | A thing we store data about | Student, Course, Lecturer |
| Attribute | A property of an entity | Student: name, ID, GPA |
| Relationship | How entities connect | Student *enrolls in* Course |
| Cardinality | How many of each side | One student → many courses |

## Cardinality types
- **1:1** — one entity relates to exactly one other (e.g. person ↔ passport)
- **1:N** — one relates to many (e.g. lecturer → many courses)
- **N:M** — many relate to many (e.g. students ↔ courses — needs a junction table)

## ER → relational table
Each entity becomes a table. Each attribute becomes a column. Relationships become foreign keys or junction tables.

## Related
- [[conceptual and physical design]]
- [[normalization]]
- [[referential integrity]]