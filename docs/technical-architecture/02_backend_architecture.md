# 02. Backend System Architecture
## AI Brand Intelligence & Visibility Platform

This document defines the backend system architecture, specifying domain-driven service boundaries, microservices vs modular monolith, internal communication pipelines, and background workers.

---

## 2.1 Purpose
To provide backend engineers and architects with a comprehensive technical framework for designing, scaling, and deploying reliable business logic, scraper orchestrations, and analytical services.

---

## 2.2 Architectural Pattern: Modular Monolith

To balance development speed with horizontal scalability, the core platform is built as a **Modular Monolith** using Node.js/TypeScript (NestJS) or Python (FastAPI). This ensures strict namespace isolation while keeping infrastructure deployment simple:

```text
+-----------------------------------------------------------------------------------------+
|                                    MODULAR MONOLITH                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   NestJS / FastAPI Application                                                          |
|   ├── Modules (Strict Domain-driven separation; communicates via in-memory event buses)|
|   │   ├── Identity & RBAC Module (Users, Organizations, Workspaces)                     |
|   │   ├── Billing & Subscription Module (Transactions, limits)                          |
|   │   ├── Brand & Projects Module (Prompt campaigns, keywords)                          |
|   │   └── Analytics Aggregation Module (Scraper writes, score compiles)                 |
|   |                                                                                     |
|   └── Decoupled Microservices (Containerized; scales independently)                     |
|       ├── AI Scraper & Crawler Service (Python, handles model API orchestrations)        |
|       └── NLP Parsing & Sentiment Pipeline (ParsBERT / Python, parses entities & tone)  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 2.3 Core Backend Services & Boundaries

### 2.3.1 Identity & RBAC Service
*   **Responsibilities**: User registration, Multi-Factor Authentication (MFA), password encryption, JWT session validation, organization creation, and multi-tenant workspace isolation.
*   **Database Scope**: Transactional PostgreSQL (`users`, `organizations`, `workspaces` tables).

### 2.3.2 Billing & Subscription Service
*   **Responsibilities**: Tracking usage quotas, managing subscription plans, handling payment handshakes, and generating printable PDF invoices.
*   **Database Scope**: Transactional PostgreSQL (`transactions`, `billing_invoices`).

### 2.3.3 Brand & Projects Service
*   **Responsibilities**: Creating brand projects, managing competitor tracking lists, and scheduling prompt monitoring campaigns.
*   **Database Scope**: Transactional PostgreSQL (`brand_projects`, `prompts`, `competitors`).

---

## 2.4 Analytical & AI Services (Decoupled Microservices)

### 2.4.1 AI Scraper & Crawler Service (Python / Scrapy)
*   **Responsibilities**: High-throughput scraper tasks. Fetches conversational answers across target models, manages rotation proxy IP pools, and handles model API error retries.
*   **Worker Queue**: Pulls task payloads from Redis and Celery.
*   **Outputs**: Dispatches raw JSON model responses directly to our event broker stream (`PromptExecuted`).

### 2.4.2 NLP Parsing & Sentiment Pipeline (Python / PyTorch)
*   **Responsibilities**: Advanced Natural Language Processing. Parses raw response text, extracts entity relations, matches competitor terms, and computes sentiment scores.
*   **Linguistic Processing**: Employs fine-tuned local models (e.g., ParsBERT for Persian) to handle script variations and zero-width spaces natively.
*   **Outputs**: Emits parsed data signals directly to analytical tables and event brokers (`CitationDetected`, `SentimentAnalyzed`).
