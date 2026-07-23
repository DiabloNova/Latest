"use client";

import React from "react";
import { useTheme } from "@/components/ThemeProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Network, Tag, Calendar, ShieldCheck } from "lucide-react";

interface EntityExplorerCardProps {
  entityName?: string;
  className?: string;
}

export const EntityExplorerCard: React.FC<EntityExplorerCardProps> = ({
  entityName = "Tehran Ecommerce Corp",
  className = "",
}) => {
  const { language } = useTheme();

  const relationships = [
    { name: "Tehran Logistics", type: "Subsidiary", confidence: 96 },
    { name: "Digikala Group", type: "Strategic Partner", confidence: 88 },
    { name: "Seyed Alireza", type: "Founder / Executive", confidence: 99 },
  ];

  const topicHubs = [
    { label: "B2B SaaS Retail", match: "High" },
    { label: "Middle East Logistics", match: "High" },
    { label: "Fintech Integration Platforms", match: "Medium" },
  ];

  return (
    <Card className={`relative overflow-hidden border border-[var(--border)] shadow-[var(--shadow-md)] bg-[var(--card)] ${className}`}>
      {/* Decorative vertical lines simulating a digital grid */}
      <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[var(--color-primary-700)] to-[var(--color-accent-600)]" />

      <CardHeader>
        <div className="flex items-center gap-2">
          <Network className="text-[var(--color-accent-600)]" size={18} />
          <CardTitle className="text-base font-bold">
            {language === "fa" ? "کاوشگر موجودیت گراف دانش" : "Knowledge Graph Entity Explorer"}
          </CardTitle>
        </div>
        <CardDescription>
          {language === "fa" ? "موجودیت‌های معنایی ثبت شده در هسته معنایی مدل‌های زبانی" : "Verified semantic assertions registered inside NLP index structures"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Main Entity details */}
        <div className="p-3 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-md)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--text-muted)]">Subject Identity</span>
            <Badge variant="success" className="text-[10px] py-0">98% Confidence</Badge>
          </div>
          <p className="text-sm font-black text-[var(--text-primary)] mt-1">{entityName}</p>
          <span className="text-[10px] font-mono text-[var(--text-muted)]">Wikidata Node ID: Q12930219</span>
        </div>

        {/* Associated Entity Schema */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block">
            {language === "fa" ? "پیوندهای گراف موجودیت" : "Semantic Assertions / Connections"}
          </span>
          <div className="space-y-1.5">
            {relationships.map((rel) => (
              <div key={rel.name} className="flex items-center justify-between text-xs p-2 bg-[var(--background)] rounded-[var(--radius-sm)] border border-[var(--border)]">
                <div>
                  <span className="font-bold text-[var(--text-primary)]">{rel.name}</span>
                  <span className="text-[10px] text-[var(--text-muted)] ml-2 inline-block">({rel.type})</span>
                </div>
                <span className="font-semibold text-emerald-500">{rel.confidence}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top matching topics */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block">
            {language === "fa" ? "خوشه‌های موضوعی ثبت شده" : "Associated Topic Clusters"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {topicHubs.map((topic) => (
              <span key={topic.label} className="inline-flex items-center gap-1.5 px-2 py-1 bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius-sm)] text-[10px] text-[var(--text-secondary)] font-semibold">
                <Tag size={10} className="text-[var(--color-accent-600)]" />
                {topic.label}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
