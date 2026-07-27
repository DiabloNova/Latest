import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { ArrowUpRight, ArrowDownRight, LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string | number;
  changeType?: "success" | "error" | "warning" | "info";
  description?: string;
  icon?: LucideIcon;
  loading?: boolean;
}

/**
 * Lightweight, high-performance, viewport-triggered count-up hook.
 * Formats numbers beautifully (e.g. adding commas) and respects Persian numerals natively.
 */
function useCountUp(value: string | number, duration = 1500) {
  const [display, setDisplay] = useState(() => String(value));
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    const str = String(value);
    const hasPersian = /[۰-۹]/.test(str);

    // Convert Persian digits to English for mathematical animation
    const englishStr = str.replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));

    // Extract first coherent number sequence
    const match = englishStr.match(/([+-]?\d[\d,.]*)/);
    if (!match) {
      return;
    }

    const numStr = match[1].replace(/,/g, "");
    const target = parseFloat(numStr) || 0;
    const hasDecimals = numStr.includes(".");
    const decimalPlaces = hasDecimals ? numStr.split(".")[1].length : 0;

    const index = str.indexOf(match[1]);
    const prefix = str.substring(0, index);
    const suffix = str.substring(index + match[1].length);

    let start: number | null = null;
    let animId: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);

      // Cubic ease-out curve
      const easeOut = 1 - Math.pow(1 - percentage, 3);
      const current = easeOut * target;

      let formatted = current.toFixed(decimalPlaces);
      if (!hasDecimals) {
        formatted = Math.floor(current).toLocaleString("en-US");
      } else {
        const parts = formatted.split(".");
        parts[0] = parseInt(parts[0], 10).toLocaleString("en-US");
        formatted = parts.join(".");
      }

      // Convert back to Persian digits if original value utilized them
      if (hasPersian) {
        formatted = formatted.replace(/\d/g, (d) => String.fromCharCode(d.charCodeAt(0) + 1776));
      }

      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < duration) {
        animId = requestAnimationFrame(step);
      } else {
        setDisplay(str); // ensure exact terminal value is drawn
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [value, duration, hasStarted]);

  return { elementRef, display };
}

/**
 * Premium glassmorphic KPI Card component.
 * Displays key metrics with viewport-triggered count-up animations and a micro-interactive trend badge.
 */
export const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  changeType = "info",
  description,
  icon: Icon,
  loading = false,
}) => {
  const { elementRef, display } = useCountUp(value, 1200);

  if (loading) {
    return (
      <Card className="animate-pulse p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-3 w-2/3 bg-white/5 rounded animate-pulse" />
            <div className="h-8 w-1/2 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="w-10 h-10 bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="h-5 w-12 bg-white/5 rounded-full animate-pulse" />
          <div className="h-3 w-20 bg-white/5 rounded animate-pulse" />
        </div>
      </Card>
    );
  }

  const isPositive = changeType === "success";
  const isNegative = changeType === "error";

  return (
    <div ref={elementRef} className="h-full">
      <Card hoverable className="p-6 h-full flex flex-col justify-between relative group overflow-hidden">
        {/* Subtle hover background highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F76F9]/[0.01] to-[#FF6F41]/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block opacity-80">
              {title}
            </span>
            <span
              className="text-2xl font-black text-[var(--text-primary)] block font-display tracking-tight transition-all duration-300"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.12)" }}
            >
              {display}
            </span>
          </div>
          {Icon && (
            <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl text-[#1F76F9] shadow-inner transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1F76F9]/5 group-hover:border-[#1F76F9]/20 group-hover:shadow-[0_0_15px_rgba(31,118,249,0.15)]">
              <Icon size={18} className="rtl:-scale-x-100" />
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between text-[10px] gap-2">
          {change && (
            <Badge
              variant={changeType}
              className={`py-1 px-2.5 rounded-full transition-all duration-300 ${
                isPositive ? "animate-pulse-subtle bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : ""
              }`}
            >
              <span className="flex items-center gap-1 font-bold">
                {isPositive && <ArrowUpRight size={12} />}
                {isNegative && <ArrowDownRight size={12} />}
                {change}
              </span>
            </Badge>
          )}
          {description && (
            <span className="text-[var(--text-muted)] truncate max-w-[160px] text-end opacity-85">
              {description}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
};
