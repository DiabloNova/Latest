"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import { Dropdown } from "@/components/Dropdown";
import { Button } from "@/components/Button";
import {
  LayoutDashboard,
  BrainCircuit,
  Network,
  Compass,
  BarChart3,
  Menu,
  X,
  Sun,
  Moon,
  Globe,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

interface DashboardShellProps {
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, direction, language, setLanguage } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeWorkspace, setActiveWorkspace] = useState("Enterprise Tehran Workspace");

  const navigationItems = [
    { name: language === "fa" ? "بررسی اجمالی" : "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: language === "fa" ? "هوشمندی برند" : "Brand Intelligence", href: "/dashboard/intelligence", icon: BrainCircuit },
    { name: language === "fa" ? "کاوشگر موجودیت‌ها" : "Entity Explorer", href: "/dashboard/entities", icon: Network },
    { name: language === "fa" ? "تحلیل رقابتی" : "Competitive Intel", href: "/dashboard/competitive", icon: Compass },
    { name: language === "fa" ? "آنالیتیکس پیشرفته" : "Advanced Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  ];

  const workspaceDropdownItems = [
    { label: "Enterprise Tehran Workspace", value: "tehran", onClick: () => setActiveWorkspace("Enterprise Tehran Workspace") },
    { label: "Global EMEA Workspace", value: "emea", onClick: () => setActiveWorkspace("Global EMEA Workspace") },
    { label: "GCC Regional Workspace", value: "gcc", onClick: () => setActiveWorkspace("GCC Regional Workspace") },
  ];

  const userDropdownItems = [
    { label: language === "fa" ? "پروفایل کاربری" : "My Profile", value: "profile" },
    { label: language === "fa" ? "تنظیمات سیستم" : "Settings", value: "settings" },
    { label: language === "fa" ? "خروج" : "Logout", value: "logout" },
  ];

  const toggleLanguage = () => {
    const newLang = language === "en" ? "fa" : "en";
    setLanguage(newLang);

    if (pathname) {
      const segments = pathname.split("/");
      // segments[0] is "", segments[1] is the locale ("en" or "fa")
      if (segments[1] === "en" || segments[1] === "fa") {
        segments[1] = newLang;
        router.push(segments.join("/"));
      } else {
        router.push(`/${newLang}${pathname}`);
      }
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Helper to prepend the active locale to a navigation link
  const getLocalizedHref = (href: string) => {
    return `/${language}${href === "/" ? "" : href}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]" dir={direction}>
      {/* HEADER ZONE */}
      <header className="sticky top-0 z-40 h-16 w-full flex items-center justify-between px-4 border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 hover:bg-[var(--card)] rounded-[var(--radius-sm)]"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo Mark */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--color-primary-700)] flex items-center justify-center text-white font-black text-lg tracking-wider shadow-sm">
              AI
            </div>
            <span className="hidden sm:inline font-bold text-lg text-[var(--text-primary)]">
              {language === "fa" ? "هوشمندی برند" : "BrandIntelligence"}
            </span>
          </div>

          <span className="hidden md:inline h-5 w-px bg-[var(--border)] mx-2" />

          {/* Workspace Selector */}
          <div className="hidden md:block">
            <Dropdown
              trigger={
                <Button variant="outline" size="sm" className="flex items-center gap-2 px-3 py-1 bg-[var(--card)] border-[var(--border)] font-semibold text-xs">
                  <span>{activeWorkspace}</span>
                  <span className="text-[var(--text-muted)] text-[8px]">▼</span>
                </Button>
              }
              items={workspaceDropdownItems}
            />
          </div>
        </div>

        {/* Global actions and user configuration */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Cmd+K placeholder for UX validation */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-md)] text-xs text-[var(--text-muted)] w-60">
            <Globe size={14} />
            <span>{language === "fa" ? "جستجو با میانبر Cmd+K..." : "Search commands (Cmd+K)..."}</span>
          </div>

          {/* Quick toggle controls */}
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="p-2" aria-label="Toggle Theme">
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </Button>

          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="p-2 font-bold text-xs" aria-label="Toggle Language">
            <div className="flex items-center gap-1.5">
              <Globe size={16} />
              <span className="uppercase">{language}</span>
            </div>
          </Button>

          {/* User Menu */}
          <Dropdown
            align="right"
            trigger={
              <button className="flex items-center gap-2 p-1.5 hover:bg-[var(--card)] rounded-[var(--radius-full)] transition-colors border border-[var(--border)]">
                <div className="w-7 h-7 rounded-full bg-[var(--color-accent-600)] text-white flex items-center justify-center text-xs font-bold uppercase">
                  U
                </div>
              </button>
            }
            items={userDropdownItems}
          />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION - DESKTOP */}
        <aside
          className={`hidden md:flex flex-col border-e border-[var(--border)] bg-[var(--background)] transition-all duration-300 ${
            sidebarOpen ? "w-60" : "w-16"
          }`}
        >
          {/* Navigation Area */}
          <nav className="flex-1 py-4 px-2 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const localizedHref = getLocalizedHref(item.href);
              const isActive = pathname === localizedHref || (item.href !== "/dashboard" && pathname?.startsWith(localizedHref));
              return (
                <Link
                  key={item.href}
                  href={localizedHref}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[var(--color-primary-700)] text-white font-medium shadow-sm"
                      : "text-[var(--text-secondary)] hover:bg-[var(--card)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {sidebarOpen && <span className="truncate">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Plan Quota indicators inside the sidebar bottom section */}
          {sidebarOpen && (
            <div className="p-4 border-t border-[var(--border)] bg-[var(--card)] mx-3 my-3 rounded-[var(--radius-md)] flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-[var(--text-secondary)]">{language === "fa" ? "سهمیه پایش مدل" : "Model Scans Quota"}</span>
                <span className="text-[var(--color-accent-600)]">72%</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--border)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--color-accent-600)] rounded-full" style={{ width: "72%" }} />
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">
                {language === "fa" ? "۷,۲۰۰ از ۱۰,۰۰۰ کوئری" : "7,200 of 10,000 queries"}
              </span>
            </div>
          )}

          {/* Sidebar Collapse Toggle */}
          <div className="p-3 border-t border-[var(--border)] flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-[var(--card)]"
            >
              <span className="rtl:-scale-x-100 inline-block">
                {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </span>
            </Button>
          </div>
        </aside>

        {/* MOBILE SIDEBAR DRAWERS */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Drawer Content */}
            <aside
              className={`relative w-64 max-w-sm bg-[var(--background)] h-full flex flex-col border-e border-[var(--border)] animate-in ${
                direction === "rtl" ? "slide-in-from-right" : "slide-in-from-left"
              } duration-200 z-10`}
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--border)]">
                <span className="font-bold text-lg">{language === "fa" ? "منوی اصلی" : "Main Menu"}</span>
                <Button variant="ghost" size="sm" onClick={() => setMobileSidebarOpen(false)} className="p-1">
                  <X size={20} />
                </Button>
              </div>

              {/* Workspace Mobile Selection */}
              <div className="p-4 border-b border-[var(--border)]">
                <Dropdown
                  trigger={
                    <Button variant="outline" size="sm" className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-[var(--card)]">
                      <span>{activeWorkspace}</span>
                      <span className="text-[var(--text-muted)] text-[8px]">▼</span>
                    </Button>
                  }
                  items={workspaceDropdownItems}
                />
              </div>

              <nav className="flex-1 py-4 px-2 space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const localizedHref = getLocalizedHref(item.href);
                  const isActive = pathname === localizedHref || (item.href !== "/dashboard" && pathname?.startsWith(localizedHref));
                  return (
                    <Link
                      key={item.href}
                      href={localizedHref}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-all duration-150 ${
                        isActive
                          ? "bg-[var(--color-primary-700)] text-white font-medium"
                          : "text-[var(--text-secondary)] hover:bg-[var(--card)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-[var(--border)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-accent-600)] text-white flex items-center justify-center font-bold">
                    U
                  </div>
                  <div>
                    <p className="text-sm font-bold">User Workspace</p>
                    <p className="text-xs text-[var(--text-muted)]">tehran@brandintel.ai</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* WORKSPACE & CONTENT CONTAINER */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <div className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </div>

          {/* GLOBAL STATUS BAR ZONE */}
          <footer className="h-8 border-t border-[var(--border)] bg-[var(--card)] flex items-center justify-between px-4 text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
              <span>{language === "fa" ? "تمام سیستم‌ها به صورت نرمال در حال کار هستند" : "All monitoring systems operational"}</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>{language === "fa" ? "همگام‌سازی: ۱ دقیقه پیش" : "DB Sync: 1m ago"}</span>
              <span>{language === "fa" ? "نسخه فاز ۱ بومی" : "Phase 1 Iran Engine"}</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};
