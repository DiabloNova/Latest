# 08. Entity Timeline Module
## AI Brand Intelligence & Visibility Platform

This document defines the Entity Timeline module—the historical timeline interface where users track entity creation, growth, relationship changes, authority shifts, and citation evolution over time.

---

## 8.1 Timeline Event Classifications

The timeline registers and tracks five key system and semantic events:

```
+-----------------------------------------------------------------------------------------+
|                                    TIMELINE EVENTS                                      |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Entity Creation   ===> Initial entity registration & verification timestamps.      |
|   2. Relationship Shift===> Addition or modification of semantic triplets (ownedBy).    |
|   3. Authority Update  ===> Documented shifts in entity authority index scores.          |
|   4. Citation Evolution===> Discovery log of new, high-authority citation references.    |
|   5. Knowledge Sync    ===> Scheduled database synchronizations with Wikidata.           |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 8.2 Visual Timeline Interface

The Entity Timeline uses a structured, chronological vertical axis layout:

```
+-----------------------------------------------------------------------------------------+
|                                   ENTITY TIMELINE SCREEN                                |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Time-Series Metric Chart: Displays historical authority and citation trend lines.    |
|   - Vertical Timeline Axis List: Chronological cards display specific historical events.|
|   - Inline Action Buttons: Filter timeline by event types or date intervals.           |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 8.2.1 Time-Series Trend Line Chart
*   **Purpose**: Track and visualize the correlation between historical entity authority scores and weekly citation volumes.
*   **Aesthetics**: High-contrast, clean multi-line display with hover-inspect tooltips.

### 8.2.2 Chronological Event Cards
Each timeline event card displays clear visual indicators and descriptions:
*   **Event Metadata**: Displays the event type (e.g., `Relationship Modified`), a timestamp (using the user's localized calendar setting), and the author's name.
*   **Detail Block**: Displays the exact changes made (e.g., displaying `Added Relationship: Alfa Cosmetics (Subject) -> foundedBy (Predicate) -> Dr. Reza Alavi (Object)` with a clear visual diff layout).
*   **Action Link**: Click "Inspect Event Details" to open a right-aligned sliding modal drawer for full transactional parameters.
