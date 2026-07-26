/**
 * Brand Intelligence UI — Locale Redirect Proxy (Middleware) Tests
 * Covers: src/proxy.ts (proxy, config)
 */

import type { NextRequest } from "next/server";
import { proxy, config } from "../../../src/proxy";

function makeRequest(pathname: string, base = "http://localhost:3000"): NextRequest {
  return {
    nextUrl: { pathname },
    url: `${base}${pathname}`,
  } as unknown as NextRequest;
}

export function testProxyMiddleware() {
  console.log("▶ Running proxy (locale redirect middleware) Tests...");

  // 1. Root path "/" must redirect to the default locale "/fa".
  const rootRequest = makeRequest("/");
  const rootResponse = proxy(rootRequest);
  const location = rootResponse.headers.get("location");
  if (location !== "http://localhost:3000/fa") {
    throw new Error(`Proxy Test Failed: expected redirect to "http://localhost:3000/fa", got "${location}"`);
  }
  if (rootResponse.status < 300 || rootResponse.status >= 400) {
    throw new Error(`Proxy Test Failed: expected a 3xx redirect status for "/", got ${rootResponse.status}`);
  }

  // 2. Root path redirect must preserve a different origin/base correctly.
  const rootRequestAltOrigin = makeRequest("/", "https://brand.example.com");
  const altResponse = proxy(rootRequestAltOrigin);
  if (altResponse.headers.get("location") !== "https://brand.example.com/fa") {
    throw new Error("Proxy Test Failed: redirect should preserve the original request origin");
  }

  // 3. Any already-localized path must NOT be redirected.
  for (const pathname of ["/fa", "/en", "/fa/dashboard", "/en/dashboard/intelligence"]) {
    const request = makeRequest(pathname);
    const response = proxy(request);
    if (response.headers.get("location")) {
      throw new Error(`Proxy Test Failed: path "${pathname}" should not be redirected, but got a location header`);
    }
  }

  // 4. Non-root, non-locale paths (e.g. static assets) must also pass through untouched.
  const assetResponse = proxy(makeRequest("/favicon.ico"));
  if (assetResponse.headers.get("location")) {
    throw new Error("Proxy Test Failed: unrelated asset paths should not be redirected");
  }

  // 5. The middleware matcher config must be scoped to the root path only.
  if (config.matcher.length !== 1 || config.matcher[0] !== "/") {
    throw new Error(`Proxy Test Failed: expected matcher to be ["/"], got ${JSON.stringify(config.matcher)}`);
  }

  console.log("✅ proxy (locale redirect middleware) Tests Passed Successfully!");
}