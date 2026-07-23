# 02. Entity Explorer Module
## AI Brand Intelligence & Visibility Platform

This document defines the UI, interaction models, and layouts for the Entity Explorer—the primary search and directory interface where users explore entities and trace their semantic hierarchies.

---

## 2.1 Entity Explorer Screen Blueprint

The Explorer screen uses a split column layout to combine searchable list directories with a detailed properties panel:

```
+-----------------------------------------------------------------------------------------+
|                                  ENTITY EXPLORER SCREEN                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   +---------------------------------------------------------------------------------+   |
|   | Search Bar: Global input field (Fuzzy exact matches) | Save Filter View          |   |
|   | Filter Row: Categories Select | Entity Type Select | Sort Dropdown              |   |
|   +---------------------------------------------------------------------------------+   |
|   | Left List Directory (Column Span 1/3)     | Right Detail Panel (Column Span 2/3)    |   |
|   | - Filtered Entity Cards List              |  - Selected Entity Header Card          |   |
|   | - Inline metadata tags                    |  - Interactive Relationship Tree        |   |
|   | - Bottom pagination controls              |  - Properties Table list                |   |
|   +-------------------------------------------+-----------------------------------------+   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 2.2 Interactive Filter & List Panel Specifications

### 2.2.1 Search & Filter Actions
*   **Command Search Input**: Full-text fuzzy search field allowing users to input terms (e.g., "skincare", "Alavi"). Highlights matching text strings in bold inside result list titles.
*   **Categories Select Dropdown**: Filters results by business domain (e.g., Brands, Products, People, Locations).
*   **Entity Type Select Dropdown**: Filters results by structural entity type (e.g., Parent Organization, Subsidiary, Executive).
*   **Sort Dropdown**: Sorts results alphabetically or by key metrics (Authority, Confidence, Citation Count).

### 2.2.2 Left Content Area: Filtered Entity Card List
*   **Cards List**: Displays filtered entity result cards. Each card displays a title, an entity type tag, and a confidence badge (e.g., `Alfa Cosmetics (Organization) | 94% Confidence`).
*   **Hover States**: Cards highlight on mouse hover, and clicking a card loads its properties into the right detail panel.

### 2.2.3 Right Content Area: Detailed Properties Panel
When an entity card is clicked, the right panel displays its full, parsed semantic parameters:
*   **Entity Header Card**: Displays the full entity name, verified Wikidata mapping link, and overall authority score.
*   **Interactive Relationship Tree**: Displays a clean, visual representation of the selected entity's closest connections (e.g., showing `Alfa Cosmetics` connected to product node `Skin Serum` via a `manufactures` link).
*   **Properties Table List**: A structured, high-density table displaying all parsed properties and metadata attributes associated with the selected entity.
