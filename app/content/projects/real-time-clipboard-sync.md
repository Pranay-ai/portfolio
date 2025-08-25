---
title: "Real-Time Clipboard Sync"
description: "A distributed backend in Go enabling real-time, multi-device clipboard synchronization using WebSockets and Redis."
date: "2025-08-24T21:51:29.002Z"
tech: "Go, WebSockets, Redis, PostgreSQL, JWT"
color: "dusty-rose"
image: "realtime-clipboard-sync.svg"
---

### The Challenge

In a multi-device world, users often need to seamlessly share information—like text snippets, links, or commands—between their computers and mobile devices. The primary challenge was to build a backend system that could instantly and reliably synchronize clipboard data across a users devices, ensuring the system could scale horizontally to support thousands of concurrent connections without a single point of failure.

### Architecture & Implementation

I designed and built **ClipSync**, a distributed backend system in Go, to solve this problem. The architecture is centered around a few key technologies:

- **Real-Time Communication with WebSockets**: The core of the system uses WebSockets to maintain persistent, bidirectional connections with clients. This allows for instant push notifications, so when a user copies content on one device, its immediately sent to all their other connected devices without needing to poll the server.

- **Distributed Messaging with Redis Pub/Sub**: To enable horizontal scaling, the system cant rely on in-memory connections within a single server instance. I implemented Redis Pub/Sub as a messaging backbone. When a WebSocket server receives a clipboard update, it publishes that message to a user-specific Redis channel. All other server instances subscribed to that channel receive the message and forward it to their connected clients. This decouples the servers and allows the system to scale seamlessly.

- **Secure User Management**: User authentication and data persistence are handled by a PostgreSQL database. The system includes a full suite of authentication features: user registration, login, and secure password management using `bcrypt` for hashing.

- **Stateless Authentication with JWT**: To manage sessions in a distributed environment, I used JSON Web Tokens (JWT). After a user logs in, they receive a JWT which is used to authenticate their WebSocket connection. This makes the authentication process stateless, meaning any server instance can validate a users token without needing to share session state.

### Outcome

The final system is a robust, scalable, and secure platform for real-time data synchronization. It successfully supports thousands of concurrent connections and provides a seamless user experience for sharing clipboard content across multiple devices. The microservices-based architecture ensures that the system is resilient and can be easily maintained and scaled as user demand grows.
