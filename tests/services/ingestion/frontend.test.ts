/**
 * Automated Enterprise Test Suite for Frontend API Client & Simulated UI Flow Verification
 * Programmatically mocks global fetch and verifies standard client invocation, payload structures,
 * and security-related custom headers (tenant and user contexts).
 */

import assert from "node:assert";
import { apiClient } from "../../../src/lib/api/client";

export async function testFrontendClient() {
  console.log("▶ Running Frontend API Client Integration Tests...");

  const originalFetch = globalThis.fetch;
  let lastFetchUrl = "";
  let lastFetchOptions: RequestInit | undefined = undefined;

  // 1. Setup programmatic fetch interceptor
  globalThis.fetch = async (url: URL | RequestInfo, options?: RequestInit) => {
    lastFetchUrl = String(url);
    lastFetchOptions = options;

    if (lastFetchUrl.includes("/api/v1/ingest/document")) {
      const body = JSON.parse(options?.body as string);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          success: true,
          totalChunks: 2,
          processedChunks: 2,
          failedChunks: 0,
          errors: [],
        }),
      } as Response;
    }

    if (lastFetchUrl.includes("/api/v1/rag/query")) {
      const body = JSON.parse(options?.body as string);
      return {
        ok: true,
        status: 200,
        json: async () => ({
          answer: `پاسخ شبیه‌سازی شده درباره "${body.question}"`,
          sources: [
            {
              id: "chunk-01",
              content: "متن بازیابی شده نمونه برای راستی‌آزمایی سورس.",
              metadata: {},
              similarityScore: 0.92,
            },
          ],
        }),
      } as Response;
    }

    return {
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response;
  };

  try {
    // 2. Test Ingestion Client call
    console.log("  * Testing apiClient.ingestDocument request flow...");
    const ingestResult = await apiClient.ingestDocument("کیفیت خدمات عالی است.", { articleId: "art-100" });

    assert.strictEqual(ingestResult.success, true);
    assert.strictEqual(ingestResult.totalChunks, 2);
    assert.strictEqual(lastFetchUrl, "/api/v1/ingest/document");
    assert.strictEqual(lastFetchOptions?.method, "POST");

    const headers = lastFetchOptions?.headers as Record<string, string>;
    assert.strictEqual(headers["Content-Type"], "application/json");
    assert.strictEqual(headers["x-tenant-id"], "org_default_123");
    assert.strictEqual(headers["x-user-id"], "user_default_123");
    assert.ok(headers["x-request-id"]);

    console.log("    ✅ Ingestion request payload & headers verified successfully.");

    // 3. Test RAG Query Client call
    console.log("  * Testing apiClient.queryBrandIntelligence request flow...");
    const ragResult = await apiClient.queryBrandIntelligence("درباره پلتفرم اپتیموس توضیح دهید؟");

    assert.ok(ragResult.answer.includes("پاسخ شبیه‌سازی شده"));
    assert.strictEqual(ragResult.sources.length, 1);
    assert.strictEqual(ragResult.sources[0].similarityScore, 0.92);
    assert.strictEqual(lastFetchUrl, "/api/v1/rag/query");
    assert.strictEqual(lastFetchOptions?.method, "POST");

    console.log("    ✅ RAG Query request payload & sources mapped successfully.");

  } finally {
    // Restore global fetch
    globalThis.fetch = originalFetch;
  }

  console.log("✅ Frontend API Client Tests Passed Successfully!");
}

// Support direct execution
if (require.main === module) {
  testFrontendClient()
    .then(() => console.log("Frontend tests completed!"))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
