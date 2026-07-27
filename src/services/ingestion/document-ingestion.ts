import { chunkText } from "../ai/text-chunker";
import { generateEmbedding } from "../ai/embed-client";
import { analyzeSentiment } from "../ai/sentiment-analysis";
import { VectorStoreService } from "../knowledge-graph/vector-store";
import { TenantContextManager } from "../../core/database/tenant-context";

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

export class DocumentIngestionService {
  private vectorStore: VectorStoreService;

  constructor(vectorStore?: VectorStoreService) {
    this.vectorStore = vectorStore || new VectorStoreService();
  }

  /**
   * Central Ingestion Pipeline for raw documents/texts.
   * Chunks, embeds, analyzes sentiment, and secures elements in PostgreSQL Vector DB.
   * Enforces zero-trust isolation boundaries dynamically.
   */
  public async ingestDocument(
    rawText: string,
    metadata: Record<string, unknown> = {},
    chunkingOptions?: { maxChunkSize?: number; overlap?: number }
  ): Promise<IngestionResult> {
    // 1. Get and enforce the active tenant ID from the AsyncLocalStorage context
    const tenantId = TenantContextManager.getRequiredTenantId();

    const maxChunkSize = chunkingOptions?.maxChunkSize ?? 500;
    const overlap = chunkingOptions?.overlap ?? 50;

    // 2. Step 1: Chunk text
    const chunks = chunkText(rawText, maxChunkSize, overlap);
    const totalChunks = chunks.length;

    if (totalChunks === 0) {
      return {
        success: true,
        totalChunks: 0,
        processedChunks: 0,
        failedChunks: 0,
        errors: [],
      };
    }

    let processedChunks = 0;
    let failedChunks = 0;
    const errors: ChunkError[] = [];

    // 3. Step 2 & 3 & 4: Process each chunk
    for (let i = 0; i < totalChunks; i++) {
      const chunk = chunks[i];

      try {
        // Generate embedding
        const embedding = await generateEmbedding(chunk);

        // Analyze sentiment
        const sentiment = await analyzeSentiment(chunk);

        // Build metadata payload for DB insertion, embedding sentiment properties inside metadata
        const chunkMetadata = {
          ...metadata,
          chunkIndex: i,
          sentiment: {
            score: sentiment.score,
            label: sentiment.label,
            confidence: sentiment.confidence,
          },
        };

        // Insert into Vector Store (under secure tenant context transaction)
        await this.vectorStore.insertEmbedding(
          tenantId,
          chunk,
          embedding,
          chunkMetadata
        );

        processedChunks++;
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error(`[DocumentIngestionService] Error processing chunk at index ${i}:`, errorMsg);
        errors.push({
          chunkIndex: i,
          error: errorMsg,
        });
        failedChunks++;
      }
    }

    const success = processedChunks > 0;

    return {
      success,
      totalChunks,
      processedChunks,
      failedChunks,
      errors,
    };
  }
}
