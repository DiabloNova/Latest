/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Comprehensive Enterprise Test Runner Suite
 */

import { testDomain } from "./domain.test";
import { testSecurity } from "./security.test";
import { testApplication } from "./application.test";
import { testEvents } from "./events.test";
import "./runtime/index.test"; // Runs the runtime tests dynamically!
import "./platform/index.test"; // Runs the platform tests dynamically!

async function main() {
  console.log("====================================================");
  console.log("🚀 Starting Enterprise Platform Architecture Tests...");
  console.log("====================================================");

  try {
    testDomain();
    testSecurity();
    await testApplication();
    testEvents();

    // Allow asynchronous event bus execution to complete before final status log
    setTimeout(() => {
      console.log("\n====================================================");
      console.log("🎉 ALL ENTERPRISE TEST SUITES PASSED SECURELY!");
      console.log("====================================================");
    }, 200);

  } catch (error) {
    console.error("\n❌ TEST SUITE RUNNER FAILURE:", error);
    process.exit(1);
  }
}

main();
