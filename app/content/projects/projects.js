export const projectDetails = [
  {
    id: "distributed-cache-decorator",
    title: "Distributed Cache Decorator",
    description:
      "A Python decorator providing Redis-backed distributed caching with automatic invalidation. When function code changes, the decorator detects modifications via source code hashing and automatically purges stale cache entries across all application instances. This eliminates manual cache management and prevents bugs from outdated cached data in distributed systems.",
    notion_link:
      "https://www.notion.so/Distributed-Cache-Decorator-266f4afd7b7a80d2b105f6159127f359?source=copy_link",
  },
  {
    id: "distributed-rate-limiter",
    title: "Distributed Rate Limiter",
    description:
      "A horizontally scalable rate limiting service using Go, Redis, and Lua scripts. Implements the Token Bucket algorithm with atomic operations to prevent race conditions across distributed server instances. Features NGINX load balancing, Docker containerization, and stateless architecture that can scale by adding more server containers while maintaining consistent rate limit enforcement.",
    notion_link:
      "https://www.notion.so/Distributed-Rate-Limiter-266f4afd7b7a80a6b058cdb016a3cec7?source=copy_link",
  },
  {
    id: "realtime-clipboard-sync",
    title: "Real-time Clipboard Sync",
    description:
      "A distributed Go backend enabling instant clipboard synchronization across multiple devices. Uses WebSockets for real-time communication, Redis Pub/Sub for horizontal scaling, and JWT authentication for stateless sessions. The system supports thousands of concurrent connections while maintaining data consistency through PostgreSQL persistence and secure user management with bcrypt password hashing.",
    notion_link:
      "https://www.notion.so/Real-Time-Clipboard-Sync-266f4afd7b7a80b8bb05de586a094b30?source=copy_link",
  },
];
