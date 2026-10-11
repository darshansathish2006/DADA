// Capture the existing HTML/CSS conversation preview; no generated project UI.
import { chromium } from 'file:///C:/Users/darsh/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
import { readFile } from 'node:fs/promises';

const source = await readFile('D:/Projects/Portfolio/index.html', 'utf8');
const stylesheet = await readFile('D:/Projects/Portfolio/assets/css/style.css', 'utf8');
const conversationStyles = stylesheet.slice(stylesheet.indexOf('.viz-wa {'), stylesheet.indexOf('/* ===', stylesheet.indexOf('.viz-wa {')));
const browser = await chromium.launch({ headless: true, timeout: 15000 });
try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
  await page.route(/^https?:/, route => route.abort());
  await page.setContent('<!doctype html><html><head><meta charset="utf-8"></head><body></body></html>');
  await page.evaluate(html => {
    const preview = new DOMParser().parseFromString(html, 'text/html').querySelector('.viz-wa');
    preview.querySelector('.wa__typing')?.remove();
    document.body.replaceChildren(preview);
    document.documentElement.className = 'no-js';
  }, source);
  await page.addStyleTag({ content: conversationStyles + `
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; width: 1280px; height: 800px; overflow: hidden; }
    .viz-wa { display: flex; align-items: center; justify-content: center; width: 1280px; height: 800px; padding: 0; background: #0b141a; }
    .wa { flex: none; width: 310px; height: 450px; transform: scale(1.6); transform-origin: center; border: 6px solid #24343e; border-radius: 24px; }
    .wa__list > * { opacity: 1 !important; visibility: visible !important; }
  ` });
  await page.locator('.viz-wa').screenshot({ path: 'public/assets/projects/academic-wdb.png', timeout: 10000, animations: 'disabled' });
  console.log('Captured Academic WDB conversation preview from the supplied portfolio.');
} finally { await browser.close(); }
