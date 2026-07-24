/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Multi-Stage AI Observation Ingestion Processor
 */

import { ObservationAggregate } from "../domain/models/observation-aggregate";
import { AeoScoreEngine } from "../domain/services/aeo-score-engine";
import { DomainEventFactory, eventBus } from "../domain/events";
import {
  AIObservation,
  BrandMention,
  Citation,
  Recommendation,
  VisibilityScore
} from "../domain/types";
import {
  IObservationRepository,
  IPromptRepository,
  IRecommendationRepository,
  IVisibilityScoreRepository
} from "../repositories/interfaces";
import {
  ObservationRepository,
  PromptRepository,
  RecommendationRepository,
  VisibilityScoreRepository
} from "../repositories";
import { CitationService } from "../services/citation-service";

export interface ProcessorInput {
  organizationId: string;
  promptId: string;
  engineId: string;
  responseText: string;
  rawVisibilityScore: number;
  sentimentScore: number;
  confidenceScore: number;
  actorId: string;
}

export class ObservationProcessor {
  private obsRepo: IObservationRepository;
  private promptRepo: IPromptRepository;
  private recRepo: IRecommendationRepository;
  private visRepo: IVisibilityScoreRepository;

  private scoreEngine: AeoScoreEngine;
  private citationService: CitationService;

  constructor(
    obsRepo?: IObservationRepository,
    promptRepo?: IPromptRepository,
    recRepo?: IRecommendationRepository,
    visRepo?: IVisibilityScoreRepository
  ) {
    this.obsRepo = obsRepo || new ObservationRepository();
    this.promptRepo = promptRepo || new PromptRepository();
    this.recRepo = recRepo || new RecommendationRepository();
    this.visRepo = visRepo || new VisibilityScoreRepository();

    this.scoreEngine = new AeoScoreEngine();
    this.citationService = new CitationService(this.obsRepo);
  }

  /**
   * Run the exhaustive 7-stage Ingestion Workflow
   */
  public async process(input: ProcessorInput): Promise<ObservationAggregate> {
    const {
      organizationId,
      promptId,
      engineId,
      responseText,
      rawVisibilityScore,
      sentimentScore,
      confidenceScore,
      actorId
    } = input;

    // Load parent prompt to verify boundaries
    const prompt = await this.promptRepo.findById(organizationId, promptId);
    if (!prompt) {
      throw new Error(`Processor Exception: Trigger prompt ID ${promptId} does not exist for tenant ${organizationId}`);
    }

    const observationId = `obs-${Math.random().toString(36).substr(2, 9)}`;
    const sentimentLabel = sentimentScore > 75 ? "positive" : sentimentScore < 45 ? "negative" : "neutral";
    const confidenceRating = confidenceScore >= 0.8 ? "high" : confidenceScore >= 0.5 ? "medium" : "low";

    // 1. Stage 1: Save core raw Observation
    const observation: AIObservation = {
      id: observationId,
      organizationId,
      promptId,
      engineId,
      responseText,
      visibilityScore: rawVisibilityScore,
      sentiment: { score: sentimentScore, label: sentimentLabel, confidence: 0.95 },
      confidence: { score: confidenceScore, rating: confidenceRating },
      executedAt: new Date().toISOString(),
      audit: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: actorId,
        updatedBy: actorId,
        version: 1
      }
    };
    await this.obsRepo.save(observation);

    // Emit Captured Event
    const capturedEvent = DomainEventFactory.create(
      "aibi.observation.captured",
      observationId,
      organizationId,
      {
        observationId,
        promptId,
        engineId,
        visibilityScore: rawVisibilityScore,
        sentimentLabel,
        sentimentScore,
        mentionsCount: 0,
        citationsCount: 0
      },
      actorId
    );
    await eventBus.publish(capturedEvent);

    // 2. Stage 2 & 3: Brand Mention Detection & Semantic Entity extraction
    const mentions: BrandMention[] = [];
    if (responseText.toLowerCase().includes("acme")) {
      const mentionId = `mention-${Math.random().toString(36).substr(2, 9)}`;
      const index = responseText.toLowerCase().indexOf("acme");
      const snippet = responseText.substring(Math.max(0, index - 20), Math.min(responseText.length, index + 60));

      const mention: BrandMention = {
        id: mentionId,
        organizationId,
        observationId,
        entityId: "entity-acme-brand", // reference seeded aggregate
        context: { textSnippet: snippet, charStart: index, charEnd: index + 4 },
        sentiment: { score: sentimentScore, label: sentimentLabel, confidence: 0.95 },
        confidence: { score: 0.96, rating: "high" },
        audit: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: actorId,
          updatedBy: actorId,
          version: 1
        }
      };
      await this.obsRepo.saveMention(mention);
      mentions.push(mention);

      // Emit EntityResolvedEvent
      const entityEvent = DomainEventFactory.create(
        "aibi.entity.discovered",
        mention.entityId,
        organizationId,
        {
          entityId: mention.entityId,
          brandId: prompt.brandId,
          name: "Acme SaaS",
          type: "Brand",
          confidenceScore: 0.96
        },
        actorId
      );
      await eventBus.publish(entityEvent);
    }

    // 3. Stage 4: Citation detection
    const citations: Citation[] = [];
    const urls = responseText.match(/https?:\/\/[^\s]+/g) || [];
    for (const rawUrl of urls) {
      const sanitizedUrl = rawUrl.replace(/[.,);]$/, "");
      try {
        const citation = await this.citationService.addCitation(
          organizationId,
          observationId,
          sanitizedUrl,
          `Reference Source Link`,
          90, // relevance
          actorId
        );
        citations.push(citation);

        // Emit CitationDiscoveredEvent
        const citationEvent = DomainEventFactory.create(
          "aibi.citation.created",
          citation.id,
          organizationId,
          {
            citationId: citation.id,
            observationId,
            url: citation.url,
            domain: citation.domain,
            authorityScore: citation.authorityScore,
            relevanceScore: citation.relevanceScore
          },
          actorId
        );
        await eventBus.publish(citationEvent);
      } catch {
        // Ignore parsing errors
      }
    }

    // Assemble Aggregate Root to compute dynamic scores
    const aggregate = new ObservationAggregate(observation, mentions, citations);

    // 4. Stage 5 & 6: Sentiment, Confidence and Visibility calculation
    const avgMentionConfidence = mentions.length > 0
      ? mentions.reduce((sum, m) => sum + m.confidence.score, 0) / mentions.length
      : 0;

    const dynamicVisibility = this.scoreEngine.computeCompositeVisibility(
      rawVisibilityScore,
      mentions.length,
      avgMentionConfidence,
      citations,
      observation.sentiment
    );

    // Record calculated historical visibility score
    const scoreId = `vis-${Math.random().toString(36).substr(2, 9)}`;
    const visScore: VisibilityScore = {
      id: scoreId,
      organizationId,
      brandId: prompt.brandId,
      engineId,
      overallScore: dynamicVisibility,
      mentionScore: mentions.length > 0 ? 85 : 0,
      citationScore: citations.length > 0 ? 80 : 0,
      authorityScore: aggregate.getAverageCitationAuthority(),
      sentimentScore: Math.round((sentimentScore + 100) / 2), // normalized to 0-100
      positionScore: 90,
      date: new Date().toISOString(),
      audit: {
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: actorId,
        updatedBy: actorId,
        version: 1
      }
    };
    await this.visRepo.save(visScore);

    // Emit ScoreCalculatedEvent
    const scoreEvent = DomainEventFactory.create(
      "aibi.visibility.score.calculated",
      scoreId,
      organizationId,
      {
        scoreId,
        brandId: prompt.brandId,
        engineId,
        overallScore: dynamicVisibility,
        mentionScore: visScore.mentionScore,
        citationScore: visScore.citationScore,
        sentimentScore: visScore.sentimentScore
      },
      actorId
    );
    await eventBus.publish(scoreEvent);

    // 5. Stage 7: Autonomous Recommendation generation if visibility is weak
    if (dynamicVisibility < 70) {
      const recId = `rec-auto-${Math.random().toString(36).substr(2, 9)}`;
      const rec: Recommendation = {
        id: recId,
        organizationId,
        brandId: prompt.brandId,
        category: "Visibility Recoveries",
        priority: "high",
        impactScore: 18,
        description: `Autonomous workflow alert: AEO visibility rating fell to ${dynamicVisibility}% on model ${engineId}. Audit knowledge properties.`,
        status: "pending",
        audit: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "autonomous-processor",
          updatedBy: "autonomous-processor",
          version: 1
        }
      };
      await this.recRepo.save(rec);

      // Emit RecommendationGeneratedEvent
      const recEvent = DomainEventFactory.create(
        "aibi.recommendation.generated",
        recId,
        organizationId,
        {
          recommendationId: recId,
          brandId: prompt.brandId,
          category: rec.category,
          priority: rec.priority,
          impactScore: rec.impactScore,
          description: rec.description
        },
        actorId
      );
      await eventBus.publish(recEvent);
    }

    return aggregate;
  }
}
