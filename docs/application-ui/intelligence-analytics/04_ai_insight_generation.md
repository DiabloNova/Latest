# 04. AI Insight Generation Engine
## AI Brand Intelligence & Visibility Platform

This document defines our AI Insight Generation Engine, specifying AI reasoning loops, context aggregations, insight categories, and interactive insight card blueprints.

---

## 4.1 Purpose
To analyze raw data streams and automatically generate highly structured, natural language insights that explain *why* brand visibility scores changed, identifying opportunities and risks without requiring manual data compilation by analysts.

---

## 4.2 User Goals
*   **Understand Score Changes**: Get immediate explanations of sudden visibility drops or competitive growth spikes.
*   **Access Evidence-Based Insights**: Review the exact raw response transcripts and citations behind every generated insight.
*   **Determine Action Steps**: Access direct recommendations and optimization tasks connected to each insight.

---

## 4.3 AI Insight Generation Workflow

Our insight engine processes raw telemetry data through four structural reasoning stages:

```
+-----------------------------------------------------------------------------------------+
|                                  INSIGHT GENERATION FLOW                                |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Context Aggregation ===> Compiles SoMV, citations, & competitor metrics.           |
|   2. Discrepancy Audits  ===> Identifies anomalies, drops, or competitive growth spikes.|
|   3. Reasoning Layer     ===> Matches anomalies with specific causes (e.g. schema drop).|
|   4. Output Card         ===> Renders structured insight cards with direct actions.     |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4.4 Insight Categories

1.  **Strategic Insight**: High-level, long-term trend analysis (e.g., "Your brand has established dominant authority in the local skincare market but lacks visibility on global conversational search engines").
2.  **Competitive Insight**: Analysis of competitor positioning and growth (e.g., "Competitor A increased visibility by 15% on target skincare prompts by publishing a new topic cluster").
3.  **Content Opportunity**: Identifies underserved categories with high search intent (e.g., "High search volume exists for 'organic serums Iran' with zero competitor citations").
4.  **Visibility Gap**: Identifies prompts where the brand has low Share of Model Voice (SoMV).
5.  **Brand Risk**: Highlights urgent threats, negative sentiment spikes, or factual hallucinations.

---

## 4.5 Visual Card Anatomy & Parameters

Each insight is displayed as an interactive card displaying critical attributes:

```
+-----------------------------------------------------------------------------------------+
|                                       INSIGHT CARD                                      |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   [Category Icon]  H2 Insight Title (e.g., "Competitor Citation Takeover Detected")     |
|                                                                                         |
|   Metrics Metrics Banner:                                                               |
|   - Priority Level: [Critical / High / Medium / Low]                                    |
|   - Business Impact: [High / Medium / Low]                                              |
|   - Confidence Level: [95% High]                                                        |
|                                                                                         |
|   Description Block: Brief reason for change, and actionable next steps.               |
|                                                                                         |
|   Supporting Evidence: Lists the exact prompts and model response links behind the insight.|
|                                                                                         |
|   Action Row: [View Recommended Actions] | [Inspect Source] | [Dismiss]                  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 4.5.1 Detailed Insight Card Interactions
*   **View Recommended Actions**: Redirects directly to our Recommendation Center to display step-by-step optimization tasks.
*   **Inspect Source**: Slides out our right-aligned inspector drawer to display the exact raw response transcripts, highlighted error blocks, and citation paths.
