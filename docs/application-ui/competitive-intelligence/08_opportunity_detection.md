# 08. Opportunity Detection Module
## AI Brand Intelligence & Visibility Platform

This document defines our AI-powered Opportunity Detection dashboard module—the interface where users explore competitive gaps, weak competitors, low-competition keywords, and high-value citation opportunities.

---

## 8.1 Opportunity Categories

To help users prioritize their work, opportunities are grouped into four categories:

```
+-----------------------------------------------------------------------------------------+
|                                    OPPORTUNITIES GRID                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Weak Competitors  ===> Competitors with high visibility but low authority scores.  |
|   2. Underserved Topics===> High-intent search categories with low competitive presence.  |
|   3. Citation Gaps     ===> Suggests high-authority domain sources for outreach.        |
|   4. Schema Opps       ===> Structural additions to landing pages to capture references.  |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 8.2 Visual Card Anatomy & Parameters

Each opportunity is displayed as an interactive card displaying critical attributes:

```
+-----------------------------------------------------------------------------------------+
|                                     OPPORTUNITY CARD                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   [Category Icon]  H2 Opportunity Title (e.g., "Capture Skincare Citation Gaps")       |
|                                                                                         |
|   Metrics Metrics Banner:                                                               |
|   - Priority Level: [High / Medium / Low]                                               |
|   - Business Impact: [High / Medium / Low]                                              |
|   - Difficulty: [Easy / Medium / Hard]                                                  |
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

### 8.2.1 Detailed Opportunity Card Interactions
*   **Copy Code**: Copies the generated JSON-LD schema file directly to the user's clipboard.
*   **Mark as Resolved**: Confirms the changes have been implemented, triggering an immediate background validation audit to verify the fix.
*   **Decline**: Dismisses the opportunity and removes it from the active dashboard list.
*   **Assign Task**: Opens our team collaboration menu to assign the optimization task directly to an SEO Specialist or Content Manager.
