import { TableDefinition } from "./types";

export const analyticsSnapshotsTable: TableDefinition = {
  tableName: "analytics_snapshots",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Snapshot primary identifier"
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
      name: "brand_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "brands",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Target monitored brand"
    },
    {
      name: "snapshot_date",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the analytics summary was calculated"
    },
    {
      name: "overall_visibility",
      type: "INTEGER",
      nullable: false,
      description: "Aggregated compound visibility percentage (0 to 100)"
    },
    {
      name: "citation_count",
      type: "INTEGER",
      nullable: false,
      description: "Total citations processed"
    },
    {
      name: "mention_count",
      type: "INTEGER",
      nullable: false,
      description: "Total brand mentions detected"
    },
    {
      name: "average_sentiment",
      type: "INTEGER",
      nullable: false,
      description: "Normalized average sentiment index (-100 to 100)"
    }
  ],
  indexes: [
    "CREATE INDEX idx_snapshots_organization ON analytics_snapshots(organization_id);",
    "CREATE INDEX idx_snapshots_brand ON analytics_snapshots(brand_id);",
    "CREATE INDEX idx_snapshots_date ON analytics_snapshots(snapshot_date);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS analytics_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  snapshot_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  overall_visibility INTEGER NOT NULL CHECK (overall_visibility >= 0 AND overall_visibility <= 100),
  citation_count INTEGER NOT NULL DEFAULT 0,
  mention_count INTEGER NOT NULL DEFAULT 0,
  average_sentiment INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_snapshots_organization ON analytics_snapshots(organization_id);
CREATE INDEX IF NOT EXISTS idx_snapshots_brand ON analytics_snapshots(brand_id);
CREATE INDEX IF NOT EXISTS idx_snapshots_date ON analytics_snapshots(snapshot_date);
  `
};

export const recommendationsHistoryTable: TableDefinition = {
  tableName: "recommendations_history",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique recommendation log ID"
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
      name: "recommendation_id",
      type: "UUID",
      nullable: false,
      description: "Linked recommendation item"
    },
    {
      name: "previous_status",
      type: "TEXT",
      nullable: false,
      description: "Previous recommendation status"
    },
    {
      name: "new_status",
      type: "TEXT",
      nullable: false,
      description: "Transitioned recommendation status"
    },
    {
      name: "changed_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp of change"
    },
    {
      name: "changed_by",
      type: "TEXT",
      nullable: false,
      description: "Operator ID that executed change"
    }
  ],
  indexes: [
    "CREATE INDEX idx_recommendations_history_org ON recommendations_history(organization_id);",
    "CREATE INDEX idx_recommendations_history_rec ON recommendations_history(recommendation_id);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS recommendations_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  recommendation_id UUID NOT NULL,
  previous_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  changed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  changed_by TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_recommendations_history_org ON recommendations_history(organization_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_history_rec ON recommendations_history(recommendation_id);
  `
};
