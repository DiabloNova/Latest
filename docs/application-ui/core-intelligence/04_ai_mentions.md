# 04. AI Mention Explorer
## AI Brand Intelligence & Visibility Platform

This document defines the UI, interaction models, and layouts for the AI Mention Explorer, our primary interface for inspecting raw LLM responses and analyzing brand mentions.

---

## 4.1 Mention Explorer Screen Blueprint

The Explorer screen uses a split column layout to combine comprehensive overview tables with a detailed inspector panel:

```
+-----------------------------------------------------------------------------------------+
|                                  MENTION EXPLORER SCREEN                               |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Global Filter Bar: Brand | date | model | country | language | sentiment        |   |
|   +---------------------------------------------------------------------------------+   |
|   | Left Table Area (Column Span 2/3)         | Right Inspector (Column Span 1/3)       |   |
|   | - Sortable column headers                 |  - Selected Prompt & AI Model details   |   |
|   | - Multi-select rows checkboxes            |  - Split Panel display:                 |   |
|   | - Row entries with inline status badges   |    - Top: Raw Response Transcript       |   |
|   | - Bottom pagination controls              |    - Bottom: Citations & Entity cards   |   |
|   +-------------------------------------------+-----------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4.2 Interactive Row & Card Specifications

### 4.2.1 Left Content Area: Active Mentions Table
*   **Checkbox Selection**: Allows users to select multiple rows to perform bulk actions (e.g., deactivating campaigns, exporting CSV logs).
*   **Model Badge**: Displays the target model's logo and version hash (e.g., 'gpt-4o', 'claude-3-5').
*   **Prompt Column**: Displays the truncated text of the executed query prompt. Clicking a row loads its properties into the inspector panel.
*   **Sentiment Indicator**: Renders inline status badges:
    *   *Green Badge* with upward arrow `↑` and "Improved" text maps to positive trends.
    *   *Red Badge* with downward arrow `↓` and "Declined" text maps to negative trends or errors.
    *   *Amber Badge* maps to neutral or pending states.

### 4.2.2 Right Content Area: Detailed Inspector Panel
When a table row is clicked, the inspector panel displays the complete, raw tracking details:
*   **Metadata Header**: Displays the full prompt text, executed date, execution latency, and language parameters.
*   **Raw Response Transcript (Split Top)**: Renders the complete textual answer returned by the model. Matches and brand references are dynamically highlighted in yellow to guide analyst review.
*   **Citations & Entities (Split Bottom)**: Renders cards displaying:
    *   *Citations Card*: Shows cited domains, full URLs, and anchor text.
    *   *Entity Card*: Shows matched public graph database mappings and entity attributes.
    *   *Action Buttons*: "Inspect Source" and "Assign Task" actions allow users to escalate issues immediately.
