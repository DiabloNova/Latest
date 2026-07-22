# 12. Scalability & System Architecture
## AI Brand Intelligence & Visibility Platform

This document defines our system's cloud-native scaling strategy. It outlines horizontal scaling policies, caching tiers, queue management, background worker pipelines, content delivery configurations, and disaster recovery rules to support millions of organizations, millions of prompt executions, and billions of observations.

---

## 12.1 Scalable Cloud Topology (High-Level)

Our platform architecture is built around dynamic container orchestration and globally distributed scraping systems:

```
+-----------------------------------------------------------------------------------------+
|                                    PLATFORM TOPOLOGY                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|                    Internet (Client Apps / Global Scraper Nodes)                        |
|                                         |                                               |
|                                         v                                               |
|                             +-----------------------+                                   |
|                             | Global CDN / Anycast  |                                   |
|                             +-----------+-----------+                                   |
|                                         |                                               |
|                                         v                                               |
|                             +-----------------------+                                   |
|                             | Load Balancer / Nginx |                                   |
|                             +-----------+-----------+                                   |
|                                         |                                               |
|                                         v                                               |
|                             +-----------------------+                                   |
|                             | Kubernetes Cluster    |                                   |
|                             | - Autoscale Pods      |                                   |
|                             +-----+-----+-----+-----+                                   |
|                                   |     |     |                                         |
|         +-------------------------+     |     +-------------------------+               |
|         |                               |                               |               |
|   +-----v-----+                   +-----v-----+                   +-----v-----+         |
|   | Dashboard |                   | Analytical|                   | Background|         |
|   | Pods (SSR)|                   | API Pods  |                   | Workers   |         |
|   +-----------+                   +-----------+                   +-----------+         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 12.2 Horizontal Scaling Rules & Policies
*   **Kubernetes (EKS / GKE) Clusters**: Core application services are deployed as Docker containers inside Kubernetes clusters.
*   **Horizontal Pod Autoscaler (HPA)**: Pod scaling metrics are tied to CPU and Memory usage thresholds.
    *   *Trigger*: Scale up if CPU utilization exceeds 70% or memory usage exceeds 75% for 3 consecutive minutes.
    *   *Scale Limits*: Auto-scale from a minimum of 3 pods up to 50 pods during peak traffic.
*   **Database Scaling (Write/Read Separation)**: Transactional PostgreSQL databases operate under a Master-Replica architecture:
    *   **1 Write Master Node**: Processes active transactional inserts (SSO logins, billing transactions, new prompt campaigns).
    *   **3 Read Replica Nodes**: Read operations (dashboard charts, PDF compilation, search indexing) are load-balanced across these replicas, protecting primary database write performance.

---

## 12.3 Queue Management & Background Workers
The core system processes high-throughput scraping tasks asynchronously using structured background queues:

```
  +-----------------------------------------------------------------------------------+
  |                           Step 1: Task Scheduling                                 |
  +-----------------------------------------------------------------------------------+
   - System cron engines add simulation scraping tasks to Redis queues (BullMQ/Celery) |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 2: Broker Coordination                             |
  +-----------------------------------------------------------------------------------+
   - Redis manages the queue backlog, distributing tasks evenly across worker nodes   |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 3: Worker Node Processing                          |
  +-----------------------------------------------------------------------------------+
   - Workers execute prompt simulations, parse raw text, and extract entity results   |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 4: Completion & Analytics                          |
  +-----------------------------------------------------------------------------------+
   - Workers write the results to PostgreSQL replicas and emit a `PromptExecuted` event|
  +-----------------------------------------------------------------------------------+
```

### 12.3.1 Queue Isolation Policies
To prevent long-running tasks (e.g., compile annual reports) from blocking rapid, high-priority tasks (e.g., verify MFA codes), the platform isolates work across three distinct Redis queues:
1.  **Immediate Queue (High Priority)**: Processes transactional verification emails, Webhooks, and instant alerts.
2.  **Daily Scraper Queue (Medium Priority)**: Manages scheduled model scraping campaigns and simulation jobs.
3.  **Heavy Processing Queue (Low Priority)**: Handles batch PDF report compilations, database archiving, and large-scale vector similarity calculations.

---

## 12.4 Multi-Tier Caching Strategy
The system implements caching across all key layers to minimize database loads and optimize response times:

```
+-----------------------------------------------------------------------------------------+
|                                    CACHING ARCHITECTURE                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Edge Caching (CDN)      ===> Cache static assets, landing pages, & public APIs.    |
|   2. Memory Caching (Redis)  ===> Store active sessions, API rate counters, & schemas.  |
|   3. Query Caching (ORM)     ===> Cache common SQL responses (such as workspace lists). |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

1.  **Edge Caching (CDN)**: Connects with global CDNs (Cloudflare / ArvanCloud) to cache static assets, marketing landing pages, and public API responses at the edge, reducing server loads.
2.  **In-Memory Application Caching (Redis)**: Caches common user profiles, verified session keys, and database schemas with short-lived TTLs (Time-To-Live of 5-15 minutes).
3.  **Database Query Caching**: ORM queries cache frequent lookup responses (such as subscription tiers and workspace structures), reducing the need for repeated database reads.

---

## 12.5 Disaster Recovery & Business Continuity Policies
To guarantee system reliability and high availability, our recovery plans are built around strict Recovery Point and Recovery Time Objectives:

*   **Recovery Point Objective (RPO)**: Target RPO is under **10 minutes**. In the event of system failure, data loss is restricted to less than 10 minutes of active tracking history.
*   **Recovery Time Objective (RTO)**: Target RTO is under **30 minutes**. The complete dashboard and scoring services must be fully operational within 30 minutes of a major incident.
*   **Database Backup Schedules**:
    *   *Incremental Backups*: Performed automatically every 60 minutes and stored securely across multiple availability zones.
    *   *Full Backups*: Performed daily at 02:00 UTC, encrypted, and archived to durable, off-site object stores.
*   **Active-Passive Regional Failovers**: If a major datacenter experiences a prolonged outage, traffic is redirected to secondary failover nodes using automated DNS Anycast routing, restoring core dashboard services with minimal disruption.
