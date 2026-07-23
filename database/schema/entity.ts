import { TableDefinition } from "./types";

export const entitiesTable: TableDefinition = {
  tableName: "entities",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique identifier for the brand semantic entity"
    },
    {
      name: "brand_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "brands",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Brand associated with this semantic entity"
    },
    {
      name: "name",
      type: "TEXT",
      nullable: false,
      description: "Name of the entity (e.g., 'Apple Inc.', 'MacBook')"
    },
    {
      name: "type",
      type: "TEXT",
      nullable: false,
      description: "Type of entity (e.g., Brand, Product, Person, Location)"
    },
    {
      name: "wikidata_id",
      type: "TEXT",
      nullable: true,
      description: "External Wikidata ID reference (e.g., 'Q312')"
    },
    {
      name: "wikipedia_url",
      type: "TEXT",
      nullable: true,
      description: "Wikipedia reference URL"
    },
    {
      name: "confidence_score",
      type: "DOUBLE PRECISION",
      nullable: false,
      default: "1.0",
      description: "System confidence level of semantic linking (0.0 to 1.0)"
    }
  ],
  indexes: [
    "CREATE INDEX idx_entities_brand ON entities(brand_id);",
    "CREATE UNIQUE INDEX idx_entities_wikidata ON entities(wikidata_id) WHERE wikidata_id IS NOT NULL;"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS entities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  wikidata_id TEXT,
  wikipedia_url TEXT,
  confidence_score DOUBLE PRECISION NOT NULL DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_entities_brand ON entities(brand_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_entities_wikidata ON entities(wikidata_id) WHERE wikidata_id IS NOT NULL;
  `
};

export const entityRelationshipsTable: TableDefinition = {
  tableName: "entity_relationships",
  columns: [
    {
      name: "source_entity_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "entities",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Origin entity"
    },
    {
      name: "target_entity_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "entities",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Destination entity"
    },
    {
      name: "relationship_type",
      type: "TEXT",
      nullable: false,
      description: "Semantic predicate (owns, creates, competes_with, related_to, mentioned_with)"
    },
    {
      name: "confidence_score",
      type: "DOUBLE PRECISION",
      nullable: false,
      default: "1.0",
      description: "Relationship confidence rating (0.0 to 1.0)"
    }
  ],
  indexes: [
    "CREATE INDEX idx_relationships_source ON entity_relationships(source_entity_id);",
    "CREATE INDEX idx_relationships_target ON entity_relationships(target_entity_id);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS entity_relationships (
  source_entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  target_entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  relationship_type TEXT NOT NULL,
  confidence_score DOUBLE PRECISION NOT NULL DEFAULT 1.0,
  PRIMARY KEY (source_entity_id, target_entity_id, relationship_type)
);

CREATE INDEX IF NOT EXISTS idx_relationships_source ON entity_relationships(source_entity_id);
CREATE INDEX IF NOT EXISTS idx_relationships_target ON entity_relationships(target_entity_id);
  `
};
