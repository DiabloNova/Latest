"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { apiClient, RetrievedChunk } from "@/lib/api/client";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/Card";
import { Button } from "@/components/Button";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: Date;
  sources?: RetrievedChunk[];
}

export function BrandIntelligenceChat() {
  const { language } = useTheme();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput("");
    setError(null);

    // 1. Append user message
    const userMsg: ChatMessage = {
      id: "msg-" + Date.now() + "-user",
      sender: "user",
      text: userText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // 2. Query Brand Intelligence API
      const response = await apiClient.queryBrandIntelligence(userText);

      // 3. Append assistant message
      const assistantMsg: ChatMessage = {
        id: "msg-" + Date.now() + "-assistant",
        sender: "assistant",
        text: response.answer,
        timestamp: new Date(),
        sources: response.sources,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setIsLoading(false);
    }
  };

  const isFa = language === "fa";

  return (
    <Card className="shadow-xs border-[var(--border)] bg-[var(--card)] flex flex-col h-[560px]">
      <CardHeader className="pb-3 border-b border-[var(--border)]">
        <CardTitle className="text-lg font-bold text-[var(--text-primary)]">
          {isFa ? "امپراتور پاسخ‌گو (RAG Chat)" : "Brand Intelligence RAG Chat"}
        </CardTitle>
        <CardDescription className="text-xs text-[var(--text-secondary)] mt-1">
          {isFa
            ? "از مدل‌های زبانی درباره جایگاه برند، سهم صدا و توصیه‌ها به صورت مستند بپرسید."
            : "Query generative models about brand positioning, Share of Voice, and recommendations with citations."}
        </CardDescription>
      </CardHeader>

      {/* Chat scroll workspace */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2">
            <span className="text-3xl">💬</span>
            <h4 className="font-bold text-sm text-[var(--text-primary)]">
              {isFa ? "شروع گفتگو با مشاور برند هوشمند" : "Start Brand Intelligence Chat"}
            </h4>
            <p className="text-xs text-[var(--text-muted)] max-w-[280px] leading-relaxed">
              {isFa
                ? "هر سوالی درباره برند خود، محصولات یا رقبایتان دارید بپرسید تا با مراجعه به منابع مستند پاسخ دهم."
                : "Ask any question about your brand, competitors, or positioning to query retrieved vector documents."}
            </p>
          </div>
        )}

        {messages.map((msg) => {
          const isUser = msg.sender === "user";
          return (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                isUser ? (isFa ? "mr-auto items-end" : "ml-auto items-end") : (isFa ? "ml-auto items-start" : "mr-auto items-start")
              }`}
            >
              {/* Message bubble */}
              <div
                className={`p-3 text-sm leading-relaxed rounded-[var(--radius-lg)] shadow-xs ${
                  isUser
                    ? "bg-[var(--color-accent-600)] text-white rounded-br-none"
                    : "bg-[var(--background)] border border-[var(--border)] text-[var(--text-primary)] rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-wrap font-sans">{msg.text}</p>
              </div>

              {/* Timestamp block */}
              <span className="text-[9px] text-[var(--text-muted)] mt-1 px-1.5">
                {msg.timestamp.toLocaleTimeString(isFa ? "fa-IR" : "en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>

              {/* RAG sources references (Collapsible Accordion style) */}
              {!isUser && msg.sources && msg.sources.length > 0 && (
                <div className="w-full mt-2">
                  <details className="group border border-[var(--border)] rounded-[var(--radius-md)] bg-[var(--background)] overflow-hidden">
                    <summary className="list-none flex items-center justify-between p-2 text-[10px] font-bold text-[var(--text-secondary)] bg-[var(--card)] border-b border-[var(--border)] cursor-pointer select-none">
                      <span>🔗 {isFa ? "منابع و استنادات معنایی" : "Semantic Sources & Citations"}</span>
                      <span className="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div className="p-2 space-y-2 max-h-[160px] overflow-y-auto">
                      {msg.sources.map((source, sIdx) => (
                        <div key={source.id || sIdx} className="p-2 rounded-sm border border-[var(--border)] bg-[var(--card)] text-[10px] space-y-1">
                          <div className="flex items-center justify-between font-bold text-[var(--text-muted)]">
                            <span>#{sIdx + 1}</span>
                            <span className="text-emerald-500">
                              {isFa ? "میزان شباهت:" : "Similarity Score:"} {Math.round(source.similarityScore * 100)}%
                            </span>
                          </div>
                          <p className="text-[var(--text-secondary)] leading-relaxed italic">
                            {"..."}{source.content}{"..."}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] p-2">
            <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 rounded-full bg-[var(--text-muted)] animate-bounce" style={{ animationDelay: "300ms" }} />
            <span className="ms-1.5">{isFa ? "مشاور درحال بازیابی اطلاعات و پاسخ‌گویی..." : "Thinking..."}</span>
          </div>
        )}

        {error && (
          <div className="p-2 text-xs bg-red-500/10 border border-red-500/20 text-red-500 rounded-[var(--radius-md)]">
            <span className="font-bold">{isFa ? "خطای سیستم:" : "System Error:"}</span> {error}
          </div>
        )}
      </div>

      {/* Input panel block */}
      <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] bg-[var(--background)] rounded-b-[var(--radius-lg)] flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isFa
              ? "سوال خود را درباره برندتان بنویسید..."
              : "Ask a question about your brand..."
          }
          className="flex-1 p-2.5 text-xs rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-[var(--text-primary)] focus:outline-hidden focus:ring-1 focus:ring-[var(--color-accent-600)]"
          disabled={isLoading}
          required
        />
        <Button type="submit" disabled={isLoading || !input.trim()} className="font-bold px-4 text-xs shrink-0">
          {isFa ? "ارسال" : "Send"}
        </Button>
      </form>
    </Card>
  );
}
