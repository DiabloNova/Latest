/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Enterprise Domain Event Contracts
 * Establishes a pure, implementation-agnostic message contract system for event-driven flows.
 */

export interface DomainEvent<TPayload = unknown> {
  eventId: string; // Unique UUID identifier for the event
  eventType: string; // Event type string for routing (e.g. "aibi.brand.created.v1")
  aggregateId: string; // ID of the Aggregate Root that produced this event
  organizationId: string; // Strict tenant boundary partition key
  timestamp: Date | string; // Date of event occurrence
  version: number; // Event contract version
  payload: TPayload; // Strict, typed event-specific data payload
}

// 1. BrandCreatedEvent
export interface BrandCreatedPayload {
  brandId: string;
  name: string;
  website: string;
  industry?: string;
  country?: string;
  createdBy: string;
}
export type BrandCreatedEvent = DomainEvent<BrandCreatedPayload>;

// 2. EntityDiscoveredEvent
export interface EntityDiscoveredPayload {
  entityId: string;
  brandId: string;
  name: string;
  type: string;
  wikidataId?: string;
  confidenceScore: number;
}
export type EntityDiscoveredEvent = DomainEvent<EntityDiscoveredPayload>;

// 3. AIObservationCapturedEvent
export interface AIObservationCapturedPayload {
  observationId: string;
  promptId: string;
  engineId: string;
  visibilityScore: number;
  sentimentLabel: "positive" | "negative" | "neutral";
  sentimentScore: number;
  mentionsCount: number;
  citationsCount: number;
}
export type AIObservationCapturedEvent = DomainEvent<AIObservationCapturedPayload>;

// 4. CitationCreatedEvent
export interface CitationCreatedPayload {
  citationId: string;
  observationId: string;
  url: string;
  domain: string;
  authorityScore: number;
  relevanceScore: number;
}
export type CitationCreatedEvent = DomainEvent<CitationCreatedPayload>;

// 5. VisibilityScoreCalculatedEvent
export interface VisibilityScoreCalculatedPayload {
  scoreId: string;
  brandId: string;
  engineId: string;
  overallScore: number;
  mentionScore: number;
  citationScore: number;
  sentimentScore: number;
}
export type VisibilityScoreCalculatedEvent = DomainEvent<VisibilityScoreCalculatedPayload>;

// 6. RecommendationGeneratedEvent
export interface RecommendationGeneratedPayload {
  recommendationId: string;
  brandId: string;
  category: string;
  priority: "low" | "medium" | "high";
  impactScore: number;
  description: string;
}
export type RecommendationGeneratedEvent = DomainEvent<RecommendationGeneratedPayload>;


/**
 * Helper factory functions to generate standard, compliant DomainEvent envelopes
 */
export const DomainEventFactory = {
  create<T>(
    eventType: string,
    aggregateId: string,
    organizationId: string,
    payload: T,
    version: number = 1
  ): DomainEvent<T> {
    return {
      eventId: `evt-${Math.random().toString(36).substr(2, 9)}-${Date.now().toString(36)}`,
      eventType,
      aggregateId,
      organizationId,
      timestamp: new Date().toISOString(),
      version,
      payload
    };
  }
};
