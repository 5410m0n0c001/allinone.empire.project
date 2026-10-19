# Proyecto: All In One Cabo — nuevo sitio web

Este repo es la **reconstrucción moderna del sitio de All In One Cabo** (concierge turístico en Cabo San Lucas), cliente de **Salo / INIT IDEA**. Se origina de una sesión de Claude Code en `alexros-brain`; **todo el contexto vive aquí** (este archivo + `CONTEXTO_PROYECTO.md` + `_captura/`). Si abres una sesión nueva en esta carpeta, **lee primero esos tres** para tener el contexto completo.

## Qué es / por qué
- El sitio actual (`https://www.allin1cabo.com`) está hecho en **Wix**. El dueño **nos dio consentimiento** para rehacerlo; **ya no tiene acceso** a su Wix. Rehacemos desde cero **reutilizando sus textos, imágenes y videos** (son de él) con un **look moderno**.
- No hay casi backend (pocos formularios); eso se integra después.

## Stack / entrega
- **Sitio estático moderno: HTML + Tailwind** (rápido, barato, fácil de hospedar).
- Hosting: **GitHub Pages** o Vercel. Salo revisa por Pages (push inmediato).
- Salidas de medios pesados: ojo con disco **C: va justo** → medios grandes a **D:** si pesan mucho.

## Cómo trabaja Salo
- Español. Delegativo ("decide tú y ve dando solución"). Avisar solo decisiones que solo él puede tomar.
- **Delegar trabajo pesado** (scraping, descargas, lotes) a scripts/Antigravity para no quemar tokens de Claude; reservar Claude para diseño/decisiones.
- Ser **honesto** (no inventar), verificar antes de afirmar.

## Estado y siguientes pasos
Ver `CONTEXTO_PROYECTO.md` (se actualiza cada sesión con lo hecho y lo que sigue).
