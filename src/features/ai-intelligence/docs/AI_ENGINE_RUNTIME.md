# Provider-Agnostic AI Engine Runtime

This specification details how the platform handles multi-model LLM executions, cost tracking, token counters, and latency measurements without any vendor lock-in.

---

## 1. Abstraction Layer Architecture

We design a complete abstract boundary `IAIEngineProvider` to support any model provider (OpenAI, Anthropic, Google Gemini, or local models like Meta Llama 3) simply by implementing the adapter contract:

```typescript
export interface IAIEngineProvider {
  supports(engine: AIEngineName): boolean;
  execute(prompt: Prompt, request: AIEngineRequest): Promise<AIEngineResponse>;
}
```

---

## 2. Ingested Adapters

- **OpenAIAdapter**: Integrates with GPT models (e.g. `gpt-4o`). Calculates token usage and computes input ($0.005/k) and output ($0.015/k) costs.
- **AnthropicAdapter**: Integrates with Claude (e.g. `claude-3-5-sonnet`). Tracks latency and captures comprehensive reasoning logs.
- **GeminiAdapter**: Integrates with Google (e.g. `gemini-1.5-pro`). Implements low-cost token trackers for large context queries.
- **LocalLLMAdapter**: Connects to local Llama 3 models or Perplexity proxy search run. Executes with zero API costs.
