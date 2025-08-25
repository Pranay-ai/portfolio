---
title: "SSTables and LSM Trees: The Secret Sauce Behind Modern Database Performance"
description: "An explanation of how databases like Cassandra and RocksDB use Log-Structured Merge Trees and Sorted String Tables to handle millions of writes per second."
date: "2025-08-24T22:16:49.211Z"
---

Traditional databases often struggle with a classic trade-off: optimize for writes, and reads suffer. LSM Trees take a different approach - they prioritize write performance and accept that reads will be slower.

### What Are SSTables?

Sorted String Tables (SSTables) are key-value files where the keys are stored in sorted order. SSTables are immutable and append-only - once written to disk, they never change. This makes writes incredibly fast because they are pure sequential I/O.

### The LSM Tree Workflow

1.  **The Memtable (In-Memory Writes):** All write operations initially go to an in-memory balanced tree, which is blazing fast.
2.  **Flushing to Disk:** When the memtable reaches a threshold size, it is flushed to disk as a new, sorted SSTable.
3.  **Reading Data:** Reads check the memtable first, then the most recent SSTables, then older ones. This can be slower than B-tree approaches.
4.  **Background Compaction:** Periodically, smaller SSTables are merged into fewer, larger ones to optimize storage and read performance.

### Smart Optimizations

To avoid searching every SSTable for a key that doesnt exist, a **Bloom filter** is used. It can tell you with 100% certainty if a key does **not** exist in a data file, preventing the worst-case search scenario.

---

_Read the full, original article on [LinkedIn](https://www.linkedin.com/pulse/sstables-lsm-trees-secret-sauce-behind-modern-database-pranay-guda-dwj2c)._
