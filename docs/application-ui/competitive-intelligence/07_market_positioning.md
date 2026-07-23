# 07. Market Positioning Module
## AI Brand Intelligence & Visibility Platform

This document defines the Market Positioning dashboard module, specifying how we track and present brand leadership, quadrant views, market maps, and differentiation analysis.

---

## 7.1 Visual Positioning quadrants

To display brand leadership and market positioning clearly, we implement an interactive 2D quadrant grid view:

```
                  +-----------------------------------------------------------+
                  |                 Market Positioning Map                    |
                  +-----------------------------------------------------------+
                  |                                                           |
                  |   High                                                    |
                  |     ^                                                     |
                  |     |       [Competitor A]          [Our Brand]           |
                  |     |       (Challenger)            (Leader)              |
                  |  V  |                                                     |
                  |  i  |                                                     |
                  |  s  |                                                     |
                  |  i  |       [Competitor C]          [Competitor B]        |
                  |  b  |       (Niche Player)          (Visionary)           |
                  |  i  |                                                     |
                  |  l  |                                                     |
                  |  i  |                                                     |
                  |  t  |                                                     |
                  |  y  |                                                     |
                  |     +---------------------------------------------------> |
                  |    Low                     Authority                     High     |
                  |                                                           |
                  +-----------------------------------------------------------+
```

---

## 7.2 Quadrant Categories & Definitions

The 2D positioning map organizes companies into four structural quadrants based on their average Visibility (Y-axis) and Citation Authority (X-axis) scores:

1.  **Leaders (Top-Right)**: Companies with high visibility and high citation authority. They are frequently recommended and cited as primary references across major AI platforms.
2.  **Challengers (Top-Left)**: Companies with high visibility but low direct citation authority. They are frequently mentioned in conversational summaries, but lack direct cited links back to their domain.
3.  **Visionaries (Bottom-Right)**: Companies with low overall visibility but high citation authority. They have strong, structured schemas and high-quality citations, but need to expand campaign coverage.
4.  **Niche Players (Bottom-Left)**: Companies with low visibility and low citation authority. They are rarely mentioned or cited, requiring comprehensive entity and content optimizations.

---

## 7.3 Visual Interface Specifications

The Market Positioning panel is designed around interactive quadrant charts and detailed tables:

```
+-----------------------------------------------------------------------------------------+
|                                  MARKET POSITIONING SCREEN                              |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Quadrant Chart (Center Panel): Interactive positioning map of tracked brands.        |
|   - Master Positioning Table: Detailed list comparing coordinate scores and metrics.    |
|   - Differentiation Analysis: Actionable insights and recommendation cards list.         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 7.3.1 Interactive Quadrant Chart (Center Panel)
*   **Aesthetics**: 2D scatter plot grid. Hovering over a dot highlights the brand and reveals detailed coordinates, SoMV percentages, and authority scores.
*   **Zoom & Filters**: Double-clicking on a quadrant focuses on that specific market category.

### 7.3.2 Master Positioning Table
*   **Database Columns**:
    *   *Brand Name*: Monitored brand domain path (e.g., `alfacosmetics.ir`).
    *   *Quadrant Class*: Displays active quadrant category (e.g., `Leader`, `Visionary`).
    *   *X-Coordinate (Authority)*: Detailed authority rating (0 to 100).
    *   *Y-Coordinate (Visibility)*: Detailed visibility score (0 to 100).

### 7.3.3 Differentiation Analysis
Provides a text block outlining clear, actionable insights (e.g., "Our brand is positioned as a Challenger because we have high visibility but lack direct citations. Adding product schemas will improve authority, moving our brand into the Leader quadrant"). Click "Explore Recommendations" redirects to our Recommendation Center to help users resolve issues.
