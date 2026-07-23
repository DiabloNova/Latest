# 08. Storage & Infrastructure Architecture
## AI Brand Intelligence & Visibility Platform

This document defines our storage layers, caching pools, search infrastructures, task queues, and external integrations to support high-throughput, low-latency data access at scale.

---

## 8.1 Structured Storage & Caching Layers

Our platform infrastructure coordinates four specialized data and file stores:

```text
+-----------------------------------------------------------------------------------------+
|                                  STORAGE INFRASTRUCTURE                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Cache Pool (Redis Cluster)       ===> Low-latency sessions, rate counters, queues. |
|   2. Object Store (S3 API Compliant)  ===> Zipped raw JSON logs, PDF reports, images.   |
|   3. Vector Store (Pinecone / Milvus) ===> High-dimensional RAG and GEO similarity embeddings.|
|   4. Relational DB (PostgreSQL)       ===> Transactional configurations, users, billing. |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 8.2 Object Storage Configurations
*   **API Protocol**: Amazon S3 API Compliant.
*   **Infrastructure Selection**: AWS S3 (for Global Zones) and ArvanCloud Storage (for localized Phase 1 Iranian datacenters to comply with local data residency laws).
*   **Bucket Segregations**:
    *   `aibi-user-reports`: Stores final generated PDF and CSV visibility reports (configured with automatic 90-day Glacier archival lifecycles).
    *   `aibi-private-rag-documents`: Stores private corporate documents uploaded for internal RAG testing. This bucket has strict data isolation and is completely blocked from public access.

---

## 8.3 Multi-Tier Caching Strategy (Redis)

A distributed Redis cluster manages fast-path data access across three critical functional areas:

1.  **Session & Auth Cache**: Stores active user JSON Web Tokens (JWT) and workspace scopes, allowing us to bypass repetitive PostgreSQL lookups during user navigation.
2.  **Rate Limiter Cache**: Manages API rate limit counters based on client IP or API Bearer tokens with microsecond latency.
3.  **Task Queue Broker (BullMQ / Celery)**: Handles active background scraper tasks, prompt simulation schedules, and PDF compilation queues.

---

## 8.4 Search Index Infrastructure (PostgreSQL & Elasticsearch)
To support dual-channel search (lexical exact-matches and semantic conceptual queries), our search system integrates two specialized index engines:

*   **Lexical Exact Matches (PostgreSQL GIN)**: Handles precise keyword matches, brand names, and product serial numbers (SKUs) using PostgreSQL GIN (Generalized Inverted Index) on `tsvector` columns.
*   **Semantic Concept Queries (Vector HNSW)**: Computes and queries high-dimensional vector embeddings (1536-dimensions) inside our vector store (Pinecone/pgvector) using Hierarchical Navigable Small World (HNSW) indexing to match user search intent with high recall precision.
