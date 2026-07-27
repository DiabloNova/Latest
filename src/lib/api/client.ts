export interface ChunkError {
  chunkIndex: number;
  error: string;
}

export interface IngestionResult {
  success: boolean;
  totalChunks: number;
  processedChunks: number;
  failedChunks: number;
  errors: ChunkError[];
}

export interface RetrievedChunk {
  id: string;
  content: string;
  metadata: Record<string, unknown>;
  similarityScore: number;
}

export interface RAGResponse {
  answer: string;
  sources: RetrievedChunk[];
}

/**
 * Generates a unique request ID.
 */
function generateRequestId(): string {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return "req-" + Math.random().toString(36).substring(2, 15) + "-" + Date.now().toString();
}

/**
 * Returns consistent headers including tenant and authorization context.
 */
function getHeaders(): Record<string, string> {
  const tenantId = typeof process !== "undefined" && process.env ? (process.env.NEXT_PUBLIC_MOCK_TENANT_ID || "org_default_123") : "org_default_123";
  return {
    "Content-Type": "application/json",
    "x-tenant-id": tenantId,
    "x-user-id": "user_default_123",
    "x-request-id": generateRequestId(),
  };
}

/**
 * Client for communicating with Optimus AI backend APIs.
 */
export const apiClient = {
  /**
   * Ingests raw document text into the pipeline (chunked, embedded, analyzed, stored).
   */
  async ingestDocument(
    text: string,
    metadata: Record<string, unknown> = {},
    chunkingOptions?: { maxChunkSize?: number; overlap?: number }
  ): Promise<IngestionResult> {
    const response = await fetch("/api/v1/ingest/document", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        text,
        metadata,
        chunkingOptions,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Ingestion failed with status ${response.status}`);
    }

    return await response.json();
  },

  /**
   * Queries the brand intelligence system (RAG) with user questions.
   */
  async queryBrandIntelligence(question: string): Promise<RAGResponse> {
    const response = await fetch("/api/v1/rag/query", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        question,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `RAG Query failed with status ${response.status}`);
    }

    return await response.json();
  },
};
