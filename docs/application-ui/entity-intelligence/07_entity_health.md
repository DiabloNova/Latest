# 07. Entity Health Module
## AI Brand Intelligence & Visibility Platform

This document defines our Entity Health dashboard module, specifying how we measure, present, and visualize key health parameters including completeness, consistency, accuracy, conflict detection, and freshness.

---

## 7.1 Seven Core Entity Health Metrics

Our scoring system evaluates entity health across seven key parameters:

```
+-----------------------------------------------------------------------------------------+
|                                    ENTITY HEALTH                                        |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Completeness ===> Percentage of required entity properties populated in databases.  |
|   2. Consistency  ===> Cross-model agreement rate on entity attributes (e.g., founders). |
|   3. Accuracy     ===> Factual alignment with verified public registers and Wikidata.   |
|   4. Authority    ===> Citations density from trusted, high-authority domain sources.   |
|   5. Coverage     ===> Model count tracking entity mentions in conversational search.   |
|   6. Freshness    ===> Review index updates to track model training cutoff compliance.  |
|   7. Conflict Det ===> Active alert highlighting contradictory model output parameters. |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 7.2 Visual Interface Specifications

The Entity Health dashboard displays parameters clearly using structured layouts:

```
+-----------------------------------------------------------------------------------------+
|                                   ENTITY HEALTH SCREEN                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Hero Gauge Indicator: Renders a large circular Entity Health Index (e.g., "88%").   |
|   - Overlapping Metrics Grid: Detailed cards display individual scores and trends.       |
|   - Conflict Resolution Panel: Displays alerts, warning logs, and discrepancy summaries.  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 7.2.1 Hero Health Gauge
*   **Visual Style**: Renders a large circular gauge display showing the overall Entity Health Index percentage (e.g., "88%"), surrounded by small inline helper descriptions.

### 7.2.2 Core Health Cards Grid
Each card displays an individual health parameter (bold, 24px), a sparkline trend chart, and a sample count indicator:
*   **Completeness Card**: `90%` (verified fields).
*   **Consistency Card**: `85%` (cross-model similarity rate).
*   **Freshness Card**: Displays date timestamp indicating last crawl indexing checks.

### 7.2.3 Conflict Resolution Panel (Discrepancy Alerts)
*   **Trigger**: The crawler parses contradictory parameters generated across different model outputs (e.g., ChatGPT claims our founder is Person A, while Gemini claims it is Person B).
*   **UX Layout**: Displays a comparison alert card displaying the contradictory outputs.
*   **Primary Action**: "Resolve Discrepancy" button (opens a pre-built Wikidata or JSON-LD schema correction template to help users fix errors at the source).
