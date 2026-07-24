# Citation Intelligence Engine Design

This specification details how references and hyperlinks provided by AI models are extracted, checked, rated, and compiled into citation networks.

---

## 1. Domain Authority Heuristics

To score source credibility without expensive real-time API dependency, the **`SourceAuthorityScorer`** evaluates domain suffixes and premium press domains:

- **Premium Press (Score 90-95)**: NYTimes, Bloomberg, Reuters, Forbes.
- **Academic & Govt (Score 95-98)**: `.gov`, `.edu` resources.
- **Reference Baselines (Score 96)**: Wikipedia, GitHub, StackOverflow.
- **Standard Suffixes (Score 55-75)**: `.org` (75), `.net` (60), `.io` (65).

---

## 2. Citation Linkage Networks

We compile a **Citation Graph** consisting of:
- **Nodes**: Brands, AI Observations, and Source Domains.
- **Edges**: Mapped references pointing from domains to AI responses, and from responses to brands.
This allows the platform to calculate a brand's **Citation Density** and **Reference Authority Share** dynamically, identifying competitive linking opportunities.
