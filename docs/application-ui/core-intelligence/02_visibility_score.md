# 02. Visibility Score Framework
## AI Brand Intelligence & Visibility Platform

This document defines our Share of Model Voice (SoMV) Visibility Score framework, specifying scoring parameters, multi-dimensional breakdowns, confidence indicators, and mathematical calculations to ensure full transparency.

---

## 2.1 Multi-Dimensional Scoring Grid

Our scoring system analyzes brand visibility across four key dimensions:

```
+-----------------------------------------------------------------------------------------+
|                                    VISIBILITY MATRIX                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Per-Model Scores    ===> Track visibility across ChatGPT, Gemini, Perplexity, etc. |
|   2. Per-Language Scores ===> Track visibility across English, Persian, and Arabic queries.|
|   3. Per-Country Scores  ===> Regional variations based on localized proxy simulations.  |
|   4. Confidence Indicator===> Score reliability based on sample sizes & api response rates.|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 2.2 Visibility Score Calculations & Transparency

To build trust with enterprise users, we do not present a "black box" score. We show the exact calculations, prompt campaign lists, and weights behind every rating:

### 2.2.1 Overall Share of Model Voice (SoMV) Calculation
The overall Visibility Score is a weighted average of model-specific recommendations:
$$\text{SoMV}_{\text{overall}} = \sum_{m \in M} w_m \times \left( \frac{\text{Total Brand Recommendations}_m}{\text{Total Simulation Runs}_m} \right) \times 100$$
Where $M$ represents the set of monitored AI models, and $w_m$ represents the relative model weights (e.g., GPT-4o has a higher weight than Llama-3 due to its larger market share).

---

## 2.3 Visual Dashboard Blueprint (Score Details view)

The Visibility Score page is organized to deliver deep insights and clear explanations:

```
+-----------------------------------------------------------------------------------------+
|                                  VISIBILITY SCORE SCREEN                                |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Hero Score Panel (bold, 72px): "48.2% SoMV" with confidence rating ("98% High").    |
|   - Text Explanation Box: Clear paragraph explaining *why* the score changed this week.  |
|   - Multi-Model Grid List: Metric cards displaying individual scores for each LLM.       |
|   - Interactive Geo-Map Chart: Illustrates visibility by country and region.             |
|   - Top Recommendations Badge list: Suggests quick wins to improve visibility.          |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 2.3.1 Per-Model Score Cards Grid
Each card displays an individual model rating, a sparkline trend chart, and a sample-size status tag (e.g., ChatGPT: 55%, Gemini: 40%, Perplexity: 52%).

### 2.3.2 Regional & Geo-Map Analytics
An interactive geographic map display highlights localized variations based on regional proxy simulations (e.g., comparing visibility in Tehran, Isfahan, Dubai, and Riyadh), helping teams identify regional gaps.

### 2.3.3 Score Explanation & Action Items
Provides a clear, natural language explanation of score changes (e.g., "Your visibility dropped on Perplexity because Competitor Beta captured direct citation links on two high-priority skincare query campaigns"). Pair this explanation with direct link cards to our Recommendation Center to help users resolve issues immediately.
