# 06. Relationship Mapping Module
## AI Brand Intelligence & Visibility Platform

This document defines the Relationship Mapping module, detailing how our interfaces track, organize, and edit connections between brands, products, people, and topics.

---

## 6.1 Entity Connection Schema Specs

Connections are categorized across eight distinct entity relationship pathways:

```
+-----------------------------------------------------------------------------------------+
|                                  RELATIONSHIP PATHWAYS                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Brand =====> [manufactures] ====> Product (SKU, brand items list)                  |
|   2. Brand =====> [foundedBy]    ====> Person (Founders, executives, key leaders)        |
|   3. Brand =====> [ownedBy]      ====> Organization (Parent holding companies)           |
|   4. Brand =====> [competesWith] ====> Competitor (Primary industry rivals)             |
|   5. Product ===> [optimizedFor] ====> Topic (Target market search categories)           |
|   6. Brand =====> [locatedIn]    ====> Location (Corporate headquarters, offices)        |
|   7. Brand =====> [sponsors]     ====> Event (Public industry summits, webinars)         |
|   8. Brand =====> [uses]         ====> Technology (Corporate software, systems)          |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 6.2 Visual Mapping Panel

The relationship mapping panel uses an organized split-column layout:

```
+-----------------------------------------------------------------------------------------+
|                                 RELATIONSHIP MAPPING SCREEN                             |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   - Left Table Column: Lists active entity relationships (Subject, Predicate, Object).  |
|   - Middle Section: Standard "Entity Relation Editor" form panel to edit connections.  |
|   - Right Section: Live preview graph illustrating modifications in real-time.          |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 6.2.1 Interactive Relationship Editor (Middle Panel)
*   **Subject Dropdown**: Selects the starting entity node (e.g., `Alfa Cosmetics`).
*   **Predicate Dropdown**: Selects the relationship type (e.g., `foundedBy`).
*   **Object Dropdown**: Selects the target entity node (e.g., `Dr. Reza Alavi`).
*   **Action Row**: Click "Save Relationship" to update our local knowledge database, which instantly redraws the right preview graph with smooth CSS transitions.
