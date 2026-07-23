import { TenantSecurityGuard, SensitiveDataProtector, SecurityActor } from "../../../src/features/ai-intelligence/security";

export function testSecurity() {
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

  console.log("✅ Security Layer Tests Passed Successfully!");
}
