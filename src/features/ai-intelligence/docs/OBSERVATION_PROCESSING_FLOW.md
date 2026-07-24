# Observation Processing Pipeline

This specification covers our multi-stage pipeline coordinating AI response scrubbing, entity mapping, citation graphing, and recommendation alerts.

---

## 1. 7-Stage Execution Workflow

```
 [Raw Response Text] ──► Ingestion Invariant Check
                             │
 ┌───────────────────────────┴───────────────────────────┐
 │ Stage 1: Core Observation Persistence (Save Raw Log)  │
 ├───────────────────────────────────────────────────────┤
 │ Stage 2: Entity Resolution (Link Wikidata profiles)   │
 ├───────────────────────────────────────────────────────┤
 │ Stage 3: Mention Extraction (Context coordinates)     │
 ├───────────────────────────────────────────────────────┤
 │ Stage 4: Citation Discovery (Fetch & evaluate links)   │
 ├───────────────────────────────────────────────────────┤
 │ Stage 5: Sentiment Analysis (Determine positive/neg)  │
 ├───────────────────────────────────────────────────────┤
 │ Stage 6: Visibility Index Calculation (Weighted AEO)  │
 ├───────────────────────────────────────────────────────┤
 │ Stage 7: Recommendations Generation (Auto Alerts)     │
 └───────────────────────────┬───────────────────────────┘
                             ▼
              [ObservationCapturedEvent]
```

---

## 2. Event-Driven Propagation

At each stage, the pipeline publishes explicit, typed Domain Events to our standard `eventBus` (e.g., `AIObservationCapturedEvent`, `EntityResolvedEvent`, `CitationDiscoveredEvent`, `VisibilityScoreCalculatedEvent`, `RecommendationGeneratedEvent`), enabling eventual consistency across competitive indexing models.
