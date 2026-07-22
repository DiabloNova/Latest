# 10. Billing Architecture
## AI Brand Intelligence & Visibility Platform

This billing architecture defines our multi-currency monetization system, usage tracking, feature gates, and subscription cycles. It bridges the transition from our initial local launch in Iran to regional Middle Eastern growth and global enterprise expansion.

---

## 10.1 Feature Gates & Subscription Ceilings

The platform manages and restricts resources across our core subscription plans:

```
+-----------------------------------------------------------------------------------------+
|                                    BILLING FEATURE GATES                                |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Workspaces    ===> Starter (1)   | Growth (3)     | Agency (15)    | Enterprise (U) |
|   2. Query Quota   ===> Starter (300) | Growth (1,500) | Agency (5,000) | Enterprise (U) |
|   3. Tracking Freq ===> Starter (Wk)  | Growth (Daily) | Agency (Daily) | Enterprise (Hr)|
|   4. White-Label   ===> Starter (No)  | Growth (No)    | Agency (Yes)   | Enterprise (Yes)|
|   5. API / SSO     ===> Starter (No)  | Growth (No)    | Agency (Partial)| Enterprise (Yes)|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 10.2 Pricing & Currency Schemes Across Three Growth Phases

To support our phased roadmaps, our pricing engine implements dynamic multi-currency calculations:

```
+-----------------------------------------------------------------------------------------+
|                              MULTI-PHASE BILLING ENGINE                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Phase 1 (Iran)     ===> Billed in Tomans. Supports local Shetab payments.           |
|   2. Phase 2 (Regional) ===> Billed in regional AED, SAR, QAR, or USD. Regional portals.|
|   3. Phase 3 (Global)   ===> Billed in USD, EUR, or GBP. Stripe/Adyen global processors. |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 10.2.1 Phase 1 Iran Market Pricing Structure
*   **Primary Currency**: Iranian Tomans (IRT).
*   **Billing Engine Gateway**: Shaparak secure localized payment links.
*   **Pricing Plans (Monthly / Annualized 20% discount)**:
    *   **Starter**: **4,900,000 Tomans / Month** (Annual: 3,920,000 Tomans/Month).
    *   **Growth**: **19,500,000 Tomans / Month** (Annual: 15,600,000 Tomans/Month).
    *   **Agency**: **49,000,000 Tomans / Month** (Annual: 39,200,000 Tomans/Month).
    *   **Enterprise**: Custom Pricing starting from **150,000,000 Tomans / Month** (Custom annual contracts).

### 10.2.2 Phase 2 Regional Middle East Pricing Structure
*   **Supported Currencies**: United Arab Emirates Dirhams (AED), Saudi Riyals (SAR), Qatari Riyals (QAR), and US Dollars (USD).
*   **Billing Engine Gateway**: Regional payment processors (PayFort, Checkout.com, or regional bank transfers).
*   **Pricing Plans**: Regional plans adjust to Western SaaS indexes (e.g., Starter: $149 USD/Month, Growth: $499 USD/Month, Agency: $1,299 USD/Month, Enterprise: Custom).

### 10.2.3 Phase 3 Global Pricing Structure
*   **Supported Currencies**: US Dollars (USD), Euros (EUR), and British Pounds (GBP).
*   **Billing Engine Gateway**: Stripe / Adyen secure card processors.
*   **Pricing Plans (Monthly / Annualized)**:
    *   **Starter**: **$149 / Month** (Annual: $119 / Month).
    *   **Growth**: **$499 / Month** (Annual: $399 / Month).
    *   **Agency**: **$1,299 / Month** (Annual: $999 / Month).
    *   **Enterprise**: Custom Pricing with custom service level agreements (SLAs).

---

## 10.3 Usage Telemetry & Ceiling Limits Enforcement

To protect platform performance and manage database costs, the system automatically measures, tracks, and limits customer usage.

```
  +-----------------------------------------------------------------------------------+
  |                           Step 1: Metric Logging                                  |
  +-----------------------------------------------------------------------------------+
   - Every scrape or API call logs a resource event (e.g., `execute_prompt_query`)     |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 2: Database Aggregation                           |
  +-----------------------------------------------------------------------------------+
   - Compiles current month totals (e.g., `current_workspace_query_count`)            |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 3: Verification & Ceiling Check                    |
  +-----------------------------------------------------------------------------------+
   - Compares current usage against the active plan limit:                            |
     - IF usage < limit  => Permit execution                                          |
     - IF usage >= limit => block execution and trigger upgrade alerts                |
  +-----------------------------------------------------------------------------------+
```

### 10.3.1 Resource Overages Handling
*   **SaaS Plans (Starter / Growth / Agency)**: When a workspace reaches 90% of its monthly query quota, the system triggers in-app and email notifications. If usage reaches 100%, active cron scraping schedules pause and display a "Quota Limit Reached" status. The user must click to upgrade their plan or buy a custom booster pack of queries to restart campaigns.
*   **Enterprise Plans**: Enterprise plans can be configured with "Overage Billing." The system does not pause tracking schedules; instead, it tracks excess queries and automatically calculates an overage fee on the next monthly billing invoice.

---

## 10.4 Enterprise Contracts & Billing Workflows
*   **Bespoke Payment Terms**: Enterprise contracts support custom billing frequencies (Annual, Semi-Annual, or Quarterly) with 30-day payment cycles (Net 30) processed via standard corporate bank transfers.
*   **Volumetric Usage Upgrades**: Enterprise contracts define specific volumetric scaling fees if the client tracks massive portfolios (e.g., tracking more than 50,000 product SKUs across multiple regional divisions).
*   **Add-on Professional Services**: Support custom setup packages, including corporate team workshops, custom knowledge graph mapping, and dedicated technical support.
*   **Automatic Renewal Terms**: Enterprise contracts renew automatically at the end of their term unless either party provides written notice of non-renewal at least 60 days before the contract end date.
