# 05. Global Search Strategy
## AI Brand Intelligence & Visibility Platform

This global search strategy defines the UX behaviors, categories scope, and indexing rules for our universal command search and command palette systems.

---

## 5.1 Universal Search Architecture

The search system processes and indexes data across six functional categories:

```
+-----------------------------------------------------------------------------------------+
|                                    SEARCH SCOPE MAP                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Brand Projects ===> Quick access to target domains and SKUs.                      |
|   2. Telemetry Logs ===> Real-time brand mentions, raw AI responses, and citations.     |
|   3. System Pages   ===> Direct navigation links (e.g., Jump to Billing, Settings).     |
|   4. Commands       ===> Execute actions instantly (e.g., Run Audit, Invite Member).    |
|   5. Documentation  ===> Search integrated developer API docs and bilingual glossaries. |
|   6. Recent History ===> Quick access to recently visited pages and prompt runs.        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Command Palette Interaction Design

The command search modal acts as a centralized command console, helping users navigate the platform and execute actions quickly:

```
+-----------------------------------------------------------------------------------------+
|                                 COMMAND PALETTE FLOW                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Press Cmd+K      ===> Opens a centered search overlay modal with backdrop filter.   |
|   2. Input Query Text ===> Instant inline filtering categorized by result type.          |
|   3. Keyboard Nav     ===> Navigate results using arrow keys, select with Enter key.     |
|   4. Execution/Jump   ===> Run chosen command or jump directly to the target page.       |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 5.2.1 Search Result Categories
To keep search results organized, the command palette groups filtered items under clear headings:
*   **Navigate**: Jump directly to sections (e.g., `Jump to Citation Tracking`, `Go to Team Settings`).
*   **Actions & Commands**: Run administrative tasks directly (e.g., `/run-audit`, `/invite-user`, `/create-workspace`).
*   **Active Brand Projects**: Switch to monitored brand assets (e.g., `Brand Alfa Cosmetics`, `Brand Beta Finance`).
*   **Recent Transcripts & Mentions**: Quick access to recent scraped observations containing matched brand terms.

### 5.2.2 Search Optimization & Usability
*   **Multilingual Normalization**: Search query indexing must normalize character encodings (e.g., standardizing Persian zero-width non-joiners) to guarantee matching accuracy across English, Persian, and Arabic search contexts.
*   **Highlighting Matches**: Dynamically highlights matched search characters in bold inside result list titles (e.g., searching "Alfa" highlights "**Alfa** Cosmetics").
*   **Fuzzy Search Sorting**: Uses a fuzzy string matching algorithm (such as Levenshtein distance) to ensure relevant results are prioritized even with minor user typos.
*   **Shortcuts Integration**: Displays relevant keyboard shortcuts next to search suggestions (e.g., showing `G + O` next to the "Overview" navigation item) to help users learn shortcuts and speed up their workflows over time.
