# 04. Color System
## AI Brand Intelligence & Visibility Platform

This color system defines our core palettes, functional accent structures, neutral scales, and semantic palettes, ensuring full WCAG accessibility compliance across all layouts.

---

## 4.1 Unified Color Palette Map

Our palette is categorized into six functional areas:

```
+-----------------------------------------------------------------------------------------+
|                                    COLOR PALETTE MAP                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Primary Navy     ===> Trust, precision, & enterprise authority. (#001F3F / #003366)|
|   2. Brand Accent     ===> Innovation & high-tech focus (Azure Blue: #007BFF / #3399FF)|
|   3. Neutral Scale    ===> Structure, typography, & card outlines (#111827 to #FFFFFF)   |
|   4. Semantic palettes===> Direct contextual alerts (Success, Warning, Error, Info).     |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4.2 Core Color Specifications

### 4.2.1 Primary Palettes (Brand Foundation)
*   **Primary Deep Navy**:
    *   `color-primary-900`: `#001F3F` (Deep structural backgrounds, dark theme body canvas).
    *   `color-primary-800`: `#002D5A` (Sidebar and executive header panels).
    *   `color-primary-700`: `#003366` (Primary action buttons and navigation indicators).
*   **Brand Accent Blue (Azure)**:
    *   `color-accent-600`: `#007BFF` (Links, focus indicators, and priority action states).
    *   `color-accent-400`: `#3399FF` (Azure highlights, charts, and secondary indicators).

### 4.2.2 Neutral Scales (Canvas & Typography)
*   `color-neutral-900`: `#111827` (Default body text color in Light Mode).
*   `color-neutral-700`: `#374151` (Paragraph text and secondary headings).
*   `color-neutral-400`: `#9CA3AF` (Muted labels and placeholder text).
*   `color-neutral-200`: `#E5E7EB` (Subtle dividing lines and borders).
*   `color-neutral-50`: `#F9FAFB` (Card panels and container backgrounds in Light Mode).
*   `color-neutral-0`: `#FFFFFF` (White canvas background in Light Mode).

### 4.2.3 Semantic Palettes (Contextual Alerts)
*   **Success Palette** (Passes audits, positive sentiment):
    *   *Hex*: `#10B981` (Emerald Green).
    *   *Usage*: Trend increase badges, high sentiment tags, and resolved system statuses.
*   **Warning Palette** (Action required, minor competitor shifts):
    *   *Hex*: `#F59E0B` (Amber Yellow).
    *   *Usage*: Workspace quota warnings, system update banners, and pending tasks.
*   **Error Palette** (Critical alert, brand hallucinations):
    *   *Hex*: `#EF4444` (Coral Red).
    *   *Usage*: Negative sentiment alerts, API timeouts, and payment past due indicators.
*   **Information Palette** (System updates, new citation logs):
    *   *Hex*: `#3B82F6` (Ocean Blue).
    *   *Usage*: Informational banners, database sync logs, and new citation notifications.

---

## 4.3 WCAG Accessibility Compliance Guidelines

```
+-----------------------------------------------------------------------------------------+
|                                    WCAG TARGETS                                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Normal Body Text   ===> Minimum contrast ratio of 4.5:1 against the canvas.         |
|   2. Large bold H1/H2s  ===> Minimum contrast ratio of 3:1 against the canvas.           |
|   3. Touch targets      ===> Visual outline boundaries must meet 3:1 minimum contrast.   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

*   **Double-Channel Accessibility**: Color should never be the only method used to convey critical information. All semantic status colors must be paired with clear, readable labels or icon tags (e.g., matching a red error alert with a warning icon `!` and clear "Action Required" text).
*   **Theme Adjustments**: In Dark Mode, text color shifts from `#111827` to `#F9FAFB` to ensure optimal contrast and readability against deep navy backgrounds.
