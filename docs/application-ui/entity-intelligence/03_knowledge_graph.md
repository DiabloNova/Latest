# 03. Knowledge Graph Explorer
## AI Brand Intelligence & Visibility Platform

This document defines the Knowledge Graph Explorer—the interactive canvas interface where users visualize and navigate complex entity relationships, semantic networks, and clusters.

---

## 3.1 Graph Explorer Layout Blueprint

The Explorer screen is structured around a full-viewport interactive canvas panel:

```
+-----------------------------------------------------------------------------------------+
|                                  KNOWLEDGE GRAPH SCREEN                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Header: Breadcrumbs | Filter (By node type) | View Mode Select (Graph / List)   |   |
|   +---------------------------------------------------------------------------------+   |
|   | Left Control Panel (180px) | Main Interactive Graph Canvas                      |   |
|   | - Zoom In / Out buttons    |  - Interactive Nodes & Edges                       |   |
|   | - Center Focus button      |  - Relationship strength indicator colors          |   |
|   | - Search Node Input        |  - Group cluster outlines                          |   |
|   +----------------------------+----------------------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 3.2 Visual Graph Components Specification

### 3.2.1 Nodes (Entities)
*   **Visual Style**: Nodes are styled as circular vector badges containing clear text labels.
*   **Color Coding**: Nodes are color-coded by entity type using our design system's subtle background tints (e.g., Brand entities displayed in azure blue, Person entities in soft teal, Product entities in standard slate gray).
*   **Sizing**: Node sizes scale proportionally based on their Authority score (larger circles represent higher authority).

### 3.2.2 Edges (Relationships)
*   **Visual Style**: Edges are styled as thin, directed vector line arrows pointing from Subject to Object nodes.
*   **Labeling**: Edges display text labels indicating the predicate relation (e.g., `manufactures`, `foundedBy`, `competesWith`).
*   **Relationship Strength**: Line thickness and opacity represent relationship strength and citation frequency (thick, solid lines represent strong, frequent citations; thin, dashed lines represent weak, infrequent references).

### 3.2.3 Cluster Outlines (Semantic Neighborhoods)
*   **Visual Style**: Groups of closely connected nodes (e.g., a brand entity grouped with its products and founders) are enclosed inside soft, semi-transparent background bubble shapes, helping users identify semantic clusters at a glance.

---

## 3.3 Canvas Control & Interaction Design
*   **Zoom and Pan Controls**: Left control panel provides precise zoom, drag-and-pan, and "Fit to Screen" center focus buttons.
*   **Expand / Collapse Node**: Double-clicking a node expands and displays its hidden first-degree connections, or collapses them to keep the layout clean.
*   **Focus Inspection**: Clicking a node selects it, highlighting its connections in azure blue while fading unselected background layers. The selected node's detailed attributes load instantly into a slide-out modal panel for direct review.
