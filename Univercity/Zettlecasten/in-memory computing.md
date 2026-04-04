---
tags:
  - data-management
  - BI
  - concept
---
# In-memory computing

Storing and processing data entirely in **RAM** rather than reading from disk, dramatically speeding up analytics.

## Why it's faster
Disk access: milliseconds. RAM access: nanoseconds. For analytical queries scanning millions of rows, this difference is enormous.

## Use cases
- Real-time analytics dashboards
- High-frequency trading
- Session data in web applications
- OLAP cubes that need sub-second response times

## Trade-offs
| Advantage | Disadvantage |
|---|---|
| Extremely fast reads | Expensive (RAM costs more than disk) |
| Low latency analytics | Data lost on power failure (unless persisted) |
| Simplifies architecture | Limited by available RAM size |

## Relationship to BI
In-memory computing is increasingly used in [[Business intelligence infrastructure|BI platforms]] to enable real-time reporting instead of batch overnight jobs.

## Examples
SAP HANA, Redis, Apache Spark (in-memory mode)

## Related
- [[Business intelligence infrastructure]]
- [[Hadoop]]