export const projectDetails = [
  {
    id: "distributed-cache-decorator",
    title: "Distributed Cache Decorator",
    description:
      "A Python decorator providing Redis-backed distributed caching with automatic invalidation. When function code changes, the decorator detects modifications via source code hashing and automatically purges stale cache entries across all application instances. This eliminates manual cache management and prevents bugs from outdated cached data in distributed systems.",
    notion_link:
      "https://e.notionhero.io/e1/p/e533f56-94e92428d30c37640d8dbf91c9b40f0",
  },
  {
    id: "distributed-rate-limiter",
    title: "Distributed Rate Limiter",
    description:
      "A horizontally scalable rate limiting service using Go, Redis, and Lua scripts. Implements the Token Bucket algorithm with atomic operations to prevent race conditions across distributed server instances. Features NGINX load balancing, Docker containerization, and stateless architecture that can scale by adding more server containers while maintaining consistent rate limit enforcement.",
    notion_link:
      "https://e.notionhero.io/e1/p/2895eb9-2aee6425cf692e5b3a65fc2a3abd1f7",
  },
  {
    id: "realtime-clipboard-sync",
    title: "Real-time Clipboard Sync",
    description:
      "A distributed Go backend enabling instant clipboard synchronization across multiple devices. Uses WebSockets for real-time communication, Redis Pub/Sub for horizontal scaling, and JWT authentication for stateless sessions. The system supports thousands of concurrent connections while maintaining data consistency through PostgreSQL persistence and secure user management with bcrypt password hashing.",
    notion_link:
      "https://e.notionhero.io/e1/p/7799e63-ebefc8587c7c9c47c93720e5b80af97",
  },
];
