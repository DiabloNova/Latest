# 11. Security Architecture
## AI Brand Intelligence & Visibility Platform

This security architecture defines our identity protection systems, multi-tenant isolation, data encryption rules, secrets management, security audit logging, and regulatory compliance standards.

---

## 11.1 Identity & Access Governance

Our security systems implement a zero-trust architecture across all layers:

```
+-----------------------------------------------------------------------------------------+
|                                    SECURITY ENGINE                                      |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Authentication   ===> Standard email logins, MFA checks, Enterprise SSO/SAML integrations.|
|   2. RBAC Policies    ===> Role-Based Access Control, explicit permission validation layers.|
|   3. Multi-Tenancy    ===> Logical database isolation verifying tenant_id constraints.  |
|   4. Data Encryption  ===> SSL/TLS in-transit, AES-256 encryption at-rest.               |
|   5. Secrets Manager  ===> Encrypted credentials storage (HashiCorp Vault / Cloud KMS). |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 11.2 Multi-Tenant Data Isolation
To prevent any risk of data leakage between workspaces, data isolation is enforced across three operational layers:

1.  **Application Routing Guardrails**: Standard API routers parse the authenticated session context, extracting and binding the `active_workspace_id` variable to prevent cross-workspace tampering.
2.  **Logical Database Partition Isolation**: All transactional SQL queries include explicit tenant constraints (e.g., `WHERE workspace_id = $1`). Any query missing this workspace constraint is blocked by our database interface layer.
3.  **Encrypted Project Separation**: Enterprise RAG documents and raw data are stored in dynamically assigned database schemas or isolated vector database namespaces, protecting proprietary customer assets.

---

## 11.3 Encryption Specifications

*   **In-Transit**: All API connections and web traffic are secured using TLS 1.3 (with TLS 1.2 as a legacy fallback). HTTP Strict Transport Security (HSTS) is enabled to force secure browser connections.
*   **At-Rest**: High-value database volumes, system tables, and object stores are encrypted using military-grade AES-256 keys managed by local or cloud KMS engines.
*   **Field-Level Database Encryption**: Sensitive user data, including API tokens, OAuth keys, and password hashes, are encrypted before being written to PostgreSQL tables using secure cryptographic libraries (e.g., `pgp_sym_encrypt`).

---

## 11.4 Secrets Management
*   **Secrets Storage**: Raw secrets, third-party LLM API keys, database credentials, and token-signing certificates are stored securely inside dedicated Secrets Management systems (such as HashiCorp Vault or AWS Secrets Manager).
*   **Key Rotation Policies**: Access keys and certificates are rotated automatically every 90 days. System configurations are updated dynamically without requiring platform redeployments.

---

## 11.5 Security Audit Logging
*   **Audit Logger**: A secure, write-once-read-many (WORM) logging pipeline records all administrative, billing, and security actions.
*   **Logged Parameters**: Each audit event records:
    *   `timestamp` (ISO UTC).
    *   `user_id` and `workspace_id`.
    *   `action_type` (e.g., `USER_LOGIN_SUCCESS`, `API_KEY_ROTATED`, `BILLING_UPGRADE_FAILED`).
    *   `origin_ip_address` and `user_agent`.
*   **Storage Integrity**: Audit logs are streamed directly to isolated logging servers and are excluded from standard database cascading delete operations.

---

## 11.6 Regulatory Compliance Alignments

The platform architecture complies with international and regional security standards:

```
+-----------------------------------------------------------------------------------------+
|                                    COMPLIANCE STANDARDS                                 |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. GDPR (Europe)        ===> Provides the right to be forgotten and data export tools.|
|   2. CCPA (California)    ===> Supports data access rights, opt-outs, and tracking limits.|
|   3. SOC2 / ISO 27001     ===> Aligns with corporate enterprise security guidelines.     |
|   4. Regional Protocols   ===> Adheres to local data storage rules for government/banks.|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

1.  **GDPR (General Data Protection Regulation)**: Full support for the "Right to be Forgotten" (triggering cascading deletes of personal user profiles) and standardized JSON personal data export interfaces.
2.  **CCPA (California Consumer Privacy Act)**: Clear privacy opt-out flows, strict data tracking exclusions, and cookie permission management.
3.  **SOC2 Type II & ISO 27001 Compliance**: System logs, security policies, logical access controls, and code deployments align with standard enterprise security requirements.
4.  **Regional Data Compliance Protocols**: Supports localized cloud storage configurations to meet strict data residency requirements for government, logistics, and banking clients in our primary markets.
