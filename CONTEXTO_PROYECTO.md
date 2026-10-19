# CONTEXTO Y ESTADO — All In One Cabo (handoff entre sesiones)
Actualizado: 2026-10-18.

## Resumen
Rehacer el sitio de All In One Cabo (Wix → estático moderno HTML+Tailwind). Reutilizar contenido/medios del sitio viejo (con consentimiento del dueño; él ya no tiene acceso a su Wix).

## Datos del negocio (verificados del sitio en vivo)
- Marca: ALL IN ONE CABO · idioma: inglés · Cabo San Lucas, BCS, México.
- Contacto: **Christian / Cristian G.** · Tel/WhatsApp **+52 624 137 8636** · Email **allinonecabo@hotmail.com**
- Redes: YouTube (UCuaTBNTS0HM_6hDBwZix_Fg) · TikTok (ZMLxmRR2x) · Facebook /allinonecabo · Instagram @allinonecabo
- Logo: static.wixstatic.com/media/20a7e4_4713cbef6fde4c78a211beaedab34ad0~mv2.png

## Servicios (menú del sitio nuevo)
Yates/Charters · Fishing · Video Marketing · Influencer · Activities · Transportation · Helicopter · Real Estate · Wedding Planner · Restaurants · Night Clubs · Events · Private parties (despedidas) · Golf · Businesses/Socios.

## Scope real: 74 páginas
La mayoría son **fichas individuales de yates** (~50 barcos, cada uno su página `copia-de-<nombre>`). La **flota es el corazón del sitio**. Flota conocida (nombre · pies): Northen Dreams 130, Maranatha, Neoprene 108, St Vincent 100, Number Juan 100, Lady Katana 100, Blue Moon 72, Kailani 72, Love Shak 72, Lagoon 68, Egoista 65, Happy Ending 65, Olivia Grace 60, Baby Bolaz 60, Carina 60, Pasha 55, Chica, Mi Yoba, Cheers, Andiamo, Babaloo, Phantom, Ziggy, Morrita, Due Amici, Dolce Vita, Bad Romance, Breaking Rules, Stellar Flame, Oasis, Be Rich, In Debt, My Dream, The Secreat, Seaquel, Craggy, Argo, Summer Time, Cabo Vegas II, Maximus 38, Carver 38, Azimut 38, Azimut Bonna, Surface Driving, Sea Brothers, Delivery Boy, Medex, Duara… (c/u: cruising boat, ~6 cabinas, cap. 10-20, bebidas, chef privado).

## Archivos clave
- `urls.txt` — las 74 URLs.
- `scraper.js` — scraper Playwright headless (renderiza Wix). Correr: `node scraper.js`.
- `_captura/catalogo_site.json` — contenido+medios de las 74 páginas (lo genera el scraper).
- `_captura/media_urls.txt` — todas las URLs de imágenes/videos.
- `_captura/INVENTARIO.md` — resumen a mano de las primeras páginas.
- `_captura/home.json` — captura detallada de la Home (12 videos de fondo por servicio).
- `site/` — aquí va el sitio nuevo (aún vacío).

## ESTADO (18-oct-2026, noche)
- [x] Diagnóstico (es Wix, JS-render → HTTrack no sirve bien; se usa scraper headless).
- [x] Enumeradas las 74 páginas vía sitemap.
- [x] Scraper: 74/74 OK (fix: Wix nunca llega a `networkidle` → `domcontentloaded` + espera fija).
- [x] Medios del dueño (`20a7e4_*`) descargados: 614 imgs (1600px) en `site/media/img`; 31 videos como loops de 20s/720p sin audio en `site/media/vid` (originales en `D:\allin1cabo_media\raw`). Total sitio ≈178 MB. Los `11062b_*` son stock de Wix → NO se usan.
- [x] Sitio construido: `npm run build` (build.js + src/ → site/). 68 páginas: Home, Flota (48 yates con filtro por tamaño), 48 fichas, 14 servicios, Servicios, Contacto, Partners, 404.
- [x] Formularios → abren WhatsApp con el mensaje prellenado (sin backend).
- [ ] Repo en GitHub (`5410m0n0c001/allin1cabo`) + GitHub Pages.

## Cómo se construye
- `npm run scrape` → `_captura/catalogo_site.json` · `npm run media` → descarga/comprime medios + `_captura/media_map.json` · `npm run build` → genera HTML + Tailwind compilado (`site/assets/styles.css`).
- Textos de servicios: `src/content.js` (del sitio original, corregidos/traducidos al inglés, sin inventar precios). Flota: `src/yachts.js` (parsea fichas).
- Paleta: ink #0a1824 · sea #0f5c6e · sand #efe6d8 · gold #d4a95a. Fuentes: Fraunces (display) + Manrope.

## PENDIENTES QUE SOLO DECIDE SALO / EL DUEÑO
- **43 de 49 fichas de yates en Wix tenían el MISMO texto plantilla** ("big dance floor, two levels, 3 bedrooms, 2 bathrooms"), incluso lanchas de 28 ft. No se publicó como dato: esas fichas muestran descripción neutra + solo lo que incluyen todas (open bar, comida, snorkel, water mat, sea scooters). **Pedir a Christian specs reales** (capacidad, recámaras, precio) por barco.
- Andiamo 45 estaba duplicado → se dejó uno. Nombres con ortografía del dueño ("Northen Dreams", "The Secreat"): confirmar si se corrigen.
- Dominio allin1cabo.com: apuntarlo a Pages cuando el dueño lo autorice.
