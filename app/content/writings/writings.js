export const writingDetails = [
  {
    id: "nodejs-streams-internals",
    title: "Node.js Streams Internals",
    Description:
      "This article explores how Node.js streams work under the hood, tracing the complete journey of HTTP request data from network packets to your application code, and response data from your code back to the network. Covers internal buffering, backpressure mechanisms, and the multi-layered architecture that makes streams efficient.",
    notion_link:
      "https://e.notionhero.io/e1/p/347e9b7-0560df5c870fee64c0013206b6779f1",
  },
  {
    id: "mvcc-autovaccume-and-bloat-in-postgresql",
    title: "MVCC, Autovaccume, and Bloat in PostgreSQL",
    Description:
      "A comprehensive guide to PostgreSQL's Multi-Version Concurrency Control (MVCC) system. Explores transaction IDs, system columns (xmin/xmax), and infomask flags through hands-on examples using pageinspect. Demonstrates how PostgreSQL maintains data consistency across concurrent transactions and explains the role of vacuum in cleaning up obsolete row versions.",
    notion_link:
      "https://e.notionhero.io/e1/p/32c55d4-51fdf4676d7838d048eeee9d762df08",
  },
  {
    id: "understanding-consistent-hashing",
    title: "Understanding Consistent Hashing",
    Description:
      "A detailed explanation of consistent hashing, a technique used in distributed systems to evenly distribute data across a cluster of nodes while minimizing reorganization when nodes are added or removed.",
    notion_link:
      "https://e.notionhero.io/e1/p/3c9d2e1-5a6b4c7d8e9f0a1b2c3d4e5f6a7b8c9",
  },

  {
    id: "building-a-distributed-rate-limiter-with-go-redis-and-lua",
    title: "Building a Distributed Rate Limiter with Go, Redis, and Lua",
    Description:
      "This article discusses building a distributed rate limiter using Go, Redis, and Lua to control the flow of requests, prevent abuse, ensure fair use, and protect backend resources from overload.",
    notion_link:
      "https://e.notionhero.io/e1/p/91e3547-9851c91658cda4f2dc560aca26a6b33",
  },
  {
    id: "the-idea-behind-fault-tolerant-systems",
    title: "The Idea Behind Fault-Tolerant Systems",
    Description:
      "An overview of fault-tolerant systems, which are designed to continue operating without interruption despite the failure of one or more of its components",
  },
  {
    id: "why-b-trees-can-shorten-ssd-lifespan",
    title: "Why B-trees Can Shorten SSD Lifespan",
    Description:
      "An article that explains how traditional databases that use B-Trees data structure and indexes can limit the shelf life of Solid States Drives (SSD).",
    notion_link:
      "https://e.notionhero.io/e1/p/9d6bc29-e31043ce8f473741aa99e14aa6c3103",
  },

  {
    id: "understanding-native-graph-databases-storage-and-processing",
    title: "Understanding Native Graph Databases: Storage and Processing",
    Description:
      "An explanation of native graph databases, which are optimized for storing and processing graph data. They use index-free adjacency, meaning that each node directly references its adjacent nodes.",
    notion_link:
      "https://e.notionhero.io/e1/p/60a68d6-bcf35da5e02b00f6208292ec7f66c07",
  },
  {
    id: "understanding-the-node.js-event-loop",
    title: "Understanding the Node.js Event Loop",
    Description:
      "A look into the Node.js event loop, a mechanism that allows Node.js to perform non-blocking I/O operations despite being single-threaded, by offloading operations to the system kernel whenever possible.",
    notion_link:
      "https://e.notionhero.io/e1/p/148d7a6-a03124f586fd868712ca28d41fcc5b7",
  },
  {
    id: "sstables-and-lsm-trees-the-secret-sauce-behind-modern-database-performance",
    title:
      "SSTables and LSM-Trees: The Secret Sauce Behind Modern Database Performance",
    Description:
      "An article detailing SSTables (Sorted String Tables) and LSM-Trees (Log-Structured Merge-Trees), which are used in modern databases to optimize for high-speed read/write operations and handle massive data sets.",
    notion_link:
      "https://e.notionhero.io/e1/p/0a2ae24-39d3e97cf126868fea0f85c34d7e051",
  },
];
