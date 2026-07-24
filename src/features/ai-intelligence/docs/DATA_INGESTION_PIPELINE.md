# Web Ingestion Collection Pipeline

This specification covers how reference data (public documentation, social profiles, news) is fetched and processed cleanly while respecting publisher boundaries.

---

## 1. Compliance Architecture

All Web Crawlers implemented must obey the following boundaries:

- **robots.txt Rules**: Verified through `IRobotsPolicyChecker`. Access is blocked on disallowed paths.
- **User Agent Identification**: Crawlers identify as `AIBrandIntelBot/1.0` allowing operators to throttle or grant permission.
- **Tenant Quotas**: The `WebCrawler` maintains strict organization metrics, throwing `Quota Exception` if page crawls exceed limits.

---

## 2. Ingestion Flow

1. Crawlers load target website, parsing content to resolve HTML structure.
2. Structured metadata (JSON-LD, Meta description tags) is extracted.
3. Raw text is sanitized, removing scripts and boilerplate before storing artifacts securely.
