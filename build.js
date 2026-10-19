// Genera el sitio estatico en site/ a partir de _captura/ + src/. Corre con: npm run build
const fs = require('fs');
const path = require('path');
const { CONTACT, VIDEO_PERKS, SERVICES } = require('./src/content');
const { parseYachts } = require('./src/yachts');

const OUT = 'site';
const pages = require('./_captura/catalogo_site.json');
const MAP = require('./_captura/media_map.json');

const exists = f => fs.existsSync(path.join(OUT, f));
const imgsOf = key => ((MAP[key] || {}).images || []).filter(exists);
const vid = id => `media/vid/20a7e4_${id}.mp4`;
const poster = v => v.replace(/\.mp4$/, '.jpg');

// Videos de la Home original, identificados por su primer frame.
const V = {
  hero: vid('01170023cdc74d96945340bbed6364be'),
  yachts: vid('dd8c43a6c36649dfbbb22cf1e4e3ef31'),
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
  'jetski': vid('de6527495a2146c4a2dddb231db5bc48'),
};

const YACHTS = parseYachts(pages, imgsOf);
const SITE = 'All In One Cabo';
const WA = text => `https://wa.me/${CONTACT.wa}?text=${encodeURIComponent(text)}`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// ---------- iconos (stroke, 24px) ----------
const I = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" class="h-5 w-5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" class="h-5 w-5"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" class="h-5 w-5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" class="h-4 w-4 shrink-0"><path d="m5 12 5 5L20 7"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" class="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" class="h-6 w-6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" class="h-6 w-6"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true" class="h-5 w-5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v6h4v-6h3l1-4h-4V8Z"/></svg>',
  tt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M16 3c.3 2.3 1.7 3.8 4 4v3.2a7 7 0 0 1-4-1.3V15a6 6 0 1 1-6-6v3.3a2.8 2.8 0 1 0 2.8 2.7V3H16Z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" class="h-5 w-5"><path d="M22 8.2a3 3 0 0 0-2-2C18.2 5.7 12 5.7 12 5.7s-6.2 0-8 .5a3 3 0 0 0-2 2A31 31 0 0 0 1.5 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2 2c1.8.5 8 .5 8 .5s6.2 0 8-.5a3 3 0 0 0 2-2 31 31 0 0 0 .5-3.8 31 31 0 0 0-.5-3.8ZM10 15V9l5.2 3L10 15Z"/></svg>',
};

// ---------- layout ----------
function layout({ title, desc, depth = 0, body, active = '' }) {
  const r = '../'.repeat(depth);
  const nav = [
    ['Yachts', 'fleet.html', 'fleet'],
    ['Experiences', 'services.html', 'services'],
    ['Real Estate', 'services/real-estate.html', 'real-estate'],
    ['Video', 'services/video-marketing.html', 'video-marketing'],
    ['Contact', 'contact.html', 'contact'],
  ];
  const link = ([t, h, k]) => `<a href="${r}${h}" class="nav-link${active === k ? ' is-active' : ''}">${t}</a>`;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${r}media/vid/${path.basename(poster(V.hero))}">
<meta name="theme-color" content="#0a1824">
<link rel="icon" href="${r}${MAP._logo}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${r}assets/styles.css">
</head>
<body class="bg-cream text-ink antialiased">
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
<header id="top" class="site-header">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20">
    <a href="${r}index.html" class="flex items-center gap-3" aria-label="${SITE} home">
      <img src="${r}${MAP._logo}" alt="" class="h-9 w-9 rounded-full bg-white/90 object-contain p-0.5 lg:h-11 lg:w-11">
      <span class="font-display text-lg tracking-wide lg:text-xl">All In One <em class="not-italic text-gold">Cabo</em></span>
    </a>
    <nav class="hidden items-center gap-8 lg:flex" aria-label="Main">${nav.map(link).join('')}</nav>
    <div class="flex items-center gap-2">
      <a href="${WA('Hi! I would like information about All In One Cabo services.')}" target="_blank" rel="noopener" class="btn btn-gold hidden sm:inline-flex">${I.wa}<span>WhatsApp</span></a>
      <button type="button" class="menu-btn lg:hidden" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" data-menu-open>${I.menu}</button>
    </div>
  </div>
</header>
<div id="mobile-menu" class="mobile-menu" hidden>
  <div class="flex h-16 items-center justify-end px-4"><button type="button" class="menu-btn" aria-label="Close menu" data-menu-close>${I.close}</button></div>
  <nav class="flex flex-col gap-1 px-6 text-2xl font-display" aria-label="Mobile">${nav.map(([t, h]) => `<a href="${r}${h}" class="py-3 border-b border-white/10">${t}</a>`).join('')}</nav>
  <div class="mt-8 px-6"><a href="${WA('Hi! I would like information about All In One Cabo services.')}" target="_blank" rel="noopener" class="btn btn-gold w-full justify-center">${I.wa}<span>Message us on WhatsApp</span></a></div>
</div>
<main id="main">
${body}
</main>
${footer(r)}
<a href="${WA('Hi! I would like information about All In One Cabo services.')}" target="_blank" rel="noopener" class="wa-float" aria-label="Chat on WhatsApp">${I.wa}</a>
<div class="lightbox" hidden data-lightbox role="dialog" aria-modal="true" aria-label="Image viewer">
  <button type="button" class="lb-btn right-4 top-4" aria-label="Close" data-lb-close>${I.close}</button>
  <button type="button" class="lb-btn left-4 top-1/2 -translate-y-1/2 rotate-180" aria-label="Previous" data-lb-prev>${I.arrow}</button>
  <img alt="" class="max-h-[86vh] max-w-[92vw] rounded object-contain" data-lb-img>
  <button type="button" class="lb-btn right-4 top-1/2 -translate-y-1/2" aria-label="Next" data-lb-next>${I.arrow}</button>
</div>
<script src="${r}assets/app.js" defer></script>
</body>
</html>`;
}

function footer(r) {
  const s = CONTACT.social;
  return `<footer class="bg-ink text-white/80">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
    <div class="lg:col-span-2">
      <p class="font-display text-3xl text-white">All In One <span class="text-gold">Cabo</span></p>
      <p class="mt-4 max-w-md text-white/60">Yachts, fishing, tours, transportation, weddings, nightlife and real estate in Cabo San Lucas — one local team, one message away.</p>
      <div class="mt-6 flex gap-3">
        <a href="${s.instagram}" target="_blank" rel="noopener" class="social" aria-label="Instagram">${I.ig}</a>
        <a href="${s.facebook}" target="_blank" rel="noopener" class="social" aria-label="Facebook">${I.fb}</a>
        <a href="${s.tiktok}" target="_blank" rel="noopener" class="social" aria-label="TikTok">${I.tt}</a>
        <a href="${s.youtube}" target="_blank" rel="noopener" class="social" aria-label="YouTube">${I.yt}</a>
      </div>
    </div>
    <div>
      <p class="eyebrow text-gold">Explore</p>
      <ul class="mt-4 space-y-2 text-sm">
        <li><a class="hover:text-white" href="${r}fleet.html">Yacht fleet</a></li>
        ${SERVICES.slice(0, 7).map(x => `<li><a class="hover:text-white" href="${r}services/${x.slug}.html">${x.short}</a></li>`).join('')}
        <li><a class="hover:text-white" href="${r}partners.html">Partners</a></li>
      </ul>
    </div>
    <div>
      <p class="eyebrow text-gold">Contact</p>
      <ul class="mt-4 space-y-3 text-sm">
        <li class="flex items-center gap-3">${I.phone}<a class="hover:text-white" href="tel:+${CONTACT.wa}">${CONTACT.phone}</a></li>
        <li class="flex items-center gap-3">${I.mail}<a class="hover:text-white break-all" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li class="flex items-center gap-3">${I.clock}<span>${CONTACT.hours}</span></li>
      </ul>
    </div>
  </div>
  <div class="border-t border-white/10"><p class="mx-auto max-w-7xl px-4 py-6 text-xs text-white/40 sm:px-6">© ${new Date().getFullYear()} All In One Cabo · Cabo San Lucas, Baja California Sur, México</p></div>
</footer>`;
}

// ---------- piezas ----------
const videoBg = (src, r, cls = '') => `<video class="absolute inset-0 h-full w-full object-cover ${cls}" src="${r}${src}" poster="${r}${poster(src)}" autoplay muted loop playsinline preload="metadata" aria-hidden="true"></video>`;

function pageHero({ r, eyebrow, title, lead, video, image, cta = true, msg }) {
  const media = video ? videoBg(video, r) : image ? `<img src="${r}${image}" alt="" class="absolute inset-0 h-full w-full object-cover">` : '';
  return `<section class="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink text-white">
  ${media}
  <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30"></div>
  <div class="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:pb-20">
    ${eyebrow ? `<p class="eyebrow text-gold">${esc(eyebrow)}</p>` : ''}
    <h1 class="mt-3 max-w-4xl font-display text-5xl font-light leading-[1.02] sm:text-6xl lg:text-7xl">${title}</h1>
    ${lead ? `<p class="mt-5 max-w-2xl text-lg text-white/80">${esc(lead)}</p>` : ''}
    ${cta ? `<div class="mt-8 flex flex-wrap gap-3"><a href="${WA(msg || 'Hi! I would like more information.')}" target="_blank" rel="noopener" class="btn btn-gold">${I.wa}<span>Ask on WhatsApp</span></a><a href="tel:+${CONTACT.wa}" class="btn btn-ghost">${I.phone}<span>Call ${CONTACT.phone}</span></a></div>` : ''}
  </div>
</section>`;
}

function gallery(imgs, r, label) {
  if (!imgs.length) return '';
  return `<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
  <div class="flex items-end justify-between gap-4"><h2 class="font-display text-3xl sm:text-4xl">Gallery</h2><p class="text-sm text-ink/50">${imgs.length} photos</p></div>
  <div class="gallery mt-8" data-gallery>
    ${imgs.map((src, i) => `<button type="button" class="gallery-item${i % 7 === 0 ? ' is-wide' : ''}" data-src="${r}${src}" aria-label="Open photo ${i + 1} of ${esc(label)}"><img src="${r}${src}" alt="${esc(label)} — photo ${i + 1}" loading="lazy" decoding="async"></button>`).join('')}
  </div>
</section>`;
}

function yachtCard(y, r) {
  const img = y.images[0];
  return `<a href="${r}yachts/${y.slug}.html" class="card group" data-tier="${y.tier}">
  <div class="card-media">${img ? `<img src="${r}${img}" alt="${esc(y.name)} yacht" loading="lazy" decoding="async">` : ''}<span class="chip absolute left-3 top-3">${y.ft} ft</span></div>
  <div class="flex items-end justify-between gap-4 p-5">
    <div><h3 class="font-display text-2xl">${esc(y.name)}</h3><p class="mt-1 text-sm text-ink/60">${esc(y.tagline)}</p></div>
    <span class="arrow-dot">${I.arrow}</span>
  </div>
</a>`;
}

function serviceCard(s, r, tall = false) {
  const v = V[s.slug];
  const img = imgsOf(s.src)[0];
  const media = v ? `<video class="absolute inset-0 h-full w-full object-cover" src="${r}${v}" poster="${r}${poster(v)}" muted loop playsinline preload="none" data-hover-play aria-hidden="true"></video>` : img ? `<img src="${r}${img}" alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover">` : '';
  return `<a href="${r}services/${s.slug}.html" class="svc group${tall ? ' svc-tall' : ''}">
  ${media}
  <div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>
  <div class="relative mt-auto p-6"><p class="eyebrow text-gold">${esc(s.eyebrow)}</p><h3 class="mt-2 font-display text-2xl text-white sm:text-3xl">${esc(s.title)}</h3></div>
</a>`;
}

function contactBlock(r, preset = '') {
  const opts = ['Yacht charter', ...SERVICES.map(s => s.title)];
  return `<section id="contact" class="bg-sand">
  <div class="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-5 lg:py-28">
    <div class="lg:col-span-2">
      <p class="eyebrow text-sea">Plan your trip</p>
      <h2 class="mt-3 font-display text-4xl leading-tight sm:text-5xl">Tell us what you need. <span class="italic text-sea">We handle the rest.</span></h2>
      <p class="mt-5 text-ink/70">Send the form and it opens WhatsApp with your request ready to send. If we don't answer right away, we are probably out with a client — leave a message and we will get back to you as soon as possible.</p>
      <ul class="mt-8 space-y-4">
        <li class="flex items-center gap-3">${I.phone}<a class="font-semibold hover:text-sea" href="tel:+${CONTACT.wa}">${CONTACT.phone}</a><span class="text-ink/50">· ${CONTACT.name}</span></li>
        <li class="flex items-center gap-3">${I.mail}<a class="font-semibold hover:text-sea break-all" href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li class="flex items-center gap-3">${I.clock}<span>${CONTACT.hours}</span></li>
      </ul>
    </div>
    <form class="form lg:col-span-3" data-wa-form data-wa="${CONTACT.wa}">
      <div class="grid gap-5 sm:grid-cols-2">
        <label class="field"><span>Name</span><input name="Name" required autocomplete="name"></label>
        <label class="field"><span>Service</span><select name="Service">${opts.map(o => `<option${o === preset ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select></label>
        <label class="field"><span>Date</span><input name="Date" type="date"></label>
        <label class="field"><span>Guests</span><input name="Guests" type="number" min="1" inputmode="numeric"></label>
        <label class="field sm:col-span-2"><span>Message</span><textarea name="Message" rows="4" placeholder="Tell us about your plans"></textarea></label>
      </div>
      <button class="btn btn-ink mt-6 w-full justify-center sm:w-auto" type="submit">${I.wa}<span>Send via WhatsApp</span></button>
    </form>
  </div>
</section>`;
}

// ---------- paginas ----------
const write = (file, html) => { fs.mkdirSync(path.dirname(path.join(OUT, file)), { recursive: true }); fs.writeFileSync(path.join(OUT, file), html); };

function home() {
  const r = '';
  const featured = YACHTS.slice(0, 6);
  // 14 tarjetas + 2 altas = 16 celdas = 4 filas completas en desktop
  const svcOrder = ['fishing', 'activities', 'transportation', 'wedding-planner', 'nightclubs', 'golf', 'restaurants', 'bachelor-parties', 'events', 'helicopter', 'real-estate', 'video-marketing', 'influencer', 'businesses'];
  const svcs = svcOrder.map(k => SERVICES.find(s => s.slug === k));
  const body = `
<section class="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-ink text-white">
  ${videoBg(V.hero, r)}
  <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20"></div>
  <div class="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:pb-24">
    <p class="eyebrow text-gold">Cabo San Lucas · Baja California Sur</p>
    <h1 class="mt-4 max-w-5xl font-display text-[clamp(3rem,9vw,7.5rem)] font-light leading-[0.95]">All of Cabo,<br><span class="italic text-gold">one message</span> away.</h1>
    <p class="mt-6 max-w-xl text-lg text-white/80">Luxury yacht charters, sport fishing, tours, private transportation, weddings and nightlife — arranged by a local concierge team.</p>
    <div class="mt-9 flex flex-wrap gap-3">
      <a href="fleet.html" class="btn btn-gold"><span>Explore the fleet</span>${I.arrow}</a>
      <a href="${WA('Hi! I would like to plan my trip to Cabo.')}" target="_blank" rel="noopener" class="btn btn-ghost">${I.wa}<span>WhatsApp us</span></a>
    </div>
  </div>
</section>

<section class="border-b border-ink/10 bg-cream">
  <dl class="mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4">
    <div class="stat"><dt>Yachts</dt><dd>${YACHTS.length}</dd></div>
    <div class="stat"><dt>From</dt><dd>${YACHTS[YACHTS.length - 1].ft}–${YACHTS[0].ft} ft</dd></div>
    <div class="stat"><dt>Services</dt><dd>${SERVICES.length + 1}</dd></div>
    <div class="stat"><dt>Open</dt><dd>7 days</dd></div>
  </dl>
</section>

<section class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
  <div class="flex flex-wrap items-end justify-between gap-6">
    <div><p class="eyebrow text-sea">The fleet</p><h2 class="mt-3 font-display text-4xl sm:text-5xl">Charter the Sea of Cortez</h2>
    <p class="mt-4 max-w-xl text-ink/70">From 130-ft super yachts to fast day boats. Every charter includes national open bar, food, snorkeling gear, water mat and sea scooters.</p></div>
    <a href="fleet.html" class="btn btn-outline">See all ${YACHTS.length} yachts ${I.arrow}</a>
  </div>
  <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${featured.map(y => yachtCard(y, r)).join('')}</div>
</section>

<section class="bg-ink py-20 text-white lg:py-28">
  <div class="mx-auto max-w-7xl px-4 sm:px-6">
    <p class="eyebrow text-gold">Experiences</p>
    <h2 class="mt-3 max-w-3xl font-display text-4xl sm:text-5xl">Everything else, <span class="italic text-gold">handled.</span></h2>
    <div class="mt-12 grid auto-rows-[300px] gap-4 sm:grid-cols-2 lg:grid-cols-4">${svcs.map((s, i) => serviceCard(s, r, i === 0 || i === 5)).join('')}</div>
    <div class="mt-10 text-center"><a href="services.html" class="btn btn-ghost">All experiences ${I.arrow}</a></div>
  </div>
</section>

<section class="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
  <div class="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">${videoBg(V['video-marketing'], r)}</div>
  <div>
    <p class="eyebrow text-sea">Video marketing</p>
    <h2 class="mt-3 font-display text-4xl sm:text-5xl">Your trip, filmed like a movie.</h2>
    <p class="mt-4 text-ink/70">Add our camera crew to any charter or event and take home a cinematic video of your vacation.</p>
    <dl class="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">${VIDEO_PERKS.map(([t, d], i) => `<div><dt class="flex items-baseline gap-3 font-semibold"><span class="font-display text-gold">0${i + 1}</span>${t}</dt><dd class="mt-1 text-sm text-ink/60">${d}</dd></div>`).join('')}</dl>
    <a href="services/video-marketing.html" class="btn btn-outline mt-10">Video services ${I.arrow}</a>
  </div>
</section>

<section class="bg-sea text-white">
  <figure class="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
    <blockquote class="font-display text-2xl font-light leading-snug sm:text-3xl">“My friends and I had such a fun experience on a yacht we rented! It was really cool to see it on video and we got to show all of my friends and family when I got home.”</blockquote>
    <figcaption class="mt-6 eyebrow text-gold">Lauren · Yacht charter + video</figcaption>
  </figure>
</section>
${contactBlock(r)}`;
  write('index.html', layout({ title: 'All In One Cabo · Yacht Charters & Concierge in Cabo San Lucas', desc: `Luxury yacht charters (${YACHTS.length} yachts), sport fishing, tours, transportation, weddings, nightlife and real estate in Cabo San Lucas.`, body }));
}

function fleet() {
  const r = '';
  const counts = { all: YACHTS.length, super: 0, luxury: 0, day: 0 };
  YACHTS.forEach(y => counts[y.tier]++);
  const tabs = [['all', 'All yachts'], ['super', 'Super yachts · 90 ft+'], ['luxury', 'Luxury · 50–89 ft'], ['day', 'Day boats · under 50 ft']];
  const body = `
${pageHero({ r, eyebrow: `${YACHTS.length} yachts · ${YACHTS[YACHTS.length - 1].ft} to ${YACHTS[0].ft} ft`, title: 'The <span class="italic text-gold">fleet</span>', lead: 'Private yacht charters in Cabo San Lucas. Every charter includes national open bar, food, snorkeling gear, water mat and sea scooters.', video: V.yachts, msg: 'Hi! I would like to charter a yacht in Cabo.' })}
<section class="mx-auto max-w-7xl px-4 py-14 sm:px-6">
  <div class="flex flex-wrap gap-2" role="group" aria-label="Filter by size" data-filter>
    ${tabs.map(([k, t], i) => `<button type="button" class="filter-btn" data-tier="${k}" aria-pressed="${i === 0}">${t} <span class="opacity-50">${counts[k]}</span></button>`).join('')}
  </div>
  <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-fleet>${YACHTS.map(y => yachtCard(y, r)).join('')}</div>
</section>
${contactBlock(r, 'Yacht charter')}`;
  write('fleet.html', layout({ title: `Yacht Charters in Cabo San Lucas · ${YACHTS.length} Yachts · All In One Cabo`, desc: `Browse ${YACHTS.length} private yachts from ${YACHTS[YACHTS.length - 1].ft} to ${YACHTS[0].ft} ft for charter in Cabo San Lucas.`, body, active: 'fleet' }));
}

function yachtPage(y, idx) {
  const r = '../';
  const msg = `Hi! I'm interested in chartering ${y.name} (${y.ft} ft). Is it available?`;
  const others = YACHTS.filter(o => o.tier === y.tier && o.slug !== y.slug).slice(0, 3);
  const body = `
${pageHero({ r, eyebrow: `${y.ft} ft · ${y.tagline}`, title: esc(y.name), lead: '', image: y.images[0], msg })}
<section class="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-3">
  <div class="lg:col-span-2">
    <div class="space-y-4 text-lg leading-relaxed text-ink/80">${y.desc.map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <h2 class="mt-12 font-display text-3xl">Included</h2>
    <ul class="mt-6 grid gap-3 sm:grid-cols-2">${y.includes.map(x => `<li class="flex items-center gap-3 rounded-xl border border-ink/10 bg-white px-4 py-3"><span class="text-sea">${I.check}</span>${esc(x)}</li>`).join('')}</ul>
  </div>
  <aside class="lg:sticky lg:top-28 lg:self-start">
    <div class="rounded-2xl bg-ink p-7 text-white">
      <p class="eyebrow text-gold">Book ${esc(y.name)}</p>
      <p class="mt-3 font-display text-4xl">${y.ft} ft</p>
      <p class="mt-3 text-sm text-white/70">Tell us your date and number of guests — we confirm availability and rates directly.</p>
      <a href="${WA(msg)}" target="_blank" rel="noopener" class="btn btn-gold mt-6 w-full justify-center">${I.wa}<span>Check availability</span></a>
      <a href="tel:+${CONTACT.wa}" class="btn btn-ghost mt-3 w-full justify-center">${I.phone}<span>${CONTACT.phone}</span></a>
    </div>
  </aside>
</section>
${gallery(y.images, r, y.name)}
${others.length ? `<section class="bg-sand"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6"><div class="flex items-end justify-between gap-4"><h2 class="font-display text-3xl sm:text-4xl">Similar yachts</h2><a class="btn btn-outline" href="../fleet.html">Full fleet ${I.arrow}</a></div><div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${others.map(o => yachtCard(o, r)).join('')}</div></div></section>` : ''}`;
  write(`yachts/${y.slug}.html`, layout({ title: `${y.name} ${y.ft} ft · Yacht Charter Cabo San Lucas · All In One Cabo`, desc: `${y.name}, ${y.ft}-ft ${y.tagline.toLowerCase()} for private charter in Cabo San Lucas. ${y.desc[0]}`, depth: 1, body, active: 'fleet' }));
}

function servicesIndex() {
  const r = '';
  const yachtSvc = { slug: '../fleet', title: 'Yacht Charters', eyebrow: `${YACHTS.length} yachts` };
  const body = `
${pageHero({ r, eyebrow: 'Our services', title: 'Explore what <span class="italic text-gold">we offer</span>', lead: 'One local team for everything you want to do in Cabo San Lucas.', video: V.jetski })}
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
  <div class="grid auto-rows-[320px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
    <a href="fleet.html" class="svc group"><video class="absolute inset-0 h-full w-full object-cover" src="${V.yachts}" poster="${poster(V.yachts)}" muted loop playsinline preload="none" data-hover-play aria-hidden="true"></video><div class="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div><div class="relative mt-auto p-6"><p class="eyebrow text-gold">${yachtSvc.eyebrow}</p><h3 class="mt-2 font-display text-3xl text-white">${yachtSvc.title}</h3></div></a>
    ${SERVICES.map(s => serviceCard(s, r)).join('')}
  </div>
</section>
${contactBlock(r)}`;
  write('services.html', layout({ title: 'Experiences & Services in Cabo San Lucas · All In One Cabo', desc: 'Yachts, fishing, tours, helicopter rides, transportation, weddings, restaurants, nightlife, golf, events and video production in Cabo San Lucas.', body, active: 'services' }));
}

function servicePage(s) {
  const r = '../';
  const imgs = imgsOf(s.src);
  const msg = `Hi! I would like information about ${s.title}.`;
  const v = V[s.slug];
  const pk = s.packages ? `<section class="bg-sand"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6"><h2 class="font-display text-3xl sm:text-4xl">Packages</h2><div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${s.packages.map(p => `<div class="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-ink/5"><p class="eyebrow text-sea">${esc(p.note)}</p><h3 class="mt-2 font-display text-2xl">${esc(p.name)}</h3>${p.price ? `<p class="mt-3 font-display text-4xl text-sea">${esc(p.price)}</p>` : ''}<ul class="mt-5 space-y-2 text-sm text-ink/70">${p.items.map(i => `<li class="flex gap-2"><span class="mt-0.5 text-sea">${I.check}</span>${esc(i)}</li>`).join('')}</ul><a href="${WA(`Hi! I'm interested in the ${s.title} package: ${p.name}.`)}" target="_blank" rel="noopener" class="btn btn-outline mt-auto w-full justify-center !mt-7">Book ${esc(p.name)}</a></div>`).join('')}</div></div></section>` : '';
  const feats = s.features ? `<ul class="mt-10 flex flex-wrap gap-2">${s.features.map(f => `<li class="chip-lg">${esc(f)}</li>`).join('')}</ul>` : '';
  const secs = s.sections ? `<section class="mx-auto max-w-7xl px-4 pb-6 sm:px-6"><div class="grid gap-6 md:grid-cols-2">${s.sections.map(([t, d], i) => `<article class="rounded-2xl border border-ink/10 bg-white p-8"><p class="font-display text-gold">0${i + 1}</p><h3 class="mt-2 font-display text-2xl">${esc(t)}</h3><p class="mt-3 text-ink/70">${esc(d)}</p><a href="${WA(`Hi! I would like to book: ${t}.`)}" target="_blank" rel="noopener" class="mt-5 inline-flex items-center gap-2 font-semibold text-sea">Book now ${I.arrow}</a></article>`).join('')}</div></section>` : '';
  const perks = s.perks ? `<section class="bg-ink text-white"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6"><h2 class="font-display text-3xl sm:text-4xl">What makes us different</h2><dl class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">${VIDEO_PERKS.map(([t, d], i) => `<div><dt class="font-display text-xl"><span class="text-gold">0${i + 1}</span> ${t}</dt><dd class="mt-2 text-white/60">${d}</dd></div>`).join('')}</dl></div></section>` : '';
  const testi = s.testimonial ? `<figure class="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6"><blockquote class="font-display text-2xl font-light leading-snug">“${esc(s.testimonial[0])}”</blockquote><figcaption class="mt-5 eyebrow text-sea">${esc(s.testimonial[1])}</figcaption></figure>` : '';
  const props = s.properties ? s.properties.map(p => {
    const pi = imgsOf(p.src);
    return `<section class="border-t border-ink/10"><div class="mx-auto max-w-7xl px-4 py-16 sm:px-6"><p class="eyebrow text-sea">${esc(p.kind)}</p><h2 class="mt-2 font-display text-4xl">${esc(p.name)}</h2><p class="mt-4 max-w-3xl text-ink/70">${esc(p.text)}</p><div class="mt-8 grid gap-6 md:grid-cols-3">${p.lists.map(([t, l]) => `<div class="rounded-2xl bg-white p-6 ring-1 ring-ink/5"><h3 class="font-semibold">${esc(t)}</h3><ul class="mt-3 space-y-2 text-sm text-ink/70">${l.map(x => `<li class="flex gap-2"><span class="mt-0.5 text-sea">${I.check}</span>${esc(x)}</li>`).join('')}</ul></div>`).join('')}</div><a href="${WA(`Hi! I'm interested in ${p.name}.`)}" target="_blank" rel="noopener" class="btn btn-ink mt-8">${I.wa}<span>Get a quote</span></a></div>${gallery(pi, r, p.name)}</section>`;
  }).join('') : '';
  const extra = s.extraContact ? `<p class="mt-6 text-sm text-ink/60">Nightlife reservations also with ${esc(s.extraContact[0])} · <a class="font-semibold text-sea" href="tel:${s.extraContact[1].replace(/\s/g, '')}">${esc(s.extraContact[1])}</a></p>` : '';
  const body = `
${pageHero({ r, eyebrow: s.eyebrow, title: esc(s.title), lead: s.lead, video: v, image: imgs[0], msg })}
<section class="mx-auto max-w-7xl px-4 py-16 sm:px-6">
  <div class="max-w-3xl space-y-4 text-lg leading-relaxed text-ink/80">${s.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
  ${feats}${extra}
</section>
${secs}${perks}${testi}${pk}${props}
${s.properties ? '' : gallery(imgs, r, s.title)}
${contactBlock(r, s.title)}`;
  write(`services/${s.slug}.html`, layout({ title: `${s.title} in Cabo San Lucas · All In One Cabo`, desc: `${s.lead} ${s.body[0]}`.slice(0, 158), depth: 1, body, active: s.slug === 'real-estate' || s.slug === 'video-marketing' ? s.slug : 'services' }));
}

function contactPage() {
  const body = `${pageHero({ r: '', eyebrow: CONTACT.hours, title: 'Let’s plan <span class="italic text-gold">your Cabo</span>', lead: 'Message us on WhatsApp, call or email — we answer 7 days a week.', video: V.events })}${contactBlock('')}`;
  write('contact.html', layout({ title: 'Contact · All In One Cabo', desc: `Contact All In One Cabo: ${CONTACT.phone} · ${CONTACT.email}. Open ${CONTACT.hours}.`, body, active: 'contact' }));
}

function partnersPage() {
  const body = `${pageHero({ r: '', eyebrow: 'Partners', title: 'Join <span class="italic text-gold">the team</span>', lead: 'Own a yacht or a transportation service in Cabo? Register and become part of our community.', video: V.yachts, cta: false })}
<section class="mx-auto max-w-3xl px-4 py-16 sm:px-6">
  <form class="form" data-wa-form data-wa="${CONTACT.wa}" data-wa-title="Partner registration">
    <div class="grid gap-5 sm:grid-cols-2">
      <label class="field"><span>Name</span><input name="Name" required autocomplete="name"></label>
      <label class="field"><span>Phone</span><input name="Phone" type="tel" autocomplete="tel"></label>
      <label class="field"><span>I offer</span><select name="Offer"><option>Yacht</option><option>Transport</option><option>Other</option></select></label>
      <label class="field"><span>Boat / vehicle &amp; size</span><input name="Boat"></label>
      <label class="field sm:col-span-2"><span>Notes</span><textarea name="Notes" rows="4"></textarea></label>
    </div>
    <button class="btn btn-ink mt-6" type="submit">${I.wa}<span>Register via WhatsApp</span></button>
  </form>
</section>`;
  write('partners.html', layout({ title: 'Partners · Join the team · All In One Cabo', desc: 'Yacht owners and transportation providers in Cabo San Lucas: join the All In One Cabo partner network.', body }));
}

function notFound() {
  write('404.html', layout({ title: 'Page not found · All In One Cabo', desc: 'Page not found.', body: pageHero({ r: '', eyebrow: '404', title: 'Lost <span class="italic text-gold">at sea</span>', lead: 'This page does not exist. Head back to shore.', video: V.hero, cta: false }) + '<div class="py-12 text-center"><a href="index.html" class="btn btn-ink">Back home</a></div>' }));
}

home(); fleet(); YACHTS.forEach(yachtPage); servicesIndex(); SERVICES.forEach(servicePage); contactPage(); partnersPage(); notFound();
console.log(`OK · ${YACHTS.length} yates · ${SERVICES.length} servicios · ${YACHTS.length + SERVICES.length + 6} paginas`);
