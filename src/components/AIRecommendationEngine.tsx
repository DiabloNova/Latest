"use client";

import React from "react";
import { useTheme } from "./ThemeProvider";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./Card";
import { Badge } from "./Badge";
import { Sparkles, BrainCircuit, CheckCircle2, ArrowRight } from "lucide-react";

export interface Recommendation {
  id: string;
  problem: string;
  reasoning: string;
  action: string;
  impact: string;
  engineTarget: "ChatGPT" | "Gemini" | "Claude" | "Perplexity" | "Global";
}

interface AIRecommendationEngineProps {
  className?: string;
}

export const AIRecommendationEngine: React.FC<AIRecommendationEngineProps> = ({
  className = "",
}) => {
  const { language } = useTheme();

  const recommendations: Recommendation[] = [
    {
      id: "rec-1",
      problem: language === "fa" ? "فقدان داده‌های ساختاریافته ارگانها" : "Missing structured organization data schema",
      reasoning: "AI systems cannot confidently associate this entity with your parent brand without explicit metadata markers.",
      action: "Inject Schema.org JSON-LD organization definitions into product homepages.",
      impact: "+18% Citation Probability",
      engineTarget: "ChatGPT",
    },
    {
      id: "rec-2",
      problem: language === "fa" ? "مغایرت اطلاعاتی در مدل توکنایزر زبان فارسی" : "Incorrect claim regarding service availability",
      reasoning: "Outdated Persian forums led Claude models to state same-day courier service is not supported in Tehran.",
      action: "Deploy targeted RAG citations on trusted local blogs and official news feeds.",
      impact: "Resolve Hallucinated Claim",
      engineTarget: "Claude",
    },
    {
      id: "rec-3",
      problem: language === "fa" ? "خوشه موضوعی ضعیف در حوزه فین‌تک" : "Weak semantic density for fintech clusters",
      reasoning: "Perplexity search indexes are prioritizing competitor blogs due to higher keyword-to-entity density ratios.",
      action: "Optimize your resources and glossary section using our Semantic Writing Agent.",
      impact: "+24% Share of Model Voice (SoMV)",
      engineTarget: "Perplexity",
    }
  ];

  return (
    <Card className={`border border-[var(--border)] shadow-[var(--shadow-md)] bg-[var(--card)] relative overflow-hidden ${className}`}>
      {/* Visual top border indicating AI assistant presence */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <CardHeader className="pb-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Sparkles size={18} className="text-purple-500" />
          <CardTitle className="text-base font-bold">
            {language === "fa" ? "موتور توصیه‌گر هوشمند GEO" : "AI Recommendation & Decision Engine"}
          </CardTitle>
        </div>
        <CardDescription>
          {language === "fa" ? "اقدامات فنی پیشنهادی برای بهبود رتبه و پایداری مراجع برند در هسته مدل‌ها" : "Prescriptive optimization steps derived from conversational semantic contradictions"}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 space-y-5">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] space-y-3 transition-all hover:border-purple-500/30 hover:shadow-xs"
          >
            {/* Top Engine Target Tag */}
            <div className="flex items-center justify-between">
              <Badge variant="neutral" className="text-[9px] uppercase tracking-wider font-bold">
                {rec.engineTarget} Target
              </Badge>
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
                {rec.impact}
              </span>
            </div>

            {/* Problem & AI Reasoning */}
            <div className="space-y-1">
              <h4 className="text-xs font-black text-[var(--text-primary)]">
                {rec.problem}
              </h4>
              <p className="text-[11px] text-[var(--text-secondary)] italic">
                &ldquo;{rec.reasoning}&rdquo;
              </p>
            </div>

            {/* Prescriptive Action */}
            <div className="pt-2 border-t border-[var(--border)] flex items-start gap-2 text-xs">
              <BrainCircuit className="text-purple-500 flex-shrink-0 mt-0.5" size={14} />
              <div>
                <span className="font-bold text-[var(--text-primary)] block">Recommended Action:</span>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  {rec.action}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
