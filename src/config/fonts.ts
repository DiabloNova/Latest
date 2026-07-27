/**
 * Optimus AI — Premium Persian Font Configuration
 *
 * DESIGN STRATEGY:
 * - Phase 1 (Current): Uses Google Fonts 'Vazirmatn' for maximum build stability and instant testing.
 * - Phase 2 (Migration): Swap to 'next/font/local' once the custom fonts are uploaded in the root 'font/' directory.
 *
 * TO MIGRATE TO LOCAL FONTS:
 * 1. Uncomment the 'localFont' import below.
 * 2. Comment out the google font 'Vazirmatn' imports.
 * 3. Uncomment and configure the 'persianPrimary' localFont block.
 * 4. Export it as the primary sans font.
 */

import { Vazirmatn } from "next/font/google";

// ==========================================
// PHASE 1: GOOGLE FONTS PLACEHOLDER
// ==========================================
export const persianPrimary = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-persian-primary",
  display: "swap",
});

// For headings or display text, using the same variable or subset if needed
export const persianDisplay = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["700", "800", "900"],
  variable: "--font-persian-display",
  display: "swap",
});


// ==========================================
// PHASE 2: LOCAL FONTS MIGRATION TEMPLATE
// ==========================================
/*
import localFont from 'next/font/local';

export const persianPrimary = localFont({
  src: [
    { path: '../../font/Vazirmatn-Light.woff2', weight: '300', style: 'normal' },
    { path: '../../font/Vazirmatn-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../font/Vazirmatn-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../font/Vazirmatn-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../font/Vazirmatn-Bold.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-persian-primary',
  display: 'swap',
});

export const persianDisplay = localFont({
  src: [
    { path: '../../font/Vazirmatn-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../font/Vazirmatn-Black.woff2', weight: '900', style: 'normal' },
  ],
  variable: '--font-persian-display',
  display: 'swap',
});
*/
