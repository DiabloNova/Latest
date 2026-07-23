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
      description: "Computed visibility percentage (0 to 100)"
    },
    {
      name: "sentiment_score",
      type: "INTEGER",
      nullable: false,
      description: "Normalized sentiment score of response (e.g. 0 to 100)"
    },
    {
      name: "confidence_score",
      type: "DOUBLE PRECISION",
      nullable: false,
      description: "Execution confidence / accuracy rating (0.0 to 1.0)"
    },
    {
      name: "executed_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Execution timestamp"
    }
  ],
  indexes: [
    "CREATE INDEX idx_observations_prompt ON ai_observations(prompt_id);",
    "CREATE INDEX idx_observations_engine ON ai_observations(engine_id);",
    "CREATE INDEX idx_observations_executed ON ai_observations(executed_at);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS ai_observations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prompt_id UUID NOT NULL REFERENCES prompts(id) ON DELETE CASCADE,
  engine_id UUID NOT NULL REFERENCES ai_engines(id) ON DELETE CASCADE,
  response_text TEXT NOT NULL,
  visibility_score INTEGER NOT NULL CHECK (visibility_score >= 0 AND visibility_score <= 100),
  sentiment_score INTEGER NOT NULL,
  confidence_score DOUBLE PRECISION NOT NULL CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
  executed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

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
      description: "Unique mention identifier"
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
      description: "Linked observation"
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
      description: "Linked semantic entity"
    },
    {
      name: "position",
      type: "INTEGER",
      nullable: false,
      description: "Index position / paragraph rank in text"
    },
    {
      name: "context",
      type: "TEXT",
      nullable: false,
      description: "Text snippet context containing the brand mention"
    },
    {
      name: "sentiment",
      type: "TEXT",
      nullable: false,
      description: "Sentiment of the mention: positive, negative, neutral"
    },
    {
      name: "confidence",
      type: "DOUBLE PRECISION",
      nullable: false,
      description: "Extraction confidence score (0.0 to 1.0)"
    }
  ],
  indexes: [
    "CREATE INDEX idx_mentions_observation ON brand_mentions(observation_id);",
    "CREATE INDEX idx_mentions_entity ON brand_mentions(entity_id);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS brand_mentions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  observation_id UUID NOT NULL REFERENCES ai_observations(id) ON DELETE CASCADE,
  entity_id UUID NOT NULL REFERENCES entities(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,
  context TEXT NOT NULL,
  sentiment TEXT NOT NULL CHECK (sentiment IN ('positive', 'negative', 'neutral')),
  confidence DOUBLE PRECISION NOT NULL CHECK (confidence >= 0.0 AND confidence <= 1.0)
);

CREATE INDEX IF NOT EXISTS idx_mentions_observation ON brand_mentions(observation_id);
CREATE INDEX IF NOT EXISTS idx_mentions_entity ON brand_mentions(entity_id);
  `
};
