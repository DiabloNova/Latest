# 10. Competitive UI Design Patterns
## AI Brand Intelligence & Visibility Platform

This document defines the recurring UI and interaction patterns used across our Competitive Intelligence modules, specifying layouts, sorting parameters, bulk operations, tables, charts, and drill-down navigation.

---

## 10.1 Recurring Interaction Patterns Scale

Our layouts utilize seven recurring interaction patterns:

```
+-----------------------------------------------------------------------------------------+
|                                  INTERACTION PATTERNS                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Filters Bar      ===> Horizontal dropdown selection panel (model, date, workspace).|
|   2. Grid Sorting     ===> Column heading toggles to sort tables by key metrics.         |
|   3. Bulk Actions     ===> Multi-row selection checklist bars to manage campaigns at scale.|
|   4. Responsive Tables===> Inline status tags, row hovers, and clean pagination.        |
|   5. Data Charts      ===> Hover-trigger tooltips, line charts, radar overlays.         |
|   6. Comparison Views ===> Side-by-side matrices comparing brand vs. competitor details.|
|   7. Drill-Down Nav   ===> Click a row to slide in a right-aligned details drawer.       |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 10.2 Pattern Specifications & Adaptations

### 10.2.1 Filters Bar
*   **Visual Layout**: Horizontal select elements row placed at the very top of analytical dashboards.
*   **Interactive Behavior**: Clicking a dropdown opens a searchable list of criteria. Selection instantly triggers standard loading states on matching cards.

### 10.2.2 Grid Sorting
*   **Visual Layout**: Interactive column headers displaying small sort arrow indicators next to text labels.
*   **Interactive Behavior**: Click sorts data rows in ascending or descending order.

### 10.2.3 Bulk Actions Bar
*   **Visual Layout**: Hidden by default. Selecting checkboxes inside tables slides up a floating horizontal black bar at the screen bottom.
*   **Interactive Behavior**: Allows users to apply actions (e.g., "Deactivate Campaigns", "Bulk Export PDF Reports") to dozens of rows simultaneously.

### 10.2.4 Responsive Data Tables
*   **Visual Layout**: Flat, bordered grids containing text rows, inline badges, and action buttons.
*   **Interactive Behavior**: Table rows support clean highlight states on mouse hover. Mobile screens hide secondary metrics columns and enable horizontal swiping.

### 10.2.5 Interactive Data Charts
*   **Visual Layout**: Resizable chart panels displaying clean, high-contrast visual lines or radar graphs.
*   **Interactive Behavior**: Hovering data points reveals detailed metrics tooltips; clicking coordinates redirects users to detailed date range logs.

### 10.2.6 Comparison Views
*   **Visual Layout**: Split columns layout. Left column displays brand scores; right column displays competitor scores, using alternating row backgrounds to maintain structure.
*   **Interactive Behavior**: Spotlights gaps and opportunities instantly.

### 10.2.7 Drill-Down Navigation (Drawer Inspector)
*   **Visual Layout**: Clicking a row opens a right-aligned sliding modal drawer (width 480px) displaying detailed analytical properties.
*   **Interactive Behavior**: Background scrolling is disabled while the drawer is active.
