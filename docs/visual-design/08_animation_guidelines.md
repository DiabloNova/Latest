# 08. Animation Guidelines
## AI Brand Intelligence & Visibility Platform

This document defines our website animation guidelines, specifying entrance speeds, scroll triggers, chart progress load animations, and CSS performance rules.

---

## 8.1 Motion Philosophy & Purpose

Our animation language is designed to feel **Elegant, Professional, Fast, and Purpose-driven**.

We utilize subtle, structural animations to guide user focus, clarify layout transitions, and build polished, high-tech brand experiences, avoiding excessive or distracting animations.

---

## 8.2 Standard Animation Tokens

Our animations utilize three standardized duration tokens to ensure design consistency:

```
+-----------------------------------------------------------------------------------------+
|                                    ANIMATION TOKENS                                     |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. duration-fast   ===> 100ms (Instant micro-interactions, hovers, checks).           |
|   2. duration-normal ===> 250ms (Standard transitions, tab shifts, accordion expands).   |
|   3. duration-slow   ===> 400ms (Structural entries, modal slide-ins, full charts).     |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 8.3 Key Website Animation Blueprints

### 8.3.1 Hero Entrance Fade-In
*   **Duration**: `400ms` (`duration-slow`).
*   **Easing**: Smooth `ease-out` curve.
*   **Effect**: The main hero title, description, and split CTA buttons slide up subtly (`12px`) and fade in on initial page load, creating a polished first impression.

### 8.3.2 Scroll-Triggered Fade-In Assemblies
*   **Duration**: `250ms` (`duration-normal`).
*   **Easing**: Balanced `ease-in-out` curve.
*   **Effect**: Standard marketing layout sections and bento grids fade in smoothly as they enter the browser viewport.

### 3.3.3 Dynamic Analytics Chart Load
*   **Duration**: `800ms` (Custom progress timing).
*   **Easing**: Spring-type physics behavior to render fluid transitions.
*   **Effect**: Line charts and progress bars draw smoothly from zero to their final metrics values, giving the interface a responsive, high-fidelity feel.

### 8.3.4 Real-time Progress Scanners
*   **Duration**: Continuous loop.
*   **Easing**: Linear movement.
*   **Effect**: Running a free scan displays a continuous progress bar, paired with subtle, flashing diagnostic check indicators to communicate active processing.

---

## 8.4 CSS Performance & Reduced Motion Rules
*   **Hardware Acceleration**: All transitions and animations must be optimized for GPU processing by animating only `transform` and `opacity` properties, preventing layout repaints.
*   **Respect User Preferences**: If a visitor has "Reduced Motion" enabled in their operating system, our CSS layout engines deactivate all structural animations, replacing them with simple opacity transitions.
