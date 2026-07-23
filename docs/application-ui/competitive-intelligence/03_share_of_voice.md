# 03. AI Share of Voice Module
## AI Brand Intelligence & Visibility Platform

This document defines the Share of Model Voice (SoMV) dashboard module, specifying how we measure, present, and visualize brand recommendation shares across conversational engines, languages, countries, and topics.

---

## 3.1 Multi-Dimensional SoMV Grid

Our system evaluates Share of Voice across four key metrics:

```
+-----------------------------------------------------------------------------------------+
|                                        SoMV GRID                                        |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Per-Model SoMV    ===> Share of recommendations across ChatGPT, Gemini, Perplexity. |
|   2. Per-Language SoMV ===> Share of recommendations across English and Persian queries.|
|   3. Per-Country SoMV  ===> Regional share based on localized proxy simulations.        |
|   4. Per-Topic SoMV    ===> Share of voice across specific search and product categories.|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 3.2 Visual Dashboard Blueprint (Share of Voice view)

The Share of Voice page is organized to deliver deep insights and clear visualizations:

```
+-----------------------------------------------------------------------------------------+
|                                  SHARE OF VOICE SCREEN                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Hero SoMV Cards Row: Displays overall SoMV percentage and competitor shares.        |
|   - Multi-line Trend Chart (Center): Tracks historical SoMV progress over time.         |
|   - Geo-Map Chart (Left Side): Illustrates visibility by country and region.             |
|   - Model Distribution Treemap (Right Side): Displays proportion of visibility share.   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 3.2.1 Hero SoMV Cards Row
Displays metrics for key brand and competitor shares:
*   **Client SoMV**: Overall recommendation rate (bold, 32px; e.g., `48.2%`).
*   **Competitor A SoMV**: Competitor A's overall share (e.g., `30.1%`).
*   **Competitor B SoMV**: Competitor B's overall share (e.g., `15.4%`).

### 3.2.2 Multi-Line Trend Chart
*   **Purpose**: Track and visualize historical SoMV progress and competitive trends over the past 6 months.
*   **Aesthetics**: High-contrast, clean multi-line display with hover-inspect tooltips.

### 3.2.3 Geo-Map & Model Distribution Charts (Bottom Row)
*   **Choropleth Geo-Map (Left)**: Illustrates localized visibility differences across countries and regions based on regional proxy simulations.
*   **Treemap Distribution (Right)**: Displays the proportion of brand visibility share across different model types, helping teams identify which platforms drive the highest visibility.
