# 04. Navigation Model
## AI Brand Intelligence & Visibility Platform

This document defines our navigation model, mapping out global header links, dashboard sidebar hierarchies, breadcrumb paths, and search behaviors.

---

## 4.1 Interface Layout Zones Map

```
+-----------------------------------------------------------------------------------------+
|                                  INTERFACE LAYOUT ZONES                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Global Header: Logo | Dropdowns (Features, Solutions, Services) | Auth | Lang   |   |
|   +---------------------------------------------------------------------------------+   |
|   | Sidebar (Dashboard View):                                                       |   |
|   |   - Overview, Visibility Score                                                  |   |
|   |   - Monitoring: Search Monitoring, Mentions, Citations                          |   |
|   |   - Intelligence: Competitors, Entity Graph                                     |   |
|   |   - Actions: Recommendations, Reports, Integrations                             |   |
|   |   - Admin: Team, Billing, Settings                                              |   |
|   +---------------------------------------------------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4.2 Navigation Specifications

### 4.2.1 Global Header Link Structure
*   **Logo Link**: Directs users back to the marketing home page (`/`) or dashboard overview depending on auth session status.
*   **Features Dropdown**: Main software features, including *Visibility Monitoring*, *Competitor Tracking*, *AI Agent*, *Reporting*, and *Analytics*.
*   **Solutions Dropdown**: Segmented by target customer type, including *E-commerce*, *SaaS*, *Startups*, *Agencies*, and *Enterprise*.
*   **Services Dropdown**: Key service offerings, including *AEO*, *GEO*, *AI SEO*, and *Entity Optimization*.
*   **Resources Dropdown**: Educational hubs, including *Academy*, *Tools*, and *Glossary*.
*   **Secondary Actions**: Bilingual language toggle (Persian/English), and clear "Free Trial" or "Demo" CTA buttons.

### 4.2.2 Dashboard Sidebar Navigation
*   **Primary Section (Insights)**:
    *   **Overview**: A unified, high-level summary dashboard.
    *   **Visibility Score**: Analytics and line charts tracking overall Share of Model Voice (SoMV).
*   **Secondary Section (Monitoring)**:
    *   **AI Search Monitoring**: Create, edit, and track prompt monitoring campaigns.
    *   **Brand Mentions**: Log and details panel of parsed brand references.
    *   **Citation Tracking**: Table and details modal of extracted citation links.
*   **Third Section (Intelligence)**:
    *   **Competitors**: Competitor comparison charts and citation source maps.
    *   **Entity Intelligence**: Wikidata, Knowledge Graph, and schema validation tools.
*   **Fourth Section (Actions)**:
    *   **Content Recommendations**: Actionable suggestions and text optimization tools.
    *   **Reports**: PDF/CSV template generation and delivery scheduling settings.
    *   **Integrations**: Developer API keys, Webhooks, and Slack connection cards.
*   **Fifth Section (Administration)**:
    *   **Team**: Manage user roles, permissions, and invitations.
    *   **Billing**: Subscription tiers, payment gateways, and invoice lists.
    *   **Settings**: General workspace and localization configuration panel.

### 4.2.3 Breadcrumb Behavior
*   **Standard Rendering**: Visible on all content and child pages below Level 1.
*   **Breadcrumb Logic**: Reflects the physical taxonomical folder structure of the active workspace path, rather than browser history.
    *   *Example path*: `Overview > Monitoring > Citation Tracking > Details Modal`
    *   *RTL Persian path*: `نمای کلی > پایش و رصد > ردگیری ارجاعات > جزئیات`

### 4.2.4 Search Behavior
*   **Global Command K Bar**: Pressing `Cmd+K` or `Ctrl+K` opens a global modal command palette.
*   **Search Scope**: Allows users to search for specific prompt campaigns, jump directly to dashboard sections, search raw generated transcripts, or access educational glossary terms in real-time.
