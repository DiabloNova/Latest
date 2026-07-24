# Recommendation Engine Design

This document details the diagnostic evaluation system that generates targeted optimization suggestions when search visibility declines.

---

## 1. Actionable Diagnostics

The **`RecommendationEngine`** evaluates brand intelligence profiles to spot visibility gaps and content weaknesses:

1. **Unclaimed Entities**: Spots mentions of brand terms missing direct Wikidata knowledge properties, suggestingclaims to anchor model references.
2. **Missing Citations**: Analyzes high-relevance queries lacking references, proposing backlinks to key high Domain Authority publishers.
3. **Competitive Gaps**: Evaluates competitor score metrics, suggesting spec improvements to counteract competitive advantages.

---

## 2. Priority & Impact Estimations

- **Priority Level**: Computed dynamically by evaluating target score gaps. Gaps $\ge$ 25 points trigger `high` priority tasks.
- **Estimated Score Lift**: Establishes potential visibility increase:
  - **Citation Authority**: +15 overall score lift index.
  - **Entity Linking**: +10 overall score lift index.
  - **Competitive Countering**: +8 overall score lift index.
