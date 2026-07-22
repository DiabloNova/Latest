# 07. Layout System
## AI Brand Intelligence & Visibility Platform

This layout system defines our responsive layout grids, container boundaries, dashboard zone layouts, and content grids across desktop, laptop, tablet, and mobile viewports.

---

## 7.1 Unified Responsive Grids

Our system adapts across four core responsive grid configurations:

```
+-----------------------------------------------------------------------------------------+
|                                    LAYOUT GRIDS                                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Desktop (>=1280px)  ===> 12-Column grid, fixed sidebar (240px), 24px outer margins. |
|   2. Laptop (1024px-1279px)===> 12-Column grid, slim sidebar (64px), 24px outer margins.  |
|   3. Tablet (768px-1023px)===> 8-Column grid, mobile header, hamburger menu, 16px margins.|
|   4. Mobile (<768px)     ===> 4-Column grid, full-width cards, 16px outer margins.      |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 7.2 Container Boundary Rules

To ensure clean layouts across high-resolution screens, we enforce strict container width restrictions:

*   **Marketing & Resource Pages**: Center-aligned containers with a maximum width of `1200px` (`max-width: 1200px; margin-inline: auto;`).
*   **Documentation & Knowledge Base**: Left-sidebar layout, with a center content panel maximum width of `960px` (`max-width: 960px;`).
*   **SaaS Analytical Dashboards**: Fluid, responsive layout spanning the full viewport width, constrained to a maximum of `1600px` to prevent charts and metrics from stretching too far on ultra-wide screens.

---

## 7.3 Core Layout Blueprints

### 7.3.1 Desktop Dashboard Blueprint (>=1280px)
*   **Structure**: Fixed-height, full-viewport layout (non-scrollable body canvas; internal panels use independent scroll boundaries).
*   **Sidebar Zone**: Left-aligned, vertical container (width `240px`), containing the workspace selector, navigation links, and plan progress bars. (Right-aligned in RTL Persian view).
*   **Main Canvas**: Left margin of `240px` (or right margin in RTL view) to fit the sidebar. Spans 100% of remaining viewport width, with `24px` padding around content.
*   **KPI Cards Row**: A 4-column responsive grid container displaying high-level performance metrics.

### 7.3.2 Laptop Dashboard Blueprint (1024px - 1279px)
*   **Structure**: Shares the fixed-height layout of the desktop blueprint.
*   **Sidebar Zone**: Collapses automatically to a slim, icon-only vertical bar (width `64px`).
*   **Main Canvas**: Left margin of `64px` (or right margin in RTL view). Spans 100% of remaining viewport width.

### 7.3.3 Tablet Dashboard Blueprint (768px - 1023px)
*   **Structure**: Scrollable body canvas. The navigation sidebar is completely hidden and transforms into a slide-out hamburger drawer.
*   **Header Zone**: Full-width header (height `64px`), displaying the hamburger menu toggle, company logo, and workspace select button.
*   **KPI Cards Row**: Reflows into a 2x2 grid layout (2 rows of 2 cards).

### 7.3.4 Mobile Dashboard Blueprint (<768px)
*   **Structure**: Scrollable body canvas with full-width stacked components.
*   **KPI Cards Row**: Stacks vertically into a single column of 4 full-width cards.
*   **Charts & Visualizations**: Line charts and comparative grids stack vertically, scaling down automatically to fit screen widths.
*   **Data Tables**: Tables simplify columns or enable horizontal swiping with clear visual indicators to prevent layout breaking.
