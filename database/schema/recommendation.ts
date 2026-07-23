import { TableDefinition } from "./types";

export const recommendationsTable: TableDefinition = {
  tableName: "recommendations",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique identifier for action recommendation"
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
      description: "Target brand being optimized"
    },
    {
      name: "category",
      type: "TEXT",
      nullable: false,
      description: "Target focus domain (e.g. 'Citation Authority', 'Entity Linking')"
    },
    {
      name: "priority",
      type: "TEXT",
      nullable: false,
      description: "Action urgency: low, medium, high"
    },
    {
      name: "impact_score",
      type: "INTEGER",
      nullable: false,
      description: "Predicted visibility score increase (0 to 100)"
    },
    {
      name: "description",
      type: "TEXT",
      nullable: false,
      description: "Detailed actionable step text"
    },
    {
      name: "status",
      type: "TEXT",
      nullable: false,
      default: "'pending'",
      description: "Implementation status: pending, applied, ignored"
    }
  ],
  indexes: [
    "CREATE INDEX idx_recommendations_brand ON recommendations(brand_id);",
    "CREATE INDEX idx_recommendations_status ON recommendations(status);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  priority TEXT NOT NULL,
  impact_score INTEGER NOT NULL CHECK (impact_score >= 0 AND impact_score <= 100),
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'ignored')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_recommendations_brand ON recommendations(brand_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_status ON recommendations(status);
  `
};
