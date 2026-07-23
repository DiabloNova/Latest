"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Dialog } from "@/components/Dialog";
import { KPIMetricCard } from "@/components/KPIMetricCard";
import { AIVisibilityMap } from "@/components/AIVisibilityMap";
import { EntityExplorerCard } from "@/components/EntityExplorerCard";
import { CitationStream } from "@/components/CitationStream";
import { AIRecommendationEngine } from "@/components/AIRecommendationEngine";
import {
  TrendingUp,
  MessageSquare,
  FileText,
  AlertCircle,
  Plus
} from "lucide-react";

export default function DashboardPage() {
  const { session } = useAuth();
  const { language } = useTheme();

  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [newBrandName, setNewBrandName] = useState("");
  const [newBrandDomain, setNewBrandDomain] = useState("");

  const metrics = [
    {
      title: language === "fa" ? "سهم صدای مدل (SoMV)" : "Share of Model Voice (SoMV)",
      value: "64.8%",
      change: "+3.4%",
      changeType: "success" as const,
      description: language === "fa" ? "در تمامی موتورهای اصلی" : "Across ChatGPT, Claude, Gemini",
      icon: TrendingUp,
      confidence: "94%",
      sparklineData: [40, 50, 45, 60, 55, 70, 65, 80],
      distribution: [
        { name: "GPT", percentage: 42 },
        { name: "Claude", percentage: 31 },
        { name: "Perp", percentage: 27 }
      ]
    },
    {
      title: language === "fa" ? "شاخص احساسات مخاطب" : "Sentiment Index",
      value: "82 / 100",
      change: "+1.2%",
      changeType: "success" as const,
      description: language === "fa" ? "تحلیل کیفی معنایی در بستر مدل‌ها" : "Qualitative semantic analysis",
      icon: MessageSquare,
      confidence: "91%",
      sparklineData: [60, 62, 65, 70, 68, 75, 78, 82],
      distribution: [
        { name: "GPT", percentage: 50 },
        { name: "Claude", percentage: 30 },
        { name: "Perp", percentage: 20 }
      ]
    },
    {
      title: language === "fa" ? "کل استنادات ثبت شده" : "Total Citations Indexed",
      value: "1,420",
      change: "+12.4%",
      changeType: "success" as const,
      description: language === "fa" ? "لینک‌های ارجاع فعال معتبر" : "Verified outbound citations",
      icon: FileText,
      confidence: "98%",
      sparklineData: [30, 45, 55, 70, 85, 100, 115, 120],
      distribution: [
        { name: "GPT", percentage: 38 },
        { name: "Claude", percentage: 42 },
        { name: "Perp", percentage: 20 }
      ]
    },
    {
      title: language === "fa" ? "هشدارهای امنیتی برند" : "Critical Brand Alerts",
      value: "2 Active",
      change: "Action Required",
      changeType: "error" as const,
      description: language === "fa" ? "پایش پاسخ‌های مغایر با حقیقت" : "Potential hallucination detected",
      icon: AlertCircle,
      confidence: "99%",
      sparklineData: [100, 90, 80, 60, 40, 20, 10, 5],
      distribution: [
        { name: "GPT", percentage: 50 },
        { name: "Claude", percentage: 50 },
        { name: "Perp", percentage: 0 }
      ]
    },
  ];

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddBrandOpen(false);
    setNewBrandName("");
    setNewBrandDomain("");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Command Center Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">
            {language === "fa"
              ? `مرکز فرماندهی هوشمندی برند: ${session.user?.name || "کاربر گرامی"}`
              : `AI Brand Intelligence Command Center`}
          </h1>
          <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-2xl leading-relaxed">
            {language === "fa"
              ? "مرکز پایش، ارزیابی پایداری مراجع، رفع تضادهای اطلاعاتی و بهینه‌سازی فعال موجودیت‌های وب شما در هسته مدل‌های زبانی."
              : "Active monitoring workspace. Securing brand entity representations, tracking prompt query intents, and managing outward links across top AI systems."}
          </p>
        </div>

        <Button onClick={() => setIsAddBrandOpen(true)} className="flex items-center gap-2 self-start sm:self-auto shadow-sm">
          <Plus size={16} />
          <span>{language === "fa" ? "ثبت موجودیت برند" : "Register Brand Entity"}</span>
        </Button>
      </div>

      {/* Upgraded KPI Cards Banner */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, idx) => (
          <KPIMetricCard key={idx} {...metric} />
        ))}
      </div>

      {/* Visually stunning graphics section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Visibility Flow Map */}
        <AIVisibilityMap className="lg:col-span-2" />

        {/* Entity Knowledge Explorer card */}
        <EntityExplorerCard />
      </div>

      {/* Citation Streams and Prescriptive AI recommendations */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Improved Citation Stream */}
        <CitationStream className="lg:col-span-2" />

        {/* Improved Optimization Center */}
        <AIRecommendationEngine />
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

          <div className="flex items-center gap-3 justify-end pt-4 border-t border-[var(--border)]">
            <Button variant="outline" type="button" onClick={() => setIsAddBrandOpen(false)}>
              {language === "fa" ? "انصراف" : "Cancel"}
            </Button>
            <Button variant="secondary" type="submit">
              {language === "fa" ? "ایجاد و شروع اسکن" : "Register & Run Audit"}
            </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}
