"use client";

import React from "react";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { useTheme } from "./ThemeProvider";
import { TrendingUp, TrendingDown, ShieldCheck, LucideIcon } from "lucide-react";

interface KPIMetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "success" | "warning" | "error" | "info" | "neutral";
  description: string;
  icon: LucideIcon;
  confidence?: string; // e.g. "98%"
  sparklineData?: number[]; // list of numbers for small sparkline
  distribution?: { name: string; percentage: number }[]; // distribution across LLMs
}

export const KPIMetricCard: React.FC<KPIMetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  description,
  icon: Icon,
  confidence = "92%",
  sparklineData = [40, 50, 45, 60, 55, 70, 65, 80],
  distribution,
}) => {
  const { language } = useTheme();
  const isPositive = changeType === "success";

  return (
    <Card hoverable className="relative overflow-hidden bg-[var(--card)] border border-[var(--border)] p-5 shadow-[var(--shadow-sm)] flex flex-col justify-between">
      {/* Visual top border indicator matching status */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${
        changeType === "success" ? "bg-[var(--color-success)]" :
        changeType === "error" ? "bg-[var(--color-error)]" :
        changeType === "warning" ? "bg-[var(--color-warning)]" : "bg-[var(--color-accent-400)]"
      }`} />

      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">
              {title}
            </span>
            <span className="text-2xl font-black text-[var(--text-primary)] block tracking-tight">
              {value}
            </span>
          </div>
          <div className="p-2 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[var(--color-accent-600)] shadow-xs">
            <Icon size={16} />
          </div>
        </div>

        {/* Sparkline & Trend section */}
        <div className="flex items-center gap-3 py-1">
          {/* Minimal Sparkline SVG */}
          <div className="w-16 h-6 flex-shrink-0">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path
                d={sparklineData.reduce((acc, val, idx) => {
                  const x = (idx / (sparklineData.length - 1)) * 100;
                  const y = 30 - (val / 100) * 25;
                  return `${acc} ${idx === 0 ? "M" : "L"} ${x} ${y}`;
                }, "")}
                fill="none"
                stroke={isPositive ? "var(--color-success)" : "var(--color-accent-600)"}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-xs">
              {isPositive ? (
                <TrendingUp size={12} className="text-[var(--color-success)]" />
              ) : (
                <TrendingDown size={12} className="text-[var(--color-error)]" />
              )}
              <span className={`font-bold ${isPositive ? "text-[var(--color-success)]" : "text-[var(--text-primary)]"}`}>
                {change}
              </span>
            </div>
            <span className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">
              {description}
            </span>
          </div>
        </div>

        {/* AI Source distribution bar if provided */}
        {distribution && (
          <div className="space-y-1 pt-1.5 border-t border-[var(--border)]">
            <div className="flex items-center justify-between text-[9px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
              <span>{language === "fa" ? "سهم مدل‌ها" : "Model Source Share"}</span>
              <span className="flex items-center gap-0.5">
                <ShieldCheck size={10} className="text-emerald-500" />
                {confidence} {language === "fa" ? "اطمینان" : "Conf"}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[var(--background)] rounded-full overflow-hidden flex">
              {distribution.map((dist, idx) => {
                const colors = ["bg-emerald-500", "bg-amber-500", "bg-blue-500", "bg-purple-500"];
                const color = colors[idx % colors.length];
                return (
                  <div
                    key={dist.name}
                    className={`${color} h-full`}
                    style={{ width: `${dist.percentage}%` }}
                    title={`${dist.name}: ${dist.percentage}%`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between text-[9px] text-[var(--text-muted)] font-medium">
              {distribution.map((dist) => (
                <span key={dist.name}>{dist.name} {dist.percentage}%</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
