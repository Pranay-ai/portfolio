---
title: 'Building a Distributed Rate Limiter with Go, Redis, and Lua'
description: 'A deep dive into the architecture and implementation of a scalable, stateless rate limiter for microservices using the Token Bucket algorithm.'
date: '2025-08-24T22:01:44.873Z'

---

When building public APIs or high-traffic web services, one crucial concern is controlling the flow of requests. That’s where rate limiting comes in. It’s a technique used to limit the number of operations a user or client can perform in a given time frame. Without it, your system could easily be overwhelmed — whether from malicious bots, unintentional client-side bugs, or just heavy usage during peak times.

### The Problem with Scaling

Implementing rate limiting is straightforward in a single-server setup. But once your system is running multiple instances across different containers or servers, local state falls apart. A client could hit three different servers and get three times the allowed rate. To solve this, we need a centralized, consistent, and atomic way to track rate limits — enter Redis.

### Architecture Overview

To ensure consistent rate limiting across multiple distributed services, Redis acts as the backbone. It holds the token bucket state for each client, accessible by all servers in real-time. Clients send requests to an API Gateway, which load balances them across backend instances. Each server then checks Redis using a Lua script that implements the token bucket algorithm.

### The Token Bucket Algorithm

The Token Bucket Algorithm is a popular strategy that allows bursty traffic while enforcing a steady average rate. It works like a bucket that fills up with tokens at a fixed rate. Each incoming request consumes one token. If the bucket is empty, the request is denied.

### Implementing Atomicity with Lua

To prevent race conditions in high-concurrency environments, we use Lua scripts. Lua is a lightweight scripting language that Redis natively supports through its `EVAL` command. By embedding our token bucket logic in a Lua script, we ensure that the operations—like reading the token count, calculating refills, and updating values—are executed as a single atomic transaction.

### Project Setup

To simulate a real-world distributed environment, we used Docker Compose to spin up multiple backend Go servers, a centralized Redis instance, and an NGINX API Gateway for load balancing. This setup helps mimic production-like traffic flow and ensures consistent rate-limiting decisions across all instances.

---

*Read the full, original article on [Medium](https://medium.com/@gudapranaynetha/building-distributed-rate-limiter-using-golang-redis-and-lua-scripting-9ee1bd2b18df).* 
