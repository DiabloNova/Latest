# 05. Authentication & Authorization Architecture
## AI Brand Intelligence & Visibility Platform

This document defines our enterprise security architecture, detailing identity proofing, multi-tenant session isolations, and role-based access control (RBAC).

---

## 5.1 Identity & Access Architecture

Our authentication and authorization systems implement a Zero-Trust architecture across all layers:

```text
+-----------------------------------------------------------------------------------------+
|                                    ACCESS CONTROL                                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Authentication   ===> Standard email logins, MFA checks, Enterprise SSO/SAML integrations.|
|   2. RBAC Policies    ===> Role-Based Access Control, explicit permission validation layers.|
|   3. Multi-Tenancy    ===> Logical database isolation verifying workspace_id boundaries.|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Session Management Specifications

*   **Internal Dashboard Sessions**: Uses secure, HTTP-only, SameSite=Strict cookies carrying JSON Web Tokens (JWT) signed using RS256 private keys. This prevents Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF) access.
    *   *Session Expiration*: Standard tokens expire after 2 hours. Enterprise sessions can configure custom inactivity timeouts (e.g., 15 minutes of inactivity triggers an automatic logout).
*   **Public API Integrations**: Authenticates via static, secure developer API tokens passed in the HTTP header: `Authorization: Bearer <api_key>`.
    *   *Key Generation*: Public keys are generated on-demand inside the dashboard API settings, cryptographically salted and hashed before storing hashes in the primary database.

---

## 5.3 Role-Based Access Control (RBAC) Matrix

Access permissions are organized into four structural roles to secure multi-user workspaces:

| Role Name | Access Scope | Primary Responsibility | Allowed Actions |
| :--- | :--- | :--- | :--- |
| **Owner** | Full Organization | Billing, security, and administrative settings. | Complete access, including billing upgrades and SSO configurations. |
| **Admin** | Workspace Level | Team management and project onboarding. | Manage team invitations, onboard new brand projects, and configure campaigns. |
| **Analyst** | Workspace Level | Campaign tracking, analysis, and optimization. | Create and configure prompts, run audits, edit content, and export reports. |
| **Viewer** | Workspace Level | Read-only reporting and presentation. | Access Overview dashboards, inspect details, and download generated PDF reports. |

### 5.3.1 Capabilities Permission Grid

| Capability / Action | Owner | Admin | Analyst | Viewer |
| :--- | :---: | :---: | :---: | :---: |
| **Configure Organization SSO/SAML**| Yes | No | No | No |
| **Manage Billing Subscriptions** | Yes | No | No | No |
| **Invite & Delete Team Members** | Yes | Yes | No | No |
| **Onboard Brand Projects** | Yes | Yes | No | No |
| **Manage Prompt Campaigns** | Yes | Yes | Yes | No |
| **Access RAG & Vector Audits** | Yes | Yes | Yes | Yes |
| **View Dashboards (Read-Only)** | Yes | Yes | Yes | Yes |
