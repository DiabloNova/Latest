# 03. Design Tokens System
## AI Brand Intelligence & Visibility Platform

This design token system defines our platform's layout parameters, font scales, spacing, corners, shadows, and elevation configurations, ensuring pixel-perfect consistency across marketing websites, dashboards, and enterprise portals.

---

## 3.1 Design Token Hierarchy

Our token system is organized into three structural layers:

```
+-----------------------------------------------------------------------------------------+
|                                    TOKEN ARCHITECTURE                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Global (Reference) Tokens ===> Raw, hardcoded values (e.g., #0B192C, 8px).          |
|   2. Semantic (Alias) Tokens   ===> Purpose-driven values (e.g., bg-primary, radius-md). |
|   3. Component-Specific Tokens ===> Bind semantic aliases to specific buttons/badges.   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 3.2 Global Token Scale Specifications

### 3.2.1 Spacing Scale Tokens
*   `token-spacing-1`: `4px`
*   `token-spacing-2`: `8px` (Base Unit)
*   `token-spacing-3`: `12px`
*   `token-spacing-4`: `16px`
*   `token-spacing-5`: `24px`
*   `token-spacing-6`: `32px`
*   `token-spacing-7`: `48px`
*   `token-spacing-8`: `64px`

### 3.2.2 Corner Radius Tokens
*   `token-radius-xs`: `2px` (Slight rounding for checkboxes or tags).
*   `token-radius-sm`: `4px` (Sharp rounding for standard input fields and buttons).
*   `token-radius-md`: `8px` (Standard rounding for cards, banners, and modals).
*   `token-radius-lg`: `16px` (Soft rounding for large onboarding containers).
*   `token-radius-full`: `9999px` (Fully rounded pills for profile avatars and tags).

### 3.2.3 Elevation & Shadow Tokens
*   `token-shadow-flat`: `none` (No shadow; clean flat borders for tables and dividers).
*   `token-shadow-sm`: `0 1px 2px rgba(0, 0, 0, 0.05)` (Subtle shadow for input elements).
*   `token-shadow-md`: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)` (Standard card elevation shadow).
*   `token-shadow-lg`: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)` (High-elevation shadow for dropdown menus, alerts, and modals).

### 3.2.4 Borders & Line Weight Tokens
*   `token-border-thin`: `1px solid` (Standard divider line weight).
*   `token-border-medium`: `2px solid` (Active-state indicator line weight).
*   `token-border-thick`: `4px solid` (Focus borders and warning highlight edges).

### 3.2.5 Animation Motion Tokens
*   `token-motion-duration-fast`: `100ms` (Instant micro-interactions like hover or active triggers).
*   `token-motion-duration-normal`: `250ms` (Standard transitions like tab shifts or sidebar collapses).
*   `token-motion-duration-slow`: `400ms` (Longer animations like modal slide-ins or chart progressions).
*   `token-motion-ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)` (Smooth progressive easing).
*   `token-motion-ease-out`: `cubic-bezier(0, 0, 0.2, 1)` (Decelerating easing for slide-out menus).

---

## 3.3 Semantic Mode Transformations (Light vs. Dark Theme)

To ensure high visibility and contrast across both Light and Dark themes, our semantic tokens update variables automatically based on the active theme class:

| Semantic Token Name | Light Theme Value | Dark Theme Value | Purpose / Action |
| :--- | :---: | :---: | :--- |
| `color-bg-base` | `#FFFFFF` (White) | `#0B192C` (Deep Blue) | Primary canvas background. |
| `color-bg-card` | `#F9FAFB` (Gray 50) | `#1E2A38` (Slate Blue) | Secondary card panels. |
| `color-border-subtle`| `#E5E7EB` (Gray 200) | `#374151` (Gray 700) | Standard layout dividing lines. |
| `color-text-primary` | `#111827` (Gray 900) | `#F9FAFB` (Gray 50) | Primary text, titles, H1s. |
| `color-text-secondary`| `#4B5563` (Gray 600) | `#9CA3AF` (Gray 400) | Subtitles and paragraph text. |
