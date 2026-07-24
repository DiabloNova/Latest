/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Citation Intelligence Engine
 */

import { Citation } from "../domain/types";

export interface CitationFrequency {
  domain: string;
  count: number;
  percentage: number;
}

export interface CitationGraphNode {
  id: string;
  label: string;
  type: "source" | "observation" | "brand";
}

export interface CitationGraphEdge {
  sourceId: string;
  targetId: string;
  weight: number;
}

export class CitationValidator {
  /**
   * Safe pattern URL checker with basic domain format check
   */
  public isValid(url: string): boolean {
    try {
      const parsed = new URL(url);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  }
}

export class SourceAuthorityScorer {
  /**
   * Formulates a qualitative Trust Index score (0 to 100) based on domain credibility
   */
  public evaluateTrust(domain: string): number {
    const d = domain.toLowerCase();

    // Academic, government, or premium resources
    if (d.endsWith(".gov")) return 98;
    if (d.endsWith(".edu")) return 95;
    if (d.endsWith(".org")) return 75;

    const premiumDomains: Record<string, number> = {
      "wikipedia.org": 96,
      "github.com": 92,
      "reuters.com": 94,
      "nytimes.com": 92,
      "bloomberg.com": 90,
      "techcrunch.com": 85,
      "medium.com": 70
    };

    for (const [key, score] of Object.entries(premiumDomains)) {
      if (d === key || d.endsWith("." + key)) {
        return score;
      }
    }

    return 55; // Default standard web authority
  }
}

export class CitationGraphBuilder {
  /**
   * Dynamically compiles a structural Citation Linkage Network showing how references link with observations
   */
  public buildGraph(citations: Citation[], brandId: string): { nodes: CitationGraphNode[]; edges: CitationGraphEdge[] } {
    const nodes: CitationGraphNode[] = [{ id: brandId, label: "Monitored Brand", type: "brand" }];
    const edges: CitationGraphEdge[] = [];

    const domainsAdded = new Set<string>();

    for (const cit of citations) {
      // 1. Add Observation Node if not present
      const obsNodeId = cit.observationId;
      if (!nodes.find(n => n.id === obsNodeId)) {
        nodes.push({ id: obsNodeId, label: `AI Response`, type: "observation" });
        // Link observation with the target brand
        edges.push({ sourceId: obsNodeId, targetId: brandId, weight: 1.0 });
      }

      // 2. Add Source Domain Node
      const domainId = `domain-${cit.domain}`;
      if (!domainsAdded.has(domainId)) {
        nodes.push({ id: domainId, label: cit.domain, type: "source" });
        domainsAdded.add(domainId);
      }

      // Link Source Domain with AI Response
      edges.push({
        sourceId: domainId,
        targetId: obsNodeId,
        weight: cit.authorityScore / 100
      });
    }

    return { nodes, edges };
  }
}
