# 02. Entity Relationship Model (ERM)
## AI Brand Intelligence & Visibility Platform

This document defines our conceptual Entity Relationship (ER) model, specifying entity attributes, keys, foreign references, cardinality, ownership, and lifecycles. It provides the database schema footprint for system engineering.

---

## 2.1 Entity Relationship Diagram (Conceptual)

```
[Organization] (1) <--- owns ---> (N) [Workspace]
                                       |
                                       +--- (1) <--- isolates ---> (N) [BrandProject]
                                       |                                    |
                                       +--- (N) <--- holds ------> (M) [User] (workspace_role join)
                                                                            |
                                       +------------------------------------+
                                       |
                                [BrandProject] (1)
                                       |
         +-----------------------------+-----------------------------+
         |                                                           |
   (N) [Competitor]                                            (N) [Prompt]
         |                                                           |
         |                                                     (1) [Prompt] (1) <--- runs on ---> (N) [AI_Response]
         |                                                                                               |
         |                                                                                               v
         +--- (N) <--- matches ------------------------------------------------------------- (N) [BrandMention]
         |                                                                                               |
         +--- (N) <--- traces -------------------------------------------------------------- (N) [LinkCitation]
```

---

## 2.2 Conceptual Entities Definition

### 2.2.1 `Organization` Entity
*   **Description**: The primary legal, billing, and administrative parent.
*   **Key Attributes**: `org_id` (PK, UUID), `org_name` (String), `subscription_tier` (Enum), `payment_status` (Enum).
*   **Cardinality & Relations**:
    *   **1:N** with `Workspace`. One organization can own multiple workspaces.
    *   **1:N** with `BillingInvoice`. One organization accumulates multiple invoices over time.
*   **Ownership**: Owned by the primary subscribing customer.
*   **Lifecycle**: Created on subscription sign-up; persists until the account is closed. Deletion triggers cascading soft-deletes across all child workspaces and data records.

### 2.2.2 `Workspace` Entity
*   **Description**: Isolated operational boundary managing specific brands, campaigns, and team members.
*   **Key Attributes**: `workspace_id` (PK, UUID), `org_id` (FK, UUID), `workspace_name` (String), `default_language` (Enum).
*   **Cardinality & Relations**:
    *   **N:1** with `Organization`. A workspace belongs to exactly one organization.
    *   **1:N** with `BrandProject`. A workspace holds multiple brand projects.
    *   **N:M** with `User`. Connected via the join table `workspace_team_member` which defines project roles.
*   **Ownership**: Owned by the parent `Organization`.
*   **Lifecycle**: Managed by Workspace Admins. Deletion triggers cascading deletes of campaigns and local report caches, maintaining historical billing records at the organization level.

### 2.2.3 `User` Entity
*   **Description**: System credentials, identity parameters, and preferences.
*   **Key Attributes**: `user_id` (PK, UUID), `email` (String, Unique), `password_hash` (String), `preferred_language` (Enum).
*   **Cardinality & Relations**:
    *   **N:M** with `Workspace` through `workspace_team_member`.
*   **Ownership**: Independent system identity.
*   **Lifecycle**: Created on signup; persists unless deleted by the user or suspended by system administrators.

### 2.2.4 `BrandProject` Entity
*   **Description**: The primary tracking domain and entity definitions.
*   **Key Attributes**: `project_id` (PK, UUID), `workspace_id` (FK, UUID), `brand_name` (String), `target_domain` (String), `wikidata_id` (String).
*   **Cardinality & Relations**:
    *   **N:1** with `Workspace`. A project belongs to one workspace.
    *   **1:N** with `Prompt`. A brand project holds multiple prompt monitoring tasks.
    *   **1:N** with `Competitor`. A brand project monitors multiple competitive targets.
*   **Ownership**: Owned by the active `Workspace`.
*   **Lifecycle**: Managed by Marketing Managers. Deletion triggers cascading soft-deletes across child prompts, responses, mentions, and citations to preserve system data integrity.

### 2.2.5 `Prompt` Entity
*   **Description**: The target tracking query and scenario template.
*   **Key Attributes**: `prompt_id` (PK, UUID), `project_id` (FK, UUID), `prompt_text` (Text), `frequency` (Enum), `is_active` (Boolean).
*   **Cardinality & Relations**:
    *   **N:1** with `BrandProject`.
    *   **1:N** with `AIResponse`. A prompt campaign generates multiple historical response runs.
*   **Ownership**: Owned by the parent `BrandProject`.
*   **Lifecycle**: Created by SEO Specialists; runs periodically according to schedule settings. Deletion deletes future schedules and updates existing run logs to state `PROMPT_REMOVED`.

### 2.2.6 `AIResponse` Entity
*   **Description**: Raw outputs captured from conversational engine prompt simulations.
*   **Key Attributes**: `response_id` (PK, UUID), `prompt_id` (FK, UUID), `model_id` (FK, UUID), `raw_response_text` (Text), `execution_time_ms` (Integer), `created_at` (Timestamp).
*   **Cardinality & Relations**:
    *   **N:1** with `Prompt`.
    *   **1:N** with `BrandMention` and `LinkCitation` models.
*   **Ownership**: Immutable analytical record owned by the executing system.
*   **Lifecycle**: Generated automatically by scraper workers. Retained for 12 to 36 months based on database retention settings before being archived.

### 2.2.7 `BrandMention` Entity
*   **Description**: Parsed mentions and sentiment evaluations of the brand or competitors inside an AI response.
*   **Key Attributes**: `mention_id` (PK, UUID), `response_id` (FK, UUID), `entity_id` (FK, UUID), `sentiment_score` (Decimal), `context_snippet` (Text).
*   **Cardinality & Relations**:
    *   **N:1** with `AIResponse`.
    *   **N:1** with `Competitor` or `BrandProject` through entity connections.
*   **Ownership**: Analytical child record of the parent `AIResponse`.
*   **Lifecycle**: Generated on response ingestion. Archiving of the parent `AIResponse` triggers archiving of its associated mentions.

### 2.2.8 `LinkCitation` Entity
*   **Description**: Deep hyperlink citation source and reference extracted from conversational answers.
*   **Key Attributes**: `citation_id` (PK, UUID), `response_id` (FK, UUID), `cited_domain` (String), `full_citation_url` (String), `anchor_text` (String).
*   **Cardinality & Relations**:
    *   **N:1** with `AIResponse`.
*   **Ownership**: Analytical child record of `AIResponse`.
*   **Lifecycle**: Extracted during response processing; shares the exact archiving schedule of the parent `AIResponse`.
