# Multi-Tenant Usage Metering Design

This specification details how the platform tracks consumption, enforces quotas, and restricts features per subscription plan tier.

---

## 1. Metered Resources

We meter consumption across four critical operations:

- **ai_requests**: Number of prompt dispatches made to LLM APIs.
- **crawled_pages**: Number of document/web pages fetched by web collectors.
- **prompt_executions**: Number of campaign prompt runs completed.
- **storage_kb**: Accrued disk space utilized to hold raw texts and graph nodes.

---

## 2. SaaS Subscription Quota Tiers

The **`QuotaManager`** enforces strict resource caps:

| Quota Resource | Free Tier | Growth Tier | Enterprise Tier |
| :--- | :--- | :--- | :--- |
| **maxAIRequests** | 100 | 2,000 | 100,000 |
| **maxCrawledPages** | 50 | 500 | 100,000 |
| **maxPromptExecutions** | 100 | 1,000 | 50,000 |
| **maxStorageKb** | 100 MB | 1 GB | 10 GB |

- **Billing Exceptions**: Attempting to record consumption exceeding these caps throws a `Billing Exception`, blocking further pipeline operations.
