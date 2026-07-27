"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Input } from "@/components/Input";
import { Dialog } from "@/components/Dialog";
import { IngestionForm } from "@/components/features/ingestion/IngestionForm";
import { BrandIntelligenceChat } from "@/components/features/rag/BrandIntelligenceChat";
import { intelligenceService } from "@/services/intelligence";
import { BrandHealthMetrics } from "@/schemas/intelligence";
import {
  TrendingUp,
  MessageSquare,
  FileText,
  AlertCircle,
  Plus,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

// Premium loading skeleton component
const Skeleton = () => (
  <div className="space-y-6">
    {/* Welcome Header Skeleton */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-white/5 rounded-xl" />
        <div className="h-4 w-96 bg-white/5 rounded-lg" />
      </div>
      <div className="h-10 w-36 bg-white/5 rounded-xl" />
    </div>

    {/* Metrics Cards Skeleton */}
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="animate-pulse">
          <div className="flex items-start justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-3 w-2/3 bg-white/5 rounded" />
              <div className="h-8 w-1/2 bg-white/5 rounded" />
            </div>
            <div className="w-10 h-10 bg-white/5 rounded-lg" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="h-5 w-12 bg-white/5 rounded-full" />
            <div className="h-3 w-20 bg-white/5 rounded" />
          </div>
        </Card>
      ))}
    </div>

    {/* RAG Section Skeletons */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-[420px] bg-white/5 rounded-2xl animate-pulse" />
      <div className="h-[420px] bg-white/5 rounded-2xl animate-pulse" />
    </div>
  </div>
);

/**
 * Renders the brand health dashboard with metrics, citations, optimization tasks, and brand registration controls.
 *
 * Loads authenticated workspace metrics and provides localized loading, error, and retry states.
 *
 * @returns The dashboard interface for the authenticated workspace.
 */
export default function DashboardPage() {
  const { session } = useAuth();
  const { language } = useTheme();

  const [data, setData] = useState<BrandHealthMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandDomain, setNewBrandDomain] = useState("");

  useEffect(() => {
    if (session.status !== "authenticated") return;

    let active = true;

    const performFetch = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await intelligenceService.getBrandHealthMetrics(
          session.user?.workspaceId || "ws-tehran"
        );
        if (active) {
          setData(res);
        }
      } catch (err: unknown) {
        if (active) {
          const errorMessage = err instanceof Error ? err.message : "Failed to load brand health metrics";
          setError(errorMessage);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    performFetch();

    return () => {
      active = false;
    };
  }, [session.status, session.user?.workspaceId, refreshKey]);

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddBrandOpen(false);
    setNewBrandName("");
    setNewBrandDomain("");
  };

  const handleRetry = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // High-fidelity error state renderer
  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6 animate-fade-in">
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full">
          <AlertCircle size={40} />
        </div>
        <div className="max-w-md space-y-2">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {language === "fa" ? "خطا در بارگذاری اطلاعات" : "Failed to Load Workspace"}
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            {language === "fa"
              ? "متأسفانه ارتباط با سرور هوشمندی برند برقرار نشد. لطفاً مجدداً تلاش فرمایید."
              : "We were unable to validate your brand security metrics or fetch the live stream. Please try again."}
          </p>
          {error && <p className="text-xs text-[var(--text-muted)] font-mono mt-1">{error}</p>}
        </div>
        <Button variant="outline" onClick={handleRetry} className="flex items-center gap-2">
          <RefreshCw size={14} />
          <span>{language === "fa" ? "تلاش مجدد" : "Retry Connection"}</span>
        </Button>
      </div>
    );
  }

  if (isLoading || !data) {
    return <Skeleton />;
  }

  const metrics = [
    {
      title: language === "fa" ? "سهم صدای مدل (SoMV)" : "Share of Model Voice (SoMV)",
      value: `${((data.sentimentScore + 5) * 0.8).toFixed(1)}%`,
      change: data.mentionVolumeChange,
      changeType: "success" as const,
      description: language === "fa" ? "در تمامی موتورهای هوش مصنوعی اصلی" : "Across ChatGPT, Claude, Gemini, Perplexity",
      icon: TrendingUp,
    },
    {
      title: language === "fa" ? "شاخص احساسات مخاطب" : "Sentiment Index",
      value: `${data.sentimentScore} / 100`,
      change: data.sentimentChange,
      changeType: "success" as const,
      description: language === "fa" ? "تحلیل کیفی معنایی در بستر مدل‌ها" : "Qualitative semantic analysis",
      icon: MessageSquare,
    },
    {
      title: language === "fa" ? "کل استنادات ثبت شده" : "Total Citations Indexed",
      value: data.totalCitations.toLocaleString(),
      change: data.totalCitationsChange,
      changeType: "success" as const,
      description: language === "fa" ? "لینک‌های ارجاع فعال معتبر" : "Verified outbound citations",
      icon: FileText,
    },
    {
      title: language === "fa" ? "هشدارهای امنیتی برند" : "Critical Brand Alerts",
      value: `${data.activeAlertsCount} Active`,
      change: "Action Required",
      changeType: "error" as const,
      description: language === "fa" ? "پایش پاسخ‌های مغایر با حقیقت" : "Potential hallucination detected",
      icon: AlertCircle,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)] font-display">
            {language === "fa"
              ? `خوش آمدید، ${session.user?.name || "کاربر گرامی"}`
              : `Welcome back, ${session.user?.name || "Guest"}`}
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {language === "fa"
              ? "بررسی و مدیریت لحظه‌ای پایداری حضور برند شما در نتایج هوش مصنوعی و مدل‌های زبانی."
              : "Overview of your brand's presence metrics across leading generative answer platforms."}
          </p>
        </div>

        <Button onClick={() => setIsAddBrandOpen(true)} className="flex items-center gap-2 self-start sm:self-auto">
          <Plus size={16} />
          <span>{language === "fa" ? "افزودن برند جدید" : "Register Brand"}</span>
        </Button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} hoverable>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
                    {metric.title}
                  </span>
                  <span className="text-2xl font-black text-[var(--text-primary)] block font-display">
                    {metric.value}
                  </span>
                </div>
                <div className="p-2.5 bg-white/[0.02] border border-white/10 rounded-xl text-[#1F76F9]">
                  <Icon size={18} className="rtl:-scale-x-100" />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-[10px]">
                <Badge variant={metric.changeType}>
                  {metric.change}
                </Badge>
                <span className="text-[var(--text-muted)] truncate max-w-[150px]">
                  {metric.description}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Live RAG & Ingestion Console Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <IngestionForm />
        <BrandIntelligenceChat />
      </div>

      {/* Analytical Layout Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Core AI Search Monitoring Widget */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{language === "fa" ? "پایش زنده استنادات و مراجع" : "Live Citation Stream"}</CardTitle>
                <CardDescription>
                  {language === "fa"
                    ? "نمای لحظه‌ای از نحوه ارجاع مدل‌ها به دارایی‌های وب شما."
                    : "Real-time logs of queries yielding direct links to your web domains."}
                </CardDescription>
              </div>
              <Link href={`/${language}/dashboard/intelligence`}>
                <Button variant="outline" size="sm" className="text-xs">
                  {language === "fa" ? "مشاهده همه" : "View All"}
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-start border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] text-[var(--text-muted)] font-bold uppercase bg-white/[0.01]">
                    <th className="py-3 px-4 text-start">{language === "fa" ? "مدل" : "Engine"}</th>
                    <th className="py-3 px-4 text-start">{language === "fa" ? "کوئری فرضی" : "Prompt Query"}</th>
                    <th className="py-3 px-4 text-start">{language === "fa" ? "نوع ارجاع" : "Type"}</th>
                    <th className="py-3 px-4 text-start">{language === "fa" ? "زمان" : "Occurred"}</th>
                    <th className="py-3 px-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-xs">
                  {data.recentCitations.map((cit) => (
                    <tr key={cit.id} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 px-4 font-bold text-[var(--text-primary)]">
                        {cit.engine}
                      </td>
                      <td className="py-3 px-4 text-[var(--text-secondary)] italic max-w-[200px] truncate">
                        &ldquo;{cit.query}&rdquo;
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={cit.status === "Verified Citation" ? "success" : "info"}>
                          {cit.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-[10px] text-[var(--text-muted)]">
                        {cit.time}
                      </td>
                      <td className="py-3 px-4 text-end">
                        <a
                          href={cit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex p-1 text-[var(--text-muted)] hover:text-[#1F76F9] transition-colors"
                        >
                          <ExternalLink size={14} className="rtl:-scale-x-100" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Action Center Widget */}
        <Card>
          <CardHeader>
            <CardTitle>{language === "fa" ? "اقدامات فوری بهینه‌سازی" : "Optimization Center"}</CardTitle>
            <CardDescription>
              {language === "fa"
                ? "وظایف پیشنهادی هوش مصنوعی برای ارتقای رتبه و سهم صدای برند."
                : "AI-generated steps to secure brand citation anchors."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  {language === "fa" ? "افزودن اسکیما به صفحات فرود" : "Inject Schema on Product Pages"}
                </p>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {language === "fa" ? "فرمت JSON-LD به مدل‌ها در درک موجودیت‌ها کمک می‌کند." : "Provides structured context for ChatGPT models."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  {language === "fa" ? "رفع خطای توکنایزر زبان فارسی" : "Address Hallucinated Claims"}
                </p>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {language === "fa" ? "درخواست اسکن هدفمند جدید برای رفع تناقض‌های متنی." : "Create target benchmarks for incorrect statements."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  {language === "fa" ? "به‌روزرسانی ساختار llms.txt" : "Publish structured llms.txt"}
                </p>
                <p className="text-[10px] text-[var(--text-secondary)] mt-0.5 leading-relaxed">
                  {language === "fa" ? "به‌روزرسانی دسترسی ربات‌های جمع‌آوری داده هوش مصنوعی." : "Allows seamless crawling by Perplexity crawler engines."}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* REGISTER BRAND DIALOG */}
      <Dialog
        isOpen={isAddBrandOpen}
        onClose={() => setIsAddBrandOpen(false)}
        title={language === "fa" ? "ثبت برند جدید در پنل پایش" : "Register Brand Context"}
      >
        <form onSubmit={handleAddBrand} className="space-y-4">
          <Input
            label={language === "fa" ? "نام رسمی برند" : "Official Brand Name"}
            placeholder={language === "fa" ? "مثال: دیجی کالا" : "e.g., Tehran Ecommerce Corp"}
            value={newBrandName}
            onChange={(e) => setNewBrandName(e.target.value)}
            required
          />
          <Input
            label={language === "fa" ? "دامنه وب‌سایت اصلی" : "Root Web Domain"}
            placeholder="https://example.ir"
            value={newBrandDomain}
            onChange={(e) => setNewBrandDomain(e.target.value)}
            required
          />

          <div className="flex items-center gap-3 justify-end pt-4 border-t border-white/5">
            <Button variant="outline" type="button" onClick={() => setIsAddBrandOpen(false)}>
              {language === "fa" ? "انصراف" : "Cancel"}
            </Button>
            <Button variant="primary" type="submit">
              {language === "fa" ? "ایجاد و شروع اسکن" : "Register & Run Audit"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
