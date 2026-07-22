# 13. Responsive Design System
## AI Brand Intelligence & Visibility Platform

This responsive design system defines our container grids, elements reflow behaviors, and structural transformations across mobile, tablet, laptop, and desktop viewports to ensure consistent UX layouts.

---

## 13.1 Responsive Breakpoints

Our layout adaptations are defined across four core viewport sizes:

| Breakpoint Token | Viewport Range | Sidebar Sizing | Main Container Margin | Layout Grid Columns |
| :--- | :---: | :---: | :---: | :---: |
| **Mobile (`sm`)** | `<768px` | Hidden Drawer | `16px` | 4 Columns |
| **Tablet (`md`)** | `768px - 1023px`| Hidden Drawer | `16px` | 8 Columns |
| **Laptop (`lg`)** | `1024px - 1279px`| `64px` (Slim) | `24px` | 12 Columns |
| **Desktop (`xl`)** | `>=1280px` | `240px` (Full) | `24px` | 12 Columns |

---

## 13.2 Layout Transformations

### 13.2.1 Component Reflow Layout Rules
To maintain visual structure on smaller viewports, components adapt dynamically across different screen sizes:

```
+-----------------------------------------------------------------------------------------+
|                                    COMPONENT REFLOW                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Desktop Row (4 Cols) ===> Stacks to a 2x2 grid on Tablet, and 1 Column on Mobile.   |
|   2. Table Columns        ===> Hide secondary metrics on Tablet, enable swiping on Mobile. |
|   3. Visual Charts        ===> Stacks vertically into a single responsive column.       |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

*   **Row Stacking**: KPI metrics cards display as 4 columns in a single row on desktop, reflow into a 2x2 grid on tablet, and stack vertically into a single column of 4 full-width cards on mobile.
*   **Table Simplification**: On mobile and tablet screens, tables hide secondary columns (e.g., latency, token counts) to focus on primary data. Mobile screens enable horizontal swiping with clear visual indicators to prevent layout breaking.
*   **Chart Auto-Scaling**: Dynamic charts stack vertically on smaller viewports, automatically scaling down to fit the smaller screen width.

---

## 13.3 Touch Target & Gesture Sizing
*   **Minimum Touch Targets**: On touch-enabled devices (mobiles and tablets), all buttons, links, inputs, and tabs must have a minimum touch target size of **48px x 48px** to prevent accidental clicks and improve usability:
    `min-width: 48px; min-height: 48px;`
*   **Gesture Areas**: Slide-out drawers and modals must include swipe-to-dismiss gestures with a minimum drag threshold of **60px** to ensure smooth, natural interactions.
