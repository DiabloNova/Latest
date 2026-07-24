/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Brand Intelligence Workspace Management
 */

import { AuditMetadata } from "../domain/types";

export interface CompetitorTrack {
  id: string;
  name: string;
  website: string;
  industry?: string;
  country?: string;
  trackingPriority: "low" | "medium" | "high";
}

export interface WorkspaceGoal {
  id: string;
  category: string; // e.g. "Citation Density", "AEO Visibility"
  metric: string; // e.g. "overallScore"
  targetValue: number;
  achievedValue?: number;
  deadline?: string;
}

export interface BrandWorkspace {
  id: string; // workspace ID matching organizationId or sub-brand namespace
  organizationId: string;
  brandId: string;
  competitors: CompetitorTrack[];
  entityPortfolioIds: string[]; // Claimed Wikidata entities Q-codes
  goals: WorkspaceGoal[];
  audit: AuditMetadata;
}

export class BrandWorkspaceManager {
  private workspaces: Map<string, BrandWorkspace> = new Map();

  public saveWorkspace(workspace: BrandWorkspace): BrandWorkspace {
    this.workspaces.set(workspace.id, workspace);
    return workspace;
  }

  public getWorkspace(organizationId: string, id: string): BrandWorkspace | null {
    const ws = this.workspaces.get(id);
    if (!ws || ws.organizationId !== organizationId) return null;
    return ws;
  }

  public findByBrandId(organizationId: string, brandId: string): BrandWorkspace | null {
    return Array.from(this.workspaces.values()).find(
      ws => ws.organizationId === organizationId && ws.brandId === brandId
    ) || null;
  }

  /**
   * Safe competitor onboarding use case
   */
  public addCompetitor(
    organizationId: string,
    workspaceId: string,
    competitor: CompetitorTrack,
    actorId = "system"
  ): BrandWorkspace {
    const ws = this.getWorkspace(organizationId, workspaceId);
    if (!ws) {
      throw new Error(`Workspace ${workspaceId} not found under tenant context ${organizationId}`);
    }

    // Deduplicate
    ws.competitors = ws.competitors.filter(c => c.id !== competitor.id);
    ws.competitors.push(competitor);

    ws.audit.updatedAt = new Date().toISOString();
    ws.audit.updatedBy = actorId;
    ws.audit.version++;

    this.workspaces.set(workspaceId, ws);
    return ws;
  }

  /**
   * Claim and claim entities into the organization portfolio
   */
  public claimEntity(
    organizationId: string,
    workspaceId: string,
    entityId: string,
    actorId = "system"
  ): BrandWorkspace {
    const ws = this.getWorkspace(organizationId, workspaceId);
    if (!ws) {
      throw new Error(`Workspace ${workspaceId} not found under tenant context ${organizationId}`);
    }

    if (!ws.entityPortfolioIds.includes(entityId)) {
      ws.entityPortfolioIds.push(entityId);
    }

    ws.audit.updatedAt = new Date().toISOString();
    ws.audit.updatedBy = actorId;
    ws.audit.version++;

    this.workspaces.set(workspaceId, ws);
    return ws;
  }
}
