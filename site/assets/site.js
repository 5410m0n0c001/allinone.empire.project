/* All In One Cabo · comportamiento propio de la pagina.
   El motor (scrollcraft.js) publica --sc-p en cada acto; aqui se leen esos valores
   para lo que el kit no hace: el emblema viajero, la flota sobre el mar, el carrusel
   3D, las salas y los formularios a WhatsApp. */
(function () {
  'use strict';
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeInOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  var progress = function (el) { return parseFloat(el.style.getPropertyValue('--sc-p')) || 0; };

  // Sin movimiento: la flota y las salas se vuelven listas estaticas ANTES de montar el motor.
  if (reduce) $$('[data-sea], [data-rooms]').forEach(function (s) { s.removeAttribute('data-sc-act'); s.classList.add('is-static'); });
  if (window.ScrollCraft) ScrollCraft.mount(document.body);
  // Telefono: el mar en vertical (recorte 9:16), no el horizontal encogido.
  if (innerWidth < 861) $$('video[data-mobile]').forEach(function (v) { v.poster = v.getAttribute('data-mobile-poster'); v.src = v.getAttribute('data-mobile'); });

  /* ------------------------------------------------------------ chrome -- */
  var bar = $('.bar');
  var waFloat = $('.wa-float'), hasHero = !!$('.hero');
  var onScroll = function () {
    bar.classList.toggle('is-solid', scrollY > 24);
    // En la Home el hero ya trae su boton de WhatsApp: el flotante aparece despues.
    if (waFloat && hasHero) waFloat.classList.toggle('is-away', scrollY < innerHeight * 0.6);
  };
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  var drawer = $('#drawer'), openBtn = $('[data-drawer-open]');
  var setDrawer = function (open) {
    drawer.hidden = !open; openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('a', drawer).focus(); else openBtn.focus();
  };
  openBtn.addEventListener('click', function () { setDrawer(true); });
  $('[data-drawer-close]').addEventListener('click', function () { setDrawer(false); });
  $$('a', drawer).forEach(function (a) { a.addEventListener('click', function () { drawer.hidden = true; document.body.style.overflow = ''; }); });

  // Indice: marca la sala donde esta el visitante.
  var navLinks = $$('.index a[data-nav]');
  if (navLinks.length && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var k = e.target.getAttribute('data-section');
        navLinks.forEach(function (a) { a.setAttribute('aria-current', String(a.getAttribute('data-nav') === k)); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('[data-section]').forEach(function (s) { io.observe(s); });
  }

  /* ---------------------------------------------- the travelling emblem --
     Un solo emblema 3D (capas apiladas en Z) que vuela de un [data-dock] al
     siguiente, gira mientras viaja y se asienta de frente al acoplarse.       */
  var docks = $$('.dock');
  var emblem = null;
  if (!reduce && docks.length) {
    document.documentElement.classList.add('has-emblem');
    emblem = document.createElement('div');
    emblem.className = 'emblem'; emblem.setAttribute('aria-hidden', 'true');
    var body = document.createElement('div'); body.className = 'emblem__body';
    var src = document.documentElement.getAttribute('data-root') + 'media/mark.webp';
    for (var i = 0; i < 9; i++) {
      var im = new Image(); im.src = src; im.alt = ''; im.decoding = 'async';
      im.style.transform = 'translateZ(' + ((i - 8) * 1.5) + 'px)';
      if (i === 8) im.className = 'is-face';
      body.appendChild(im);
    }
    var sh = document.createElement('div'); sh.className = 'emblem__shadow';
    emblem.appendChild(sh); emblem.appendChild(body);
    document.body.appendChild(emblem);
  }
  var E = { x: 24, y: innerHeight * 0.4, w: 80, rot: -25, tilt: 0, t: 0 };
  function emblemTick(now) {
    if (!emblem) return;
    var line = innerHeight * 0.42, best = null, bd = 1e9;
    for (var i = 0; i < docks.length; i++) {
      var r = docks[i].getBoundingClientRect();
      if (r.width === 0 || r.bottom < 0 || r.top > innerHeight) continue;
      var d = Math.abs(r.top + r.height / 2 - line);
      if (d < bd) { bd = d; best = r; }
    }
    // Sin dock a la vista: el emblema espera en la esquina, pequeño, girando despacio.
    var tx = best ? best.left : 18, ty = best ? best.top : innerHeight - 92, tw = best ? best.width : 56;
    var dx = tx - E.x, dy = ty - E.y;
    E.x += dx * 0.12; E.y += dy * 0.12; E.w += (tw - E.w) * 0.12;
    var travel = Math.min(1, Math.hypot(dx, dy) / 260);
    if (best && travel < 0.02) {
      // Acoplado: asentarse de frente (multiplo de 360) con un balanceo minimo.
      var target = Math.round(E.rot / 360) * 360 + Math.sin(now / 1400) * 14;
      E.rot += (target - E.rot) * 0.06;
    } else {
      E.rot += 2 + travel * 16;
    }
    E.tilt += ((best ? -dy : 0) * 0.04 - E.tilt) * 0.1;
    emblem.style.transform = 'translate3d(' + E.x.toFixed(1) + 'px,' + E.y.toFixed(1) + 'px,0)';
    emblem.style.width = E.w.toFixed(1) + 'px';
    emblem.style.height = (E.w * 334 / 320).toFixed(1) + 'px';
    emblem.firstChild.nextSibling.style.transform = 'rotateX(' + clamp(E.tilt, -25, 25).toFixed(1) + 'deg) rotateY(' + E.rot.toFixed(1) + 'deg)';
  }

  /* -------------------------------------------- hero: planos con profundidad -- */
  var prints = $$('[data-depth]');
  var M = { x: 0, y: 0, tx: 0, ty: 0 };
  if (fine && !reduce) addEventListener('pointermove', function (e) { M.tx = e.clientX / innerWidth - 0.5; M.ty = e.clientY / innerHeight - 0.5; }, { passive: true });
  function heroTick() {
    if (!prints.length || reduce) return;
    M.x += (M.tx - M.x) * 0.08; M.y += (M.ty - M.y) * 0.08;
    var s = Math.min(scrollY, innerHeight * 1.2);
    prints.forEach(function (p) {
      var d = parseFloat(p.getAttribute('data-depth'));
      var ry = parseFloat(p.getAttribute('data-ry') || 0);
      p.style.transform = 'translate3d(' + (M.x * -60 * d).toFixed(1) + 'px,' + (-s * 0.35 * d + M.y * -40 * d).toFixed(1) + 'px,' + (d * 120).toFixed(0) + 'px) rotateY(' + (ry + M.x * 14).toFixed(2) + 'deg) rotateX(' + (M.y * -10 + s * 0.012).toFixed(2) + 'deg)';
    });
    var far = $('.hero__far');
    if (far) far.style.transform = 'scale(' + (1.06 - Math.min(s / innerHeight, 1) * 0.06).toFixed(4) + ') translate3d(' + (M.x * 14).toFixed(1) + 'px,' + (s * 0.12).toFixed(1) + 'px,0)';
  }

  /* --------------------------------------- the fleet over the sea (pico) --
     Cada yate aparece pequeño y acostado sobre el agua junto al horizonte,
     navega hacia el visitante, se endereza y se detiene con su ficha del otro
     lado; luego pasa por debajo de la camara y llega el siguiente.          */
  var seas = $$('[data-sea]').map(function (s) {
    return { el: s, boats: $$('.boat', s), plates: $$('.plate', s), rail: $$('.sea__rail button', s), video: $('.sea__bed video', s), cur: -1 };
  });
  var INTRO = 0.05;
  function seaTick(now) {
    seas.forEach(function (S) {
      if (S.el.classList.contains('is-static')) return;
      var p = progress(S.el), n = S.boats.length, w = (1 - INTRO) / n, mobile = innerWidth < 861;
      var active = -1;
      S.boats.forEach(function (b, i) {
        // Ventanas solapadas (1.45x el paso): el siguiente ya navega hacia ti mientras el actual se va.
        var t = (p - INTRO - (i - 0.3) * w) / (w * 1.45);
        if (t < -0.05 || t > 1.05) { b.style.opacity = '0'; b.style.visibility = 'hidden'; return; }
        b.style.visibility = 'visible';
        var z, y, rx, ry, op, side = b.getAttribute('data-side') === 'l' ? 1 : -1;
        if (t < 0.4) {
          var e = easeOut(clamp(t / 0.4, 0, 1));
          z = -1800 * (1 - e); y = -22 * (1 - e); rx = 64 * (1 - e) + 4; ry = side * 18 * (1 - e); op = clamp(t / 0.14, 0, 1);
        } else if (t < 0.74) {
          z = 0; y = 0; rx = 4 + Math.sin(now / 900 + i) * 1.6; ry = side * Math.sin(now / 1300 + i) * 2; op = 1;
        } else {
          var e2 = easeInOut(clamp((t - 0.74) / 0.26, 0, 1));
          z = 300 * e2; y = 30 * e2; rx = 4 - 14 * e2; ry = -side * 8 * e2; op = (1 - e2) * (1 - e2);
        }
        if (mobile) { z *= 0.7; }
        b.style.opacity = op.toFixed(3);
        b.style.transform = 'translate3d(0,calc(-50% + ' + y.toFixed(2) + 'vh),' + z.toFixed(1) + 'px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
        if (t >= 0.32 && t <= 0.8) active = i;
      });
      if (active !== S.cur) {
        S.cur = active;
        S.plates.forEach(function (pl, i) { pl.classList.toggle('is-on', i === active); pl.setAttribute('aria-hidden', String(i !== active)); pl.inert = i !== active; });
      }
      var railOn = clamp(Math.floor((p - INTRO) / w), 0, n - 1);
      S.rail.forEach(function (r, i) { r.setAttribute('aria-current', String(i === railOn)); });
    });
  }
  seas.forEach(function (S) {
    S.rail.forEach(function (r, i) {
      r.addEventListener('click', function () {
        var n = S.boats.length, w = (1 - INTRO) / n;
        var top = S.el.getBoundingClientRect().top + scrollY;
        var travel = S.el.offsetHeight - innerHeight;
        scrollTo({ top: top + (INTRO + (i + 0.55) * w) * travel, behavior: reduce ? 'auto' : 'smooth' });
      });
    });
  });

  /* ------------------------------------------------------ salas (rooms) -- */
  var rooms = $$('[data-rooms]').map(function (s) { return { el: s, rooms: $$('.room', s), cur: -1 }; });
  function roomsTick() {
    rooms.forEach(function (R) {
      if (R.el.classList.contains('is-static')) return;
      var p = progress(R.el), n = R.rooms.length, active = 0;
      R.rooms.forEach(function (r, i) {
        if (i === 0) return;
        var start = (i - 0.35) / n, e = easeInOut(clamp((p - start) / (0.55 / n), 0, 1));
        if (e > 0.5) active = i;
        var cut = ((1 - e) * 100).toFixed(2) + '%';
        r.style.clipPath = i % 2 ? 'inset(' + cut + ' 0 0 0)' : 'inset(0 0 0 ' + cut + ')';
        r.style.visibility = e > 0 ? 'visible' : 'hidden';
      });
      if (active !== R.cur) {
        R.cur = active;
        R.rooms.forEach(function (r, i) {
          var v = $('video', r);
          r.inert = i !== active;
          if (!v) return;
          if (i === active || i === active + 1) { v.preload = 'auto'; v.play().catch(function () {}); } else v.pause();
        });
      }
    });
  }

  /* ---------------------------------------------------- loop principal -- */
  function frame(now) { emblemTick(now); heroTick(); seaTick(now); roomsTick(); requestAnimationFrame(frame); }
  requestAnimationFrame(frame);

  // Videos de fondo: solo corren mientras estan en pantalla.
  if ('IntersectionObserver' in window) {
    var vio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && !reduce && !v.closest('.room')) v.play().catch(function () {});
        else if (!e.isIntersecting) v.pause();
      });
    }, { threshold: 0.05 });
    $$('video[data-ambient]').forEach(function (v) { vio.observe(v); });
  }
  if (reduce) $$('video').forEach(function (v) { v.removeAttribute('autoplay'); v.pause(); });

  /* -------------------------------------------- carrusel 3D de la flota -- */
  $$('[data-carousel]').forEach(function (C) {
    var track = $('.carousel__track', C), coins = $$('.coin', C);
    var shape = function () {
      var r = track.getBoundingClientRect(), mid = r.left + r.width / 2;
      coins.forEach(function (c) {
        if (c.hidden) return;
        var b = c.getBoundingClientRect(), d = (b.left + b.width / 2 - mid) / b.width;
        if (reduce) return;
        var a = clamp(d, -3, 3);
        c.style.transform = 'rotateY(' + (-a * 34).toFixed(2) + 'deg) translateZ(' + (-Math.abs(a) * 110).toFixed(1) + 'px) scale(' + (1 - Math.min(Math.abs(a), 2) * 0.06).toFixed(3) + ')';
        c.style.opacity = (1 - Math.min(Math.abs(a), 3) * 0.16).toFixed(3);
      });
    };
    track.addEventListener('scroll', function () { requestAnimationFrame(shape); }, { passive: true });
    addEventListener('resize', shape);
    shape();
    var step = function (dir) { track.scrollBy({ left: dir * (coins[0].offsetWidth), behavior: reduce ? 'auto' : 'smooth' }); };
    $$('[data-step]', C).forEach(function (b) { b.addEventListener('click', function () { step(+b.getAttribute('data-step')); }); });
    $$('.chip', C).forEach(function (ch) {
      ch.addEventListener('click', function () {
        $$('.chip', C).forEach(function (x) { x.setAttribute('aria-pressed', String(x === ch)); });
        var t = ch.getAttribute('data-tier');
        coins.forEach(function (c) { c.hidden = t !== 'all' && c.getAttribute('data-tier') !== t; });
        track.scrollLeft = 0; shape();
      });
    });
  });

  /* ------------------------------------ seleccion de yate -> formulario --
     Lo que el visitante escoge viaja hasta la solicitud final (y entre paginas). */
  var KEY = 'aio-yacht';
  var store = { get: function () { try { return JSON.parse(localStorage.getItem(KEY)); } catch (e) { return null; } },
                set: function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} } };
  function paintPick() {
    var v = store.get();
    $$('[data-pick]').forEach(function (box) {
      if (!v) { box.hidden = true; return; }
      box.hidden = false;
      $('img', box).src = document.documentElement.getAttribute('data-root') + v.cover;
      $('[data-pick-name]', box).textContent = v.name + ' · ' + v.ft + ' ft';
    });
    $$('form[data-wa-form] [name="Yacht"]').forEach(function (inp) { inp.value = v ? v.name + ' (' + v.ft + ' ft)' : ''; });
  }
  $$('[data-choose]').forEach(function (b) {
    b.addEventListener('click', function () {
      store.set(JSON.parse(b.getAttribute('data-choose')));
      paintPick();
      var target = $('#inquire');
      if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      else location.href = document.documentElement.getAttribute('data-root') + 'contact.html#inquire';
    });
  });
  $$('[data-pick-clear]').forEach(function (b) { b.addEventListener('click', function () { try { localStorage.removeItem(KEY); } catch (e) {} paintPick(); }); });
  paintPick();

  $$('form[data-wa-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var lines = [f.getAttribute('data-wa-title') || 'Hi! New request from the All In One Cabo website'];
      new FormData(f).forEach(function (v, k) { if (String(v).trim()) lines.push(k + ': ' + v); });
      window.open('https://wa.me/' + f.getAttribute('data-wa') + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  });

  /* ------------------------------------------------------------ lightbox -- */
  var lb = $('.lightbox');
  if (lb) {
    var lbImg = $('img', lb), list = [], idx = 0, last = null;
    var show = function (i) { idx = (i + list.length) % list.length; lbImg.src = list[idx]; };
    var close = function () { lb.hidden = true; document.body.style.overflow = ''; if (last) last.focus(); };
    $$('.mosaic').forEach(function (g) {
      g.addEventListener('click', function (e) {
        var b = e.target.closest('[data-full]'); if (!b) return;
        last = b; list = $$('[data-full]', g).map(function (x) { return x.getAttribute('data-full'); });
        show(list.indexOf(b.getAttribute('data-full'))); lb.hidden = false; document.body.style.overflow = 'hidden'; $('.lb-close', lb).focus();
      });
    });
    $('.lb-close', lb).addEventListener('click', close);
    $('.lb-prev', lb).addEventListener('click', function () { show(idx - 1); });
    $('.lb-next', lb).addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !drawer.hidden) setDrawer(false);
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }
})();
