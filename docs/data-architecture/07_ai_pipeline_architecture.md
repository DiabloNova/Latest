# 07. AI Processing Pipeline Architecture
## AI Brand Intelligence & Visibility Platform

This document defines our AI data processing pipeline. It specifies how the system executes prompts, coordinates multi-model APIs, normalizes outputs, extracts citations/entities, performs sentiment analysis, and calculates brand visibility scores.

---

## 7.1 Data Processing Flow Diagram

Our data pipelines process raw model outputs through seven distinct stages:

```
+-----------------------------------------------------------------------------------------+
|                                    AI PROCESSING PIPELINE                               |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|      +---------------------------------------------------------------------------+      |
|      | 1. Query scheduler triggers prompt execution via model APIs              |
|      +-------------------------------------+-------------------------------------+      |
|                                            |                                            |
|      +-------------------------------------v-------------------------------------+      |
|      | 2. AI response normalization and formatting (standard payload template)    |
|      +-------------------------------------+-------------------------------------+      |
|                                            |                                            |
|      +-------------------------------------v-------------------------------------+      |
|      | 3. Citation link extraction and source domain classification              |
|      +-------------------------------------+-------------------------------------+      |
|                                            |                                            |
|      +-------------------------------------v-------------------------------------+      |
|      | 4. Entity extraction (matching brand and competitor references)           |
|      +-------------------------------------+-------------------------------------+      |
|                                            |                                            |
|      +-------------------------------------v-------------------------------------+      |
|      | 5. Natural Language Processing (NLP) context sentiment analysis           |
|      +-------------------------------------+-------------------------------------+      |
|                                            |                                            |
|      +-------------------------------------v-------------------------------------+      |
|      | 6. Quantitative Share of Model Voice (SoMV) and Brand Sentiment scoring   |
|      +-------------------------------------+-------------------------------------+      |
|                                            |                                            |
|      +-------------------------------------v-------------------------------------+      |
|      | 7. Dynamic recommendation generation and semantic content auditing        |
|      +---------------------------------------------------------------------------+      |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 7.2 Detailed Pipeline Stages Specification

### 7.2.1 Stage 1: Prompt Execution & Multi-Model Orchestration
*   **Process**: The Automation Engine pulls pending tracking tasks from the Redis queue. It loads the campaign prompts, formats them with dynamic parameters, and executes calls in parallel to target model APIs (OpenAI, Anthropic, Gemini, Perplexity).
*   **Orchestration Logic**: If a model API fails, the orchestrator retries up to 3 times with exponential backoff before logging a model timeout event.

### 7.2.2 Stage 2: AI Response Normalization
*   **Process**: Standardizes varied model JSON formats into an immutable system payload schema. This includes normalizing fields like raw generated text, completion tokens, execution time, and model version hashes.
*   **Normalization Schema**:
    ```json
    {
      "normalized_response_id": "UUID",
      "timestamp": "ISO_TIMESTAMP",
      "model_identifier": "STRING",
      "raw_text": "STRING",
      "token_usage": { "prompt": "INT", "completion": "INT" }
    }
    ```

### 7.2.3 Stage 3: Citation Extraction
*   **Process**: Parses normalized response texts using regex patterns and markdown link extraction libraries to find citations and references.
*   **Domain Classification**: Matches extracted citation links against client domains and target competitors. Any unrecognized citing domain is logged for competitive backlink audits.

### 7.2.4 Stage 4: Entity Extraction
*   **Process**: Matches brand and competitor references within normalized response texts. It handles spelling variations and localized character encodings (e.g., matching both Persian `ی`/`ک` and standard Arabic forms).
*   **Named Entity Recognition (NER)**: Uses fine-tuned, localized NER models to identify mentions of key executives, product lines, and brand assets.

### 7.2.5 Stage 5: Sentiment Analysis
*   **Process**: Evaluates the sentiment (Positive, Neutral, Negative) of context text surrounding matched brand mentions.
*   **Linguistic Processing**: Standard VADER or BERT sentiment models struggle with regional scripts. We employ a customized regional NLP model (such as ParsBERT for Persian) to analyze sentiment inside Persian and Arabic response contexts.

### 7.2.6 Stage 6: Brand Scoring Engine
*   **Process**: Translates parsed observations into system metrics.
*   **Scoring Logic**:
    *   **Share of Model Voice (SoMV)**: Calculated as the percentage of target prompts where the brand was recommended.
    *   **Brand Sentiment Index (BSI)**: Compiled as a weighted average of mention sentiment scores across tracked platforms.

### 7.2.7 Stage 7: Recommendation Generation
*   **Process**: Compares brand performance against competitive benchmarks. If the brand lacks visibility for a high-priority prompt, our AI Agent generates actionable optimization strategies (e.g., suggesting schema additions, keyword optimizations, or entity mapping).
*   **Output**: Delivers step-by-step optimization recommendations directly to the user dashboard.
