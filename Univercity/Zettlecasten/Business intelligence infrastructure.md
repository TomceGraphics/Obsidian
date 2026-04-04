---
tags:
  - data-management
  - ch6
  - BI
  - concept
---
The systems and technologies that collect, store, and prepare data for analysis and decision-making.

## Core insight from lecture
> More historical data = better predictions and statistics → better analysis and reporting

## Key components

### Data warehouse
- Stores **current and historical** data consolidated from multiple sources
- Read-only — cannot be altered (optimized for analysis, not transactions)
- Contrast with operational databases, which handle day-to-day transactions

### Data mart
- A **subset** of a data warehouse
- Focused on one business area (e.g. sales, HR, finance)
- Faster and cheaper to build than a full warehouse

### OLAP (Online Analytical Processing)
- Enables **multidimensional analysis** — slicing data across dimensions like time, region, product
- Powers the pivot-table-style analysis executives use
- See: [[in-memory computing]] for performance context

## Related
- [[Hadoop]]
- [[in-memory computing]]
- [[Data Mining]]
- [[Data Governance]]
- [[Data Quality Assurance]]