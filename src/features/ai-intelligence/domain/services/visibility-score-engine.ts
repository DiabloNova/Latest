/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Decoupled Brand Visibility Score Engine
 */

import { VisibilityScore, SentimentVO, ConfidenceVO } from "../types";

export interface ScoreEngineInput {
  historicalScores: VisibilityScore[];
  sentimentAverages: SentimentVO[];
  entityConfidences: ConfidenceVO[];
  monitoredEnginesCount: number; // number of engines actively tracked
}

export class VisibilityScoreEngine {
  /**
   * Pure calculation formula to determine compound Multi-Engine Brand Visibility
   * Ensures zero DB dependencies or outside mutations.
   */
  public calculateCompoundVisibility(input: ScoreEngineInput): number {
    const { historicalScores, sentimentAverages, entityConfidences, monitoredEnginesCount } = input;

    if (historicalScores.length === 0) return 0;

    // 1. Average of raw overall visibility scores (max 50 points weight)
    const rawScoresAvg = historicalScores.reduce((sum, s) => sum + s.overallScore, 0) / historicalScores.length;
    const scoreFactor = rawScoresAvg * 0.50;

    // 2. Sentiment quality factor (max 20 points weight)
    let sentimentFactor = 10; // neutral default
    if (sentimentAverages.length > 0) {
      const avgSentimentScore = sentimentAverages.reduce((sum, s) => sum + s.score, 0) / sentimentAverages.length;
      // map -100 to +100 range into 0 to 20 range
      sentimentFactor = ((avgSentimentScore + 100) / 200) * 20;
    }

    // 3. Entity linking confidence (max 20 points weight)
    let confidenceFactor = 15; // default high
    if (entityConfidences.length > 0) {
      const avgConfidence = entityConfidences.reduce((sum, c) => sum + c.score, 0) / entityConfidences.length;
      confidenceFactor = avgConfidence * 20;
    }

    // 4. Engine Coverage Multiplier (max 10 points weight)
    // If brand is present on all 4 platform engines, reward it!
    const uniqueEnginesWithData = new Set(historicalScores.map(s => s.engineId)).size;
    const engineCoverageRatio = monitoredEnginesCount > 0
      ? Math.min(uniqueEnginesWithData / monitoredEnginesCount, 1.0)
      : 0;
    const coverageFactor = engineCoverageRatio * 10;

    const finalCompositeScore = Math.round(scoreFactor + sentimentFactor + confidenceFactor + coverageFactor);

    // Enforce Domain Boundaries
    return Math.min(Math.max(finalCompositeScore, 0), 100);
  }
}
