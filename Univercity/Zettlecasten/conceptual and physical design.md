---
tags:
  - data-management
  - ch6
  - databases
  - concept
---
Two stages of database design that happen before any data is stored.

## Conceptual design
High-level, technology-independent plan of what data the system needs.
- Focuses on *what* entities exist and how they relate
- Produced as an [[entity relationship|Entity-Relationship (ER) diagram]]
- No concern yet for how data is stored or which DBMS is used
- Audience: business stakeholders + developers together

## Physical design
Translates the conceptual model into actual database structures.
- Defines tables, columns, data types, indexes
- Considers performance: how will queries run efficiently?
- Applies [[normalization]] to eliminate redundancy
- Enforces [[referential integrity]] via foreign keys
- DBMS-specific (MySQL, SQLite, etc.)

## Why the distinction matters
Skipping conceptual design leads to poorly structured databases that are hard to change later.
Conceptual → Logical → Physical is the standard pipeline.

## Related
- [[entity relationship]]
- [[normalization]]
- [[referential integrity]]