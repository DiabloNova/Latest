# 03. Database Architecture
## AI Brand Intelligence & Visibility Platform

This database architecture defines our multi-store data infrastructure. It separates transactional system databases from high-throughput AI analytics, vector similarity indexes, and real-time caching layers to guarantee high system performance at scale.

---

## 3.1 Datastore Architecture Mapping

Our system uses four distinct datastores to manage data:

```
+-----------------------------------------------------------------------------------------+
|                                    DATASTORE ARCHITECTURE                               |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|      +---------------------------------------------------------------------------+      |
|      |                        1. Application layer (Next.js)                     |      |
|      +-----+---------------------+----------------------+---------------------+-----+      |
|            |                     |                      |                     |            |
|      +-----v-----+         +-----v-----+          +-----v-----+         +-----v-----+      |
|      | PostgreSQL|         | Vector DB |          |   Redis   |         | Object Sto|      |
|      | (Base db) |         | (Pinecone)|          | (Caching) |         | (S3/MinIO)|      |
|      +-----------+         +-----------+          +-----------+         +-----------+      |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 3.2 Datastore Roles & Justification

### 3.2.1 PostgreSQL (Primary Relational Store)
*   **Role**: Handles all transactional system operations, workspace settings, RBAC permissions, prompt configurations, billing transactions, and scheduled cron metadata.
*   **Reasoning**: Relational database requirements demand strict ACID compliance, flexible schema constraints, relational integrity, and advanced indexing for structural transactional tables.

### 3.2.2 Vector Database (Pinecone / pgvector / Milvus)
*   **Role**: Powers our RAG and GEO simulation features, storing high-dimensional vector embeddings of crawled website pages and conversational models.
*   **Reasoning**: Enables ultra-fast vector similarity searches and cosine distance measurements, which are critical to evaluate how close client content is to target LLM retrieval embeddings.

### 3.2.3 Redis (In-Memory Data Structure Store)
*   **Role**: Handles background worker task queues (Celery/BullMQ), transient scraper job statuses, API rate limit counters, and database query caching.
*   **Reasoning**: In-memory speeds are necessary to process high-throughput job messaging and manage API rate limits with microsecond latency.

### 3.2.4 Object Storage (Amazon S3 / MinIO)
*   **Role**: Stores unstructured documents, exported PDF reports, captured AI response screenshots, raw markdown files, and historical JSON response logs.
*   **Reasoning**: Relational databases degrade if forced to store megabytes of static files. Offloading reports and media assets to durable, cheap object stores protects database performance.

---

## 3.3 Transactional vs. Analytical Data Separation

To prevent heavy analytical tasks (e.g., generating annual Share of Voice reports) from locking operational system databases and degrading dashboard experiences, the platform uses a strict transactional and analytical database split:

```
+-----------------------------------------------------------------------------------------+
|                                    DATA SEPARATION                                      |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Transactional Store (PostgreSQL Master)                                            |
|      - Reads/Writes for users, logins, billing, settings, workspace configurations.     |
|                                                                                         |
|   2. Analytical Read-Replicas (PostgreSQL Replicas)                                     |
|      - Scraper workers write raw observation records.                                   |
|      - Reporting engines query replicas to compile metrics, charts, and PDF reports.    |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 3.3.1 Read/Write Isolation Rules
*   **Primary Database Writes**: Restricted exclusively to rapid user actions, session generation, and scheduling configurations.
*   **Analytical DB Replicas**: Scraper workers write raw observation records to a dedicated analytical table group. Heavy reporting engines query these read-replicas, preventing table-locking issues on primary transactional databases.
*   **Asynchronous Message Queue**: Communication between transactional and analytical stores is managed through asynchronous events (RabbitMQ or Kafka), decoupling the two environments completely.
