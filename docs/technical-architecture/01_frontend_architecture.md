# 01. Frontend Engineering Architecture
## AI Brand Intelligence & Visibility Platform

This document defines the complete frontend engineering architecture, detailing application structure, directory layout, routing strategy, client/server boundaries, and performance optimization rules.

---

## 1.1 Purpose
To provide frontend developers with a clear, implementation-ready framework for building a high-performance, accessible, and localized React application using Next.js (App Router).

---

## 1.2 Folder & Directory Structure

The frontend application follows a strict feature-based layout structure:

```text
src/
├── app/                      # Next.js App Router (Routing pages & layouts)
│   ├── fa/                   # Persian localized sub-path
│   ├── dashboard/            # SaaS dashboard workspace layouts
│   └── api/                  # BFF API routes and integrations
├── components/               # Reusable global design system components
│   ├── ui/                   # Basic atoms (Button, Input, Badge)
│   └── layout/               # Shell structure components (Header, Sidebar)
├── features/                 # Modular, feature-specific domains
│   ├── core-intelligence/    # Brand overview, scores, mentions
│   ├── entity-graph/         # Wikidata maps, nodes, citation paths
│   └── competitor-tracker/   # Benchmarks, radar overlays, alerts
├── hooks/                    # Global React hooks (useAuth, useLocalStorage)
├── lib/                      # Third-party utilities (Style Dictionary, Chart.js)
├── services/                 # Frontend API gateways and scraper bridges
├── types/                    # Shared Typescript definitions
└── styles/                   # Global CSS and Tailwind properties
```

---

## 1.3 Server vs. Client Component Boundaries

To maximize performance, SEO indexing, and core web vitals, we enforce strict React Server Component (RSC) and Client Component boundaries:

*   **React Server Components (Default)**: Used for all static layout templates, marketing pages, directory structures, and initial data fetching operations.
*   **Client Components (`"use client"`)**: Used strictly for interactive parts, including form inputs, charts, coordinate maps, command search overlays, slide-out details panels, and theme toggles.

---

## 1.4 Data Fetching & State Synchronization
*   **Data Fetching**: Performed on the server using Next.js `fetch` with incremental static regeneration (ISR) or server-side rendering (SSR) for real-time dashboards.
*   **State Management (Zustand)**: Lightweight, fast client-side state engine used to manage global user sessions, active workspace contexts, layout collapsibility, and theme modes.
*   **Server-Cache Sync (React Query)**: Handles all dynamic dashboard queries, implementing automatic background cache refetches, optimistic UI updates, and local caches.

---

## 1.5 Error Handling & Recovery Patterns
*   **React Error Boundaries**: Wrap major dashboard modules (e.g., individual charts, tables) in isolated React Error Boundaries, preventing single-component API timeouts from breaking the entire page canvas.
*   **Fallback Skeletons**: If a card's fetch fails, render a clear inline error state card displaying an abstract warning icon and a direct "Retry Fetch" button, preserving layout integrity.

---

## 1.6 Performance Optimization Strategy
*   **Largest Contentful Paint (LCP) Optimization**:
    *   Preload above-the-fold brand logos, hero images, and primary layout typefaces.
    *   Defer loading heavy chart libraries and vector visualization bundles until the primary layout shells render completely.
*   **Cumulative Layout Shift (CLS) Optimization**:
    *   Reserve fixed aspect-ratio boxes and animated skeleton outlines during initial loading states to eliminate content shifts.
*   **Code Splitting**: Dynamically import heavy interactive modules (e.g., Wikidata network map views, advanced PDF report builders) to minimize initial JS bundle sizes.
