---
title: "Distributed Rate Limiter"
description: "A horizontally scalable, high-throughput rate limiting service built with Go, Redis, and Lua, designed for a distributed microservices environment."
date: "2025-08-24T21:55:52.901Z"
tech: "Go, Redis, Lua, Docker, NGINX"
color: "mist-blue"
image: "distributed-rate-limiter-no-text.svg"
---

### The Challenge

In any large-scale microservices architecture, protecting downstream services from traffic spikes and abuse is critical. The challenge was to design a rate-limiting service that was not only fast and efficient but also fully distributed. It needed to maintain a consistent state for each client across multiple server instances, ensuring that rate limits were enforced accurately, regardless of which server handled a request.

### Architecture & Implementation

I engineered a stateless, horizontally scalable rate-limiting service using the **Token Bucket algorithm**. The entire system is containerized with Docker and orchestrated via Docker Compose for easy deployment and scaling.

- **Horizontally Scalable Go Servers**: The core logic is written in Go. The `docker-compose.yml` file is configured to run multiple instances of the Go API server (`server1`, `server2`, `server3`). This allows the system to handle a high volume of requests by distributing the load.

- **Centralized State with Redis**: To maintain a consistent state across all server instances, I used Redis as a centralized data store. Each clients token count and last refill time are stored in Redis, making the Go servers themselves completely stateless.

- **Atomic Operations with Lua**: The most critical part of the implementation is ensuring that checking and updating a clients token count is an **atomic operation** to prevent race conditions. I achieved this by writing a custom Lua script that is executed directly on the Redis server. This script performs all the necessary logic—calculating elapsed time, refilling the token bucket, and decrementing tokens—in a single, uninterruptible operation, guaranteeing consistency.

- **Load Balancing with NGINX Gateway**: An NGINX container acts as a gateway and load balancer. It receives all incoming traffic and distributes it across the available Go server instances using a round-robin strategy, ensuring no single server becomes a bottleneck.

### Outcome

The result is a highly performant and resilient rate-limiting service. By leveraging Redis and Lua for atomic state management, the system can be scaled horizontally by simply adding more Go server containers, with no single point of failure. It effectively protects backend services while providing real-time rate limit feedback to clients via HTTP headers.
