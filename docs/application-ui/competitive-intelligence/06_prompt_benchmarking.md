# 06. Prompt Benchmarking Module
## AI Brand Intelligence & Visibility Platform

This document defines the Prompt Benchmarking module, specifying how we compare client and competitor performance across specific prompt campaigns, citation qualities, and response consistencies.

---

## 6.1 Benchmarking Parameters

Our system compares brand and competitor performance across six core parameters:

```
+-----------------------------------------------------------------------------------------+
|                                  BENCHMARKING PARAMS                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Prompts             ===> Specific tracked search queries and conversational scenarios|
|   2. Responses           ===> Raw generated text answers collected from model APIs.     |
|   3. Citation Quality    ===> Extracted hyperlink citation sources & domain authority.  |
|   4. Response Consistency===> Agreement rate of generated outputs over multiple runs.   |
|   5. Topic Coverage      ===> The percentage of tracked topics where brand is mentioned. |
|   6. Entity Mentions     ===> The frequency of parsed brand entity references.          |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 6.2 Visual Interface Specifications

The Prompt Benchmarking panel uses an organized split-column layout to compare competitor data:

```
+-----------------------------------------------------------------------------------------+
|                                 PROMPT BENCHMARKING SCREEN                              |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Left Table Column: Lists active tracking prompts and their update statuses.        |
|   - Middle Section: Detailed split panel comparing raw responses and citation paths.   |
|   - Right Section: Core metrics cards displaying overall scores and recommendations.    |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 6.2.1 Left Content Area: Tracking Prompts List
*   **Active Prompts Table**: Displays all tracked search queries and campaign parameters. Clicking a row loads its properties into the middle panel.

### 6.2.2 Middle Content Area: Comparative Response Panel
When a prompt is clicked, the middle panel displays a split-view comparing raw generated answers:
*   **Client Response Box**: Displays the text returned by the model for the client's brand. Extracted mentions and citations are highlighted in azure blue.
*   **Competitor Response Box**: Displays the text returned by the model for the selected competitor. Mentions and citations are highlighted in slate gray.

### 6.2.3 Right Content Area: Benchmarking Metrics Panel
*   **Metrics Cards**: Displays overall citation quality, response consistency, and topic coverage scores for the selected campaign.
*   **Primary Action**: "Deactivate/Activate Tracking" button (allows users to toggle tracking for specific campaigns).
*   **Secondary Action**: "Get Optimization Recommendations" link (redirects to our Recommendation Center to help users implement improvements).
