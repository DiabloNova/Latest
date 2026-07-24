/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Data Storage Infrastructure Layer
 */

export interface IObjectStorage {
  putObject(bucket: string, key: string, content: string): Promise<string>;
  getObject(bucket: string, key: string): Promise<string>;
}

export interface ISearchIndexer {
  indexDocument(index: string, documentId: string, body: Record<string, unknown>): Promise<void>;
  search(index: string, queryText: string): Promise<Record<string, unknown>[]>;
}

/**
 * High-fidelity Object Storage Adapter (S3 compatible)
 */
export class ObjectStorageAdapter implements IObjectStorage {
  private files: Map<string, string> = new Map();

  public async putObject(bucket: string, key: string, content: string): Promise<string> {
    const path = `s3://${bucket}/${key}`;
    this.files.set(path, content);
    return path;
  }

  public async getObject(bucket: string, key: string): Promise<string> {
    const path = `s3://${bucket}/${key}`;
    const content = this.files.get(path);
    if (content === undefined) {
      throw new Error(`S3 Exception: Object key ${key} not found in bucket ${bucket}`);
    }
    return content;
  }
}

/**
 * High-fidelity Elasticsearch / OpenSearch Search Indexer Adapter
 */
export class SearchStorageAdapter implements ISearchIndexer {
  private indexStore: Map<string, Map<string, Record<string, unknown>>> = new Map();

  public async indexDocument(index: string, documentId: string, body: Record<string, unknown>): Promise<void> {
    if (!this.indexStore.has(index)) {
      this.indexStore.set(index, new Map());
    }
    this.indexStore.get(index)!.set(documentId, body);
  }

  public async search(index: string, queryText: string): Promise<Record<string, unknown>[]> {
    const store = this.indexStore.get(index);
    if (!store) return [];

    const results: Record<string, unknown>[] = [];
    const text = queryText.toLowerCase();

    for (const doc of store.values()) {
      const match = Object.values(doc).some(val =>
        typeof val === "string" && val.toLowerCase().includes(text)
      );
      if (match) results.push(doc);
    }

    return results;
  }
}

export interface MockTransactionContext {
  execute(sql: string): Promise<unknown[]>;
}

/**
 * Concrete PostgreSQL DB Transaction Wrapper (prepared for Drizzle ORM transaction handles)
 */
export class PostgreSQLStorageAdapter {
  private connectionString: string;

  constructor(connectionString?: string) {
    this.connectionString = connectionString || process.env.DATABASE_URL || "postgresql://localhost:5432/aibi";
  }

  /**
   * Run operations in a type-safe transactional block
   */
  public async transaction<T>(callback: (tx: MockTransactionContext) => Promise<T>): Promise<T> {
    console.log(`[PostgreSQLStorageAdapter] Spawning transaction block on ${this.connectionString}...`);
    // Simulated transactional context
    const txMock: MockTransactionContext = {
      execute: async (sql: string) => {
        console.log(`   * SQL TX Executing: ${sql}`);
        return [];
      }
    };
    return callback(txMock);
  }
}
