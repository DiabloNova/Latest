# 02. Workspace Architecture
## AI Brand Intelligence & Visibility Platform

This document defines our SaaS workspace architecture, detailing how the platform manages multi-tenant isolation, workspace switching, multi-brand projects, and team hierarchies.

---

## 2.1 Workspace Hierarchical Structure

The platform uses a clear, nested multi-tenant hierarchy:

```
+-----------------------------------------------------------------------------------------+
|                                  WORKSPACE HIERARCHY                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   Organization (Enterprise Account)                                                     |
|   ├── Workspace 1 (e.g., Regional Division A)                                           |
|   │   ├── Brand Project (Target Domain & Brand Assets)                                  |
|   │   │   ├── Prompt Campaign (Scraping parameters and prompt lists)                    |
|   │   │   └── Team Members & Custom Roles                                               |
|   │   └── Integrations, Reports, and Billing                                            |
|   └── Workspace 2 (e.g., Agency Client Portfolio Workspace)                             |
|       └── [Brand Project, Team, Reports, etc.]                                          |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 2.2 Core Tenant Entities

### 2.2.1 Organization (The Billing Parent)
*   **Definition**: The primary legal, administrative, and billing parent representing the corporate account.
*   **Key Controls**: Manages consolidated pricing, annual contracts, Single Sign-On (SSO / SAML) connections, and administrative security audit logs.

### 2.2.2 Workspace (The Logical Boundary)
*   **Definition**: An isolated logical boundary. Users inside a Workspace cannot view or access data in another Workspace unless they are explicitly assigned to both.
*   **Key Controls**: Manages workspace-specific team memberships, alert settings, integrations, and report history logs.

### 2.2.3 Brand Project (The Target Brand)
*   **Definition**: The target brand name, domain, and product SKUs being tracked.
*   **Key Controls**: Manages prompt monitoring campaigns, competitor targets, and entity Wikidata mappings.

---

## 2.3 Workspace Switching & Global Context Behavior

To simplify navigation across complex multi-workspace or multi-client structures, the application shell implements a global workspace context bar:

```
+-----------------------------------------------------------------------------------------+
|                                 WORKSPACE SWITCHER FLOW                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Click Switcher Dropdown ===> Opens searchable list of associated workspaces.       |
|   2. Select New Workspace    ===> Instantly updates active session context.             |
|   3. System Refresh          ===> BFF clears caches, loading new workspace data.        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 2.3.1 Active Context Isolation Rules
*   **Strict Access Validation**: Every API request and data fetch validates the user's active workspace session context. If a user tries to access a project belonging to another workspace without permissions, the API gateway immediately blocks the request and returns an HTTP `403 Forbidden` error.
*   **Global Navigation Adaptation**: Switching workspaces instantly updates all navigation menus, active campaigns, and billing tiers to reflect the new workspace parameters.
*   **State Preservations**: The platform remembers the last active workspace and brand project visited, automatically loading them on the next login session to ensure a smooth, low-friction user experience.
