# 04. Visibility Comparison Module
## AI Brand Intelligence & Visibility Platform

This document defines the Visibility Comparison dashboard module, specifying how we compare client and competitor performance across key metrics including authority, mentions, citations, and entity strength.

---

## 4.1 Nine Comparison Metrics

The platform compares brand and competitor performance across nine core parameters:

```
+-----------------------------------------------------------------------------------------+
|                                    COMPARISON METRICS                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Visibility      ===> Overall Share of Model Voice (SoMV) recommendation rates.     |
|   2. Authority       ===> Normalized score based on high-authority external citations.  |
|   3. Mentions        ===> Total number of parsed brand references inside model responses.|
|   4. Citations       ===> Percentage of answers containing direct hyperlink references. |
|   5. Entity Strength ===> Strength of Wikidata mappings and semantic relation networks.|
|   6. KG Completeness ===> Completeness of structured schemas and on-page metadata.      |
|   7. Sentiment       ===> Average conversational tone rating of brand mentions.         |
|   8. Coverage        ===> The percentage of active campaigns where brand exists.       |
|   9. Freshness       ===> Date timestamp indicating last crawl indexing checks.         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4.2 Visual Interface Specifications

The comparison panel uses structured tables and radar charts to compare competitor data:

```
+-----------------------------------------------------------------------------------------+
|                                VISIBILITY COMPARISON SCREEN                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Radar Chart (Center Panel): Overlays and compares client and competitor metrics.    |
|   - Master Comparison Table: Detailed, sortable table comparing all 9 parameters.        |
|   - Trend Indicators: Inline badges displaying positive or negative delta values.       |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 4.2.1 Radar Chart Overlay
*   **Visual Style**: Semi-transparent, overlaid color shapes displaying distinct border lines to separate overlapping datasets (e.g., client brand displayed in azure blue, competitor A in slate gray, competitor B in amber).
*   **Interactive Behavior**: Hovering highlights specific vertices, displaying detailed scores and metric definitions.

### 4.2.2 Master Comparison Table
*   **Database Columns**:
    *   *Metric Name*: Display parameter name and brief help tooltip (e.g., `Domain Authority`).
    *   *Client Brand*: Numeric score and trend badge (e.g., `82 / 100` with +3.4% trend indicator).
    *   *Competitor A*: Competitor A's score and trend badge (e.g., `75 / 100`).
    *   *Competitor B*: Competitor B's score and trend badge (e.g., `60 / 100`).
*   **A11y & Interactions**: Table rows support clean hover highlights, Pagination controls are provided at the bottom, and clicking a row slides out details on specific metrics.
