# 05. Event-Driven Architecture
## AI Brand Intelligence & Visibility Platform

This event architecture defines our system's asynchronous, message-driven design, mapping core system events, event producers, consumer groups, and message queue patterns to ensure high system throughput and performance.

---

## 5.1 Event Broker & Messaging Pattern

Our event-driven systems are split across two processing layers:

```
+-----------------------------------------------------------------------------------------+
|                                    EVENT ARRAYS                                         |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Fast-Path / Task Broker (Redis Queue / BullMQ)                                     |
|      - Handles low-latency worker tasks, prompt simulations, and direct reporting jobs. |
|                                                                                         |
|   2. Decoupled Pub/Sub Broker (Apache Kafka / RabbitMQ)                                 |
|      - Manages core event streaming (e.g., VisibilityUpdated, CitationDetected).         |
|      - Decouples long-term analytics, logs, and notification integrations.              |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 5.2 Core System Events Specification

### 5.2.1 Event: `BrandCreated`
*   **Description**: Triggered when a workspace successfully registers and onboards a new brand profile.
*   **Producer**: Workspace Service (via dashboard user API).
*   **Event Payload (Schema)**:
    ```json
    {
      "event_id": "8a7f-d893-bc42",
      "event_type": "BrandCreated",
      "timestamp": "2024-11-15T08:30:00Z",
      "data": {
        "project_id": "1a2b-3c4d-5e6f",
        "workspace_id": "9x8y-7z6w-5v4u",
        "brand_name": "Alfa Cosmetics",
        "target_domain": "alfacosmetics.ir",
        "wikidata_id": "Q123456"
      }
    }
    ```
*   **Consumer Groups**:
    *   **Entity Graph Mapper**: Begins background audits on Wikidata and Google Knowledge Graph structures.
    *   **Scraper Scheduler**: Configures and initializes default onboarding search campaigns.

---

### 5.2.2 Event: `PromptExecuted`
*   **Description**: Emitted when a background scraper worker completes a model simulation run.
*   **Producer**: Crawler Scraper Engine.
*   **Event Payload (Schema)**:
    ```json
    {
      "event_id": "9b1c-d762-e431",
      "event_type": "PromptExecuted",
      "timestamp": "2024-11-15T09:15:12Z",
      "data": {
        "response_id": "ef23-cd45-ab67",
        "prompt_id": "5544-aa33-bb22",
        "model_id": "perplexity-llama-3-sonar",
        "execution_time_ms": 1420,
        "raw_response_text": "Based on local ratings, Alfa Cosmetics stands out as Tehran's leading developer of skincare formulas, frequently cited in skincare benchmarks..."
      }
    }
    ```
*   **Consumer Groups**:
    *   **NLP Analysis Engine**: Parses raw text responses to evaluate sentiment scores, brand mentions, and link citations.

---

### 5.2.3 Event: `CitationDetected`
*   **Description**: Emitted when the NLP Analysis Engine extracts a direct link citation from a generated AI response text.
*   **Producer**: NLP Analysis Engine.
*   **Event Payload (Schema)**:
    ```json
    {
      "event_id": "cc31-9a2b-44ef",
      "event_type": "CitationDetected",
      "timestamp": "2024-11-15T09:15:15Z",
      "data": {
        "citation_id": "ff55-dd66-ee77",
        "response_id": "ef23-cd45-ab67",
        "cited_domain": "alfacosmetics.ir",
        "full_citation_url": "https://alfacosmetics.ir/products/skin-serum",
        "anchor_text": "Alfa Cosmetics"
      }
    }
    ```
*   **Consumer Groups**:
    *   **Telemetry Aggregator**: Updates citation indexes and workspace conversion metrics.
    *   **Alert Escalation Service**: Verifies if the citation triggers any client-configured alerting rules.

---

### 5.2.4 Event: `VisibilityUpdated`
*   **Description**: Emitted when the system aggregates campaign observation runs to update a brand’s visibility score.
*   **Producer**: Telemetry Aggregator.
*   **Event Payload (Schema)**:
    ```json
    {
      "event_id": "7d62-fa54-21bc",
      "event_type": "VisibilityUpdated",
      "timestamp": "2024-11-15T10:00:00Z",
      "data": {
        "project_id": "1a2b-3c4d-5e6f",
        "previous_somv_score": 45.2,
        "new_somv_score": 48.6,
        "trend_direction": "UPWARD"
      }
    }
    ```
*   **Consumer Groups**:
    *   **Alert Broker**: Evaluates if the visibility change exceeds configured notification thresholds.
    *   **Reporting Cache Engine**: Updates pre-calculated campaign metrics for faster dashboard rendering.

---

### 5.2.5 Event: `ReportGenerated`
*   **Description**: Triggered when a scheduled or on-demand PDF report compilation finishes.
*   **Producer**: PDF Rendering Service.
*   **Event Payload (Schema)**:
    ```json
    {
      "event_id": "33ab-ef12-9011",
      "event_type": "ReportGenerated",
      "timestamp": "2024-11-15T10:05:00Z",
      "data": {
        "report_id": "8d8d-9c9c-0a0a",
        "workspace_id": "9x8y-7z6w-5v4u",
        "pdf_storage_url": "https://s3.ir-thr-at1.arvanstorage.ir/aibi-reports/rep_8d8d.pdf"
      }
    }
    ```
*   **Consumer Groups**:
    *   **Email Delivery Agent**: Dispatches the PDF as an email attachment to configured workspace recipients.
    *   **Notification Engine**: Sends an in-app "Report Ready" dashboard alert.

---

### 5.2.6 Event: `SubscriptionChanged`
*   **Description**: Triggered when an organization upgrades or downgrades its subscription tier.
*   **Producer**: Billing Service.
*   **Event Payload (Schema)**:
    ```json
    {
      "event_id": "ff32-bc91-224a",
      "event_type": "SubscriptionChanged",
      "timestamp": "2024-11-15T11:00:00Z",
      "data": {
        "org_id": "2d2d-3a3a-4b4b",
        "previous_tier": "FREE_TRIAL",
        "new_tier": "GROWTH",
        "allocated_query_limit": 1500
      }
    }
    ```
*   **Consumer Groups**:
    *   **Administrative Gatekeeper**: Unlocks advanced dashboard features, workspace capacities, and API settings.
    *   **Task Scheduler**: Re-aligns scraping frequencies to match upgraded plan capabilities.

---

### 5.2.7 Event: `NotificationSent`
*   **Description**: Emitted when a notification is successfully dispatched across target channels.
*   **Producer**: Notification Engine.
*   **Event Payload (Schema)**:
    ```json
    {
      "event_id": "11ab-22bc-33cd",
      "event_type": "NotificationSent",
      "timestamp": "2024-11-15T11:05:00Z",
      "data": {
        "notification_id": "99aa-88bb-77cc",
        "recipient_user_id": "7a7a-8b8b-9c9c",
        "delivery_channel": "SLACK",
        "status": "DELIVERED"
      }
    }
    ```
*   **Consumer Groups**:
    *   **Audit Logger**: Logs the notification event to the organization's system audit log for security compliance.
