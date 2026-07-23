/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Repository Pattern & Data Persistence Foundation
 */

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
  Recommendation
} from "../domain/types";

class InMemoryDatabase {
  public organizations: Map<string, Organization> = new Map();
  public brands: Map<string, Brand> = new Map();
  public entities: Map<string, Entity> = new Map();
  public relationships: EntityRelationship[] = [];
  public engines: Map<string, AIEngine> = new Map();
  public prompts: Map<string, Prompt> = new Map();
  public observations: Map<string, AIObservation> = new Map();
  public mentions: Map<string, BrandMention> = new Map();
  public citations: Map<string, Citation> = new Map();
  public visibilityScores: Map<string, VisibilityScore> = new Map();
  public recommendations: Map<string, Recommendation> = new Map();

  constructor() {
    this.seed();
  }

  private seed() {
    // 1. Seed Organization
    const orgId = "org-enterprise-01";
    this.organizations.set(orgId, {
      id: orgId,
      name: "Acme Enterprise Corp",
      slug: "acme-corp",
      plan: "enterprise",
      createdAt: new Date("2025-01-01T00:00:00.000Z"),
      updatedAt: new Date("2025-01-01T00:00:00.000Z")
    });

    // 2. Seed Brand
    const brandId = "brand-acme-01";
    this.brands.set(brandId, {
      id: brandId,
      organizationId: orgId,
      name: "Acme SaaS",
      description: "Leading AI-driven Brand Intelligence & GEO Optimization SaaS",
      website: "https://acme-saas.io",
      industry: "Technology & software",
      country: "Global",
      createdAt: new Date("2025-01-02T00:00:00.000Z")
    });

    // 3. Seed AI Engines
    const engineIds = {
      chatgpt: "engine-chatgpt",
      claude: "engine-claude",
      gemini: "engine-gemini",
      perplexity: "engine-perplexity"
    };

    this.engines.set(engineIds.chatgpt, {
      id: engineIds.chatgpt,
      name: "ChatGPT",
      provider: "OpenAI",
      version: "GPT-4o",
      capabilities: ["RAG", "web_search", "code_interpreter"]
    });

    this.engines.set(engineIds.claude, {
      id: engineIds.claude,
      name: "Claude",
      provider: "Anthropic",
      version: "Claude 3.5 Sonnet",
      capabilities: ["RAG", "complex_reasoning", "multimodal"]
    });

    this.engines.set(engineIds.gemini, {
      id: engineIds.gemini,
      name: "Gemini",
      provider: "Google",
      version: "Gemini 1.5 Pro",
      capabilities: ["RAG", "web_search", "large_context"]
    });

    this.engines.set(engineIds.perplexity, {
      id: engineIds.perplexity,
      name: "Perplexity",
      provider: "Perplexity AI",
      version: "Sonar Large",
      capabilities: ["RAG", "live_web_search", "citation_parsing"]
    });

    // 4. Seed Prompts
    const prompt1Id = "prompt-discover-01";
    const prompt2Id = "prompt-compare-02";

    this.prompts.set(prompt1Id, {
      id: prompt1Id,
      brandId: brandId,
      text: "What are the top enterprise brand intelligence platform recommendations for 2025?",
      category: "Market Discovery",
      intent: "Discovery",
      language: "en",
      priority: "high"
    });

    this.prompts.set(prompt2Id, {
      id: prompt2Id,
      brandId: brandId,
      text: "Compare Acme SaaS vs CompetitorX on features, citation authority, and performance.",
      category: "Competitive Comparison",
      intent: "Comparison",
      language: "en",
      priority: "high"
    });

    // 5. Seed Entities
    const entityBrandId = "entity-acme-brand";
    const entityCompId = "entity-competitorx-brand";

    this.entities.set(entityBrandId, {
      id: entityBrandId,
      brandId: brandId,
      name: "Acme SaaS",
      type: "Brand",
      wikidataId: "Q111999222",
      wikipediaUrl: "https://en.wikipedia.org/wiki/Acme_SaaS",
      confidenceScore: 0.95
    });

    this.entities.set(entityCompId, {
      id: entityCompId,
      brandId: brandId,
      name: "CompetitorX",
      type: "Brand",
      wikidataId: "Q222000333",
      wikipediaUrl: "https://en.wikipedia.org/wiki/CompetitorX",
      confidenceScore: 0.88
    });

    // Seed relationship
    this.relationships.push({
      sourceEntityId: entityBrandId,
      targetEntityId: entityCompId,
      relationshipType: "competes_with",
      confidenceScore: 0.92
    });

    // 6. Seed Observations
    const obs1Id = "obs-chatgpt-01";
    const obs2Id = "obs-perplexity-02";

    this.observations.set(obs1Id, {
      id: obs1Id,
      promptId: prompt1Id,
      engineId: engineIds.chatgpt,
      responseText: "For enterprise brand intelligence platforms, Acme SaaS stands out as a strong recommendation because of its unique AEO and GEO optimization suite. Other platforms include CompetitorX which focuses on traditional SEO metrics.",
      visibilityScore: 82,
      sentimentScore: 88,
      confidenceScore: 0.9,
      executedAt: new Date("2025-02-20T10:00:00.000Z")
    });

    this.observations.set(obs2Id, {
      id: obs2Id,
      promptId: prompt2Id,
      engineId: engineIds.perplexity,
      responseText: "According to industry analyst documents, Acme SaaS holds higher citation authority compared to CompetitorX. However, CompetitorX possesses a wider market positioning footprint.",
      visibilityScore: 78,
      sentimentScore: 72,
      confidenceScore: 0.95,
      executedAt: new Date("2025-02-20T11:30:00.000Z")
    });

    // 7. Seed Brand Mentions
    this.mentions.set("mention-01", {
      id: "mention-01",
      observationId: obs1Id,
      entityId: entityBrandId,
      position: 45,
      context: "Acme SaaS stands out as a strong recommendation because of its unique AEO and GEO...",
      sentiment: "positive",
      confidence: 0.94
    });

    this.mentions.set("mention-02", {
      id: "mention-02",
      observationId: obs1Id,
      entityId: entityCompId,
      position: 110,
      context: "Other platforms include CompetitorX which focuses on traditional SEO metrics.",
      sentiment: "neutral",
      confidence: 0.89
    });

    // 8. Seed Citations
    this.citations.set("cit-01", {
      id: "cit-01",
      observationId: obs2Id,
      url: "https://acme-saas.io/case-studies/enterprise-growth",
      domain: "acme-saas.io",
      title: "Enterprise Brand Growth with Acme SaaS Case Study",
      authorityScore: 85,
      relevanceScore: 92
    });

    // 9. Seed Visibility Scores
    const engines = [engineIds.chatgpt, engineIds.claude, engineIds.gemini, engineIds.perplexity];
    engines.forEach((engId, index) => {
      this.visibilityScores.set(`vis-score-${engId}`, {
        id: `vis-score-${engId}`,
        brandId: brandId,
        engineId: engId,
        overallScore: 75 + index * 3,
        mentionScore: 80 + index * 2,
        citationScore: 70 + index * 4,
        authorityScore: 82 + index,
        sentimentScore: 78 + index * 3,
        positionScore: 85 - index * 2,
        date: new Date("2025-02-20T00:00:00.000Z")
      });
    });

    // 10. Seed Recommendations
    this.recommendations.set("rec-01", {
      id: "rec-01",
      brandId: brandId,
      category: "Citation Authority",
      priority: "high",
      impactScore: 15,
      description: "Associate your brand website with key high-intent discovery prompt citations back to the root website for ecommerce queries.",
      status: "pending"
    });

    this.recommendations.set("rec-02", {
      id: "rec-02",
      brandId: brandId,
      category: "Entity Linking",
      priority: "medium",
      impactScore: 8,
      description: "Map and claim missing entity properties on Wikidata to anchor entity recognition models.",
      status: "pending"
    });
  }
}

// Global Single Instance mimicking Database Client
export const db = new InMemoryDatabase();

/**
 * ----------------------------------------------------
 * Repositories
 * ----------------------------------------------------
 */

export class OrganizationRepository {
  public async findById(id: string): Promise<Organization | null> {
    return db.organizations.get(id) || null;
  }

  public async save(org: Organization): Promise<Organization> {
    db.organizations.set(org.id, org);
    return org;
  }
}

export class BrandRepository {
  public async findById(id: string): Promise<Brand | null> {
    return db.brands.get(id) || null;
  }

  public async findByOrganizationId(orgId: string): Promise<Brand[]> {
    return Array.from(db.brands.values()).filter(b => b.organizationId === orgId);
  }

  public async save(brand: Brand): Promise<Brand> {
    db.brands.set(brand.id, brand);
    return brand;
  }
}

export class EntityRepository {
  public async findById(id: string): Promise<Entity | null> {
    return db.entities.get(id) || null;
  }

  public async findByBrandId(brandId: string): Promise<Entity[]> {
    return Array.from(db.entities.values()).filter(e => e.brandId === brandId);
  }

  public async save(entity: Entity): Promise<Entity> {
    db.entities.set(entity.id, entity);
    return entity;
  }

  public async getRelationships(): Promise<EntityRelationship[]> {
    return db.relationships;
  }

  public async saveRelationship(relationship: EntityRelationship): Promise<EntityRelationship> {
    // Deduplicate
    db.relationships = db.relationships.filter(
      r => !(r.sourceEntityId === relationship.sourceEntityId &&
             r.targetEntityId === relationship.targetEntityId &&
             r.relationshipType === relationship.relationshipType)
    );
    db.relationships.push(relationship);
    return relationship;
  }
}

export class AIEngineRepository {
  public async findById(id: string): Promise<AIEngine | null> {
    return db.engines.get(id) || null;
  }

  public async findAll(): Promise<AIEngine[]> {
    return Array.from(db.engines.values());
  }

  public async save(engine: AIEngine): Promise<AIEngine> {
    db.engines.set(engine.id, engine);
    return engine;
  }
}

export class PromptRepository {
  public async findById(id: string): Promise<Prompt | null> {
    return db.prompts.get(id) || null;
  }

  public async findByBrandId(brandId: string): Promise<Prompt[]> {
    return Array.from(db.prompts.values()).filter(p => p.brandId === brandId);
  }

  public async save(prompt: Prompt): Promise<Prompt> {
    db.prompts.set(prompt.id, prompt);
    return prompt;
  }
}

export class ObservationRepository {
  public async findById(id: string): Promise<AIObservation | null> {
    return db.observations.get(id) || null;
  }

  public async findByPromptId(promptId: string): Promise<AIObservation[]> {
    return Array.from(db.observations.values()).filter(o => o.promptId === promptId);
  }

  public async findByEngineId(engineId: string): Promise<AIObservation[]> {
    return Array.from(db.observations.values()).filter(o => o.engineId === engineId);
  }

  public async save(observation: AIObservation): Promise<AIObservation> {
    db.observations.set(observation.id, observation);
    return observation;
  }

  // Mentions
  public async findMentionsByObservationId(obsId: string): Promise<BrandMention[]> {
    return Array.from(db.mentions.values()).filter(m => m.observationId === obsId);
  }

  public async saveMention(mention: BrandMention): Promise<BrandMention> {
    db.mentions.set(mention.id, mention);
    return mention;
  }

  // Citations
  public async findCitationsByObservationId(obsId: string): Promise<Citation[]> {
    return Array.from(db.citations.values()).filter(c => c.observationId === obsId);
  }

  public async saveCitation(citation: Citation): Promise<Citation> {
    db.citations.set(citation.id, citation);
    return citation;
  }
}

export class VisibilityScoreRepository {
  public async findByBrandId(brandId: string): Promise<VisibilityScore[]> {
    return Array.from(db.visibilityScores.values()).filter(v => v.brandId === brandId);
  }

  public async save(score: VisibilityScore): Promise<VisibilityScore> {
    db.visibilityScores.set(score.id, score);
    return score;
  }
}

export class RecommendationRepository {
  public async findByBrandId(brandId: string): Promise<Recommendation[]> {
    return Array.from(db.recommendations.values()).filter(r => r.brandId === brandId);
  }

  public async save(rec: Recommendation): Promise<Recommendation> {
    db.recommendations.set(rec.id, rec);
    return rec;
  }
}
