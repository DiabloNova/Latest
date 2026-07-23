import { TableDefinition } from "./types";

export const aiObservationsTable: TableDefinition = {
  tableName: "ai_observations",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique identifier for the AI observation"
    },
    {
      name: "organization_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "organizations",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Organization (tenant) partition key"
    },
    {
      name: "prompt_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "prompts",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Linked prompt query"
    },
    {
      name: "engine_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "ai_engines",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Linked model engine"
    },
    {
      name: "response_text",
      type: "TEXT",
      nullable: false,
      description: "Complete raw response text returned by the engine"
    },
    {
      name: "visibility_score",
      type: "INTEGER",
      nullable: false,
      description: "Computed composite AEO visibility percentage (0 to 100)"
    },
    // Value Object: Sentiment
    {
      name: "sentiment_score",
      type: "INTEGER",
      nullable: false,
      description: "Sentiment score (-100 to 100)"
    },
    {
      name: "sentiment_label",
      type: "TEXT",
      nullable: false,
      description: "Categorical label: positive, negative, neutral"
    },
    {
      name: "sentiment_confidence",
      type: "DOUBLE PRECISION",
      nullable: false,
      description: "Classifier confidence rating value (0.0 to 1.0)"
    },
    // Value Object: Confidence
    {
      name: "confidence_score",
      type: "DOUBLE PRECISION",
      nullable: false,
      description: "Overall tracking execution confidence (0.0 to 1.0)"
    },
    {
      name: "confidence_rating",
      type: "TEXT",
      nullable: false,
      description: "Confidence categorical label: high, medium, low"
    },
    {
      name: "executed_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Log execution timestamp"
    },
    // Audit & Lifecycle columns
    {
      name: "created_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the record was created"
    },
    {
      name: "updated_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the record was last updated"
    },
    {
      name: "created_by",
      type: "TEXT",
      nullable: false,
      default: "'system'",
      description: "User or service that created the record"
    },
    {
      name: "updated_by",
      type: "TEXT",
      nullable: false,
      default: "'system'",
      description: "User or service that last updated the record"
    },
    {
      name: "deleted_at",
      type: "TIMESTAMP",
      nullable: true,
      description: "Timestamp when soft-deletion occurred"
    },
    {
      name: "version",
      type: "INTEGER",
      nullable: false,
      default: "1",
      description: "Optimistic locking version counter"
    }
  ],
  indexes: [
    "CREATE INDEX idx_observations_organization ON ai_observations(organization_id);",
    "CREATE INDEX idx_observations_prompt ON ai_observations(prompt_id);",
    "CREATE INDEX idx_observations_engine ON ai_observations(engine_id);",
    "CREATE INDEX idx_observations_executed ON ai_observations(executed_at);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS ai_observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  engine_id UUID NOT NULL REFERENCES ai_engines(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  visibility_score INTEGER NOT NULL CHECK (visibility_score >= 0 AND visibility_score <= 100),
  sentiment_score INTEGER NOT NULL,
  sentiment_label TEXT NOT NULL,
  sentiment_confidence DOUBLE PRECISION NOT NULL,
  confidence_score DOUBLE PRECISION NOT NULL,
  confidence_rating TEXT NOT NULL,
  executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL DEFAULT 'system',
  updated_by TEXT NOT NULL DEFAULT 'system',
  deleted_at TIMESTAMP WITH TIME ZONE,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_observations_organization ON ai_observations(organization_id);
CREATE INDEX IF NOT EXISTS idx_observations_prompt ON ai_observations(prompt_id);
CREATE INDEX IF NOT EXISTS idx_observations_engine ON ai_observations(engine_id);
CREATE INDEX IF NOT EXISTS idx_observations_executed ON ai_observations(executed_at);
  `
};

export const brandMentionsTable: TableDefinition = {
  tableName: "brand_mentions",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique brand mention record identifier"
    },
    {
      name: "organization_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "organizations",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Organization (tenant) partition key"
    },
    {
      name: "observation_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "ai_observations",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Linked AI observation"
    },
    {
      name: "entity_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "entities",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Linked semantic entity reference"
    },
    // Value Object: TextContext
    {
      name: "context_text_snippet",
      type: "TEXT",
      nullable: false,
      description: "Verbatim context surrounding the mention"
    },
    {
      name: "context_char_start",
      type: "INTEGER",
      nullable: false,
      description: "Response text character index start position"
    },
    {
      name: "context_char_end",
      type: "INTEGER",
      nullable: false,
      description: "Response text character index end position"
    },
    // Value Object: Sentiment
    {
      name: "sentiment_score",
      type: "INTEGER",
      nullable: false,
      description: "Extracted mention sentiment score (-100 to 100)"
    },
    {
      name: "sentiment_label",
      type: "TEXT",
      nullable: false,
      description: "Label: positive, negative, neutral"
    },
    {
      name: "sentiment_confidence",
      type: "DOUBLE PRECISION",
      nullable: false,
      description: "Mention sentiment confidence (0.0 to 1.0)"
    },
    // Value Object: Confidence
    {
      name: "confidence_score",
      type: "DOUBLE PRECISION",
      nullable: false,
      description: "Mention extraction confidence (0.0 to 1.0)"
    },
    {
      name: "confidence_rating",
      type: "TEXT",
      nullable: false,
      description: "Confidence label: high, medium, low"
    },
    // Audit & Lifecycle columns
    {
      name: "created_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the record was created"
    },
    {
      name: "updated_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the record was last updated"
    },
    {
      name: "created_by",
      type: "TEXT",
      nullable: false,
      default: "'system'",
      description: "User or service that created the record"
    },
    {
      name: "updated_by",
      type: "TEXT",
      nullable: false,
      default: "'system'",
      description: "User or service that last updated the record"
    },
    {
      name: "deleted_at",
      type: "TIMESTAMP",
      nullable: true,
      description: "Timestamp when soft-deletion occurred"
    },
    {
      name: "version",
      type: "INTEGER",
      nullable: false,
      default: "1",
      description: "Optimistic locking version counter"
    }
  ],
  indexes: [
    "CREATE INDEX idx_mentions_organization ON brand_mentions(organization_id);",
    "CREATE INDEX idx_mentions_observation ON brand_mentions(observation_id);",
    "CREATE INDEX idx_mentions_entity ON brand_mentions(entity_id);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS brand_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  observation_id UUID NOT NULL REFERENCES ai_observations(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  context_text_snippet TEXT NOT NULL,
  context_char_start INTEGER NOT NULL,
  context_char_end INTEGER NOT NULL,
  sentiment_score INTEGER NOT NULL,
  sentiment_label TEXT NOT NULL,
  sentiment_confidence DOUBLE PRECISION NOT NULL,
  confidence_score DOUBLE PRECISION NOT NULL,
  confidence_rating TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL DEFAULT 'system',
  updated_by TEXT NOT NULL DEFAULT 'system',
  deleted_at TIMESTAMP WITH TIME ZONE,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_mentions_organization ON brand_mentions(organization_id);
CREATE INDEX IF NOT EXISTS idx_mentions_observation ON brand_mentions(observation_id);
CREATE INDEX IF NOT EXISTS idx_mentions_entity ON brand_mentions(entity_id);
  `
};
