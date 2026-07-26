/**
 * Brand Intelligence UI / Localization — Comprehensive Test Runner Suite
 *
 * Covers the changes introduced by the locale ([locale] routing), premium
 * RTL Persian layout, Vazirmatn font, and Zod-backed brand health metrics
 * fetching PR.
 */

import { testBrandHealthMetricsSchema } from "./schema.test";
import { testIntelligenceServiceBrandHealthMetrics } from "./service.test";
import { testProxyMiddleware } from "./proxy.test";
import { testThemeProviderInitialLanguage } from "./components/theme-provider.test";
import { testBreadcrumbRendering } from "./components/breadcrumb.test";
import { testTabsRendering } from "./components/tabs.test";
import { testDropdownRendering } from "./components/dropdown.test";

async function main() {
  console.log("====================================================");
  console.log("🚀 Starting Brand Intelligence UI / Localization Tests...");
  console.log("====================================================");

  try {
    testBrandHealthMetricsSchema();
    await testIntelligenceServiceBrandHealthMetrics();
    testProxyMiddleware();
    testThemeProviderInitialLanguage();
    testBreadcrumbRendering();
    testTabsRendering();
    testDropdownRendering();

    console.log("\n====================================================");
    console.log("🎉 ALL BRAND INTELLIGENCE UI TESTS PASSED SUCCESSFULLY!");
    console.log("====================================================");
  } catch (error) {
    console.error("\n❌ TEST SUITE RUNNER FAILURE:", error);
    process.exit(1);
  }
}

main();