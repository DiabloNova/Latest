/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Comprehensive SaaS Platform Operating Layer Integration Tests
 */

import {
  CampaignLifecycleManager,
  CampaignScheduler,
  Campaign,
  BrandWorkspaceManager,
  WorkspaceGoal,
  CompetitorTrack,
  VisibilityAnalyticsService,
  AIEngineAnalyticsService,
  CitationAnalyticsService,
  RecommendationEngine,
  NotificationDeliverer,
  QuotaManager,
  db
} from "../../../../src/features/ai-intelligence";

function runTest(name: string, testFn: () => void | Promise<void>) {
  console.log(`\n=== Running Platform Test: ${name} ===`);
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

// 1. Campaign Lifecycle & Scheduling
runTest("Campaign Creation, Transitions & Scheduling", () => {
  const lifecycle = new CampaignLifecycleManager();
  const scheduler = new CampaignScheduler();

  const tenantId = "org-enterprise-01";
  const campaign: Campaign = {
    id: "camp-001",
    organizationId: tenantId,
    brandId: "brand-acme-01",
    name: "GEO Competitor Push",
    status: "draft",
    engines: ["ChatGPT", "Claude"],
    promptIds: ["prompt-1"],
    frequency: "daily",
    goals: { targetScore: 85 },
    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin",
      version: 1
    }
  };

  lifecycle.save(campaign);

  // Transition to active
  const active = lifecycle.transitionStatus(tenantId, "camp-001", "active");
  if (active.status !== "active") throw new Error("Campaign status transition failed");

  // Schedule run check
  scheduler.schedule(active);
  const nextRun = scheduler.getNextRun("camp-001");
  console.log(`  * Active Campaign next execution scheduled at: ${nextRun}`);
  if (!nextRun) throw new Error("Scheduler failed to log next run duration");
});

// 2. Brand Workspace & Competitors List
runTest("Brand Intelligence Workspace, Competitors & Claimed Entities", () => {
  const manager = new BrandWorkspaceManager();
  const tenantId = "org-enterprise-01";
  const wsId = "ws-01";

  const goal: WorkspaceGoal = {
    id: "g-1",
    category: "AEO Visibility",
    metric: "overallScore",
    targetValue: 80
  };

  manager.saveWorkspace({
    id: wsId,
    organizationId: tenantId,
    brandId: "brand-acme-01",
    competitors: [],
    entityPortfolioIds: [],
    goals: [goal],
    audit: {
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: "admin",
      updatedBy: "admin",
      version: 1
    }
  });

  // Onboard competitor
  const competitor: CompetitorTrack = {
    id: "comp-99",
    name: "CompetitorY",
    website: "https://competitory.io",
    trackingPriority: "high"
  };

  const ws = manager.addCompetitor(tenantId, wsId, competitor);
  if (ws.competitors.length !== 1 || ws.competitors[0].name !== "CompetitorY") {
    throw new Error("Competitor mapping failed inside Brand Workspace");
  }

  // Claim Wikidata entity node
  const updatedWs = manager.claimEntity(tenantId, wsId, "Q111999222");
  if (!updatedWs.entityPortfolioIds.includes("Q111999222")) {
    throw new Error("Wikidata portfolio claims mapping failed inside workspace");
  }

  console.log(`  * Claimed Portfolio size: ${updatedWs.entityPortfolioIds.length}`);
});

// 3. Analytics Aggregations
runTest("Read-Optimized Analytics Summaries & Trends Calculations", () => {
  const visAnalytics = new VisibilityAnalyticsService();
  const citationAnalytics = new CitationAnalyticsService();
  const engineAnalytics = new AIEngineAnalyticsService();

  const scores = Array.from(db.visibilityScores.values());
  const citations = Array.from(db.citations.values());

  // Trend coordinates compile
  const trendPoints = visAnalytics.compileTrends(scores);
  console.log(`  * Compiled Visibility Trends Points count: ${trendPoints.length}`);
  if (trendPoints.length === 0) throw new Error("Vis analytics trend extraction failed");

  // Growth shifts compile
  const growth = visAnalytics.calculateGrowthRatio(scores);
  console.log(`  * Vis compiled Growth percentage: ${growth}%`);

  // Citation share by domain
  const domainShare = citationAnalytics.compileDomainMetrics(citations);
  if (domainShare.length > 0) {
    console.log(`  * Top Cited Domain: "${domainShare[0].domain}" with frequency count ${domainShare[0].count}`);
  }

  // Engine Performance contrast
  const summary = engineAnalytics.compileEngineContrasts(scores);
  if (summary.length > 0) {
    console.log(`  * Engine Visibility Contrast (id: ${summary[0].engineId}): avg ${summary[0].averageScore}%`);
  }
});

// 4. Recommendation Engines Diagnoses
runTest("Automatic Diagnostics and Score Gaps Evaluation", () => {
  const engine = new RecommendationEngine();
  const tenantId = "org-enterprise-01";
  const scores = Array.from(db.visibilityScores.values());

  // Generate target recommendation based on low visibility
  const unclaimed = [
    {
      id: "ent-unclaimed-1",
      organizationId: tenantId,
      brandId: "brand-acme-01",
      name: "Unclaimed Entity",
      type: "Product",
      confidence: { score: 0.5, rating: "low" as const },
      audit: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "system",
        updatedBy: "system",
        version: 1
      }
    }
  ];

  const recommendations = engine.generateTargetedRecommendations(
    tenantId,
    "brand-acme-01",
    scores,
    unclaimed,
    [],
    95 // targetGoal set high to ensure gaps triggering recommendations
  );

  console.log(`  * Autonomously generated diagnostic recommendations: ${recommendations.length}`);
  if (recommendations.length === 0) {
    throw new Error("RecommendationEngine failed to generate targeted gap recommendations");
  }
});

// 5. SaaS Quota Metering & Limits
runTest("Multi-Tenant Usage Quota Limits & Billing Blocks", () => {
  const billing = new QuotaManager();
  const tenantId = "org-free-tenant-05";

  // Under free plan
  billing.recordUsage(tenantId, "crawled_pages", 40, "free");
  billing.recordUsage(tenantId, "crawled_pages", 5, "free");

  const consumption = billing.getUsage(tenantId, "crawled_pages");
  console.log(`  * Legitimate Free Tenant consumption: ${consumption}/50 pages`);
  if (consumption !== 45) throw new Error("Quota increment mismatch");

  // Attempting to exceed free limits must throw a Billing Exception
  try {
    billing.recordUsage(tenantId, "crawled_pages", 10, "free"); // Exceeds 50 max pages limit
    throw new Error("Should have thrown error on free plan quota overflow");
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (!errMsg.includes("Billing Exception")) {
      throw new Error(`Expected Billing Exception, got: ${errMsg}`);
    }
    console.log(`  * Safely captured Billing Exception: "${errMsg}"`);
  }
});

// 6. Multi-Channel Notification triggers
runTest("Notification Deliveries & Trigger Alerts Rules Routing", async () => {
  const deliverer = new NotificationDeliverer();
  const tenantId = "org-enterprise-01";

  // Deliver alert
  await deliverer.deliver(
    tenantId,
    "Webhook",
    "Visibility Alert: Score dropped below 60%",
    "Diagnostic alert payload forwarding. Dynamic visibility score fell to 45% on Claude execution."
  );

  const history = deliverer.getHistory();
  if (history.length !== 1 || history[0].channel !== "Webhook") {
    throw new Error("Notification deliverer failed to dispatch message routes");
  }
  console.log(`  * Dispatched Notification route successfully logged!`);
});
