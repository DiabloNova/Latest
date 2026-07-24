import { TableDefinition } from "./types";

export const campaignsTable: TableDefinition = {
  tableName: "campaigns",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique campaign identifier"
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
      description: "Target brand of the campaign"
    },
    {
      name: "name",
      type: "TEXT",
      nullable: false,
      description: "Name of the campaign"
    },
    {
      name: "status",
      type: "TEXT",
      nullable: false,
      default: "'draft'",
      description: "Campaign status: draft, active, completed"
    },
    {
      name: "engines",
      type: "TEXT[]",
      nullable: false,
      description: "Target AI platforms to query"
    },
    {
      name: "prompt_ids",
      type: "TEXT[]",
      nullable: false,
      description: "Target prompt IDs to execute"
    },
    {
      name: "frequency",
      type: "TEXT",
      nullable: false,
      default: "'daily'",
      description: "Execution recurrence: daily, weekly, monthly"
    },
    // Audit & Lifecycle columns
    {
      name: "created_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when record was created"
    },
    {
      name: "updated_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when record was last updated"
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
    "CREATE INDEX idx_campaigns_organization ON campaigns(organization_id);",
    "CREATE INDEX idx_campaigns_brand ON campaigns(brand_id);",
    "CREATE INDEX idx_campaigns_status ON campaigns(status);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'completed')),
  engines TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  prompt_ids TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  frequency TEXT NOT NULL DEFAULT 'daily' CHECK (frequency IN ('daily', 'weekly', 'monthly')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL DEFAULT 'system',
  updated_by TEXT NOT NULL DEFAULT 'system',
  deleted_at TIMESTAMP WITH TIME ZONE,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_campaigns_organization ON campaigns(organization_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_brand ON campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
  `
};

export const campaignExecutionsTable: TableDefinition = {
  tableName: "campaign_executions",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Execution run tracker ID"
    },
    {
      name: "campaign_id",
      type: "UUID",
      nullable: false,
      references: {
        table: "campaigns",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Linked campaign"
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
      name: "status",
      type: "TEXT",
      nullable: false,
      default: "'running'",
      description: "Execution state: running, success, failed"
    },
    {
      name: "observations_count",
      type: "INTEGER",
      nullable: false,
      default: "0",
      description: "Number of process records ingested"
    },
    {
      name: "cost_usd",
      type: "DOUBLE PRECISION",
      nullable: false,
      default: "0.0",
      description: "Accrued execution model cost"
    },
    {
      name: "error",
      type: "TEXT",
      nullable: true,
      description: "Failed reason logging message"
    },
    {
      name: "started_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Log run start date"
    },
    {
      name: "completed_at",
      type: "TIMESTAMP",
      nullable: true,
      description: "Log run complete date"
    }
  ],
  indexes: [
    "CREATE INDEX idx_campaign_executions_organization ON campaign_executions(organization_id);",
    "CREATE INDEX idx_campaign_executions_campaign ON campaign_executions(campaign_id);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS campaign_executions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'success', 'failed')),
  observations_count INTEGER NOT NULL DEFAULT 0,
  cost_usd DOUBLE PRECISION NOT NULL DEFAULT 0.0,
  error TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_campaign_executions_organization ON campaign_executions(organization_id);
CREATE INDEX IF NOT EXISTS idx_campaign_executions_campaign ON campaign_executions(campaign_id);
  `
};
