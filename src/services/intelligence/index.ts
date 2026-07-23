export interface IntelligenceInsight {
  id: string;
  engine: "ChatGPT" | "Gemini" | "Claude" | "Perplexity";
  title: string;
  description: string;
  sentiment: "positive" | "negative" | "neutral";
  createdAt: string;
}

export interface BrandIntelligenceScore {
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  factors: { name: string; score: number }[];
}

export const intelligenceService = {
  async getInsights(workspaceId: string): Promise<IntelligenceInsight[]> {
    return [
      {
        id: "ins-01",
        engine: "Perplexity",
        title: "Missing entity linking in high-intent queries",
        description: "Your brand is referenced but lacks direct citations back to the root website for ecommerce queries.",
        sentiment: "neutral",
        createdAt: new Date().toISOString(),
      },
      {
        id: "ins-02",
        engine: "ChatGPT",
        title: "Rising Positive Sentiment alignment",
        description: "Latest GPT-4o benchmarks show a +12% increase in brand recommendation density for logistics services.",
        sentiment: "positive",
        createdAt: new Date().toISOString(),
      }
    ];
  },

  async getBrandScore(workspaceId: string): Promise<BrandIntelligenceScore> {
    return {
      score: 78,
      grade: "B",
      factors: [
        { name: "Citation Authority", score: 85 },
        { name: "Information Density", score: 72 },
        { name: "Model Trust Score", score: 80 },
        { name: "RAG Cosine Alignment", score: 75 }
      ]
    };
  }
};
