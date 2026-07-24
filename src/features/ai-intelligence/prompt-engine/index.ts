/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Prompt Template & Execution Engine
 */

import { Prompt } from "../domain/types";
import { IAIEngineProvider, AIEngineResponse } from "../infrastructure/ai-engines";

export interface PromptTemplate {
  id: string;
  organizationId: string;
  name: string;
  templateText: string; // e.g. "What is the best SaaS for {industry} in {country}?"
  version: number;
  isActive: boolean;
}

export class PromptRenderer {
  /**
   * Safe interpolation replacing placeholders (e.g., {industry}) with execution properties
   */
  public static render(template: PromptTemplate, variables: Record<string, string>): string {
    let output = template.templateText;
    for (const [key, value] of Object.entries(variables)) {
      output = output.replace(new RegExp(`{${key}}`, "g"), value);
    }
    return output;
  }
}

export interface PromptExperiment {
  id: string;
  organizationId: string;
  name: string;
  variantA: PromptTemplate;
  variantB: PromptTemplate;
  distributionRatio: number; // e.g. 0.5 for 50/50 split
}

export class PromptExperimentManager {
  private experiments: Map<string, PromptExperiment> = new Map();

  public registerExperiment(exp: PromptExperiment): void {
    this.experiments.set(exp.id, exp);
  }

  /**
   * Route execution requests to either variant A or variant B based on random distribution
   */
  public selectVariant(experimentId: string): PromptTemplate {
    const exp = this.experiments.get(experimentId);
    if (!exp) {
      throw new Error(`Prompt Experiment with ID ${experimentId} not registered`);
    }

    return Math.random() < exp.distributionRatio ? exp.variantA : exp.variantB;
  }
}

export interface ExecutionHistoryLog {
  id: string;
  promptId: string;
  engineId: string;
  responseText: string;
  executedAt: string;
  latencyMs: number;
  tokensCount: number;
}

export class PromptExecutor {
  private providers: IAIEngineProvider[];
  private executionLogs: ExecutionHistoryLog[] = [];

  constructor(providers: IAIEngineProvider[]) {
    this.providers = providers;
  }

  /**
   * Dispatches execution requests to matched providers
   */
  public async execute(
    prompt: Prompt,
    providerName: "ChatGPT" | "Claude" | "Gemini" | "Perplexity",
    variables: Record<string, string> = {}
  ): Promise<AIEngineResponse> {
    const provider = this.providers.find(p => p.supports(providerName));
    if (!provider) {
      throw new Error(`Engine provider not found for engine: ${providerName}`);
    }

    // Render template text dynamically if variables are supplied
    let text = prompt.text;
    if (Object.keys(variables).length > 0) {
      // Mock converting prompt string to template temporarily
      let rendered = prompt.text;
      for (const [k, v] of Object.entries(variables)) {
        rendered = rendered.replace(new RegExp(`{${k}}`, "g"), v);
      }
      text = rendered;
    }

    const response = await provider.execute(prompt, {
      promptText: text,
      temperature: 0.7,
      maxTokens: 500
    });

    // Log to audit history
    this.executionLogs.push({
      id: `elog-${Math.random().toString(36).substr(2, 9)}`,
      promptId: prompt.id,
      engineId: `engine-${providerName.toLowerCase()}`,
      responseText: response.responseText,
      executedAt: new Date().toISOString(),
      latencyMs: response.latencyMs,
      tokensCount: response.usage.totalTokens
    });

    return response;
  }

  public getExecutionHistory(promptId: string): ExecutionHistoryLog[] {
    return this.executionLogs.filter(log => log.promptId === promptId);
  }
}

export class PromptVersionManager {
  private templates: Map<string, PromptTemplate[]> = new Map();

  /**
   * Save a prompt template version under organization isolation
   */
  public saveTemplateVersion(template: PromptTemplate): void {
    const list = this.templates.get(template.id) || [];
    // Ensure correct version ordering
    const nextVer = list.length + 1;
    const item: PromptTemplate = { ...template, version: nextVer };
    list.push(item);
    this.templates.set(template.id, list);
  }

  public getActiveTemplate(templateId: string): PromptTemplate | null {
    const list = this.templates.get(templateId);
    if (!list || list.length === 0) return null;
    return list.find(t => t.isActive) || list[list.length - 1];
  }
}
