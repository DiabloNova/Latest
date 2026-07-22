# 08. Knowledge Graph Architecture
## AI Brand Intelligence & Visibility Platform

This knowledge graph architecture defines how we map, store, and manage brand entities, competitors, people, and topics. It explains how these semantic relationships evolve over time, bridging the gap between flat databases and generative AI model indexes.

---

## 8.1 Semantic Triplet & Graph Model

Our platform organizes entity relations as a graph of semantic triples `[Subject] -- (Predicate) --> [Object]`:

```
               [Alfa Cosmetics] (Brand Entity)
                      |
         +------------+------------+
         |                         |
   (manufactures)               (foundedBy)
         |                         |
         v                         v
   [Skin Serum] (Product)    [Dr. Reza Alavi] (Person Entity)
         |
    (optimizedFor)
         |
         v
   [Skincare Iran] (Topic Entity)
```

---

## 8.2 Graph Node Types

### 8.2.1 Node Type: `Brand Entity`
*   **Description**: The target brand under tracking (e.g., "Alfa Cosmetics").
*   **Semantic Fields**: `brand_name`, `target_domain`, `wikidata_id`, `wikipedia_url`.

### 8.2.2 Node Type: `Organization Entity`
*   **Description**: Parent corporations, partners, or corporate conglomerates (e.g., "Alavi Retail Group").
*   **Semantic Fields**: `org_name`, `subsidiary_list`, `industry_type`.

### 8.2.3 Node Type: `Product / SKU Entity`
*   **Description**: Individual consumer products, services, or SKUs sold by the brand (e.g., "Skin Serum").
*   **Semantic Fields**: `product_name`, `sku_code`, `price_point`, `gln_code`.

### 8.2.4 Node Type: `Person Entity`
*   **Description**: Key executives, founders, brand ambassadors, or public leaders (e.g., "Dr. Reza Alavi").
*   **Semantic Fields**: `person_name`, `job_title`, `wikidata_link`.

### 8.2.5 Node Type: `Topic / Category Entity`
*   **Description**: Industry classifications, search categories, or user interests (e.g., "Skincare Iran").
*   **Semantic Fields**: `topic_name`, `related_keywords`.

### 8.2.6 Node Type: `Competitor Entity`
*   **Description**: Competitive companies and domains monitored alongside the brand (e.g., "Beta Cosmetics").
*   **Semantic Fields**: `competitor_name`, `target_domain`.

### 8.2.7 Node Type: `Citation Source Entity`
*   **Description**: External news sites, blogs, directories, or platforms cited by AI models (e.g., "Tehran Times").
*   **Semantic Fields**: `domain_name`, `authority_score`.

---

## 8.3 Entity Relationship Triples Schema

Relations between entities are stored as structural triples:

| Subject (Entity A) | Predicate (Relation) | Object (Entity B) | Inverse Predicate |
| :--- | :---: | :--- | :--- |
| `Brand Entity` | **ownedBy** | `Organization Entity` | **owns** |
| `Brand Entity` | **manufactures** | `Product Entity` | **manufacturedBy** |
| `Brand Entity` | **foundedBy** | `Person Entity` | **founded** |
| `Brand Entity` | **competesWith** | `Competitor Entity` | **competesWith** |
| `Product Entity` | **optimizedFor** | `Topic Entity` | **appliesTo** |
| `Brand Entity` | **citedIn** | `Citation Source` | **cites** |

---

## 8.4 Entity Evolution & Temporal Graph Tracking
Brands, products, and associations are not static; they evolve over time. To ensure historical accuracy and support retrospective analysis, our database tracks graph modifications using temporal versioning:

```
+-----------------------------------------------------------------------------------------+
|                                    TEMPORAL TRACKING                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Event Log Storage (Audit Graph)                                                   |
|      - Every triple is written with `valid_from` and `valid_to` timestamps.             |
|                                                                                         |
|   2. Retrospective State Rendering                                                      |
|      - To analyze brand relations in 2023, the query filters active triples where:      |
|        `valid_from <= '2023-12-31' AND valid_to > '2023-12-31'`.                        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

### 8.4.1 Conflict Resolution & Authority Merging
When conflict arises (e.g., Wikidata claims a product is owned by Parent A, while on-page schemas claim it belongs to Parent B), our system resolves entity attributes using structured authority weights:
1.  **Level 1 Authority (Verified Client Input)**: User-provided configurations carry absolute weight (Score: 100).
2.  **Level 2 Authority (Verified Wikidata & Graphs)**: Wikidata and DBpedia matching records carry secondary weight (Score: 80).
3.  **Level 3 Authority (On-page schemas & crawls)**: Unstructured web crawls carry tertiary weight (Score: 50).
This multi-source validation ensures our local knowledge graph remains clean, accurate, and ready to guide AEO/GEO optimizations.
