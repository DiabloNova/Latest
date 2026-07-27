/**
 * Programmatic Enterprise Test Suite for Document Ingestion Pipeline
 * Verifies document chunking, embedding, sentiment processing, database storage, partial success error recovery,
 * and zero-trust multi-tenant isolation boundaries.
 */

import { DocumentIngestionService } from "../../../src/services/ingestion/document-ingestion";
import { VectorStoreService } from "../../../src/services/knowledge-graph/vector-store";
import { TenantContextManager, TenantContextViolationException } from "../../../src/core/database/tenant-context";

class MockFailingVectorStore extends VectorStoreService {
  override async insertEmbedding(
    tenantId: string,
    contentChunk: string,
    embedding: number[],
    metadata: Record<string, unknown>
  ) {
    if (contentChunk.includes("فیلتر_خطا")) {
      throw new Error("Simulated database insertion failure for this chunk");
    }
    return super.insertEmbedding(tenantId, contentChunk, embedding, metadata);
  }
}

export async function testDocumentIngestion() {
  console.log("▶ Running Document Ingestion Pipeline Tests...");

  const tenantAId = "org-enterprise-01";
  const tenantBId = "org-startup-02";

  // 1. Test Ingestion without active Tenant Context (must throw TenantContextViolationException)
  console.log("  * Testing Tenant Context enforcement...");
  const orphanedService = new DocumentIngestionService();
  try {
    await orphanedService.ingestDocument("تست عدم وجود کانکست برای امنیت اطلاعات.", { source: "test" });
    throw new Error("Ingestion Test Failure: Ingesting without context should have thrown a TenantContextViolationException!");
  } catch (err) {
    if (!(err instanceof TenantContextViolationException)) {
      throw new Error(`Ingestion Test Failure: Expected TenantContextViolationException, got: ${err}`);
    }
    console.log("    ✅ Successfully blocked ingestion outside active Tenant Context.");
  }

  // 2. Test Success Pipeline Flow (under Tenant A context)
  console.log("  * Testing normal success ingestion flow...");
  const ingestionService = new DocumentIngestionService();
  const rawText = "موتور بهینه‌سازی جی ای او. اپتیموس بهترین راهکار گراف دانش است؛ حتماً استفاده کنید!";

  const result = await TenantContextManager.runWithTenantContext(tenantAId, "user-01", "req-ingest-01", async () => {
    return await ingestionService.ingestDocument(rawText, { docType: "article" }, { maxChunkSize: 50, overlap: 5 });
  });

  if (!result.success) {
    throw new Error(`Ingestion Test Failure: Expected success, got result: ${JSON.stringify(result)}`);
  }
  if (result.totalChunks === 0 || result.processedChunks !== result.totalChunks) {
    throw new Error(`Ingestion Test Failure: Mismatch in processed chunks. Result: ${JSON.stringify(result)}`);
  }
  console.log(`    ✅ Successfully ingested document into ${result.processedChunks} chunks.`);

  // 3. Test Partial Success and Error Recovery
  console.log("  * Testing partial success error handling...");
  const failingVectorStore = new MockFailingVectorStore();
  const failingIngestionService = new DocumentIngestionService(failingVectorStore);
  // This text contains a sentence that will trigger a simulated error
  const partialRawText = "بخش اول متن بسیار خوب است. بخش دوم فیلتر_خطا حاوی ارور شبیه‌سازی شده است. بخش سوم هم بدون مشکل است.";

  const partialResult = await TenantContextManager.runWithTenantContext(tenantAId, "user-01", "req-ingest-02", async () => {
    return await failingIngestionService.ingestDocument(partialRawText, { docType: "partial" }, { maxChunkSize: 30, overlap: 0 });
  });

  if (!partialResult.success) {
    throw new Error("Ingestion Test Failure: Ingestion should have partial success status.");
  }
  if (partialResult.failedChunks !== 1 || partialResult.errors.length !== 1) {
    throw new Error(`Ingestion Test Failure: Expected exactly 1 failed chunk, got: ${JSON.stringify(partialResult)}`);
  }
  if (partialResult.processedChunks !== partialResult.totalChunks - 1) {
    throw new Error(`Ingestion Test Failure: Unsuccessful chunks recovery mismatch: ${JSON.stringify(partialResult)}`);
  }
  console.log("    ✅ Successfully verified partial success and graceful error recovery.");

  // 4. Test Multi-Tenant Isolation
  console.log("  * Testing end-to-end multi-tenant isolation...");
  const isolationText = "اطلاعات محرمانه سازمانی آلفا برای امنیت پیشرفته.";

  // Ingest under Tenant A context
  await TenantContextManager.runWithTenantContext(tenantAId, "user-01", "req-ingest-03", async () => {
    await ingestionService.ingestDocument(isolationText, { source: "internal-alpha" });
  });

  // Query under Tenant A context: Should find the ingested content
  await TenantContextManager.runWithTenantContext(tenantAId, "user-01", "req-ingest-04", async () => {
    const vectorStore = new VectorStoreService();
    const queryEmbedding = Array.from({ length: 768 }, () => 0.01); // Mock embedding close enough
    const results = await vectorStore.findSimilarEmbeddings(tenantAId, queryEmbedding, 10);

    const found = results.some(r => r.contentChunk.includes("اطلاعات محرمانه سازمانی آلفا"));
    if (!found) {
      throw new Error("Ingestion Test Failure: Ingested document was not found under Tenant A's own context.");
    }
  });

  // Query under Tenant B context: Should NOT find Tenant A's document (proving isolation)
  await TenantContextManager.runWithTenantContext(tenantBId, "user-02", "req-ingest-05", async () => {
    const vectorStore = new VectorStoreService();
    const queryEmbedding = Array.from({ length: 768 }, () => 0.01);
    const results = await vectorStore.findSimilarEmbeddings(tenantBId, queryEmbedding, 10);

    const leaked = results.some(r => r.contentChunk.includes("اطلاعات محرمانه سازمانی آلفا") || r.tenantId === tenantAId);
    if (leaked) {
      throw new Error("Ingestion Test Failure: SECURITY VIOLATION! Tenant B was able to retrieve Tenant A's document chunk!");
    }
    console.log("    ✅ Securely verified zero-trust tenant isolation boundaries.");
  });

  console.log("✅ All Document Ingestion Pipeline Tests Passed Successfully!");
}

// Support executing directly
if (require.main === module) {
  testDocumentIngestion()
    .then(() => console.log("Test finished!"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
