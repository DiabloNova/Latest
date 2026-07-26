/**
 * Brand Intelligence UI — Intelligence Service Tests
 * Covers: src/services/intelligence/index.ts (getBrandHealthMetrics)
 */

import { intelligenceService } from "../../../src/services/intelligence";
import { BrandHealthMetricsSchema } from "../../../src/schemas/intelligence";

export async function testIntelligenceServiceBrandHealthMetrics() {
  console.log("▶ Running intelligenceService.getBrandHealthMetrics Tests...");

  // 1. The resolved payload must satisfy the Zod schema used internally to validate it.
  const result = await intelligenceService.getBrandHealthMetrics("ws-tehran");
  const validation = BrandHealthMetricsSchema.safeParse(result);
  if (!validation.success) {
    throw new Error(`Service Test Failed: response does not satisfy BrandHealthMetricsSchema: ${validation.error.message}`);
  }

  // 2. Deterministic mock values should be surfaced exactly as defined by the service.
  if (result.sentimentScore !== 82) {
    throw new Error(`Service Test Failed: expected sentimentScore 82, got ${result.sentimentScore}`);
  }
  if (result.totalCitations !== 1420) {
    throw new Error(`Service Test Failed: expected totalCitations 1420, got ${result.totalCitations}`);
  }
  if (result.mentionVolume !== 4350) {
    throw new Error(`Service Test Failed: expected mentionVolume 4350, got ${result.mentionVolume}`);
  }
  if (result.activeAlertsCount !== 2) {
    throw new Error(`Service Test Failed: expected activeAlertsCount 2, got ${result.activeAlertsCount}`);
  }

  // 3. recentCitations must contain 3 well-formed entries with valid engine enum values.
  const allowedEngines = new Set(["ChatGPT", "Gemini", "Claude", "Perplexity"]);
  if (result.recentCitations.length !== 3) {
    throw new Error(`Service Test Failed: expected 3 recentCitations, got ${result.recentCitations.length}`);
  }
  for (const citation of result.recentCitations) {
    if (!allowedEngines.has(citation.engine)) {
      throw new Error(`Service Test Failed: unexpected citation engine "${citation.engine}"`);
    }
    try {
      new URL(citation.url);
    } catch {
      throw new Error(`Service Test Failed: citation url "${citation.url}" is not a valid URL`);
    }
  }
  const citationIds = result.recentCitations.map((c) => c.id);
  if (new Set(citationIds).size !== citationIds.length) {
    throw new Error("Service Test Failed: recentCitations contains duplicate ids");
  }

  // 4. topTopics must contain 3 entries covering the full sentiment enum space used by the mock.
  const allowedSentiments = new Set(["positive", "neutral", "negative"]);
  if (result.topTopics.length !== 3) {
    throw new Error(`Service Test Failed: expected 3 topTopics, got ${result.topTopics.length}`);
  }
  for (const topic of result.topTopics) {
    if (!allowedSentiments.has(topic.sentiment)) {
      throw new Error(`Service Test Failed: unexpected topic sentiment "${topic.sentiment}"`);
    }
    if (topic.volume < 0) {
      throw new Error(`Service Test Failed: topic volume must be nonnegative, got ${topic.volume}`);
    }
  }

  // 5. The method must resolve regardless of which tenantId string is supplied (mock is tenant-agnostic).
  const otherTenantResult = await intelligenceService.getBrandHealthMetrics("ws-another-tenant");
  const otherValidation = BrandHealthMetricsSchema.safeParse(otherTenantResult);
  if (!otherValidation.success) {
    throw new Error("Service Test Failed: response for a different tenantId failed schema validation");
  }

  // 6. The method must resolve even for an empty tenantId string, without throwing.
  await intelligenceService.getBrandHealthMetrics("");

  console.log("✅ intelligenceService.getBrandHealthMetrics Tests Passed Successfully!");
}