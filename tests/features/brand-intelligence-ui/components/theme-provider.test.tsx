/**
 * Brand Intelligence UI — ThemeProvider Locale Initialization Tests
 * Covers: src/components/ThemeProvider.tsx (initialLanguage prop)
 */

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ThemeProvider, useTheme } from "../../../../src/components/ThemeProvider";

const ThemeInfoProbe: React.FC = () => {
  const { language, direction, theme } = useTheme();
  return <div data-testid="theme-info">{`${language}|${direction}|${theme}`}</div>;
};

export function testThemeProviderInitialLanguage() {
  console.log("▶ Running ThemeProvider initialLanguage Tests...");

  // 1. Explicit initialLanguage="fa" should seed language=fa and direction=rtl on first render.
  const faMarkup = renderToStaticMarkup(
    <ThemeProvider initialLanguage="fa">
      <ThemeInfoProbe />
    </ThemeProvider>
  );
  if (!faMarkup.includes("fa|rtl|light")) {
    throw new Error(`ThemeProvider Test Failed: expected "fa|rtl|light" in markup, got: ${faMarkup}`);
  }

  // 2. Explicit initialLanguage="en" should seed language=en and direction=ltr on first render.
  const enMarkup = renderToStaticMarkup(
    <ThemeProvider initialLanguage="en">
      <ThemeInfoProbe />
    </ThemeProvider>
  );
  if (!enMarkup.includes("en|ltr|light")) {
    throw new Error(`ThemeProvider Test Failed: expected "en|ltr|light" in markup, got: ${enMarkup}`);
  }

  // 3. Omitting initialLanguage should fall back to the "fa" default (per component signature).
  const defaultMarkup = renderToStaticMarkup(
    <ThemeProvider>
      <ThemeInfoProbe />
    </ThemeProvider>
  );
  if (!defaultMarkup.includes("fa|rtl|light")) {
    throw new Error(`ThemeProvider Test Failed: expected default initialLanguage to resolve to "fa|rtl|light", got: ${defaultMarkup}`);
  }

  // 4. Regression: useTheme() must still throw when used outside of a ThemeProvider.
  const OrphanProbe: React.FC = () => {
    useTheme();
    return null;
  };
  let threw = false;
  try {
    renderToStaticMarkup(<OrphanProbe />);
  } catch (err: unknown) {
    threw = true;
    const message = err instanceof Error ? err.message : String(err);
    if (!message.includes("useTheme must be used within a ThemeProvider")) {
      throw new Error(`ThemeProvider Test Failed: unexpected error message from useTheme(): ${message}`);
    }
  }
  if (!threw) {
    throw new Error("ThemeProvider Test Failed: useTheme() should throw when rendered outside of ThemeProvider");
  }

  console.log("✅ ThemeProvider initialLanguage Tests Passed Successfully!");
}