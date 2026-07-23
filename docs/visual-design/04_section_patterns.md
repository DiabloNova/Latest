# 04. Section Patterns
## AI Brand Intelligence & Visibility Platform

This document defines nine reusable website section patterns, specifying content densities, interactive behaviors, and responsive adaptations to guide developers.

---

## 4.1 Reusable Section Pattern Scale

```
+-----------------------------------------------------------------------------------------+
|                                    SECTION PATTERNS                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Hero Layouts     ===> Left-aligned or centered, clear headings, prominent CTAs.    |
|   2. Bento Grids      ===> Clean, high-density grids to display multiple platform tools.|
|   3. Feature Showcase ===> Split columns, alternating image-and-text layouts.           |
|   4. Metrics Section  ===> 4-column metric grids display key success data.              |
|   5. Comparison Cards ===> Side-by-side comparison tables.                              |
|   6. Testimonials     ===> Card grids or sliding testimonial rows.                      |
|   7. Logo Clouds      ===> Muted, grayscale client logos.                               |
|   8. FAQ Sections     ===> Clean accordion vertical lists.                              |
|   9. CTA Block        ===> High-contrast cards display primary conversion forms.        |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 4.2 Pattern Specifications & Adaptations

### 4.2.1 Hero Layouts
*   **Aesthetic Rules**: Bold display titles (48px) with responsive margins, supported by body text descriptions (18px) and split primary/secondary CTA buttons.
*   **Content Density**: Ample outer whitespace; paddings set to `64px` (`space-8`) on desktop to establish visual focus.
*   **Responsive Behavior**: Full-width stacked content on mobile screens; inline auto-width on desktop.

### 4.2.2 Bento Grids
*   **Aesthetic Rules**: CSS Grid container containing cards of varying aspect ratios (3-column, 2-row layout). Standard round corners (8px) and flat borders.
*   **Content Density**: Highly compact; card margins set to `16px` (`space-4`) to fit multiple platform features into a single screen.
*   **Responsive Behavior**: Collapses into a single vertical column on mobile, maintaining card hierarchies.

### 4.2.3 Feature Showcase
*   **Aesthetic Rules**: Alternating split 2-column grids (Row A: left text, right image; Row B: left image, right text).
*   **Content Density**: Standard spacing; gaps between columns set to `32px` (`space-6`).
*   **Responsive Behavior**: Images stack below the corresponding text blocks on mobile screens.

### 4.2.4 Metrics Sections
*   **Aesthetic Rules**: High-contrast rows displaying 4 key metrics cards. Giant numbers (bold, 32px), with small subheads below.
*   **Content Density**: Compact spacing; cards display inline to emphasize raw data.
*   **Responsive Behavior**: Reflows to a 2x2 grid on tablet, and stacks vertically on mobile.

### 4.2.5 Comparison Cards
*   **Aesthetic Rules**: Side-by-side comparison panels (e.g., Traditional SEO vs. AI Visibility). Left panel uses dark slate tones; right panel uses a clean blue accent.
*   **Content Density**: Standard; margins set to `24px` (`space-5`).
*   **Responsive Behavior**: Left and right panels stack vertically on mobile.

### 4.2.6 Testimonial Cards
*   **Aesthetic Rules**: Flat cards displaying client quotes (16px), author name/role (14px), and inline success metrics badges.
*   **Content Density**: Compact; card margins set to `16px`.
*   **Responsive Behavior**: Testimonials display in a swipeable horizontal row or vertical list on mobile.

### 4.2.7 Logo Clouds
*   **Aesthetic Rules**: Grayscale client logo containers.
*   **Content Density**: Low-density; logo gaps set to `48px` (`space-7`) on desktop to keep the layout clean.
*   **Responsive Behavior**: Wrap automatically on smaller screens; centered alignments.

### 4.2.8 FAQ Accordions
*   **Aesthetic Rules**: Vertical stack of collapsible accordion containers. Clicking a row expands the answer with a smooth CSS transition.
*   **Content Density**: Standard spacing; row paddings set to `16px` (`space-4`).
*   **Responsive Behavior**: Scale to fit full width of mobile viewports.

### 4.2.9 Conversion CTA Block
*   **Aesthetic Rules**: High-contrast, dark-theme horizontal cards, displaying a bold headline, supporting description, and inline form inputs.
*   **Content Density**: Compact; paddings set to `32px` (`space-6`).
*   **Responsive Behavior**: Forms wrap from horizontal to vertical stacks on mobile, ensuring clear touch targets.
