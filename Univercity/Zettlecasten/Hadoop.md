---
tags:
  - data-management
  - BI
  - concept
---
An open-source software framework for storing and processing **massive datasets** across clusters of inexpensive computers.

## The problem it solves
Traditional databases struggle with truly enormous datasets (terabytes/petabytes). Hadoop distributes both storage and computation across many machines, making big data tractable.

## Core components
- **HDFS** (Hadoop Distributed File System) — splits files into blocks and distributes them across nodes
- **MapReduce** — a programming model: *Map* breaks a problem into parallel tasks, *Reduce* aggregates the results

## Key characteristics
- Runs on commodity (cheap, standard) hardware
- Fault-tolerant — if one node fails, data is replicated elsewhere
- Scales horizontally — add more machines to handle more data

## Hadoop vs traditional DBMS
| | DBMS | Hadoop |
|---|---|---|
| Data type | Structured | Structured + unstructured |
| Scale | GB–TB | TB–PB |
| Speed | Fast queries | Batch processing |
| Cost | High (enterprise licenses) | Low (open source) |

## Related
- [[Business intelligence infrastructure]]
- [[in-memory computing]]
- [[Data Mining]]