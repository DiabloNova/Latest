/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Comprehensive Enterprise Test Runner Suite
 */

import { Pool } from "pg";
import { db } from "../../../src/features/ai-intelligence/repositories";
import { testDomain } from "./domain.test";
import { testSecurity } from "./security.test";
import { testApplication } from "./application.test";
import { testEvents } from "./events.test";

// Global Pool.query mock to intercept queries for local offline TSX run checks
(Pool.prototype as any).query = async function(sql: string, params: unknown[] = []) {
  const normalizedSql = sql.toLowerCase();

  if (normalizedSql.includes("select version from organizations")) {
    const orgId = params[0] as string;
    const org = db.organizations.get(orgId);
    if (org) {
      return { rowCount: 1, rows: [{ version: org.audit.version }] };
    }
    return { rowCount: 0, rows: [] };
  }

  if (normalizedSql.includes("select id, name, slug")) {
    const orgId = params[0] as string;
    const org = db.organizations.get(orgId);
    if (org && !org.audit.deletedAt) {
      return {
        rowCount: 1,
        rows: [{
          id: org.id,
          name: org.name,
          slug: org.slug,
          plan: org.plan,
          created_at: org.audit.createdAt,
          updated_at: org.audit.updatedAt,
          created_by: org.audit.createdBy,
          updated_by: org.audit.updatedBy,
          deleted_at: org.audit.deletedAt,
          version: org.audit.version
        }]
      };
    }
    return { rowCount: 0, rows: [] };
  }

  if (normalizedSql.includes("insert into organizations")) {
    const [id, name, slug, plan, created_at, updated_at, created_by, updated_by, version] = params as any[];
    db.organizations.set(id, {
      id,
      name,
      slug,
      plan,
      audit: {
        createdAt: created_at,
        updatedAt: updated_at,
        createdBy: created_by,
        updatedBy: updated_by,
        version
      }
    });
    return { rowCount: 1, rows: [] };
  }

  if (normalizedSql.includes("update organizations")) {
    if (normalizedSql.includes("deleted_at")) {
      const [deletedAt, deletedBy, updatedAt, id] = params as any[];
      const org = db.organizations.get(id);
      if (org) {
        org.audit.deletedAt = deletedAt;
        org.audit.updatedBy = deletedBy;
        org.audit.updatedAt = updatedAt;
        return { rowCount: 1, rows: [] };
      }
      return { rowCount: 0, rows: [] };
    } else {
      const [name, slug, plan, updatedAt, updatedBy, version, id] = params as any[];
      const org = db.organizations.get(id);
      if (org) {
        org.name = name;
        org.slug = slug;
        org.plan = plan;
        org.audit.updatedAt = updatedAt;
        org.audit.updatedBy = updatedBy;
        org.audit.version = version;
        return { rowCount: 1, rows: [] };
      }
      return { rowCount: 0, rows: [] };
    }
  }

  return { rowCount: 0, rows: [] };
};

async function main() {
  console.log("====================================================");
  console.log("🚀 Starting Enterprise Platform Architecture Tests...");
  console.log("====================================================");

  try {
    testDomain();
    await testSecurity();
    await testApplication();
    testEvents();

    // Allow asynchronous event bus execution to complete before final status log
    setTimeout(() => {
      console.log("\n====================================================");
      console.log("🎉 ALL ENTERPRISE TEST SUITES PASSED SECURELY!");
      console.log("====================================================");
    }, 100);

  } catch (error) {
    console.error("\n❌ TEST SUITE RUNNER FAILURE:", error);
    process.exit(1);
  }
}

main();
