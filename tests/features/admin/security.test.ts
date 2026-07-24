/**
 * Phase 7C.5 — Enterprise Admin Security & Authorization Tests
 */

import { ROLE_HIERARCHY, RoleHierarchyResolver, PermissionChecker, AdminAuthorizationGuard } from "../../../src/features/admin/security";
import { AdminUser } from "../../../src/features/admin/domain/types";

export function testSecurity() {
  console.log("▶ Running Admin Security & Access Control Tests...");

  // 1. Test Role Hierarchy Strength Comparison
  if (!RoleHierarchyResolver.isStrongerOrEqual("Super Admin", "Platform Admin")) {
    throw new Error(`Security Test Failed: Super Admin should be stronger than Platform Admin`);
  }
  if (RoleHierarchyResolver.isStrongerOrEqual("Support", "Operations")) {
    throw new Error(`Security Test Failed: Support should not be stronger than Operations`);
  }

  // 2. Test PermissionChecker
  const hasPerm = PermissionChecker.hasPermission("Operations", "ai:manage");
  if (!hasPerm) {
    throw new Error(`Security Test Failed: Operations should have ai:manage permission`);
  }

  const lacksPerm = PermissionChecker.hasPermission("Support", "ai:manage");
  if (lacksPerm) {
    throw new Error(`Security Test Failed: Support should not have ai:manage permission`);
  }

  // 3. Test PermissionChecker on active / inactive users
  const activeUser: AdminUser = {
    id: "active-id",
    email: "active@aeo.internal",
    fullName: "Sarah Connor",
    role: "Finance",
    permissions: [],
    isActive: true,
    audit: { createdAt: "", updatedAt: "", createdBy: "", updatedBy: "", version: 1 }
  };

  PermissionChecker.checkUser(activeUser, "billing:write"); // Should pass

  const inactiveUser: AdminUser = {
    id: "inactive-id",
    email: "inactive@aeo.internal",
    fullName: "John Connor",
    role: "Super Admin",
    permissions: [],
    isActive: false,
    audit: { createdAt: "", updatedAt: "", createdBy: "", updatedBy: "", version: 1 }
  };

  try {
    PermissionChecker.checkUser(inactiveUser, "tenant:write");
    throw new Error(`Security Test Failed: Inactive user should be blocked from performing actions.`);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (!errMsg.includes("is inactive")) {
      throw err;
    }
  }

  // 4. Test Enforce Administrative Separation Guard
  AdminAuthorizationGuard.enforceAdminSeparation("Super Admin"); // Should pass
  AdminAuthorizationGuard.enforceAdminSeparation("Support"); // Should pass

  try {
    AdminAuthorizationGuard.enforceAdminSeparation("Viewer"); // Standard customer role, should be blocked!
    throw new Error(`Security Test Failed: Guard should block customer role from admin access.`);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    if (!errMsg.includes("is not a recognized Administrative Role")) {
      throw err;
    }
  }

  // 5. Test Sensitive Values Masker
  const maskedKey = AdminAuthorizationGuard.maskSensitiveValue("apiKey", "sk-proj-super-long-api-key");
  if (maskedKey !== "sk-p...-key") {
    throw new Error(`Security Test Failed: API Key should be masked, got ${maskedKey}`);
  }

  const unmaskedVal = AdminAuthorizationGuard.maskSensitiveValue("endpointUrl", "https://api.openai.com/v1");
  if (unmaskedVal !== "https://api.openai.com/v1") {
    throw new Error(`Security Test Failed: Non-sensitive values should not be masked, got ${unmaskedVal}`);
  }

  console.log("✅ Admin Security & Access Control Tests Passed Successfully!");
}
export { ROLE_HIERARCHY };
