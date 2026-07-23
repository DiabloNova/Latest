# 06. Dashboard Layout Blueprints
## AI Brand Intelligence & Visibility Platform

This document defines layout blueprints for six key dashboard interfaces. Each blueprint specifies content hierarchies, placement grids, and layout strategies to guide frontend developers and UI designers.

---

## 6.1 Dashboard Layout Blueprint Configurations

### 6.1.1 Overview Dashboard
*   **Grid Structure**: A responsive grid featuring a 4-column metric cards row, a 2-column center panel layout, and a full-width bottom table.
*   **Main Component Placement**:
    *   *Top Row*: 4 KPI metric cards displaying overall Share of Model Voice (SoMV), sentiment indices, citation counts, and active alert warnings.
    *   *Middle Left (Column Span 2/3)*: A 360px high line chart displaying overall SoMV progress over time.
    *   *Middle Right (Column Span 1/3)*: A vertical list panel detailing real-time, high-priority brand alerts and activity feeds.
    *   *Bottom Row*: A data list table displaying recent conversational brand mentions and their parsed sentiment rankings.

---

### 6.1.2 Analytics Dashboard
*   **Grid Structure**: A high-density analytical layout featuring nested filters, side-by-side charts, and comparison matrices.
*   **Main Component Placement**:
    *   *Top Filter Bar*: Horizontal dropdown selectors to filter data by model types, workspaces, and date ranges.
    *   *Top Row*: KPI cards displaying detailed recommendations, sentiment breakdowns, and model coverage rates.
    *   *Middle Left (Column Span 1/2)*: A multi-line trend chart comparing brand visibility directly with key competitors.
    *   *Middle Right (Column Span 1/2)*: A radar chart displaying brand sentiment across different LLM engines.
    *   *Bottom Row*: A comprehensive competitive comparison table displaying market share changes.

---

### 6.1.3 Monitoring Dashboard
*   **Grid Structure**: A campaign management interface featuring prompt list panels, run history tables, and detail inspectors.
*   **Main Component Placement**:
    *   *Left Column (Column Span 1/3)*: A vertical list displaying all active prompt tracking campaigns and their update frequencies.
    *   *Right Column (Column Span 2/3)*: A details panel displaying selected campaign structures, prompt templates, and historical simulation run lists.
    *   *Inspector Drawer*: Clickable rows slide out a right-aligned detail panel displaying exact raw response transcripts and parsed citation paths.

---

### 6.1.4 Reports Dashboard
*   **Grid Structure**: A simple, card-driven configuration dashboard.
*   **Main Component Placement**:
    *   *Left Side (Column Span 1/2)*: A structured form allowing users to select report templates, customize logos, define date ranges, and schedule PDF delivery times.
    *   *Right Side (Column Span 1/2)*: An interactive card grid displaying pre-built reporting templates and historical exported report file logs.

---

### 6.1.5 Settings Dashboard
*   **Grid Structure**: Split-panel configuration layout.
*   **Main Component Placement**:
    *   *Left Navigation Column*: A vertical settings categories list (Profile, Organization, Workspace, Notifications, Security, API).
    *   *Right Content Column*: A spacious content panel displaying form fields, toggles, input fields, and save buttons corresponding to the selected settings category.

---

### 6.1.6 Admin Dashboard (Security & Audit Logs)
*   **Grid Structure**: Highly compact, data-dense tabular grid layout.
*   **Main Component Placement**:
    *   *Top Row*: KPI metrics cards display total user seats used, organization query quotas, active API key connections, and system statuses.
    *   *Middle Area*: A detailed user access logging list displaying user IDs, activity timestamps, and assigned permissions.
    *   *Bottom Row*: A comprehensive, write-once-read-many (WORM) security audit log table displaying detailed account, security, and billing event histories.
