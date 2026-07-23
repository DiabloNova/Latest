# 05. Source Authority Module
## AI Brand Intelligence & Visibility Platform

This document defines the UI and metrics presentation specifications for our Source Authority module, where users analyze the quality, reliability, freshness, and AI-usage rates of external citation sources.

---

## 5.1 Five Core Source Metrics

The platform evaluates the quality of citation source domains across five key parameters:

```
+-----------------------------------------------------------------------------------------+
|                                    SOURCE METRICS                                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Domain Authority ===> Standard index evaluating domain strength and backlinks.     |
|   2. Freshness Index  ===> Content publication date relative to model crawlers.         |
|   3. Reliability      ===> Factual citation accuracy, verified by low hallucination.   |
|   4. Popularity       ===> Standard traffic volume and social media footprint metrics.  |
|   5. AI Usage Rate    ===> Frequency of domain citations across target model responses. |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Visual Interface Specifications

The Source Authority panel uses structured cards and detailed tables to compare source quality:

```
+-----------------------------------------------------------------------------------------+
|                                  SOURCE AUTHORITY SCREEN                                |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - KPI Metrics Row: Displays top-performing sources, averages, and alert flags.        |
|   - Master Source Table: Detailed, sortable list comparing source domain parameters.    |
|   - Trust Indicator Badges: Inline, color-coded badges evaluating factual reliability.  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 5.2.1 Primary Metric Cards Row
*   *Card 1*: **Top Trusted Source** (e.g., displaying `Tehran Times (Authority: 85)`).
*   *Card 2*: **Average Source Authority** (overall portfolio rating; e.g., `72 / 100`).
*   *Card 3*: **New Citation Alerts** (highlights newly indexed citation domains).

### 5.2.2 Master Source Table
*   **Database Columns**:
    *   *Domain Name*: Display URL and logo preview icon (e.g., `tehrantimes.com`).
    *   *Domain Authority*: Numeric rating value (0 to 100).
    *   *AI Usage Rate*: Percentage representing citation frequency across model campaigns.
    *   *Reliability Grade*: Letter grade based on historical accuracy checks (e.g., `A+`, `B-`).
*   **A11y & Interactions**: Table rows support clean hover highlights, Pagination controls are provided at the bottom, and clicking a row slides out details on referenced citations.
