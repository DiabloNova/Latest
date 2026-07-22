# 11. Accessibility Guidelines (a11y)
## AI Brand Intelligence & Visibility Platform

This document defines our accessibility guidelines, establishing a comprehensive strategy to meet WCAG 2.2 AA compliance across all digital assets, layouts, typography, and interactive components.

---

## 11.1 Accessibility Compliance Framework

Our accessibility architecture targets four primary areas of usability:

```
+-----------------------------------------------------------------------------------------+
|                                    A11Y CONTROL MATRIX                                  |
+-----------------------------------------------------------------------------------------+
|                                                                                         |
|   1. Keyboard Control ===> Complete tab navigation, focus trapping, skip links.        |
|   2. Screen Readers   ===> Semantic HTML5, explicit ARIA labels, and live status updates.|
|   3. Visual Comfort   ===> High contrast targets, double-channel layouts, clear text.   |
|   4. Multi-script SR  ===> Support screen readers in both English and Persian views.    |
|                                                                                         |
+-----------------------------------------------------------------------------------------+
```

---

## 11.2 Keyboard Navigation & Focus Rules

Keyboard usability is essential for users who navigate without a mouse. All interactive components must adhere to the following rules:

### 11.2.1 Tab Navigation & Focus Indicators
*   **Focus Order**: Users must be able to navigate every interactive button, input, dropdown, and chart link using the `Tab` and `Shift+Tab` keys, following a logical top-to-bottom layout order.
*   **Focus Indicators**: Ensure all focused elements display a highly visible, high-contrast outline border. Never hide default focus outlines.
*   **Focus Ring Tokens**:
    *   *Light Mode Focus*: `outline: 2px solid #007BFF; outline-offset: 2px;`
    *   *Dark Mode Focus*: `outline: 2px solid #3399FF; outline-offset: 2px;`

### 11.2.2 Modal Focus Traps
*   **Definition**: When an overlay modal, menu, or details panel opens, keyboard focus must lock inside that active modal container.
*   **Implementation Rules**:
    *   Pressing `Tab` at the last focusable element in the modal wraps focus back to the first element in the modal.
    *   Pressing the `Escape` key must immediately dismiss the modal and return focus back to the button that triggered it.

### 11.2.3 Skip Navigation Bypass
*   Provide a hidden "Skip to Main Content" link at the very top of our global page trees, allowing keyboard and screen reader users to bypass global navigation headers and jump directly to the primary page contents:
    ```css
    .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: #007BFF;
      color: white;
      padding: 8px;
      z-index: 100;
      transition: top 100ms;
    }
    .skip-link:focus {
      top: 0; /* Unhides and displays on keyboard focus */
    }
    ```

---

## 11.3 Screen Reader (ARIA) Guidelines

To ensure screen readers can navigate and interpret the page, our component markups must follow semantic HTML5 structures:

*   **ARIA Landmarks**: Wrap page zones inside semantic landmarks (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) to help assistive technologies parse the layout.
*   **Explicit Button Labels**: All pure icon buttons (e.g., a simple trash bin icon to delete a prompt) must carry descriptive, screen reader-friendly labels:
    `aria-label="Delete prompt campaign"`
*   **Form Controls**: Every input, checkbox, or select field must have a corresponding, semantic `<label>` tag pointing to the input element via the `for` attribute.
*   **Real-time Alerts (Aria-Live)**: Use `aria-live="polite"` on real-time components, such as scan progression bars and live alerts, to notify screen reader users of updates without interrupting their workflows.

---

## 11.4 Contrast & Visual Presentation Rules
*   **Text Contrast Targets**: Standard text must maintain a minimum contrast ratio of **4.5:1** against the background color. Large bold titles must maintain a minimum contrast ratio of **3:1**.
*   **Element Outlines**: Active input borders, select fields, and checkbox borders must meet a minimum contrast ratio of **3:1** against their background color to ensure clear boundaries.
*   **Double-Channel Data**: Never convey critical system information (e.g., alert levels or score changes) using color alone. Pair color coding with clear text descriptors, symbols, or structural badges to ensure accessibility for colorblind users.
