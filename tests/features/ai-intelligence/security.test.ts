import { TenantSecurityGuard, SensitiveDataProtector, SecurityActor } from "../../../src/features/ai-intelligence/security";
import {
  BrandRepository,
  EntityRepository,
  PromptRepository,
  ObservationRepository
} from "../../../src/features/ai-intelligence/repositories";

export async function testSecurity() {
  console.log("▶ Running Security Layer Tests...");

  const actorTenantA: SecurityActor = {
    id: "user-01",
    organizationId: "org-tenant-a-11",
    role: "WorkspaceAdmin",
    permissions: []
  };

  const actorTenantB: SecurityActor = {
    id: "user-02",
    organizationId: "org-tenant-b-22",
    role: "Viewer",
    permissions: []
  };

  const superAdmin: SecurityActor = {
    id: "user-admin",
    organizationId: "org-any-33",
    role: "SuperAdmin",
    permissions: []
  };

  // 1. Tenant Isolation
  TenantSecurityGuard.authorizeTenant(actorTenantA, "org-tenant-a-11"); // Should pass
  TenantSecurityGuard.authorizeTenant(superAdmin, "org-tenant-a-11"); // Should pass (SuperAdmin bypass)

  try {
    TenantSecurityGuard.authorizeTenant(actorTenantB, "org-tenant-a-11"); // Should fail
    throw new Error("Should have thrown error on cross-tenant leakage test");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (!message.includes("Security Exception: Access Denied")) {
      throw new Error(`Expected tenant security error, got: ${message}`);
    }
  }

  // 2. RBAC Permissions
  TenantSecurityGuard.authorizePermission(actorTenantA, "brand:create"); // Admin should pass

  try {
    TenantSecurityGuard.authorizePermission(actorTenantB, "brand:create"); // Viewer should fail
    throw new Error("Should have thrown error on permission block");
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    if (!message.includes("lacks required permission")) {
      throw new Error(`Expected permission security error, got: ${message}`);
    }
  }

  // 3. Sensitive Data protection
  const rawLog = "The API key was api_key = 'abcdef123456789' and Bearer token: Bearer abcdef.12345.xyz";
  const masked = SensitiveDataProtector.maskSecret(rawLog);
  console.log(`  * Masked Text: "${masked}"`);

  if (masked.includes("abcdef123456789") || masked.includes("abcdef.12345.xyz")) {
    throw new Error("Sensitive Data Protector failed to redact credentials.");
  }

  // 4. Persistence Layer Tenant Isolation & Ownership Guards
  console.log("  * Testing Persistence Tenant Isolation Guards...");
  const brandRepo = new BrandRepository();
  const entityRepo = new EntityRepository();
  const promptRepo = new PromptRepository();
  const observationRepo = new ObservationRepository();

  const mockAudit = {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: "test",
    updatedBy: "test",
    version: 1
  };

  // Create a brand for Tenant A
  const brandA = {
    id: "test-brand-tenant-a",
    organizationId: "org-tenant-a-11",
    name: "Tenant A Brand",
    description: "Brand description",
    website: "https://tenant-a.com",
    industry: "Tech",
    country: "US",
    audit: mockAudit
  };
  await brandRepo.save(brandA);

  // Cross-tenant read must return null
  const crossRead = await brandRepo.findById("org-tenant-b-22", "test-brand-tenant-a");
  if (crossRead !== null) {
    throw new Error("Tenant Isolation failure: Was able to read other tenant's brand directly!");
  }

  // Cross-tenant update / ownership modification must throw Tenant Isolation Exception
  try {
    const clonedBrandB = { ...brandA, organizationId: "org-tenant-b-22" };
    await brandRepo.save(clonedBrandB);
    throw new Error("Tenant Isolation failure: Was able to modify organizationId on save!");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes("Tenant Isolation Exception")) {
      throw new Error(`Expected Tenant Isolation Exception, got: ${msg}`);
    }
  }

  // Verify across other repositories as well
  // Entity Repository
  const entityA = {
    id: "test-entity-a",
    organizationId: "org-tenant-a-11",
    brandId: "test-brand-tenant-a",
    name: "Entity A",
    type: "Brand" as const,
    confidence: { score: 0.9, rating: "high" as const },
    audit: mockAudit
  };
  await entityRepo.save(entityA);

  try {
    const clonedEntityB = { ...entityA, organizationId: "org-tenant-b-22" };
    await entityRepo.save(clonedEntityB);
    throw new Error("Tenant Isolation failure on Entity save!");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes("Tenant Isolation Exception")) {
      throw new Error(`Expected Tenant Isolation Exception for Entity, got: ${msg}`);
    }
  }

  // Prompt Repository
  const promptA = {
    id: "test-prompt-a",
    organizationId: "org-tenant-a-11",
    brandId: "test-brand-tenant-a",
    text: "Some prompt",
    category: "Market Discovery",
    intent: "Discovery" as const,
    language: "en",
    priority: "high" as const,
    audit: mockAudit
  };
  await promptRepo.save(promptA);

  try {
    const clonedPromptB = { ...promptA, organizationId: "org-tenant-b-22" };
    await promptRepo.save(clonedPromptB);
    throw new Error("Tenant Isolation failure on Prompt save!");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes("Tenant Isolation Exception")) {
      throw new Error(`Expected Tenant Isolation Exception for Prompt, got: ${msg}`);
    }
  }

  // Observation Repository
  const obsA = {
    id: "test-obs-a",
    organizationId: "org-tenant-a-11",
    promptId: "test-prompt-a",
    engineId: "engine-chatgpt",
    responseText: "Response",
    visibilityScore: 80,
    sentiment: { score: 80, label: "positive" as const, confidence: 0.9 },
    confidence: { score: 0.9, rating: "high" as const },
    executedAt: new Date(),
    audit: mockAudit
  };
  await observationRepo.save(obsA);

  try {
    const clonedObsB = { ...obsA, organizationId: "org-tenant-b-22" };
    await observationRepo.save(clonedObsB);
    throw new Error("Tenant Isolation failure on Observation save!");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes("Tenant Isolation Exception")) {
      throw new Error(`Expected Tenant Isolation Exception for Observation, got: ${msg}`);
    }
  }

  // 5. Database-level PostgreSQL Row Level Security (RLS) simulation
  console.log("  * Testing Database-level PostgreSQL Row Level Security (RLS) Isolation...");

  const pgSessionSettings = new Map<string, string>();

  function setSessionSetting(key: string, value: string) {
    pgSessionSettings.set(key, value);
  }

  function clearSessionSetting(key: string) {
    pgSessionSettings.delete(key);
  }

  function rlsQueryExecutor<T extends { organizationId: string }>(tableRows: T[]): T[] {
    const activeTenantSetting = pgSessionSettings.get("app.current_tenant_id");
    if (!activeTenantSetting) {
      return [];
    }
    return tableRows.filter(row => row.organizationId === activeTenantSetting);
  }

  const mockBrandsTable = [
    { id: "brand-1", organizationId: "org-tenant-a-11", name: "A Brand" },
    { id: "brand-2", organizationId: "org-tenant-b-22", name: "B Brand" }
  ];

  setSessionSetting("app.current_tenant_id", "org-tenant-a-11");
  const visibleToA = rlsQueryExecutor(mockBrandsTable);
  if (visibleToA.length !== 1 || visibleToA[0].id !== "brand-1") {
    throw new Error("RLS Test Failed: Tenant A should only see Tenant A's row");
  }

  setSessionSetting("app.current_tenant_id", "org-tenant-b-22");
  const visibleToB = rlsQueryExecutor(mockBrandsTable);
  if (visibleToB.length !== 1 || visibleToB[0].id !== "brand-2") {
    throw new Error("RLS Test Failed: Tenant B should only see Tenant B's row");
  }

  clearSessionSetting("app.current_tenant_id");
  const visibleToNone = rlsQueryExecutor(mockBrandsTable);
  if (visibleToNone.length !== 0) {
    throw new Error("RLS Test Failed: Session with empty tenant context must return zero rows");
  }

  console.log("✅ Security Layer Tests Passed Successfully!");
}
