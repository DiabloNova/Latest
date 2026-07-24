/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Comprehensive Runtime Integration Tests
 */

import {
  OpenAIAdapter,
  WebCrawler,
  ObservationProcessor,
  VisibilityScoreEngine,
  JobQueue,
  DeadLetterQueue,
  JobWorker,
  Job,
  db,
  eventBus,
  ExecutePromptCampaignUseCase,
  ApplicationCommandHandler,
  PromptRepository
} from "../../../../src/features/ai-intelligence";

function runTest(name: string, testFn: () => void | Promise<void>) {
  console.log(`\n=== Running Runtime Test: ${name} ===`);
  try {
    const res = testFn();
    if (res instanceof Promise) {
      res.then(() => {
        console.log(`\x1b[32m%s\x1b[0m`, `✅ Passed: ${name}`);
      }).catch((err) => {
        console.error(`\x1b[31m%s\x1b[0m`, `❌ Failed: ${name}`);
        console.error(err);
        process.exit(1);
      });
    } else {
      console.log(`\x1b[32m%s\x1b[0m`, `✅ Passed: ${name}`);
    }
  } catch (err) {
    console.error(`\x1b[31m%s\x1b[0m`, `❌ Failed: ${name}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. AI Engine Adapter Mocking Test
runTest("AI Engine Provider Adapter Ingestion", async () => {
  const adapter = new OpenAIAdapter();
  const prompt = Array.from(db.prompts.values())[0];

  const response = await adapter.execute(prompt, {
    promptText: "Simulate ranking review",
    temperature: 0.5
  });

  console.log(`  * Ingested model: ${response.metadata.modelId}`);
  console.log(`  * Latency: ${response.latencyMs}ms, Cost: $${response.costUsd}`);

  if (response.latencyMs <= 0 || response.costUsd < 0) {
    throw new Error("AI Adapter computed invalid latency/cost usage records");
  }
});

// 2. Web Crawling with Robots.txt & Quotas
runTest("Web Crawler Ingestion Limits and Policies", async () => {
  const crawler = new WebCrawler();
  const tenantId = "org-enterprise-01";

  // Set quota to 1 page
  crawler.registerQuota(tenantId, 1);

  // First crawl should succeed
  const result1 = await crawler.crawl("https://legit-docs.com/pricing", tenantId);
  if (result1.statusCode !== 200 || !result1.isAllowedByRobots) {
    throw new Error("Expected successful crawl on legitimate URL");
  }

  // Blocked website crawl
  const result2 = await crawler.crawl("https://disallowed-site.com/private", tenantId);
  if (result2.isAllowedByRobots || result2.statusCode !== 403) {
    throw new Error("Crawler failed to respect robots.txt restriction policy");
  }

  // Quota overflow crawl should throw
  try {
    await crawler.crawl("https://legit-docs.com/faq", tenantId);
    throw new Error("Crawler failed to restrict page fetches exceeding tenant quota limit");
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (!errMsg.includes("Quota Exception")) {
      throw new Error(`Expected Quota Exception, got: ${errMsg}`);
    }
    console.log(`  * Caught expected crawl restriction: "${errMsg}"`);
  }
});

// 3. Multi-Stage Ingestion Pipeline & EDA Event Emission
runTest("AI Observation Multi-Stage Pipeline & EDA Routing", async () => {
  const processor = new ObservationProcessor();
  const tenantId = "org-enterprise-01";
  const prompt = Array.from(db.prompts.values())[0];

  // Subscribe listeners to verify EDA events
  const eventsCount = { captured: 0, citation: 0, calculated: 0 };

  eventBus.subscribe("aibi.observation.captured", {
    async handle() { eventsCount.captured++; },
    supports: (type) => type === "aibi.observation.captured"
  });

  eventBus.subscribe("aibi.citation.created", {
    async handle() { eventsCount.citation++; },
    supports: (type) => type === "aibi.citation.created"
  });

  eventBus.subscribe("aibi.visibility.score.calculated", {
    async handle() { eventsCount.calculated++; },
    supports: (type) => type === "aibi.visibility.score.calculated"
  });

  const aggregate = await processor.process({
    organizationId: tenantId,
    promptId: prompt.id,
    engineId: "engine-perplexity",
    responseText: "The platform Acme SaaS excels on GEO visibility according to https://wikipedia.org/wiki/Acme_SaaS.",
    rawVisibilityScore: 45, // low visibility
    sentimentScore: 78,
    confidenceScore: 0.95,
    actorId: "test-processor"
  });

  console.log(`  * Dynamic calculated visibility score: ${aggregate.calculateDynamicVisibility()}`);
  console.log(`  * Ingestion Events intercepted: ${JSON.stringify(eventsCount)}`);

  if (eventsCount.captured < 1 || eventsCount.citation < 1 || eventsCount.calculated < 1) {
    throw new Error("Ingestion pipeline failed to broadcast complete sequential EDA event list.");
  }
});

// 4. Multi-Engine Compound Brand Visibility Score Engine
runTest("Multi-Engine Compound Brand Visibility Calculations", () => {
  const scoreEngine = new VisibilityScoreEngine();

  const auditMock = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "test",
    updatedBy: "test",
    version: 1
  };

  const scores = [
    {
      id: "s-1",
      organizationId: "org-1",
      brandId: "brand-1",
      engineId: "engine-chatgpt",
      overallScore: 85,
      mentionScore: 90,
      citationScore: 80,
      authorityScore: 85,
      sentimentScore: 90,
      positionScore: 90,
      date: new Date().toISOString(),
      audit: auditMock
    },
    {
      id: "s-2",
      organizationId: "org-1",
      brandId: "brand-1",
      engineId: "engine-claude",
      overallScore: 70,
      mentionScore: 75,
      citationScore: 65,
      authorityScore: 70,
      sentimentScore: 75,
      positionScore: 80,
      date: new Date().toISOString(),
      audit: auditMock
    }
  ];

  const compoundScore = scoreEngine.calculateCompoundVisibility({
    historicalScores: scores,
    sentimentAverages: [{ score: 80, label: "positive", confidence: 0.95 }],
    entityConfidences: [{ score: 0.92, rating: "high" }],
    monitoredEnginesCount: 4 // ChatGPT + Claude = 2/4 engine representation
  });

  console.log(`  * Multi-Engine Compound Visibility: ${compoundScore}%`);
  if (compoundScore < 40 || compoundScore > 95) {
    throw new Error("Compound visibility score is mathematically out of logical ranges");
  }
});

// 5. Background Jobs Retries & Dead Letter Queue Routing
runTest("Resilient Background Workers and DLQ Redirection", async () => {
  const queue = new JobQueue();
  const dlq = new DeadLetterQueue();

  // Set ultra-low retries for fast test execution
  const worker = new JobWorker(queue, dlq, { backoffMs: 5, multiplier: 1.5 });

  const job: Job = {
    id: "job-001",
    name: "Crawl Competitor Content",
    payload: { url: "https://badsite.com" },
    attempts: 0,
    maxAttempts: 3,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  queue.push(job);

  // Processing with execution handler designed to fail
  const faultyHandler = async (j: Job) => {
    throw new Error(`Connection timed out on URL fetch: ${j.payload.url}`);
  };

  // Attempt 1 -> should fail and requeue
  await worker.processNext(faultyHandler);

  // Wait short delay and run Attempt 2 -> should fail and requeue
  await new Promise(resolve => setTimeout(resolve, 20));
  await worker.processNext(faultyHandler);

  // Wait short delay and run Attempt 3 -> should reach max attempts and route to DLQ
  await new Promise(resolve => setTimeout(resolve, 30));
  await worker.processNext(faultyHandler);

  console.log(`  * Active queue size remaining: ${queue.size()}`);
  console.log(`  * Dead Letter Queue size: ${dlq.getJobs().length}`);

  if (queue.size() !== 0 || dlq.getJobs().length !== 1) {
    throw new Error("Resilient worker failed to redirect permanently failed job to DLQ.");
  }

  const failedRecord = dlq.getJobs()[0];
  if (failedRecord.error !== "Connection timed out on URL fetch: https://badsite.com") {
    throw new Error("DLQ job context lost error logs");
  }
});

// 6. Use Case Prompt Campaign execution
runTest("ExecutePromptCampaignUseCase Workflow Ingestion", async () => {
  const commandHandler = new ApplicationCommandHandler();
  const promptRepo = new PromptRepository();
  const campaignUseCase = new ExecutePromptCampaignUseCase(promptRepo, commandHandler);

  const tenantId = "org-enterprise-01";
  const brandId = "brand-acme-01";

  const responses = await campaignUseCase.executeCampaign(tenantId, brandId, {
    industry: "SaaS",
    country: "US"
  });

  console.log(`  * Ingested Observation Campaigns Processed: ${responses.length}`);
  if (responses.length === 0) {
    throw new Error("ExecutePromptCampaignUseCase failed to process model tracks");
  }
});
