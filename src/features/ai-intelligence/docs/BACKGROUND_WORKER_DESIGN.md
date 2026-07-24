# Distributed Background Workers Architecture

This document specifies the background job processing architecture designed to handle high-throughput scraper, crawler, and API campaign tasks.

---

## 1. Job Life Cycle

Jobs flow through four explicit states:

```
 [Push] ──► [pending] ──► [processing] ──► [completed] (Success)
               ▲              │
               │  Fail        ▼ (Retries < MaxAttempts)
               └────── Retry Policy (Delay = Backoff * Multiplier^Attempts)
                              │
                              ▼ (Retries == MaxAttempts)
                         [DeadLetterQueue] (Manual Auditing)
```

---

## 2. Exponential Backoff & Retries

The **`JobWorker`** implements a robust retry policy:
- **Delay Calculation**: `backoffMs * Math.pow(multiplier, attempts - 1)`
- **DLQ Redirection**: If a job fails and `attempts >= maxAttempts`, it is evicted from the active queue and routed to the **`DeadLetterQueue`** along with complete failure stack trace logs, preserving stability.
- **Microservices Migration**: This abstract pattern is 100% compatible with BullMQ or Kafka. Migrating involves writing a concrete listener mapping job records to BullMQ Redis queues.
