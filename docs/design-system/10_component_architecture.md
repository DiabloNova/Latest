# 10. Component Architecture
## AI Brand Intelligence & Visibility Platform

This component architecture defines our structural design blueprint for platform components. It organizes components into four layers (Foundations, Navigation, Data, and AI-Specific), specifying visual rules, interaction states, accessibility requirements, and responsive behaviors to guide developers.

---

## 10.1 System Component Library Matrix

Our components are organized into four structural layers:

```
+-----------------------------------------------------------------------------------------+
|                                    COMPONENT LIBRARY                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Foundations ===> Button, Input, Select, Checkbox, Badge, Tooltip, Avatar           |
|   2. Navigation  ===> Global Header, Sidebar, Breadcrumb, Workspace Tabs                |
|   3. Data Views  ===> KPI Cards, Interactive Tables, Analytics Charts, Metric Indicators|
|   4. AI-Specific ===> SoMV Gauge, Mention Card, Citation Modal, Entity Graph Explorer   |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 10.2 Layer 1: Foundation Components

### 10.2.1 Button Component
*   **Visual Variants**: Primary (solid deep navy), Secondary (neutral outline), Ghost (no borders, icon actions).
*   **Interaction States**: Default, Hover (subtle color shade), Active (2px indent), Focus (visible blue focus border), and Disabled (muted opacity, `cursor: not-allowed`).
*   **Accessibility**: Must be built using semantic HTML `<button>` elements, or include explicit `role="button"` and `tabindex="0"` if custom wrappers are used.
*   **Responsive Behavior**: Full-width on mobile viewports; inline auto-width on desktop.

### 10.2.2 Input Component
*   **Visual Variants**: Standard Text Input, Search Input (with inline magnifying glass icon).
*   **Interaction States**: Default, Focus (high-contrast active outline), Disabled, and Error (red highlight border with inline warning label).
*   **Accessibility**: Must be paired with an explicit, semantic `<label>` tag, or include `aria-label` attributes for screen readers.

### 10.2.3 Badge Component
*   **Visual Variants**: Success (green background, green text), Warning (amber background), Error (red background), Info (blue background).
*   **Interaction States**: Static indicator tags. No hover or active states.
*   **Accessibility**: Paired with an inner descriptive icon or text label to meet accessibility guidelines without relying solely on color.

---

## 10.3 Layer 2: Navigation Components

### 10.3.1 Sidebar Component
*   **Visual Layout**: Fixed vertical sidebar (width 240px desktop, collapsible to 64px, hidden on mobile).
*   **Interaction States**: Collapsed state, active item highlight (with accent blue left border), and hover indicators.
*   **RTL Behavior**: Positioned on the left side of the viewport in English (LTR) mode, and mirrored to the right side of the viewport in Persian (RTL) mode.

### 10.3.2 Breadcrumb Component
*   **Visual Layout**: Flat horizontal link chain separated by neutral dividers (`/` or `>`).
*   **Interaction States**: Hover, focus, and disabled current page link.
*   **Accessibility**: Wrapped inside a `<nav aria-label="Breadcrumb">` landmark, containing an ordered list `<ol>` of link tags.

---

## 10.4 Layer 3: Data Components

### 10.4.1 KPI Metrics Card
*   **Visual Layout**: Flat bordered container panel with clear typographic hierarchy: Top small label, middle giant metric value (bold, 32px), bottom sub-label displaying delta trends.
*   **Interaction States**: Hover scale effect on clickable metrics.
*   **Responsive Behavior**: Stacks into a single column of full-width cards on mobile screens.

### 10.4.2 Interactive Data Table
*   **Visual Layout**: Highly structured grid containing sortable columns, row highlights, and inline action controls.
*   **Interaction States**: Sort triggers, row hovers, and page change pagination.
*   **Responsive Behavior**: Simplifies columns or enables horizontal swiping with clear visual indicators on mobile.

---

## 10.5 Layer 4: AI-Specific Components

### 10.5.1 Visibility Score (SoMV Gauge)
*   **Visual Layout**: A circular progress ring displaying the overall Share of Model Voice (SoMV) percentage, paired with a central numerical value (e.g., "48.2%").
*   **Interaction States**: Interactive hovering displays detailed platform breakdowns (e.g., ChatGPT: 55%, Gemini: 40%).
*   **Accessibility**: Includes an explicit, text-based description for screen readers (e.g., `aria-label="Overall Share of Model Voice is 48.2%"`).

### 10.5.2 AI Mention Card
*   **Visual Layout**: An organized, split-panel card. On the left (or right in RTL view), display the model logo, sentiment score, and citation link. On the right, display the raw response transcript, highlighting the specific brand mention.
*   **Interaction States**: Hovering reveals the "Inspect Source" and "Assign Task" action buttons.

### 10.5.3 Citation Modal Panel
*   **Visual Layout**: A right-aligned modal panel (sliding in from the right edge on LTR screens, and from the left edge on RTL Persian screens) displaying the exact conversational context where our link was cited.
*   **Interaction States**: Focus trapping locks controls inside the active panel until dismissed via the Escape key or close button.
*   **Accessibility**: Automatically shifts focus to the modal title once opened, reading details to screen readers.
