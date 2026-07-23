# 02. Brand Intelligence Scoring Framework
## AI Brand Intelligence & Visibility Platform

This document defines the complete Brand Intelligence scoring framework, specifying composite scoring models, weighted mathematical calculations, dimensions, and confidence factors to ensure full transparency.

---

## 2.1 Purpose
To establish a clear, mathematically verified, and reproducible scoring framework that measures overall brand presence, authority, and reputation across conversational search engines, moving away from "black box" metrics to build trust with enterprise users.

---

## 2.2 User Goals
*   **Evaluate Overall Authority**: Track and verify their composite Brand Intelligence Score (BIS).
*   **Identify Strengths & Gaps**: Compare individual scoring dimensions to identify specific areas requiring technical optimization.
*   **Benchmark Performance**: Compare brand metrics directly with competitors across consistent categories.

---

## 2.3 Mathematical Composite Scoring Model

The overall **Brand Intelligence Score (BIS)** is a weighted composite rating compiled from six core parameters:

$$\text{BIS} = w_{\text{pres}} \cdot \text{APS} + w_{\text{vis}} \cdot \text{SVS} + w_{\text{auth}} \cdot \text{ATS} + w_{\text{sent}} \cdot \text{SMS} + w_{\text{comp}} \cdot \text{CPS} + w_{\text{grow}} \cdot \text{GMS}$$

Where the weights ($w$) sum to $1.0$, defining relative parameter importances based on enterprise goals.

---

## 2.4 Six Core Scoring Dimensions

1.  **AI Presence Score (APS)**: Evaluates the total number of conversational models and search indexes that have successfully indexed the brand entity.
2.  **Search Visibility Score (SVS)**: Evaluates the brand's average Share of Model Voice (SoMV) recommendation rate across active campaigns.
3.  **Authority Score (ATS)**: Evaluates the density and quality of direct hyperlink citations back to the brand domain from high-authority sources.
4.  **Sentiment Score (SMS)**: A normalized tone score from -100 to +100 based on parsed conversational references and brand mentions.
5.  **Competitive Position Score (CPS)**: Evaluates brand visibility and authority relative to registered competitive targets.
6.  **Growth Momentum Score (GMS)**: Measures rate-of-change metrics and tracking progress over a 30-day interval.

---

## 2.5 Confidence Levels & Data Indicators
Every compiled score is paired with an explicit **Confidence Level Rating** (High, Medium, Low) to guarantee data integrity:
*   *Confidence Calculation*: Based on active query sample sizes, API response rates, and proxy simulation status parameters.
*   *UI Presentation*: Displayed next to scores as an interactive badge containing tooltip summaries of execution metrics.

---

## 2.6 Visual UI Representation & Dashboard Blueprint

```
+-----------------------------------------------------------------------------------------+
|                               BRAND INTELLIGENCE SCORING SCREEN                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Hero Score Panel (bold, 72px): Displays overall "BIS: 82 / 100" with trend tag.    |
|   - Detailed Metrics Table: Displays individual scores, weights, and confidence levels.  |
|   - Radar Chart Overlay: Compares client scoring dimensions directly with competitors.  |
|   - Scoring Progress Timeline: Tracks historical changes and updates.                    |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 2.6.1 Detailed Metrics Table Columns
*   *Dimension*: Parameter name and help icon (e.g., `Authority Score`).
*   *Score*: Detailed metric rating (e.g., `85 / 100`).
*   *Weight*: Relative weight assigned in the composite model (e.g., `25%`).
*   *Confidence*: Sample confidence rating badge (e.g., `98% High`).
*   *Action*: Click "Optimize" redirects to our Recommendation Center to help users implement improvements.
