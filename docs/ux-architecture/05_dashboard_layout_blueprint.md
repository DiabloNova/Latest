# 05. Dashboard Layout Blueprint
## AI Brand Intelligence & Visibility Platform

This layout blueprint outlines the structural zone divisions, UI element sizing, alignment grids, content hierarchies, and viewport priorities for our core dashboard screens, ensuring design consistency for frontend developers and UX designers.

---

## 5.1 Dashboard Screen Blueprint (Anatomy)

```
+-----------------------------------------------------------------------------------------+
|                                  SCREEN BLUEPRINT                                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Global Header Zone: Logo | Context Select | Global Cmd+K | User Profile         |   |
|   +---------------------------------------------------------------------------------+   |
|   | Left Sidebar (240px) | Main Canvas Content Area                                 |   |
|   | - Nav items          |  - Breadcrumbs & Title Zone                              |   |
|   | - Collapse toggle    |  - Primary KPI Metrics Banner (3-4 Cards)                |   |
|   |                      |  - Interactive Charts/Data Visualization Panel           |   |
|   |                      |  - Master Data Table / Action Item List                  |   |
|   +----------------------+----------------------------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Layout Zone Definitions

### 5.2.1 Zone 1: Global Header
*   **Dimensions**: Height 64px fixed; full viewport width.
*   **Alignment Grid**: Horizontal flex container. Left-aligned logo, center-aligned global command search bar, and right-aligned user profile details. In RTL view, alignments mirror automatically.
*   **Primary Elements**: Brand logo mark, workspace selector dropdown, unified search input, alert notifications button, and user settings profile button.

### 5.2.2 Zone 2: Navigation Sidebar
*   **Dimensions**: Width 240px fixed (collapsible to 64px icon-only state); full height of the viewport minus the 64px header.
*   **Alignment Grid**: Vertical block container with flex layout.
*   **Primary Elements**: Collapsible logo toggle, categorized links (Insights, Monitoring, Settings), and plan usage progress bar.

### 5.2.3 Zone 3: Breadcrumbs & Title
*   **Dimensions**: Full width of the main canvas; padding-bottom 24px.
*   **Primary Elements**: Standard hierarchical breadcrumbs, primary screen title (H1, bold, 24px), page subtitle, and date filters or export actions.

### 5.2.4 Zone 4: Key Performance Indicator (KPI) Metric Cards
*   **Dimensions**: Height 120px; responsive grid width (1 column on mobile, 2 columns on tablet, 4 columns on desktop).
*   **Primary Elements**: Display 3 or 4 metric cards tracking high-level performance:
    *   *Card 1*: Overall Share of Model Voice (SoMV) with positive/negative delta indicator.
    *   *Card 2*: Conversational Sentiment Index.
    *   *Card 3*: Total Link Citation count.
    *   *Card 4*: Open critical alerts count.

### 5.2.5 Zone 5: Primary Analytical Visualizations
*   **Dimensions**: Height 360px; grid-column span 2/3 on desktop.
*   **Primary Elements**: Dynamic, responsive charts mapping performance over time (e.g., line charts tracking SoMV trends across platforms, or radar charts comparing competitor visibility).

### 5.2.6 Zone 6: Master Data Table & Alerts List
*   **Dimensions**: Auto-height based on row limits (usually set to 10 or 25 rows); pagination navigation controls at bottom.
*   **Primary Elements**: Data list tables with sortable columns, inline status badges, actions columns, and a slide-out modal panel to inspect row details.
