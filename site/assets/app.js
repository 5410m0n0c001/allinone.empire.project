// Interacciones del sitio: header, menu movil, filtro de flota, galeria, formularios -> WhatsApp, videos.
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header solido al hacer scroll
  const header = $('.site-header');
  const onScroll = () => header.classList.toggle('is-solid', scrollY > 40);
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  // Menu movil
  const menu = $('#mobile-menu');
  const openBtn = $('[data-menu-open]');
  const setMenu = open => { menu.hidden = !open; openBtn.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; };
  openBtn.addEventListener('click', () => setMenu(true));
  $('[data-menu-close]').addEventListener('click', () => setMenu(false));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));

  // Videos de fondo: pausar si el usuario prefiere menos movimiento
  if (reduce) $$('video[autoplay]').forEach(v => { v.removeAttribute('autoplay'); v.pause(); });

  // Videos de tarjetas: reproducir al hover/visible
  $$('[data-hover-play]').forEach(v => {
    const card = v.closest('a');
    const play = () => { if (!reduce) { v.preload = 'auto'; v.play().catch(() => {}); } };
    const stop = () => v.pause();
    card.addEventListener('mouseenter', play);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focus', play);
    card.addEventListener('blur', stop);
  });
  // En touch (sin hover) reproducir cuando la tarjeta esta en pantalla
  if (!matchMedia('(hover: hover)').matches && !reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => (e.isIntersecting ? e.target.play().catch(() => {}) : e.target.pause())), { threshold: 0.6 });
    $$('[data-hover-play]').forEach(v => io.observe(v));
  }

  // Filtro de flota
  const filter = $('[data-filter]');
  if (filter) {
    filter.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', filter).forEach(x => x.setAttribute('aria-pressed', x === b));
      const t = b.dataset.tier;
      $$('[data-fleet] .card').forEach(c => { c.hidden = t !== 'all' && c.dataset.tier !== t; });
    });
  }

  // Lightbox
  const lb = $('[data-lightbox]');
  const lbImg = $('[data-lb-img]', lb);
  let list = [], idx = 0, last = null;
  const show = i => { idx = (i + list.length) % list.length; lbImg.src = list[idx]; };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; last && last.focus(); };
  $$('[data-gallery]').forEach(g => g.addEventListener('click', e => {
    const b = e.target.closest('[data-src]');
    if (!b) return;
    last = b;
    list = $$('[data-src]', g).map(x => x.dataset.src);
    show(list.indexOf(b.dataset.src));
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('[data-lb-close]', lb).focus();
  }));
  $('[data-lb-close]', lb).addEventListener('click', close);
  $('[data-lb-prev]', lb).addEventListener('click', () => show(idx - 1));
  $('[data-lb-next]', lb).addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false);
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });

  // Formularios -> mensaje de WhatsApp prellenado (sin backend)
  $$('[data-wa-form]').forEach(f => f.addEventListener('submit', e => {
    e.preventDefault();
    const lines = [f.dataset.waTitle || 'New request from allin1cabo website'];
    new FormData(f).forEach((v, k) => { if (String(v).trim()) lines.push(`${k}: ${v}`); });
    window.open(`https://wa.me/${f.dataset.wa}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  }));
})();
