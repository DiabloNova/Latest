/**
 * Phase 7C.1 — AI Visibility Intelligence Engine
 * API Boundary Contract Specification
 * Establishes structured request schemas, response envelopes, pagination, and error formats.
 */

import { BrandDTO, CampaignDTO, CitationDTO, RecommendationDTO } from "../application/dto";

export interface APIRequestPagination {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface APIRequestFilter {
  search?: string;
  category?: string;
  intent?: string;
  priority?: string;
  status?: string;
  includeDeleted?: boolean;
}

export interface APIResponseEnvelope<T> {
  success: boolean;
  data?: T;
  error?: APIErrorContract;
  meta?: APIResponseMeta;
}

export interface APIResponseMeta {
  totalCount?: number;
  page?: number;
  pageSize?: number;
  timestamp: string;
}

export interface APIErrorContract {
  code: string; // Machine-readable code (e.g. "AUTH_FORBIDDEN_RESOURCES")
  message: string; // Human-readable friendly error message
  details?: APIErrorFieldDetail[]; // Granular validation errors
}

export interface APIErrorFieldDetail {
  field: string;
  issue: string;
}

// 1. Brand Contracts
export interface CreateBrandRequest {
  name: string;
  description?: string;
  website: string;
  industry?: string;
  country?: string;
}

export interface UpdateBrandRequest {
  name?: string;
  description?: string;
  website?: string;
  industry?: string;
  country?: string;
}

export interface BrandIntelligenceProfileResponse {
  brand: BrandDTO;
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  engineCoverage: number; // e.g. 0.75 for 3/4 engines
}

// 2. Campaign Contracts
export interface CreateCampaignRequest {
  brandId: string;
  name: string;
  engines: string[];
  promptIds: string[];
  frequency: "daily" | "weekly" | "monthly";
  targetVisibilityScore?: number;
}

export interface CampaignHistoryResponse {
  campaign: CampaignDTO;
  executions: {
    executionId: string;
    startedAt: string;
    status: string;
    costUsd: number;
    observationsProcessed: number;
  }[];
}

// 3. Reports Contracts
export interface VisibilityReportResponse {
  brandId: string;
  timeline: { date: string; score: number }[];
  growthPercentage: number;
}

export interface CitationReportResponse {
  citations: CitationDTO[];
  domainShare: { domain: string; count: number; averageAuthority: number }[];
}

export interface RecommendationReportResponse {
  recommendations: RecommendationDTO[];
  predictedTotalLift: number;
}
