# 09. Motion Design System
## AI Brand Intelligence & Visibility Platform

This motion design system defines our animation principles, timing values, transition curves, loading states, and micro-interactions, ensuring smooth and professional transitions across the platform.

---

## 9.1 Motion Principles

Our motion language is designed to feel **Intelligent, Smooth, and Professional**, serving a clear functional purpose rather than acting as a distraction:

```
+-----------------------------------------------------------------------------------------+
|                                    MOTION PRINCIPLES                                    |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Direct Utility  ===> Animation must clarify layout transitions & guide focus.       |
|   2. Minimal Timing  ===> Keep transitions fast (100ms-400ms) to maintain efficiency.   |
|   3. Natural Easing  ===> Avoid stiff linear movements; use smooth acceleration curves. |
|   4. Low-Motion Safe ===> Support and respect user operating system low-motion settings. |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 9.2 Timing & Easing Curves Scale

To ensure consistent transitions across components, we enforce standardized duration and easing tokens:

### 9.2.1 Duration Tokens
*   `duration-fast`: `100ms` (Instant micro-interactions like button hovers, badge toggles, and checkbox checks).
*   `duration-normal`: `250ms` (Standard transitions like tab switches, card collapses, and navigation sidebar expansions).
*   `duration-slow`: `400ms` (Longer structural animations like sliding modals, full-screen loaders, or onboarding transitions).

### 9.2.2 Easing (Cubic-Bezier) Curves
*   `ease-in-out` (`cubic-bezier(0.4, 0, 0.2, 1)`): Our default standard curve. Offers smooth, balanced acceleration and deceleration, ideal for in-page component transitions.
*   `ease-out` (`cubic-bezier(0, 0, 0.2, 1)`): Quick exit transition curve. Accelerates instantly and decelerates gently, ideal for sliding in modal drawers or dropdown menus.
*   `ease-in` (`cubic-bezier(0.4, 0, 1, 1)`): Quick enter transition curve. Accelerates slowly and exits quickly, ideal for dismissing components or deactivating modals.

---

## 9.3 Dynamic Transition Blueprints

### 9.3.1 Sidebar Navigation Collapse
*   *Duration*: `250ms` (`duration-normal`).
*   *Easing*: `ease-in-out` curve.
*   *Effect*: Smoothly scales the sidebar width between `240px` and `64px` while fading menu labels in or out.

### 9.3.2 Right Slide-Out Modal Drawer
*   *Duration*: `400ms` (`duration-slow`).
*   *Easing*: `ease-out` curve.
*   *Effect*: Slides the detail panel in from the right edge of the screen (or left edge in RTL view), while fading in a background backdrop layer.

### 9.3.3 Dynamic Analytics Chart Load
*   *Duration*: `800ms` (Custom progress timing).
*   *Easing*: Spring-type physics behavior to render fluid transitions.
*   *Effect*: Line charts and bar graphs draw smoothly from bottom to top, giving analysts a premium feel when loading metrics.

---

## 9.4 Accessibility & Reduced Motion Compliance
*   **Respect User Settings**: Our CSS layout engines must detect and respect the user's operating system preferences for reduced motion.
*   **Media Query Implementation**: If a user has reduced-motion enabled, we instantly deactivate all non-essential sliding, scaling, and panning animations, replacing them with subtle, clean opacity fades:
    ```css
    @media (prefers-reduced-motion: reduce) {
      * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
      /* Fallback to simple opacity fades for modal loaders */
      .modal-drawer {
        transform: none !important;
        opacity: transition 100ms linear;
      }
    }
    ```
