/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Read-Optimized Analytics Aggregation Services
 */

import { VisibilityScore, Citation } from "../domain/types";

export interface AnalyticsTrendPoint {
  date: string;
  overallScore: number;
}

export class VisibilityAnalyticsService {
  /**
   * Compiles historical visibility scores into chronological coordinate lists for charting
   */
  public compileTrends(scores: VisibilityScore[]): AnalyticsTrendPoint[] {
    const sorted = [...scores].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return sorted.map(s => ({
      date: typeof s.date === "string" ? s.date.split("T")[0] : s.date.toISOString().split("T")[0],
      overallScore: s.overallScore
    }));
  }

  /**
   * Calculates the percentage growth/shrinkage of visibility index over time
   */
  public calculateGrowthRatio(scores: VisibilityScore[]): number {
    if (scores.length < 2) return 0.0;
    const sorted = [...scores].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const first = sorted[0].overallScore;
    const last = sorted[sorted.length - 1].overallScore;
    if (first === 0) return 0.0;

    return Math.round(((last - first) / first) * 100);
  }
}

export interface DomainFrequencyPoint {
  domain: string;
  count: number;
  averageAuthority: number;
}

export class CitationAnalyticsService {
  /**
   * Group citations list by domain name to find frequency occurrences and average authorities
   */
  public compileDomainMetrics(citations: Citation[]): DomainFrequencyPoint[] {
    const registry: Map<string, { count: number; sumAuth: number }> = new Map();

    for (const c of citations) {
      const stats = registry.get(c.domain) || { count: 0, sumAuth: 0 };
      stats.count++;
      stats.sumAuth += c.authorityScore;
      registry.set(c.domain, stats);
    }

    return Array.from(registry.entries()).map(([domain, stats]) => ({
      domain,
      count: stats.count,
      averageAuthority: Math.round(stats.sumAuth / stats.count)
    })).sort((a, b) => b.count - a.count);
  }
}

export interface EngineVisibilitySummary {
  engineId: string;
  averageScore: number;
  coveragePercentage: number;
}

export class AIEngineAnalyticsService {
  /**
   * contrasts visibilities across platform engines (e.g. ChatGPT vs Claude)
   */
  public compileEngineContrasts(scores: VisibilityScore[], expectedEnginesCount = 4): EngineVisibilitySummary[] {
    const registry: Map<string, number[]> = new Map();

    for (const s of scores) {
      const list = registry.get(s.engineId) || [];
      list.push(s.overallScore);
      registry.set(s.engineId, list);
    }

    const uniqueEnginesWithData = registry.size;
    const coveragePercentage = expectedEnginesCount > 0
      ? Math.round((uniqueEnginesWithData / expectedEnginesCount) * 100)
      : 0;

    return Array.from(registry.entries()).map(([engineId, list]) => ({
      engineId,
      averageScore: Math.round(list.reduce((sum, val) => sum + val, 0) / list.length),
      coveragePercentage
    }));
  }
}
