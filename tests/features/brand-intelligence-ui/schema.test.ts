/**
 * Brand Intelligence UI — Zod Schema Validation Tests
 * Covers: src/schemas/intelligence.ts (BrandHealthMetricsSchema)
 */

import { BrandHealthMetricsSchema } from "../../../src/schemas/intelligence";

const validPayload = {
  sentimentScore: 82,
  sentimentChange: "+1.2%",
  mentionVolume: 4350,
  mentionVolumeChange: "+3.4%",
  totalCitations: 1420,
  totalCitationsChange: "+12.4%",
  activeAlertsCount: 2,
  topTopics: [
    { topic: "Tehran Customer Support", sentiment: "positive" as const, volume: 1200 },
    { topic: "Digikala Delivery Speed", sentiment: "neutral" as const, volume: 950 },
    { topic: "Cloud Services Pricing", sentiment: "negative" as const, volume: 320 },
  ],
  recentCitations: [
    {
      id: "cit-1",
      engine: "Perplexity" as const,
      query: "Top logistics providers in Iran",
      status: "Verified Citation",
      url: "https://tehranlogistics.ir/services",
      time: "10m ago",
    },
  ],
};

export function testBrandHealthMetricsSchema() {
  console.log("▶ Running BrandHealthMetricsSchema Tests...");

  // 1. A fully valid payload should parse without throwing and preserve values.
  const parsed = BrandHealthMetricsSchema.parse(validPayload);
  if (parsed.sentimentScore !== 82) {
    throw new Error(`Schema Test Failed: expected sentimentScore 82, got ${parsed.sentimentScore}`);
  }
  if (parsed.recentCitations.length !== 1 || parsed.recentCitations[0].engine !== "Perplexity") {
    throw new Error("Schema Test Failed: recentCitations did not round-trip correctly");
  }
  if (parsed.topTopics.length !== 3) {
    throw new Error(`Schema Test Failed: expected 3 topTopics, got ${parsed.topTopics.length}`);
  }

  // 2. Empty arrays for topTopics/recentCitations are valid (no minimum length enforced).
  const emptyArrays = BrandHealthMetricsSchema.parse({
    ...validPayload,
    topTopics: [],
    recentCitations: [],
  });
  if (emptyArrays.topTopics.length !== 0 || emptyArrays.recentCitations.length !== 0) {
    throw new Error("Schema Test Failed: empty arrays should be permitted for topTopics/recentCitations");
  }

  // 3. sentimentScore below the 0..100 bound must be rejected.
  const belowMin = BrandHealthMetricsSchema.safeParse({ ...validPayload, sentimentScore: -1 });
  if (belowMin.success) {
    throw new Error("Schema Test Failed: sentimentScore below 0 should fail validation");
  }

  // 4. sentimentScore above the 0..100 bound must be rejected.
  const aboveMax = BrandHealthMetricsSchema.safeParse({ ...validPayload, sentimentScore: 101 });
  if (aboveMax.success) {
    throw new Error("Schema Test Failed: sentimentScore above 100 should fail validation");
  }

  // 5. Negative nonnegative() fields (totalCitations, mentionVolume, activeAlertsCount) must be rejected.
  const negativeCitations = BrandHealthMetricsSchema.safeParse({ ...validPayload, totalCitations: -5 });
  if (negativeCitations.success) {
    throw new Error("Schema Test Failed: negative totalCitations should fail validation");
  }

  const negativeAlerts = BrandHealthMetricsSchema.safeParse({ ...validPayload, activeAlertsCount: -1 });
  if (negativeAlerts.success) {
    throw new Error("Schema Test Failed: negative activeAlertsCount should fail validation");
  }

  // 6. Invalid topic sentiment enum value must be rejected.
  const invalidTopicSentiment = BrandHealthMetricsSchema.safeParse({
    ...validPayload,
    topTopics: [{ topic: "Something", sentiment: "mixed", volume: 10 }],
  });
  if (invalidTopicSentiment.success) {
    throw new Error("Schema Test Failed: invalid topTopics.sentiment enum should fail validation");
  }

  // 7. Invalid citation engine enum value must be rejected.
  const invalidEngine = BrandHealthMetricsSchema.safeParse({
    ...validPayload,
    recentCitations: [{ ...validPayload.recentCitations[0], engine: "Bing" }],
  });
  if (invalidEngine.success) {
    throw new Error("Schema Test Failed: invalid recentCitations.engine enum should fail validation");
  }

  // 8. Malformed citation URL must be rejected.
  const invalidUrl = BrandHealthMetricsSchema.safeParse({
    ...validPayload,
    recentCitations: [{ ...validPayload.recentCitations[0], url: "not-a-valid-url" }],
  });
  if (invalidUrl.success) {
    throw new Error("Schema Test Failed: malformed citation url should fail validation");
  }

  // 9. Missing required top-level field must be rejected.
  const { sentimentChange: _omit, ...missingField } = validPayload;
  void _omit;
  const missingRequired = BrandHealthMetricsSchema.safeParse(missingField);
  if (missingRequired.success) {
    throw new Error("Schema Test Failed: missing required field sentimentChange should fail validation");
  }

  // 10. Wrong type for a numeric field must be rejected.
  const wrongType = BrandHealthMetricsSchema.safeParse({ ...validPayload, mentionVolume: "4350" });
  if (wrongType.success) {
    throw new Error("Schema Test Failed: string value for numeric field mentionVolume should fail validation");
  }

  console.log("✅ BrandHealthMetricsSchema Tests Passed Successfully!");
}