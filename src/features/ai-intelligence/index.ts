/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Public Feature Exports
 */

// Domain Types
export * from "./domain/types";

// Validation Schemas
export * from "./domain/schemas";

// Domain Events
export * from "./domain/events";

// Domain Entities & Aggregates
export { BrandEntity } from "./domain/entities/brand-entity";
export { ObservationAggregate } from "./domain/models/observation-aggregate";

// Repositories
export * from "./repositories/interfaces";
export * from "./repositories";

// Services
export { EntityService } from "./services/entity-service";
export { CitationService } from "./services/citation-service";
export { VisibilityService, type BrandDashboardPayload, type AggregateEngineScore } from "./services/visibility-service";
export { ObservationService } from "./services/observation-service";
