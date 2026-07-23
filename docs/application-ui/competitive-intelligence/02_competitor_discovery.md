# 02. Competitor Discovery Module
## AI Brand Intelligence & Visibility Platform

This document defines our Competitor Discovery interface, where users explore automatically discovered competitors, add manual targets, and analyze competitor profiles.

---

## 2.1 Competitor Discovery Screen Blueprint

The Discovery screen uses a split column layout to combine searchable list directories with a detailed competitor profile panel:

```
+-----------------------------------------------------------------------------------------+
|                                 COMPETITOR DISCOVERY SCREEN                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Search Bar: Global input field (Fuzzy exact matches) | Save Filter View          |   |
|   | Filter Row: Categories Select | Cluster Select | Sort Dropdown                 |   |
|   +---------------------------------------------------------------------------------+   |
|   | Left List Directory (Column Span 1/3)     | Right Detail Panel (Column Span 2/3)    |   |
|   | - Filtered Competitor Cards List          |  - Selected Competitor Header Card      |   |
|   | - Auto-discovered badges                  |  - SWOT Comparison Grid                 |   |
|   | - Bottom pagination controls              |  - Visibility & Metric Charts           |   |
|   +-------------------------------------------+-----------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 2.2 Discovery Modes & List Specifications

### 2.2.1 Discovery Modes (Auto-discovered vs. Manual)
To provide a complete view of the market, the platform offers two methods to add and track competitors:
1.  **Automatic Discovery**: Our background crawler analyzes generated AI response transcripts, identifying other brands mentioned alongside the client. The system adds these brands to our database, displaying them with a "Discovered" status badge on the dashboard.
2.  **Manual Addition**: Users can click the "+ Add Competitor" button to manually add specific competitor domains and product targets to track.

### 2.2.2 Left Content Area: Filtered Competitor Card List
*   **Cards List**: Displays filtered competitor result cards. Each card displays a title, a domain path, and a visibility badge (e.g., `Beta Cosmetics (betacosmetics.ir) | 30.1% SoMV`).
*   **Hover States**: Cards highlight on mouse hover, and clicking a card loads its properties into the right detail panel.

### 2.2.3 Right Content Area: Competitor Profile Panel
When a competitor card is clicked, the right panel displays their detailed market profile:
*   **Competitor Header Card**: Displays the competitor's name, primary website domain, and overall authority score.
*   **SWOT Comparison Grid**: Displays a clean comparison matrix displaying the competitor's strengths (e.g., "High-quality citations on Perplexity") and weaknesses (e.g., "Empty Wikidata property fields") compared to the client.
*   **Visibility & Metric Charts**: Displays line and radar charts comparing the competitor's visibility and sentiment scores directly with the client's metrics over time.
*   **Primary Action**: "Deactivate/Activate Tracking" button (allows users to toggle tracking for specific competitors to manage quota limits).
