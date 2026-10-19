// Descarga los medios del dueño (prefijo 20a7e4_) desde catalogo_site.json.
// Imagenes -> site/media/img/<id>.jpg (1600px via transform de Wix).
// Videos   -> originales en D:\allin1cabo_media\raw, loop comprimido (20s, 720p, sin audio) -> site/media/vid/<id>.mp4
// Escribe _captura/media_map.json (pagina -> imagenes/videos locales). Corre con: node media.js
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const RAW = 'D:/allin1cabo_media/raw';
const IMG = 'site/media/img';
const VID = 'site/media/vid';
[RAW, IMG, VID].forEach(d => fs.mkdirSync(d, { recursive: true }));

const pages = require('./_captura/catalogo_site.json');
const freq = {};
pages.forEach(p => new Set(p.images).forEach(u => (freq[u] = (freq[u] || 0) + 1)));
const LOGO = 'https://static.wixstatic.com/media/20a7e4_4713cbef6fde4c78a211beaedab34ad0~mv2.png';

const imgId = u => u.split('/media/')[1].replace(/~mv2/, '').replace(/\.\w+$/, '');
const vidId = u => u.split('/')[4];

const map = {};
const imgs = new Set([LOGO]);
const vids = new Set();
for (const p of pages) {
  const slug = p.url.replace('https://www.allin1cabo.com', '').replace(/^\//, '') || 'home';
  const pi = p.images.filter(u => /\/20a7e4_/.test(u) && u !== LOGO && freq[u] <= 4 && !/f000\./.test(u));
  const pv = [...new Set(p.videos.filter(v => /video\.wixstatic.*\/20a7e4_/.test(v)).map(vidId))];
  pi.forEach(u => imgs.add(u));
  pv.forEach(v => vids.add(v));
  map[slug] = { images: pi.map(u => `media/img/${imgId(u)}.jpg`), videos: pv.map(v => `media/vid/${v}.mp4`) };
}
map._logo = `media/img/${imgId(LOGO)}.png`;

async function get(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  const r = await fetch(url);
  if (!r.ok) throw new Error(r.status + ' ' + url);
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
}

async function pool(items, n, fn) {
  const q = [...items];
  await Promise.all(Array.from({ length: n }, async () => { while (q.length) { const it = q.shift(); try { await fn(it); } catch (e) { console.log('ERR', String(e).slice(0, 150)); } } }));
}

(async () => {
  await pool(imgs, 8, async u => {
    if (u === LOGO) return get(u, path.join(IMG, imgId(u) + '.png'));
    // fit = conserva proporcion; jpg q80
    await get(`${u}/v1/fit/w_1600,h_1600,q_80/file.jpg`, path.join(IMG, imgId(u) + '.jpg'));
  });
  console.log('IMAGES OK', imgs.size);

  await pool(vids, 3, async id => {
    const raw = path.join(RAW, id + '.mp4');
    for (const q of ['720p', '480p', '1080p']) {
      try { await get(`https://video.wixstatic.com/video/${id}/${q}/mp4/file.mp4`, raw); break; } catch (e) { if (q === '1080p') throw e; }
    }
    const out = path.join(VID, id + '.mp4');
    if (!fs.existsSync(out)) {
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-t', '20', '-an', '-vf', 'scale=-2:min(720\\,ih)', '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
      // poster = primer frame
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', '1', '-i', raw, '-frames:v', '1', '-vf', 'scale=-2:min(720\\,ih)', '-q:v', '4', out.replace(/\.mp4$/, '.jpg')]);
    }
    console.log('VID', id, (fs.statSync(out).size / 1e6).toFixed(1) + 'MB');
  });

  fs.writeFileSync('_captura/media_map.json', JSON.stringify(map, null, 2));
  console.log('DONE', imgs.size, 'img', vids.size, 'vid');
})();
