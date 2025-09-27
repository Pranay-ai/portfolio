export const writingDetails = [
  {
    id: "nodejs-streams-internals",
    title: "Node.js Streams Internals",
    Description:
      "This article explores how Node.js streams work under the hood, tracing the complete journey of HTTP request data from network packets to your application code, and response data from your code back to the network. Covers internal buffering, backpressure mechanisms, and the multi-layered architecture that makes streams efficient.",
    notion_link:
      "https://www.notion.so/Node-Streams-264f4afd7b7a80069bc3fd423dfe9b35?source=copy_link",
  },
  {
    id: "mvcc-autovaccume-and-bloat-in-postgresql",
    title: "MVCC, Autovaccume, and Bloat in PostgreSQL",
    Description:
      "A comprehensive guide to PostgreSQL's Multi-Version Concurrency Control (MVCC) system. Explores transaction IDs, system columns (xmin/xmax), and infomask flags through hands-on examples using pageinspect. Demonstrates how PostgreSQL maintains data consistency across concurrent transactions and explains the role of vacuum in cleaning up obsolete row versions.",
    notion_link:
      "https://www.notion.so/MVCC-and-Auto-Vacuum-in-PostgreSQL-263f4afd7b7a806faaeed151b722e6f2?source=copy_link",
  },

  {
    id: "building-a-distributed-rate-limiter-with-go-redis-and-lua",
    title: "Building a Distributed Rate Limiter with Go, Redis, and Lua",
    Description:
      "This article discusses building a distributed rate limiter using Go, Redis, and Lua to control the flow of requests, prevent abuse, ensure fair use, and protect backend resources from overload.",
    notion_link:
      "https://www.notion.so/Building-a-Distributed-Rate-Limiter-with-Go-Redis-and-Lua-265f4afd7b7a80c9817ff3b1255a5066?source=copy_link",
  },
  {
    id: "the-idea-behind-fault-tolerant-systems",
    title: "The Idea Behind Fault-Tolerant Systems",
    Description:
      "An overview of fault-tolerant systems, which are designed to continue operating without interruption despite the failure of one or more of its components",
    notion_link:
      "https://www.notion.so/The-Idea-Behind-Fault-Tolerant-Systems-265f4afd7b7a804a9d5ed417e7f346cb?source=copy_link",
  },
  {
    id: "why-b-trees-can-shorten-ssd-lifespan",
    title: "Why B-trees Can Shorten SSD Lifespan",
    Description:
      "An article that explains how traditional databases that use B-Trees data structure and indexes can limit the shelf life of Solid States Drives (SSD).",
    notion_link:
      "https://www.notion.so/Why-B-trees-Can-Shorten-SSD-Lifespan-265f4afd7b7a80029199e2aea2e9ca82?source=copy_link",
  },

  {
    id: "understanding-native-graph-databases-storage-and-processing",
    title: "Understanding Native Graph Databases: Storage and Processing",
    Description:
      "An explanation of native graph databases, which are optimized for storing and processing graph data. They use index-free adjacency, meaning that each node directly references its adjacent nodes.",
    notion_link:
      "https://www.notion.so/Understanding-Native-Graph-Databases-Storage-and-Processing-265f4afd7b7a80fe8655d48c70a54f88?source=copy_link",
  },
  {
    id: "understanding-the-node.js-event-loop",
    title: "Understanding the Node.js Event Loop",
    Description:
      "A look into the Node.js event loop, a mechanism that allows Node.js to perform non-blocking I/O operations despite being single-threaded, by offloading operations to the system kernel whenever possible.",
    notion_link:
      "https://www.notion.so/Understanding-the-Node-js-Event-Loop-265f4afd7b7a8044b5c9cf18b5907ace?source=copy_link",
  },
  {
    id: "sstables-and-lsm-trees-the-secret-sauce-behind-modern-database-performance",
    title:
      "SSTables and LSM-Trees: The Secret Sauce Behind Modern Database Performance",
    Description:
      "An article detailing SSTables (Sorted String Tables) and LSM-Trees (Log-Structured Merge-Trees), which are used in modern databases to optimize for high-speed read/write operations and handle massive data sets.",
    notion_link:
      "https://www.notion.so/SSTables-and-LSM-Trees-The-Secret-Sauce-Behind-Modern-Database-Performance-265f4afd7b7a807887fada997decf01f?source=copy_link",
  },
  {
    id: "postgresql-indexes-shared-buffers-and-performance-optimization",
    title: "PostgreSQL Indexes, Shared Buffers, and Performance Optimization",
    Description:
      "Deep dive into PostgreSQL covering indexes, shared buffers, and memory optimization. Learn why column order matters, how to size shared buffers properly, tackle large dataset challenges through partitioning, and understand MVCC's impact on query performance.",
    notion_link:
      "https://www.notion.so/PostgreSQL-Indexes-Shared-Buffers-and-Performance-Optimization-27bf4afd7b7a8029b3dacb194c3064e0?source=copy_link",
  },
];
