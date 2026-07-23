# 10. Dashboard Interaction Patterns
## AI Brand Intelligence & Visibility Platform

This document defines the interaction patterns used across our Core Intelligence modules, detailing hover states, table expansion controls, comparison views, drill-down panels, dynamic cross-filters, and bookmarking systems.

---

## 10.1 Key Interaction Behaviors

Our layout templates utilize seven recurring interaction patterns:

```
+-----------------------------------------------------------------------------------------+
|                                  INTERACTION PATTERNS                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Inline Hovers    ===> 100ms transitions on links, buttons, and chart data points.  |
|   2. Table Expands    ===> Accordion row expansions reveal detailed text logs.         |
|   3. Compare Modes    ===> Side-by-side matrices comparing brand vs. competitor details.|
|   4. Drill-Down Nav   ===> Click a row to slide in a right-aligned details drawer.       |
|   5. Cross-Filtering  ===> Selecting a chart category instantly filters all other cards. |
|   6. Exporting Files  ===> Quick buttons to download high-resolution PDF or CSV files.  |
|   7. Bookmark & Share ===> Bookmark views, and share filter configurations via URLs.   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 10.2 Interaction Specifications

### 10.2.1 Hover Actions (Telemetry tooltips)
*   *Interaction*: Hovering over data points on our charts reveals interactive tooltips displaying precise scores and competitor values.
*   *Motion*: Subtle opacity fades over `100ms` with an `ease-in-out` curve.

### 10.2.2 Expand Actions (Row detail toggles)
*   *Interaction*: Clicking a row inside our tables expands an inline accordion section directly below the row, displaying additional details (e.g., campaign description or recent log entries) without leaving the list view.
*   *Motion*: Vertical expand transition over `250ms` (`duration-normal`).

### 10.2.3 Compare Configurations
*   *Interaction*: Toggling "Compare Mode" splits card layouts into side-by-side matrices comparing brand metrics directly with configured competitors.
*   *Aesthetics*: Compares data using alternating row backgrounds to maintain structure.

### 10.2.4 Drill-Down Panel (Sliding Drawer)
*   *Interaction*: Clicking on high-priority detail items (e.g., a specific citation link row) opens a right-aligned sliding modal drawer (width 480px) displaying deep-dive analytical attributes.
*   *Interaction*: Background page scrolling is disabled, and keyboard focus is locked inside the drawer panel until dismissed.

### 10.2.5 Dynamic Cross-Filtering
*   *Interaction*: Clicking a category bar inside a chart (e.g., selecting the "Gemini" bar inside a model distribution chart) automatically updates all other dashboard widgets and tables to filter results for that specific category.
*   *Feedback*: Displays small helper badges on filtered cards with quick "Reset" buttons.

### 10.2.6 Exporting Files
*   *Interaction*: Quick-access header buttons allow users to export data tables as CSV files or download high-resolution PDF reports.

### 10.2.7 Bookmark & Share Views
*   *Interaction*: Users can click a star icon next to screen titles to bookmark views, pinning them to the sidebar "Favorites" section.
*   *Share*: Saving or bookmarked views generate a unique URL containing the filter parameters as query variables, making it easy to share specific campaign configurations.
