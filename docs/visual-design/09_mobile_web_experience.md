# 09. Mobile Web Experience
## AI Brand Intelligence & Visibility Platform

This mobile web experience strategy outlines our mobile navigation behavior, content priority guidelines, element scaling rules, and tactile optimizations to ensure a high-performance experience on smaller screens.

---

## 9.1 Mobile Design Philosophy

Our mobile design focuses on **Speed, Clarity, and Usability**:

```
+-----------------------------------------------------------------------------------------+
|                                    MOBILE UX DESIGN                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. 48px Touch Targets ===> Meet WCAG touch guidelines to prevent accidental taps.      |
|   2. Hidden Sidebar     ===> Sidebar navigation transforms into a slide-out drawer.     |
|   3. Stacked layout grid===> Rows stack vertically, charts scale to screen width.       |
|   4. Simplified Tables  ===> Hide non-critical columns; enable swiping with indicators.  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 9.2 Sizing & Tactile Optimizations

### 9.2.1 Touch Target Sizing
*   **Design Rule**: All interactive buttons, menu links, select fields, and input areas must have a minimum touch target size of **48px x 48px** to prevent accidental clicks:
    `min-width: 48px; min-height: 48px;`
*   **Component Spacing**: Gaps between interactive elements are set to a minimum of `8px` (`space-2`).

### 9.2.2 Slide-out Hamburger Drawers
*   **Aesthetics**: The navigation sidebar is hidden on mobile, transforming into a slide-out hamburger drawer triggered by a top-header button.
*   **Gestures**: Modal drawers support swipe-to-dismiss gestures with a minimum drag threshold of `60px` for smooth, natural mobile interaction.

---

## 9.3 Grid & Content Layout Transformations

### 9.3.1 Row Reflow Rules
*   KPI metric card rows display as 4 columns on desktop, reflow into a 2x2 grid on tablet, and stack vertically into a single column of 4 full-width cards on mobile screens.

### 9.3.2 Table Simplification
*   Data tables hide secondary columns on mobile to focus on primary metrics (e.g., hiding latency or token counts to prioritize SoMV scores). Mobile screens enable horizontal swiping with clear visual indicators to prevent layout breaking.

### 9.3.3 Chart Scaling
*   Analytical charts and radar visuals stack vertically, automatically scaling down to fit the mobile screen width.

---

## 9.4 Mobile Performance Guidelines
*   **Z-Index Modals**: Modal drawers and slide-out alerts are assigned high z-index layers, locking background page scrolling when active to prevent layout jitter on mobile browsers.
*   **Font Optimization**: Use optimized local font files (Vazirmatn for Persian, Inter for English) with complete system fallbacks to minimize page render blocking on slower mobile networks.
