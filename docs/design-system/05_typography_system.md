# 05. Typography System
## AI Brand Intelligence & Visibility Platform

This typography system defines our font families, size scales, line heights, and typographic hierarchies. It provides native, responsive rendering configurations for both LTR (English) and RTL (Persian/Arabic) scripts.

---

## 5.1 Native Multilingual Typography Scale

```
+-----------------------------------------------------------------------------------------+
|                                    TYPOGRAPHY SCALE                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Display Hero ===> 48px / Line-height 1.1 (High visual impact marketing headers)    |
|   2. H1 Title     ===> 32px / Line-height 1.2 (Dashboard primary page headers)         |
|   3. H2 Heading   ===> 24px / Line-height 1.3 (Card section titles & analytical modules)|
|   4. H3 Subhead   ===> 18px / Line-height 1.4 (Secondary titles and metrics cards)     |
|   5. Body Copy    ===> 14px / Line-height 1.5 (Standard logs, details, paragraphs)     |
|   6. Micro Labels ===> 12px / Line-height 1.5 (Captions, time stamps, and small badges)|
|   7. Code Mono    ===> 13px / Line-height 1.5 (OpenAPI schema codes & developer consoles)|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Multilingual Font Family Configurations

To ensure clean readability, our system configures distinct font stacks for different target language directions:

### 5.2.1 English (LTR Viewports)
*   **Font Stack**: `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`
*   **Characteristics**: Clean, geometric sans-serif typeface designed for high readability on screens and complex data tables.

### 5.2.2 Persian / Arabic (RTL Viewports)
*   **Font Stack**: `Vazirmatn, "B Yekan", Shabnam, Tahoma, sans-serif`
*   **Characteristics**: Modern, highly readable Persian font with native zero-width non-joiner support and excellent alignment across compact web layouts.

### 5.2.3 Monospace (Developer API & Code snippets)
*   **Font Stack**: `"Fira Code", JetBrainsMono, Consolas, Monaco, "Andale Mono", monospace`
*   **Characteristics**: Monospace layout ensuring clear, unambiguous character representation for developer consoles, schemas, and public API JSON logs.

---

## 5.3 Detailed Typographic Hierarchy Specs

### 5.3.1 Display Hero Text
*   *Size*: `48px` (`3.0rem`).
*   *Weight*: `800` (Extra Bold).
*   *Line Height*: `1.1` (`52.8px`).
*   *Usage*: Marketing landing page headlines.

### 5.3.2 H1 Page Title
*   *Size*: `32px` (`2.0rem`).
*   *Weight*: `700` (Bold).
*   *Line Height*: `1.2` (`38.4px`).
*   *Usage*: Primary dashboard screen titles.

### 5.3.3 H2 Card Heading
*   *Size*: `24px` (`1.5rem`).
*   *Weight*: `600` (Semi Bold).
*   *Line Height*: `1.3` (`31.2px`).
*   *Usage*: Analytical cards, charts, and table section titles.

### 5.3.4 H3 Sub-heading
*   *Size*: `18px` (`1.125rem`).
*   *Weight*: `500` (Medium).
*   *Line Height*: `1.4` (`25.2px`).
*   *Usage*: Secondary metrics cards and subhead descriptions.

### 5.3.5 Body Copy
*   *Size*: `14px` (`0.875rem`).
*   *Weight*: `400` (Regular) / `500` (Medium).
*   *Line Height*: `1.5` (`21px`).
*   *Usage*: Paragraph text, raw text logs, table rows, and details panel feeds.

### 5.3.6 Caption / Micro Label
*   *Size*: `12px` (`0.75rem`).
*   *Weight*: `500` (Medium) / `600` (Semi Bold for badges).
*   *Line Height*: `1.5` (`18px`).
*   *Usage*: Text timestamps, table headers, inline status badges, and help tooltips.

---

## 5.4 Multi-Directional (RTL/LTR) Styling Policies
*   **Line-Height Compensation**: Persian and Arabic typefaces generally require slightly more line height compared to English fonts to prevent descending characters from overlapping. The CSS layout engine adjusts line heights dynamically:
    ```css
    :lang(fa) {
      font-family: 'Vazirmatn', sans-serif;
      line-height: 1.6; /* Slight increase to prevent text overlap in Persian view */
    }
    ```
*   **Font Smoothing**: Active antialiasing properties are configured on body layers to guarantee sharp rendering across high-DPI screens:
    `font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`
*   **Flexible Alignments**: Avoid absolute text alignments (like `text-align: left`). Use logical alignments (`text-align: start`) to ensure headings mirror automatically when toggling between RTL and LTR.
