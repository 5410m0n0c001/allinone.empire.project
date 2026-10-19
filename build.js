// Genera el sitio estatico en site/ a partir de _captura/ + src/. Corre con: npm run build
// Diseño: scrollcraft (motor sin tocar, site/assets/scrollcraft.*) + capa propia site.css / site.js.
// Gramatica Gallery/catalog: etiquetas con hechos, indice de salas como nav, cierre = placa de solicitud.
const fs = require('fs');
const path = require('path');
const { CONTACT, VIDEO_PERKS, SERVICES } = require('./src/content');
const { parseYachts } = require('./src/yachts');

const OUT = 'site';
const pages = require('./_captura/catalogo_site.json');
const MAP = require('./_captura/media_map.json');

const exists = f => fs.existsSync(path.join(OUT, f));
const webp = (f, size = 'w') => f.replace(/^media\/img\/(.*)\.jpg$/, `media/${size}/$1.webp`);
const imgsOf = key => ((MAP[key] || {}).images || []).filter(exists);
const vid = id => `media/vid/20a7e4_${id}.mp4`;
const poster = v => v.replace(/\.mp4$/, '.jpg');

const V = {
  marina: vid('dd8c43a6c36649dfbbb22cf1e4e3ef31'),
  fishing: vid('814189f26c5641b5b87fd368cfefbb00'),
  'video-marketing': vid('51c2bacfa5d2446f89b389b3c3a7c250'),
  activities: vid('4516e0cbb1eb41188d83af5eb6c4d133'),
  transportation: vid('b58d2e09ea02452e90192dc088893b44'),
  'real-estate': vid('3a4133c92cc94740a123c3310db029be'),
  'wedding-planner': vid('a04c21cbacce4e4aa7f03d26ef0df902'),
  restaurants: vid('0001ea553c1b405aaf89a63c94d35774'),
  nightclubs: vid('675083f51447400d8dc92b130ab6bc10'),
  events: vid('9122462236fd4e818d4b3950e37262c2'),
  'bachelor-parties': vid('a235e18383454d0a9ca60e727e23c32f'),
  golf: vid('f605f303cb954743ac6e48a32c57871b'),
  helicopter: vid('7380b25f588b49cba4f0bf91ca7818df'),
  influencer: vid('6603dd88fdce4f34a34bcb050a6db309'),
  jetski: vid('de6527495a2146c4a2dddb231db5bc48'),
};
const SEA = { v: 'media/sea/sea.mp4', vm: 'media/sea/sea-m.mp4', p: 'media/sea/sea.jpg', pm: 'media/sea/sea-m.jpg' };

const YACHTS = parseYachts(pages, imgsOf);
const BY = Object.fromEntries(YACHTS.map(y => [y.slug, y]));
const FEATURED = ['northern-dreams-130', 'maranatha-120', 'neoprene-108', 'lady-katana-100', 'blue-moon-72', 'cabo-vegas-ii-55', 'bad-romance-32'].map(s => BY[s]).filter(Boolean);
const CLASS = { super: 'Super yacht', luxury: 'Luxury yacht', day: 'Day boat' };
const WA = text => `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const I = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 8h16M4 16h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
};
const dock = (extra = '') => `<span class="dock dock--static${extra}" aria-hidden="true"></span>`;

// ---------------------------------------------------------------- layout --
function layout({ title, desc, depth = 0, body, ogImage, home = false }) {
  const r = '../'.repeat(depth);
  const h = home ? '' : `${r}index.html`;
  const nav = [['Yachts', `${h}#fleet`, 'fleet'], ['Experiences', `${h}#experiences`, 'experiences'], ['Real Estate', `${r}services/real-estate.html`, 'real-estate'], ['Film', `${h}#film`, 'film'], ['Contact', home ? '#inquire' : `${r}contact.html`, 'inquire']];
  return `<!doctype html>
<html lang="en" data-root="${r}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${r}${ogImage || 'media/cover/services-1.webp'}">
<meta name="theme-color" content="#061419">
<link rel="icon" href="${r}media/mark.webp">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..800&family=Geist:wght@400;500;600&family=Geist+Mono:wght@500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/scrollcraft.css">
<link rel="stylesheet" href="${r}assets/site.css">
</head>
<body>
<a class="sc-skip" href="#main">Skip to content</a>
<div class="sc-grain" aria-hidden="true"></div>
<header class="bar">
  <a class="bar__mark" href="${r}index.html" aria-label="All In One Cabo, home"><img src="${r}media/mark.webp" alt="" width="320" height="334"><span>All In One <b>Cabo</b></span></a>
  <nav class="index" aria-label="Sections">${nav.map(([t, u, k]) => `<a href="${u}" data-nav="${k}">${t}</a>`).join('')}</nav>
  <div style="display:flex;gap:.5rem;align-items:center">
    <a class="btn btn--accent" href="${WA('Hi! I would like information about All In One Cabo.')}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}<span>WhatsApp</span></a>
    <button class="bar__menu" type="button" aria-label="Open menu" aria-controls="drawer" aria-expanded="false" data-drawer-open>${I.menu}</button>
  </div>
</header>
<div class="drawer" id="drawer" hidden>
  <button class="bar__menu drawer__close" type="button" aria-label="Close menu" data-drawer-close style="display:grid">${I.close}</button>
  ${nav.map(([t, u]) => `<a href="${u}">${t}</a>`).join('')}
  <a href="${r}fleet.html">All 48 yachts</a>
  <a href="${r}services.html">All services</a>
</div>
<main id="main">
${body}
</main>
<a class="wa-float" href="${WA('Hi! I would like information about All In One Cabo.')}" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${I.wa}</a>
<div class="lightbox" hidden role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lb-close" type="button" aria-label="Close">${I.close}</button>
  <button class="lb-prev" type="button" aria-label="Previous photo">${I.arrow}</button>
  <img alt="">
  <button class="lb-next" type="button" aria-label="Next photo">${I.arrow}</button>
</div>
<script src="${r}assets/scrollcraft.js"></script>
<script src="${r}assets/site.js"></script>
</body>
</html>`;
}

const footer = r => `<footer class="foot">
  <span>© ${new Date().getFullYear()} All In One Cabo · Cabo San Lucas, Baja California Sur</span>
  <nav aria-label="Social and pages">
    <a href="${r}fleet.html">Fleet</a><a href="${r}services.html">Services</a><a href="${r}partners.html">Partners</a>
    <a href="${CONTACT.social.instagram}" target="_blank" rel="noopener">Instagram</a><a href="${CONTACT.social.facebook}" target="_blank" rel="noopener">Facebook</a><a href="${CONTACT.social.tiktok}" target="_blank" rel="noopener">TikTok</a><a href="${CONTACT.social.youtube}" target="_blank" rel="noopener">YouTube</a>
  </nav>
</footer>`;

// ------------------------------------------------------------- piezas --
const choose = y => esc(JSON.stringify({ name: y.name, ft: y.ft, cover: y.cover }));
const aboard = y => y.includes.filter(x => !/bedroom|bathroom/i.test(x));

function facts(y) {
  const rows = [['Length', `${y.ft} ft`], ['Class', CLASS[y.tier]]];
  if (y.cabins) rows.push(['Cabins', y.cabins]);
  if (y.baths) rows.push(['Bathrooms', y.baths]);
  rows.push(['Aboard', aboard(y).join(', ')]);
  return `<dl class="facts">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl>`;
}

const plate = (y, r, side, i, tag = 'h3') => `<div class="plate" data-side="${side}" data-i="${i}" aria-hidden="true">
  <${tag} class="d-sm">${esc(y.name)}</${tag}>
  ${facts(y)}
  <div class="plate__ctas"><a class="btn btn--line" href="${r}yachts/${y.slug}.html">View yacht ${I.arrow}</a><button class="btn btn--accent" type="button" data-choose="${choose(y)}">Choose</button></div>
</div>`;

const boat = (y, r, side, eager) => `<figure class="boat" data-side="${side}"><img class="boat__wake" src="${r}${y.cover}" alt="" ${eager ? '' : 'loading="lazy"'} decoding="async"><img class="boat__photo" src="${r}${y.cover}" alt="${esc(y.name)}, ${y.ft} ft, on the water in Cabo San Lucas" ${eager ? '' : 'loading="lazy"'} decoding="async"></figure>`;

const seaBed = r => `<div class="sea__bed"><video data-ambient src="${r}${SEA.v}" poster="${r}${SEA.p}" data-mobile="${r}${SEA.vm}" data-mobile-poster="${r}${SEA.pm}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video></div>`;

function seaAct({ r, list, id, heading, lead, span, more = true }) {
  return `<section class="sea" id="${id}" data-section="fleet" data-sea data-sc-act="pin" data-sc-span="${span}">
  <div data-sc-stage>
    ${seaBed(r)}
    <div class="sea__intro">${dock()}<div><h2 class="d-sm">${heading}</h2><p class="mono">${lead}</p></div></div>
    <div class="sea__water">
      ${list.map((y, i) => boat(y, r, i % 2 ? 'r' : 'l', i < 2) + plate(y, r, i % 2 ? 'l' : 'r', i)).join('\n      ')}
    </div>
    <div class="sea__rail" aria-label="Yachts in this view">${list.map((y, i) => `<button type="button" aria-label="Go to ${esc(y.name)}"></button>`).join('')}</div>
    ${more ? `<a class="btn btn--line sea__more" href="${r}fleet.html">All ${YACHTS.length} yachts ${I.arrow}</a>` : ''}
  </div>
</section>`;
}

function carousel(r, heading = 'The whole fleet') {
  const counts = { all: YACHTS.length, super: 0, luxury: 0, day: 0 };
  YACHTS.forEach(y => counts[y.tier]++);
  return `<section class="flow" data-sc-act="flow">
  <div class="wrap">
    <div class="head">${dock()}<h2 class="d-md">${heading}</h2></div>
    <p class="body">${YACHTS.length} private yachts from ${YACHTS[YACHTS.length - 1].ft} to ${YACHTS[0].ft} ft. Every charter includes national open bar, food, snorkeling gear, water mat and sea scooters.</p>
  </div>
  <div class="carousel" data-carousel>
    <div class="wrap carousel__nav">
      <div class="chips" role="group" aria-label="Filter by size">${[['all', 'All'], ['super', 'Super yachts'], ['luxury', 'Luxury'], ['day', 'Day boats']].map(([k, t], i) => `<button class="chip" type="button" data-tier="${k}" aria-pressed="${i === 0}">${t} ${counts[k]}</button>`).join('')}</div>
      <div class="arrows"><button type="button" data-step="-1" aria-label="Previous yachts">${I.arrow}</button><button type="button" data-step="1" aria-label="Next yachts">${I.arrow}</button></div>
    </div>
    <div class="carousel__track">
      ${YACHTS.map(y => `<a class="coin" href="${r}yachts/${y.slug}.html" data-tier="${y.tier}"><span class="coin__img"><img src="${r}${y.cover}" alt="" loading="lazy" decoding="async"></span><span class="coin__name">${esc(y.name)}</span><span class="coin__meta">${y.ft} ft · ${CLASS[y.tier]}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

const ROOMS = [
  { key: 'Sea', v: V.fishing, text: 'Sport fishing trips of 5 or 8 hours on every fishing boat in Cabo. Whale watching from December to April. A glass-bottom boat to the Arch.', links: ['fishing', 'activities'] },
  { key: 'Land', v: V.activities, text: 'Razor desert tours on new Polaris vehicles, camel rides on the Pacific beach, and the second arch at Rancho San Cristóbal.', links: ['activities', 'golf'] },
  { key: 'Sky', v: V.helicopter, text: 'Fly over Cabo San Lucas bay in a 2019 Bell 505.', links: ['helicopter'] },
  { key: 'Night', v: V.nightclubs, text: 'Reservations at the clubs and restaurants we recommend, so you skip the lines: Taboo, Bagatelle, Funky Geisha, Mango Deck.', links: ['nightclubs', 'restaurants'] },
  { key: 'Celebrate', v: V['wedding-planner'], text: 'Weddings planned and designed, bachelor and bachelorette parties on a first-class yacht, and events filmed by our crew.', links: ['wedding-planner', 'bachelor-parties', 'events'] },
  { key: 'Stay & move', v: V['real-estate'], text: 'Villas for rent and for sale in Pedregal and El Tezal. Private transportation from the airport to anywhere in Cabo, San José or La Paz.', links: ['real-estate', 'transportation'] },
];
const svc = slug => SERVICES.find(s => s.slug === slug);

function roomsAct(r, list, span, heading = 'Experiences') {
  return `<section class="rooms" id="experiences" data-section="experiences" data-rooms data-sc-act="pin" data-sc-span="${span}">
  <div data-sc-stage>
    <div class="rooms__head">${dock()}<h2 class="d-sm">${heading}</h2></div>
    ${list.map((m, i) => `<article class="room" aria-label="${esc(m.key)}">
      <video data-room src="${r}${m.v}" poster="${r}${poster(m.v)}" muted loop playsinline preload="${i ? 'none' : 'metadata'}" ${i ? '' : 'autoplay'} aria-hidden="true"></video>
      <div class="room__plate"><span class="mono">${esc(m.tag || 'Cabo San Lucas')}</span><h3 class="d-md">${esc(m.key)}</h3><p class="body">${esc(m.text)}</p>
        <div class="room__links">${m.links.map(l => `<a class="link" href="${r}services/${l}.html">${esc(svc(l).title)}</a>`).join('')}</div></div>
    </article>`).join('\n    ')}
  </div>
</section>`;
}

function inquiry(r, { pin = false, preset = '' } = {}) {
  const opts = ['Yacht charter', ...SERVICES.map(s => s.title)];
  const inner = `<div class="wrap inquiry" id="inquire" data-section="inquire">
      <div>
        <div class="head">${dock()}<h2 class="d-md">Request</h2></div>
        <p class="body">Fill this in and WhatsApp opens with your request ready to send. ${esc(CONTACT.name)} answers ${esc(CONTACT.hours.toLowerCase())}: <a class="link" href="tel:+${CONTACT.wa}">${CONTACT.phone}</a> · <a class="link" href="mailto:${CONTACT.email}">${CONTACT.email}</a></p>
        <div class="inquiry__pick" data-pick hidden><img src="" alt=""><div><p class="mono">Your yacht</p><p data-pick-name></p></div><button class="btn btn--line" type="button" data-pick-clear>Remove</button></div>
      </div>
      <form class="form" method="post" action="#" data-wa-form data-wa="${CONTACT.wa}">
        <input type="hidden" name="Yacht">
        <label class="field"><span>Name</span><input name="Name" required autocomplete="name"></label>
        <label class="field"><span>Service</span><select name="Service">${opts.map(o => `<option${o === preset ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></label>
        <label class="field"><span>Date</span><input name="Date" type="date"></label>
        <label class="field"><span>Guests</span><input name="Guests" type="number" min="1" inputmode="numeric"></label>
        <label class="field field--wide"><span>Message</span><textarea name="Message" rows="3"></textarea></label>
        <button class="btn btn--accent" type="submit">${I.wa}<span>Send on WhatsApp</span></button>
      </form>
    </div>`;
  return pin
    ? `<section class="close" data-sc-act="pin" data-sc-span="1.25"><div data-sc-stage>${inner}${footer(r)}</div></section>`
    : `<section class="flow">${inner}</section>${footer(r)}`;
}

function mosaic(imgs, r, label) {
  if (!imgs.length) return '';
  return `<section class="flow flow--tight"><div class="wrap"><div class="head"><h2 class="d-md">Photos</h2><p class="mono">${imgs.length}</p></div>
  <div class="mosaic">${imgs.map((f, i) => `<button type="button" data-full="${r}${webp(f)}" aria-label="Open photo ${i + 1} of ${esc(label)}"><img src="${r}${webp(f, 't')}" alt="${esc(label)}, photo ${i + 1}" loading="lazy" decoding="async"></button>`).join('')}</div></div></section>`;
}

const write = (file, html) => { fs.mkdirSync(path.dirname(path.join(OUT, file)), { recursive: true }); fs.writeFileSync(path.join(OUT, file), html); };

// ------------------------------------------------------------- paginas --
function home() {
  const r = '';
  const f = FEATURED[0];
  const body = `
<section class="hero" data-section="top">
  <div class="hero__far"><video data-ambient src="${V.marina}" poster="${poster(V.marina)}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video></div>
  <div class="hero__prints" aria-hidden="true">
    <figure class="print print--a" data-depth="0.6" data-ry="-14"><img src="${f.cover}" alt=""></figure>
    <figure class="print print--b" data-depth="1.1" data-ry="12"><img src="${BY['lady-katana-100'].cover}" alt=""></figure>
    <figure class="print print--c" data-depth="1.8" data-ry="-8"><img src="${BY['neoprene-108'].cover}" alt=""></figure>
  </div>
  <div class="hero__floor"></div>
  <div class="wrap hero__copy">
    ${dock()}
    <h1 class="d-xl">Yachts, sea and nights <em>in Cabo San Lucas</em></h1>
    <p class="lede">${YACHTS.length} private yachts from ${YACHTS[YACHTS.length - 1].ft} to ${YACHTS[0].ft} ft, sport fishing, tours, transportation, weddings and nightlife. One local concierge on WhatsApp.</p>
    <div class="hero__ctas"><a class="btn btn--accent" href="#fleet">See the yachts ${I.arrow}</a><a class="btn btn--line" href="${WA('Hi! I would like to plan my trip to Cabo.')}" target="_blank" rel="noopener">${I.wa}<span>WhatsApp</span></a></div>
  </div>
</section>
${seaAct({ r, list: FEATURED, id: 'fleet', heading: 'On the water today', lead: `${FEATURED.length} of ${YACHTS.length} yachts · scroll to sail`, span: 5.6 })}
${carousel(r)}
${roomsAct(r, ROOMS, 3.4)}
<section class="flow" id="film" data-section="film" data-sc-act="flow">
  <div class="wrap film">
    <div class="film__frame"><video data-ambient src="${V['video-marketing']}" poster="${poster(V['video-marketing'])}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video></div>
    <div data-sc-in data-sc-stagger="60">
      <div class="head">${dock()}<h2 class="d-md">Filmed by our crew</h2></div>
      <p class="body">Add our camera crew to any charter, wedding or event and take home the video of your trip. Businesses get campaigns sized for Instagram, Facebook, YouTube and their website.</p>
      <ul class="perks">${VIDEO_PERKS.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join('')}</ul>
      <p style="margin-top:2rem"><a class="link" href="services/video-marketing.html">Video services</a> · <a class="link" href="services/businesses.html">Business campaigns</a> · <a class="link" href="services/influencer.html">Influencer sessions</a></p>
    </div>
  </div>
  <figure class="quote wrap"><p>“My friends and I had such a fun experience on a yacht we rented! It was really cool to see it on video and we got to show all of my friends and family when I got home.”</p><figcaption class="mono">Lauren · yacht charter with video</figcaption></figure>
</section>
${inquiry(r, { pin: true })}`;
  write('index.html', layout({ home: true, title: 'All In One Cabo · Yacht Charters, Fishing & Concierge in Cabo San Lucas', desc: `${YACHTS.length} private yachts from ${YACHTS[YACHTS.length - 1].ft} to ${YACHTS[0].ft} ft, sport fishing, tours, transportation, weddings, nightlife and real estate in Cabo San Lucas.`, body }));
}

function fleet() {
  const r = '';
  const body = `${seaAct({ r, list: YACHTS, id: 'fleet', heading: `The fleet · ${YACHTS.length} yachts`, lead: `${YACHTS[0].ft} to ${YACHTS[YACHTS.length - 1].ft} ft · largest first`, span: (YACHTS.length * 0.55 + 0.6).toFixed(2), more: false })}
${carousel(r, 'Jump to a yacht')}
${inquiry(r, { preset: 'Yacht charter' })}`;
  write('fleet.html', layout({ title: `Yacht Charters in Cabo San Lucas · ${YACHTS.length} Yachts · All In One Cabo`, desc: `Browse ${YACHTS.length} private yachts from ${YACHTS[YACHTS.length - 1].ft} to ${YACHTS[0].ft} ft for charter in Cabo San Lucas.`, body }));
}

function yachtPage(y) {
  const r = '../';
  const msg = `Hi! I'm interested in chartering ${y.name} (${y.ft} ft). Is it available?`;
  const body = `
<section class="afloat" data-section="fleet">
  ${seaBed(r)}
  <div class="wrap afloat__grid">
    <div class="afloat__boat">${boat(y, r, 'l', true)}</div>
    <div class="plate is-on">
      <div class="head">${dock()}<h1 class="d-md">${esc(y.name)}</h1></div>
      ${facts(y)}
      <div class="plate__ctas"><a class="btn btn--accent" href="${WA(msg)}" target="_blank" rel="noopener">${I.wa}<span>Check availability</span></a><button class="btn btn--line" type="button" data-choose="${choose(y)}">Choose</button></div>
    </div>
  </div>
</section>
<section class="flow flow--tight"><div class="wrap stack" data-sc-in data-sc-stagger="60">${y.desc.map(p => `<p class="lede">${esc(p)}</p>`).join('')}</div></section>
${mosaic(y.images, r, y.name)}
${carousel(r, 'More yachts')}
${inquiry(r, { preset: 'Yacht charter' })}`;
  write(`yachts/${y.slug}.html`, layout({ depth: 1, ogImage: y.cover, title: `${y.name} ${y.ft} ft · Yacht Charter Cabo San Lucas · All In One Cabo`, desc: `${y.name}, ${y.ft}-ft ${CLASS[y.tier].toLowerCase()} for private charter in Cabo San Lucas. ${y.desc[0]}`, body }));
}

function servicesIndex() {
  const r = '';
  const all = SERVICES.filter(s => V[s.slug]).map(s => ({ key: s.title, tag: s.eyebrow, v: V[s.slug], text: s.lead + ' ' + s.body[0].split('. ')[0] + '.', links: [s.slug] }));
  const body = `${roomsAct(r, all, (all.length * 0.55 + 0.4).toFixed(2), 'All services')}
<section class="flow"><div class="wrap"><div class="head">${dock()}<h2 class="d-md">Everything we arrange</h2></div>
<ul class="tags">${[`<a class="link" href="fleet.html">Yacht charters</a>`, ...SERVICES.map(s => `<a class="link" href="services/${s.slug}.html">${esc(s.title)}</a>`)].map(x => `<li>${x}</li>`).join('')}</ul></div></section>
${inquiry(r)}`;
  write('services.html', layout({ title: 'Services in Cabo San Lucas · All In One Cabo', desc: 'Yachts, fishing, tours, helicopter rides, transportation, weddings, restaurants, nightlife, golf, events and video production in Cabo San Lucas.', body }));
}

function servicePage(s) {
  const r = '../';
  const imgs = imgsOf(s.src);
  const v = V[s.slug];
  const media = v ? `<video data-ambient src="${r}${v}" poster="${r}${poster(v)}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video>` : imgs[0] ? `<img src="${r}${webp(imgs[0])}" alt="">` : '';
  const body = `
<section class="page-hero" data-section="experiences">
  <div class="page-hero__media">${media}</div>
  <div class="wrap"><div class="page-hero__plate">
    <div class="head">${dock()}<h1 class="d-md">${esc(s.title)}</h1></div>
    <p class="mono">${esc(s.eyebrow)}</p>
    <p class="lede">${esc(s.lead)}</p>
    <div class="hero__ctas"><a class="btn btn--accent" href="${WA(`Hi! I would like information about ${s.title}.`)}" target="_blank" rel="noopener">${I.wa}<span>Ask on WhatsApp</span></a></div>
  </div></div>
</section>
<section class="flow flow--tight"><div class="wrap" data-sc-in data-sc-stagger="60">
  <div class="stack">${s.body.map(p => `<p class="body">${esc(p)}</p>`).join('')}</div>
  ${s.features ? `<ul class="tags">${s.features.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
  ${s.extraContact ? `<p class="body" style="margin-top:1.5rem">Nightlife reservations also with ${esc(s.extraContact[0])}: <a class="link" href="tel:${s.extraContact[1].replace(/\s/g, '')}">${esc(s.extraContact[1])}</a></p>` : ''}
</div></section>
${s.sections ? `<section class="flow flow--tight"><div class="wrap grid-2">${s.sections.map(([t, d]) => `<article class="card"><h2 class="d-sm">${esc(t)}</h2><p class="body">${esc(d)}</p><a class="btn btn--line" href="${WA(`Hi! I would like to book: ${t}.`)}" target="_blank" rel="noopener">Book ${I.arrow}</a></article>`).join('')}</div></section>` : ''}
${s.perks ? `<section class="flow flow--tight"><div class="wrap"><h2 class="d-md">What makes us different</h2><ul class="perks">${VIDEO_PERKS.map(([t, d]) => `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`).join('')}</ul></div>${s.testimonial ? `<figure class="quote wrap"><p>“${esc(s.testimonial[0])}”</p><figcaption class="mono">${esc(s.testimonial[1])}</figcaption></figure>` : ''}</section>` : ''}
${s.packages ? `<section class="flow flow--tight"><div class="wrap"><h2 class="d-md">Packages</h2><div class="grid-3" style="margin-top:2rem">${s.packages.map(p => `<article class="card"><p class="mono">${esc(p.note)}</p><h3 class="d-sm">${esc(p.name)}</h3>${p.price ? `<p class="price">${esc(p.price)}</p>` : ''}<ul class="ticks">${p.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul><a class="btn btn--line" href="${WA(`Hi! I'm interested in the ${s.title} package: ${p.name}.`)}" target="_blank" rel="noopener">Book ${esc(p.name)}</a></article>`).join('')}</div></div></section>` : ''}
${s.properties ? s.properties.map(p => `<section class="flow flow--tight"><div class="wrap"><p class="mono">${esc(p.kind)}</p><h2 class="d-md" style="margin-top:.75rem">${esc(p.name)}</h2><p class="body" style="margin-top:1rem">${esc(p.text)}</p><div class="grid-3" style="margin-top:2rem">${p.lists.map(([t, l]) => `<div class="card"><h3 class="d-sm">${esc(t)}</h3><ul class="ticks">${l.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div><p style="margin-top:2rem"><a class="btn btn--accent" href="${WA(`Hi! I'm interested in ${p.name}.`)}" target="_blank" rel="noopener">${I.wa}<span>Get a quote</span></a></p></div></section>${mosaic(imgsOf(p.src), r, p.name)}`).join('') : mosaic(imgs, r, s.title)}
${inquiry(r, { preset: s.title })}`;
  write(`services/${s.slug}.html`, layout({ depth: 1, ogImage: v ? poster(v) : undefined, title: `${s.title} in Cabo San Lucas · All In One Cabo`, desc: `${s.lead} ${s.body[0]}`.slice(0, 158), body }));
}

function contactPage() {
  const body = `<section class="page-hero"><div class="page-hero__media"><video data-ambient src="${SEA.v}" poster="${SEA.p}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video></div>
  <div class="wrap"><div class="page-hero__plate"><div class="head">${dock()}<h1 class="d-md">Contact</h1></div><p class="lede">${esc(CONTACT.name)} · ${CONTACT.phone} · ${CONTACT.email}. Open ${esc(CONTACT.hours.toLowerCase())}.</p></div></div></section>
${inquiry('')}`;
  write('contact.html', layout({ title: 'Contact · All In One Cabo', desc: `Contact All In One Cabo: ${CONTACT.phone} · ${CONTACT.email}. Open ${CONTACT.hours}.`, body }));
}

function partnersPage() {
  const body = `<section class="page-hero"><div class="page-hero__media"><video data-ambient src="${V.marina}" poster="${poster(V.marina)}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video></div>
  <div class="wrap"><div class="page-hero__plate"><div class="head">${dock()}<h1 class="d-md">Partners</h1></div><p class="lede">Own a yacht or a transportation service in Cabo? Register and join our community.</p></div></div></section>
<section class="flow flow--tight"><div class="wrap"><form class="form" method="post" action="#" data-wa-form data-wa="${CONTACT.wa}" data-wa-title="Partner registration">
  <label class="field"><span>Name</span><input name="Name" required autocomplete="name"></label>
  <label class="field"><span>Phone</span><input name="Phone" type="tel" autocomplete="tel"></label>
  <label class="field"><span>I offer</span><select name="Offer"><option>Yacht</option><option>Transport</option><option>Other</option></select></label>
  <label class="field"><span>Boat or vehicle, size</span><input name="Boat"></label>
  <label class="field field--wide"><span>Notes</span><textarea name="Notes" rows="3"></textarea></label>
  <button class="btn btn--accent" type="submit">${I.wa}<span>Register on WhatsApp</span></button>
</form></div></section>${footer('')}`;
  write('partners.html', layout({ title: 'Partners · All In One Cabo', desc: 'Yacht owners and transportation providers in Cabo San Lucas: join the All In One Cabo partner network.', body }));
}

function notFound() {
  write('404.html', layout({ title: 'Page not found · All In One Cabo', desc: 'Page not found.', body: `<section class="page-hero"><div class="page-hero__media"><img src="${SEA.p}" alt=""></div><div class="wrap"><div class="page-hero__plate"><div class="head">${dock()}<h1 class="d-md">Lost at sea</h1></div><p class="lede">This page does not exist.</p><p><a class="btn btn--accent" href="index.html">Back to shore</a></p></div></div></section>` }));
}

home(); fleet(); YACHTS.forEach(yachtPage); servicesIndex(); SERVICES.forEach(servicePage); contactPage(); partnersPage(); notFound();
console.log(`OK · ${YACHTS.length} yates · destacados ${FEATURED.length} · ${SERVICES.length} servicios`);
