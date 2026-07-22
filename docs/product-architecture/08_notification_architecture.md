# 08. Notification Architecture
## AI Brand Intelligence & Visibility Platform

This document defines the complete notification architecture. It specifies in-app notifications, transactional email alerts, real-time alerts, scheduled summaries, and enterprise integrations. This architecture ensures that users receive timely, relevant, and actionable updates on their brand reputation and visibility metrics.

---

## 8.1 Unified Notification Engine Map

The notification engine distributes events across five delivery channels:

```
+-----------------------------------------------------------------------------------------+
|                               NOTIFICATION ENGINE MAP                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. In-App Dashboard  ===> Layout feed, badge alerts, contextual warnings.              |
|   2. Email (SendGrid)  ===> Weekly reports, billing alerts, verification codes.         |
|   3. Real-Time (Slack) ===> High-priority brand sentiment and competitor alerts.         |
|   4. Scheduled Push    ===> Daily executive updates and weekly campaign summaries.       |
|   5. Webhooks / APIs   ===> Immediate HTTP POST alerts for enterprise integrations.     |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 8.2 Delivery Channels & Protocols

### 8.2.1 Channel A: In-App Notifications
*   **Protocol**: WebSockets for real-time delivery; Polling fallback.
*   **Purpose**: Display real-time system messages and product alerts to active dashboard users.
*   **RTL Layout Adaptability**: Notification badges position on the top-left of elements in RTL Persian view, and read right-to-left.

### 8.2.2 Channel B: Email Notifications
*   **Protocol**: SMTP via localized secure relays (Phase 1) and standard global engines (SendGrid / Mailgun for Phases 2 & 3).
*   **Purpose**: Transactional operations (signup verification, billing invoices, password resets) and scheduled reports.

### 8.2.3 Channel C: Real-Time Alerts
*   **Protocol**: Real-time integration integrations (Slack Webhooks, Microsoft Teams API, Telegram Bots for regional users).
*   **Purpose**: High-priority alert escalation to ensure rapid public relations and marketing response.

### 8.2.4 Channel D: Scheduled Notifications
*   **Protocol**: Cron worker-triggered database evaluations.
*   **Purpose**: Deliver daily, weekly, or monthly digest summaries on overall Share of Model Voice (SoMV) and competitor trends.

### 8.2.5 Channel E: Enterprise Webhooks
*   **Protocol**: Dynamic HTTP POST requests containing secure payload signatures (`X-AIBI-Signature`).
*   **Purpose**: Dispatch real-time raw data alerts directly to custom client-side servers.

---

## 8.3 Key Notification Use Cases

```
+-----------------------------------------------------------------------------------------+
|                              NOTIFICATION ROUTING SCHEMES                               |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. SOV Changes   ===> In-App (Low) | Email Weekly (Medium) | Webhooks (Enterprise)     |
|   2. Competitors   ===> In-App Feed  | Email Daily Summary  | Slack Channel Alert      |
|   3. Hallucination ===> In-App Flash | Transactional Email  | Slack Escalation + Webhook|
|   4. New Citation  ===> In-App Feed  | Email Weekly Summary | API Logs                 |
|   5. Model Changes ===> In-App Banner| Structural Email Notification                     |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 8.3.1 Scenario 1: Significant Visibility Score (SoMV) Change
*   **Trigger**: A brand's overall Share of Model Voice drops or increases by more than 15% over a 7-day period.
*   **Priority Level**: Medium.
*   **Delivery Rules**:
    *   **In-App**: Create a notification record in the workspace notifications list with a warning label.
    *   **Email**: Include a summary chart and comparative competitor comparison inside the next scheduled weekly report.
    *   **Slack**: Send an automated channel alert to Slack (if integrated by the team).

### 8.3.2 Scenario 2: Competitor Movement Alert
*   **Trigger**: A registered competitor increases their Share of Voice on a tracked query campaign by more than 20%.
*   **Priority Level**: Medium.
*   **Delivery Rules**:
    *   **In-App**: Display a trend change indicator on the Competitors dashboard page.
    *   **Email**: Send an automated summary email to the assigned SEO Specialists and Marketing Managers.

### 8.3.3 Scenario 3: Factual Error / Brand Hallucination Identified
*   **Trigger**: The crawler parses an AI response text containing negative brand sentiment or a clear factual error on a high-priority query.
*   **Priority Level**: High (Immediate Escalation).
*   **Delivery Rules**:
    *   **In-App**: Render a high-priority, contextual alert on the main Overview page.
    *   **Email**: Dispatch an immediate transactional alert containing the full query text and generated AI response transcript.
    *   **Slack**: Send a high-priority notification to Slack/Teams containing direct links to review the hallucinated response.
    *   **Webhooks**: Trigger an HTTP POST payload to configured enterprise CRM endpoints.

### 8.3.4 Scenario 4: New Citation Discovered
*   **Trigger**: The system parses a conversational answer containing a new direct link citation to the client’s domain.
*   **Priority Level**: Low.
*   **Delivery Rules**:
    *   **In-App**: Add a log record to the active workspace Brand Mentions feed.
    *   **Email**: Include the new citation path mapping in the weekly scheduled report summary.

### 8.3.5 Scenario 5: Core LLM Algorithm / Training Cutoff Change
*   **Trigger**: An AI provider releases a new major model version (e.g., GPT-5 release) or updates search indexes, altering crawling parameters.
*   **Priority Level**: Medium.
*   **Delivery Rules**:
    *   **In-App**: Render a global administrative banner at the top of the dashboard settings panel.
    *   **Email**: Send a structural email outlining the new model version, testing parameters, and active campaign compatibility updates.

### 8.3.6 Scenario 6: Scheduled Report Ready
*   **Trigger**: Completion of a weekly or monthly automated reporting cycle.
*   **Priority Level**: Low.
*   **Delivery Rules**:
    *   **In-App**: Render a file-ready indicator on the dashboard Reports page.
    *   **Email**: Dispatch the completed PDF report as an email attachment directly to the workspace recipients.
