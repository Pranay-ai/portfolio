---
title: 'Understanding the Node.js Event Loop'
description: 'An experiment showing how one blocking CPU-bound task can starve the event loop, and the trade-offs of non-blocking alternatives.'
date: '2025-08-25T16:01:20.130Z'

---

Node.js is famous for its non-blocking, asynchronous nature, but what happens when you make a CPU-intensive operation non-blocking? I built a simple HTTP server to find out.

### The Experiment

I created two routes: `/isprime` (a CPU-intensive prime number check) and `/log` (a simple I/O operation). When the blocking `isPrime` function was called first, it completely starved the event loop for over 40 seconds. Subsequent requests to the fast `/log` route had to wait, slowing them from 4,274 req/sec down to just 2.55 req/sec.

### The "Non-Blocking" Solution & Surprising Results

I refactored the prime check to be non-blocking using `setImmediate` to break the calculation into chunks and yield control back to the event loop. The result? The `/log` route became fast again (7,438 req/sec), but the prime calculation itself became **2.5 times slower** due to the overhead of context switching.

### Key Insights

This experiment reveals a fundamental trade-off in Node.js:

1.  **Non-blocking ≠ Faster:** For a single CPU-intensive task, making it non-blocking adds overhead and slows it down.
2.  **Responsiveness vs. Performance:** The non-blocking approach makes the overall server more responsive to other requests, even if the heavy task takes longer.
3.  **One Blocking Call Can Freeze Everything:** A single, long-running synchronous operation can bring your entire server to a halt by blocking the event loop.

While Worker Threads are the modern solution for CPU-bound tasks, this experiment highlights the critical importance of keeping the event loop free.

---

*Read the full, original article on [Medium](https://medium.com/@gudapranaynetha/understanding-node-js-a1d58a5589b1).*
