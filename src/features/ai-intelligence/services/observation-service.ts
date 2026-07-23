import { AIObservation, BrandMention, Citation, Prompt, PromptIntent, PriorityLevel } from "../domain/types";
import { ObservationRepository, PromptRepository, RecommendationRepository } from "../repositories";
import { ObservationAggregate } from "../domain/models/observation-aggregate";

export class ObservationService {
  private obsRepo: ObservationRepository;
  private promptRepo: PromptRepository;
  private recRepo: RecommendationRepository;

  constructor(
    obsRepo?: ObservationRepository,
    promptRepo?: PromptRepository,
    recRepo?: RecommendationRepository
  ) {
    this.obsRepo = obsRepo || new ObservationRepository();
    this.promptRepo = promptRepo || new PromptRepository();
    this.recRepo = recRepo || new RecommendationRepository();
  }

  /**
   * Register a new query prompt to monitor
   */
  public async registerPrompt(
    brandId: string,
    text: string,
    category: string,
    intent: PromptIntent,
    language: string = "en",
    priority: PriorityLevel = "medium"
  ): Promise<Prompt> {
    const prompt: Prompt = {
      id: `prompt-${Math.random().toString(36).substr(2, 9)}`,
      brandId,
      text,
      category,
      intent,
      language,
      priority
    };

    return this.promptRepo.save(prompt);
  }

  /**
   * Process a brand observation payload from an AI query event execution
   */
  public async processObservation(
    promptId: string,
    engineId: string,
    responseText: string,
    rawVisibilityScore: number,
    sentimentScore: number,
    confidenceScore: number = 0.95
  ): Promise<ObservationAggregate> {
    const prompt = await this.promptRepo.findById(promptId);
    if (!prompt) {
      throw new Error(`Linked prompt query with ID ${promptId} does not exist`);
    }

    // 1. Create and save the AI observation
    const observationId = `obs-${Math.random().toString(36).substr(2, 9)}`;
    const observation: AIObservation = {
      id: observationId,
      promptId,
      engineId,
      responseText,
      visibilityScore: rawVisibilityScore,
      sentimentScore,
      confidenceScore,
      executedAt: new Date()
    };
    await this.obsRepo.save(observation);

    // 2. Mock entity extractor (Autonomous Intelligence pipeline)
    // If response contains specific text patterns, extract brand mentions and citations
    const mentions: BrandMention[] = [];
    const citations: Citation[] = [];

    // Simple pattern matching for mock extraction
    if (responseText.toLowerCase().includes("acme saas") || responseText.toLowerCase().includes("acme")) {
      const mentionId = `mention-${Math.random().toString(36).substr(2, 9)}`;
      const targetIndex = responseText.toLowerCase().indexOf("acme");
      const startIdx = Math.max(0, targetIndex - 20);
      const mention: BrandMention = {
        id: mentionId,
        observationId,
        entityId: "entity-acme-brand", // maps to seed entity
        position: targetIndex,
        context: responseText.substring(startIdx, startIdx + 80),
        sentiment: sentimentScore > 75 ? "positive" : sentimentScore < 45 ? "negative" : "neutral",
        confidence: 0.96
      };
      await this.obsRepo.saveMention(mention);
      mentions.push(mention);
    }

    // Extract links as Citations if present (represented as urls)
    const urlMatches = responseText.match(/https?:\/\/[^\s]+/g);
    if (urlMatches) {
      for (let i = 0; i < urlMatches.length; i++) {
        const fullUrl = urlMatches[i].replace(/[.,);]$/, ""); // sanitize tail chars
        const domain = new URL(fullUrl).hostname.replace("www.", "");
        const citationId = `cit-${Math.random().toString(36).substr(2, 9)}`;
        const citation: Citation = {
          id: citationId,
          observationId,
          url: fullUrl,
          domain,
          title: `${domain.split(".")[0].toUpperCase()} Citation Resource`,
          authorityScore: domain.endsWith(".org") || domain.endsWith(".edu") ? 88 : 65,
          relevanceScore: 90
        };
        await this.obsRepo.saveCitation(citation);
        citations.push(citation);
      }
    }

    // 3. Assemble Domain Aggregate Root
    const aggregate = new ObservationAggregate(observation, mentions, citations);

    // 4. Autonomous Recommendation Engine Trigger
    // If the dynamic calculated score falls below a critical threshold, automatically trigger recommendations!
    const dynamicScore = aggregate.calculateDynamicVisibility();
    if (dynamicScore < 70) {
      await this.recRepo.save({
        id: `rec-auto-${Math.random().toString(36).substr(2, 9)}`,
        brandId: prompt.brandId,
        category: "Low Visibility Recovery",
        priority: "high",
        impactScore: 20,
        description: `Autonomous Agent Alert: Visibility rating fell to ${dynamicScore}% on execution. Audit and increase brand citations for prompt: "${prompt.text}".`,
        status: "pending"
      });
    }

    return aggregate;
  }
}
