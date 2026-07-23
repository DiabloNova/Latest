/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Verification Test Script
 */

import { BrandEntity } from "../src/features/ai-intelligence/domain/entities/brand-entity";
import { ObservationAggregate } from "../src/features/ai-intelligence/domain/models/observation-aggregate";
import {
  CitationService,
  VisibilityService,
  ObservationService,
  db
} from "../src/features/ai-intelligence";

function runTest(name: string, testFn: () => void | Promise<void>) {
  console.log(`\n=== Running Test: ${name} ===`);
  try {
    const res = testFn();
    if (res instanceof Promise) {
      res.then(() => {
        console.log(`✅ Passed: ${name}`);
      }).catch((err) => {
        console.error(`❌ Failed: ${name}`);
        console.error(err);
        process.exit(1);
      });
    } else {
      console.log(`✅ Passed: ${name}`);
    }
  } catch (err) {
    console.error(`❌ Failed: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. BrandEntity Validation Test
runTest("BrandEntity Validation & Construction", () => {
  // Valid construction
  const validBrand = BrandEntity.create({
    id: "brand-test-99",
    organizationId: "org-enterprise-01",
    name: "Valid Test Brand",
    website: "https://validbrand.io",
    industry: "E-Commerce",
    country: "US",
    createdAt: new Date().toISOString()
  });

  if (validBrand.name !== "Valid Test Brand") {
    throw new Error("BrandEntity name mismatch");
  }

  // Invalid construction should throw
  try {
    BrandEntity.create({
      id: "", // invalid empty ID
      organizationId: "org-01",
      name: "Incomplete Brand",
      website: "ftp://not-http-url", // invalid URL protocol
      createdAt: new Date().toISOString()
    });
    throw new Error("Should have thrown error on invalid website protocol");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (!message.includes("Domain Validation Failed")) {
      throw new Error(`Expected domain validation failure, got: ${message}`);
    }
    console.log("-> Successfully caught invalid brand creation: " + message);
  }
});

// 2. CitationService Authority Calculations
runTest("CitationService Domain Authority Calculations", () => {
  const citationService = new CitationService();

  const govScore = citationService.calculateAuthorityScore("https://whitehouse.gov/news/latest");
  const eduScore = citationService.calculateAuthorityScore("https://stanford.edu/research/paper.pdf");
  const wikiScore = citationService.calculateAuthorityScore("https://en.wikipedia.org/wiki/Artificial_intelligence");
  const randomScore = citationService.calculateAuthorityScore("https://myrandomblog.io/article-one");

  console.log(`-> .gov score: ${govScore} (expected 98)`);
  console.log(`-> .edu score: ${eduScore} (expected 95)`);
  console.log(`-> Wikipedia score: ${wikiScore} (expected 96)`);
  console.log(`-> Random blog score: ${randomScore} (expected 65)`);

  if (govScore !== 98) throw new Error("Gov authority score incorrect");
  if (eduScore !== 95) throw new Error("Edu authority score incorrect");
  if (wikiScore !== 96) throw new Error("Wikipedia authority score incorrect");
  if (randomScore !== 65) throw new Error("Random .io score incorrect");
});

// 3. ObservationAggregate Dynamic Metrics Calculation
runTest("ObservationAggregate Dynamic Metrics Calculation", () => {
  const mockObs = {
    id: "obs-test",
    promptId: "prompt-test",
    engineId: "engine-test",
    responseText: "This is a response text.",
    visibilityScore: 80,
    sentimentScore: 85,
    confidenceScore: 0.9,
    executedAt: new Date()
  };

  const mockMentions = [
    {
      id: "m-1",
      observationId: "obs-test",
      entityId: "ent-1",
      position: 10,
      context: "Acme SaaS",
      sentiment: "positive" as const,
      confidence: 0.95
    }
  ];

  const mockCitations = [
    {
      id: "cit-1",
      observationId: "obs-test",
      url: "https://acme.io",
      domain: "acme.io",
      title: "Acme",
      authorityScore: 80,
      relevanceScore: 90
    }
  ];

  const aggregate = new ObservationAggregate(mockObs, mockMentions, mockCitations);

  const dynamicVisibility = aggregate.calculateDynamicVisibility();
  console.log(`-> Dynamic Visibility Score: ${dynamicVisibility}`);

  if (dynamicVisibility < 50 || dynamicVisibility > 100) {
    throw new Error("Dynamic visibility score falls out of normal bounds");
  }
});

// 4. End-to-End Observation Processing & Alert Triggering
runTest("Observation Processing & Autonomous Recommendation Actioning", async () => {
  const observationService = new ObservationService();

  // Create brand prompt to monitor
  const brandId = "brand-acme-01";
  const promptText = "Is Acme SaaS the best AEO tool?";

  const prompt = await observationService.registerPrompt(
    brandId,
    promptText,
    "GEO Testing",
    "Recommendation",
    "en",
    "high"
  );

  console.log(`-> Prompt registered: "${prompt.text}"`);

  // Process high visibility observation
  const highAggregate = await observationService.processObservation(
    prompt.id,
    "engine-chatgpt",
    "Yes, Acme SaaS is highly recommended because of its citation authority at https://wikipedia.org/wiki/Acme_SaaS.",
    85, // visibility
    90, // sentiment
    0.95
  );

  console.log(`-> High-visibility execution score: ${highAggregate.calculateDynamicVisibility()}`);
  if (highAggregate.mentions.length !== 1) {
    throw new Error("Expected 1 extracted brand mention");
  }
  if (highAggregate.citations.length !== 1) {
    throw new Error("Expected 1 extracted citation");
  }

  // Process low visibility observation which should trigger an autonomous recommendation action
  const initialRecommendationsCount = db.recommendations.size;

  const lowAggregate = await observationService.processObservation(
    prompt.id,
    "engine-claude",
    "The market has many options and we don't have enough data regarding specific optimization tools.",
    30, // low visibility score
    50, // neutral sentiment
    0.9
  );

  const lowDynamicScore = lowAggregate.calculateDynamicVisibility();
  console.log(`-> Low-visibility execution score: ${lowDynamicScore}`);
  console.log(`-> Seed recommendations count before: ${initialRecommendationsCount}`);
  console.log(`-> Database recommendations count after: ${db.recommendations.size}`);

  if (lowDynamicScore < 70 && db.recommendations.size <= initialRecommendationsCount) {
    throw new Error("Autonomous alert recommendation should have been automatically appended to the database.");
  }

  const latestRec = Array.from(db.recommendations.values()).pop();
  console.log(`-> Generated Alert Action Category: "${latestRec?.category}"`);
  console.log(`-> Generated Alert Action Details: "${latestRec?.description}"`);
});

// 5. VisibilityService Command Center Payload Aggregation
runTest("VisibilityService Dashboard Telemetry Compilation", async () => {
  const visibilityService = new VisibilityService();
  const brandId = "brand-acme-01";

  const dashboardPayload = await visibilityService.prepareDashboardData(brandId);

  console.log(`-> Overall Dashboard Visibility Score: ${dashboardPayload.overallScore}%`);
  console.log(`-> Core Score Rating Grade: "${dashboardPayload.grade}"`);
  console.log(`-> Calculated Metric Factors:`);
  dashboardPayload.factors.forEach(f => {
    console.log(`   * ${f.name}: ${f.score}`);
  });

  if (dashboardPayload.overallScore < 0 || dashboardPayload.overallScore > 100) {
    throw new Error("Aggregated overall score is out of bounds");
  }

  if (dashboardPayload.factors.length !== 4) {
    throw new Error("Expected exactly 4 dashboard KPI metric factors");
  }
});
