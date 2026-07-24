/**
 * Phase 7C.5 — Enterprise Admin Operations Suite
 * Comprehensive Test Runner Suite
 */

import { testDomain } from "./domain.test";
import { testCQRS } from "./cqrs.test";
import { testSecurity } from "./security.test";
import { testInfrastructure } from "./infrastructure/persistence.test";
import { testPostgresIntegration } from "./infrastructure/postgres-integration.test";

async function main() {
  console.log("====================================================");
  console.log("🚀 Starting Enterprise Administrative Context Tests...");
  console.log("====================================================");

  try {
    testDomain();
    await testCQRS();
    testSecurity();
    await testInfrastructure();
    await testPostgresIntegration();

    // Allow asynchronous event bus execution to complete before final status log
    setTimeout(() => {
      console.log("\n====================================================");
      console.log("🎉 ALL ENTERPRISE ADMINISTRATIVE TESTS PASSED!");
      console.log("====================================================");
    }, 100);

  } catch (error) {
    console.error("\n❌ ADMIN TEST SUITE RUNNER FAILURE:", error);
    process.exit(1);
  }
}

main();
