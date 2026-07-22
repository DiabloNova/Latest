# 06. API Architecture
## AI Brand Intelligence & Visibility Platform

This API architecture defines our system's REST endpoint structures, authentication flows, internal service coordination, routing configurations, and rate-limiting rules. It provides the integration framework for our engineering and partner teams.

---

## 6.1 Routing & Endpoint Hierarchies

All public and internal client-side API requests route through a high-performance API gateway:

```
+-----------------------------------------------------------------------------------------+
|                                    API ROUTING SCHEME                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   Client App (Next.js CSR) / Public Developers                                           |
|                           |                                                             |
|                           v                                                             |
|                   +---------------+                                                     |
|                   |  API Gateway  |                                                     |
|                   +-------+-------+                                                     |
|                           |                                                             |
|          +----------------+----------------+                                            |
|          |                                 |                                            |
|   +------v-------+                  +------v-------+                                    |
|   | /v1/internal |                  |  /v1/public  |                                    |
|   | (Auth-Cookie)|                  |  (Auth-Token)|                                    |
|   +--------------+                  +--------------+                                    |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 6.2 Key Endpoint Specifications

### 6.2.1 Group A: Workspace & Project Endpoints
*   **Create Workspace**
    *   *Path*: `POST /v1/internal/workspaces`
    *   *Required Payload*: `{"workspace_name": "Tehran Retail", "default_language": "FA", "timezone": "Asia/Tehran"}`
    *   *Response Code*: `201 Created`
*   **Onboard Brand Project**
    *   *Path*: `POST /v1/internal/workspaces/{workspace_id}/projects`
    *   *Required Payload*: `{"brand_name": "Alfa Cosmetics", "target_domain": "alfacosmetics.ir", "product_skus": ["SKU-101", "SKU-102"]}`
    *   *Response Code*: `201 Created`

### 6.2.2 Group B: AI Search Monitoring & Telemetry Endpoints
*   **Create Tracking Prompt**
    *   *Path*: `POST /v1/internal/projects/{project_id}/prompts`
    *   *Required Payload*: `{"prompt_text": "Top skin serums in Iran", "frequency": "DAILY", "target_engines": ["chatgpt", "perplexity"]}`
    *   *Response Code*: `201 Created`
*   **Get Brand Visibility Scores**
    *   *Path*: `GET /v1/internal/projects/{project_id}/visibility-scores`
    *   *Parameters*: `?interval=30d&engine=chatgpt`
    *   *Response Payload*: Contains historical SoMV values, recommendation counts, and trend directions.
    *   *Response Code*: `200 OK`
*   **Get Brand Mentions & Sentiment**
    *   *Path*: `GET /v1/internal/projects/{project_id}/mentions`
    *   *Parameters*: `?sentiment=negative&limit=50`
    *   *Response Payload*: List of parsed mentions, raw response snippets, and sentiment indexes.
    *   *Response Code*: `200 OK`

### 6.2.3 Group C: Public Integrator Developer Endpoints
*   **Trigger On-Demand Scan (Public API)**
    *   *Path*: `POST /v1/public/scans`
    *   *Header*: `Authorization: Bearer <developer_api_key>`
    *   *Required Payload*: `{"domain": "alfacosmetics.ir", "prompt_context": "best local face moisturizers"}`
    *   *Response Code*: `202 Accepted` (Dispatches an asynchronous worker job, returns task ID).

---

## 6.3 Authentication & Session Management
*   **Dashboard User Session**: Uses secure, HTTP-only, SameSite=Strict cookies carrying JSON Web Tokens (JWT) signed using RS256 keys. This prevents Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) access.
*   **Public API Integrations**: Authenticates via static, secure developer API tokens passed in the HTTP header: `Authorization: Bearer <api_key>`.
    *   *Key Generation*: Public keys are generated on-demand inside the dashboard API settings, cryptographically salted and hashed before storing hashes in the primary database.

---

## 6.4 Versioning & Routing Policies
*   **Path-Based Versioning**: Public APIs are versioned strictly using path subdirectories (e.g., `/v1/public/scans`, `/v2/public/scans`), ensuring backwards compatibility for corporate developer integrations.
*   **Deprecation Policy**: Old version routes trigger an HTTP Header warning: `Sunset: Wed, 11 Nov 2026 00:00:00 GMT` accompanied by deprecation emails sent to active developer contacts 12 months before path sunsetting.

---

## 6.5 Rate Limiting Rules & Tiers
The platform implements IP and Token-based rate limiting inside the API Gateway, managed in memory by Redis cache clusters:

| Endpoint Group | Subscription Tier | Rate Limit Ceiling |
| :--- | :---: | :--- |
| **Internal Dashboard APIs** | All Accounts | 300 requests / minute / IP |
| **Public Developer APIs** | Starter | 15 requests / minute / Token |
| **Public Developer APIs** | Growth / Agency | 100 requests / minute / Token |
| **Public Developer APIs** | Enterprise | 500 requests / minute / Token (Customizable) |
| **Public On-Demand Scan API**| All Accounts | 5 requests / minute / Token (To protect worker capacity) |

*   **Limit Exceeded Action**: Returns standard HTTP status code `429 Too Many Requests` along with headers defining retry schedules:
    *   `X-RateLimit-Limit: 100`
    *   `X-RateLimit-Remaining: 0`
    *   `X-RateLimit-Reset: 1731671755` (Unix epoch timestamp indicating reset schedule).
