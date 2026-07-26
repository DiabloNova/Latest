/**
 * Brand Intelligence UI — Dropdown Component Tests
 * Covers: src/components/Dropdown.tsx
 *
 * Note: The dropdown menu only opens in response to a client-side click event
 * (internal useState + document event listener), which cannot be simulated
 * without a DOM/jsdom-based interaction environment. These tests therefore
 * focus on the deterministic, effect-free initial static render, which is
 * the extent of what is verifiable via react-dom/server in this repository.
 */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Dropdown, DropdownItem } from "../../../../src/components/Dropdown";

const sampleItems: DropdownItem[] = [
  { label: "Profile", value: "profile" },
  { label: "Logout", value: "logout" },
];

export function testDropdownRendering() {
  console.log("▶ Running Dropdown Tests...");

  // 1. The trigger content must always be rendered.
  const markup = renderToStaticMarkup(
    <Dropdown trigger={<span>Open Menu</span>} items={sampleItems} />
  );
  if (!markup.includes("Open Menu")) {
    throw new Error("Dropdown Test Failed: expected trigger content to be rendered");
  }

  // 2. The menu is closed by default, so none of the item labels should be present.
  for (const item of sampleItems) {
    if (markup.includes(item.label)) {
      throw new Error(`Dropdown Test Failed: menu item "${item.label}" should not render while closed`);
    }
  }
  if (markup.includes('role="menu"')) {
    throw new Error('Dropdown Test Failed: menu container should not render while closed');
  }

  // 3. The default alignment ("left") and an explicit "right" alignment must both render
  //    without throwing, since alignment only affects markup once the menu is open.
  renderToStaticMarkup(<Dropdown trigger={<span>Trigger</span>} items={sampleItems} align="right" />);
  renderToStaticMarkup(<Dropdown trigger={<span>Trigger</span>} items={sampleItems} align="left" />);

  // 4. An empty items array must not throw when rendering the (closed) dropdown.
  renderToStaticMarkup(<Dropdown trigger={<span>Trigger</span>} items={[]} />);

  console.log("✅ Dropdown Tests Passed Successfully!");
}