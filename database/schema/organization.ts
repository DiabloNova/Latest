import { TableDefinition } from "./types";

export const organizationsTable: TableDefinition = {
  tableName: "organizations",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique identifier for the SaaS organization (tenant)"
    },
    {
      name: "name",
      type: "TEXT",
      nullable: false,
      description: "Commercial name of the organization"
    },
    {
      name: "slug",
      type: "TEXT",
      nullable: false,
      unique: true,
      description: "URL-friendly unique slug for routing"
    },
    {
      name: "plan",
      type: "TEXT",
      nullable: false,
      default: "'free'",
      description: "Subscription tier: 'free', 'growth', or 'enterprise'"
    },
    {
      name: "created_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the organization was created"
    },
    {
      name: "updated_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the organization was last updated"
    }
  ],
  indexes: [
    "CREATE UNIQUE INDEX idx_organizations_slug ON organizations(slug);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_organizations_slug ON organizations(slug);
  `
};
