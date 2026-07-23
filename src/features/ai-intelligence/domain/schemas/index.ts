import {
  Organization,
  Brand,
  Entity,
  EntityRelationship,
  AIEngine,
  Prompt,
  AIObservation,
  BrandMention,
  Citation,
  VisibilityScore,
  Recommendation,
  SubscriptionPlan,
  RelationshipType,
  AIEngineName,
  PromptIntent,
  PriorityLevel,
  RecommendationStatus,
  MentionSentiment
} from "../types";

export interface ValidationError {
  field: string;
  message: string;
}

export type ValidationResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  errors: ValidationError[];
};

// Type guard or safe conversion helper to avoid 'any'
function isRecord(val: unknown): val is Record<string, unknown> {
  return typeof val === "object" && val !== null;
}

export const organizationSchema = {
  safeParse(data: unknown): ValidationResult<Organization> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, name, slug, plan, createdAt } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required and must be a non-empty string" });
    }
    if (typeof name !== "string" || !name.trim()) {
      errors.push({ field: "name", message: "Name is required and must be a non-empty string" });
    }
    if (typeof slug !== "string" || !/^[a-z0-9-_]+$/.test(slug)) {
      errors.push({ field: "slug", message: "Slug must contain only lowercase alphanumeric characters, dashes, or underscores" });
    }

    const validPlans: SubscriptionPlan[] = ["free", "growth", "enterprise"];
    if (typeof plan !== "string" || !validPlans.includes(plan as SubscriptionPlan)) {
      errors.push({ field: "plan", message: `Plan must be one of: ${validPlans.join(", ")}` });
    }

    if (!createdAt) {
      errors.push({ field: "createdAt", message: "createdAt date is required" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as Organization };
  }
};

export const brandSchema = {
  safeParse(data: unknown): ValidationResult<Brand> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, organizationId, name, website } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof organizationId !== "string" || !organizationId.trim()) {
      errors.push({ field: "organizationId", message: "organizationId is required" });
    }
    if (typeof name !== "string" || !name.trim()) {
      errors.push({ field: "name", message: "Name is required" });
    }
    if (typeof website !== "string" || !website.startsWith("http")) {
      errors.push({ field: "website", message: "Website must be a valid URL starting with http:// or https://" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as Brand };
  }
};

export const entitySchema = {
  safeParse(data: unknown): ValidationResult<Entity> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, brandId, name, type, wikidataId, wikipediaUrl, confidenceScore } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof brandId !== "string" || !brandId.trim()) {
      errors.push({ field: "brandId", message: "brandId is required" });
    }
    if (typeof name !== "string" || !name.trim()) {
      errors.push({ field: "name", message: "Name is required" });
    }
    if (typeof type !== "string" || !type.trim()) {
      errors.push({ field: "type", message: "Type is required" });
    }
    if (typeof confidenceScore !== "number" || confidenceScore < 0 || confidenceScore > 1) {
      errors.push({ field: "confidenceScore", message: "Confidence score must be a number between 0.0 and 1.0" });
    }

    if (wikidataId !== undefined && typeof wikidataId !== "string") {
      errors.push({ field: "wikidataId", message: "wikidataId must be a string" });
    }

    if (wikipediaUrl !== undefined && typeof wikipediaUrl !== "string") {
      errors.push({ field: "wikipediaUrl", message: "wikipediaUrl must be a string" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as Entity };
  }
};

export const entityRelationshipSchema = {
  safeParse(data: unknown): ValidationResult<EntityRelationship> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { sourceEntityId, targetEntityId, relationshipType, confidenceScore } = data;

    if (typeof sourceEntityId !== "string" || !sourceEntityId.trim()) {
      errors.push({ field: "sourceEntityId", message: "sourceEntityId is required" });
    }
    if (typeof targetEntityId !== "string" || !targetEntityId.trim()) {
      errors.push({ field: "targetEntityId", message: "targetEntityId is required" });
    }

    const validRelations: RelationshipType[] = ["owns", "creates", "competes_with", "related_to", "mentioned_with"];
    if (typeof relationshipType !== "string" || !validRelations.includes(relationshipType as RelationshipType)) {
      errors.push({ field: "relationshipType", message: `Relationship type must be one of: ${validRelations.join(", ")}` });
    }

    if (typeof confidenceScore !== "number" || confidenceScore < 0 || confidenceScore > 1) {
      errors.push({ field: "confidenceScore", message: "Confidence score must be a number between 0.0 and 1.0" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as EntityRelationship };
  }
};

export const aiEngineSchema = {
  safeParse(data: unknown): ValidationResult<AIEngine> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, name, provider, version, capabilities } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }

    const validEngines: AIEngineName[] = ["ChatGPT", "Claude", "Gemini", "Perplexity"];
    if (typeof name !== "string" || !validEngines.includes(name as AIEngineName)) {
      errors.push({ field: "name", message: `Name must be one of: ${validEngines.join(", ")}` });
    }

    if (typeof provider !== "string" || !provider.trim()) {
      errors.push({ field: "provider", message: "Provider is required" });
    }
    if (typeof version !== "string" || !version.trim()) {
      errors.push({ field: "version", message: "Version is required" });
    }
    if (!Array.isArray(capabilities)) {
      errors.push({ field: "capabilities", message: "Capabilities must be an array of strings" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as AIEngine };
  }
};

export const promptSchema = {
  safeParse(data: unknown): ValidationResult<Prompt> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, brandId, text, category, intent, language, priority } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof brandId !== "string" || !brandId.trim()) {
      errors.push({ field: "brandId", message: "brandId is required" });
    }
    if (typeof text !== "string" || !text.trim()) {
      errors.push({ field: "text", message: "Text query is required" });
    }
    if (typeof category !== "string" || !category.trim()) {
      errors.push({ field: "category", message: "Category is required" });
    }

    const validIntents: PromptIntent[] = ["Discovery", "Comparison", "Recommendation", "Purchase", "Research", "Authority"];
    if (typeof intent !== "string" || !validIntents.includes(intent as PromptIntent)) {
      errors.push({ field: "intent", message: `Intent must be one of: ${validIntents.join(", ")}` });
    }

    if (typeof language !== "string" || !language.trim()) {
      errors.push({ field: "language", message: "Language is required" });
    }

    const validPriorities: PriorityLevel[] = ["low", "medium", "high"];
    if (typeof priority !== "string" || !validPriorities.includes(priority as PriorityLevel)) {
      errors.push({ field: "priority", message: `Priority must be one of: ${validPriorities.join(", ")}` });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as Prompt };
  }
};

export const aiObservationSchema = {
  safeParse(data: unknown): ValidationResult<AIObservation> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, promptId, engineId, responseText, visibilityScore, sentimentScore, confidenceScore, executedAt } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof promptId !== "string" || !promptId.trim()) {
      errors.push({ field: "promptId", message: "promptId is required" });
    }
    if (typeof engineId !== "string" || !engineId.trim()) {
      errors.push({ field: "engineId", message: "engineId is required" });
    }
    if (typeof responseText !== "string") {
      errors.push({ field: "responseText", message: "responseText is required" });
    }
    if (typeof visibilityScore !== "number" || visibilityScore < 0 || visibilityScore > 100) {
      errors.push({ field: "visibilityScore", message: "visibilityScore must be between 0 and 100" });
    }
    if (typeof sentimentScore !== "number") {
      errors.push({ field: "sentimentScore", message: "sentimentScore must be a number" });
    }
    if (typeof confidenceScore !== "number" || confidenceScore < 0 || confidenceScore > 1) {
      errors.push({ field: "confidenceScore", message: "confidenceScore must be between 0.0 and 1.0" });
    }
    if (!executedAt) {
      errors.push({ field: "executedAt", message: "executedAt is required" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as AIObservation };
  }
};

export const brandMentionSchema = {
  safeParse(data: unknown): ValidationResult<BrandMention> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, observationId, entityId, position, context, sentiment, confidence } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof observationId !== "string" || !observationId.trim()) {
      errors.push({ field: "observationId", message: "observationId is required" });
    }
    if (typeof entityId !== "string" || !entityId.trim()) {
      errors.push({ field: "entityId", message: "entityId is required" });
    }
    if (typeof position !== "number") {
      errors.push({ field: "position", message: "position must be a number" });
    }
    if (typeof context !== "string") {
      errors.push({ field: "context", message: "context is required" });
    }

    const validSentiments: MentionSentiment[] = ["positive", "negative", "neutral"];
    if (typeof sentiment !== "string" || !validSentiments.includes(sentiment as MentionSentiment)) {
      errors.push({ field: "sentiment", message: `Sentiment must be one of: ${validSentiments.join(", ")}` });
    }

    if (typeof confidence !== "number" || confidence < 0 || confidence > 1) {
      errors.push({ field: "confidence", message: "Confidence must be between 0.0 and 1.0" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as BrandMention };
  }
};

export const citationSchema = {
  safeParse(data: unknown): ValidationResult<Citation> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, observationId, url, domain, title, authorityScore, relevanceScore } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof observationId !== "string" || !observationId.trim()) {
      errors.push({ field: "observationId", message: "observationId is required" });
    }
    if (typeof url !== "string" || !url.trim()) {
      errors.push({ field: "url", message: "URL is required" });
    }
    if (typeof domain !== "string" || !domain.trim()) {
      errors.push({ field: "domain", message: "domain is required" });
    }
    if (typeof title !== "string" || !title.trim()) {
      errors.push({ field: "title", message: "title is required" });
    }
    if (typeof authorityScore !== "number" || authorityScore < 0 || authorityScore > 100) {
      errors.push({ field: "authorityScore", message: "authorityScore must be between 0 and 100" });
    }
    if (typeof relevanceScore !== "number" || relevanceScore < 0 || relevanceScore > 100) {
      errors.push({ field: "relevanceScore", message: "relevanceScore must be between 0 and 100" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as Citation };
  }
};

export const visibilityScoreSchema = {
  safeParse(data: unknown): ValidationResult<VisibilityScore> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const {
      id,
      brandId,
      engineId,
      overallScore,
      mentionScore,
      citationScore,
      authorityScore,
      sentimentScore,
      positionScore,
      date
    } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof brandId !== "string" || !brandId.trim()) {
      errors.push({ field: "brandId", message: "brandId is required" });
    }
    if (typeof engineId !== "string" || !engineId.trim()) {
      errors.push({ field: "engineId", message: "engineId is required" });
    }
    if (typeof overallScore !== "number" || overallScore < 0 || overallScore > 100) {
      errors.push({ field: "overallScore", message: "overallScore must be between 0 and 100" });
    }
    if (typeof mentionScore !== "number" || mentionScore < 0 || mentionScore > 100) {
      errors.push({ field: "mentionScore", message: "mentionScore must be between 0 and 100" });
    }
    if (typeof citationScore !== "number" || citationScore < 0 || citationScore > 100) {
      errors.push({ field: "citationScore", message: "citationScore must be between 0 and 100" });
    }
    if (typeof authorityScore !== "number" || authorityScore < 0 || authorityScore > 100) {
      errors.push({ field: "authorityScore", message: "authorityScore must be between 0 and 100" });
    }
    if (typeof sentimentScore !== "number" || sentimentScore < 0 || sentimentScore > 100) {
      errors.push({ field: "sentimentScore", message: "sentimentScore must be between 0 and 100" });
    }
    if (typeof positionScore !== "number" || positionScore < 0 || positionScore > 100) {
      errors.push({ field: "positionScore", message: "positionScore must be between 0 and 100" });
    }
    if (!date) {
      errors.push({ field: "date", message: "date is required" });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as VisibilityScore };
  }
};

export const recommendationSchema = {
  safeParse(data: unknown): ValidationResult<Recommendation> {
    const errors: ValidationError[] = [];
    if (!isRecord(data)) {
      return { success: false, errors: [{ field: "root", message: "Invalid data object" }] };
    }

    const { id, brandId, category, priority, impactScore, description, status } = data;

    if (typeof id !== "string" || !id.trim()) {
      errors.push({ field: "id", message: "ID is required" });
    }
    if (typeof brandId !== "string" || !brandId.trim()) {
      errors.push({ field: "brandId", message: "brandId is required" });
    }
    if (typeof category !== "string" || !category.trim()) {
      errors.push({ field: "category", message: "Category is required" });
    }

    const validPriorities: PriorityLevel[] = ["low", "medium", "high"];
    if (typeof priority !== "string" || !validPriorities.includes(priority as PriorityLevel)) {
      errors.push({ field: "priority", message: `Priority must be one of: ${validPriorities.join(", ")}` });
    }

    if (typeof impactScore !== "number" || impactScore < 0 || impactScore > 100) {
      errors.push({ field: "impactScore", message: "impactScore must be between 0 and 100" });
    }
    if (typeof description !== "string" || !description.trim()) {
      errors.push({ field: "description", message: "description is required" });
    }

    const validStatuses: RecommendationStatus[] = ["pending", "applied", "ignored"];
    if (typeof status !== "string" || !validStatuses.includes(status as RecommendationStatus)) {
      errors.push({ field: "status", message: `Status must be one of: ${validStatuses.join(", ")}` });
    }

    if (errors.length > 0) return { success: false, errors };
    return { success: true, data: data as unknown as Recommendation };
  }
};
