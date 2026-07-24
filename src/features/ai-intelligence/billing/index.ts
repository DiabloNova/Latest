/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Multi-Tenant Usage Metering & SaaS Subscription Limits
 */

import { SubscriptionPlan } from "../domain/types";

export type MeteredResource = "ai_requests" | "crawled_pages" | "prompt_executions" | "storage_kb";

export interface FeatureLimit {
  maxAIRequests: number;
  maxCrawledPages: number;
  maxPromptExecutions: number;
  maxStorageKb: number;
}

export interface UsageRecord {
  organizationId: string;
  resource: MeteredResource;
  currentConsumption: number;
}

export class QuotaManager {
  private usage: Map<string, Map<MeteredResource, number>> = new Map();

  /**
   * Safe mapping defining features allowances per SaaS Tier
   */
  public getLimits(plan: SubscriptionPlan): FeatureLimit {
    switch (plan) {
      case "enterprise":
        return {
          maxAIRequests: 100000,
          maxCrawledPages: 100000,
          maxPromptExecutions: 50000,
          maxStorageKb: 10485760 // 10 GB
        };
      case "growth":
        return {
          maxAIRequests: 2000,
          maxCrawledPages: 500,
          maxPromptExecutions: 1000,
          maxStorageKb: 1048576 // 1 GB
        };
      default: // Free Tier
        return {
          maxAIRequests: 100,
          maxCrawledPages: 50,
          maxPromptExecutions: 100,
          maxStorageKb: 102400 // 100 MB
        };
    }
  }

  /**
   * Tracks and increment multi-tenant metered resource usage, enforcing safety quotas
   */
  public recordUsage(
    organizationId: string,
    resource: MeteredResource,
    incrementBy: number,
    plan: SubscriptionPlan = "free"
  ): void {
    const limits = this.getLimits(plan);

    // Fetch or create tenant consumption map
    const tenantUsage = this.usage.get(organizationId) || new Map<MeteredResource, number>();
    const current = tenantUsage.get(resource) || 0;
    const nextVal = current + incrementBy;

    // Check boundary threshold
    let limitValue = limits.maxAIRequests;
    if (resource === "crawled_pages") limitValue = limits.maxCrawledPages;
    if (resource === "prompt_executions") limitValue = limits.maxPromptExecutions;
    if (resource === "storage_kb") limitValue = limits.maxStorageKb;

    if (nextVal > limitValue) {
      throw new Error(`Billing Exception: Usage limit exceeded for resource "${resource}" under your plan tier. Current: ${current}, Inc: ${incrementBy}, Max: ${limitValue}`);
    }

    tenantUsage.set(resource, nextVal);
    this.usage.set(organizationId, tenantUsage);
  }

  public getUsage(organizationId: string, resource: MeteredResource): number {
    return this.usage.get(organizationId)?.get(resource) || 0;
  }

  public resetUsage(organizationId: string): void {
    this.usage.delete(organizationId);
  }
}
