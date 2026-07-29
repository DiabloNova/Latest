import os
import time
from playwright.sync_api import sync_playwright

def verify():
    os.makedirs("/home/jules/verification", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 950})
        page = context.new_page()

        print("Navigating to Persian Dashboard Page...")
        page.goto("http://localhost:3000/fa/dashboard")
        time.sleep(4)

        # Take initial dashboard tab screenshot
        page.screenshot(path="/home/jules/verification/dashboard_initial.png")
        print("Captured initial dashboard screenshot.")

        # Click on "ممیزی و بینش" (Audit & Insights) tab
        # Let's find the button containing "ممیزی" or use button selector
        print("Clicking on 'ممیزی و بینش' Tab...")
        page.click("button:has-text('ممیزی و بینش')")
        time.sleep(2)
        page.screenshot(path="/home/jules/verification/audit_empty_state.png")
        print("Captured Audit Panel empty state screenshot.")

        # Input brand name "Optimus AI" and submit
        print("Filling target brand input...")
        page.fill("input[placeholder*='نام برند']", "Optimus AI")
        time.sleep(1)

        print("Clicking run audit button...")
        page.click("button:has-text('شروع ممیزی معنایی')")

        # Wait for API roundtrip and Recharts/Score gauge transition
        time.sleep(5)
        page.screenshot(path="/home/jules/verification/audit_success.png")
        print("Captured successful AEO Brand Audit Panel screenshot.")

        browser.close()

if __name__ == "__main__":
    verify()
