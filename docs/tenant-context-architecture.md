# Enterprise PostgreSQL Tenant Context Pipeline Architecture

This document describes the design, implementation, and security guarantees of the platform's multi-tenant PostgreSQL Row Level Security (RLS) connection-pool isolation pipeline.

---

## 1. Architectural Overview & Security Objectives

To achieve zero-trust tenant isolation, the database layer implements real PostgreSQL Row Level Security. Every tenant-scoped query must execute inside a dedicated database transaction after establishing the PostgreSQL session setting `app.current_tenant_id` via `SET LOCAL`.

The core objectives of the Tenant Context Pipeline are:
1. **Absolute Isolation**: Ensure no database operation can retrieve or modify records belonging to another tenant.
2. **Fail-Fast Defense**: Throw a `TenantContextViolationException` immediately if any tenant-scoped repository or database operation attempts to execute outside an explicit Tenant Context transaction.
3. **Connection Pool Safety**: Guarantee that pooled connection reuse never leaks tenant parameters (`SET LOCAL` binds variables strictly to the active transaction block, discarding them upon COMMIT/ROLLBACK).
4. **High Concurrency Stability**: Safely handle thousands of concurrent requests across multi-tenant contexts without resource leakage or asynchronous scheduling state contamination.

---

## 2. Request Lifecycle

The diagram below outlines the standard lifecycle of a database query:

```
[ Request / Background Worker / Action / CLI ]
                      │
                      ▼
            [ Tenant Resolution ]
                      │
                      ▼
       [ TenantContextManager.runWithTenantContext ]  <--- (AsyncLocalStorage Scope)
                      │
                      ▼
                 [ PG Pool ] ---> connectClient()
                      │
                      ▼
               [ Transaction BEGIN ]
                      │
                      ▼
       [ SET LOCAL app.current_tenant_id = uuid ]
                      │
                      ▼
              [ Execute Queries ]
                      │
                      ▼
            [ Repository / SQL RLS ]
                      │
                      ▼
             [ COMMIT / ROLLBACK ]
                      │
                      ▼
             [ Release client ] ---> (Returned to Pool)
```

---

## 3. Tenant Context Manager (`AsyncLocalStorage`)

The centralized `TenantContextManager` (implemented under `src/core/database/tenant-context/index.ts`) is a pure infrastructure-only utility. It is responsible for propagating execution contexts and manages the `AsyncLocalStorage` instance securely.

### Immutable Context Definition
The active context is completely frozen (`Object.freeze`) upon creation. No execution path is permitted to mutate the `tenantId` or `executionMode` while a context is active.

```typescript
export interface TenantContext {
  readonly tenantId: string | null;
  readonly userId: string | null;
  readonly requestId: string | null;
  readonly executionMode: "tenant" | "system";
  readonly dbClient?: any;
  readonly transactionDepth?: number;
}
```

### Execution Modes
- **Tenant Context**: Default for user-scoped operations. Propagates the active tenant's UUID and enforces RLS.
- **System Context**: Explicitly declared mode used solely for system administrative tasks (e.g., seeding, telemetry, schema migrations) and super-admin actions. It must never be the default and must be explicitly invoked.

---

## 4. Transaction & Session Context Lifecycle

Every tenant-scoped repository and database execution is forced to run within a transaction block.

### Execution Sequence:
1. **Lease Client**: Lease a `PoolClient` connection from the PG connection pool.
2. **Begin Transaction**: Issue a `BEGIN` SQL command.
3. **Inject Session Setting**: Execute `SET LOCAL app.current_tenant_id = <tenant_uuid>`.
4. **Execute Operations**: Execute repository callbacks.
5. **Commit/Rollback**: On completion, issue `COMMIT`. If any exception is raised, issue `ROLLBACK`.
6. **Return Connection**: Automatically release the leased client back to the connection pool.

---

## 5. Transaction Reuse & Savepoints

To optimize performance and resource utilization, the system implements a strict transaction re-use pattern:

- **Transaction Re-use (Default)**: If a nested operation requests a tenant context for the same active tenant ID, the pipeline detects the pre-existing client in the `AsyncLocalStorage` store and re-uses the outer transaction block, incrementing the `transactionDepth` tracker.
- **Nested Savepoints (Explicit)**: If an inner operation requires an independent rollback boundary, it can pass the options parameter `requireNewSavepoint: true`. This creates a PostgreSQL `SAVEPOINT sp_<depth>` and safely executes a partial rollback (`ROLLBACK TO SAVEPOINT`) if that specific sub-operation fails, without aborting the parent transaction.

---

## 6. Failure Scenarios and Security Guarantees

| Scenario | System Defense & Behavior | Security Guarantee |
| :--- | :--- | :--- |
| **Missing Tenant Context** | `isQueryTenantScoped()` detects tenant table reference. `PostgresClient` throws `TenantContextViolationException`. | **Secure-by-default**: Zero query execution allowed. |
| **Cross-Tenant Hijack Attempt** | `enforceTenantContext()` compares target `organizationId` against `TenantContext.tenantId`. | Aborts with `TenantContextViolationException`. |
| **Pooled Client Connection Reuse** | PostgreSQL automatically discards parameters initialized with `SET LOCAL` when a transaction ends. | Connection is safe and clean before returning to the pool. |
| **High Concurrent Load** | Asynchronous execution context is separated at the Node.js V8 execution thread level via `AsyncLocalStorage`. | Zero cross-tenant data bleed. |
| **Administrative / Super-Admin Actions** | Admin tools must explicitly execute inside a `runWithSystemContext` block. | Controlled administrative access is logged in immutable audits. |
