from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('https://vietndj.github.io/course/brollquay01.html', wait_until='networkidle')
    time.sleep(2)
    page.screenshot(path='/tmp/nghiemthu_broll.png')
    title = page.title()
    print("Title:", title)
    browser.close()
