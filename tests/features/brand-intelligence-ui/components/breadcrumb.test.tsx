/**
 * Brand Intelligence UI — Breadcrumb Component Tests
 * Covers: src/components/Breadcrumb.tsx
 */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Breadcrumb } from "../../../../src/components/Breadcrumb";

function countOccurrences(haystack: string, needle: string): number {
  return haystack.split(needle).length - 1;
}

export function testBreadcrumbRendering() {
  console.log("▶ Running Breadcrumb Tests...");

  // 1. All item labels must be present in the rendered markup, in order.
  const markup = renderToStaticMarkup(
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Analytics" },
      ]}
    />
  );

  for (const label of ["Home", "Dashboard", "Analytics"]) {
    if (!markup.includes(label)) {
      throw new Error(`Breadcrumb Test Failed: expected markup to contain "${label}"`);
    }
  }
  if (markup.indexOf("Home") > markup.indexOf("Dashboard") || markup.indexOf("Dashboard") > markup.indexOf("Analytics")) {
    throw new Error("Breadcrumb Test Failed: items were not rendered in the provided order");
  }

  // 2. A 3-item breadcrumb must render exactly 2 separators (one before each non-first item),
  //    using the RTL-mirroring class introduced in this PR (rtl:-scale-x-100), not the legacy rtl:rotate-180.
  const separatorCount = countOccurrences(markup, "rtl:-scale-x-100");
  if (separatorCount !== 2) {
    throw new Error(`Breadcrumb Test Failed: expected 2 separators, found ${separatorCount}`);
  }
  if (markup.includes("rtl:rotate-180")) {
    throw new Error("Breadcrumb Test Failed: legacy rtl:rotate-180 class should no longer be used");
  }

  // 3. Non-last items with an href must render as anchor tags pointing to that href.
  if (!markup.includes('href="/"') || !markup.includes('href="/dashboard"')) {
    throw new Error("Breadcrumb Test Failed: expected non-last items with href to render as links");
  }

  // 4. The last item must always render as plain text (span), even if it has an href.
  const markupWithLastHref = renderToStaticMarkup(
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Current", href: "/current" },
      ]}
    />
  );
  if (markupWithLastHref.includes('href="/current"')) {
    throw new Error("Breadcrumb Test Failed: last item should never render as a link, even when href is provided");
  }
  if (!markupWithLastHref.includes("Current")) {
    throw new Error("Breadcrumb Test Failed: last item label should still be rendered as text");
  }

  // 5. A single-item breadcrumb must render with zero separators.
  const singleMarkup = renderToStaticMarkup(<Breadcrumb items={[{ label: "Only" }]} />);
  if (countOccurrences(singleMarkup, "rtl:-scale-x-100") !== 0) {
    throw new Error("Breadcrumb Test Failed: a single-item breadcrumb should not render any separators");
  }

  console.log("✅ Breadcrumb Tests Passed Successfully!");
}