# Read-Optimized Analytics Specification

This document details the read-optimized aggregators compiling transactional logs into high-throughput dashboard telemetry charts.

---

## 1. Analytics snapshoting

To ensure instant dashboard loading times under high user concurrency, we separate analytical reads from write-heavy observation streams:
- Raw visibility scores are captured inside `visibility_scores` table.
- Read-optimized workers aggregate these records daily into **`analytics_snapshots`** containing overall metrics, citation density, and average sentiment.

---

## 2. Analytics Services

- **VisibilityAnalyticsService**: Compiles chronological timelines for trend graphs, and calculates percentage shifts over time (e.g. +12% growth).
- **CitationAnalyticsService**: Summarizes cited domain occurrences, resolving frequency distributions and average Domain Authority metrics.
- **AIEngineAnalyticsService**: Groups visibility averages per platform, contrasting ChatGPT, Claude, Gemini, and Perplexity performance.
