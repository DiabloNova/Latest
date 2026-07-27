import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { VectorStoreService } from "@/services/knowledge-graph/vector-store";
import { generateEmbedding } from "@/services/ai/embed-client";
import { TenantContextManager } from "@/core/database/tenant-context";
import { getLLMClient, GeminiLLMClient, geminiFlashModel } from "@/services/ai/llm-client";
import { generateText } from "ai";

// Input validation schema
const requestSchema = z.object({
  question: z.string().min(1, "Question must be provided"),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Authentication and Tenant Validation
    const userId = req.headers.get("x-user-id");
    if (!userId || userId.trim() === "") {
      return NextResponse.json(
        { error: "Unauthorized", message: "Authentication fails entirely: missing valid user credentials" },
        { status: 401 }
      );
    }

    const tenantId = req.headers.get("x-tenant-id");
    if (!tenantId || tenantId.trim() === "") {
      return NextResponse.json(
        { error: "Bad Request", message: "Missing tenant context" },
        { status: 400 }
      );
    }

    // 2. Parse and validate JSON request body
    const body = await req.json();
    const parsed = requestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Bad Request", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { question } = parsed.data;

    // 3. Setup dynamic services and context
    const vectorStore = new VectorStoreService();
    const requestId = req.headers.get("x-request-id") || `req-rag-${Date.now()}`;

    // Execute the RAG flow inside the secure tenant context
    const response = await TenantContextManager.runWithTenantContext(
      tenantId,
      userId,
      requestId,
      async () => {
        // A. Generate embedding for the question
        const queryVector = await generateEmbedding(question);

        // B. Retrieve similar chunks from Vector Store
        const retrievedChunks = await vectorStore.findSimilarEmbeddings(
          tenantId,
          queryVector,
          3
        );

        // C. Synthesize Answer using LLM context or Mock
        let answer = "";
        const contextStr = retrievedChunks
          .map((chunk, idx) => `[منبع ${idx + 1}]: ${chunk.contentChunk}`)
          .join("\n\n");

        const client = getLLMClient();

        if (client instanceof GeminiLLMClient && geminiFlashModel) {
          const prompt = `
            You are "Optimus AI" Brand Intelligence expert. Answer the user's question based strictly on the provided context.
            If the context does not contain the answer, use your general knowledge to answer helpfully, but reference that the database has limited info.
            Always reply in Persian (Farsi) using a warm, professional, premium tone.

            Context:
            ${contextStr || "no context found in vector database."}

            Question: ${question}
            Answer:
          `;

          const result = await generateText({
            model: geminiFlashModel,
            prompt,
          });
          answer = result.text;
        } else {
          // Mock RAG response
          if (retrievedChunks.length > 0) {
            answer = `بر اساس اطلاعات یافت شده در منابع ما، به سوال شما پاسخ می‌دهم: \n\n${retrievedChunks[0].contentChunk.substring(0, 150)}...\n\nاین یک پاسخ هوشمند شبیه‌سازی شده است که مستقیماً بر مبنای محتوای ذخیره شده شما تولید شده است.`;
          } else {
            answer = `با تشکر از سوال شما درباره "${question}". از آنجایی که هنوز متنی را برای پردازش وارد سیستم نکرده‌اید، منبعی در پایگاه داده برداری یافت نشد. لطفاً ابتدا متنی را آپلود و اینجست کنید تا بتوانم با دقت بالا و مستند به آن پاسخ دهم.`;
          }
        }

        // D. Format matching retrieved sources
        const sources = retrievedChunks.map((chunk) => ({
          id: chunk.id,
          content: chunk.contentChunk,
          metadata: chunk.metadata,
          similarityScore: chunk.distance !== undefined ? parseFloat((1 - chunk.distance).toFixed(4)) : 0.85,
        }));

        return {
          answer,
          sources,
        };
      }
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error: unknown) {
    console.error("[API RAG Query Route Error]:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal Server Error", message },
      { status: 500 }
    );
  }
}
