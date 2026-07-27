"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Globe, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Renders a localized marketing landing page with authentication-aware workspace access and platform feature information.
 */
export default function MarketingLandingPage() {
  const { login, session } = useAuth();
  const { language } = useTheme();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await login(email);
    setIsLoading(false);
  };

  const features = [
    {
      title: language === "fa" ? "بهینه‌سازی موتور مولد (GEO)" : "Generative Engine Optimization",
      desc: language === "fa"
        ? "پایش و بهینه‌سازی دقیق ردپای برند شما جهت برجسته‌سازی در خروجی مدل‌های هوش مصنوعی."
        : "Systematically track and optimize your brand footprint to be highlighted in RAG pipelines.",
      icon: Cpu,
    },
    {
      title: language === "fa" ? "بهینه‌سازی موتور پاسخگو (AEO)" : "Answer Engine Optimization",
      desc: language === "fa"
        ? "ساختاردهی مراجع متنی جهت معرفی مستقیم دامنه‌های وب‌سایت شما در Perplexity."
        : "Structure your outbound link context to be cited as direct recommendation sources in Perplexity.",
      icon: Globe,
    },
    {
      title: language === "fa" ? "محافظت در برابر توهم مدل‌ها" : "Brand Hallucination Protection",
      desc: language === "fa"
        ? "کشف فوری ادعاهای نادرست و حقایق تحریف‌شده در مورد محصولات و مدیران شما."
        : "Instantly detect when language models output factual inaccuracies about your company.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#001F3F] text-white">
      {/* Header */}
      <header className="h-20 w-full flex items-center justify-between px-6 md:px-12 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-[#007BFF] flex items-center justify-center font-black text-lg">
            AI
          </div>
          <span className="font-bold text-lg tracking-wider">
            {language === "fa" ? "هوشمندی برند" : "BrandIntelligence"}
          </span>
        </div>

        {session.status === "authenticated" ? (
          <Link href={`/${language}/dashboard`}>
            <Button variant="secondary" size="sm">
              {language === "fa" ? "ورود به میز کار" : "Go to Workspace"}
            </Button>
          </Link>
        ) : (
          <span className="text-xs text-white/50 hidden md:inline font-mono">
            {language === "fa" ? "نسخه فاز ۱ بومی (ایران)" : "SaaS Platform v1.0 (Phase 1 localized)"}
          </span>
        )}
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center max-w-5xl mx-auto space-y-12">
        <div className="space-y-6">
          <Badge variant="info" className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1">
            {language === "fa" ? "فاز ۱ پلتفرم بومی و بین‌المللی" : "Next-Generation AEO & GEO Platform"}
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            {language === "fa"
              ? "حضور و جایگاه برند شما در نتایج جستجوی عصر هوش مصنوعی"
              : "Your Brand, Correctly Represented in the AI Discovery Era"}
          </h1>

          <p className="text-sm md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {language === "fa"
              ? "سنجش، محافظت و بهینه‌سازی نحوه ارجاع به خدمات، محصولات و مدیران شما در پلتفرم‌های ChatGPT، Gemini، Claude و Perplexity."
              : "Measure, protect, and optimize how your products, executives, and services are referenced across ChatGPT, Gemini, Claude, and Perplexity models."}
          </p>
        </div>

        {/* Low friction Sandbox entry login */}
        {session.status === "authenticated" ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">
              {language === "fa" ? "ورود فعال با ایمیل" : "Logged in as"}{" "}
              <span className="text-white font-semibold">{session.user?.email}</span>
            </p>
            <Link href={`/${language}/dashboard`} className="inline-block">
              <Button variant="secondary" size="lg" className="flex items-center gap-2 font-bold">
                <span>{language === "fa" ? "ورود به پیشخوان کاربری" : "Enter Admin Console"}</span>
                <ArrowRight size={18} className="rtl:-scale-x-100" />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-md p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-4 text-start">
              <div className="space-y-1">
                <h3 className="text-sm font-bold">
                  {language === "fa" ? "ورود سریع به میز کار آزمایشی" : "Access the Platform Workspace"}
                </h3>
                <p className="text-xs text-slate-400">
                  {language === "fa"
                    ? "جهت ورود به پنل، ایمیل سازمانی خود را وارد کنید."
                    : "Enter your business email address for sandbox demonstration."}
                </p>
              </div>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/15 text-white placeholder-slate-400"
              />
              <Button type="submit" variant="secondary" className="w-full font-bold" disabled={isLoading}>
                {isLoading
                  ? (language === "fa" ? "در حال اعتبارسنجی..." : "Validating Secure Session...")
                  : (language === "fa" ? "ورود به نسخه دمو" : "Access Live Sandbox Demo")}
              </Button>
            </form>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-start w-full">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="p-6 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all duration-200">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[#3399FF] inline-block mb-4">
                  <Icon size={20} className="rtl:-scale-x-100" />
                </div>
                <h3 className="font-bold text-base mb-2 text-white">{feature.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 w-full flex items-center justify-between px-6 border-t border-white/5 text-xs text-slate-500 font-mono">
        <span>© {new Date().getFullYear()} AI Brand Intelligence.</span>
        <span>{language === "fa" ? "امنیت سیستم برقرار است." : "All systems secure."}</span>
      </footer>
    </div>
  );
}
