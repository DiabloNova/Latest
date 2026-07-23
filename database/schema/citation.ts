import { TableDefinition } from "./types";

export const citationsTable: TableDefinition = {
  tableName: "citations",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique identifier for the citation"
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
      description: "Resolved reference URL (e.g., 'https://techcrunch.com/article')"
    },
    {
      name: "domain",
      type: "TEXT",
      nullable: false,
      description: "Extracted source authority domain (e.g., 'techcrunch.com')"
    },
    {
      name: "title",
      type: "TEXT",
      nullable: false,
      description: "Source document / page title"
    },
    {
      name: "authority_score",
      type: "INTEGER",
      nullable: false,
      description: "Computed Domain Authority score (0 to 100)"
    },
    {
      name: "relevance_score",
      type: "INTEGER",
      nullable: false,
      description: "Prompt-response relevance level (0 to 100)"
    }
  ],
  indexes: [
    "CREATE INDEX idx_citations_observation ON citations(observation_id);",
    "CREATE INDEX idx_citations_domain ON citations(domain);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS citations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  observation_id UUID NOT NULL REFERENCES ai_observations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  domain TEXT NOT NULL,
  title TEXT NOT NULL,
  authority_score INTEGER NOT NULL CHECK (authority_score >= 0 AND authority_score <= 100),
  relevance_score INTEGER NOT NULL CHECK (relevance_score >= 0 AND relevance_score <= 100)
);

CREATE INDEX IF NOT EXISTS idx_citations_observation ON citations(observation_id);
CREATE INDEX IF NOT EXISTS idx_citations_domain ON citations(domain);
  `
};
