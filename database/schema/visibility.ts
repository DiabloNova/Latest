import { TableDefinition } from "./types";

export const visibilityScoresTable: TableDefinition = {
  tableName: "visibility_scores",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique metric log ID"
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
      description: "Monitored brand"
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
      description: "AI platform engine"
    },
    {
      name: "overall_score",
      type: "INTEGER",
      nullable: false,
      description: "Calculated composite visibility score (0 to 100)"
    },
    {
      name: "mention_score",
      type: "INTEGER",
      nullable: false,
      description: "Mentions factor index score (0 to 100)"
    },
    {
      name: "citation_score",
      type: "INTEGER",
      nullable: false,
      description: "Citations factor index score (0 to 100)"
    },
    {
      name: "authority_score",
      type: "INTEGER",
      nullable: false,
      description: "Source authority factor index score (0 to 100)"
    },
    {
      name: "sentiment_score",
      type: "INTEGER",
      nullable: false,
      description: "Sentiment impact score (0 to 100)"
    },
    {
      name: "position_score",
      type: "INTEGER",
      nullable: false,
      description: "Response visual placement priority index (0 to 100)"
    },
    {
      name: "date",
      type: "TIMESTAMP",
      nullable: false,
      description: "Log date for historical analytical charts"
    }
  ],
  indexes: [
    "CREATE INDEX idx_visibility_brand ON visibility_scores(brand_id);",
    "CREATE INDEX idx_visibility_engine ON visibility_scores(engine_id);",
    "CREATE INDEX idx_visibility_date ON visibility_scores(date);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS visibility_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  engine_id UUID NOT NULL REFERENCES ai_engines(id) ON DELETE CASCADE,
  overall_score INTEGER NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  mention_score INTEGER NOT NULL CHECK (mention_score >= 0 AND mention_score <= 100),
  citation_score INTEGER NOT NULL CHECK (citation_score >= 0 AND citation_score <= 100),
  authority_score INTEGER NOT NULL CHECK (authority_score >= 0 AND authority_score <= 100),
  sentiment_score INTEGER NOT NULL CHECK (sentiment_score >= 0 AND sentiment_score <= 100),
  position_score INTEGER NOT NULL CHECK (position_score >= 0 AND position_score <= 100),
  date TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_visibility_brand ON visibility_scores(brand_id);
CREATE INDEX IF NOT EXISTS idx_visibility_engine ON visibility_scores(engine_id);
CREATE INDEX IF NOT EXISTS idx_visibility_date ON visibility_scores(date);
  `
};
