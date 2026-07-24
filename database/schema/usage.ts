import { TableDefinition } from "./types";

export const usageRecordsTable: TableDefinition = {
  tableName: "usage_records",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique usage record identifier"
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
      name: "resource",
      type: "TEXT",
      nullable: false,
      description: "Type of metered resource: ai_requests, crawled_pages, prompt_executions, storage_kb"
    },
    {
      name: "consumption",
      type: "INTEGER",
      nullable: false,
      default: "0",
      description: "Accumulated metered consumption"
    },
    {
      name: "last_updated_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when record was last updated"
    }
  ],
  indexes: [
    "CREATE INDEX idx_usage_records_organization ON usage_records(organization_id);",
    "CREATE UNIQUE INDEX idx_usage_resource ON usage_records(organization_id, resource);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS usage_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  resource TEXT NOT NULL CHECK (resource IN ('ai_requests', 'crawled_pages', 'prompt_executions', 'storage_kb')),
  consumption INTEGER NOT NULL DEFAULT 0,
  last_updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usage_records_organization ON usage_records(organization_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_usage_resource ON usage_records(organization_id, resource);
  `
};

export const notificationPreferencesTable: TableDefinition = {
  tableName: "notification_preferences",
  columns: [
    {
      name: "organization_id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      references: {
        table: "organizations",
        column: "id",
        onDelete: "CASCADE"
      },
      description: "Organization (tenant) partition key (also primary key)"
    },
    {
      name: "enabled_channels",
      type: "TEXT[]",
      nullable: false,
      description: "Enabled message channels: Email, Webhook, InApp"
    },
    {
      name: "target_email",
      type: "TEXT",
      nullable: true,
      description: "Configured target email for alert forwarding"
    },
    {
      name: "webhook_url",
      type: "TEXT",
      nullable: true,
      description: "Configured payload webhook forwarding URL"
    },
    {
      name: "updated_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when record was last updated"
    }
  ],
  indexes: [],
  sql: `
CREATE TABLE IF NOT EXISTS notification_preferences (
  organization_id UUID PRIMARY KEY REFERENCES organizations(id) ON DELETE CASCADE,
  enabled_channels TEXT[] NOT NULL DEFAULT '{}'::TEXT[],
  target_email TEXT,
  webhook_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);
  `
};
