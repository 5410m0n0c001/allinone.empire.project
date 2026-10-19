// Elige, por yate, la foto exterior "sobre el mar": la que tiene mas agua azul en el borde/mitad inferior.
// Escribe _captura/sea_pick.json { pageKey: "media/img/<id>.jpg" }. Corre con: node src/pick-sea.js
const fs = require('fs');
const { execFileSync } = require('child_process');
const MAP = require('../_captura/media_map.json');

const N = 24; // muestreo 24x24
function score(file) {
  const buf = execFileSync('ffmpeg', ['-loglevel', 'error', '-i', file, '-vf', `scale=${N}:${N}`, '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']);
  let water = 0, total = 0, bright = 0;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const i = (y * N + x) * 3, r = buf[i], g = buf[i + 1], b = buf[i + 2];
    const edge = x < 3 || x >= N - 3 || y >= N / 2; // bordes + mitad inferior
    if (!edge) continue;
    total++;
    if (b > r + 25 && b > 70 && g > r) water++;
    if (r + g + b > 600) bright++;
  }
  return water / total - 0.5 * (bright / total);
}

const out = {};
for (const [key, v] of Object.entries(MAP)) {
  if (!/^copia-de-(?!yates|socios|contact)|^services-1$/.test(key)) continue;
  // la 1a imagen es la tarjeta con nombre: se excluye (igual que src/yachts.js)
  const imgs = v.images.slice(1).filter(f => fs.existsSync('site/' + f));
  let best = null, bs = -9;
  for (const f of imgs) { const s = score('site/' + f); if (s > bs) { bs = s; best = f; } }
  out[key] = best;
  console.log(key.padEnd(28), bs.toFixed(2), best);
}
fs.writeFileSync('_captura/sea_pick.json', JSON.stringify(out, null, 2));
