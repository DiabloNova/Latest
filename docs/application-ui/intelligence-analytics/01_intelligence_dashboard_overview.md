# 01. Intelligence Dashboard Overview
## AI Brand Intelligence & Visibility Platform

This document defines the primary Intelligence Analytics Dashboard architecture—the central interface where users monitor overall brand intelligence, evaluate performance indexes, and track market risks.

---

## 1.1 Purpose
To provide executive teams, CMOs, and analysts with a unified, high-level intelligence interface. This dashboard translates complex semantic and citation signals from Core, Entity, and Competitive Intelligence modules into actionable decision-making metrics.

---

## 1.2 User Goals
*   **Identify Critical Trends**: Monitor overall Brand Intelligence Scores and AI Visibility indexes in real-time.
*   **Evaluate Competitor Movements**: Benchmark brand positioning and competitive risks compared to market averages.
*   **Determine Action Priorities**: Access a prioritized list of growth opportunities and optimization recommendations.

---

## 1.3 Dashboard Information Hierarchy & Layout

The dashboard is structured as a clean, high-density analytical panel:

```
+-----------------------------------------------------------------------------------------+
|                                INTELLIGENCE OVERVIEW SCREEN                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Header: Breadcrumbs | Date Filter | Global Actions (PDF Summary, Share)         |   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone A: High-Level Brand Scorecard (4 KPI Grid Cards)                           |   |
|   | - Brand Intelligence | AI Visibility Index | Competitive Risk | Opportunity Score|   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone B: Strategic Priority Matrix (Bento Grid Layout)                           |   |
|   | - Top Left: Priority Quadrant | Top Right: SoMV Trend Line Chart                 |   |
|   | - Bottom Left: Alerts feed    | Bottom Right: Recent test summaries             |   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone C: Executive Narrative Insights (Full-Width Panel)                         |   |
|   | - Executive Narrative | Quick Win action cards | Growth recommendations         |   |
|   +---------------------------------------------------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 1.4 Data Requirements & Metrics

1.  **Brand Intelligence Score (BIS)**: A composite score from 0 to 100 measuring overall brand performance across conversational search (calculated in detail in [02_brand_intelligence_scoring.md](./02_brand_intelligence_scoring.md)).
2.  **AI Visibility Index (AVI)**: Average recommendation rate across monitored conversational engines.
3.  **Competitive Risk Score (CRS)**: Metric representing competitor growth and brand sentiment drops (Success Green for low risk, Warning Amber for moderate, Error Red for high).
4.  **Opportunity Score (OS)**: Metric estimating potential visibility gains from pending optimizations.

---

## 1.5 Interaction Patterns
*   **Quadrant Zooms**: Double-clicking a quadrant inside the Strategic Priority Matrix focuses the view on that specific category, updating adjacent tables to display matching campaigns.
*   **Narrative Drill-downs**: Clicking on highlighted terms inside executive narratives slides out a right-aligned modal drawer displaying raw generated response transcripts and parsed citation paths.
*   **Immediate Action CTAs**: Recommended action cards include direct "Apply Fix" or "Assign Task" buttons, helping teams resolve issues instantly.

---

## 1.6 Enterprise UX Considerations
*   **Reducing Information Noise**: With thousands of raw prompts executed daily, the overview must filter out minor fluctuations to prioritize significant, high-impact alerts.
*   **Theme Continuity**: Visual charts and indicator badges support clean, consistent styling across both Light and Dark themes, maintaining optimal WCAG contrast ratios.
