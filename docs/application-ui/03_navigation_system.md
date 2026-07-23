# 03. Navigation System
## AI Brand Intelligence & Visibility Platform

This document defines our SaaS navigation layers, command palettes, keyboard shortcuts, and quick action behaviors, ensuring consistent navigation hierarchies across the platform.

---

## 3.1 Sidebar & Navigation Layers

Our navigation model organizes information hierarchies into four layers:

```
+-----------------------------------------------------------------------------------------+
|                                    NAVIGATION LAYERS                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Global Sidebar     ===> Standard sidebar nav items (Overview, Monitoring).         |
|   2. Context Tabs       ===> Inner page navigation tabs (e.g., Campaigns, History).     |
|   3. Breadcrumb Paths   ===> Displays hierarchical folder structures of active pages.  |
|   4. Command Palette    ===> Global Cmd+K search and action trigger console modal.      |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 3.2 Navigation Layer Specifications

### 3.2.1 Global Sidebar
*   **Dimensions**: Width `240px` (collapsible to `64px` icon-only state; hidden on mobile viewports).
*   **Aesthetics**: Left-aligned, vertical flex container. Active nav links display a subtle background tint and our brand's azure blue accent border.
*   **RTL Mirroring**: Sidebar mirrors to the right side of the viewport in Persian (RTL) view, with reading direction adjusting to right-to-left.

### 3.2.2 Context Tabs
*   **Purpose**: Inner page navigation, allowing users to switch views (e.g., switching between "Active Campaigns" and "Run History" inside the AI Search Monitoring panel) without changing routes.
*   **Aesthetics**: Horizontal list of text links below the main page title. Active tabs display a bold weight and bottom azure blue indicator border.

### 3.2.3 Breadcrumbs
*   **Purpose**: Displays hierarchical folder structures of active pages, helping users map deep architectural nests back to parent paths.
*   **Aesthetics**: Horizontal chain of text links separated by neutral dividers (`/` or `>`).
*   **Accessibility**: Wrapped inside a `<nav aria-label="Breadcrumb">` landmark, containing an ordered list `<ol>` of link tags.

---

## 3.3 Command Palette & Keyboard Shortcuts

Pressing `Cmd+K` (macOS) or `Ctrl+K` (Windows/Linux) opens a global modal command palette, allowing users to jump directly to dashboard sections, search raw transcripts, or execute commands instantly.

```
+-----------------------------------------------------------------------------------------+
|                                 KEYBOARD SHORTCUTS MATRIX                               |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Cmd + K   ===> Open global Command Palette modal search.                           |
|   - G + O     ===> Jump directly to Dashboard Overview page.                            |
|   - G + M     ===> Jump directly to AI Search Monitoring page.                           |
|   - Esc       ===> Instantly close open modals, dropdown menus, or active searches.     |
|   - ?         ===> Open inline keyboard shortcuts help guide modal.                    |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 3.4 Favorites & Quick Actions
*   **Favorites**: Users can hover over any dashboard screen title and click a star icon to bookmark the page, pinning it to the "Favorites" sidebar section for instant access.
*   **Quick Actions**: Standard context menus (e.g., "Add Brand", "Run Scan", "Export PDF") are accessible via quick action buttons in the global header, streamlining common workflows.
