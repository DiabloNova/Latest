# 01. Competitor Overview Module
## AI Brand Intelligence & Visibility Platform

This document defines the Competitor Overview dashboard module—the primary interface where users analyze and benchmark their brand's visibility directly against the competitive landscape.

---

## 1.1 Competitor Overview Layout Blueprint

The overview is structured as an interactive, data-dense metrics panel:

```
+-----------------------------------------------------------------------------------------+
|                                 COMPETITOR OVERVIEW LAYOUT                              |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Header: Breadcrumbs | Date Filters | Active Competitors Toggle list             |   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone A: Comparative KPI Dashboard (4 Cards Grid)                                |   |
|   | - Client Visibility | Competitor A visibility | Competitor B | Market Average   |   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone B: Trends & Comparison Panels (Split 2/3 and 1/3)                         |   |
|   | - Left: Multi-brand Share of Voice (SoMV) line chart                            |   |
|   | - Right: Market positioning radar overlay chart                                 |   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone C: Competitive SWOT & SWOT Opportunities (Split 1/2 and 1/2)               |   |
|   | - Left: Competitor Strengths vs. Weaknesses comparison cards list                |   |
|   | - Right: Top 3 Strategic Opportunities list (Weak competitive gaps)             |   |
|   +---------------------------------------------------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 1.2 Information Hierarchy & Content Specifications

### 1.2.1 Zone A: Comparative Visibility KPIs
1.  **Client Visibility Card**:
    *   *Value*: Overall Share of Model Voice (SoMV) (bold, 32px; e.g., "48.2%").
    *   *Trend*: Trend change indicators (e.g., "+3.4% this week").
2.  **Competitor A Visibility Card**:
    *   *Value*: Competitor A's overall SoMV (e.g., "30.1%").
3.  **Competitor B Visibility Card**:
    *   *Value*: Competitor B's overall SoMV (e.g., "15.4%").
4.  **Market Average Card**:
    *   *Value*: Average visibility score for the active industry vertical (e.g., "25.2%").

### 1.2.2 Zone B: Multi-Brand Trends & Radar Comparisons
*   **Multi-Brand SoMV Trend Chart (Column Span 2/3)**:
    *   *Visualization*: Multi-line chart comparing client and competitor SoMV progress over time.
*   **Market Positioning Radar Chart (Column Span 1/3)**:
    *   *Visualization*: Radar chart comparing client and competitor metrics across all 9 Brand Health pillars (Authority, Trust, etc.).

### 1.2.3 Zone C: SWOT & Opportunities Analysis
*   **SWOT Comparison (Left Panel)**:
    *   *Strengths*: Highlights where the client outperforms competitors (e.g., "High-quality citations on Perplexity").
    *   *Weaknesses*: Highlights gaps compared to competitors (e.g., "Empty Wikidata property fields").
*   **Top 3 Strategic Opportunities (Right Panel)**:
    *   *Item 1*: **AEO Schema Injection** (suggesting schema.org additions to product landing pages).
    *   *Item 2*: **Semantic Keyword Optimization** (suggesting high-intent terms to add to blog posts to improve RAG indexing).
    *   *Item 3*: **Wikidata Entity Mapping** (suggesting company updates on public knowledge databases).
*   **Executive Insights**: A text block provides a clear, natural language summary of market movements (e.g., "Your visibility dropped on ChatGPT because Competitor A added product schemas, capturing citations on three high-priority query campaigns").
