# 08. Data Visualization Guidelines
## AI Brand Intelligence & Visibility Platform

This document defines our data visualization guidelines, specifying chart types, styling rules, color palettes, and interactive behaviors for displaying complex analytical datasets.

---

## 8.1 Core Visualization Categories

To display data clearly, we utilize specific chart types for different analytical contexts:

```
+-----------------------------------------------------------------------------------------+
|                                  VISUALIZATION MATRIX                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Time Series  ===> Multi-line charts mapping SoMV trends over time.                 |
|   2. Rankings     ===> Horizontal bar charts comparing brand recommendation rates.       |
|   3. Comparisons  ===> Radar charts overlaying client brand health with competitors.     |
|   4. Distribution ===> Treemaps showing Share of Voice across different model types.     |
|   5. Regional     ===> Geo-maps illustrating localized visibility by country and region. |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 8.2 Detailed Chart Type Specifications

### 8.2.1 Time Series (Multi-Line Chart)
*   **Purpose**: Track brand visibility and SoMV progress over time across multiple conversational engines.
*   **Aesthetics**: Display clean, high-contrast visual lines. Background grid lines are styled in a muted, light gray to avoid cluttering the data points.
*   **Interaction**: Hovering over lines reveals interactive tooltips displaying precise date values and model scores.

### 8.2.2 Rankings (Horizontal Bar Chart)
*   **Purpose**: Compare the brand's visibility and recommendation rates directly with key competitors.
*   **Aesthetics**: Uses flat, solid color bars (our azure blue accent for the client brand, neutral slate gray for competitors).
*   **Interaction**: Hovering highlights rows, and clicking a competitor bar redirects to their detailed visibility profile.

### 8.2.3 Comparisons (Radar Chart)
*   **Purpose**: Compare complex performance metrics (such as the 9 Brand Health pillars) across multiple companies in a single chart.
*   **Aesthetics**: Semi-transparent, overlaid color shapes displaying distinct border lines to separate overlapping datasets.
*   **Interaction**: Hovering highlights specific vertices, displaying detailed scores and metric definitions.

### 8.2.4 Distribution (Treemap)
*   **Purpose**: Display the proportion of brand visibility across different model categories (e.g., ChatGPT Search vs. Perplexity Pro).
*   **Aesthetics**: Clean, nested rectangle grids. Larger squares represent higher visibility values.
*   **Interaction**: Hovering displays exact numeric values and percentage shares.

### 8.2.5 Regional (Geographic Map)
*   **Purpose**: Illustrate localized visibility differences across states and countries.
*   **Aesthetics**: Clean geographic choropleth maps, using color density scales to represent local visibility values (darker blue represents higher visibility).
*   **Interaction**: Drag-and-zoom controls allow users to inspect specific territories.
