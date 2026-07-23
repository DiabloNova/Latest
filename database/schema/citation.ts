import { TableDefinition } from "./types";

export const citationsTable: TableDefinition = {
  tableName: "citations",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique reference ID"
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
      name: "url",
      type: "TEXT",
      nullable: false,
      description: "Complete citation resolved URL"
    },
    {
      name: "domain",
      type: "TEXT",
      nullable: false,
      description: "Extracted host domain name"
    },
    {
      name: "title",
      type: "TEXT",
      nullable: false,
      description: "Resolved webpage title text"
    },
    {
      name: "authority_score",
      type: "INTEGER",
      nullable: false,
      description: "Dynamic domain authority rating (0 to 100)"
    },
    {
      name: "relevance_score",
      type: "INTEGER",
      nullable: false,
      description: "Query alignment relevance metric (0 to 100)"
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
    "CREATE INDEX idx_citations_organization ON citations(organization_id);",
    "CREATE INDEX idx_citations_observation ON citations(observation_id);",
    "CREATE INDEX idx_citations_domain ON citations(domain);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  observation_id UUID NOT NULL REFERENCES ai_observations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  title TEXT NOT NULL,
  authority_score INTEGER NOT NULL CHECK (authority_score >= 0 AND authority_score <= 100),
  relevance_score INTEGER NOT NULL CHECK (relevance_score >= 0 AND relevance_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  created_by TEXT NOT NULL DEFAULT 'system',
  updated_by TEXT NOT NULL DEFAULT 'system',
  deleted_at TIMESTAMP WITH TIME ZONE,
  version INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_citations_organization ON citations(organization_id);
CREATE INDEX IF NOT EXISTS idx_citations_observation ON citations(observation_id);
CREATE INDEX IF NOT EXISTS idx_citations_domain ON citations(domain);
  `
};
