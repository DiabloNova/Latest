# 08. Error States Design Strategy
## AI Brand Intelligence & Visibility Platform

This document defines our error states design strategy. Our error design follows three rules: explain clearly *what* happened without technical jargon, state *why* it occurred, and provide a clear recovery path (CTA) to resolve the error immediately.

---

## 8.1 Error Classification & Recovery Matrix

We classify error states into four operational categories:

```
+-----------------------------------------------------------------------------------------+
|                                    ERROR CATEGORIES                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Network / Server   ===> Connection dropped, API timeout. Retry CTAs.               |
|   2. User Validation    ===> URL errors, weak passwords. Contextual inline warnings.    |
|   3. System Limits      ===> Subscription limits reached. Immediate upgrade path CTAs.  |
|   4. Integration Gaps   ===> Expired tokens, webhook timeouts. Re-auth recovery steps.  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 8.2 Detailed Error Specifications

### 8.2.1 Error 1: Model API Connection Timeout
*   **Trigger**: A temporary failure or high latency spike on OpenAI or Perplexity API nodes.
*   **UX Layout & Actions**:
    *   *Visual Zone*: Inline warning card displaying an abstract warning icon.
    *   *Primary Action*: "Retry Simulation" button (triggers immediate background task retry).
    *   *Secondary Action*: "Check System Status Page" link.
*   **Suggested Copy**:
    *   *Headline*: "Conversational AI Model Timeout"
    *   *Paragraph*: "The target AI model took too long to respond to our simulation query. This is usually due to temporary model API latency. Click retry to run the simulation again."

---

### 8.2.2 Error 2: Domain Validation Failure
*   **Trigger**: A user inputs an invalid, unreachable, or unverified URL during Brand Onboarding.
*   **UX Layout & Actions**:
    *   *Visual Zone*: In-form input error state, adding a red outline border and an inline warning message below the field.
    *   *Primary Action*: Contextual input correction.
*   **Suggested Copy**:
    *   *Headline*: "Invalid Domain Format"
    *   *Paragraph*: "We were unable to reach `http://alfacosmetics.ir`. Please check the spelling, confirm your website is active and public, and try again."

---

### 8.2.3 Error 3: Subscription Limits Exceeded (Ceiling Block)
*   **Trigger**: A workspace user hits their monthly query tracking limit or tries to configure more workspaces than allowed by their plan.
*   **UX Layout & Actions**:
    *   *Visual Zone*: Center-aligned modal screen blocking dashboard interaction.
    *   *Primary Action*: "Upgrade Plan" blue button (redirects to billing checkout).
    *   *Secondary Action*: "Adjust Active Query Campaign" (allows users to deactivate older prompts to fit plan limits).
*   **Suggested Copy**:
    *   *Headline*: "Monthly Tracking Limit Reached"
    *   *Paragraph*: "Your workspace has used its monthly limit of 1,500 prompt tracking queries. Upgrade to the Agency plan to unlock higher limits, or adjust your active campaigns."

---

### 8.2.4 Error 4: Integration Token Expired
*   **Trigger**: A third-party security rotation revokes our active Slack OAuth access key.
*   **UX Layout & Actions**:
    *   *Visual Zone*: A high-priority inline notification banner on the main Overview page.
    *   *Primary Action*: "Re-authenticate Connection" button (redirects directly to OAuth credentials flow).
*   **Suggested Copy**:
    *   *Headline*: "Slack Integration Disconnected"
    *   *Paragraph*: "We were unable to deliver recent visibility alerts because your Slack integration token has expired. Re-authenticate your connection to resume real-time alerts."
