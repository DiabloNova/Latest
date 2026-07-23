# 06. Recommendation Center
## AI Brand Intelligence & Visibility Platform

This document defines our AI-powered Recommendation Center—the dashboard section where users receive, evaluate, and implement actionable optimization recommendations to improve their brand visibility.

---

## 6.1 Recommendation Grid Categories

To help users prioritize their work, optimization recommendations are grouped into four categories:

```
+-----------------------------------------------------------------------------------------+
|                                  RECOMMENDATIONS GRID                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Critical Issues ===> High-priority errors, brand hallucinations, negative sentiment.|
|   2. Quick Wins      ===> Low effort, high impact tasks (e.g., Q&A schema additions).    |
|   3. Medium-Term     ===> Moderate effort, steady impact tasks (e.g., blog updates).    |
|   4. Strategic       ===> Long-term structural adjustments (e.g., Wikidata mappings).   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 6.2 Visual Card Anatomy & Parameters

Each recommendation is displayed as an interactive card displaying critical attributes:

```
+-----------------------------------------------------------------------------------------+
|                                   RECOMMENDATION CARD                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   [Category Icon]  H2 Recommendation Title (e.g., "Add Schema to Landing Pages")        |
|                                                                                         |
|   Metrics Metrics Banner:                                                               |
|   - Priority Level: [Critical / High / Medium / Low]                                    |
|   - Business Impact: [High / Medium / Low]                                              |
|   - Difficulty: [Easy / Medium / Hard]                                                  |
|   - Estimated Effort: [1-2 Hours / 1-2 Days / 1-2 Weeks]                                |
|   - Expected Visibility Improvement: [+5.5% SoMV]                                       |
|                                                                                         |
|   Description Block: Brief reason for change, and actionable next steps.               |
|                                                                                         |
|   Code Snippet Box: Displays raw JSON-LD schema file updates (with "Copy Code" action).  |
|                                                                                         |
|   Action Row: [Copy Code] | [Mark as Resolved] | [Decline] | [Assign Task]              |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 6.2.1 Detailed Recommendation Card Interactions
*   **Copy Code**: Copies the generated JSON-LD schema file directly to the user's clipboard.
*   **Mark as Resolved**: Confirms the changes have been implemented, triggering an immediate background validation audit to verify the fix.
*   **Decline**: Dismisses the recommendation and removes it from the active dashboard list.
*   **Assign Task**: Opens our team collaboration menu to assign the optimization task directly to an SEO Specialist or Content Manager.
