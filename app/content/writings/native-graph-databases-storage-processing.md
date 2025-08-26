---
title: "Understanding Native Graph Databases: Storage and Processing"
description: "A comprehensive exploration of how native graph databases achieve superior performance through index-free adjacency, specialized storage structures, and optimized processing engines, with detailed technical examples and real-world PostgreSQL comparisons."
date: "2025-08-24T22:01:44.873Z"
---

# Understanding Native Graph Databases: Storage and Processing

When we talk about graph databases, we often hear terms like "native graph storage" and "native graph processing" thrown around. But what do these really mean, and why should you care? The answer lies in understanding how fundamentally different graph databases are from their relational cousins—not just in how they query data, but in how they physically store and manipulate it.

## The Foundation: How Graphs Store Data Differently

Imagine you're organizing a party and need to keep track of who knows whom. In a traditional relational database, you'd create a table for people and another table for friendships, then use foreign keys to connect them. Every time you want to find someone's friends, the database has to perform joins—essentially looking up connections that aren't directly stored together.

Graph databases take a radically different approach. Instead of storing data in separate tables that need to be joined together, they store the relationships as first-class citizens right alongside the data. When you create a person named Alice and connect her to Bob through a friendship, the database literally stores a direct pointer from Alice's record to Bob's record. This isn't just a conceptual difference—it's a fundamental change in how data lives on disk.

This concept is called **index-free adjacency**, and it's the secret sauce that makes graph databases so powerful. When you want to find Alice's friends, the database doesn't need to perform complex lookups or joins. It simply follows the pointer that's already there, like following a trail of breadcrumbs.

Consider Neo4j, one of the most popular graph databases. When you store a relationship between Alice and Bob, Neo4j creates a physical pointer from Alice's storage location to Bob's. No additional lookup is required—the relationship is embedded in the storage structure itself. This means finding neighbors happens in constant time, regardless of how large your database grows.

Index-free adjacency means that each node in the graph directly stores references (pointers) to its adjacent nodes. When traversing from one node to another, the database simply follows these pointers instead of performing index lookups. This is fundamentally different from how relational databases handle connections.

## The Power of Native Graph Processing

Storage is only half the story. The real magic happens in how graph databases process queries and run algorithms. Think about the difference between giving someone directions using street names versus drawing them a map with connected paths. Traditional databases are like the street names—they have to reconstruct the connections every time. Native graph processing is like having the map already drawn.

When a traditional SQL database needs to find all friends of friends of Alice, it has to perform multiple expensive JOIN operations across tables. Each JOIN is essentially a separate search operation, and the cost multiplies with each degree of separation. It's like having to ask different people for directions at every street corner.

A native graph processing engine understands the connected nature of the data from the ground up. It can traverse from Alice to her friends, and then from each friend to their friends, all by following the pre-established pointers. The traversal happens in O(1) time per hop—meaning each step takes the same amount of time whether you have a hundred users or a hundred million.

To illustrate this difference, if you ask: "Find all friends of friends of Alice," here's what happens:

- In a relational database: multiple JOIN queries across tables (costly)
- In a native graph database: just follow adjacency pointers two hops away from Alice (fast and direct)

## When Relational Databases Hit the Wall: A Real-World Example

Let me show you exactly where relational databases struggle with graph-like problems through a concrete example. Imagine you're building a "people you may know" feature for a social network with 50 million users and 1 billion friendships. You want to suggest second-degree connections—friends of friends—but only if they live in the same city, share at least three mutual friends, and aren't already connected.

In PostgreSQL, you'd need to set up your schema like this:

```sql
CREATE TABLE users (
  id   BIGINT PRIMARY KEY,
  city TEXT NOT NULL
);

-- Store each undirected edge twice for fast traversal in both directions
CREATE TABLE friendships (
  src BIGINT NOT NULL,
  dst BIGINT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (src, dst)
);

-- Entry points and traversal aids
CREATE INDEX ON friendships (src);
CREATE INDEX ON friendships (dst);
CREATE INDEX ON users (city);
```

The schema above shows the minimum indexing you'd need, but even with these optimizations, the query becomes a nightmare. Here's what the two-hop suggestion query looks like:

```sql
WITH RECURSIVE fof AS (
  -- 1-hop: my direct friends
  SELECT f1.dst AS n1
  FROM friendships f1
  WHERE f1.src = $1

  UNION ALL

  -- 2-hop: friends of my friends
  SELECT f2.dst AS n2
  FROM friendships f2
  JOIN fof ON f2.src = fof.n1
)
SELECT cand.id AS suggested_id, COUNT(*) AS mutual_count
FROM (
  -- take only the 2-hop rows
  SELECT n2 AS candidate
  FROM fof
  WHERE n2 IS NOT NULL
) hop2
JOIN users me    ON me.id = $1
JOIN users cand  ON cand.id = hop2.candidate AND cand.city = me.city
-- exclude self
WHERE hop2.candidate <> $1
-- exclude existing friends (needs anti-join)
AND NOT EXISTS (
  SELECT 1
  FROM friendships ex
  WHERE ex.src = $1 AND ex.dst = hop2.candidate
)
GROUP BY cand.id
HAVING COUNT(*) >= 3
ORDER BY mutual_count DESC
LIMIT 50;
```

Looking at the complex SQL above, you can see why this approach becomes problematic. The query suffers from several performance killers:

**Cardinality explosion** becomes the first major issue. Suppose you have around 300 friends, each with roughly 300 friends—that's approximately 90,000 2-hop rows before any filters are applied. On users with dense connections, this number balloons rapidly and must be materialized, sorted, and aggregated.

**Heavy index dependence at every hop** creates the second bottleneck. Each step from source to destination requires an index lookup through B-tree structures, which costs roughly O(log n) per lookup. For multiple steps, you're paying O(m log n) and constantly re-checking for duplicates and visited nodes.

**Anti-join and deduplication costs** add another layer of complexity. Excluding existing friends through the `NOT EXISTS` clause and preventing self-suggestions requires additional index probes and often creates large hash tables for deduplication.

**Recursive CTE limitations** in PostgreSQL mean you're essentially running a set-based breadth-first search simulation. The system lacks graph-aware pruning, directionality hints, or heuristic early-exit strategies. You end up tuning parameters like `work_mem` and `enable_hashagg`, and still face disk spills under heavy load.

When you need three-hop traversals or variable-length paths, the situation gets even worse:

```sql
WITH RECURSIVE paths AS (
  SELECT ARRAY[$1]          AS path,
         $1                 AS last,
         0                  AS depth
  UNION ALL
  SELECT p.path || f.dst    AS path,
         f.dst              AS last,
         p.depth + 1        AS depth
  FROM paths p
  JOIN friendships f ON f.src = p.last
  WHERE p.depth < 3
    AND NOT f.dst = ANY(p.path)   -- cycle avoidance (array search per row)
)
SELECT last AS node
FROM paths
WHERE depth BETWEEN 2 AND 3;
```

The query above shows how cycle detection requires storing the entire path as an array, and every row must perform `NOT ANY(path)` checks, which becomes extremely costly. The breadth explodes combinatorially, and without tight branching-factor limits, you can essentially DOS your own system.

Now contrast this complexity with what the same request looks like in a native graph database using Cypher-style syntax:

```cypher
MATCH (me:User {id: $uid})-[:FRIEND]->(:User)-[:FRIEND]->(cand:User)
WHERE cand.city = me.city
  AND NOT (me)-[:FRIEND]->(cand)
WITH cand, count(*) AS mutual
WHERE mutual >= 3
RETURN cand.id AS suggested_id, mutual
ORDER BY mutual DESC
LIMIT 50;
```

The difference is striking. The native graph approach uses an index only once to find the starting point, then follows stored adjacency pointers for each hop in O(1) time. The engine handles traversal natively with built-in visited-sets, cycle prevention, early exit conditions, and path uniqueness—all with far less intermediate result explosion.

## The Architecture Behind the Magic: Native Graph Storage

Understanding why native graph databases perform so well requires looking under the hood at how they organize data on disk. Neo4j's approach is particularly elegant in its separation of concerns. Rather than storing everything in one massive table, it splits different aspects of the graph into specialized stores, each optimized for its specific purpose.

Neo4j saves each part of your graph in its own store file—nodes, relationships, labels, and properties all live separately. By keeping the graph's structure (who connects to whom) apart from the details (names, timestamps, etc.), Neo4j can traverse the graph very quickly. The trade-off is that the way your graph looks in queries isn't how it's laid out on disk: it's split across several specialized stores.

### The Node Store: Lightweight Pointers to Everything Else

The **node store** is beautifully simple in its design. Each node record uses exactly 15 bytes of storage, with a fixed-size structure that enables lightning-fast lookups. Here's how those bytes are allocated:

```sql
[0] inUse | [1..4] nextRelId | [5..8] nextPropId | [9..13] labels | [14] extra
```

Let me break down each field in the node record structure:

```sql
| Field        | Start (byte, 0-based) | End (byte) | Size (bytes) | Notes                            |
| ------------ | --------------------- | ---------- | ------------ | -------------------------------- |
| `inUse`      | 0                     | 0          | 1            | In-use flag                      |
| `nextRelId`  | 1                     | 4          | 4            | Pointer/ID to first relationship |
| `nextPropId` | 5                     | 8          | 4            | Pointer/ID to first property     |
| `labels`     | 9                     | 13         | 5            | Inline label field / pointer     |
| `extra`      | 14                    | 14         | 1            | Misc/overflow metadata           |
```
This fixed-size structure is crucial for performance. When you need to access node 100, the database doesn't have to search for it—it calculates that the record starts exactly at byte 1,500 (100 × 15 bytes) and jumps directly there. This O(1) lookup time is one of the fundamental advantages over variable-length storage schemes.

The node record serves primarily as a lightweight entry point. The first byte acts as an in-use flag, telling the database whether this slot contains a valid node or can be reused (Neo4j tracks unused records in separate .id files). The next four bytes point to the node's first relationship, while another four bytes point to its first property. Five bytes handle label information (labels can often be inlined when there are few of them), and the final byte stores miscellaneous flags, including markers for densely connected nodes that need special handling.

### The Relationship Store: Where Index-Free Adjacency Lives

The **relationship store** is where the real magic of index-free adjacency happens. Each relationship record consumes 34 bytes and contains not just the source and destination nodes, but also the linking information that creates Neo4j's famous traversal performance. Here's the complete layout:

```sql
[1..4] firstNode | [5..8] secondNode | [9..12] relationshipType |
[13..16] firstPrevRelId | [17..20] firstNextRelId |
[21..24] secondPrevRelId | [25..28] secondNextRelId |
[29..32] nextPropId | [33..34] firstInChainMarker   (inUse flag in header)
```

The relationship record structure breaks down as follows:

```sql
| Field                | Start | End | Size | Notes                                            |
| -------------------- | ----- | --- | ---- | ------------------------------------------------ |
| `firstNode`          | 1     | 4   | 4    | ID of the first (source) node                    |
| `secondNode`         | 5     | 8   | 4    | ID of the second (target) node                   |
| `relationshipType`   | 9     | 12  | 4    | Type ID of the relationship                      |
| `firstPrevRelId`     | 13    | 16  | 4    | Previous relationship in the first node's chain  |
| `firstNextRelId`     | 17    | 20  | 4    | Next relationship in the first node's chain      |
| `secondPrevRelId`    | 21    | 24  | 4    | Previous relationship in the second node's chain |
| `secondNextRelId`    | 25    | 28  | 4    | Next relationship in the second node's chain     |
| `nextPropId`         | 29    | 32  | 4    | Pointer/ID to the first property record          |
| `firstInChainMarker` | 33    | 34  | 2    | Marker/flags for chain bookkeeping               |
```
The next and previous relationship fields might seem confusing at first, but they're the key to understanding how Neo4j achieves index-free adjacency. Each relationship participates in two separate doubly-linked lists—one for each node it connects.

Think of it this way: if node A is connected to five other nodes through five relationships, those five relationship records form a doubly-linked chain where each record points to the next and previous relationships involving node A. But each of those same relationship records also participates in the relationship chains of the nodes that A connects to.

Let's visualize how Neo4j links a node's relationships. For any node A, Neo4j maintains an adjacency list—a doubly-linked chain of all relationship records that touch A. The node record itself stores one pointer to the head of that list. Each relationship record then "plugs into" two lists simultaneously: one list for its first endpoint and one for its second endpoint.

When you traverse from node A, you follow the link fields that correspond to A's endpoint in that record. If A is stored as the record's `firstNode`, you use the `firstPrev/firstNext` fields. If A is the `secondNode`, you use `secondPrev/secondNext` fields. The "next" pointer never points back to the same relationship; it points to the next relationship that also touches A.

Here's a compact way to visualize this for node A with five relationships:

```
A.nextRelId ─► R3
R3 (A-side): prev = NO_REL, next = R4
R4 (A-side): prev = R3,     next = R1
R1 (A-side): prev = R4,     next = R5
R5 (A-side): prev = R1,     next = R2
R2 (A-side): prev = R5,     next = NO_REL
```

The mental model here is simple: treat each node's relationships as a per-node doubly-linked list. Each relationship contributes two sets of links (one per endpoint), and you always follow the set that matches the node you're traversing from. This model remains valid across Neo4j versions even if internal record layouts evolve.

The relationship chain for node A might look like: **R1 ↔ R2 ↔ R3 ↔ R4 ↔ R5**, where each relationship record maintains pointers to its neighbors in A's relationship list, while simultaneously participating in the relationship lists of the other nodes it connects.

## Properties: Separating Structure from Data

One of Neo4j's cleverest design decisions was separating the graph's shape from its data. The nodes and relationships define who connects to whom, but the actual information—names, ages, timestamps, descriptions—lives in a separate property system that's optimized for different access patterns.

Neo4j separates the **graph's shape** (nodes and relationships) from the **graph's data** (properties). The shape lives in the node/relationship stores, while your key–value data lives in the **property stores**. This split keeps traversals fast while letting properties scale independently.

### Property Record Structure

Property data is stored in fixed-size **property records** inside `neostore.propertystore.db`. Each record contains four property blocks (slots) and a pointer to the next property record in a chain. A single logical property (one key–value pair) consumes 1–4 blocks, so one record can hold up to four small properties or fewer large ones. If more space is needed, Neo4j links to another record—properties form a singly linked list per node or relationship (contrast this with the doubly linked lists used for relationship chains).

The property chain structure looks like this:

```
Node/Rel
  └─ nextPropId → [PropRec #1] → [PropRec #2] → ...
```

Each property block stores the type (any JVM primitive, strings, or arrays of primitives), a reference to the property name (via the property index), and either the inlined value or a pointer to a dynamic store record.

### Property Names and the Property Index

Property names aren't duplicated in every record. Instead, Neo4j uses a **property index file** (`neostore.propertystore.db.index`) to store each unique name once, then references it by ID from every property block. This approach is space- and I/O-efficient for repetitive graphs. In a social network where millions of users all have `first_name` and `last_name` properties, this design saves enormous amounts of storage and I/O.

### Values: Inline vs Dynamic Stores

Neo4j optimizes for locality and I/O through a tiered value storage system:

**Inline values (fast path):** If a value can be encoded to fit within the available block space, it's stored directly in the property record. Common short values like phone numbers, ZIP codes, and small integers often inline, so reading them costs only one file access.

**Dynamic values (scalable path):** Large strings and arrays live in dynamic stores:

- `neostore.propertystore.db.strings`
- `neostore.propertystore.db.arrays`

These dynamic stores are built from fixed-size dynamic records linked together. A very long string or large array may span multiple dynamic records.

The value storage decision tree works like this:

```
Property block → (inline value)  OR  → dynamic pointer → [DynRec] → [DynRec] → ...
```

This design ensures that traversals stay hot because node/relationship records remain tiny and cache-friendly, property reads are often one hop (inline), and when values aren't inline, they're still accessible through a small number of predictable hops through dynamic stores.

## The Reality of Performance: Caching Matters

Even the most elegant storage design means nothing if the data isn't in memory when you need it. Modern SSDs are fast, but they're still orders of magnitude slower than RAM. Neo4j addresses this with a sophisticated caching strategy designed specifically for graph workloads.

As of Neo4j 2.2, Neo4j uses an **off-heap, page-affined cache** with **LRU-K** heritage and **popularity-aware (LFU-like) eviction**. Each store is partitioned into pages or regions, and the cache holds a fixed number per store. Eviction prefers removing unpopular pages, even if a "popular" page hasn't been touched recently. In practice, hot pages (frequently visited parts of your graph) stick around, while cold ones make room.

The cache is organized around pages, with each store (nodes, relationships, properties) having its own cached pages. When you traverse from Alice to Bob to Charlie, you're likely hitting cached pages for all three nodes and their connecting relationships. Even if Charlie's detailed profile information isn't cached, the structural information needed for traversal probably is.

The takeaway is that the combination of compact topology records, property inlining, dynamic stores for overflow, and a popularity-aware page cache yields high traversal throughput with predictable property access costs—even when the full graph doesn't fit in memory.

## Mental Model for Understanding Graph Database Architecture

To remember how all these pieces fit together, keep this mental model in mind:

**Shape vs Data:** The topology lives in node/relationship stores, while key-values live in property stores.

**Property records:** Fixed-size records with four blocks plus a next pointer; properties form a singly linked list.

**Names via index:** Property names are stored once and referenced everywhere.

**Values:** Inline when small; otherwise accessed via dynamic string/array stores.

**Speed:** Tiny records plus intelligent caching equals fast traversals and efficient property reads.

## Why This All Matters

The combination of index-free adjacency, native graph processing, and intelligent caching creates something qualitatively different from traditional databases. It's not just that graph databases are faster at graph queries—though they certainly are. It's that they enable you to think about and model problems in fundamentally different ways.

When traversing relationships is cheap, you can build applications that would be prohibitively expensive in relational databases. Real-time recommendation engines, fraud detection systems, social network analysis, knowledge graphs—all of these become not just possible but practical when the underlying database is designed from the ground up to handle connected data.

As one industry expert put it: "Graph traversals can be very efficient. But such high-performance traversals only become reality when they are supported by an architecture designed for that purpose." This is exactly what native graph databases deliver—an architecture where every design decision, from storage layout to caching strategy, is optimized for the reality of connected data.

The beauty of native graph databases isn't just in their performance characteristics, though those are impressive. It's in how they let you model the world as it actually is: a rich, interconnected web of relationships where the connections between things are often more important than the things themselves. When your database naturally reflects this reality, everything else becomes simpler—from data modeling to query writing to application development.


---

**Acknowledgments**

This blog post is heavily inspired by and draws upon concepts from the excellent book *"Graph Databases"* by Ian Robinson, Jim Webber, and Emil Eifrem. Their work provides the foundational understanding of native graph storage and processing that made this exploration possible.