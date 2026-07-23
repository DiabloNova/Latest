# 04. Database Schema Implementation Design
## AI Brand Intelligence & Visibility Platform

This document translates our conceptual data models into an implementation-ready database schema design. It specifies relational tables, database properties, primary/foreign keys, indices, and data partitioning strategies.

---

## 4.1 SQL Schema Definitions (DDL)

The core relational and analytical tables are designed using PostgreSQL dialects:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: organizations
CREATE TABLE organizations (
    org_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_name VARCHAR(255) NOT NULL,
    subscription_tier VARCHAR(50) NOT NULL DEFAULT 'FREE_TRIAL',
    payment_status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: workspaces
CREATE TABLE workspaces (
    workspace_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID NOT NULL REFERENCES organizations(org_id) ON DELETE CASCADE,
    workspace_name VARCHAR(255) NOT NULL,
    default_language VARCHAR(10) NOT NULL DEFAULT 'FA',
    workspace_timezone VARCHAR(100) NOT NULL DEFAULT 'Asia/Tehran',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: brand_projects
CREATE TABLE brand_projects (
    project_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workspace_id UUID NOT NULL REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
    brand_name VARCHAR(255) NOT NULL,
    target_domain VARCHAR(255) NOT NULL,
    wikidata_id VARCHAR(100),
    product_skus JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: prompts
CREATE TABLE prompts (
    prompt_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID NOT NULL REFERENCES brand_projects(project_id) ON DELETE CASCADE,
    prompt_text TEXT NOT NULL,
    frequency VARCHAR(50) NOT NULL DEFAULT 'WEEKLY',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table: ai_responses
CREATE TABLE ai_responses (
    response_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    prompt_id UUID NOT NULL REFERENCES prompts(prompt_id) ON DELETE CASCADE,
    model_id VARCHAR(100) NOT NULL,
    raw_response_text TEXT NOT NULL,
    execution_time_ms INTEGER NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
) PARTITION BY RANGE (created_at); -- Chronological table partitioning
```

---

## 4.2 Tabular Database Indexing Design
To ensure microsecond response times and prevent index decay, we implement targeted database indexes:

### 4.2.1 Multi-Tenant Isolation Indexes
*   Queries inside our database interface layer must include explicit tenant boundaries. We configure composite B-Tree indexes on workspaces and projects to speed up query execution:
    ```sql
    CREATE INDEX idx_workspaces_org ON workspaces(org_id);
    CREATE INDEX idx_projects_workspace ON brand_projects(workspace_id);
    CREATE INDEX idx_prompts_project ON prompts(project_id) WHERE is_active = TRUE;
    ```

### 4.2.2 Time-Series Partition Indexes
*   Scraped observations and mentions are indexed chronologically to speed up chart rendering and historical reports:
    ```sql
    CREATE INDEX idx_responses_created ON ai_responses(created_at DESC);
    ```

---

## 4.3 Data Partitioning & Lifecycle Strategy
*   **Time-Series Partitioning**: The high-volume table `ai_responses` is partitioned monthly by range on the `created_at` column.
    *   *Implementation*: A background cron worker automatically creates a new partition table (e.g., `ai_responses_y2024m12`) 10 days before the start of each month.
*   **Data Archiving**: Responses and logs older than 90 days are automatically backed up, zipped into raw JSON logs, uploaded to S3, and pruned from active database partition tables, ensuring optimal performance.
