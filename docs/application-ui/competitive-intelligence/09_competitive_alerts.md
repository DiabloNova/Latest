# 09. Competitive Alerts Module
## AI Brand Intelligence & Visibility Platform

This document defines the Competitive Alerts module—the real-time warning and alerting system that notifies users of critical ranking changes, competitor growth, authority drops, or negative brand sentiment.

---

## 9.1 Alert Classifications & Severity Levels

We classify competitive alerts into three severity levels to ensure efficient response times:

```
+-----------------------------------------------------------------------------------------+
|                                  ALERT SEVERITY MATRIX                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Critical (Red) ===> Urgent threats (e.g., negative brand sentiment, rankings drop).|
|   2. Warning (Amber)===> Moderate shifts (e.g., competitor growth, authority drops).     |
|   3. Info (Blue)    ===> General updates (e.g., new citations, trending topics).        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 9.2 Key Alert Trigger Scenarios

### 9.2.1 Scenario 1: Significant Ranking Drop (Critical Severity)
*   **Trigger**: Client's brand drops more than 2 positions on ChatGPT or Perplexity for high-priority search terms.
*   **Notification Behavior**:
    *   *In-App*: Display a high-priority, red alert card on the main Overview page.
    *   *Email*: Send an immediate transactional notification containing the query text and current rankings.
    *   *Slack*: Dispatch an automated alert to the integrated Slack channel.

### 9.2.2 Scenario 2: Brand Hallucination Identified (Critical Severity)
*   **Trigger**: The crawler parses an AI response text containing negative brand sentiment or a clear factual error.
*   **Notification Behavior**:
    *   *In-App*: Display an urgent warning card with a "Verify Facts" button.
    *   *Email & Slack*: Send immediate notifications containing direct links to review the hallucinated response.

### 9.2.3 Scenario 3: Competitor Growth Spike (Warning Severity)
*   **Trigger**: A tracked competitor increases their Share of Voice on a query campaign by more than 20% in a 7-day period.
*   **Notification Behavior**:
    *   *In-App*: Renders a trend change indicator on the Competitor metrics page.
    *   *Email*: Include a summary card inside the next scheduled daily report digest.

### 9.2.4 Scenario 4: New Citation Discovered (Info Severity)
*   **Trigger**: The crawler parses a new direct citation link to the client’s domain.
*   **Notification Behavior**:
    *   *In-App*: Add an entry log to the workspace Brand Mentions feed.
    *   *Email*: Include the citation path mapping in the weekly scheduled report summary.

---

## 9.3 Visual Alert Feed Layout Blueprint

The alerts panel is designed for fast triage and clear prioritization:

```
+-----------------------------------------------------------------------------------------+
|                                     ALERTS FEED PANEL                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Severity Toggle row: [Show All] | [Critical Only (Red)] | [Warnings (Amber)]         |
|   - Chronological Alert Cards list: Displaying alert details, timestamps, & badges.     |
|   - Action Buttons inside cards: [Investigate] | [Mark as Resolved] | [Decline]         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 9.3.1 Detailed Alert Card Interactions
*   **Investigate**: Opens a right-aligned sliding modal drawer displaying raw generated response transcripts, highlighted error blocks, and historical trend charts.
*   **Mark as Resolved**: Confirms the issue has been addressed, deactivating the warning status badge and archiving the alert card.
