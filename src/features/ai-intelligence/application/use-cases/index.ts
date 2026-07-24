/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Unified Application Use-Cases Workflows (CQRS)
 */

import { ApplicationCommandHandler, ApplicationQueryHandler } from "../handlers";
import {
  AIObservationDTO,
  RecommendationDTO
} from "../dto";
import {
  IBrandRepository,
  IPromptRepository,
  IObservationRepository,
  IVisibilityScoreRepository,
  IRecommendationRepository
} from "../../repositories/interfaces";
import { ObservationProcessor } from "../../processors";
import { PromptExecutor } from "../../prompt-engine";
import { OpenAIAdapter, AnthropicAdapter, GeminiAdapter, LocalLLMAdapter } from "../../infrastructure/ai-engines";
import { PriorityLevel } from "../../domain/types";

export class AnalyzeBrandVisibilityUseCase {
  private queryHandler: ApplicationQueryHandler;

  constructor(
    brandRepo?: IBrandRepository,
    visRepo?: IVisibilityScoreRepository
  ) {
    this.queryHandler = new ApplicationQueryHandler(brandRepo, undefined, undefined, visRepo);
  }

  public async execute(organizationId: string, brandId: string) {
    return this.queryHandler.handleGetBrandIntelligence({ organizationId, brandId });
  }
}

export class ExecutePromptCampaignUseCase {
  private commandHandler: ApplicationCommandHandler;
  private promptRepo: IPromptRepository;
  private promptExecutor: PromptExecutor;

  constructor(
    promptRepo: IPromptRepository,
    commandHandler: ApplicationCommandHandler
  ) {
    this.promptRepo = promptRepo;
    this.commandHandler = commandHandler;

    // Inject AI providers into executor
    this.promptExecutor = new PromptExecutor([
      new OpenAIAdapter(),
      new AnthropicAdapter(),
      new GeminiAdapter(),
      new LocalLLMAdapter()
    ]);
  }

  /**
   * Executes a prompt campaign across all engines, process and ingests responses
   */
  public async executeCampaign(
    organizationId: string,
    brandId: string,
    variables: Record<string, string> = {},
    actorId = "system"
  ): Promise<AIObservationDTO[]> {
    const paginatedPrompts = await this.promptRepo.findByBrandId(organizationId, brandId);
    const prompts = paginatedPrompts.data;

    const results: AIObservationDTO[] = [];
    const engines: ("ChatGPT" | "Claude" | "Gemini" | "Perplexity")[] = ["ChatGPT", "Claude", "Gemini", "Perplexity"];

    for (const prompt of prompts) {
      for (const engine of engines) {
        try {
          const run = await this.promptExecutor.execute(prompt, engine, variables);

          // Ingest via process command
          const obsDTO = await this.commandHandler.handleCaptureAIObservation({
            organizationId,
            promptId: prompt.id,
            engineId: `engine-${engine.toLowerCase()}`,
            responseText: run.responseText,
            rawVisibilityScore: Math.round(run.confidenceScore * 100),
            sentimentScore: run.confidenceScore > 0.9 ? 80 : 50,
            confidenceScore: run.confidenceScore,
            actorId
          });

          results.push(obsDTO);
        } catch {
          // Ignore individual engine execution errors to prevent campaign halts
        }
      }
    }

    return results;
  }
}

export class ProcessAIObservationUseCase {
  private processor: ObservationProcessor;

  constructor(
    obsRepo?: IObservationRepository,
    promptRepo?: IPromptRepository,
    recRepo?: IRecommendationRepository,
    visRepo?: IVisibilityScoreRepository
  ) {
    this.processor = new ObservationProcessor(obsRepo, promptRepo, recRepo, visRepo);
  }

  public async execute(
    organizationId: string,
    promptId: string,
    engineId: string,
    responseText: string,
    rawVisibilityScore: number,
    sentimentScore: number,
    confidenceScore: number = 0.95,
    actorId = "system"
  ) {
    const aggregate = await this.processor.process({
      organizationId,
      promptId,
      engineId,
      responseText,
      rawVisibilityScore,
      sentimentScore,
      confidenceScore,
      actorId
    });

    return aggregate;
  }
}

export class GenerateSEORecommendationUseCase {
  private commandHandler: ApplicationCommandHandler;

  constructor(commandHandler?: ApplicationCommandHandler) {
    this.commandHandler = commandHandler || new ApplicationCommandHandler();
  }

  /**
   * Generates targeted recommendation for a brand based on optimization category
   */
  public async execute(
    organizationId: string,
    brandId: string,
    category: string,
    priority: PriorityLevel,
    impactScore: number,
    description: string,
    actorId = "system"
  ): Promise<RecommendationDTO> {
    return this.commandHandler.handleGenerateRecommendation({
      organizationId,
      brandId,
      category,
      priority,
      impactScore,
      description,
      actorId
    });
  }
}
