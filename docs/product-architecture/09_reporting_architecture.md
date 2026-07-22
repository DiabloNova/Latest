# 09. Reporting Architecture
## AI Brand Intelligence & Visibility Platform

This reporting architecture defines our data ingestion layers, processing pipelines, metrics matrices, and presentation systems. It outlines the reporting specifications across four corporate tiers to ensure that stakeholders—from SEO technicians to enterprise C-levels—receive accurate, actionable brand intelligence.

---

## 9.1 Reporting Data Pipeline

The reporting pipeline processes and visualizes data across four layers:

```
+-----------------------------------------------------------------------------------------+
|                                  REPORTING PIPELINE                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Ingestion Layer  ===> Scrapes raw conversational responses across LLMs/RAG.        |
|   2. Processing Layer ===> Parses link citations, calculates sentiment & SoMV indexes.  |
|   3. Query Store      ===> Stores processed records in secure, multi-tenant databases.  |
|   4. Rendering Engine ===> Formats datasets into dashboards or polished, white-label PDFs|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 9.2 Core Metrics Definition

1.  **Share of Model Voice (SoMV) (%)**: The percentage of times the brand is recommended across all tracked prompt simulations within a campaign.
    $$\text{SoMV} = \left( \frac{\text{Total Recommendations}}{\text{Total Prompts Executed}} \right) \times 100$$
2.  **Citation Frequency Index (%)**: The percentage of generated AI answers that contain a direct hyperlink citation back to the brand’s domain.
3.  **Brand Sentiment Index (BSI)**: A normalized score from -100 (Extremely Negative) to +100 (Extremely Positive) evaluating conversational tone and context referencing the brand.
4.  **Entity-Relation Density (ERD)**: The total number of verified, interconnected semantic attributes mapped to the brand entity across search indices and knowledge databases.
5.  **Vector Cosine Similarity Score**: A decimal score from -1.0 to 1.0 representing semantic relevance when client assets are processed against LLM target embeddings.

---

## 9.3 Four Reporting Tiers

### 9.3.1 Dashboard Reports (Interactive / Live telemetry)
*   **Target Audience**: SEO Managers, Content Coordinators, Agency Teams.
*   **Key Metrics Included**: Live Share of Voice (SoMV) trends, immediate sentiment alerts, list of raw recent LLM responses, and live campaign statuses.
*   **Main Data Sources**: Live simulation databases and active scraping task logs.
*   **Export Formats**: In-app UI charts, raw JSON feeds via API, and CSV table logs.

### 9.3.2 Executive Reports (High-Level Brand ROI)
*   **Target Audience**: CMOs, Vice Presidents of Marketing, Board of Directors.
*   **Key Metrics Included**: Executive summaries, monthly Share of Voice (SoMV) market share shifts, competitor benchmark matrices, and estimated traffic ROI values.
*   **Main Data Sources**: Monthly compiled analytic databases and historical competitive trend charts.
*   **Export Formats**: Print-ready, high-resolution PDF and slide presentation files.

### 9.3.3 Technical Reports (On-page & RAG Architecture)
*   **Target Audience**: Technical SEO Specialists, Web Administrators, Developers.
*   **Key Metrics Included**: Schema validation reports, crawl budget usage, RAG cosine similarity scores, concept density audits, and robots.txt/llms.txt check results.
*   **Main Data Sources**: On-page web crawl audits and RAG simulation vector comparisons.
*   **Export Formats**: CSV logs, technical PDF audits, and interactive developer sandboxes.

### 9.3.4 White-Label Agency Reports (Custom Branded Portals)
*   **Target Audience**: Multi-Client Agency Owners, Brand Consulting Groups.
*   **Key Metrics Included**: Custom visibility matrices, task resolution statuses, client-specific goals, and comparative competitive matrices.
*   **Main Data Sources**: Consolidated workspace databases and agency task logs.
*   **Export Formats**: Highly customized PDF reports (incorporating custom agency logos, brand colors, and contact info).

---

## 9.4 Report Generation Workflow

The platform generates reports through an automated, distributed workflow:

```
  +-----------------------------------------------------------------------------------+
  |                           Step 1: Scheduler Trigger                               |
  +-----------------------------------------------------------------------------------+
   - Runs a background cron job (e.g., Weekly on Mondays at 08:00 Tehran time)        |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 2: Data Consolidation                             |
  +-----------------------------------------------------------------------------------+
   - Aggregates historical workspace data (SoMV, BSI, and Citations) for the chosen range|
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 3: Render Engine Execution                         |
  +-----------------------------------------------------------------------------------+
   - Formats the consolidated data using pre-built PDF templates and custom brand assets|
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 4: Secure Asset Storage                            |
  +-----------------------------------------------------------------------------------+
   - Uploads the generated PDF to isolated cloud storage and generates a secure URL   |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 5: Delivery & Logging                              |
  +-----------------------------------------------------------------------------------+
   - Dispatches the PDF to recipient emails and updates the workspace's report history|
  +-----------------------------------------------------------------------------------+
```
This asynchronous workflow guarantees high performance and zero degradation of live dashboard services, even when compiling massive enterprise-level data reports.
