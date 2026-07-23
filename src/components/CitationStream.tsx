"use client";

import React, { useState } from "react";
import { Badge } from "./Badge";
import { useTheme } from "./ThemeProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card";
import { ExternalLink, Filter, MessageSquare, ShieldAlert, HeartHandshake, Eye } from "lucide-react";

export interface CitationItem {
  id: string;
  engine: "ChatGPT" | "Claude" | "Gemini" | "Perplexity";
  query: string;
  intent: "Transactional" | "Informational" | "Navigational" | "Commercial";
  type: "Verified Citation" | "Semantic Mention" | "Indirect Association";
  sentiment: "Positive" | "Neutral" | "Negative";
  authorityImpact: number; // 0-100 score
  url: string;
  time: string;
}

interface CitationStreamProps {
  className?: string;
}

export const CitationStream: React.FC<CitationStreamProps> = ({
  className = "",
}) => {
  const { language } = useTheme();
  const [activeFilter, setActiveFilter] = useState<"All" | "Verified" | "Semantic" | "Indirect">("All");

  const citations: CitationItem[] = [
    {
      id: "cit-1",
      engine: "Perplexity",
      query: "Top logistics providers in Iran",
      intent: "Commercial",
      type: "Verified Citation",
      sentiment: "Positive",
      authorityImpact: 88,
      url: "https://tehranlogistics.ir/services",
      time: "10m ago",
    },
    {
      id: "cit-2",
      engine: "ChatGPT",
      query: "Best online retail solutions in Tehran",
      intent: "Commercial",
      type: "Semantic Mention",
      sentiment: "Neutral",
      authorityImpact: 72,
      url: "https://tehranecom.ir/about",
      time: "1h ago",
    },
    {
      id: "cit-3",
      engine: "Claude",
      query: "Enterprise SaaS trends in GCC regional market",
      intent: "Informational",
      type: "Indirect Association",
      sentiment: "Positive",
      authorityImpact: 64,
      url: "https://tehranecom.ir/blog/saas-gcc",
      time: "4h ago",
    },
    {
      id: "cit-4",
      engine: "Gemini",
      query: "Is Tehran Ecommerce Corp SOC2 compliant?",
      intent: "Transactional",
      type: "Verified Citation",
      sentiment: "Positive",
      authorityImpact: 95,
      url: "https://tehranecom.ir/security",
      time: "1d ago",
    },
  ];

  const filteredCitations = citations.filter((cit) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Verified") return cit.type === "Verified Citation";
    if (activeFilter === "Semantic") return cit.type === "Semantic Mention";
    if (activeFilter === "Indirect") return cit.type === "Indirect Association";
    return true;
  });

  const getSentimentIcon = (sentiment: string) => {
    if (sentiment === "Positive") return <HeartHandshake size={12} className="text-[var(--color-success)]" />;
    if (sentiment === "Negative") return <ShieldAlert size={12} className="text-[var(--color-error)]" />;
    return <Eye size={12} className="text-[var(--color-info)]" />;
  };

  return (
    <Card className={`border border-[var(--border)] shadow-[var(--shadow-md)] bg-[var(--card)] ${className}`}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[var(--border)]">
        <div>
          <CardTitle className="text-base font-bold flex items-center gap-2">
            <MessageSquare size={18} className="text-[var(--color-accent-600)]" />
            <span>{language === "fa" ? "جریان استنادات زنده هوش مصنوعی" : "AI Citation Stream & Intent Tracker"}</span>
          </CardTitle>
          <CardDescription>
            {language === "fa" ? "پایش هوشمند نوع مرجعیت، سطح رضایتمندی و مقصود جستجو در موتورهای فعال" : "Real-time analysis of prompt queries, intent layers, and authority impacts"}
          </CardDescription>
        </div>

        {/* Filter Badges Row */}
        <div className="flex flex-wrap items-center gap-1 bg-[var(--background)] border border-[var(--border)] p-1 rounded-[var(--radius-md)]">
          {(["All", "Verified", "Semantic", "Indirect"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 text-xs font-semibold rounded-[var(--radius-sm)] transition-all duration-100 ${
                activeFilter === filter
                  ? "bg-[var(--color-primary-700)] text-white shadow-xs"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]"
              }`}
            >
              {filter === "All" ? (language === "fa" ? "همه جریان" : "All Stream") : filter}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rtl:text-right">
            <thead>
              <tr className="border-b border-[var(--border)] text-xs text-[var(--text-muted)] font-semibold uppercase bg-[var(--background)]">
                <th className="py-3 px-4">{language === "fa" ? "مدل" : "Engine"}</th>
                <th className="py-3 px-4">{language === "fa" ? "کوئری و مقصود" : "Prompt / Intent"}</th>
                <th className="py-3 px-4">{language === "fa" ? "نوع پیوند" : "Type"}</th>
                <th className="py-3 px-4">{language === "fa" ? "سیگنال و اثر مرجعیت" : "Sentiment & Impact"}</th>
                <th className="py-3 px-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-sm">
              {filteredCitations.map((cit) => (
                <tr key={cit.id} className="hover:bg-[var(--background)]/50 transition-colors">
                  {/* Engine badge */}
                  <td className="py-4 px-4">
                    <span className="font-bold text-[var(--text-primary)] block">{cit.engine}</span>
                    <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">{cit.time}</span>
                  </td>

                  {/* Query & Intent */}
                  <td className="py-4 px-4">
                    <span className="text-[var(--text-primary)] font-medium block max-w-[240px] truncate">
                      &ldquo;{cit.query}&rdquo;
                    </span>
                    <span className="text-[10px] text-[var(--color-accent-600)] bg-blue-500/5 border border-blue-500/10 px-1.5 py-0.5 rounded-[var(--radius-xs)] font-semibold inline-block mt-1">
                      {cit.intent}
                    </span>
                  </td>

                  {/* Link type badge */}
                  <td className="py-4 px-4">
                    <Badge variant={cit.type === "Verified Citation" ? "success" : "info"}>
                      {cit.type}
                    </Badge>
                  </td>

                  {/* Sentiment and impact metrics */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-secondary)]">
                        {getSentimentIcon(cit.sentiment)}
                        {cit.sentiment}
                      </span>
                      <span className="text-xs text-[var(--text-muted)]">|</span>
                      <span className="text-xs font-bold text-[var(--text-primary)]">
                        {cit.authorityImpact}% Impact
                      </span>
                    </div>
                  </td>

                  {/* Outbound Link */}
                  <td className="py-4 px-4 text-right">
                    <a
                      href={cit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex p-1.5 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--background)] hover:bg-[var(--card)] text-[var(--text-muted)] hover:text-[var(--color-accent-600)] transition-colors shadow-xs"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
