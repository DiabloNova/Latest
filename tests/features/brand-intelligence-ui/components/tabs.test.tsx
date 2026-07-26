/**
 * Brand Intelligence UI — Tabs Component Tests
 * Covers: src/components/Tabs.tsx
 */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Tabs, TabItem } from "../../../../src/components/Tabs";

const sampleTabs: TabItem[] = [
  { id: "overview", label: "Overview", content: <div>Overview Content</div> },
  { id: "insights", label: "Insights", content: <div>Insights Content</div> },
  { id: "alerts", label: "Alerts", content: <div>Alerts Content</div> },
];

export function testTabsRendering() {
  console.log("▶ Running Tabs Tests...");

  // 1. Without a defaultTabId, the first tab must be active by default and its content rendered.
  const defaultMarkup = renderToStaticMarkup(<Tabs tabs={sampleTabs} />);
  if (!defaultMarkup.includes("Overview Content")) {
    throw new Error("Tabs Test Failed: expected the first tab's content to render by default");
  }
  if (defaultMarkup.includes("Insights Content") || defaultMarkup.includes("Alerts Content")) {
    throw new Error("Tabs Test Failed: only the active tab's content should be rendered");
  }
  for (const tab of sampleTabs) {
    if (!defaultMarkup.includes(tab.label)) {
      throw new Error(`Tabs Test Failed: expected tab label "${tab.label}" in header`);
    }
  }

  // 2. Passing defaultTabId should activate that specific tab instead of the first one.
  const alertsMarkup = renderToStaticMarkup(<Tabs tabs={sampleTabs} defaultTabId="alerts" />);
  if (!alertsMarkup.includes("Alerts Content")) {
    throw new Error("Tabs Test Failed: expected the tab matching defaultTabId to be active");
  }
  if (alertsMarkup.includes("Overview Content")) {
    throw new Error("Tabs Test Failed: the first tab's content should not render when defaultTabId overrides it");
  }

  // 3. The tabs header nav must use the gap-8 utility (flex gap) introduced in this PR,
  //    replacing the legacy space-x-8 utility.
  if (!defaultMarkup.includes("gap-8")) {
    throw new Error('Tabs Test Failed: expected tabs header nav to use "gap-8"');
  }
  if (defaultMarkup.includes("space-x-8")) {
    throw new Error('Tabs Test Failed: legacy "space-x-8" class should no longer be present');
  }

  // 4. An empty tabs array must not throw and should render no tab content.
  const emptyMarkup = renderToStaticMarkup(<Tabs tabs={[]} />);
  if (emptyMarkup.includes("Content")) {
    throw new Error("Tabs Test Failed: an empty tabs array should render no content");
  }

  // 5. A custom className must be applied to the root wrapper.
  const customClassMarkup = renderToStaticMarkup(<Tabs tabs={sampleTabs} className="custom-tabs-class" />);
  if (!customClassMarkup.includes("custom-tabs-class")) {
    throw new Error("Tabs Test Failed: expected custom className to be applied to the root element");
  }

  console.log("✅ Tabs Tests Passed Successfully!");
}