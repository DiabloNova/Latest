import { Entity, EntityRelationship, RelationshipType } from "../domain/types";
import { EntityRepository } from "../repositories";

export class EntityService {
  private entityRepo: EntityRepository;

  constructor(entityRepo?: EntityRepository) {
    this.entityRepo = entityRepo || new EntityRepository();
  }

  /**
   * Look up a semantic entity by its unique ID
   */
  public async getEntityById(id: string): Promise<Entity | null> {
    return this.entityRepo.findById(id);
  }

  /**
   * Retrieve all semantic entities associated with a specific brand
   */
  public async getEntitiesByBrand(brandId: string): Promise<Entity[]> {
    return this.entityRepo.findByBrandId(brandId);
  }

  /**
   * Register a new semantic brand entity
   */
  public async createEntity(
    brandId: string,
    name: string,
    type: string,
    wikidataId?: string,
    wikipediaUrl?: string,
    confidenceScore: number = 1.0
  ): Promise<Entity> {
    const entity: Entity = {
      id: `entity-${Math.random().toString(36).substr(2, 9)}`,
      brandId,
      name,
      type,
      wikidataId,
      wikipediaUrl,
      confidenceScore: Math.min(Math.max(confidenceScore, 0), 1)
    };

    return this.entityRepo.save(entity);
  }

  /**
   * Establish a semantic relation mapping between two concepts/brands
   */
  public async addRelationship(
    sourceEntityId: string,
    targetEntityId: string,
    relationshipType: RelationshipType,
    confidenceScore: number = 1.0
  ): Promise<EntityRelationship> {
    // Validate existence of source and target entities
    const source = await this.entityRepo.findById(sourceEntityId);
    const target = await this.entityRepo.findById(targetEntityId);

    if (!source || !target) {
      throw new Error("Invalid relationship mapping: Source or Target entity does not exist");
    }

    const relationship: EntityRelationship = {
      sourceEntityId,
      targetEntityId,
      relationshipType,
      confidenceScore: Math.min(Math.max(confidenceScore, 0), 1)
    };

    return this.entityRepo.saveRelationship(relationship);
  }

  /**
   * List all system-wide semantic entity relationships
   */
  public async getRelationships(): Promise<EntityRelationship[]> {
    return this.entityRepo.getRelationships();
  }

  /**
   * Adjust semantic linking confidence rating
   */
  public async updateConfidenceScore(entityId: string, newScore: number): Promise<Entity> {
    const entity = await this.entityRepo.findById(entityId);
    if (!entity) {
      throw new Error(`Entity with ID ${entityId} not found`);
    }

    const updated: Entity = {
      ...entity,
      confidenceScore: Math.min(Math.max(newScore, 0), 1)
    };

    return this.entityRepo.save(updated);
  }
}
