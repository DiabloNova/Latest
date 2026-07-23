# 01. Entity Overview Module
## AI Brand Intelligence & Visibility Platform

This document defines the Entity Overview—the primary analytical interface where users monitor and audit their brand's semantic footprint, knowledge graph integrity, and citation authority.

---

## 1.1 Entity Overview Layout Blueprint

The overview is structured as an interactive, data-dense metrics panel:

```
+-----------------------------------------------------------------------------------------+
|                                  ENTITY OVERVIEW LAYOUT                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Header: Breadcrumbs | Target Entity Select | Export Knowledge Schema             |   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone A: Entity Summary & Core Meta (Split 1/3 and 2/3)                          |   |
|   | - Left: Entity Summary, Type, and Verified Knowledge Database Links (Wikidata)  |   |
|   | - Right: 4 Primary KPI Cards (Confidence, Authority, Coverage, Citation Count)  |   |
|   +---------------------------------------------------------------------------------+   |
|   | Zone B: Semantic Network & Relations (Split 2/3 and 1/3)                        |   |
|   | - Left: Interactive Knowledge Graph Preview Box (Zoom, Expand, Collapse)        |   |
|   | - Right: Knowledge Graph Completeness checklist & properties list               |   |
|   +---------------------------------------------------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 1.2 Information Hierarchy & Content Specifications

### 1.2.1 Zone A: Entity Metadata & KPI Scorecard
*   **Left Column (Metadata Card)**:
    *   *Entity Name*: "Alfa Cosmetics" (bold, 24px).
    *   *Entity Type*: `Organization` (inline gray badge).
    *   *Verified Mappings*: Wikidata (`Q123456`), Wikipedia (Primary redirect link).
*   **Right Column (4 KPI Cards)**:
    1.  **Confidence Score Card**:
        *   *Value*: Score from 0 to 100 representing entity recognition confidence (e.g., "94%").
    2.  **Authority Rating Card**:
        *   *Value*: Overall entity authority index (e.g., "82 / 100").
    3.  **AI Coverage Card**:
        *   *Value*: Percentage of active tracking campaigns containing verified entity references (e.g., "75.4%").
    4.  **Citation Count Card**:
        *   *Value*: Total number of raw external citations referencing the entity (e.g., "1,420").

### 1.2.2 Zone B: Knowledge Graph Preview & Completeness Checklist
*   **Knowledge Graph Preview Box (Left)**:
    *   *Aesthetics*: Interactive canvas displaying nodes (representing brands, people, and products) and directed connecting arrows.
    *   *Interaction*: Zoom, expand, and drag-and-collapse controls. Click redirects to `/dashboard/entity-graph` for a full-screen view.
*   **Completeness Checklist (Right)**:
    *   *Purpose*: Tracks the completeness of our brand entity attributes compared to optimal schemas.
    *   *Properties list*:
        *   `Company Name`: Verified (green check).
        *   `Primary Domain`: Verified (green check).
        *   `Founders`: Verified (green check).
        *   `Headquarters Address`: Missing (red exclamation).
        *   `Product SKUs`: Partial (amber warning).
