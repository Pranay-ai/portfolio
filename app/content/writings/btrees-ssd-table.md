---
title: "Why B-trees Can Shorten SSD Lifespan"
description: "B-trees work fine on SSDs at first, but their in-place updates cause high write amplification and hot-spot wear over time. The result: slower performance and a shorter SSD lifespan compared to flash-optimized structures like LSM or copy-on-write trees."
date: "2025-08-26T22:01:44.873Z"
---

### Why B-trees Can Shorten SSD Lifespan

B-trees are everywhere — in databases, filesystems, and countless storage engines.  
They were designed decades ago for spinning disks, where the cost of a random seek dominated everything.  
By keeping trees shallow and packing many keys into each node, they kept lookups efficient.

On SSDs, things start off fine. Reads are fast, random access is cheap, and at first, writes don’t seem like a problem either.  
But **over time**, the way B-trees handle updates begins to clash with how flash memory actually works.  
The result isn’t just slower performance — it’s a measurable reduction in SSD lifespan.

### A Simple Example

## Setup:

```sql
- Page size: 4 KB
- Erase block size: 256 KB (64 pages per block)
- Operation: Insert a record into a B-tree leaf page
```

From the B-tree’s perspective, this is easy:  
Find the right page (say page #17) and update it in place.

But on an SSD, there’s no such thing as an in-place update. Instead:

1. Read the entire 256 KB erase block containing page #17
2. Modify 4 KB in memory
3. Erase the whole 256 KB block
4. Write the 256 KB back

That’s **64× more physical work** than the logical write.

### Hot Spot Problem

B-trees have a natural imbalance: the **root and upper-level nodes** are updated frequently, while most leaves are touched only occasionally.  
On an SSD, this means the **same blocks get rewritten again and again**.

Flash memory wears out after a limited number of program/erase cycles (often 3,000–10,000 for consumer drives).  
If certain blocks are hit disproportionately, they’ll wear out far earlier than the rest of the drive.  
The SSD controller can remap them to spare blocks, but those spares are finite.

**Takeaway:** Hot spots in B-trees accelerate localized wear, cutting into SSD endurance.

### The Garbage Collection Tax

As the drive fills up, the SSD controller must clean partially used blocks.  
This process — **garbage collection (GC)** — involves moving valid pages out of a block, erasing it, then writing data back.

With B-trees, updates scatter writes across many pages.  
That scattering means garbage collection has to move a lot more data around just to free space.  
A single 4 KB update can cascade into multiple block rewrites during GC.

**Takeaway:** Random, scattered updates from B-trees amplify the work garbage collection must do, pushing write amplification even higher.

### The Downward Spiral

Put together, the issues look like this:

- **Frequent updates** → same nodes, same blocks, same cells
- **Hot spot wear** → controller remaps blocks, spare pool shrinks
- **More GC overhead** → higher write amplification
- **Higher amplification** → more erases per logical write

This feedback loop means that over time:

- **Performance slows down** (GC competes with real writes)
- **Lifespan shrinks** (cells wear out sooner)

### Conclusion

B-trees aren’t “bad” for SSDs from the start.  
They perform decently at first, especially for read-heavy workloads.  
But under sustained updates, their **in-place modification pattern** directly collides with the erase-block nature of flash.  
The result is **higher write amplification, uneven wear, and reduced endurance**.

This is why many modern storage systems on SSDs turn to alternatives like:

- **LSM trees** (RocksDB, Cassandra)
- **Copy-on-write B-trees** (Btrfs, APFS)

These structures trade off some read efficiency for far better write behavior on flash — and, most importantly, a **longer SSD life**.
