/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Intelligence Campaign Management Sub-Module
 */

import { AIEngineName, AuditMetadata } from "../domain/types";

export type CampaignStatus = "draft" | "active" | "completed";
export type CampaignFrequency = "daily" | "weekly" | "monthly";

export interface Campaign {
  id: string;
  organizationId: string;
  brandId: string;
  name: string;
  status: CampaignStatus;
  engines: AIEngineName[];
  promptIds: string[];
  frequency: CampaignFrequency;
  goals: { targetScore: number };
  audit: AuditMetadata;
}

export interface CampaignExecutionLog {
  id: string;
  campaignId: string;
  organizationId: string;
  startedAt: string;
  completedAt?: string;
  status: "running" | "success" | "failed";
  processedObservationsCount: number;
  costUsd: number;
  error?: string;
}

export class CampaignLifecycleManager {
  private campaigns: Map<string, Campaign> = new Map();

  public save(campaign: Campaign): Campaign {
    this.campaigns.set(campaign.id, campaign);
    return campaign;
  }

  public findById(organizationId: string, id: string): Campaign | null {
    const c = this.campaigns.get(id);
    if (!c || c.organizationId !== organizationId) return null;
    return c;
  }

  public findByBrandId(organizationId: string, brandId: string): Campaign[] {
    return Array.from(this.campaigns.values()).filter(
      c => c.organizationId === organizationId && c.brandId === brandId
    );
  }

  /**
   * Safe transition of campaign statuses
   */
  public transitionStatus(
    organizationId: string,
    campaignId: string,
    nextStatus: CampaignStatus,
    actorId = "system"
  ): Campaign {
    const campaign = this.findById(organizationId, campaignId);
    if (!campaign) {
      throw new Error(`Campaign with ID ${campaignId} not found in organization ${organizationId}`);
    }

    campaign.status = nextStatus;
    campaign.audit.updatedAt = new Date().toISOString();
    campaign.audit.updatedBy = actorId;
    campaign.audit.version++;

    this.campaigns.set(campaignId, campaign);
    return campaign;
  }
}

export class CampaignScheduler {
  private schedulerRegistry: Map<string, { nextRunAt: string; intervalMinutes: number }> = new Map();

  public schedule(campaign: Campaign): void {
    if (campaign.status !== "active") return;

    let intervalMinutes = 1440; // 24 hours
    if (campaign.frequency === "weekly") intervalMinutes = 10080;
    if (campaign.frequency === "monthly") intervalMinutes = 43200;

    const nextRunAt = new Date(Date.now() + intervalMinutes * 60000).toISOString();
    this.schedulerRegistry.set(campaign.id, { nextRunAt, intervalMinutes });
  }

  public getNextRun(campaignId: string): string | null {
    return this.schedulerRegistry.get(campaignId)?.nextRunAt || null;
  }
}
