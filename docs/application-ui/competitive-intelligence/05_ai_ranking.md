# 05. AI Ranking Module
## AI Brand Intelligence & Visibility Platform

This document defines our AI Ranking dashboard module, specifying how we track and present brand ranking changes across major conversational engines, historical position modifications, and ranking explanations.

---

## 5.1 Multi-Model Ranking Boards

Our system tracks brand ranking and positioning across five major AI search engines:

```
+-----------------------------------------------------------------------------------------+
|                                    RANKING BOARDS                                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. ChatGPT Board   ===> Track brand rankings in ChatGPT Search and summaries.          |
|   2. Gemini Board    ===> Track brand rankings in Google Gemini answers.                 |
|   3. Claude Board    ===> Track brand rankings in Anthropic Claude outputs.              |
|   4. Perplexity Board===> Track brand rankings in Perplexity Pro citations & summaries. |
|   5. Copilot Board   ===> Track brand rankings in Microsoft Copilot answers.             |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Visual Interface Specifications

The AI Ranking panel uses structured cards and detailed tables to display ranking changes:

```
+-----------------------------------------------------------------------------------------+
|                                    AI RANKING SCREEN                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Hero Ranking Cards Row: Displays overall rankings and position changes.             |
|   - Master Ranking Board Table: Sortable table comparing brand rankings across models.   |
|   - Position Change Indicators: Inline, color-coded badges display ranking deltas.      |
|   - Ranking Explanations Panel: Natural language explanations of position shifts.        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 5.2.1 Hero Ranking Cards Row
*   **ChatGPT Position Card**: Brand's current ranking position (e.g., `#2 Position` with green upward delta indicator).
*   **Perplexity Position Card**: Brand's current ranking position (e.g., `#3 Position`).
*   **Gemini Position Card**: Brand's current ranking position (e.g., `#1 Position`).

### 5.2.2 Master Ranking Board Table
*   **Database Columns**:
    *   *Search Phrase*: Monitored prompt text (e.g., "Recommend the best skin serums in Tehran").
    *   *ChatGPT Rank*: Brand's current ranking position (e.g., `#2`).
    *   *Perplexity Rank*: Brand's current ranking position (e.g., `#3`).
    *   *Gemini Rank*: Brand's current ranking position (e.g., `#1`).
*   **A11y & Interactions**: Table rows highlight on mouse hover, and clicking a row loads its details into the right detail panel.

### 5.2.3 Ranking Explanations Panel
Provides a clear, natural language explanation of ranking changes (e.g., "Your ranking on Perplexity improved from #4 to #3 because you added structural product schemas, capturing direct citation links"). Clicking "View Recommended Schema" redirects to our Recommendation Center to help users implement improvements.
