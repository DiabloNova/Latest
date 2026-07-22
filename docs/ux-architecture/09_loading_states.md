# 09. Loading States & Performance Strategy
## AI Brand Intelligence & Visibility Platform

This document defines our loading states and performance strategy, mapping out progressive loading rules, skeleton screens, and perceived performance techniques to ensure the platform feels fast and responsive, even when running complex, long-running AI simulations.

---

## 9.1 Multi-Tier Loading Architecture

We structure our loading strategies into four tactical categories:

```
+-----------------------------------------------------------------------------------------+
|                                    LOADING STATES                                       |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Instant Load (<100ms)  ===> No visible loaders. Transitions occur instantly.       |
|   2. Standard Load (<1.5s)  ===> Uses elegant CSS skeletons matching specific components.|
|   3. Dynamic Load (<15s)    ===> Renders real-time progress bars with inline task logs. |
|   4. Lazy Loading (Deferred)===> Load heavy analytical charts after primary tables render.|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 9.2 Perceived Performance Techniques

### 9.2.1 Skeleton Screen Guidelines
*   **Design Rule**: When a dashboard route loads, we render neutral, static, animated gray outline blocks that match the exact shape and size of the incoming components (e.g., metric cards, tables, chart boxes).
*   **Animation**: A gentle pulse animation (opacity changing from 0.4 to 0.8 at 1.5-second intervals) prevents the screen from feeling frozen while data fetches.

### 9.2.2 Progressive Data Loading (Lazy Loading)
*   **Implementation**: To speed up page load times, we load lightweight structural elements (such as tables and metrics) first. Heavy, resource-intensive elements (such as long-term competitive radar charts or deep Wikidata maps) are loaded asynchronously after primary assets render.

### 9.2.3 Optimistic UI Updates
*   **Design Rule**: For simple, quick user operations (e.g., deactivating a prompt tracking schedule, editing a project name, or assigning a task), the dashboard updates UI states immediately before receiving server confirmation.
*   **Recovery Flow**: If the server request fails, the system rolls back the UI state and displays a gentle error notification banner, preserving high perceived performance during standard workflows.

### 9.2.4 Real-Time Progression Logs
*   **Implementation**: For long-running operations (such as running a full AI visibility scan, which requires multiple parallel API requests to Claude, Perplexity, and OpenAI), we display an interactive progress bar.
*   **Feedback Loops**: Displays real-time task logs (e.g., "Connected with ChatGPT API...", "Analyzing sentiment...", "Citation links verified...") to keep users informed and engaged during processing times.
