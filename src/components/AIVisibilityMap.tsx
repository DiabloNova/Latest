"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";

interface AIVisibilityMapProps {
  brandName?: string;
  className?: string;
}

export const AIVisibilityMap: React.FC<AIVisibilityMapProps> = ({
  brandName = "Tehran Ecommerce Corp",
  className = "",
}) => {
  const { language } = useTheme();

  const models = [
    { name: "ChatGPT", share: 42, color: "bg-emerald-500", text: "text-emerald-500" },
    { name: "Claude", share: 31, color: "bg-amber-500", text: "text-amber-500" },
    { name: "Perplexity", share: 15, color: "bg-blue-500", text: "text-blue-500" },
    { name: "Gemini", share: 12, color: "bg-purple-500", text: "text-purple-500" },
  ];

  return (
    <div className={`bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-md)] relative overflow-hidden ${className}`}>
      {/* Visual Ambient Grid Backdrops */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-bold text-sm text-[var(--text-primary)] uppercase tracking-wider">
              {language === "fa" ? "نقشه پایداری حضور برند در مدل‌ها" : "AI Citation & Authority Flow Map"}
            </h4>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              {language === "fa" ? "مسیر ارتباطی و توزیع مرجعیت برند در پاسخ مدل‌های هوش مصنوعی" : "Factual routing pipelines from Knowledge Graph down to Citation targets"}
            </p>
          </div>
          <div className="text-xs px-2.5 py-1 bg-blue-500/10 text-[var(--color-accent-600)] border border-blue-500/20 font-bold rounded-full">
            {language === "fa" ? "پایش فعال" : "Active Tracking"}
          </div>
        </div>

        {/* The Graphic Pipeline Mapping */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center py-4">
          {/* Brand Source Node */}
          <div className="md:col-span-2 p-4 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] flex flex-col items-center justify-center text-center shadow-[var(--shadow-sm)] hover:border-[var(--color-accent-600)] transition-all">
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary-700)] text-white flex items-center justify-center font-black text-xs mb-2">
              ID
            </div>
            <span className="text-xs font-bold text-[var(--text-primary)]">{brandName}</span>
            <span className="text-[10px] text-[var(--text-muted)] mt-1">Wikidata: Q12903</span>
          </div>

          {/* Connectors Left-to-Right */}
          <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center text-[var(--text-muted)]">
            <span className="text-[10px] font-mono">EMBEDS</span>
            <div className="h-0.5 w-full bg-gradient-to-r from-[var(--border)] to-[var(--color-accent-600)]" />
          </div>

          {/* AI Model Intermediaries */}
          <div className="md:col-span-2 space-y-2">
            {models.map((model) => (
              <div key={model.name} className="flex items-center justify-between p-2 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)] text-xs hover:shadow-xs transition-all">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${model.color}`} />
                  <span className="font-bold text-[var(--text-primary)]">{model.name}</span>
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <span className="text-[var(--text-secondary)]">{model.share}%</span>
                  <span className="text-[10px] text-[var(--text-muted)]">SoMV</span>
                </div>
              </div>
            ))}
          </div>

          {/* Connectors Right-to-Left */}
          <div className="hidden md:flex md:col-span-1 flex-col items-center justify-center text-[var(--text-muted)]">
            <span className="text-[10px] font-mono">CITATIONS</span>
            <div className="h-0.5 w-full bg-gradient-to-r from-[var(--color-accent-600)] to-[var(--color-success)]" />
          </div>

          {/* End Citation target summary */}
          <div className="md:col-span-1 p-4 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)] flex flex-col items-center justify-center text-center shadow-[var(--shadow-sm)] hover:border-[var(--color-success)] transition-all">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-[var(--color-success)] border border-emerald-500/20 flex items-center justify-center font-black text-xs mb-2">
              92%
            </div>
            <span className="text-[10px] font-bold text-[var(--text-primary)]">{language === "fa" ? "اطمینان مراجع" : "Citation Trust"}</span>
            <span className="text-[9px] text-[var(--text-muted)] mt-1">{language === "fa" ? "سایت تایید شده" : "4 Primary URLs"}</span>
          </div>
        </div>

        {/* Aggregate Distribution Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--text-secondary)]">
            <span>{language === "fa" ? "توزیع سهم صدای مدل‌های فعال" : "Active Model SoMV Distribution"}</span>
            <span>Total: 100%</span>
          </div>
          <div className="h-2 w-full flex rounded-full overflow-hidden bg-[var(--border)]">
            {models.map((model) => (
              <div
                key={model.name}
                className={`${model.color} h-full first:rounded-l-full last:rounded-r-full transition-all`}
                style={{ width: `${model.share}%` }}
                title={`${model.name}: ${model.share}%`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
