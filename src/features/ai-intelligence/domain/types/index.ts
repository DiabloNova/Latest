/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Strong type definitions for Domain Entities
 */

export type SubscriptionPlan = "free" | "growth" | "enterprise";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: SubscriptionPlan;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Brand {
  id: string;
  organizationId: string;
  name: string;
  description?: string;
  website: string;
  industry?: string;
  country?: string;
  createdAt: Date | string;
}

export interface Entity {
  id: string;
  brandId: string;
  name: string;
  type: string; // e.g., "Brand", "Product", "Competitor", "Person", "Organization"
  wikidataId?: string;
  wikipediaUrl?: string;
  confidenceScore: number; // 0.0 to 1.0
}

export type RelationshipType = "owns" | "creates" | "competes_with" | "related_to" | "mentioned_with";

export interface EntityRelationship {
  sourceEntityId: string;
  targetEntityId: string;
  relationshipType: RelationshipType;
  confidenceScore: number; // 0.0 to 1.0
}

export type AIEngineName = "ChatGPT" | "Claude" | "Gemini" | "Perplexity";

export interface AIEngine {
  id: string;
  name: AIEngineName;
  provider: string; // e.g., "OpenAI", "Anthropic", "Google", "Perplexity AI"
  version: string;
  capabilities: string[]; // e.g., ["RAG", "web_search", "multimodal", "code_interpreter"]
}

export type PromptIntent = "Discovery" | "Comparison" | "Recommendation" | "Purchase" | "Research" | "Authority";

export type PriorityLevel = "low" | "medium" | "high";

export interface Prompt {
  id: string;
  brandId: string;
  text: string;
  category: string;
  intent: PromptIntent;
  language: "en" | "fa" | string;
  priority: PriorityLevel;
}

export interface AIObservation {
  id: string;
  promptId: string;
  engineId: string;
  responseText: string;
  visibilityScore: number; // 0 to 100
  sentimentScore: number; // 0 to 100 or -100 to 100
  confidenceScore: number; // 0.0 to 1.0
  executedAt: Date | string;
}

export type MentionSentiment = "positive" | "negative" | "neutral";

export interface BrandMention {
  id: string;
  observationId: string;
  entityId: string;
  position: number; // Offset index or order in response
  context: string; // Text snippet containing the mention
  sentiment: MentionSentiment;
  confidence: number; // 0.0 to 1.0
}

export interface Citation {
  id: string;
  observationId: string;
  url: string;
  domain: string;
  title: string;
  authorityScore: number; // 0 to 100
  relevanceScore: number; // 0 to 100
}

export interface VisibilityScore {
  id: string;
  brandId: string;
  engineId: string;
  overallScore: number; // 0 to 100
  mentionScore: number; // 0 to 100
  citationScore: number; // 0 to 100
  authorityScore: number; // 0 to 100
  sentimentScore: number; // 0 to 100
  positionScore: number; // 0 to 100
  date: Date | string;
}

export type RecommendationStatus = "pending" | "applied" | "ignored";

export interface Recommendation {
  id: string;
  brandId: string;
  category: string;
  priority: PriorityLevel;
  impactScore: number; // 0 to 100
  description: string;
  status: RecommendationStatus;
}
