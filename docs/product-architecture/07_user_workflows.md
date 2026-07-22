# 07. User Workflows
## AI Brand Intelligence & Visibility Platform

This document maps out ten core user workflows. Each workflow outlines the exact trigger, sequence of user actions, backend system events, created data models, and final user outcomes, ensuring a cohesive experience for both frontend and backend teams.

---

## 7.1 Core User Journeys Map

```
+-----------------------------------------------------------------------------------------+
|                                    USER WORKFLOWS                                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Registration & Setup   ===> Registration -> Org Creation -> Workspace Setup        |
|   2. Brand Onboarding       ===> Brand Profile Onboarding -> First AI Brand Audit       |
|   3. Monitoring & Tracking  ===> Prompt Setup -> Competitor Tracking                    |
|   4. Execution & Governance ===> Team Invitation -> Report Generation -> Subscription Upgrade|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 7.2 Detailed Workflow Specifications

### 7.2.1 Workflow 1: User Registration
*   **Trigger**: A new user lands on our marketing site and clicks "Start Free Trial" or "Sign Up."
*   **User Actions**:
    1. Enter their email address, set a secure password, and accept the Terms of Service.
    2. Click "Sign Up."
    3. Open their inbox, receive the email verification code, and enter it into the registration panel.
*   **System Actions**:
    1. Create a raw User record in the database with status `PENDING_VERIFICATION`.
    2. Generate a secure, short-lived 6-digit verification code and dispatch it via our transactional email provider.
    3. Upon receiving the correct code, verify the email, update User status to `ACTIVE`, and generate a secure JWT token.
*   **Data Created**: `user_id` (UUID), `user_email` (String), `password_hash` (String), `user_status` (Enum: ACTIVE).
*   **Final Outcome**: The user’s email is verified and they are logged in, automatically moving to the Organization Creation step.

---

### 7.2.2 Workflow 2: Organization Creation
*   **Trigger**: Completion of User Registration with no existing organization associations.
*   **User Actions**:
    1. Enter their Organization Name (e.g., "Alavi Retail Group").
    2. Select their industry vertical (e.g., E-commerce, SaaS, Telecom) and company size.
    3. Click "Create Organization."
*   **System Actions**:
    1. Create a top-level Organization record in the database.
    2. Link the current User to the Organization, assigning them the `ORGANIZATION_OWNER` permission.
    3. Initialize the organization's billing and usage telemetry databases.
*   **Data Created**: `org_id` (UUID), `org_name` (String), `industry_vertical` (Enum), `subscription_tier` (Enum: FREE_TRIAL).
*   **Final Outcome**: Top-level organization record is created, and the user is redirected to the Workspace Creation step.

---

### 7.2.3 Workflow 3: Workspace Creation
*   **Trigger**: Completion of Organization Creation, or manual click of "+ Create Workspace" from the dashboard dropdown.
*   **User Actions**:
    1. Enter a descriptive Workspace Name (e.g., "Iran Cosmetics division" or "Client Alfa Workspace").
    2. Select the default language (Persian, English, or Arabic) and primary workspace timezone.
    3. Click "Initialize Workspace."
*   **System Actions**:
    1. Verify organization billing limits to ensure the workspace limit is not exceeded.
    2. Create a Workspace record linked to the parent `org_id`.
    3. Add a membership record linking the current User to this Workspace with `WORKSPACE_ADMIN` rights.
*   **Data Created**: `workspace_id` (UUID), `org_id` (UUID, Foreign Key), `workspace_name` (String), `default_language` (Enum).
*   **Final Outcome**: The isolated workspace is ready, and the user is guided to onboarding their target brand.

---

### 7.2.4 Workflow 4: Brand Onboarding
*   **Trigger**: Selecting an empty Workspace for the first time.
*   **User Actions**:
    1. Enter their official Brand Name (e.g., "Alfa Cosmetics").
    2. Provide their main company website URL (e.g., `alfacosmetics.ir`).
    3. Input their primary product categories, key executive names, and top product SKUs.
    4. Click "Onboard Brand."
*   **System Actions**:
    1. Validate the website URL format.
    2. Create a Brand Project database record linked to the active `workspace_id`.
    3. Query Wikidata and public knowledge databases to check for any existing entity structures, saving matches to the project.
*   **Data Created**: `project_id` (UUID), `workspace_id` (UUID, Foreign Key), `brand_name` (String), `target_domain` (String), `entity_knowledge_graph_mappings` (JSON).
*   **Final Outcome**: The brand profile is successfully onboarded, and the system automatically launches the initial AI Brand Audit.

---

### 7.2.5 Workflow 5: AI Brand Audit (Lead-Scanner Journey)
*   **Trigger**: Completion of Brand Onboarding, or entering a domain directly on our public "Free AI Scanner" marketing page.
*   **User Actions**:
    1. Verify their target domain and primary brand query.
    2. Click "Run Diagnostics."
*   **System Actions**:
    1. Add a prioritized task to our background scraping worker queue.
    2. Execute dynamic query prompts across target model APIs (ChatGPT, Perplexity, Gemini) simulating high-intent brand requests.
    3. Parse the generated responses using our NLP engine, evaluating brand recommendation rates, sentiment indices, and citation statuses.
    4. Compile the results into a temporary audit report object.
*   **Data Created**: `audit_id` (UUID), `project_id` (UUID, nullable), `scraped_responses` (JSON), `overall_visibility_score` (Float), `calculated_sentiment` (Enum).
*   **Final Outcome**: Renders the dynamic audit dashboard, displaying direct Share of Model Voice (SoMV), brand sentiment summaries, and recommended next steps.

---

### 7.2.6 Workflow 6: Prompt Monitoring Setup
*   **Trigger**: User clicks "Set up Prompt Monitor" or "+ Add Query" from the AI Search Monitoring dashboard section.
*   **User Actions**:
    1. Enter their target search queries or prompt lists (e.g., "Compare the best skin serums in Tehran").
    2. Select the conversational engines to track (ChatGPT, Gemini, Claude, Perplexity).
    3. Choose the tracking frequency (Daily, Weekly, or Hourly for Enterprise plans).
    4. Click "Launch Monitoring."
*   **System Actions**:
    1. Save the tracked queries to the database, linking them to the active Brand Project.
    2. Configure cron job parameters inside our Automation Engine scheduler to trigger scrape jobs at the chosen frequency.
*   **Data Created**: `query_id` (UUID), `project_id` (UUID, Foreign Key), `query_text` (String), `target_engines` (Array), `frequency_schedule` (Enum).
*   **Final Outcome**: The prompt tracking schedule is successfully set up, and the first scrape cycle is added to the worker queue.

---

### 7.2.7 Workflow 7: Competitor Tracking Setup
*   **Trigger**: User clicks "Track Competitors" or "+ Add Competitor" in the Competitors dashboard section.
*   **User Actions**:
    1. Enter Competitor Brand Names (e.g., "Beta Cosmetics", "Gamma Beauty").
    2. Provide competitor website domains and key product targets.
    3. Click "Save Competitors."
*   **System Actions**:
    1. Create competitor records linked to the parent Brand Project.
    2. Automatically update active prompt campaigns to parse and highlight competitor mentions and citations.
*   **Data Created**: `competitor_id` (UUID), `project_id` (UUID, Foreign Key), `competitor_name` (String), `competitor_domain` (String).
*   **Final Outcome**: Competitor profiles are created, and Share of Model Voice (SoMV) charts are updated to compare performance directly.

---

### 7.2.8 Workflow 8: Report Generation
*   **Trigger**: User clicks "Export PDF" or schedules an automated report in the Reports section.
*   **User Actions**:
    1. Choose their report type (Executive Summary, Technical SEO/AEO Audit, or Competitor SOV report).
    2. (Agency Tier) Upload their agency logo and select a custom color palette.
    3. Select the reporting interval (Last 7 Days, Last 30 Days) and input recipient email addresses.
    4. Click "Generate Report."
*   **System Actions**:
    1. Fetch historical visibility, sentiment, and citation databases for the selected timeframe.
    2. Map the data into our PDF design templates, processing white-labeled logos and styles.
    3. Generate the PDF asset and store it securely in our cloud storage buckets.
    4. Dispatch the report directly to the recipient emails or prompt an immediate browser download.
*   **Data Created**: `report_id` (UUID), `workspace_id` (UUID, Foreign Key), `report_type` (Enum), `pdf_storage_url` (String).
*   **Final Outcome**: The polished, white-labeled PDF report is successfully generated and delivered.

---

### 7.2.9 Workflow 9: Team Invitation
*   **Trigger**: User clicks "Invite Team Member" in the Team management dashboard.
*   **User Actions**:
    1. Enter the team member's email address (e.g., `yashar@agency.ir`).
    2. Assign their role (e.g., SEO Specialist, Viewer).
    3. Select the workspaces they are allowed to access.
    4. Click "Send Invitation."
*   **System Actions**:
    1. Create a Team Invitation record in the database with a secure, unique verification token.
    2. Dispatch an invitation email containing the onboarding signup link.
*   **Data Created**: `invite_id` (UUID), `workspace_id` (UUID, Foreign Key), `recipient_email` (String), `assigned_role` (Enum), `token` (String).
*   **Final Outcome**: The system registers the pending invite, sends the email, and updates the team dashboard with the member's pending status.

---

### 7.2.10 Workflow 10: Subscription Upgrade
*   **Trigger**: User clicks "Upgrade Plan" in the billing dashboard, or hits a core platform usage ceiling.
*   **User Actions**:
    1. Select their new plan tier (Growth, Agency, or request Enterprise contract).
    2. Select the billing cycle (Monthly or Annual with 20% discount).
    3. Input localized payment details (e.g., Shetab card info for Tomans, or credit card info for USD).
    4. Click "Authorize Payment."
*   **System Actions**:
    1. Connect with the chosen payment gateway (Shaparak/Shetab for Phase 1 Iran, or Stripe for international tiers).
    2. Upon successful transaction authorization, generate a transaction log and invoice.
    3. Update the Organization's subscription limits and usage capabilities in real-time.
*   **Data Created**: `transaction_id` (UUID), `org_id` (UUID, Foreign Key), `amount_paid` (Decimal), `payment_currency` (Enum: IRR, USD), `invoice_pdf_url` (String).
*   **Final Outcome**: Subscription tier is upgraded, feature gates are unlocked, and a downloadable PDF invoice is generated.
