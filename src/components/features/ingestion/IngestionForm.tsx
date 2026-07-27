"use client";

import React, { useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { apiClient, IngestionResult } from "@/lib/api/client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";

export function IngestionForm() {
  const { language } = useTheme();
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IngestionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Custom overrides for chunk size
  const [maxChunkSize, setMaxChunkSize] = useState<number>(500);
  const [overlap, setOverlap] = useState<number>(50);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await apiClient.ingestDocument(
        text,
        { source: "user-ingestion-form", language },
        { maxChunkSize, overlap }
      );
      setResult(res);
      if (res.success && res.failedChunks === 0) {
        setText(""); // Clear on total success
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const isFa = language === "fa";

  return (
    <Card className="shadow-xs border-[var(--border)] bg-[var(--card)]">
      <CardHeader className="pb-3 border-b border-[var(--border)]">
        <CardTitle className="text-lg font-bold text-[var(--text-primary)]">
          {isFa ? "افزودن و نمایه‌سازی سند" : "Add & Index Document"}
        </CardTitle>
        <CardDescription className="text-xs text-[var(--text-secondary)] mt-1">
          {isFa
            ? "متن خام سند را برای تقسیم‌بندی، تولید بردار معنایی و تحلیل احساسات بارگذاری کنید."
            : "Upload raw text to chunk, generate semantic embeddings, and process sentiment analysis."}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-[var(--text-secondary)]">
              {isFa ? "متن سند (فارسی یا انگلیسی)" : "Document Text (Persian or English)"}
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={
                isFa
                  ? "متن خود را در این قسمت وارد کنید تا به صورت خودکار تحلیل و اینجست شود..."
                  : "Paste your text content here for automatic processing and ingestion..."
              }
              className="w-full min-h-[180px] p-3 text-sm rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--background)] text-[var(--text-primary)] focus:outline-hidden focus:ring-2 focus:ring-[var(--color-accent-600)] transition-all resize-y font-sans leading-relaxed placeholder:text-[var(--text-muted)]"
              disabled={isLoading}
              required
            />
          </div>

          {/* Advanced Chunking Configuration Accordion/Collapsible */}
          <details className="group border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--background)]">
            <summary className="list-none flex items-center justify-between p-3 text-xs font-bold text-[var(--text-secondary)] cursor-pointer select-none">
              <span>{isFa ? "⚙️ تنظیمات پیشرفته شکستن متن" : "⚙️ Advanced Chunking Config"}</span>
              <span className="transition-transform group-open:rotate-180">▼</span>
            </summary>
            <div className="p-3 border-t border-[var(--border)] grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)]">
                  {isFa ? "حداکثر طول بخش (کاراکتر)" : "Max Chunk Size (chars)"}
                </label>
                <input
                  type="number"
                  value={maxChunkSize}
                  onChange={(e) => setMaxChunkSize(parseInt(e.target.value) || 500)}
                  min={10}
                  max={2000}
                  className="w-full p-2 text-xs rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--color-accent-600)]"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-[var(--text-muted)]">
                  {isFa ? "هم‌پوشانی کاراکترها" : "Overlap Size (chars)"}
                </label>
                <input
                  type="number"
                  value={overlap}
                  onChange={(e) => setOverlap(parseInt(e.target.value) || 50)}
                  min={0}
                  max={500}
                  className="w-full p-2 text-xs rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] focus:ring-1 focus:ring-[var(--color-accent-600)]"
                  disabled={isLoading}
                />
              </div>
            </div>
          </details>

          <Button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="w-full font-bold flex items-center justify-center gap-2 py-2.5"
          >
            {isLoading ? (
              <>
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>{isFa ? "درحال پردازش معنایی..." : "Processing & Embedding..."}</span>
              </>
            ) : (
              <span>{isFa ? "پردازش و نمایه‌سازی اطلاعات" : "Process & Analyze Document"}</span>
            )}
          </Button>
        </form>

        {/* Global API error notification */}
        {error && (
          <div className="p-3 text-xs bg-red-500/10 border border-red-500/20 text-red-500 rounded-[var(--radius-md)] flex flex-col gap-1">
            <span className="font-bold">{isFa ? "خطا در برقراری ارتباط:" : "Request Error:"}</span>
            <p className="font-mono">{error}</p>
          </div>
        )}

        {/* Result summary and partial failure handling */}
        {result && (
          <div className="space-y-3 pt-2">
            <Card className="border-[var(--border)] bg-[var(--background)] p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--text-primary)]">
                  {isFa ? "گزارش پردازش نهایی سند" : "Document Ingestion Summary"}
                </span>
                <Badge variant={result.success ? "success" : "error"}>
                  {result.success
                    ? isFa
                      ? "با موفقیت ثبت شد"
                      : "Ingested Successfully"
                    : isFa
                    ? "خطا در فرآیند"
                    : "Failed Ingestion"}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--card)]">
                  <div className="text-lg font-black text-[var(--text-primary)]">{result.totalChunks}</div>
                  <div className="text-[9px] uppercase font-bold text-[var(--text-muted)] mt-0.5">
                    {isFa ? "کل بخش‌ها" : "Total Chunks"}
                  </div>
                </div>
                <div className="p-2 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--card)]">
                  <div className="text-lg font-black text-emerald-500">{result.processedChunks}</div>
                  <div className="text-[9px] uppercase font-bold text-[var(--text-muted)] mt-0.5">
                    {isFa ? "موفق" : "Processed"}
                  </div>
                </div>
                <div className="p-2 border border-[var(--border)] rounded-[var(--radius-sm)] bg-[var(--card)]">
                  <div className="text-lg font-black text-red-500">{result.failedChunks}</div>
                  <div className="text-[9px] uppercase font-bold text-[var(--text-muted)] mt-0.5">
                    {isFa ? "ناموفق" : "Failed"}
                  </div>
                </div>
              </div>

              {/* Detail warnings for failed chunks */}
              {result.failedChunks > 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 rounded-[var(--radius-sm)] space-y-1.5">
                  <div className="text-xs font-bold flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>
                      {isFa
                        ? "برخی از بخش‌های سند با خطا مواجه شدند:"
                        : "Partial successes! Some chunks failed to save:"}
                    </span>
                  </div>
                  <ul className="text-[10px] list-disc list-inside space-y-1 font-mono leading-relaxed">
                    {result.errors.map((err, idx) => (
                      <li key={idx}>
                        {isFa ? `بخش ${err.chunkIndex}:` : `Chunk ${err.chunkIndex}:`} {err.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
