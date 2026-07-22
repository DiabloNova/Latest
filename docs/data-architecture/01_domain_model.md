# 01. Domain Model
## AI Brand Intelligence & Visibility Platform

This document defines the core business domains, functional areas, boundary contexts, and entity relations that map the platform's logical space. It serves as the foundation for the Enterprise Data Architecture and System Blueprint.

---

## 1.1 Core Business Domains

The business domains are grouped into six core contextual areas:

```
+-----------------------------------------------------------------------------------------+
|                                    BUSINESS DOMAINS                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Organization & Identity ===> Organizations, Workspaces, Users, Teams               |
|   2. Brand Intelligence      ===> Brands, Competitors, Content Assets                   |
|   3. Monitoring & Telemetry  ===> AI Models, Prompts, AI Responses, Citations, Mentions |
|   4. Knowledge Graph         ===> Entities, Semantic Relations                          |
|   5. Operations & Actions    ===> Reports, Integrations, Billing                        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 1.2 Domain Definitions

### 1.2.1 Domain A: Organization & Identity
*   **Organization**: The parent account and billing entity that owns workspaces and billing subscriptions.
*   **Workspace**: An isolated tenant boundary containing brand profiles, users, and tracking metrics.
*   **User**: An individual user account with validated login credentials and preferences.
*   **Team**: A collection of users associated with a workspace under a specific Role-Based Access Control (RBAC) permission level.

### 1.2.2 Domain B: Brand Intelligence
*   **Brand Project**: The core semantic entity under tracking, defining product SKUs, website domains, and key assets.
*   **Competitor**: External competitor brands and domains monitored alongside the primary brand.
*   **Content Asset**: On-page web documents, articles, and schemas published and optimized by the brand.

### 1.2.3 Domain C: Monitoring & Telemetry
*   **AI Model**: Dynamic metadata and tracking properties of target Large Language Models (ChatGPT, Claude, Gemini, etc.).
*   **Prompt**: Specific conversational user scenarios, search queries, and prompt lists.
*   **AI Response**: Raw generated textual answers collected during prompt simulations.
*   **Mention**: An individual, parsed reference to the brand or competitors inside an AI response.
*   **Citation**: Direct hyperlink citations and source attributes extracted from conversational answers.

### 1.2.4 Domain D: Knowledge Graph
*   **Entity**: Abstract semantic objects (Brands, Products, Executives, Industries) mapped to Wikidata or public knowledge bases.
*   **Knowledge Graph (Relations)**: Graph-based semantic triples `[Subject, Predicate, Object]` establishing brand identity mappings.

### 1.2.5 Domain E: Operations & Actions
*   **Report**: Analytical PDF/CSV summaries generated on-demand or scheduled weekly/monthly.
*   **Integration**: API keys, Webhook paths, and connections to external systems (Slack, CRMs).
*   **Billing**: Subscription tiers, billing transactions, payment gateways, and usage tracking.

---

## 1.3 Domain Relation Rules
*   An **Organization** owns one or more **Workspaces** (1:N).
*   A **Workspace** is linked to multiple **Users** through a Workspace Team association (N:M).
*   A **Workspace** contains multiple **Brand Projects** (1:N).
*   A **Brand Project** maps to multiple **Prompts** (1:N) and monitors multiple **Competitors** (1:N).
*   A **Prompt** query campaign is executed across multiple **AI Models** (N:M) to generate multiple **AI Responses** (1:N).
*   An **AI Response** contains multiple parsed **Mentions** (1:N) and **Citations** (1:N).
*   **Citations** link back to external **Content Assets** (N:1).
*   A **Brand Project** is represented as a primary **Entity** in our local **Knowledge Graph**, connected to other entities through semantic relations.
*   A **Workspace** manages its own **Reports** (1:N), **Integrations** (1:N), and **Billing Transactions** (1:N).
