# 06. Spacing & Grid System
## AI Brand Intelligence & Visibility Platform

This document defines our spacing system, layout margins, padding structures, and content density configurations to ensure consistent UI proportions across all platforms.

---

## 6.1 Base Spacing Unit (8px Grid)

Our design system is built on an **8px base unit**. All component dimensions, margins, and padding values are mathematical multiples of this base unit, ensuring visual balance across layouts.

```
+-----------------------------------------------------------------------------------------+
|                                    SPACING SCALE                                        |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - space-1: 4px   (0.25rem) ===> Micro-adjustments, compact icon offsets.              |
|   - space-2: 8px   (0.5rem)  ===> Component-internal spacing, label-to-input gaps.      |
|   - space-3: 12px  (0.75rem) ===> Standard badge margins and small container paddings.  |
|   - space-4: 16px  (1.0rem)  ===> Standard card padding and table row spacing.          |
|   - space-5: 24px  (1.5rem)  ===> Large card padding, dashboard margins, grid gaps.    |
|   - space-6: 32px  (2.0rem)  ===> Section dividers and layout padding.                  |
|   - space-7: 48px  (3.0rem)  ===> Header margins and onboarding column offsets.         |
|   - space-8: 64px  (4.0rem)  ===> Hero margins and landing page section paddings.       |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 6.2 Layout vs. Component Spacing Rules

To maintain layout structure, our spacing tokens are categorized into distinct usage domains:

### 6.2.1 Layout Spacing (Page Structure)
*   **Outer Canvas Margins**: Spacing between the outer page border and core container blocks:
    *   *Desktop (>=1024px)*: Fixed `24px` (`space-5`).
    *   *Mobile (<768px)*: Fixed `16px` (`space-4`).
*   **Grid Column Gaps**: Spacing between dashboard cards and layout blocks:
    *   *Standard Gaps*: Fixed `24px` (`space-5`).
    *   *Compact Tables & Lists*: Fixed `16px` (`space-4`).

### 6.2.2 Component Spacing (Internal Component Anatomy)
*   **Standard Cards**: Internal padding for metrics, charts, and info cards:
    *   *Header zone padding*: `16px` (`space-4`).
    *   *Body content padding*: `24px` (`space-5`).
*   **Form Elements**: Sizing and paddings for input fields, buttons, and selects:
    *   *Inputs & Selects*: Vertical padding `12px` (`space-3`), Horizontal padding `16px` (`space-4`).
    *   *Button elements*: Vertical padding `12px` (`space-3`), Horizontal padding `24px` (`space-5`).

---

## 6.3 Content Density Configurations

Our platform offers three density settings, helping users adjust the dashboard interface to match their monitoring needs:

### 6.3.1 Comfortable Mode (Standard)
*   *Target Audience*: Executive leadership (CMOs, Product Managers) reviewing high-level business goals and summaries.
*   *Spacing Rules*: Standard `24px` card padding, standard typography sizes, and default chart spacing.

### 6.3.2 Compact Mode (High Density)
*   *Target Audience*: Data analysts and technical specialists (SEO specialists, NLP engineers) reviewing large tables and log lists.
*   *Spacing Rules*: Reductions across layouts:
    *   Reduce card padding from `24px` to `16px`.
    *   Reduce table row paddings to `8px`, maximizing visible data rows.
    *   Decrease text sizes and icon elements slightly to fit high-density views.

### 6.3.3 Fluid Scaling Rules
Component elements use logical, proportional percentages to scale smoothly across different screens:
`width: 100%; max-width: 1200px; margin-inline: auto;`
This ensures clean alignment, preventing elements from feeling cramped on smaller viewports or overly stretched on ultra-wide screens.
