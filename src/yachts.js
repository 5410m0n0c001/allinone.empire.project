// Extrae la flota desde las paginas de yates del catalogo scrapeado.
// OJO: 43 de 49 fichas en Wix comparten un texto plantilla ("big dance floor, two levels", "3 bedrooms")
// copiado de Blue Moon. No lo publicamos como dato de cada barco: solo se muestran recamaras/banos
// y descripcion donde el texto fue escrito para ese barco. Ver CONTEXTO_PROYECTO.md (pendiente confirmar con Christian).

const TEMPLATE = 'Planing a big party full with guests?';

// Textos propios del dueño, con ortografia corregida.
const DESC = {
  'northen-dreams-130': ['Where all the dreams come true — hop on this big luxury yacht.', 'The biggest charter in Cabo San Lucas.'],
  'maranatha-120': ['This incredible yacht brings you a unique experience: explore both oceans, the Sea of Cortez and the Pacific.', 'The interiors and decks of this huge boat will leave you and your guests with an image they will never forget.'],
  'neoprene-108': ['A unique experience — discover the most stylish luxury yacht in Cabo San Lucas.', 'The only boat of this color and size. 108 ft of pure fun.'],
  'st-vincent-100': ['If you could describe this yacht in one word, it would be: luxury.', 'It has one of the best interior designs in Cabo San Lucas. Come join us on a new adventure.'],
  'number-juan-100': ['Number Juan is one of the biggest charter boats in Cabo San Lucas — it even has its own tequila brand.', 'This boat has everything you need for an unforgettable day.'],
  'lady-katana-100': ['Ready to have fun? Hop on a super yacht.', 'Lady Katana has lots of spots for awesome pictures and lots of toys to play with.'],
  'blue-moon-72': ['Planning a big party full of guests? This is the boat you are looking for — it has a big dance floor.', 'Two levels of pure fun, with open bar and food included.'],
};

const COMMON = ['National open bar', 'Food', 'Water mat', '12 snorkeling sets', 'Sea scooters'];

const title = s => s.toLowerCase().replace(/\b[a-z]/g, c => c.toUpperCase()).replace(/\bIi\b/, 'II');
const cap = s => s.charAt(0) + s.slice(1).toLowerCase();

function parseYachts(pages, media) {
  const seen = new Set();
  const out = [];
  for (const p of pages) {
    if (!/copia-de-(?!yates|socios|contact)|services-1/.test(p.url)) continue;
    const L = p.text.split('\n').map(s => s.trim()).filter(s => s && !/^[​\s]*$/.test(s));
    const i = L.indexOf('OUR SERVICES');
    const m = L[i + 1].match(/^(.*?)\s+(\d+)\s*FT$/i);
    if (!m) continue;
    const name = title(m[1]);
    const ft = +m[2];
    const slug = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${ft}`;
    if (seen.has(slug)) continue; // Andiamo 45 aparece dos veces
    seen.add(slug);
    const custom = !L.slice(i + 3).join(' ').includes(TEMPLATE) || slug === 'blue-moon-72';
    const a = L.indexOf('INCLUDES:'), g = L.indexOf('GALLERY');
    const inc = L.slice(a + 1, g).map(cap).filter(x => custom || !/bedroom|bathroom/i.test(x));
    const key = p.url.split('/').pop();
    // La 1a imagen de cada ficha suele ser una tarjeta con el nombre en texto: no sirve recortada.
    const all = media(key);
    const images = all.length > 1 ? all.slice(1) : all;
    out.push({
      slug, name, ft,
      tagline: cap(L[i + 2]).replace(/^Luxury at sea$/, 'Luxury at sea'),
      desc: DESC[slug] || [`A ${ft}-ft yacht for private charters in Cabo San Lucas.`, 'Message us for capacity, rates and availability on your dates.'],
      includes: custom ? inc.map(x => x.replace('12 snorkeling equipment', '12 snorkeling sets').replace('2 kayak', '2 kayaks')) : COMMON,
      images,
      tier: ft >= 90 ? 'super' : ft >= 50 ? 'luxury' : 'day',
    });
  }
  return out.sort((x, y) => y.ft - x.ft || x.name.localeCompare(y.name));
}

module.exports = { parseYachts };
