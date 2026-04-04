---
tags:
  - data-management
  - databases
  - concept
---
# Blockchain for data storage

A distributed ledger technology used to store data that must be **immutable** and **verifiable** without a central authority.

## How it differs from a traditional database
| Feature | Traditional DB | Blockchain |
|---|---|---|
| Control | Centralized | Decentralized |
| Mutability | Records can be edited/deleted | Records cannot be altered |
| Speed | Fast reads/writes | Slower (consensus required) |
| Use case | General purpose | Trust-critical, audit trails |

## When it makes sense
- Supply chain tracking (verifying product origin)
- Financial transactions (cryptocurrency, cross-border payments)
- Medical records (tamper-proof history)
- Smart contracts (self-executing agreements)

## When it doesn't make sense
Most business data is *mutable by design* — you need to correct errors, update records, delete outdated info. Blockchain is the wrong tool for general-purpose storage.

## Key concept from lecture
> Blockchain is mostly used for **immutable data** — once written, it cannot be changed.

## Related
- [[Business intelligence infrastructure]]
- [[Data Governance]]