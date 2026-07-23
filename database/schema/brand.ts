import { TableDefinition } from "./types";

export const brandsTable: TableDefinition = {
  tableName: "brands",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique identifier for the brand"
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
      description: "Organization (tenant) that owns this brand"
    },
    {
      name: "name",
      type: "TEXT",
      nullable: false,
      description: "Name of the brand"
    },
    {
      name: "description",
      type: "TEXT",
      nullable: true,
      description: "General description of the brand, services, or products"
    },
    {
      name: "website",
      type: "TEXT",
      nullable: false,
      description: "Primary brand website URL used for RAG/citation matching"
    },
    {
      name: "industry",
      type: "TEXT",
      nullable: true,
      description: "Industry category for competitive positioning"
    },
    {
      name: "country",
      type: "TEXT",
      nullable: true,
      description: "Target geographic market"
    },
    {
      name: "created_at",
      type: "TIMESTAMP",
      nullable: false,
      default: "NOW()",
      description: "Timestamp when the brand record was created"
    }
  ],
  indexes: [
    "CREATE INDEX idx_brands_organization ON brands(organization_id);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  website TEXT NOT NULL,
  industry TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_brands_organization ON brands(organization_id);
  `
};
