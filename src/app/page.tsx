"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Badge } from "@/components/Badge";
import { Globe, ShieldCheck, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

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
      title: "Generative Engine Optimization",
      desc: "Systematically track and optimize your brand footprint to be highlighted in RAG pipelines.",
      icon: Cpu,
    },
    {
      title: "Answer Engine Optimization",
      desc: "Structure your outbound link context to be cited as direct recommendation sources in Perplexity.",
      icon: Globe,
    },
    {
      title: "Brand Hallucination Protection",
      desc: "Instantly detect when language models output factual inaccuracies about your company.",
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
          <span className="font-bold text-lg tracking-wider">BrandIntelligence</span>
        </div>

        {session.status === "authenticated" ? (
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              Go to Workspace
            </Button>
          </Link>
        ) : (
          <span className="text-xs text-white/50 hidden md:inline font-mono">
            SaaS Platform v1.0 (Phase 1 localized)
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
            Your Brand, Correctly Represented in the AI Discovery Era
          </h1>

          <p className="text-sm md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Measure, protect, and optimize how your products, executives, and services are referenced across ChatGPT, Gemini, Claude, and Perplexity models.
          </p>
        </div>

        {/* Low friction Sandbox entry login */}
        {session.status === "authenticated" ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-400">Logged in as <span className="text-white font-semibold">{session.user?.email}</span></p>
            <Link href="/dashboard" className="inline-block">
              <Button variant="secondary" size="lg" className="flex items-center gap-2 font-bold">
                <span>Enter Admin Console</span>
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-md p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <h3 className="text-sm font-bold">Access the Platform Workspace</h3>
                <p className="text-xs text-slate-400">Enter your business email address for sandbox demonstration.</p>
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
                {isLoading ? "Validating Secure Session..." : "Access Live Sandbox Demo"}
              </Button>
            </form>
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left w-full">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="p-6 bg-white/[0.03] border border-white/5 rounded-xl hover:bg-white/[0.05] transition-all duration-200">
                <div className="p-2.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-[#3399FF] inline-block mb-4">
                  <Icon size={20} />
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
        <span>All systems secure.</span>
      </footer>
    </div>
  );
}
