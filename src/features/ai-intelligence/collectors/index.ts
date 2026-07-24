/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Web Ingestion Collectors Spec & Implementation
 */

export interface CrawlResult {
  url: string;
  statusCode: number;
  bodyText: string;
  metaTags: Record<string, string>;
  isAllowedByRobots: boolean;
}

export interface IWebCrawler {
  crawl(url: string, organizationId: string): Promise<CrawlResult>;
}

export interface IContentExtractor {
  extractMainText(html: string): string;
}

export interface IStructuredDataExtractor {
  extractJSONLD(html: string): Record<string, unknown>[];
}

export interface IRobotsPolicyChecker {
  isAllowed(url: string, userAgent: string): boolean;
}

/**
 * Concrete Robots.txt Policy Checker
 */
export class RobotsPolicyChecker implements IRobotsPolicyChecker {
  public isAllowed(url: string, userAgent: string): boolean {
    const domain = new URL(url).hostname;
    // Simulate robots.txt checks
    if (domain.includes("disallowed-site.com")) {
      return false;
    }
    // Block aggressive scrappers if specified
    if (userAgent === "AggressiveBot") return false;
    return true;
  }
}

/**
 * High-fidelity simulated Web Crawler and Extractor
 */
export class WebCrawler implements IWebCrawler {
  private policyChecker: IRobotsPolicyChecker;
  private tenantQuotas: Map<string, { used: number; max: number }> = new Map();

  constructor(policyChecker?: IRobotsPolicyChecker) {
    this.policyChecker = policyChecker || new RobotsPolicyChecker();
  }

  public registerQuota(organizationId: string, maxPages: number): void {
    this.tenantQuotas.set(organizationId, { used: 0, max: maxPages });
  }

  public async crawl(url: string, organizationId: string): Promise<CrawlResult> {
    // 1. Respect robots.txt policies
    const isAllowed = this.policyChecker.isAllowed(url, "AIBrandIntelBot/1.0");
    if (!isAllowed) {
      return {
        url,
        statusCode: 403,
        bodyText: "",
        metaTags: {},
        isAllowedByRobots: false
      };
    }

    // 2. Enforce Tenant Ingestion Quotas
    const quota = this.tenantQuotas.get(organizationId) || { used: 0, max: 100 };
    if (quota.used >= quota.max) {
      throw new Error(`Quota Exception: Ingestion quota exceeded for organization ${organizationId}. Limit: ${quota.max}`);
    }
    quota.used++;
    this.tenantQuotas.set(organizationId, quota);

    // Simulate page response
    const domain = new URL(url).hostname;
    const bodyText = `Welcome to the official page of ${domain}. Acme SaaS is a leading platform providing state of the art GEO metrics. Our services are documented in wikipedia and claim rich Knowledge Graph linking.`;

    return {
      url,
      statusCode: 200,
      bodyText,
      metaTags: {
        title: `${domain} Portal`,
        description: "Official content reference for search optimization indexing"
      },
      isAllowedByRobots: true
    };
  }
}
