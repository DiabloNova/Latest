import {
  CreateTenantCommand,
  SuspendTenantCommand,
  ActivateTenantCommand,
  UpdateTenantQuotaCommand,
  ChangeUserRoleCommand,
  UpdateAIProviderConfigCommand,
  EnableFeatureFlagCommand,
  DisableFeatureFlagCommand
} from "./commands";
import {
  GetTenantListQuery,
  GetTenantUsageQuery,
  GetUserAuditHistoryQuery,
  GetAIUsageStatisticsQuery
} from "./queries";
import {
  TenantDTO,
  AdminUserDTO,
  AuditRecordDTO,
  FeatureFlagDTO,
  AIProviderDTO,
  PlatformOverviewDTO,
  SystemHealthDTO
} from "./dto";
import { AdminDTOMappers } from "./mappers";
import { Tenant, AuditRecord } from "../domain/types";
import { TenantAggregate, AdminUserAggregate, FeatureFlagAggregate } from "../domain/entities";
import { AdminDomainEventFactory } from "../domain/events";
import { AdminMockDatabase } from "../infrastructure/mock-db";
import { eventBus } from "../../ai-intelligence/domain/events/event-bus";
import { DomainEvent } from "../../ai-intelligence/domain/events";

export class ApplicationAdminCommandHandler {
  private db: AdminMockDatabase;

  constructor(db?: AdminMockDatabase) {
    this.db = db || AdminMockDatabase.getInstance();
  }

  private appendAudit(record: Omit<AuditRecord, "id" | "timestamp">): AuditRecord {
    const auditRecord: AuditRecord = {
      id: `audit-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ...record
    };
    this.db.auditRecords.push(auditRecord);
    return auditRecord;
  }

  /**
   * Handle: CreateTenantCommand
   */
  public async handleCreateTenant(command: CreateTenantCommand): Promise<TenantDTO> {
    try {
      const tenant: Tenant = {
        id: `tenant-${command.slug}-uuid`,
        name: command.name,
        slug: command.slug,
        status: "active",
        configuration: {
          allowedIPRanges: ["0.0.0.0/0"],
          mfaRequired: false,
          ssoRequired: false,
          dataRetentionDays: 90,
          isIranMarketLocalised: false
        },
        quota: {
          maxUsers: 10,
          maxBrands: 2,
          maxPrompts: 20,
          maxObservationsPerMonth: 1000,
          maxCrawlJobsPerDay: 10,
          monthlyTokenLimit: 1000000,
          monthlyCostLimitUsd: 100,
          usedObservationsThisMonth: 0,
          usedTokensThisMonth: 0,
          usedCrawlJobsToday: 0
        },
        subscription: {
          plan: command.plan,
          status: "active",
          billingCycle: "monthly",
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          priceAmount: command.plan === "growth" ? 149 : command.plan === "enterprise" ? 1200 : 0,
          currency: "USD"
        },
        audit: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: command.actorId,
          updatedBy: command.actorId,
          version: 1
        }
      };

      this.db.tenants.set(tenant.id, tenant);

      // Publish TenantCreatedEvent
      const event = AdminDomainEventFactory.create(
        "admin.tenant.created",
        tenant.id,
        tenant.id,
        {
          tenantId: tenant.id,
          name: tenant.name,
          slug: tenant.slug,
          plan: tenant.subscription.plan,
          createdBy: command.actorId
        },
        command.actorId
      );
      await eventBus.publish(event as unknown as DomainEvent);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_CREATE",
        resourceType: "tenant",
        resourceId: tenant.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadAfter: JSON.stringify(tenant),
        status: "success"
      });

      return AdminDTOMappers.tenantToDTO(tenant);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_CREATE",
        resourceType: "tenant",
        resourceId: "unknown",
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }

  /**
   * Handle: SuspendTenantCommand
   */
  public async handleSuspendTenant(command: SuspendTenantCommand): Promise<TenantDTO> {
    const tenant = this.db.tenants.get(command.tenantId);
    if (!tenant) {
      throw new Error(`Tenant with ID ${command.tenantId} not found.`);
    }

    try {
      const aggregate = new TenantAggregate(tenant);
      const payloadBefore = JSON.stringify(tenant);

      aggregate.suspend();

      // Publish TenantSuspendedEvent
      const event = AdminDomainEventFactory.create(
        "admin.tenant.suspended",
        tenant.id,
        tenant.id,
        {
          tenantId: tenant.id,
          suspendedBy: command.actorId,
          reason: command.reason
        },
        command.actorId
      );
      await eventBus.publish(event as unknown as DomainEvent);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_SUSPEND",
        resourceType: "tenant",
        resourceId: tenant.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadBefore,
        payloadAfter: JSON.stringify(tenant),
        status: "success"
      });

      return AdminDTOMappers.tenantToDTO(tenant);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_SUSPEND",
        resourceType: "tenant",
        resourceId: command.tenantId,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }

  /**
   * Handle: ActivateTenantCommand
   */
  public async handleActivateTenant(command: ActivateTenantCommand): Promise<TenantDTO> {
    const tenant = this.db.tenants.get(command.tenantId);
    if (!tenant) {
      throw new Error(`Tenant with ID ${command.tenantId} not found.`);
    }

    try {
      const aggregate = new TenantAggregate(tenant);
      const payloadBefore = JSON.stringify(tenant);

      aggregate.activate();

      // Publish TenantCreatedEvent or Similar Status Changed Event
      const event = AdminDomainEventFactory.create(
        "admin.tenant.activated",
        tenant.id,
        tenant.id,
        {
          tenantId: tenant.id,
          name: tenant.name,
          slug: tenant.slug,
          plan: tenant.subscription.plan,
          createdBy: command.actorId
        },
        command.actorId
      );
      await eventBus.publish(event as unknown as DomainEvent);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_ACTIVATE",
        resourceType: "tenant",
        resourceId: tenant.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadBefore,
        payloadAfter: JSON.stringify(tenant),
        status: "success"
      });

      return AdminDTOMappers.tenantToDTO(tenant);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_ACTIVATE",
        resourceType: "tenant",
        resourceId: command.tenantId,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }

  /**
   * Handle: UpdateTenantQuotaCommand
   */
  public async handleUpdateTenantQuota(command: UpdateTenantQuotaCommand): Promise<TenantDTO> {
    const tenant = this.db.tenants.get(command.tenantId);
    if (!tenant) {
      throw new Error(`Tenant with ID ${command.tenantId} not found.`);
    }

    try {
      const aggregate = new TenantAggregate(tenant);
      const payloadBefore = JSON.stringify(tenant);

      aggregate.updateQuota(command.quota);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_QUOTA_UPDATE",
        resourceType: "tenant",
        resourceId: tenant.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadBefore,
        payloadAfter: JSON.stringify(tenant),
        status: "success"
      });

      return AdminDTOMappers.tenantToDTO(tenant);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "TENANT_QUOTA_UPDATE",
        resourceType: "tenant",
        resourceId: command.tenantId,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }

  /**
   * Handle: ChangeUserRoleCommand
   */
  public async handleChangeUserRole(command: ChangeUserRoleCommand): Promise<AdminUserDTO> {
    const user = this.db.adminUsers.get(command.userId);
    if (!user) {
      throw new Error(`Admin user with ID ${command.userId} not found.`);
    }

    try {
      const aggregate = new AdminUserAggregate(user);
      const payloadBefore = JSON.stringify(user);
      const oldRole = user.role;

      aggregate.changeRole(command.newRole, command.permissions);

      // Publish UserRoleChangedEvent
      const event = AdminDomainEventFactory.create(
        "admin.user.role_changed",
        user.id,
        "SYSTEM_ADMIN",
        {
          userId: user.id,
          oldRole,
          newRole: command.newRole,
          changedBy: command.actorId,
          permissions: command.permissions
        },
        command.actorId
      );
      await eventBus.publish(event as unknown as DomainEvent);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "USER_ROLE_CHANGE",
        resourceType: "user",
        resourceId: user.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadBefore,
        payloadAfter: JSON.stringify(user),
        status: "success"
      });

      return AdminDTOMappers.adminUserToDTO(user);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "USER_ROLE_CHANGE",
        resourceType: "user",
        resourceId: command.userId,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }

  /**
   * Handle: UpdateAIProviderConfigCommand
   */
  public async handleUpdateAIProviderConfig(command: UpdateAIProviderConfigCommand): Promise<AIProviderDTO> {
    const provider = this.db.aiProviders.get(command.providerId);
    if (!provider) {
      throw new Error(`AI Provider configuration with ID ${command.providerId} not found.`);
    }

    try {
      const payloadBefore = JSON.stringify(provider);

      if (command.endpointUrl !== undefined) provider.endpointUrl = command.endpointUrl;
      if (command.apiKeyMasked !== undefined) provider.apiKeyMasked = command.apiKeyMasked;
      if (command.isActive !== undefined) provider.isActive = command.isActive;
      if (command.models !== undefined) provider.models = command.models;

      provider.audit.updatedAt = new Date().toISOString();
      provider.audit.updatedBy = command.actorId;
      provider.audit.version += 1;

      // Publish AIProviderUpdatedEvent
      const event = AdminDomainEventFactory.create(
        "admin.ai_provider.updated",
        provider.id,
        "SYSTEM_ADMIN",
        {
          providerId: provider.id,
          providerName: provider.providerName,
          isActive: provider.isActive,
          updatedBy: command.actorId
        },
        command.actorId
      );
      await eventBus.publish(event as unknown as DomainEvent);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "AI_PROVIDER_UPDATE",
        resourceType: "ai_provider",
        resourceId: provider.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadBefore,
        payloadAfter: JSON.stringify(provider),
        status: "success"
      });

      return AdminDTOMappers.aiProviderToDTO(provider);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "AI_PROVIDER_UPDATE",
        resourceType: "ai_provider",
        resourceId: command.providerId,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }

  /**
   * Handle: EnableFeatureFlagCommand
   */
  public async handleEnableFeatureFlag(command: EnableFeatureFlagCommand): Promise<FeatureFlagDTO> {
    const flag = this.db.featureFlags.get(command.flagKey);
    if (!flag) {
      throw new Error(`Feature flag with key ${command.flagKey} not found.`);
    }

    try {
      const aggregate = new FeatureFlagAggregate(flag);
      const payloadBefore = JSON.stringify(flag);

      if (command.tenantIdOverride) {
        aggregate.setTenantOverride(command.tenantIdOverride, true);
      } else {
        aggregate.toggleGlobally(true);
      }

      // Publish FeatureFlagChangedEvent
      const event = AdminDomainEventFactory.create(
        "admin.feature_flag.changed",
        flag.id,
        "SYSTEM_ADMIN",
        {
          flagKey: flag.key,
          isEnabledGlobally: flag.isEnabledGlobally,
          tenantIdOverride: command.tenantIdOverride,
          overrideValue: command.tenantIdOverride ? true : undefined,
          changedBy: command.actorId
        },
        command.actorId
      );
      await eventBus.publish(event as unknown as DomainEvent);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "FEATURE_FLAG_ENABLE",
        resourceType: "feature_flag",
        resourceId: flag.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadBefore,
        payloadAfter: JSON.stringify(flag),
        status: "success"
      });

      return AdminDTOMappers.featureFlagToDTO(flag);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "FEATURE_FLAG_ENABLE",
        resourceType: "feature_flag",
        resourceId: flag ? flag.id : command.flagKey,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }

  /**
   * Handle: DisableFeatureFlagCommand
   */
  public async handleDisableFeatureFlag(command: DisableFeatureFlagCommand): Promise<FeatureFlagDTO> {
    const flag = this.db.featureFlags.get(command.flagKey);
    if (!flag) {
      throw new Error(`Feature flag with key ${command.flagKey} not found.`);
    }

    try {
      const aggregate = new FeatureFlagAggregate(flag);
      const payloadBefore = JSON.stringify(flag);

      if (command.tenantIdOverride) {
        aggregate.setTenantOverride(command.tenantIdOverride, false);
      } else {
        aggregate.toggleGlobally(false);
      }

      // Publish FeatureFlagChangedEvent
      const event = AdminDomainEventFactory.create(
        "admin.feature_flag.changed",
        flag.id,
        "SYSTEM_ADMIN",
        {
          flagKey: flag.key,
          isEnabledGlobally: flag.isEnabledGlobally,
          tenantIdOverride: command.tenantIdOverride,
          overrideValue: command.tenantIdOverride ? false : undefined,
          changedBy: command.actorId
        },
        command.actorId
      );
      await eventBus.publish(event as unknown as DomainEvent);

      // Immutable Audit Log
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "FEATURE_FLAG_DISABLE",
        resourceType: "feature_flag",
        resourceId: flag.id,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        payloadBefore,
        payloadAfter: JSON.stringify(flag),
        status: "success"
      });

      return AdminDTOMappers.featureFlagToDTO(flag);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : String(error);
      this.appendAudit({
        actorId: command.actorId,
        actorEmail: command.actorEmail,
        actorRole: command.actorRole,
        action: "FEATURE_FLAG_DISABLE",
        resourceType: "feature_flag",
        resourceId: flag ? flag.id : command.flagKey,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
        status: "error",
        errorDetails: errMsg
      });
      throw error;
    }
  }
}

export class ApplicationAdminQueryHandler {
  private db: AdminMockDatabase;

  constructor(db?: AdminMockDatabase) {
    this.db = db || AdminMockDatabase.getInstance();
  }

  /**
   * Handle: GetPlatformOverviewQuery
   */
  public async handleGetPlatformOverview(): Promise<PlatformOverviewDTO> {
    const tenantsList = Array.from(this.db.tenants.values());
    const activeTenants = tenantsList.filter(t => t.status === "active").length;
    const usersCount = tenantsList.reduce((sum, t) => sum + t.quota.maxUsers, 0);

    // Sum overall analytical variables
    const aiRequestsCount = tenantsList.reduce((sum, t) => sum + t.quota.usedObservationsThisMonth, 0);
    const crawlerJobsCount = tenantsList.reduce((sum, t) => sum + t.quota.usedCrawlJobsToday, 0);

    return {
      activeTenants,
      usersCount,
      aiRequestsCount,
      crawlerJobsCount,
      systemHealth: "healthy",
      uptimeSeconds: 86400 * 14.5 // 14.5 days uptime
    };
  }

  /**
   * Handle: GetTenantListQuery
   */
  public async handleGetTenantList(query: GetTenantListQuery): Promise<TenantDTO[]> {
    let list = Array.from(this.db.tenants.values());
    if (query.statusFilter) {
      list = list.filter(t => t.status === query.statusFilter);
    }
    return list.map(t => AdminDTOMappers.tenantToDTO(t));
  }

  /**
   * Handle: GetTenantUsageQuery
   */
  public async handleGetTenantUsage(query: GetTenantUsageQuery): Promise<TenantDTO> {
    const tenant = this.db.tenants.get(query.tenantId);
    if (!tenant) {
      throw new Error(`Tenant with ID ${query.tenantId} not found.`);
    }
    return AdminDTOMappers.tenantToDTO(tenant);
  }

  /**
   * Handle: GetUserAuditHistoryQuery
   */
  public async handleGetUserAuditHistory(query: GetUserAuditHistoryQuery): Promise<AuditRecordDTO[]> {
    let records = this.db.auditRecords;
    if (query.targetUserId) {
      records = records.filter(r => r.actorId === query.targetUserId);
    }
    if (query.targetTenantId) {
      records = records.filter(r => r.resourceId === query.targetTenantId && r.resourceType === "tenant");
    }
    return records.map(r => AdminDTOMappers.auditRecordToDTO(r));
  }

  /**
   * Handle: GetSystemHealthQuery
   */
  public async handleGetSystemHealth(): Promise<SystemHealthDTO> {
    return {
      status: "healthy",
      uptimeSeconds: 86400 * 14.5,
      dependencies: {
        database: "healthy",
        redisQueue: "healthy",
        elasticsearch: "healthy",
        s3Storage: "healthy"
      },
      workers: {
        activeCount: 12,
        failedJobsCount: 3,
        processingRatePerSec: 42.8
      }
    };
  }

  /**
   * Handle: GetAIUsageStatisticsQuery
   */
  public async handleGetAIUsageStatistics(query: GetAIUsageStatisticsQuery) {
    const providers = Array.from(this.db.aiProviders.values());
    const matched = query.providerId ? providers.filter(p => p.id === query.providerId) : providers;

    return matched.map(p => ({
      providerId: p.id,
      providerName: p.providerName,
      isActive: p.isActive,
      models: p.models,
      estimatedCostThisMonthUsd: p.id === "ai-provider-openai" ? 125.40 : 45.80,
      totalTokensConsumedThisMonth: p.id === "ai-provider-openai" ? 25000000 : 8500000
    }));
  }
}
