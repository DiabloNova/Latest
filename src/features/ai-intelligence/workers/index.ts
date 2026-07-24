/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * Background Job Workers Architecture
 */

export interface Job<TPayload = unknown> {
  id: string;
  name: string;
  payload: TPayload;
  attempts: number;
  maxAttempts: number;
  status: "pending" | "processing" | "completed" | "failed";
  createdAt: string;
  failedAt?: string;
  error?: string;
}

export interface RetryPolicy {
  backoffMs: number;
  multiplier: number;
}

export class DeadLetterQueue {
  private ddl: Job[] = [];

  public push(job: Job, error: string): void {
    job.status = "failed";
    job.failedAt = new Date().toISOString();
    job.error = error;
    this.ddl.push(job);
    console.warn(`[DeadLetterQueue] Job ${job.id} ("${job.name}") permanently failed. Routed to DLQ: ${error}`);
  }

  public getJobs(): Job[] {
    return this.ddl;
  }
}

export class JobQueue {
  private queue: Job[] = [];

  public push(job: Job): void {
    this.queue.push(job);
  }

  public pull(): Job | null {
    const job = this.queue.shift();
    if (!job) return null;
    return job;
  }

  public size(): number {
    return this.queue.length;
  }
}

export class JobWorker {
  private queue: JobQueue;
  private dlq: DeadLetterQueue;
  private retryPolicy: RetryPolicy;

  constructor(queue: JobQueue, dlq: DeadLetterQueue, retryPolicy?: RetryPolicy) {
    this.queue = queue;
    this.dlq = dlq || new DeadLetterQueue();
    this.retryPolicy = retryPolicy || { backoffMs: 100, multiplier: 2 };
  }

  /**
   * Processes the next available job, applying a strict exponential retry policy
   */
  public async processNext(handler: (job: Job) => Promise<void>): Promise<boolean> {
    const job = this.queue.pull();
    if (!job) return false;

    job.status = "processing";
    job.attempts++;

    try {
      await handler(job);
      job.status = "completed";
      return true;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);

      if (job.attempts < job.maxAttempts) {
        // Retry logic: requeue job after backoff delay
        const delay = this.retryPolicy.backoffMs * Math.pow(this.retryPolicy.multiplier, job.attempts - 1);
        job.status = "pending";
        console.log(`[JobWorker] Job ${job.id} failed (attempt ${job.attempts}/${job.maxAttempts}). Retrying in ${delay}ms...`);

        setTimeout(() => {
          this.queue.push(job);
        }, delay);
      } else {
        // Permanent failure: route to Dead Letter Queue (DLQ)
        this.dlq.push(job, errMsg);
      }
      return false;
    }
  }
}
