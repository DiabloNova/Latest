# 03. API Design & Endpoint Architecture
## AI Brand Intelligence & Visibility Platform

This document defines the complete API architecture, specifying API design principles, internal/external REST endpoints, response structures, and versioning strategies.

---

## 3.1 API Design Principles
Our API architecture follows strict standards to guarantee consistency, scalability, and developer-friendliness:
*   **RESTful Standards**: Standard resource naming conventions, HTTP action verbs (`GET`, `POST`, `PUT`, `DELETE`), and standard HTTP status code mapping.
*   **JSON Payload Contracts**: All request and response payloads must strictly validate against TypeScript definitions and OpenAPI/Swagger JSON-LD models.
*   **Secure Authentication**: All requests require validated session cookies (internal) or bearer API tokens (public).

---

## 3.2 Public API Endpoint Specifications

All public API endpoints are versioned strictly using path subdirectories (e.g., `/v1/public/`):

### 3.2.1 Group A: Brand Intelligence APIs
*   **Trigger On-Demand Scan**
    *   *Path*: `POST /v1/public/scans`
    *   *Required Payload*:
        ```json
        {
          "domain": "alfacosmetics.ir",
          "prompt_context": "best local face moisturizers"
        }
        ```
    *   *Response Code*: `202 Accepted`
    *   *Response Payload*: `{"task_id": "9b1c-d762-e431", "status": "QUEUED"}`

### 3.2.2 Group B: Entity Intelligence APIs
*   **Get Entity Details**
    *   *Path*: `GET /v1/public/entities/{wikidata_id}`
    *   *Response Code*: `200 OK`
    *   *Response Payload*: Returns parsed entity properties, types, and connection mappings.

### 3.2.3 Group C: Competitive Intelligence APIs
*   **Get Competitor Comparison**
    *   *Path*: `GET /v1/public/projects/{project_id}/competitors`
    *   *Response Code*: `200 OK`
    *   *Response Payload*: Returns comparative Share of Model Voice (SoMV) and brand sentiment metrics.

---

## 3.3 REST Error Response Standards

To ensure consistent error handling, all API error responses follow a standardized JSON schema:

```json
{
  "status_code": 400,
  "error_code": "INVALID_DOMAIN_FORMAT",
  "message": "We were unable to reach http://alfacosmetics.ir. Please check spelling.",
  "timestamp": "2024-11-15T12:00:00Z",
  "path": "/v1/public/scans"
}
```

### 3.3.1 Common Error Code Mapping
*   `400 Bad Request`: `INVALID_INPUT_PARAMS`, `INVALID_DOMAIN_FORMAT`.
*   `401 Unauthorized`: `EXPIRED_JWT_TOKEN`, `INVALID_API_KEY`.
*   `403 Forbidden`: `TENANT_ACCESS_DENIED` (triggered if a user requests data outside their active workspace bounds).
*   `429 Too Many Requests`: `API_RATE_LIMIT_EXCEEDED` (includes retry headers defining reset time stamps).
