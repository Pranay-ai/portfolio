---
title: "Distributed Cache Decorator"
description: "A smart Python decorator that provides Redis-backed caching and automatic cache invalidation when function logic changes."
date: "2025-08-24T21:57:24.506Z"
tech: "Python, Redis, Decorators, Hashing"
color: "sage-mist"
image: "distributed-cache-decorator.svg"
---

### The Challenge

In distributed systems with multiple application instances, caching is essential for performance but introduces a significant challenge: cache invalidation. When a developer updates the logic of a function, how do you ensure that all running instances stop using the old, stale cached data? Manually clearing caches is error-prone and often leads to bugs. The goal was to create a "plug-and-play" caching solution that would handle this automatically.

### Architecture & Implementation

I developed a Python decorator, `@cache`, that provides a robust, distributed caching layer with an intelligent, automatic invalidation mechanism.

- **Decorator Pattern**: The solution is implemented as a simple Python decorator. A developer can enable caching for any slow function (e.g., a database query or an external API call) by simply adding `@cache(ttl=300)` above its definition.

- **Centralized Caching with Redis**: To ensure cache consistency across all distributed application instances, the decorator uses a centralized Redis server as its backend. A singleton pattern for the Redis client ensures an efficient, shared connection.

- **Automatic Version Tracking via Source Hashing**: This is the core innovation of the project. The `CacheRegistry` automatically inspects the source code of every decorated function using Pythons `inspect` module and generates a unique hash (a short SHA256) of that code.

- **Automated Cache Invalidation**: Before caching a result, the decorator checks the functions current source hash against the version stored in Redis. If the hashes do not match (meaning the code has been changed and redeployed), the decorator automatically finds and deletes all old cache entries associated with the functions previous version. This guarantees that new code will never be served stale data from an old cache.

### Outcome

The result is a powerful yet simple tool that dramatically improves application performance by reducing redundant computations. More importantly, it solves the difficult problem of cache invalidation in a distributed environment automatically, making the system more reliable and reducing the cognitive load on developers. Its a safe, efficient caching solution perfectly suited for modern CI/CD workflows.
