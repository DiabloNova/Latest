import { TableDefinition } from "./types";

export const aiEnginesTable: TableDefinition = {
  tableName: "ai_engines",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique identifier for the external AI model engine"
    },
    {
      name: "name",
      type: "TEXT",
      nullable: false,
      description: "Name of ecosystem (e.g. 'ChatGPT', 'Claude', 'Gemini', 'Perplexity')"
    },
    {
      name: "provider",
      type: "TEXT",
      nullable: false,
      description: "Company provider (e.g., 'OpenAI', 'Anthropic')"
    },
    {
      name: "version",
      type: "TEXT",
      nullable: false,
      description: "Version identifier (e.g., 'gpt-4o', 'claude-3-5-sonnet')"
    },
    {
      name: "capabilities",
      type: "TEXT[]",
      nullable: false,
      description: "Capabilities (e.g., RAG, web_search, citation_parsing)"
    }
  ],
  indexes: [],
  sql: `
CREATE TABLE IF NOT EXISTS ai_engines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  version TEXT NOT NULL,
  capabilities TEXT[] NOT NULL DEFAULT '{}'::TEXT[]
);
  `
};

export const promptsTable: TableDefinition = {
  tableName: "prompts",
  columns: [
    {
      name: "id",
      type: "UUID",
      nullable: false,
      primaryKey: true,
      description: "Unique query identifier"
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
      description: "Target brand for the prompt tracking"
    },
    {
      name: "text",
      type: "TEXT",
      nullable: false,
      description: "Exact query phrase executed (e.g., 'What is the best SaaS for brand analytics?')"
    },
    {
      name: "category",
      type: "TEXT",
      nullable: false,
      description: "Search context / thematic grouping (e.g., 'Features', 'Pricing')"
    },
    {
      name: "intent",
      type: "TEXT",
      nullable: false,
      description: "User journey intent: Discovery, Comparison, Recommendation, Purchase, Research, Authority"
    },
    {
      name: "language",
      type: "TEXT",
      nullable: false,
      default: "'en'",
      description: "Query language locale (e.g., 'en', 'fa')"
    },
    {
      name: "priority",
      type: "TEXT",
      nullable: false,
      default: "'medium'",
      description: "Tracking update priority: 'low', 'medium', or 'high'"
    }
  ],
  indexes: [
    "CREATE INDEX idx_prompts_brand ON prompts(brand_id);",
    "CREATE INDEX idx_prompts_intent ON prompts(intent);"
  ],
  sql: `
CREATE TABLE IF NOT EXISTS prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  category TEXT NOT NULL,
  intent TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  priority TEXT NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_prompts_brand ON prompts(brand_id);
CREATE INDEX IF NOT EXISTS idx_prompts_intent ON prompts(intent);
  `
};
