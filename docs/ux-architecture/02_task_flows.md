# 02. Task Flows
## AI Brand Intelligence & Visibility Platform

This document defines nine core user task flows. It specifies every manual user action alongside corresponding backend system events and feedback triggers, providing clear guidelines for frontend and backend engineers.

---

## 2.1 Complete Task Flow Specifications

### 2.1.1 Flow 1: Create Organization
*   **User Action 1**: Log in and click "Create Organization" on the welcoming onboarding screen.
*   **User Action 2**: Enter the organization name, select the industry vertical, and choose the payment currency. Click "Confirm."
*   **System Response**:
    *   Verify the input fields for validation.
    *   Create a top-level Organization record in the database.
    *   Link the current User to the Organization with `ORGANIZATION_OWNER` permissions.
    *   Render a success notification and redirect the user to the Workspace Creation dashboard.

---

### 2.1.2 Flow 2: Add First Brand Project
*   **User Action 1**: Click "+ Add Brand" in the Workspace Projects list.
*   **User Action 2**: Enter the brand name, website domain, and primary product lines. Click "Save Project."
*   **System Response**:
    *   Validate the format of the provided domain.
    *   Create a Brand Project database record linked to the active `workspace_id`.
    *   Launch an initial background entity verification check on public knowledge graphs.
    *   Redirect the user to the Prompt Monitoring setup page.

---

### 2.1.3 Flow 3: Connect Integrations
*   **User Action 1**: Navigate to the Settings tab and click "Integrations."
*   **User Action 2**: Select Slack from the integrations list and click "Connect Slack."
*   **User Action 3**: Authorize the Slack workspace connection and select the target channel for alerts. Click "Save."
*   **System Response**:
    *   Establish a secure OAuth handshake with Slack APIs.
    *   Store the encrypted integration token in our database secrets store.
    *   Send a verification test message to the selected Slack channel.
    *   Update the dashboard status to "Slack Connected" with a green indicator badge.

---

### 2.1.4 Flow 4: Run AI Visibility Audit
*   **User Action 1**: Open the Brand Projects overview page and click "Run Full Audit."
*   **System Response**:
    *   Add a prioritized collection of prompt-execution tasks to our scraping queue.
    *   Simulate dynamic query runs across OpenAI, Perplexity, and Gemini APIs.
    *   Process and normalize raw text responses, calculating visibility scores and brand sentiment indices.
    *   Render a live progression bar on the dashboard, updating the results panel in real-time as tasks finish.

---

### 2.1.5 Flow 5: Analyze Competitors
*   **User Action 1**: Open the Competitors section and click "Add Competitor."
*   **User Action 2**: Enter the competitor name and website domain. Click "Save."
*   **System Response**:
    *   Create a Competitor record linked to the active project.
    *   Update the campaign tracking scrapers to parse and highlight competitor mentions and citations.
    *   Refresh the Competitor metrics page to render a direct comparison table.

---

### 2.1.6 Flow 6: View AI Citations
*   **User Action 1**: Open the Citation Tracking dashboard.
*   **User Action 2**: Click on a citation link item in the active references table.
*   **System Response**:
    *   Display a slide-out modal panel on the right side of the screen.
    *   Render the exact raw AI response transcript, highlighting the specific citation block.
    *   Display the referring domain's authority score, matched anchor text, and landing page URLs.

---

### 2.1.7 Flow 7: Generate Reports
*   **User Action 1**: Open the Reports section and click "Create New Report."
*   **User Action 2**: Select the "Executive Summary" PDF template, upload their company logo, and click "Generate Now."
*   **System Response**:
    *   Consolidate historical metrics and charts for the past 30 days.
    *   Process the data into our PDF rendering engine, applying the user's custom brand styling and logo.
    *   Save the PDF to our object storage and trigger an immediate browser file download.

---

### 2.1.8 Flow 8: Invite Team Members
*   **User Action 1**: Open the Team settings panel and click "Invite New Member."
*   **User Action 2**: Input the email address, select "SEO Specialist" as the workspace role, and click "Send Invitation."
*   **System Response**:
    *   Create a Team Invitation database record with a unique verification token.
    *   Send a transactional invitation email containing a secure signup link.
    *   Add a pending invite record to the team table on the dashboard.

---

### 2.1.9 Flow 9: Upgrade Subscription
*   **User Action 1**: Click "Manage Billing" and select the "Agency Plan" upgrade option.
*   **User Action 2**: Input their payment card credentials and click "Authorize Payment."
*   **System Response**:
    *   Connect with the chosen payment processor (Shaparak/Shetab for Phase 1 Tomans, Stripe for global USD).
    *   Upon successful authorization, upgrade the organization's subscription tier in real-time.
    *   Generate a transaction record and downloadable PDF invoice.
    *   Unlock advanced workspace capacities and API configurations.
