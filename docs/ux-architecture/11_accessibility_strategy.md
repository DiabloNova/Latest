# 11. Accessibility Strategy (a11y)
## AI Brand Intelligence & Visibility Platform

This accessibility strategy outlines our compliance plans, targeting WCAG 2.2 AA standards across layout markup, keyboard navigation, color contrast targets, and screen reader configurations.

---

## 11.1 Accessibility Compliance Pillars

Our accessibility strategy is built on four core pillars:

```
+-----------------------------------------------------------------------------------------+
|                                    ACCESSIBILITY PILLARS                                |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Semantic HTML5   ===> Proper use of headers, main, nav, and aria label markups.   |
|   2. Keyboard Control ===> Complete tab-order, logical focus traps, skip link bypass.   |
|   3. Visual Comfort   ===> High contrast targets, scalable typography, no color-only data.|
|   4. Multi-script SR  ===> Screen Reader compatibility for both English and Persian texts. |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 11.2 Core Accessibility Specifications

### 11.2.1 Semantic HTML & ARIA Landmarks
*   **Design Rule**: Build page hierarchies using native, semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) to help assistive technologies parse the page structure.
*   **ARIA Attributes**: Use explicit ARIA role descriptions and labels for complex interactive components:
    *   *Workspace Selector*: Use `aria-haspopup="listbox"` and `aria-expanded="false"`.
    *   *Close Buttons*: Use `aria-label="Close details panel"`.
    *   *Status Badges*: Use `role="status"` to announce real-time alerts to screen readers.

### 11.2.2 Full Keyboard Navigation & Focus Controls
*   **Focus Order**: Users must be able to navigate every interactive button, input, dropdown, and chart link using the `Tab` and `Shift+Tab` keys, following a logical top-to-bottom layout order.
*   **Focus Indicators**: Ensure all focused elements display a highly visible, high-contrast outline border. Never hide default focus outlines.
*   **Skip Navigation Links**: Provide a hidden "Skip to Main Content" link at the very top of the page, allowing keyboard and screen reader users to bypass global navigation lists.
*   **Modal Focus Traps**: When a details modal opens, focus must lock inside the active modal container until the user explicitly closes it using the `Escape` key or close button.

### 11.2.3 Visual Contrast & Color-Independent Design
*   **Color Contrast Targets**: Text and key UI elements must meet WCAG 2.2 AA contrast ratios:
    *   *Standard Text*: Minimum contrast ratio of **4.5:1** against the background.
    *   *Large Bold Headings*: Minimum contrast ratio of **3:1**.
*   **Double-Channel Data Displays**: Never convey critical system information (e.g., alert levels or score changes) using color alone. Pair color coding with clear text descriptors, symbols, or structural badges:
    *   *Avoid*: A simple green circle for positive trends, and a red circle for negative trends.
    *   *Embrace*: Green badges with an upward arrow `↑` and "Improved" text, and red badges with a downward arrow `↓` and "Declined" text.

### 11.2.4 Multilingual Screen Reader Optimization
*   **Dynamic Language Swaps**: Set the HTML document language attribute dynamically (e.g., `<html lang="fa" dir="rtl">` or `<html lang="en" dir="ltr">`) to ensure screen readers use the correct pronunciation engine.
*   **Aria-Live Updates**: Use `aria-live="polite"` on real-time elements, such as scan progression bars and live alerts, to notify screen reader users of updates without interrupting their workflows.
