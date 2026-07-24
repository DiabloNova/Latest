/**
 * Phase 7C.5 — Enterprise IoC Dependency Injection Container
 * Centralized registry for repositories, event publishers, security guards, and handlers.
 */

import { PostgresTenantRepository, PostgresAdminUserRepository, PostgresFeatureFlagRepository, PostgresAuditRecordRepository, PostgresAIProviderConfigurationRepository } from "../../features/admin/infrastructure/persistence/repositories";
import { UnitOfWork } from "../../features/admin/infrastructure/persistence/uow";
import { coreEventBus, EventBus } from "../events";
import { AdminAPIClient } from "../../features/admin/api/v1/admin";
import { AdminMockDatabase } from "../../features/admin/infrastructure/mock-db";

export class DependencyContainer {
  private static instance: DependencyContainer;
  private services: Map<string, unknown> = new Map();

  private constructor() {
    this.registerDefaults();
  }

  public static getInstance(): DependencyContainer {
    if (!DependencyContainer.instance) {
      DependencyContainer.instance = new DependencyContainer();
    }
    return DependencyContainer.instance;
  }

  /**
   * Registers a service singleton in the container
   */
  public register<T>(name: string, service: T): void {
    this.services.set(name, service);
  }

  /**
   * Resolves a registered service singleton from the container
   */
  public resolve<T>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`DI Container Error: Service ${name} is not registered.`);
    }
    return service as T;
  }

  /**
   * Clear container values (mostly useful for clean test isolation)
   */
  public clear(): void {
    this.services.clear();
    this.registerDefaults();
  }

  private registerDefaults(): void {
    const db = AdminMockDatabase.getInstance();
    const uow = new UnitOfWork();

    // 1. Register Core Infrastructure
    this.register<AdminMockDatabase>("Database", db);
    this.register<UnitOfWork>("UnitOfWork", uow);
    this.register<EventBus>("EventPublisher", coreEventBus);

    // 2. Register Repositories
    this.register<PostgresTenantRepository>("TenantRepository", new PostgresTenantRepository(db, uow));
    this.register<PostgresAdminUserRepository>("AdminUserRepository", new PostgresAdminUserRepository(db, uow));
    this.register<PostgresFeatureFlagRepository>("FeatureFlagRepository", new PostgresFeatureFlagRepository(db, uow));
    this.register<PostgresAuditRecordRepository>("AuditRecordRepository", new PostgresAuditRecordRepository(db, uow));
    this.register<PostgresAIProviderConfigurationRepository>("AIProviderConfigurationRepository", new PostgresAIProviderConfigurationRepository(db, uow));

    // 3. Register Standard Client Gateways
    this.register<AdminAPIClient>("AdminAPIClient", new AdminAPIClient());
  }
}

export const container = DependencyContainer.getInstance();
