# 12. Responsive Strategy
## AI Brand Intelligence & Visibility Platform

This responsive strategy outlines our layout breakpoints, element reflow patterns, and structural transformations to guarantee a seamless, high-performance experience across mobile, tablet, laptop, and desktop viewports.

---

## 12.1 Responsive Breakpoints Matrix

Our layout adaptations are defined across four core viewport sizes:

```
+-----------------------------------------------------------------------------------------+
|                                    BREAKPOINTS MATRIX                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Desktop (>=1280px)  ===> Full Sidebar (240px), 3-Column main grid, full tables.    |
|   2. Laptop (1024px-1279px)===> Collapsed Sidebar (64px), 2-Column grid, standard tables.|
|   3. Tablet (768px-1023px)===> Mobile Header, bottom sheet modals, 2-Column card grid.   |
|   4. Mobile (<768px)     ===> Mobile Header, Full width cards, swipeable table logs.     |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 11.2 Reflow & Layout Transformations

### 11.2.1 Component: Navigation Sidebar
*   **Desktop (>=1280px)**: Renders as a fixed, left-aligned vertical bar (width 240px) displaying full menu titles.
*   **Laptop (1024px - 1279px)**: Automatically collapses to a slim icon-only sidebar (width 64px). Hovering over icons displays tooltips with menu names.
*   **Tablet & Mobile (<1024px)**: Sidebar navigation is completely hidden. It transforms into a responsive slide-out hamburger menu triggered by a top header button.

### 11.2.2 Component: Metric & KPI Cards
*   **Desktop & Laptop (>=1024px)**: Display as a single horizontal row of 4 columns.
*   **Tablet (768px - 1023px)**: Reflows into a 2x2 grid layout (2 rows of 2 cards).
*   **Mobile (<768px)**: Stacks vertically into a single column of 4 full-width cards.

### 11.2.3 Component: Data Tables & Metrics Lists
*   **Desktop & Laptop (>=1024px)**: Renders comprehensive tables with all tracking columns (Platform, Score, Trend, Mentions, Citations, Actions).
*   **Tablet (768px - 1023px)**: Hides secondary columns (e.g., Latency, Token counts) to preserve primary data visibility without horizontal scrolling.
*   **Mobile (<768px)**: Tables transform into a stacked list of responsive metric cards, or enable horizontal swiping with clear visual indicators.

### 11.2.4 Component: Analytical Visualizations (Charts)
*   **Desktop & Laptop (>=1024px)**: Side-by-side display of multiple line, radar, and comparison charts.
*   **Tablet & Mobile (<1024px)**: Charts stack vertically into a single column, automatically scaling down to fit the smaller screen width.

---

## 11.3 RTL Mirroring Strategy

To support dynamic localization between LTR (English) and RTL (Persian/Arabic) layouts, our responsive grids use logical styling configurations:

```
+-----------------------------------------------------------------------------------------+
|                                  RTL LAYOUT TRANSITION                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Sidebar Alignment:                                                                 |
|      - English (LTR) => Fixed Left-aligned sidebar.                                      |
|      - Persian (RTL) => Mirror to Fixed Right-aligned sidebar.                          |
|                                                                                         |
|   2. Reading Direction:                                                                 |
|      - English (LTR) => Left-to-right flex direction, left-aligned headings.            |
|      - Persian (RTL) => Right-to-left flex direction, right-aligned headings.           |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

*   **Logical Tailwind Spacing**: Avoid absolute values like `ml-4` or `pr-2`. Use logical properties (e.g., `ms-4` for start margin, `pe-2` for end padding) to ensure margins and paddings adjust automatically when toggling between RTL and LTR.
