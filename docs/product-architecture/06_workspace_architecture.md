# 06. Workspace Architecture
## AI Brand Intelligence & Visibility Platform

This document defines the multi-tenant database relationship models and workspace hierarchy. It details how the platform isolates customer data while offering flexible team collaboration and agency account management, scaling seamlessly from individual startups to global enterprises.

---

## 6.1 Multi-Tenant Hierarchy

The database relationships are structured as an interconnected tree model:

```
+-----------------------------------------------------------------------------------------+
|                                  WORKSPACE HIERARCHY                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   Organization (Enterprise Account)                                                     |
|   ├── Workspace 1 (e.g., Regional Brand Division A)                                     |
|   │   ├── Brand Project (Target Domain & Brand Assets)                                  |
|   │   │   ├── Prompt Campaign (Target Search Scenarios & Prompt Lists)                  |
|   │   │   ├── Integrations & Developer API Keys                                         |
|   │   │   └── Exported Reports & Historic Data                                          |
|   │   └── Assigned Team Users & Custom Permissions                                      |
|   └── Workspace 2 (e.g., Regional Brand Division B / Agency Client Workspace)           |
|       └── [Brand Project, Users, Reports, etc.]                                         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 6.2 Structural Database Models & Entities

### 6.2.1 Organization Model (Tenant Parent)
The Organization model is the top-level administrative parent representing the billing account.
*   **Key Fields**: `org_id` (UUID), `org_name` (String), `subscription_tier` (Enum), `billing_status` (Enum), `sso_configuration_id` (UUID, optional).
*   **Relationships**:
    *   **One-to-Many** with Workspaces (An Organization can own multiple Workspaces).
    *   **One-to-Many** with Users (An Organization can invite multiple Users to its workspaces).

### 6.2.2 Workspace Model (Logical Data Boundary)
The Workspace represents an isolated, logical boundary ensuring complete data segregation. Users inside a Workspace cannot view or access data in another Workspace unless they are explicitly assigned to both.
*   **Key Fields**: `workspace_id` (UUID), `org_id` (UUID, Foreign Key), `workspace_name` (String), `timezone` (String).
*   **Relationships**:
    *   **Many-to-One** with Organization.
    *   **One-to-Many** with Brand Projects.
    *   **Many-to-Many** with Users (Through a join table defining workspace-specific roles).

### 6.2.3 Brand Project Model (Semantic Target Entity)
The Brand Project defines the specific corporate entity, target web domain, and product profiles that the system tracks and optimizes.
*   **Key Fields**: `project_id` (UUID), `workspace_id` (UUID, Foreign Key), `brand_name` (String), `target_domain` (String), `target_product_skus` (Array), `wikidata_id` (String, optional).
*   **Relationships**:
    *   **Many-to-One** with Workspace.
    *   **One-to-Many** with Prompt Campaigns.
    *   **One-to-Many** with Competitors.

### 6.2.4 User Model (Identity Entity)
The User model represents an individual account with verified identity and global system parameters.
*   **Key Fields**: `user_id` (UUID), `email` (String), `password_hash` (String), `first_name` (String), `last_name` (String), `preferred_language` (Enum: FA, EN, AR), `mfa_enabled` (Boolean).
*   **Relationships**:
    *   **Many-to-Many** with Workspaces (Through `user_workspace_role` defining specific permissions).

---

## 6.3 Enterprise Agency Scenario

To understand how the workspace architecture handles complex enterprise and agency setups, we map out a multi-client agency scenario:

```
  +-----------------------------------------------------------------------------------+
  |                         Hamid's Agency Organization (AM)                          |
  +-----------------------------------------------------------------------------------+
                                            |
        +-----------------------------------+-----------------------------------+
        |                                                                       |
  +-----v---------------------------------------+                         +-----v---------------------------------------+
  |    Client 1 Workspace (e.g., Brand Alfa)    |                         |    Client 2 Workspace (e.g., Brand Beta)    |
  +---------------------------------------------+                         +---------------------------------------------+
   - Project: Alfa Cosmetics                    |                          - Project: Beta Finance                      |
   - Domain: alfacosmetics.ir                   |                          - Domain: betafinance.ir                     |
   - Scrapers: Daily ChatGPT & Perplexity runs  |                          - Scrapers: Hourly Gemini & Claude runs      |
   - Users:                                     |                          - Users:                                     |
     - Hamid (AM - Manager)                     |                            - Hamid (AM - Manager)                     |
     - Yashar (SS - Agency SEO)                 |                            - Maryam (SS - Corporate SEO)              |
     - Client Alfa Manager (VW - Viewer)        |                            - Client Beta Director (MM - Manager)       |
  +---------------------------------------------+                         +---------------------------------------------+
```

### 6.3.1 Key Isolation Rules
*   **Strict Workspace Boundaries**: Client Alfa's Viewer cannot log in and see Client Beta's projects or reports. All data fetches verify the `workspace_id` variable of the active session.
*   **Flexible Access Control**: Yashar Nouri (Agency SEO) is assigned to Client 1 Workspace to manage campaigns, but has no access to Client 2 Workspace, ensuring complete client confidentiality.
*   **Unified Billing**: Hamid Davari (Agency Owner) receives a single consolidated monthly bill for his entire Agency Organization, based on the total number of active workspaces and tracked query volumes.
