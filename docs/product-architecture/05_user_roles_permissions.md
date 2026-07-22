# 05. User Roles & Permissions
## AI Brand Intelligence & Visibility Platform

This document defines the complete User Roles and Permissions matrix. By organizing platform access into eight distinct user roles, we meet the security and compliance requirements of large enterprise clients and multi-client marketing agencies.

---

## 5.1 Roles and Access Levels

Access is divided into eight user roles:

```
+-----------------------------------------------------------------------------------------+
|                                    USER ROLES                                           |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Enterprise Admin   ===> Complete workspace and organization administrative control.|
|   2. Agency Manager     ===> Full multi-client workspace management, billing control.  |
|   3. Marketing Manager  ===> Management of specific brand projects and reports.          |
|   4. SEO Specialist     ===> Setup of prompt campaigns, technical audits, and schema.  |
|   5. Startup User       ===> Balanced self-service workspace control and basic billing.|
|   6. Individual User    ===> Single-user workspace, basic campaign and settings access.|
|   7. Team Member        ===> Content editing and task resolution under assigned projects.|
|   8. Viewer             ===> Read-only dashboard access for executive presentations.   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Detailed Role Definitions

### 5.2.1 Role A: Enterprise Admin (EA)
*   **Access Level**: Full Administrative Access.
*   **Responsibilities**: Complete security, organizational compliance, data isolation, billing configurations, and integration setups for enterprise workspaces.
*   **Allowed Actions**:
    *   Manage all organization workspaces, users, and teams.
    *   Configure Single Sign-On (SSO / SAML) connections.
    *   Access and export comprehensive security audit logs.
    *   Setup and rotate developer API keys and Webhook paths.
    *   Manage enterprise-level billing and annual custom contracts.

### 5.2.2 Role B: Agency Manager (AM)
*   **Access Level**: Multi-Tenant Workspace Administrative Access.
*   **Responsibilities**: Managing multiple client portfolios, managing agency team members, and configuring white-labeled reporting templates.
*   **Allowed Actions**:
    *   Create and delete isolated client workspaces and brand projects.
    *   Assign team members to specific client projects.
    *   Configure white-labeled layouts (agency logos, custom report styling).
    *   Manage agency-level billing plans, payment gateways, and client usage reports.

### 5.2.3 Role C: Marketing Manager (MM)
*   **Access Level**: Strategic Brand Level Access.
*   **Responsibilities**: Monitoring brand visibility campaign performance, tracking competitor benchmarks, and managing strategic report configurations.
*   **Allowed Actions**:
    *   Review high-level visibility, Share of Voice (SoMV), and brand sentiment metrics.
    *   Create and configure automated PDF reporting schedules.
    *   Review competitive comparison grids and brand health alerts.
    *   Add and invite team members to assigned brand projects.

### 5.2.4 Role D: SEO Specialist (SS)
*   **Access Level**: Tactical Execution Access.
*   **Responsibilities**: Setting up prompt campaigns, analyzing citation links, auditing schemas, and tracking technical crawl performance.
*   **Allowed Actions**:
    *   Manage prompt campaigns, keyword structures, and tracking frequencies.
    *   Access deep-dive RAG and vector embedding simulation audits.
    *   Generate, validate, and download on-page JSON-LD schema files.
    *   Configure and optimize robots.txt and llms.txt settings.

### 5.2.5 Role E: Startup User (SU)
*   **Access Level**: Self-Service Standard Access.
*   **Responsibilities**: Managing a growing company profile, tracking early-stage visibility metrics, and managing monthly billing.
*   **Allowed Actions**:
    *   Track up to 2 brands and competitors.
    *   Create basic prompt campaigns and review historical response transcripts.
    *   Export standard PDF visibility reports.
    *   Manage monthly subscription billing and account preferences.

### 5.2.6 Role F: Individual User (IU)
*   **Access Level**: Single User Basic Access.
*   **Responsibilities**: Self-service tracking of a single brand profile and personal project preferences.
*   **Allowed Actions**:
    *   Track 1 brand and basic competitor visibility metrics.
    *   Edit single-workspace settings and view overall visibility charts.
    *   Upgrade or cancel basic monthly billing subscriptions.

### 5.2.7 Role G: Team Member (TM)
*   **Access Level**: Contributor Level Access.
*   **Responsibilities**: Reviewing assigned content recommendations, writing optimized articles, and marking technical tasks as resolved.
*   **Allowed Actions**:
    *   View content audits and optimization suggestions inside assigned projects.
    *   Access the semantic content editor to draft and optimize text.
    *   Mark optimization tasks and alerting notifications as resolved.
    *   Comment on brand alerts and project collaboration timelines.

### 5.2.8 Role H: Viewer (VW)
*   **Access Level**: Read-Only Access.
*   **Responsibilities**: Accessing key dashboards for board meetings, executive presentations, or client reviews.
*   **Allowed Actions**:
    *   View Overview and Visibility Score charts.
    *   Read historical prompt transcripts and competitive benchmark tables.
    *   Download and export manually compiled PDF reports.
    *   *Restricted*: Cannot add, modify, or delete any campaigns, team members, schemas, or billing settings.

---

## 5.3 Permissions Matrix (Role-Based Access Control)

| Capability / Action | EA | AM | MM | SS | SU | IU | TM | VW |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Manage SSO/SAML Security** | Yes | No | No | No | No | No | No | No |
| **Access Security Audit Logs** | Yes | No | No | No | No | No | No | No |
| **Manage Developer API / Webhooks**| Yes | No | No | No | No | No | No | No |
| **Create/Delete Client Workspaces** | Yes | Yes | No | No | No | No | No | No |
| **Configure White-Labeling** | Yes | Yes | No | No | No | No | No | No |
| **Manage Billing Subscriptions** | Yes | Yes | No | No | Yes | Yes | No | No |
| **Edit Team Permissions** | Yes | Yes | Yes | No | No | No | No | No |
| **Manage Prompt Campaigns** | Yes | Yes | Yes | Yes | Yes | Yes | No | No |
| **View RAG & Vector Audits** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
| **Optimize & Edit Content** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | No |
| **View Dashboards (Read-Only)** | Yes | Yes | Yes | Yes | Yes | Yes | Yes | Yes |
