# Platform API Boundary Contract Design

This document specifies the REST endpoint design, request structures, response wrappers, and error codes of the Customer Facing API.

---

## 1. REST Endpoint Specifications

### 1.1 Brand Management
- **POST `/api/v1/brands`**
  - **Request**: `CreateBrandRequest`
  - **Response**: `APIResponseEnvelope<BrandDTO>`
- **GET `/api/v1/brands/{id}/intelligence`**
  - **Response**: `APIResponseEnvelope<BrandIntelligenceProfileResponse>`

### 1.2 Campaign Tracking
- **POST `/api/v1/campaigns`**
  - **Request**: `CreateCampaignRequest`
  - **Response**: `APIResponseEnvelope<CampaignDTO>`
- **GET `/api/v1/campaigns/{id}/history`**
  - **Response**: `APIResponseEnvelope<CampaignHistoryResponse>`

### 1.3 Reports & Analytics
- **GET `/api/v1/reports/visibility`**
  - **Params**: `brandId`, `startDate`, `endDate`
  - **Response**: `APIResponseEnvelope<VisibilityReportResponse>`
- **GET `/api/v1/reports/citations`**
  - **Params**: `brandId`
  - **Response**: `APIResponseEnvelope<CitationReportResponse>`

---

## 2. Standard Error Contracts

All platform errors return a structured JSON response body:

```json
{
  "success": false,
  "error": {
    "code": "BILLING_QUOTA_EXCEEDED",
    "message": "Billing Exception: Ingestion quota exceeded for resource 'crawled_pages'.",
    "details": [
      {
        "field": "crawled_pages",
        "issue": "Consumption exceeded limit of 50 pages for plan Free."
      }
    ]
  }
}
```
This guarantees easy client integration and uniform user onboarding workflows!
