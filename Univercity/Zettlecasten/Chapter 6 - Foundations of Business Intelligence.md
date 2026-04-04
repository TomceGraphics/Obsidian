---
tags:
  - data-management
  - ism
cover: "[[Chapter 6 - Foundations of Business Intelligence-cover.png]]"
---
# Chapter 6 — Foundations of Business Intelligence

From: *Management Information Systems*, Laudon & Laudon (17th ed.)
Course: ICS16M01 — Information Systems Management, Aleksandar Karadimce PhD

## File and data hierarchy
From smallest to largest unit:
**Bit → Byte → Field → Record → File → Database**

- **Entity** — a person, place, or thing we store information about (e.g. Student, Order)
- **Attribute** — a characteristic of an entity (e.g. StudentName, OrderDate)

## Problems with traditional file environments
Without a proper DBMS, organizations suffer from:
- **Data redundancy** — same data stored in multiple places
- **Data inconsistency** — copies get out of sync
- **Program-data dependence** — changing data format breaks every program using it

## Relational databases
Data is organized into 2D tables (called *relations*).
- **Rows** = records (tuples)
- **Columns** = fields (attributes)
- **Primary key** — uniquely identifies each row
- **Foreign key** — a field that links to the primary key of another table

### Three fundamental DBMS operations
| Operation | What it does |
|---|---|
| SELECT | Returns rows matching a condition |
| JOIN | Combines two tables on a shared field |
| PROJECT | Returns only specified columns |

## Database design
Good databases don't happen by accident — they follow a design process:

1. [[conceptual and physical design]] — moving from business requirements to table structures
2. [[entity relationship]] — ER diagrams model entities, attributes, and relationships before any tables are built
3. [[normalization]] — structuring tables to eliminate redundancy (1NF → 2NF → 3NF)
4. [[referential integrity]] — ensuring foreign keys always point to valid records

## Tools used in class
- **SQLite** — lightweight relational DBMS, used in practicals
- Microsoft Access — mentioned but not required

## Alternative data storage
- [[blockchain for data storing]] — immutable distributed ledger; suited for audit trails, not general-purpose storage

## Business intelligence infrastructure
> More historical data → better predictions → better decisions

The full BI stack, from raw data to insight:

- [[Business intelligence infrastructure]] — data warehouses, data marts, OLAP
- [[Hadoop]] — distributed processing for datasets too large for traditional DBMS
- [[in-memory computing]] — storing data in RAM for near-instant analytical queries

### Multidimensional data models
OLAP enables analysis across multiple dimensions simultaneously — e.g. Sales by *product* × *region* × *time period*. Think of it as a 3D spreadsheet (a "cube").

## Extracting value from data
- [[Data Mining]] — discovering hidden patterns; includes text mining and web mining
  - Web mining ≠ web scraping (mining analyzes behavioral patterns; scraping only collects public content)

## Keeping data trustworthy
- [[Data Governance]] — policies, roles, and standards for managing data responsibly
- [[Data Quality Assurance]] — ongoing measurement and improvement of accuracy, completeness, consistency, timeliness, relevance

## Key exam concepts
- Know the data hierarchy (bit → database)
- Be able to explain SELECT, JOIN, PROJECT with examples
- Understand what a primary key and foreign key do
- Know the difference between a data warehouse and a data mart
- Be able to explain normalization in plain language (what problem does it solve?)
- Know what Hadoop is for and how it differs from a traditional DBMS
- Understand the distinction between data governance and data quality assurance
- Web mining vs web scraping distinction (came up in your lecture Q&A — likely exam material)

## Related chapters
- [[Chapter 5 - IT Infrastructure and emerging technologies]] — the hardware and software layer that BI runs on
- [[Chapter 3 - Information Systems, Organizations, and Strategy]] — how BI supports strategic decision-making