# 10. Engineering Standards & Coding Patterns
## AI Brand Intelligence & Visibility Platform

This document defines the strict coding, testing, styling, and security standards that every future development sprint, frontend layout, backend database, and AI service integration must follow.

---

## 10.1 Key Engineering Principles

```text
+-----------------------------------------------------------------------------------------+
|                                  ENGINEERING PRINCIPLES                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. TypeScript Strict ===> Type safety mandatory across both frontend and backend views.|
|   2. Multi-Tier Tests  ===> Target 80% coverage on unit, integration, and E2E runs.    |
|   3. SEC-Ops Compliant ===> Secure inputs validations, password hashes, and encryption. |
|   4. Clean Performance ===> Target LCP < 1.5s, API Latency < 200ms on basic queries.    |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 10.2 Quality & Coding Guidelines

### 10.2.1 Frontend Coding Patterns (React / Next.js)
*   **TypeScript Strict Mode**: The compiler flag `"strict": true` is enforced. Avoid the use of `any` types; all API payloads, components, and hooks must utilize explicit interface mappings.
*   **RTL Layout Readiness**: CSS styles must use logical properties (e.g., `margin-inline-start` instead of `margin-left`) to handle LTR/RTL mirror configurations automatically.
*   **Accessibility (a11y)**: Focus rings must remain highly visible, and all pure icon buttons require descriptive `aria-label` tags.

### 10.2.2 Backend Coding Patterns (TypeScript NestJS & Python FastAPI)
*   **Input Validation (SEC-Ops)**: All API input endpoints must validate payloads against strict classes (using `class-validator` in NestJS or `Pydantic` in Python). Invalid or malicious payloads are blocked before reaching database queries.
*   **ACID Transaction Gaps**: Use managed transaction contexts (`START TRANSACTION ... COMMIT`) for complex operations that write across multiple tables (e.g., creating an organization and billing account simultaneously), preventing partial or corrupted writes.

### 10.2.3 Database & Indexing standards
*   **Multi-tenant Safety**: All queries fetching workspace or project data must include explicit `workspace_id` parameters. Any database update missing tenant constraints is blocked at the interface level.
*   **Index Optimizations**: Avoid redundant indexes on columns with low cardinality (such as boolean flags). Composite B-Tree indexes must align directly with common dashboard query boundaries.

### 10.2.4 AI & LLM Service Standards
*   **Timeout & Retries**: All external model API calls must implement a fixed timeout (e.g., 10 seconds) and support up to 3 automatic retries with exponential backoff before logging an API failure.
*   **Payload Normalization**: Abstraction adapters must normalize varied third-party JSON formats into our standardized, immutable system data formats.

---

## 10.3 Testing Strategy

To guarantee platform stability, we implement a multi-tiered testing plan:

1.  **Unit Tests (Vitest / Jest)**: Test individual helper functions, data formatters, and utility hooks.
    *   *Target*: 80% code coverage.
2.  **Integration Tests (Supertest)**: Validate REST API endpoints, input class checks, and relational database writes.
3.  **End-to-End Tests (Playwright)**: Simulate full, critical user journeys (such as registration, workspace switching, and campaign setups) across actual browsers.
