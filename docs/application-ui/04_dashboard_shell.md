# 04. Dashboard Shell Blueprint
## AI Brand Intelligence & Visibility Platform

This dashboard shell blueprint defines our core layout structures, grid proportions, header regions, sidebar parameters, notification panels, and status bars, ensuring a cohesive application workspace.

---

## 4.1 Dashboard Shell Layout Blueprint

Our application shell coordinates five operational zones:

```
+-----------------------------------------------------------------------------------------+
|                                    APPLICATION SHELL                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | 1. Header Zone: Workspace Select | Cmd+K Search | Notifications | Profile       |   |
|   +---------------------------------------------------------------------------------+   |
|   | 2. Left Sidebar (240px) | 3. Main Content Area                                  |   |
|   | - Nav links             |  - Breadcrumbs & Page Titles                          |   |
|   | - Favorites             |  - Primary KPI Cards Row                              |   |
|   | - Usage indicators      |  - Analytical Chart panels & Data grids               |   |
|   |                         |                                                       |   |
|   |                         | 4. Right Inspector Drawer (Sliding detail modal)      |   |
|   +-------------------------+--------------------------------------------------------+   |
|   | 5. Global Status Bar: System state check | API sync logs | Language toggle      |   |
|   +---------------------------------------------------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4.2 Structural Zone Specifications

### 4.2.1 Zone 1: Global Header
*   **Dimensions**: Height `64px` fixed; full viewport width.
*   **Primary Elements**: Workspace selector dropdown, global command search input field, alert notifications button (with numeric indicator badges), and user settings profile button.
*   **Aesthetics**: Fixed position; subtle bottom border and white background (or slate-gray in dark theme) to separate it from the content canvas.

### 4.2.2 Zone 2: Navigation Sidebar
*   **Dimensions**: Width `240px` (collapsible to `64px` icon-only state; hidden on mobile viewports).
*   **Primary Elements**: Brand logo, active workspace context details, navigation lists (Insights, Monitoring, Settings), and plan usage progress bar.
*   **RTL Mirroring**: Sidebar mirrors to the right side of the viewport in Persian (RTL) view, with reading direction adjusting to right-to-left.

### 4.2.3 Zone 3: Main Content Canvas
*   **Dimensions**: Full remaining viewport area; padding set to `24px` (`space-5`) on desktop to establish visual focus.
*   **Primary Elements**: Page breadcrumbs, primary screen title, and the responsive metric/chart data grids.

### 4.2.4 Zone 4: Slide-Out Inspector Drawer
*   **Dimensions**: Width `480px` fixed on desktop screens.
*   **Primary Elements**: Renders detailed contextual views (such as raw response text snippets, citation anchor paths, or competitive logs) when a row is clicked inside our data tables.
*   **UX Interaction**: Slides in from the right edge of the screen (or left edge in RTL view). Focus trapping locks controls inside the drawer until dismissed.

### 4.2.5 Zone 5: Global Status Bar
*   **Dimensions**: Height `32px` fixed; placed at the very bottom of the application viewport.
*   **Primary Elements**: Real-time system check indicators (green "All systems operational" status), database sync status logs, active scraper queue volumes, and the bilingual language toggle button.
*   **Aesthetics**: Minimal slate-gray background to separate status logs from the main content canvas.
