# 09. Filters & Time Ranges
## AI Brand Intelligence & Visibility Platform

This document defines the global filtering and time-range selection system used across the SaaS dashboard, specifying placement rules, parameter options, and saved view behaviors.

---

## 9.1 Global Filter Bar Blueprint

Our analytical dashboards feature a unified, horizontal filtering panel placed directly below the page title:

```
+-----------------------------------------------------------------------------------------+
|                                    GLOBAL FILTER BAR                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   [Brand Dropdown] | [Model Select] | [Country Select] | [Language Select] | [Time]     |
|                                                                                         |
|   * Toggling any filter parameter instantly updates all active metric cards & charts.  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 9.2 Filter Parameters & Options

To provide precise data segmentation, our filter controls include eight key parameters:

1.  **Brand Project Filter**: Switch between monitored brand profiles (e.g., `Brand Alfa Cosmetics`, `Brand Beta Finance`).
2.  **Date & Interval Range Filter**: Toggle common time intervals or define custom date ranges:
    *   *Presets*: Last 24 Hours, Last 7 Days, Last 30 Days (Default), Last 90 Days, Last 12 Months.
3.  **AI Model Filter**: Filter tracking data by specific Large Language Models:
    *   *Options*: All Models, ChatGPT-4o, Claude-3.5-Sonnet, Gemini Pro, Perplexity-Sonar.
4.  **Country & Territory Filter**: Filter visibility by region based on localized proxy simulations:
    *   *Options*: All, Iran, United Arab Emirates, Saudi Arabia, Qatar, Oman.
5.  **Language Filter**: Segment data by conversational query language:
    *   *Options*: All, Persian (`FA`), English (`EN`), Arabic (`AR`).
6.  **Industry Vertical Filter**: Filter visibility by business category (e.g., E-commerce, SaaS, Telecom).
7.  **Competitor Filter**: Toggle competitive targets to compare metrics directly.
8.  **Sentiment Filter**: Filter brand mentions by conversational tone (Positive, Neutral, Negative).

---

## 9.3 Saved Filter Views

*   **Create Saved View**: Users can save frequently used combinations of filters (e.g., "Monthly Persian ChatGPT Tracking" which saves *Time Range: Last 30 Days*, *Language: Persian*, *Model: ChatGPT*).
*   **Saved Views Dropdown**: Saved views are pinned to a quick-access dropdown in the filter bar, allowing analysts to switch campaign perspectives instantly.
*   **Shareable Filters**: Saving a filter view generates a unique URL containing the filter parameters as query variables, making it easy to share specific campaign reports with teammates.
