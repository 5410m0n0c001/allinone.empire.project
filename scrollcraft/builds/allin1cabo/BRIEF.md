# BRIEF · All In One Cabo (rediseño 3D)

**Self-authored under explicit creative delegation.** Salo (CLAUDE.md: "decide tú y ve dando solución") y en su mensaje: "que me ayudes a crear un diseño nuevo impactante con animaciones, efectos". Las respuestas citadas son suyas; lo demás es decisión mía marcada como tal.

## Las ocho preguntas

1. **Vibe (3–5 palabras).** Salo: "muy moderno", "animaciones en 3D", "efectos visuales", "efectos de scrolling", "impactante". Referencias (decisión mía): el plano cenital de un yate cruzando el Arco; un álbum de fotos que se abre en el espacio; el tablero de salidas de una marina.
2. **Recorrido.** Salo: "según en el catálogo de yates las fotos se movieran en 3D y dependiendo el yate aparecía la foto o las fotos de cada yate, los videos". Enfoque: "turismo, renta de yates, charters, pesca deportiva, actividades turísticas, marketing digital". Orden (decisión mía): llegar a Cabo → subir a un yate → escoger entre 48 → el resto de Cabo (mar, tierra, aire, noche, celebraciones, estancia) → prueba → pedir por WhatsApp.
3. **Energía.** Calma al llegar, máxima al abordar, rápida en las experiencias, íntima en la prueba, quieta al final.
4. **Sentir + momento único.** Ver curva abajo. Momento: abordar un yate con el scroll.
5. **Lo que ningún sitio hace.** Salo lo dio: las fotos de CADA yate en 3D, y que cambien según el yate elegido.
6. **Rango estético.** "Muy moderno" → no premium-minimal de catálogo; nocturno-marino con un acento atardecer, tipografía expandida tipo rotulado de casco.
7. **¿Un mundo continuo o escenas?** Escenas (decisión mía): Cabo no es un recorrido geográfico único; son salas de una colección.
8. **Assets.** Todo real del dueño: 614 fotos, 31 clips (Arco, yate en marina, pesca, buggy, Cadillac, villa, boda, Taboo, noche, fiesta, golf, helicóptero, cámara). Sin generación (no hay API key y no hace falta).

## Gramática: Gallery / catalog
La pregunta real del visitante es "¿qué opciones hay?" (48 yates + 14 servicios). Etiquetas con hechos, no con persuasión: `Northen Dreams. 130 ft. 6 bedrooms. Tender, wave runner, open bar.` Además resuelve el problema de honestidad: 43 fichas no tienen specs propias, y un esquema de etiqueta fijo muestra solo lo que sí sabemos.
- Nav = índice de salas que salta (Aboard · Fleet · Sea · Land · Sky · Night · Celebrate · Stay · Inquire).
- Hero = objeto uno (el buque insignia) ya etiquetado, sin título aparte de marketing.
- Cierre = placa de solicitud tipografiada como etiqueta, con el yate elegido ya escrito.
- Prohibido aquí: titulares kinéticos, spotlight, magnet, más de un scrub, persuasión en etiquetas.

Por qué perdieron las otras: filmic (no es un argumento lineal; hay que escoger), chaptered (no es texto largo), live surface (no es software), continuous world (no es una sola geografía), poster (el activo son fotos/video, no una frase), split (no hay dos lados), cutlist (no es marca de energía juvenil; el yate pide pausa).

## Curva de sentimiento
1. **Llegada / asombro tranquilo**: el Arco en video al fondo y las fotos del yate insignia flotando en 3D frente a ti; se mueven con el puntero.
2. **Silencio**: todo se apaga a azul noche, una línea: "Step aboard." (silencio autorizado, ~0.5 vh).
3. **Asombro / estar a bordo (PICO)**: el scroll te mete dentro del yate: sus fotos pasan a los lados en un pasillo 3D, de la proa al camarote, y al final está el video.
4. **Control / antojo**: los 48 yates giran en un carrusel 3D; tocas uno y ése es el que abordas.
5. **Pulso**: salas a pantalla completa que se barren una sobre otra: marlin, desierto, helicóptero, noche, boda, villa. Clips reales.
6. **Confianza / intimidad**: la cámara de la tripulación, lo que incluye, y la frase de Lauren.
7. **Resolución**: la placa con tu yate elegido y fecha; un botón: WhatsApp.

## El pico
> "Bajé con el scroll y era como caminar dentro del yate, las fotos me pasaban a los lados; luego escogí otro y me metí a ése."
Vive en el acto 3, con la mayor duración de scroll de la página.

## Tell-someone
"It's the site where you scroll your way aboard a yacht, photo by photo, and then pick any of 48 boats to board next."

## Movimiento firma
**Boarding corridor**: las fotos reales de un yate dispuestas como paredes de un pasillo en profundidad (translateZ), la cámara avanza con el scroll y al final aparece el clip del yate. El carrusel de la flota re-carga el pasillo con el yate elegido y lo lleva al formulario final.

## Silencio autorizado
Inicio del acto 3: ~0.5 vh de pantalla azul noche con "Step aboard." No es scroll muerto.

## Cambios por dirección de Salo (durante el build)
- Salo pidió "fondo de mar y conforme se baja aparecen los yates sobre el mar, del otro lado las descripciones": **el pico pasa a ser la flota sobre el mar** (acto 2). El pasillo de abordaje se descartó para no tener dos picos.
- Salo pidió "el logo en 3D acompañando cada sección del menú": **ese es el movimiento firma** (emblema 3D viajero que se acopla en cada sección).
- Tell-someone final: "It's the site where the yachts sail toward you over the Arch as you scroll, and the All In One Cabo emblem flies along and lands on every section."

## Score final (Home)
| Acto | Sentimiento | Dispositivo | vh |
|---|---|---|---|
| Hero | Llegada, curiosidad | flow + planos con profundidad (video marina lejos, 3 fotos en Z, puntero) | 1 |
| Flota sobre el mar (PICO) | Asombro | pin bespoke: yates entran acostados en el horizonte, navegan, se enderezan; placa con hechos del otro lado | 5.6 |
| Toda la flota | Control | flow + carrusel 3D nativo (scroll-snap, rotateY por distancia), filtro | ~1.3 |
| Experiencias | Pulso | pin + barridos clip-path entre 6 salas de video | 3.4 |
| Filmado por la tripulación | Confianza | flow + in, marco con rotateY ligado a --sc-p | ~1.8 |
| Solicitud | Resolución | pin corto, placa-formulario con el yate elegido | 1.25 |
Total ≈ 14.3 vh, 6 actos (fuera de la banda 13.6–13.8).

## Feel check (frio, sobre contact sheets)
Sentido: curiosidad · asombro · control · pulso · confianza · calma. Coincide con la curva salvo el "silencio antes del pico", que se perdió al quitar el pasillo: el hero hace de calma previa. Correcciones hechas tras verla: huecos sin yate entre barcos (ventanas solapadas), salida del yate demasiado grande (reducida), placa de la sala 1 visible sobre las demás (contexto de apilamiento), titular del hero tapado por las fotos (columna alineada a la izquierda).
