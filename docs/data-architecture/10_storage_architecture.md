# 10. Storage Architecture
## AI Brand Intelligence & Visibility Platform

This storage architecture defines our file storage layers, data retention parameters, lifecycle rules, and object store configurations. This structure ensures that static files, exported reports, logs, and system screenshots are stored securely and cost-effectively.

---

## 10.1 Structured Storage Tiers

Our system organizes stored assets into five distinct categories:

```
+-----------------------------------------------------------------------------------------+
|                                    STORAGE CATEGORIES                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Exported Reports (PDF/CSV)   ===> High durability, low file size, cached globally. |
|   2. System Screenshots (PNG/WebP) ===> Direct model capture verification, fast access.  |
|   3. Crawler Log Buffers (JSON)   ===> Dynamic debug records, compressed, auto-expired. |
|   4. Uploaded Knowledge Docs      ===> Private client RAG inputs, isolated security.     |
|   5. General Brand Media Assets   ===> Logos, custom styling graphics, high-availability.|
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 10.2 Technical Storage Configuration

### 10.2.1 Object Storage (S3 API Compliant)
*   **Infrastructure**: AWS S3 (for Global Zones) and ArvanCloud Storage (for localized Phase 1 Iranian datacenters to comply with local data residency laws).
*   **Default S3 Buckets**:
    *   `aibi-user-reports`: Stores final generated PDF and CSV visibility reports.
    *   `aibi-model-screenshots`: Stores verification images captured by scrapers.
    *   `aibi-raw-crawler-logs`: Stores zipped historical JSON crawler outputs.
    *   `aibi-private-rag-documents`: Stores private corporate documents uploaded for internal RAG testing. This bucket has strict data isolation and is completely blocked from public access.

---

## 10.3 Asset Storage Lifecycle Rules

To optimize hosting costs and prevent database bloat, the platform implements automated lifecycle rules across different buckets:

| Bucket Name | Storage Class | Lifecycle Expiration Rule | Target Action |
| :--- | :---: | :---: | :--- |
| `aibi-user-reports` | Standard | 90 Days | Move to Glacier / Archive |
| `aibi-model-screenshots`| Standard | 30 Days | Permanently Delete |
| `aibi-raw-crawler-logs` | Standard-IA | 180 Days | Permanently Delete |
| `aibi-private-rag-documents`| Standard | None (Keep Active) | None (Preserve corporate assets) |
| `aibi-brand-media` | Standard | None | None (Preserve brand assets) |

*   *Standard-IA*: Standard Infrequent Access class (lower storage cost, higher access fee).

---

## 10.4 Unified Data Archiving Workflow

The platform runs an automated, asynchronous archiving job to move expired assets to cold storage:

```
  +-----------------------------------------------------------------------------------+
  |                           Step 1: Expired Files Audit                             |
  +-----------------------------------------------------------------------------------+
   - Runs a weekly cron job to check file creation timestamps against lifecycle rules |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 2: Cold Storage Transfer                           |
  +-----------------------------------------------------------------------------------+
   - Compresses expired files and transfers them to cheap cold storage (Glacier S3 API)|
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 3: Database Reference Update                       |
  +-----------------------------------------------------------------------------------+
   - Updates the database metadata record status to `ARCHIVED`                        |
                                            |
                                            v
  +-----------------------------------------------------------------------------------+
  |                           Step 4: Cleanup & Log Verification                      |
  +-----------------------------------------------------------------------------------+
   - Deletes primary bucket file pointers and records details in the security audit log|
  +-----------------------------------------------------------------------------------+
```
This multi-tier storage design ensures that analytical logs and historical reports are stored cost-effectively, maintaining system performance without inflating storage budgets.
