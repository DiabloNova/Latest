# 08. Iconography System
## AI Brand Intelligence & Visibility Platform

This iconography system defines our icon styles, stroke weights, standard sizing scales, usage rules, and accessibility guidelines to ensure consistent visual indicators across the platform.

---

## 8.1 Visual Icon Style & Grid

Our iconography uses a clean, professional, and consistent visual language:

*   **Style**: Pure vector line-art icons. Avoid heavy filled-in solids, neon glow gradients, or complex multi-color designs.
*   **Stroke Weight**: Constant `2px` stroke weight on a standardized `24px` grid boundary.
*   **Cap Corners**: Standardized rounded caps (`stroke-linecap="round"`, `stroke-linejoin="round"`) to ensure visual consistency across all icons.

---

## 8.2 Standard Sizing Scale

To ensure clear, balanced interfaces, icons are restricted to four standard sizes:

*   `size-sm`: `16px` (Used inside badges, compact buttons, inline labels, or breadcrumbs).
*   `size-md`: `24px` (Default size for main navigation items, sidebar links, or dashboard metrics).
*   `size-lg`: `32px` (Used inside metric card headers, error alerts, or feature descriptions).
*   `size-xl`: `48px` (Used on empty state cards, onboarding guides, or major status alerts).

---

## 8.3 Core Icon Categories

### 8.3.1 Category A: Navigation & Actions
*   **Overview**: `Home` (A simple structural house icon).
*   **Analytics**: `TrendingUp` (An upward trend line with an arrow).
*   **Monitoring**: `Activity` (A heartbeat or pulse wave icon).
*   **Citations**: `Link` (An interconnected dual-link chain icon).
*   **Entity Graph**: `Network` (Interconnected nodes and relations).
*   **Reports**: `FileText` (A clean page document icon).
*   **Settings**: `Settings` (A classic cog icon).

### 8.3.2 Category B: Status & Alerts
*   **Success**: `CheckCircle` (A circular badge containing a checkmark).
*   **Warning**: `AlertTriangle` (A triangular badge containing an exclamation mark).
*   **Error / Critical**: `AlertCircle` (A circular badge containing an exclamation mark).
*   **Information**: `Info` (A circular badge containing an 'i' indicator).

---

## 8.4 Accessibility & Implementation Guidelines

```
+-----------------------------------------------------------------------------------------+
|                                    A11Y ICON RULES                                      |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Decorative Icons ===> Must include explicit aria-hidden="true" attribute tags.      |
|   2. Interactive Icons===> Must be wrapped inside buttons with explicit screen reader   |
|                            labels (e.g., aria-label="Edit project").                    |
|   3. Scalability      ===> Render using vectors (SVGs) to scale smoothly across screens.|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

*   **SVG Rendering**: Always render icons using vectors (SVGs) rather than icon fonts or raster images, ensuring clean scaling and sharp rendering across high-DPI screens.
*   **Bilingual Mirroring Exceptions**: Most icons are globally recognizable and do not require mirroring. However, direction-dependent icons (e.g., forward arrows `→` or back arrows `←`) must mirror automatically when toggling between LTR and RTL layouts:
    `transform: scaleX(-1); /* Active on direction-dependent icons inside RTL views */`
