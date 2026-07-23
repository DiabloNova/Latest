# 02. Homepage Design Direction
## AI Brand Intelligence & Visibility Platform

This document establishes the section-by-section visual design, content hierarchy, interaction behavior, and conversion targets for our primary landing page.

---

## 2.1 Homepage Structure Map

The homepage experience is structured as an educational and trust-building funnel:

```
+-----------------------------------------------------------------------------------------+
|                                    HOMEPAGE STRUCTURE                                   |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Hero Zone        ===> Clear headline, split-CTAs, high-tech interface mockup.      |
|   2. Logo Cloud       ===> Clean slate-gray client logos to establish trust.            |
|   3. Problem Space    ===> Highlight the AI discovery blind spot with side-by-side grids|
|   4. Platform Intro   ===> Visualizer mapping how RAG engines crawl & index content.   |
|   5. Core Capabilities===> Interactive tab grid of features (Monitoring, Analytics).    |
|   6. Bento Grid       ===> Features bento grid highlighting specialized tools (Schemas). |
|   7. Industry Vert.   ===> Selector panel tailored to E-commerce, SaaS, Enterprise.     |
|   8. Customer Proof   ===> Prominent, detailed client testimonial card grid.            |
|   9. Learning Hub     ===> Educational blog and resource guide articles.                |
|   10. Conversion CTA  ===> High-priority Free AI Brand Scanner form gateway.           |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 2.2 Detailed Section Specifications

### 2.2.1 Section 1: Hero Zone
*   **Purpose**: Capture attention, communicate our unique value proposition, and drive low-friction diagnostic scanner signups.
*   **Layout**: Center-aligned, minimalist vertical stack. Large headings (bold, 48px) with responsive margins, followed by body text (18px) and split primary/secondary action buttons.
*   **Messaging Hierarchy**:
    *   *Primary Headline*: "See and Shape How Artificial Intelligence Recommends Your Brand."
    *   *Supporting Body*: "Traditional SEO is blind to generative search. Track, analyze, and optimize your brand authority across ChatGPT, Gemini, and Perplexity in real-time."
*   **Primary CTA**: "Start Free Trial" (Azure blue button).
*   **Secondary CTA**: "Book Demo" (Neutral outline button).
*   **Visual Concept**: Display a high-fidelity interactive dashboard mockup below the CTAs, showing a simulated Share of Model Voice (SoMV) gauge drawing smoothly.

---

### 2.2.2 Section 2: Logo Cloud
*   **Purpose**: Build immediate enterprise credibility and trust.
*   **Layout**: Horizontal flex container displaying 5 or 6 prominent client logos.
*   **Aesthetics**: All logos are styled in muted, monochrome slate gray, blending with our neutral palettes and avoiding colorful distractions.
*   **Interaction**: Logos transition to full opacity on mouse hover.

---

### 2.2.3 Section 3: The Problem Space (The AI Blind Spot)
*   **Purpose**: Educate visitors on how conversational search engines bypass traditional search result pages, creating a discovery blind spot.
*   **Layout**: Split 2-column grid container.
    *   *Left Column*: Clear description of the shift in user behavior.
    *   *Right Column*: Side-by-side comparison boxes:
        *   *Box A*: Traditional Google keyword links (messy, cluttered).
        *   *Box B*: Clean, structured ChatGPT response (summarized text, direct cited links).
*   **Interaction**: Hovering over the comparison boxes reveals interactive tooltips explaining how LLM crawlers index on-page data.

---

### 2.2.4 Section 4: Platform Introduction
*   **Purpose**: Demystify the mechanics of conversational search, explaining how retrieval-augmented generation (RAG) models fetch and reference web data.
*   **Layout**: Full-width container displaying our interactive **AI Processing Pipeline** visualization.
*   **Content Hierarchy**: Step-by-step progress tracking:
    1. Scrapers query model APIs.
    2. Normalize raw response text.
    3. Extract citations and brand mentions.
    4. Calculate SoMV and sentiment indexes.

---

### 2.2.5 Section 5: Core Capabilities (Tabbed Showcase)
*   **Purpose**: Provide an interactive showcase of our three core service offerings (AEO, GEO, and Entity Optimization).
*   **Layout**: Vertical stack. Top horizontal tabs navigation list, bottom large container displaying matching feature dashboards.
*   **Interaction**: Clicking tabs triggers standard CSS opacity fades, rendering the corresponding feature screen instantly.

---

### 2.2.6 Section 6: Bento Grid Showcase
*   **Purpose**: Group specialized platform features (e.g., Schema generators, Slack alerts, and PDF builders) into a single, high-density bento grid.
*   **Layout**: Standard CSS Grid container (3 columns, 2 rows of varying aspect ratios).
*   **Interaction**: Individual bento cards scale up slightly on hover, displaying sharp borders and clean shadows.

---

### 2.2.7 Section 7: Industry Verticals Selector
*   **Purpose**: Present tailored value propositions for our primary customer segments (E-commerce, SaaS, and Enterprise).
*   **Layout**: Split columns panel. Left column displays segment selectors; right column details target problems, budgets, and success criteria.

---

### 2.2.8 Section 8: Customer Proof (Testimonials)
*   **Purpose**: Provide proof of platform value and success.
*   **Layout**: Responsive 3-column card grid display.
*   **Content Hierarchy**: Each card displays a prominent quotation, the client's name and corporate role, and an inline success badge (e.g., "+15% Share of Voice on ChatGPT").

---

### 2.2.9 Section 9: Learning Hub (Resources)
*   **Purpose**: Highlight our educational guides and bilingual glossary terms to build topical authority.
*   **Layout**: 3-column grid container displaying recent guide cards with prominent covers and metadata.

---

### 2.2.10 Section 10: Final Conversion CTA (Lead Generator)
*   **Purpose**: Drive high-intent lead acquisition and trial registrations.
*   **Layout**: High-contrast, dark-theme horizontal card block.
*   **Content Hierarchy**: Bold headline, supporting description, and an interactive **Free AI Brand Scanner** input form (Domain name field and "Run Free Diagnostics" button).
*   **Interaction**: Entering a domain and clicking submit launches an animated scanning progress bar, prompting users to register their business email to unlock the final report.
