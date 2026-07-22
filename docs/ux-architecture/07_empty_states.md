# 07. Empty States Design Strategy
## AI Brand Intelligence & Visibility Platform

This document defines our empty states design strategy. Rather than presenting static, dead-end states, our empty states are designed to act as proactive onboarding steps that reduce user friction and guide teams toward configuring active tracking features.

---

## 7.1 Empty States Configuration Matrix

```
+-----------------------------------------------------------------------------------------+
|                                    EMPTY STATE ROLES                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Overview Tab       ===> No projects configured. Prompt primary brand onboarding.  |
|   2. Campaigns Page     ===> No prompts monitored. Offer preset query templates.       |
|   3. Competitors Page   ===> No competitive targets. Suggest local and global peers.    |
|   4. Reports Dashboard  ===> No exported reports. Guide users to schedule initial weekly PDF.|
|   5. Integrations Portal===> No connected services. Offer connection cards (Slack, API).|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 7.2 Detailed State Specifications

### 7.2.1 State 1: Dashboard Overview (Empty Project state)
*   **Trigger**: A user enters their newly initialized workspace for the first time with no registered brand project.
*   **UX Layout & Actions**:
    *   *Visual Zone*: Center-aligned card displaying a clean, abstract entity-mapping illustration.
    *   *Primary Action Button*: Blue "+ Onboard First Brand" button.
    *   *Secondary Action Button*: "Watch Onboarding Guide Video" (opens a modal tutorial).
*   **Suggested Copy**:
    *   *Headline*: "Establish Your Brand Identity in the Age of AI"
    *   *Paragraph*: "Before we can monitor recommendations across ChatGPT, Gemini, and Perplexity, we need to map your primary brand assets and target domain."

---

### 7.2.2 State 2: Prompt Monitoring (Empty Campaign state)
*   **Trigger**: A brand project is onboarded, but the user has not added any queries or campaign tracking prompt lists.
*   **UX Layout & Actions**:
    *   *Visual Zone*: Center-aligned card with a list of popular, industry-specific preset prompt templates.
    *   *Primary Action Button*: "+ Create Custom Prompt" button.
    *   *Pre-configured Presets*: Add cards for "Compare [Brand] with Competitors" or "Best [Product Category] in Iran."
*   **Suggested Copy**:
    *   *Headline*: "What Queries Do Customers Use to Find Your Brand?"
    *   *Paragraph*: "Enter the conversational search phrases and comparison questions your target buyers ask AI search agents, or select one of our pre-configured templates to get started."

---

### 7.2.3 State 3: Competitor Tracking (Empty Competitor state)
*   **Trigger**: Prompt campaigns are configured, but the competitor tracking lists are empty.
*   **UX Layout & Actions**:
    *   *Visual Zone*: Split panel layout. On the left, list common industry competitor domains parsed from initial scans. On the right, display a manual entry card.
    *   *Primary Action Button*: "+ Save Competitors."
*   **Suggested Copy**:
    *   *Headline*: "How Does Your Brand Compare in Generative Search?"
    *   *Paragraph*: "Add your key business competitors to start tracking comparative Share of Model Voice (SoMV), brand sentiment shifts, and recommendation trends."

---

### 7.2.4 State 4: Automated Reporting (Empty Reports state)
*   **Trigger**: The user navigates to the Reports section, but has not exported or scheduled any PDF reports.
*   **UX Layout & Actions**:
    *   *Visual Zone*: Center-aligned card displaying our pre-built report templates (Executive, Technical, White-label).
    *   *Primary Action Button*: "+ Schedule Weekly Report" button.
    *   *Secondary Action Button*: "Export Sample PDF Audit."
*   **Suggested Copy**:
    *   *Headline*: "Deliver Actionable AI Brand Insights to Your Stakeholders"
    *   *Paragraph*: "Schedule automated weekly PDF audits to share Share of Model Voice updates and visibility metrics directly with your clients or internal executive teams."

---

### 7.2.5 State 5: Integrations & API (Empty Integrations state)
*   **Trigger**: The user opens the integrations panel, but has not connected any external software or generated API keys.
*   **UX Layout & Actions**:
    *   *Visual Zone*: An organized grid displaying integration cards for Slack, Microsoft Teams, and Webhook APIs.
    *   *Primary Action Button*: "Connect Slack" or "Generate API Key" buttons inside the respective integration cards.
*   **Suggested Copy**:
    *   *Headline*: "Connect AI Visibility Alerts with Your Daily Workflow"
    *   *Paragraph*: "Integrate real-time brand sentiment and competitor alerts directly into Slack, or generate public developer API keys to query visibility metrics from your own systems."
