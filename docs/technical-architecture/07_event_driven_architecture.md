# 07. Event-Driven Architecture (Technical implementation)
## AI Brand Intelligence & Visibility Platform

This document defines the technical implementation of our asynchronous system communication, specifying event broker selections, message queue models, and core JSON payload contracts.

---

## 7.1 Message Broker Architecture

To balance low-latency worker tasks with high-throughput event streaming, the platform implements a dual-broker architecture:

```text
+-----------------------------------------------------------------------------------------+
|                                    EVENT BROKERS                                        |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Redis & BullMQ (Immediate Task Broker)                                             |
|      - Manages worker task queues, prompt simulation runs, and direct PDF exports.       |
|                                                                                         |
|   2. RabbitMQ / Apache Kafka (Event Stream Broker)                                      |
|      - Decouples core business signals (e.g., VisibilityChanged, AlertTriggered).        |
|      - Supports persistent storage, routing keys, and consumer groups at scale.         |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 7.2 Core System Event Schemas

All system events pass through our brokers as JSON payloads validated against strict schemas:

### 7.2.1 Event: `BrandAnalyzed`
*   **Description**: Emitted when the NLP Analysis Pipeline finishes parsing a raw model response.
*   **Producer**: NLP Analysis Engine.
*   **Routing Key**: `analytics.brand.analyzed`
*   **JSON Payload Contract**:
    ```json
    {
      "event_id": "8a7f-d893-bc42",
      "event_type": "BrandAnalyzed",
      "timestamp": "2024-11-15T08:30:00Z",
      "data": {
        "project_id": "1a2b-3c4d-5e6f",
        "response_id": "ef23-cd45-ab67",
        "sentiment_score": 0.65,
        "matched_brand_name": "Alfa Cosmetics",
        "citations": [
          {
            "cited_domain": "alfacosmetics.ir",
            "full_citation_url": "https://alfacosmetics.ir/products"
          }
        ]
      }
    }
    ```

### 7.2.2 Event: `CompetitorDetected`
*   **Description**: Emitted when the parser identifies an unregistered competitor brand mentioned inside response transcripts.
*   **Producer**: NLP Analysis Engine.
*   **Routing Key**: `intelligence.competitor.detected`
*   **JSON Payload Contract**:
    ```json
    {
      "event_id": "9b1c-d762-e431",
      "event_type": "CompetitorDetected",
      "timestamp": "2024-11-15T08:31:00Z",
      "data": {
        "project_id": "1a2b-3c4d-5e6f",
        "competitor_name": "Beta Cosmetics",
        "context_snippet": "In comparison to Alfa, Beta Cosmetics offers similar moisturizers..."
      }
    }
    ```

### 7.2.3 Event: `VisibilityChanged`
*   **Description**: Emitted when the Telemetry Aggregator compiles new daily or hourly campaign scores.
*   **Producer**: Telemetry Aggregator.
*   **Routing Key**: `analytics.visibility.changed`
*   **JSON Payload Contract**:
    ```json
    {
      "event_id": "7d62-fa54-21bc",
      "event_type": "VisibilityChanged",
      "timestamp": "2024-11-15T09:00:00Z",
      "data": {
        "project_id": "1a2b-3c4d-5e6f",
        "previous_somv_score": 45.2,
        "new_somv_score": 48.6,
        "trend_direction": "UPWARD"
      }
    }
    ```

### 7.2.4 Event: `AlertTriggered`
*   **Description**: Triggered when a critical reputational drop or model hallucination is identified.
*   **Producer**: Alert Broker.
*   **Routing Key**: `security.alert.triggered`
*   **JSON Payload Contract**:
    ```json
    {
      "event_id": "11ab-22bc-33cd",
      "event_type": "AlertTriggered",
      "timestamp": "2024-11-15T09:05:00Z",
      "data": {
        "workspace_id": "9x8y-7z6w-5v4u",
        "severity": "CRITICAL",
        "alert_type": "HALLUCINATION_DETECTED",
        "message": "Outdated financial revenue data generated for Alfa Cosmetics on Gemini Pro."
      }
    }
    ```
*   **Consumers**: Notification Engine (sends in-app, email, and Slack alerts), and Audit Logger.
