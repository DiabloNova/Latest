# 12. RTL/LTR Multilingual Design Strategy
## AI Brand Intelligence & Visibility Platform

This document defines our RTL/LTR design strategy. It specifies spatial layout rules, font stacks, line heights, and styling mirroring rules to guarantee a seamless, high-performance experience across English, Persian, and Arabic interfaces.

---

## 12.1 Spatial Mirroring Rules

Our layouts dynamically mirror based on the active language and page direction context:

```
+-----------------------------------------------------------------------------------------+
|                                    SPATIAL MIRRORING                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Left-To-Right (LTR English default) ===> Left-aligned sidebar, left-to-right reading.|
|   - Right-To-Left (RTL Persian / Arabic)===> Right-aligned sidebar, right-to-left reading.|
|                                                                                         |
|   * UI elements (charts, tables, menus, icons) automatically mirror alignments.        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 12.2 CSS Logical Properties Implementation

To handle layout direction dynamically without duplicating styles, developers must use CSS logical properties instead of absolute directions:

| Traditional Absolute Property | CSS Logical Equivalent | Layout Alignment Result |
| :--- | :---: | :--- |
| `margin-left: 16px;` | `margin-inline-start: 16px;` | Aligns to left in LTR, and right in RTL. |
| `padding-right: 24px;` | `padding-inline-end: 24px;` | Aligns to right in LTR, and left in RTL. |
| `border-left: 2px solid;` | `border-inline-start: 2px solid;` | Renders on the left in LTR, right in RTL. |
| `left: 0;` | `inset-inline-start: 0;` | Positions at the start edge dynamically. |
| `text-align: left;` | `text-align: start;` | Aligns text to start edge dynamically. |

---

## 12.3 Typographic Scale & Line-Height Adaptation
Persian and Arabic typefaces generally require slightly more line height compared to English fonts to prevent descending characters from overlapping. The CSS layout engine adjusts line heights dynamically:

*   **Vazirmatn (Persian / Arabic)**: Sets the default line height scale to **1.6** to ensure clean, clear spacing across high-density layouts:
    ```css
    :lang(fa), :lang(ar) {
      font-family: 'Vazirmatn', sans-serif;
      line-height: 1.6;
    }
    ```
*   **Inter (English)**: Sets the default line height scale to **1.5**:
    ```css
    :lang(en) {
      font-family: 'Inter', sans-serif;
      line-height: 1.5;
    }
    ```

---

## 12.4 Mirroring Exceptions (Static Left-Aligned elements)

Not all components should mirror when switching to RTL layouts. The following elements must maintain a static, LTR layout direction across all languages:

1.  **Monospace Code Blocks & JSON Outputs**: OpenAPI schemas, Webhook JSON logs, and developer consoles must remain strictly left-aligned LTR to preserve code syntax integrity:
    `<pre dir="ltr" class="text-left font-mono">`
2.  **Product SKU Codes & Tracking Numbers**: Alphanumeric serial codes, IDs, and parameters must remain left-aligned to prevent characters from formatting incorrectly:
    `<span dir="ltr" class="font-mono">SKU-9988-AA</span>`
3.  **URL Paths & Domains**: Website paths and domains under tracking must remain left-aligned to maintain standard URL formatting:
    `<span dir="ltr" class="font-mono">https://alfacosmetics.ir/products</span>`
4.  **Mathematical Graphs & Time-Series Charts**: Line and bar charts mapping time-series data (e.g., date on X-axis, SoMV on Y-axis) must maintain a static left-to-right chronological progression, preventing data representation errors.
