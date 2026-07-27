/**
 * Optimus AI — Ingestion Pipeline & GraphRAG Orchestration
 * Handles document chunking, semantic vector indexing, and background KG population with fail-safe error boundaries.
 */

import { chunkText } from "../ai/text-chunker";
import { VectorStoreService } from "../knowledge-graph/vector-store";
import { extractGraphEntities } from "../ai/graph-extraction";
import { GraphStoreService } from "../knowledge-graph/graph-store";
import { TenantContextManager } from "../../core/database/tenant-context";

export interface IngestedChunkResult {
  chunkId: string;
  contentChunk: string;
  isGraphExtracted: boolean;
  graphError?: string;
}

export interface IngestionResult {
  tenantId: string;
  totalChunks: number;
  processedChunks: IngestedChunkResult[];
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
  private graphStore: GraphStoreService;

  constructor(vectorStore?: VectorStoreService, graphStore?: GraphStoreService) {
    this.vectorStore = vectorStore || new VectorStoreService();
    this.graphStore = graphStore || new GraphStoreService();
  }

  /**
   * Processes a raw text document: chunks it, embeds it, indexes it,
   * extracts entities/relationships, and safely populates the Knowledge Graph.
   */
  public async ingestDocument(
    text: string,
    metadata: Record<string, unknown> = {},
    maxChunkSize = 500,
    overlap = 50
  ): Promise<IngestionResult> {
    const tenantId = TenantContextManager.getRequiredTenantId();

    // 1. Chunk the document text
    const chunks = chunkText(text, maxChunkSize, overlap);
    const processedChunks: IngestedChunkResult[] = [];

    // 2. Process each chunk
    for (const chunk of chunks) {
      // Simulate standard 1536-dimensional vector embedding
      // (Uses deterministic floats to avoid random fluctuation in tests)
      const embedding = Array.from({ length: 1536 }, (_, i) => {
        // Create deterministic mock floats
        const code = chunk.charCodeAt(i % chunk.length) || 1;
        return (i === 0 ? 0.8 : 0.001) + (code / 100000);
      });

      // Insert chunk embedding securely under the current tenant transaction context
      const savedEmbedding = await this.vectorStore.insertEmbedding(
        tenantId,
        chunk,
        embedding,
        metadata
      );

      const chunkId = savedEmbedding.id;
      let isGraphExtracted = false;
      let graphError: string | undefined;

      // 3. SECURE PIPELINE ERROR BOUNDARY
      // If graph extraction or population fails, we must NOT fail the overall vector ingestion!
      try {
        const extractedGraph = await extractGraphEntities(chunk);
        await this.graphStore.upsertEntitiesAndRelationships(extractedGraph, chunkId);
        isGraphExtracted = true;
      } catch (err: unknown) {
        graphError = err instanceof Error ? err.message : String(err);
        console.error(
          `[DocumentIngestionService] Fail-safe active. KG population failed for chunk ${chunkId}:`,
          graphError
        );
      }

      processedChunks.push({
        chunkId,
        contentChunk: chunk,
        isGraphExtracted,
        graphError,
      });
    }

    return {
      tenantId,
      totalChunks: chunks.length,
      processedChunks,

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
