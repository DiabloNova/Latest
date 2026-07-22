# 04. Data Dictionary
## AI Brand Intelligence & Visibility Platform

This data dictionary defines our core database entities, primary keys, foreign keys, data types, constraints, and business rules, ensuring technical consistency for engineering and database teams.

---

## 4.1 Transactional Entity Schema Specs

### 4.1.1 Entity: `organizations`
*   **Database Table**: `organizations`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `org_id` | `UUID` | **PK** | Globally unique organization ID. |
| `org_name` | `VARCHAR(255)` | `NOT NULL` | The registered corporate organization name. |
| `subscription_tier` | `VARCHAR(50)` | `NOT NULL`, Default: 'FREE_TRIAL' | Options: 'FREE_TRIAL', 'STARTER', 'GROWTH', 'AGENCY', 'ENTERPRISE'. |
| `payment_status` | `VARCHAR(50)` | `NOT NULL`, Default: 'ACTIVE' | Options: 'ACTIVE', 'PAST_DUE', 'SUSPENDED'. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | The exact creation timestamp. |
| `updated_at` | `TIMESTAMPTZ` | `NOT NULL` | Automatically updated on record change. |

---

### 4.1.2 Entity: `workspaces`
*   **Database Table**: `workspaces`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `workspace_id` | `UUID` | **PK** | Globally unique workspace ID. |
| `org_id` | `UUID` | **FK** references `organizations.org_id` | Linked organization parent. Cascades deletes. |
| `workspace_name` | `VARCHAR(255)` | `NOT NULL` | The display name (e.g., "Cosmetics division"). |
| `default_language` | `VARCHAR(10)` | `NOT NULL`, Default: 'FA' | Options: 'FA' (Persian), 'EN' (English), 'AR' (Arabic). |
| `workspace_timezone` | `VARCHAR(100)` | `NOT NULL`, Default: 'Asia/Tehran' | Controls scheduled cron job execution times. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL` | Time of creation. |

---

### 4.1.3 Entity: `users`
*   **Database Table**: `users`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `user_id` | `UUID` | **PK** | Globally unique user identifier. |
| `email` | `VARCHAR(255)` | `UNIQUE`, `NOT NULL` | Case-insensitive unique login email. |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Securely hashed password (using bcrypt/argon2). |
| `first_name` | `VARCHAR(100)` | `NOT NULL` | User’s first name. |
| `last_name` | `VARCHAR(100)` | `NOT NULL` | User’s last name. |
| `mfa_enabled` | `BOOLEAN` | `NOT NULL`, Default: `FALSE` | Toggle multi-factor login checks. |
| `user_status` | `VARCHAR(50)` | `NOT NULL`, Default: 'PENDING' | Options: 'PENDING', 'ACTIVE', 'SUSPENDED'. |

---

### 4.1.4 Entity: `brand_projects`
*   **Database Table**: `brand_projects`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `project_id` | `UUID` | **PK** | Globally unique brand project identifier. |
| `workspace_id` | `UUID` | **FK** references `workspaces.workspace_id` | Isolated parent workspace. Deletes cascade. |
| `brand_name` | `VARCHAR(255)` | `NOT NULL` | The primary corporate brand name. |
| `target_domain` | `VARCHAR(255)` | `NOT NULL` | Primary website domain under monitoring. |
| `wikidata_id` | `VARCHAR(100)` | `NULL` | Optional reference link to Wikidata entry. |
| `product_skus` | `JSONB` | `NOT NULL`, Default: '[]' | List of monitored product codes and SKUs. |

---

### 4.1.5 Entity: `prompts`
*   **Database Table**: `prompts`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `prompt_id` | `UUID` | **PK** | Unique prompt identifier. |
| `project_id` | `UUID` | **FK** references `brand_projects.project_id` | Linked project parent. Cascades deletes. |
| `prompt_text` | `TEXT` | `NOT NULL` | Raw conversational search query prompt. |
| `frequency` | `VARCHAR(50)` | `NOT NULL`, Default: 'WEEKLY' | Options: 'HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY'. |
| `is_active` | `BOOLEAN` | `NOT NULL`, Default: `TRUE` | Toggle active status for scheduling engine. |

---

## 4.2 Analytical Observation Schema Specs

### 4.2.1 Entity: `ai_responses`
*   **Database Table**: `ai_responses`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `response_id` | `UUID` | **PK** | Unique response execution instance ID. |
| `prompt_id` | `UUID` | **FK** references `prompts.prompt_id` | Linked prompt trigger. Cascades deletes. |
| `model_id` | `VARCHAR(100)` | `NOT NULL` | Target LLM version (e.g., 'gpt-4o', 'claude-3-5'). |
| `raw_response_text` | `TEXT` | `NOT NULL` | Raw text response returned by the model. |
| `execution_time_ms` | `INTEGER` | `NOT NULL` | Processing latency in milliseconds. |
| `created_at` | `TIMESTAMPTZ` | `NOT NULL`, Default: `NOW()` | Time of scrape completion. |

---

### 4.2.2 Entity: `brand_mentions`
*   **Database Table**: `brand_mentions`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `mention_id` | `UUID` | **PK** | Unique parsed mention ID. |
| `response_id` | `UUID` | **FK** references `ai_responses.response_id` | Parent response. Cascades deletes. |
| `brand_entity_type` | `VARCHAR(50)` | `NOT NULL` | Options: 'PRIMARY_BRAND', 'COMPETITOR'. |
| `matched_brand_name` | `VARCHAR(255)` | `NOT NULL` | Extracted brand text snippet matched by NLP. |
| `sentiment_score` | `NUMERIC(5,2)` | `NOT NULL` | Score from -1.00 (Negative) to +1.00 (Positive). |
| `context_snippet` | `TEXT` | `NOT NULL` | Text context surrounding the matched mention. |

---

### 4.2.3 Entity: `link_citations`
*   **Database Table**: `link_citations`
*   **Attributes**:

| Attribute Name | Data Type | Key / Constraint | Business Rule / Description |
| :--- | :--- | :---: | :--- |
| `citation_id` | `UUID` | **PK** | Unique parsed citation identifier. |
| `response_id` | `UUID` | **FK** references `ai_responses.response_id` | Parent response. Cascades deletes. |
| `cited_domain` | `VARCHAR(255)` | `NOT NULL` | Extracted base host domain (e.g., `alfacosmetics.ir`).|
| `full_citation_url` | `TEXT` | `NOT NULL` | Complete citation hyperlink URL. |
| `anchor_text` | `VARCHAR(255)` | `NULL` | Anchor text associated with the citation link. |
| `is_client_domain` | `BOOLEAN` | `NOT NULL` | True if the citation links to the client domain. |
