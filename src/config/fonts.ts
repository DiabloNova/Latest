/**
 * Optimus AI — Premium Persian Font Configuration
 *
 * Uses the custom "Peyda" typeface (local files in /public/fonts) for the
 * Persian/Farsi experience with a full weight range (Thin → Black).
 * Both the primary body font and the display/heading font are mapped to Peyda
 * so the entire product renders in a single, cohesive Persian typeface.
 */

import localFont from "next/font/local";

// ==========================================
// PEYDA — Primary Persian typeface (body)
// ==========================================
export const persianPrimary = localFont({
  src: [
    { path: "../../public/fonts/Peyda-Thin.ttf", weight: "100", style: "normal" },
    { path: "../../public/fonts/Peyda-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Peyda-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Peyda-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Peyda-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-persian-primary",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

// ==========================================
// PEYDA — Display / heading typeface
// ==========================================
export const persianDisplay = localFont({
  src: [
    { path: "../../public/fonts/Peyda-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Peyda-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-persian-display",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});
