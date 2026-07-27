import React from "react";
import { AuthProvider } from "@/components/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { persianPrimary, persianDisplay } from "@/config/fonts";
import "../globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Configures the localized application layout and provider hierarchy.
 *
 * @param params - Resolves to the current route locale.
 * @returns The document layout containing the localized direction, theme provider, authentication provider, and page content.
 */
export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Apply both primary and display font variable classes to html
  const fontClasses = `${persianPrimary.variable} ${persianDisplay.variable}`;

  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} className={fontClasses}>
      <body>
        <ThemeProvider initialLanguage={locale as "en" | "fa"}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
