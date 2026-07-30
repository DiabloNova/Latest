"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: LucideIcon;
  delay?: number;
}

export function KPICard({
  title,
  value,
  trend,
  trendValue,
  icon: Icon,
  delay = 0,
}: KPICardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] p-6 backdrop-blur-xl shadow-[var(--glass-shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--sky-blue-500)]/40 hover:shadow-[0_20px_40px_rgba(56,189,248,0.15)]"
    >
      {/* Subtle gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--sky-blue-500)] to-[var(--orange-500)] opacity-0 transition-opacity duration-300 group-hover:opacity-5 pointer-events-none" />

      <div className="relative z-10 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h3 className="text-sm font-medium text-[var(--text-muted)]">
            {title}
          </h3>
          {Icon && (
            <div className="rounded-xl bg-[var(--muted-surface)] p-2.5 text-[var(--color-primary-600)] transition-colors duration-300 group-hover:bg-[var(--color-primary-600)] group-hover:text-white">
              <Icon size={20} className="rtl:-scale-x-100" />
            </div>
          )}
        </div>

        {/* Value */}
        <div className="text-3xl font-bold tracking-tight text-[var(--text-primary)] drop-shadow-sm">
          {value}
        </div>

        {/* Trend (Optional) */}
        {trend && trendValue && (
          <div className="flex items-center gap-2 text-sm">
            <span
              className={`flex items-center gap-1 font-medium ${
                trend === "up"
                  ? "text-[var(--color-success)]"
                  : trend === "down"
                  ? "text-[var(--color-error)]"
                  : "text-[var(--text-muted)]"
              }`}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}
              {trendValue}
            </span>
            <span className="text-[var(--text-muted)]">نسبت به دوره قبل</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
