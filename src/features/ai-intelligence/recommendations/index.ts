/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Recommendation Intelligence Engine
 */

import { Recommendation, PriorityLevel, Entity, Citation, VisibilityScore } from "../domain/types";

export class RecommendationPriorityCalculator {
  /**
   * Safe rating prioritizer based on target gaps and score deviations
   */
  public calculate(currentScore: number, targetScore: number): PriorityLevel {
    const gap = targetScore - currentScore;
    if (gap >= 25) return "high";
    if (gap >= 10) return "medium";
    return "low";
  }
}

export class RecommendationImpactEstimator {
  /**
   * Evaluates potential visibility index lift (0-100) based on category action type
   */
  public estimateLift(category: string): number {
    switch (category) {
      case "Citation Authority":
        return 15; // Claiming reference links grants highest citation score lift
      case "Entity Linking":
        return 10; // Claiming Wikidata properties anchors LLM graph matches
      case "Competitive Countering":
        return 8; // Adjusting product specs countering competitor advantages
      default:
        return 5;
    }
  }
}

export class RecommendationEngine {
  private priorityCalc = new RecommendationPriorityCalculator();
  private impactEstimator = new RecommendationImpactEstimator();

  /**
   * Evaluates brand analytics snapshots to generate actionable optimization tasks
   */
  public generateTargetedRecommendations(
    organizationId: string,
    brandId: string,
    scores: VisibilityScore[],
    unclaimedEntities: Entity[],
    missingCitations: Citation[],
    targetGoal = 85
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    if (scores.length === 0) return [];

    // 1. Calculate Average Current overall visibility
    const avgScore = scores.reduce((sum, s) => sum + s.overallScore, 0) / scores.length;

    // Gap check
    if (avgScore < targetGoal) {
      const priority = this.priorityCalc.calculate(avgScore, targetGoal);

      // 2. Evaluation: Check unclaimed entities
      for (const entity of unclaimedEntities) {
        recommendations.push({
          id: `rec-auto-${Math.random().toString(36).substr(2, 9)}`,
          organizationId,
          brandId,
          category: "Entity Linking",
          priority,
          impactScore: this.impactEstimator.estimateLift("Entity"),
          description: `Optimize Wikidata Claim: Mapped unclaimed entity "${entity.name}" (Type: ${entity.type}). claim properties to anchor model presence.`,
          status: "pending",
          audit: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: "recommendation-engine",
            updatedBy: "recommendation-engine",
            version: 1
          }
        });
      }

      // 3. Evaluation: Check missing citations
      if (missingCitations.length > 0) {
        recommendations.push({
          id: `rec-auto-${Math.random().toString(36).substr(2, 9)}`,
          organizationId,
          brandId,
          category: "Citation Authority",
          priority,
          impactScore: this.impactEstimator.estimateLift("Citation Authority"),
          description: `Build backlink references from high Domain Authority source "${missingCitations[0].domain}" to repair model retrieval omissions.`,
          status: "pending",
          audit: {
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            createdBy: "recommendation-engine",
            updatedBy: "recommendation-engine",
            version: 1
          }
        });
      }
    }

    return recommendations;
  }
}
