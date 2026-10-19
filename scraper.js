// Scraper headless de allin1cabo.com (Wix, renderizado por JS).
// Visita cada URL de urls.txt, renderiza, auto-scrollea (lazy load) y extrae texto + imagenes + videos.
// Guarda _captura/catalogo_site.json y _captura/media_urls.txt. Corre con: node scraper.js
const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const urls = fs.readFileSync('urls.txt', 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const out = [];
  for (const url of urls) {
    try {
      // Wix nunca llega a 'networkidle' (trackers/long-polling) -> esperar DOM + tiempo fijo
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3000);
      await page.evaluate(async () => {
        await new Promise(res => { let y = 0; const t = setInterval(() => { window.scrollBy(0, 700); y += 700; if (y > document.body.scrollHeight + 2500) { clearInterval(t); res(); } }, 140); });
      });
      await page.waitForTimeout(1200);
      const data = await page.evaluate(() => {
        const I = new Set();
        document.querySelectorAll('img').forEach(i => {
          [i.src, i.currentSrc].forEach(u => { if (u && /wixstatic/.test(u)) I.add(u.split('/v1/')[0]); });
          if (i.srcset) i.srcset.split(',').forEach(s => { const u = s.trim().split(' ')[0]; if (u && /wixstatic/.test(u)) I.add(u.split('/v1/')[0]); });
        });
        document.querySelectorAll('[style*=wixstatic]').forEach(e => { const m = (e.getAttribute('style') || '').match(/https:[^"')]+wixstatic[^"')]+/g); if (m) m.forEach(u => I.add(u.split('/v1/')[0])); });
        const V = new Set();
        document.querySelectorAll('video, video source').forEach(v => { if (v.src) V.add(v.src); });
        document.querySelectorAll('iframe').forEach(f => { if (/youtube|vimeo|video/i.test(f.src)) V.add(f.src); });
        return { title: document.title, text: document.body.innerText.replace(/\n{3,}/g, '\n\n').trim(), images: [...I], videos: [...V] };
      });
      out.push({ url, ...data });
      console.log('OK  ', url, '|', data.images.length, 'img', data.videos.length, 'vid');
    } catch (e) {
      out.push({ url, error: String(e).slice(0, 200) });
      console.log('ERR ', url, '|', String(e).slice(0, 100));
    }
  }
  if (!fs.existsSync('_captura')) fs.mkdirSync('_captura');
  fs.writeFileSync('_captura/catalogo_site.json', JSON.stringify(out, null, 2));
  const media = new Set();
  out.forEach(p => { (p.images || []).forEach(u => media.add(u)); (p.videos || []).forEach(u => media.add(u)); });
  fs.writeFileSync('_captura/media_urls.txt', [...media].join('\n'));
  await browser.close();
  console.log('DONE', out.length, 'paginas |', media.size, 'URLs de media ->', '_captura/catalogo_site.json');
})();
