export const projectDetails = [
  {
    id: "product-catalog-voice-agent",
    title: "Product Catalog Voice Agent",
    description:
      "A voice-enabled conversational agent for navigating product user manuals. Features a speech-to-text pipeline using Whisper.cpp integrated with Node.js via WebSocket, a RAG system using Neo4j as a knowledge graph, and a FastAPI backend integrating OpenAI LLMs for contextual response generation.",
    tech: "Express, FastAPI, Whisper.cpp, Neo4j, Graph RAG, OpenAI",
    notion_link:
      "https://www.notion.so/PRODUCT-CATALOG-VOICE-AGENT-275f4afd7b7a806b9950c0c346d52116?source=copy_link",
  },
  {
    id: "ai-form-copilot",
    title: "AI-Powered Form Copilot",
    description:
      "An intelligent form assistant that guides users through data entry via natural conversation, automatically extracting and populating form fields in real-time. Built with WebSocket-based communication between a Next.js frontend and Node.js backend, integrating Google's Gemini AI for conversational form completion.",
    tech: "Next.js, TypeScript, Socket.IO, Google Gemini AI, Node.js, Express",
    notion_link: null,
  },
  {
    id: "realtime-clipboard-sync",
    title: "Real-Time Clipboard Sync",
    description:
      "Cross-platform synchronization backend supporting 1,000+ concurrent users across macOS and Android. Features scalable messaging architecture using Redis Pub/Sub with JWT-based authentication, WebSockets for real-time communication, and PostgreSQL for data persistence.",
    tech: "Go, WebSockets, Redis Pub/Sub, JWT, PostgreSQL",
    notion_link:
      "https://www.notion.so/Real-Time-Clipboard-Sync-266f4afd7b7a80b8bb05de586a094b30?source=copy_link",
  },
  {
    id: "distributed-rate-limiter",
    title: "Distributed Rate Limiting System",
    description:
      "A distributed API gateway with a Go-based rate-limiting microservice, leveraging Redis and a custom Token Bucket algorithm to manage and protect API endpoints. Engineered a scalable microservices architecture using Docker and Nginx for load-balanced request distribution.",
    tech: "Go, Docker, Nginx, Redis, Docker Compose",
    notion_link:
      "https://www.notion.so/Distributed-Rate-Limiter-266f4afd7b7a80a6b058cdb016a3cec7?source=copy_link",
  },
  {
    id: "distributed-cache-decorator",
    title: "Distributed Cache Decorator",
    description:
      "A Python decorator providing Redis-backed distributed caching with automatic invalidation. Detects code modifications via source code hashing and automatically purges stale cache entries across all application instances, eliminating manual cache management.",
    tech: "Python, Redis, Decorators",
    notion_link:
      "https://www.notion.so/Distributed-Cache-Decorator-266f4afd7b7a80d2b105f6159127f359?source=copy_link",
  },
];
