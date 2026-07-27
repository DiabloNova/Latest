/**
 * Integration Test for Document Ingestion Pipeline and Multi-Tenant KG Querying
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool } from "pg";
import { DocumentIngestionService } from "../../../src/services/ingestion/document-ingestion";
import { TenantContextManager } from "../../../src/core/database/tenant-context";
import { PostgresClient } from "../../../src/features/admin/infrastructure/persistence/postgres";

const mockEmbeddingsStore: any[] = [];
const mockEntitiesStore: any[] = [];
const mockRelationshipsStore: any[] = [];

// Clean database mocks
function resetMocks() {
  mockEmbeddingsStore.length = 0;
  mockEntitiesStore.length = 0;
  mockRelationshipsStore.length = 0;
}

const originalQuery = Pool.prototype.query;

// Query mock to intercept database writes and queries for Document Ingestion integration tests
(Pool.prototype as any).query = async function (sql: string, params: unknown[] = []) {
  const normalizedSql = sql.toLowerCase();

  // 1. document_embeddings INSERT
  if (normalizedSql.includes("insert into document_embeddings")) {
    TenantContextManager.getRequiredTenantId();
    const [id, tenantId, contentChunk, metadataJson, embeddingStr, createdAt] = params as any[];
    const embedding = JSON.parse(embeddingStr);
    const metadata = typeof metadataJson === "string" ? JSON.parse(metadataJson) : metadataJson;

    const newRecord = {
      id,
      tenant_id: tenantId,
      content_chunk: contentChunk,
      metadata,
      embedding,
      created_at: createdAt
    };
    mockEmbeddingsStore.push(newRecord);

    return {
      rowCount: 1,
      rows: [newRecord]
    };
  }

  // 2. kg_entities SELECT case-insensitive
  if (normalizedSql.includes("select") && normalizedSql.includes("kg_entities") && normalizedSql.includes("lower(name) = lower")) {
    const activeTenantId = TenantContextManager.getRequiredTenantId();
    const nameParam = params[0] as string;
    const found = mockEntitiesStore.find(
      e => e.tenant_id === activeTenantId && e.name.toLowerCase() === nameParam.toLowerCase()
    );

    return {
      rowCount: found ? 1 : 0,
      rows: found ? [found] : [],
    };
  }

  // 3. kg_entities INSERT
  if (normalizedSql.includes("insert into") && normalizedSql.includes("kg_entities")) {
    TenantContextManager.getRequiredTenantId();
    const [id, tenant_id, name, type, propertiesJson] = params as any[];
    const newEntity = {
      id,
      tenant_id,
      name,
      type,
      properties: typeof propertiesJson === "string" ? JSON.parse(propertiesJson) : propertiesJson,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockEntitiesStore.push(newEntity);

    return {
      rowCount: 1,
      rows: [newEntity],
    };
  }

  // 4. kg_entities UPDATE
  if (normalizedSql.includes("update") && normalizedSql.includes("kg_entities")) {
    const activeTenantId = TenantContextManager.getRequiredTenantId();
    const [propertiesJson, id] = params as any[];
    const entity = mockEntitiesStore.find(e => e.id === id && e.tenant_id === activeTenantId);
    if (entity) {
      entity.properties = typeof propertiesJson === "string" ? JSON.parse(propertiesJson) : propertiesJson;
      entity.updated_at = new Date().toISOString();
    }
    return {
      rowCount: entity ? 1 : 0,
      rows: entity ? [entity] : [],
    };
  }

  // 5. kg_relationships SELECT
  if (normalizedSql.includes("select") && normalizedSql.includes("kg_relationships") && normalizedSql.includes("source_entity_id")) {
    const activeTenantId = TenantContextManager.getRequiredTenantId();

    // If it's the 1-hop sub-graph query (with JOINs)
    if (normalizedSql.includes("join kg_entities s") && normalizedSql.includes("join kg_entities t")) {
      const entityId = params[0] as string;
      const matchedRels = mockRelationshipsStore.filter(
        r => r.tenant_id === activeTenantId && (r.source_entity_id === entityId || r.target_entity_id === entityId)
      );

      const rows = matchedRels.map(r => {
        const sourceEntity = mockEntitiesStore.find(e => e.id === r.source_entity_id);
        const targetEntity = mockEntitiesStore.find(e => e.id === r.target_entity_id);
        return {
          id: r.id,
          source_entity_id: r.source_entity_id,
          target_entity_id: r.target_entity_id,
          relationship_type: r.relationship_type,
          properties: r.properties,
          created_at: r.created_at,
          updated_at: r.updated_at,
          source_name: sourceEntity ? sourceEntity.name : "",
          source_type: sourceEntity ? sourceEntity.type : "",
          target_name: targetEntity ? targetEntity.name : "",
          target_type: targetEntity ? targetEntity.type : "",
        };
      });

      return {
        rowCount: rows.length,
        rows
      };
    }

    // Otherwise standard SELECT
    const [sourceId, targetId, relType] = params as any[];
    const found = mockRelationshipsStore.find(
      r => r.tenant_id === activeTenantId &&
           r.source_entity_id === sourceId &&
           r.target_entity_id === targetId &&
           r.relationship_type.toLowerCase() === relType.toLowerCase()
    );

    return {
      rowCount: found ? 1 : 0,
      rows: found ? [found] : [],
    };
  }

  // 6. kg_relationships INSERT
  if (normalizedSql.includes("insert into") && normalizedSql.includes("kg_relationships")) {
    TenantContextManager.getRequiredTenantId();
    const [id, tenant_id, source_id, target_id, relType, propertiesJson] = params as any[];
    const newRel = {
      id,
      tenant_id,
      source_entity_id: source_id,
      target_entity_id: target_id,
      relationship_type: relType,
      properties: typeof propertiesJson === "string" ? JSON.parse(propertiesJson) : propertiesJson,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockRelationshipsStore.push(newRel);

    return {
      rowCount: 1,
      rows: [newRel],
    };
  }

  // 7. Transaction control SQLs safely resolved for offline simulation
  if (normalizedSql.includes("begin") || normalizedSql.includes("commit") || normalizedSql.includes("rollback") || normalizedSql.includes("set local")) {
    return {
      rowCount: 1,
      rows: [],
      command: "SELECT",
      oid: 0,
      fields: []
    };
  }

  // Fallback
  return {
    rowCount: 0,
    rows: []
  };
};

export async function testDocumentIngestionPipeline() {
  console.log("▶ Running Document Ingestion & KG Pipeline Integration Tests...");
  resetMocks();

  const ingestionService = new DocumentIngestionService();
  const tenantId = "org-test-ingestion-001";

  // Ingest document text containing keywords to trigger mock graph extraction
  const docText = "Optimus AI solves brand intelligence problems by using Gemini models beautifully.";

  console.log("  * Executing Document Ingestion Process...");
  const ingestionResult = await TenantContextManager.runWithTenantContext(tenantId, "user-01", "req-01", async () => {
    return await ingestionService.ingestDocument(docText, { source: "test-suite" });
  });

  // Verify vector chunks
  if (ingestionResult.totalChunks !== 1) {
    throw new Error(`Ingestion Integration Error: Expected 1 chunk, got ${ingestionResult.totalChunks}`);
  }

  const chunkRes = ingestionResult.processedChunks[0];
  if (!chunkRes.isGraphExtracted) {
    throw new Error(`Ingestion Integration Error: KG extraction failed: ${chunkRes.graphError}`);
  }

  // Check stored items
  if (mockEmbeddingsStore.length !== 1) {
    throw new Error("Ingestion Integration Error: Chunks were not indexed inside vector-store.");
  }

  if (mockEntitiesStore.length !== 2) {
    throw new Error(`Ingestion Integration Error: Expected 2 entities, found ${mockEntitiesStore.length}`);
  }

  if (mockRelationshipsStore.length !== 1) {
    throw new Error(`Ingestion Integration Error: Expected 1 relationship, found ${mockRelationshipsStore.length}`);
  }

  // Verify traceability source_chunk_id
  const rel = mockRelationshipsStore[0];
  if (rel.properties.source_chunk_id !== chunkRes.chunkId) {
    throw new Error(`Traceability Error: Expected source_chunk_id to match chunk ID ${chunkRes.chunkId}`);
  }

  console.log("  * Testing sub-graph 1-hop Query logic...");
  // Simulate the sub-graph query from API route
  await TenantContextManager.runWithTenantContext(tenantId, "user-01", "req-02", async () => {
    const pg = PostgresClient.getInstance();

    // Query entity
    const entRes = await pg.query("SELECT id, name FROM kg_entities WHERE LOWER(name) = LOWER($1) LIMIT 1", ["optimus ai"]);
    const entity = entRes.rows[0];

    // Query direct relations
    const relRes = await pg.query(
      `SELECT r.id, s.name as source_name, t.name as target_name, r.relationship_type
       FROM kg_relationships r
       JOIN kg_entities s ON r.source_entity_id = s.id
       JOIN kg_entities t ON r.target_entity_id = t.id
       WHERE r.source_entity_id = $1 OR r.target_entity_id = $1`,
      [entity.id]
    );

    if (relRes.rowCount !== 1) {
      throw new Error(`Query Error: Expected 1-hop relationship in query result, found ${relRes.rowCount}`);
    }

    const row = relRes.rows[0];
    if (row.source_name !== "Optimus AI" || row.target_name !== "Gemini") {
      throw new Error(`Query Error: Path resolution mismatch. Got source='${row.source_name}', target='${row.target_name}'`);
    }

    console.log("  * Success: Sub-graph querying successfully mapped paths.");
  });

  console.log("✅ Document Ingestion & KG Pipeline Integration Tests Passed Successfully!");
}

export function restoreOriginalPool() {
  Pool.prototype.query = originalQuery;
}

if (require.main === module) {
  testDocumentIngestionPipeline()
    .then(() => restoreOriginalPool())
    .catch(err => {
      restoreOriginalPool();
      console.error(err);
      process.exit(1);
    });
}
