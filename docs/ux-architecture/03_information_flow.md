# 03. Information Flow
## AI Brand Intelligence & Visibility Platform

This document details the system's information flow, mapping how data transitions between ingestion, database, analytics, and dynamic front-end layers.

---

## 3.1 Data Flow Map

```
  [User Settings/Prompts] (Input UI)
             |
             v
     [API Gateway / BFF]
             |
             +--- (Writes) ---> [Transactional PostgreSQL] (Master)
             |
             +--- (Pushes Jobs) ---> [Redis Task Queue]
                                           |
                                           v
                                   [Scraper Workers]
                                           |
                                (Queries Model APIs)
                                           |
                                           v
                                   [AI Response Data]
                                           |
                                           v
                                   [NLP Parser Engine]
                                           |
             +-----------------------------+-----------------------------+
             |                             |                             |
      (Extracts Mentions)          (Extracts Citations)         (Analyzes Sentiment)
             |                             |                             |
             v                             v                             v
      [PostgreSQL Replica]         [PostgreSQL Replica]         [PostgreSQL Replica]
             |                             |                             |
             +-----------------------------+-----------------------------+
                                           |
                                           v
                                  [Analytical API]
                                           |
                                           v
                                [BFF / Dynamic Charts]
                                           |
                                           v
                                   [User Dashboard]
```

---

## 3.2 Data Processing Stages

### 3.2.1 Stage 1: Input and Configuration
*   **User Action**: Users configure their workspaces, create brand projects, write prompt campaigns, and add competitor targets inside the React/Next.js client.
*   **Data Transition**: The front-end makes REST API requests through our Backend-For-Frontend (BFF) gateway, which writes configurations to our master PostgreSQL database.

### 3.2.2 Stage 2: Queueing and Scheduling
*   **System Action**: Based on schedule settings, our database cron system identifies active campaigns and pushes tracking tasks to our Redis task queue.
*   **Data Transition**: Celery/BullMQ worker pools monitor the Redis queue, pulling and allocating tasks to available background scraper nodes.

### 3.2.3 Stage 3: Scraping and Data Ingestion
*   **System Action**: Scraper nodes execute dynamic search query prompts across target model APIs (ChatGPT, Perplexity, Gemini).
*   **Data Transition**: Raw model responses are standardized into an immutable system payload schema and sent to our NLP processing pipelines.

### 3.2.4 Stage 4: Processing and Analysis
*   **System Action**: Our NLP engines process raw responses to identify brand mentions, extract citation links, and calculate sentiment scores.
*   **Data Transition**: The parsed data is written directly to our analytical PostgreSQL database tables, while vector embeddings are stored in our vector database (Pinecone).

### 3.2.5 Stage 5: Presentation and Insights
*   **System Action**: Users load or refresh their dashboard interface.
*   **Data Transition**: The front-end makes REST API queries. The BFF consolidates metrics and coordinates with our vector databases, returning organized JSON datasets to render dynamic analytics, charts, and metrics tables.
