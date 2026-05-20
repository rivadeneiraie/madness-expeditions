---
title: "Presentación PowerPoint Nepal — Everest Base Camp Trek 2027"
type: "feature"
created: "2026-05-20"
status: "done"
baseline_commit: "7e225d73194baf21ef107044fb865bd023bbff2e"
context:
  - "_bmad-output/project-context.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problema:** Pablo necesita una presentación tipo PowerPoint en formato HTML/PDF para dar charlas de venta del viaje "Trekking al Campo Base del Everest 2027". No existe ningún archivo de presentación para este destino todavía.

**Approach:** Crear un archivo HTML de slides 16:9 (formato landscape, igual a `resources/company-document/presentacion-seismiles.html`) reutilizando el mismo sistema de diseño visual (dark navy, accent azul, overlays, tipografía), con contenido extraído de `resources/trips/nepal/Nepal.txt` y fotos de `resources/trips/nepal/image/` organizadas por día. Generar también un script `generate-pdf.js` para exportar el PDF con Puppeteer.

## Boundaries & Constraints

**Siempre:**
- Mantener exactamente el mismo sistema visual de `presentacion-seismiles.html`: fondo `#0d1b2a`, acento `#4a9fd4`, overlays `.ov-dark` / `.ov-bottom` / `.ov-left`, fuente Arial/Helvetica, slides 297mm × 167mm landscape.
- Usar únicamente imágenes locales de `resources/trips/nepal/image/` (rutas relativas desde el HTML de salida).
- Idioma español en todo el contenido.
- El HTML de salida debe poder guardarse como PDF con Ctrl+P (sin márgenes, tamaño 297×167 mm).
- **NO mostrar precio** en ninguna slide — la presentación es para charlas de ventas, el precio se trata verbalmente.
- Fecha del viaje: **ABRIL 2027** (mostrar como badge/etiqueta).
- Logo: `../email/documents/032026/images/logo-removebg-preview.png` (ruta relativa desde `resources/trips/nepal/`).

**Preguntar antes de:**
- Agregar más de 25 slides en total si el contenido lo justificara (el objetivo es ~22-24 slides fluidos).
- Cambiar el formato de 16:9 a A4 portrait.

**Nunca:**
- Inventar altitudes, tiempos de caminata u otra información técnica no presente en Nepal.txt.
- Mostrar precios o importes.
- Modificar archivos existentes fuera de `resources/trips/nepal/`.

</frozen-after-approval>

## Story

Como **Pablo (guía/comercial de The Madness Expeditions)**,
quiero **una presentación visual tipo PowerPoint en HTML (exportable a PDF)** para el trekking al Campo Base del Everest 2027,
para que **pueda dar charlas de venta atractivas y profesionales mostrando el itinerario completo día a día con fotos reales del viaje**.

## Acceptance Criteria

1. El archivo `resources/trips/nepal/presentacion-nepal-everest.html` existe y se puede abrir en el navegador mostrando todas las slides correctamente.
2. Cada slide tiene formato 16:9 (297mm × 167mm) con el mismo sistema visual de `presentacion-seismiles.html`.
3. La portada muestra el título "Trekking al Campo Base del Everest", el subtítulo "Un Viaje Al Corazón de los Himalaya & La Cultura Sherpa", el badge "ABRIL 2027" y el logo de Madness Expeditions. **Sin precio.**
4. Existe una slide de presentación de empresa/quiénes somos (Madness Expeditions).
5. Existen slides para cada uno de los 19 días del itinerario (algunas jornadas tienen 2 slides según Nepal.txt), usando las fotos de la carpeta del día correspondiente.
6. Las fotos referenciadas existen en `resources/trips/nepal/image/<DiaXX>/`.
7. El archivo `resources/trips/nepal/generate-pdf.js` existe y genera el PDF con Puppeteer apuntando al HTML correcto.
8. Al imprimir (Ctrl+P) sin márgenes con tamaño personalizado 297×167mm, las slides se ven limpias sin cortes.
9. Existe al menos una slide de cierre con datos de contacto de Pablo / Madness Expeditions.

## Tasks / Subtasks

- [x] Crear `resources/trips/nepal/presentacion-nepal-everest.html` (AC: 1, 2, 3, 4, 5, 6, 8)
  - [x] Copiar el sistema de estilos base (CSS variables, clases utilitarias) de `presentacion-seismiles.html`
  - [x] Ajustar colores/overlays para temática Himalaya (el sistema azul ya encaja bien)
  - [x] Slide 1: Portada — título, subtítulo, badge ABRIL 2027, logo, sin precio
  - [x] Slide 2: Quiénes somos — Madness Expeditions, servicios
  - [x] Slide 3: DÍA 1 — Argentina → Katmandu (Aeropuerto Tribhuvan, 37hs vuelo)
  - [x] Slide 4: DÍA 2 — Katmandú city tour (Thamel, Crematorio, Templo Monos, Durbar Square, Boudhanath)
  - [x] Slide 5: DÍA 3 — Día de compras para trekking (tiendas de montaña)
  - [x] Slide 6: DÍA 4a — Vuelo KTM → LUKLA (Aeropuerto Tenzing-Hillary, 2860 msnm)
  - [x] Slide 7: DÍA 4b — Lukla (2840) → Phakding (2610), 3-4hs
  - [x] Slide 8: DÍA 5 — Phakding (2610) → Namche Bazaar (3440), 7-8hs, puentes colgantes
  - [x] Slide 9: DÍA 6 — Descanso Namche Bazaar (3440), aclimatación, Museo Sherpa
  - [x] Slide 10: DÍA 7 — Namche (3440) → Hillary School → Sanasa (3860), Everest View
  - [x] Slide 11: DÍA 8 — Sanasa (3860) → Monasterio Tengboche → Pangboche (3960), 7-8hs, ZIG-ZAG
  - [x] Slide 12: DÍA 9 — Pangboche (3960) → Pheriche (4270), 6-8hs, +4000 msnm
  - [x] Slide 13: DÍA 10 — Descanso Pheriche (4270), aclimatación, vista Ama Dablam
  - [x] Slide 14: DÍA 11 — Pheriche (4270) → Lobuche (4940), 6-7hs, "The Memorial"
  - [x] Slide 15: DÍA 12 — Lobuche (4940) → Campo Base Everest (5400), 7-8hs, Gorak Shep
  - [x] Slide 16: DÍA 13a — Día completo en Campo Base Everest, glaciar
  - [x] Slide 17: DÍA 13b — Servicios en Campo Base (qué incluye el campamento)
  - [x] Slide 18: DÍA 14 — Regreso: EBC → Dingboche (4410), 6-7hs
  - [x] Slide 19: DÍA 15 — Dingboche → Tengboche (3860), 7-8hs, zona monasterio
  - [x] Slide 20: DÍA 16 — Pangboche → Namche Bazaar (3440), 7-8hs, bajada/subida bosque
  - [x] Slide 21: DÍA 17 — ÚLTIMO DÍA TREKKING: Namche → Lukla (2840), 8-9hs
  - [x] Slide 22: DÍA 18 — Vuelo Lukla → Katmandu, cena de despedida
  - [x] Slide 23: DÍA 19 — Regreso a Argentina, NAMASTE
  - [x] Slide 24: Cierre — logo, datos de contacto Pablo / Madness Expeditions
- [x] Crear `resources/trips/nepal/generate-pdf.js` (AC: 7)
  - [x] Copiar estructura de `resources/trips/bolivia/generate-pdf.js` apuntando al HTML de Nepal
  - [x] Ajustar output path a `resources/trips/nepal/presentacion-nepal-everest.pdf`

## Dev Notes

### Sistema Visual (CRÍTICO — no reinventar)

**Reutilizar el CSS de `resources/company-document/presentacion-seismiles.html` como base exacta.** No crear estilos desde cero. El sistema ya resuelto incluye:

```css
/* Slide container */
.slide { width: 297mm; height: 167mm; position: relative; overflow: hidden; page-break-after: always; margin: 16px auto; box-shadow: 0 6px 32px rgba(0,0,0,0.65); background: #0d1b2a; }
@page { size: 297mm 167mm; margin: 0; }

/* Overlays */
.bg-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.ov-dark { position: absolute; inset: 0; background: rgba(8,20,36,0.55); }
.ov-bottom { position: absolute; inset: 0; background: linear-gradient(to top, rgba(8,20,36,0.97) 0%, rgba(8,20,36,0.82) 30%, rgba(8,20,36,0.35) 62%, rgba(8,20,36,0.05) 100%); }
.ov-left { position: absolute; inset: 0; background: linear-gradient(to right, rgba(8,20,36,0.96) 0%, rgba(8,20,36,0.80) 42%, rgba(8,20,36,0.20) 72%, rgba(8,20,36,0.00) 100%); }

/* Colores */
--accent: #4a9fd4;
--bg: #0d1b2a;

/* Slide plantilla volcán/día (ya usada en SeisMiles) */
.slide-v .v-content { position: absolute; inset: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 0 14mm 11mm 14mm; }
.slide-v h2 { color: #fff; font-size: 42px; font-weight: 900; text-transform: uppercase; letter-spacing: -1px; line-height: 0.95; margin-bottom: 2.5mm; }
.slide-v .altitude { color: #4a9fd4; font-size: 19px; font-weight: 700; }
.slide-v .v-desc { color: rgba(255,255,255,0.80); font-size: 10.5px; line-height: 1.80; max-width: 56%; background: rgba(8,20,36,0.52); border-left: 2.5px solid #4a9fd4; padding: 9px 14px; }
```

**Adaptación Nepal:** La plantilla `.slide-v` (usada en los volcanes de SeisMiles) funciona perfectamente para los días de trekking. Cada slide de día = imagen de fondo + `.ov-bottom` + título del día + altitud (msnm) + descripción breve en el bloque `.v-desc`.

### Estructura de Archivos

```
resources/trips/nepal/
  presentacion-nepal-everest.html   ← CREAR (output principal)
  presentacion-nepal-everest.pdf    ← generado por el script
  generate-pdf.js                   ← CREAR (script Puppeteer)
  Nepal.txt                         ← fuente de contenido (ya existe)
  image/
    introduccion/   ← 31 imágenes — usar para portada y slides iniciales
    Dia01/          ← 3 imágenes — Día 1 (vuelo)
    Día02/          ← imágenes — Día 2 (Katmandú)
    Dia03/          ← imágenes — Día 3 (compras)
    Dia04-01/       ← imágenes — Día 4a (vuelo a Lukla)
    Día04-02/       ← 10 imágenes — Día 4b (inicio trekking)
    Dia05/          ← 12 imágenes — Día 5 (Namche)
    dia06/          ← imágenes — Día 6 (descanso)
    Día07/          ← imágenes — Día 7 (Sanasa/Everest View)
    Día08/          ← imágenes — Día 8 (Pangboche/Monasterio)
    Dia09/          ← imágenes — Día 9 (Pheriche)
    Dia10/          ← imágenes — Día 10 (descanso/Ama Dablam)
    Dia11/          ← imágenes — Día 11 (Lobuche/Memorial)
    Dia12/          ← 15+ imágenes — Día 12 (Campo Base Everest)
    Dia13-01/       ← imágenes — Día 13a (EBC completo)
    Dia13-02/       ← imágenes — Día 13b (servicios EBC)
    Dia14/          ← imágenes — Día 14 (regreso Dingboche)
    Dia15/          ← imágenes — Día 15 (Tengboche)
    Dia16/          ← imágenes — Día 16 (Namche regreso)
    Dia17/          ← imágenes — Día 17 (último trekking)
    Dia18/          ← imágenes — Día 18 (vuelo + cena)
    Dia19/          ← imágenes — Día 19 (regreso AR)
```

**IMPORTANTE — Rutas relativas:** El HTML está en `resources/trips/nepal/`, por lo que las imágenes se referencian como `image/Dia01/WhatsApp Image...`. El logo se referencia como `../../company-document/photos/` si existe allí, o `../../email/documents/032026/images/logo-removebg-preview.png`. Verificar ruta exacta del logo antes de hardcodear.

**IMPORTANTE — Nombres de carpetas con tilde:** Algunos directorios usan tilde (Día02, Día04-02, Día07, Día08) y otros no. Usar los nombres exactos al construir rutas `src=""`.

### Primera imagen por carpeta (para referencia de composición visual)

| Carpeta | Primera imagen disponible |
|---------|--------------------------|
| `introduccion` | `WhatsApp Image 2026-05-13 at 19.33.46 (1).jpeg` |
| `Dia01` | `WhatsApp Image 2026-05-13 at 20.00.13 (1).jpeg` |
| `Día02` | `WhatsApp Image 2026-05-13 at 20.04.55 (1).jpeg` |
| `Dia03` | `WhatsApp Image 2026-05-13 at 20.08.55.jpeg` |
| `Dia04-01` | `WhatsApp Image 2026-05-13 at 20.14.30 (1).jpeg` |
| `Día04-02` | `WhatsApp Image 2026-05-13 at 20.18.13 (1).jpeg` |
| `Dia05` | `WhatsApp Image 2026-05-13 at 20.23.00 (10).jpeg` |
| `dia06` | `WhatsApp Image 2026-05-13 at 20.26.02 (1).jpeg` |
| `Día07` | `WhatsApp Image 2026-05-13 at 20.30.39 (1).jpeg` |
| `Día08` | `WhatsApp Image 2026-05-13 at 20.34.46 (1).jpeg` |
| `Dia09` | `WhatsApp Image 2026-05-14 at 17.39.36 (10).jpeg` |
| `Dia10` | `WhatsApp Image 2026-05-14 at 17.46.34 (1).jpeg` |
| `Dia11` | `WhatsApp Image 2026-05-14 at 17.55.44 (10).jpeg` |
| `Dia12` | `WhatsApp Image 2026-05-14 at 18.06.13 (10).jpeg` |
| `Dia13-01` | `WhatsApp Image 2026-05-14 at 18.11.38 (10).jpeg` |
| `Dia13-02` | `WhatsApp Image 2026-05-14 at 18.18.21.jpeg` |
| `Dia14` | `WhatsApp Image 2026-05-18 at 19.15.58 (1).jpeg` |
| `Dia15` | `WhatsApp Image 2026-05-18 at 19.18.23.jpeg` |
| `Dia16` | `WhatsApp Image 2026-05-18 at 19.27.59 (1).jpeg` |
| `Dia17` | `WhatsApp Image 2026-05-18 at 19.33.05 (1).jpeg` |
| `Dia18` | `WhatsApp Image 2026-05-18 at 19.36.09 (10).jpeg` |
| `Dia19` | `WhatsApp Image 2026-05-18 at 19.40.19 (1).jpeg` |

> Cada carpeta tiene entre 3 y 15 imágenes. Se puede elegir la más representativa por composición visual (preferir paisajes amplios, montañas, momentos de trek para el fondo de cada slide).

### Contenido de Slides — Detalle Completo

Extraído íntegramente de `resources/trips/nepal/Nepal.txt`:

#### SLIDE 1 — PORTADA
```
Título: 🇳🇵 Trekking al Campo Base del Everest 🇳🇵
Subtítulo: "Un Viaje Al Corazón de los Himalaya & La Cultura Sherpa"
Badge: ABRIL 2027
⚠️ SIN PRECIO
Logo: Madness Expeditions
Imagen fondo: introduccion/ (elegir foto panorámica Himalaya)
```

#### SLIDE 2 — QUIÉNES SOMOS (Madness Expeditions)
```
Reutilizar la estructura del slide "s-empresa" de presentacion-seismiles.html.
Texto: aventura única e inolvidable, logística completa, guías certificados.
Imagen fondo: introduccion/ (foto de equipo o trekkers)
```

#### SLIDE 3 — DÍA 1
```
Título: DÍA 1
Subtítulo: Argentina (Bs. As.) → Nepal (Katmandú)
Dato clave: Aeropuerto TRIBHUVAN · +16.500 km · ~37 hs de vuelo (vía Doha / Turquía / Dubai)
Imagen fondo: Dia01/
```

#### SLIDE 4 — DÍA 2
```
Título: DÍA 2
Subtítulo: Llegada a Katmandú
Puntos: Zona del Thamel · El Crematorio · Templo de los Monos · Durbar Square · Estupa de Boudhanath
Imagen fondo: Día02/
```

#### SLIDE 5 — DÍA 3
```
Título: DÍA 3
Subtítulo: Día de Compras para el Trekking
Texto: Tiendas de Montaña en Katmandú
Imagen fondo: Dia03/
```

#### SLIDE 6 — DÍA 4 (parte 1)
```
Título: DÍA 4
Subtítulo: Vuelo KTM → LUKLA
Dato: Aeropuerto de Tenzing-Hillary · 2.860 msnm
Opciones: Avión (35-45 min desde ciudad a 4hs de ruta) · Helicóptero (45min-1hr desde KTM)
Imagen fondo: Dia04-01/
```

#### SLIDE 7 — DÍA 4 (parte 2)
```
Título: DÍA 4 · INICIO DEL TREKKING
Ruta: Lukla (2.840 msnm) → Phakding (2.610 msnm)
Duración: 3 a 4 hs de caminata
Imagen fondo: Día04-02/
```

#### SLIDE 8 — DÍA 5
```
Título: DÍA 5
Ruta: Phakding (2.610 msnm) → Namche Bazaar (3.440 msnm)
Duración: 7 a 8 hs de caminata
Hitos: Puentes colgantes más altos y largos · Entrada a la ciudad de los Sherpas
Imagen fondo: Dia05/
```

#### SLIDE 9 — DÍA 6
```
Título: DÍA 6 · DESCANSO
Lugar: Namche Bazaar (3.440 msnm)
Actividad: Aclimatación · Museo Sherpa
Imagen fondo: dia06/
```

#### SLIDE 10 — DÍA 7
```
Título: DÍA 7
Ruta: Namche Bazaar (3.440 msnm) → Hillary School → Sanasa (3.860 msnm)
Hitos: Viejo Aeropuerto · Vista al Everest!!
Imagen fondo: Día07/
```

#### SLIDE 11 — DÍA 8
```
Título: DÍA 8
Ruta: Sanasa (3.860 msnm) → Monasterio de Tengboche → Pangboche (3.960 msnm)
Duración: 7 a 8 hs
Descripción: Gran bajada y subida en ZIG-ZAG · Gran Templo · Primeras Bendiciones
Imagen fondo: Día08/
```

#### SLIDE 12 — DÍA 9
```
Título: DÍA 9
Ruta: Pangboche (3.960 msnm) → Pheriche (4.270 msnm)
Duración: 6 a 8 hs
Descripción: Entramos al Trekking de Altura · +4.000 msnm · Pueblitos quedan atrás
Imagen fondo: Dia09/
```

#### SLIDE 13 — DÍA 10
```
Título: DÍA 10 · DESCANSO
Lugar: Pheriche (4.270 msnm)
Actividad: Aclimatación · Caminata por zona alta · Gran Vista del Ama Dablam y Ochomiles
Imagen fondo: Dia10/
```

#### SLIDE 14 — DÍA 11
```
Título: DÍA 11
Ruta: Pheriche (4.270 msnm) → Lobuche (4.940 msnm)
Duración: 6 a 7 hs
Hito especial: "The Memorial" — donde descansan restos de escaladores del Everest
Descripción: Tramo recto, subida tranquila, cruce de río, escalones en ZIG-ZAG, tramo plano final
Imagen fondo: Dia11/
```

#### SLIDE 15 — DÍA 12
```
Título: DÍA 12
Ruta: Lobuche (4.940 msnm) → Campo Base Everest (5.400 msnm)
Duración: 7 a 8 hs
Hitos: Gorak Shep (5.160 msnm) · Caminata entre bloques de roca · Glaciar final
Descripción: Día largo · ritmo muy lento · entrada al CAMPO BASE!!
Imagen fondo: Dia12/ (preferir foto más espectacular de EBC o glaciar)
```

#### SLIDE 16 — DÍA 13 (parte 1)
```
Título: DÍA 13 · CAMPO BASE EVEREST
Actividad: Día entero en el Campo Base (5.400 msnm) · Recorrer y conocer · Caminata por el glaciar
Texto: ¡A DESCANSAR Y DISFRUTAR!
Imagen fondo: Dia13-01/
```

#### SLIDE 17 — DÍA 13 (parte 2)
```
Título: SERVICIOS EN CAMPO BASE
Descripción: Qué tiene el campamento, dónde dormiremos, servicios disponibles
(Nota para dev: si no hay más info en Nepal.txt sobre esto, crear slide visual mostrando el campamento con texto general sobre lo que incluye el servicio de campo base)
Imagen fondo: Dia13-02/
```

#### SLIDE 18 — DÍA 14
```
Título: DÍA 14 · REGRESO
Ruta: Everest Base Camp → Dingboche (4.410 msnm)
Duración: 6 a 7 hs
Imagen fondo: Dia14/
```

#### SLIDE 19 — DÍA 15
```
Título: DÍA 15
Ruta: Dingboche → Monasterio de Tengboche (3.860 msnm)
Duración: 7 a 8 hs
Detalle: Dormimos en la zona del monasterio
Imagen fondo: Dia15/
```

#### SLIDE 20 — DÍA 16
```
Título: DÍA 16
Ruta: Pangboche → Namche Bazaar (3.440 msnm)
Duración: 7 a 8 hs
Descripción: 1 bajada y subida por un bosque · ladera de la montaña hasta Namche
Imagen fondo: Dia16/
```

#### SLIDE 21 — DÍA 17
```
Título: DÍA 17 · ÚLTIMO DÍA DE TREKKING!!
Ruta: Namche Bazaar → Lukla (2.840 msnm)
Duración: 8 a 9 hs (el más largo · pierde mucha altura · subida final a Lukla)
Texto: ¡A DISFRUTAR!
Imagen fondo: Dia17/
```

#### SLIDE 22 — DÍA 18
```
Título: DÍA 18
Actividad: Vuelo Lukla → Katmandú (muy temprano) · puede ser avión o helicóptero
Cierre: Gran cena de despedida en KTM
Imagen fondo: Dia18/
```

#### SLIDE 23 — DÍA 19
```
Título: DÍA 19 · REGRESO A ARGENTINA
Texto: Últimas horas en KTM · NAMASTE 🙏
Imagen fondo: Dia19/
```

#### SLIDE 24 — CIERRE
```
Reutilizar estructura del slide "s-cierre" de presentacion-seismiles.html.
Logo grande · "NAMASTE" como título · Datos de contacto de Pablo / Madness Expeditions
Imagen fondo: introduccion/ (foto de amanecer Himalaya o del grupo)
```

### Script generate-pdf.js

Copiar y adaptar `resources/trips/bolivia/generate-pdf.js`. Ajustar:
- `inputPath` → ruta absoluta a `presentacion-nepal-everest.html`
- `outputPath` → ruta absoluta a `presentacion-nepal-everest.pdf`
- `page.setViewport` o paper format → `{ width: 1123, height: 632 }` (equivalente 297×167mm a 96dpi) o usar `format: 'Letter'` con `landscape: true` y luego ajustar
- Revisar cómo el script Bolivia maneja el PDF para mantener la misma robustez

### Verificación del Logo

Antes de construir el HTML, verificar cuál es la ruta correcta del logo desde `resources/trips/nepal/`:
```
../../email/documents/032026/images/logo-removebg-preview.png
```
Si no existe, buscar el logo en `resources/company-document/photos/` u otra ubicación y ajustar la ruta relativa en consecuencia.

### Referencia a archivos existentes

- `resources/company-document/presentacion-seismiles.html` — **BASE PRINCIPAL del sistema visual**
- `resources/trips/bolivia/propuesta-bolivia-2026.html` — referencia alternativa de estructura HTML
- `resources/trips/bolivia/generate-pdf.js` — modelo para el script de exportación
- `resources/trips/25-mayo/generate-pdf.js` — otro modelo de referencia
- `resources/trips/nepal/Nepal.txt` — **TODO el contenido del itinerario**

## Code Map

- `resources/company-document/presentacion-seismiles.html` — sistema CSS base a reutilizar (slides 16:9, overlays, colores)
- `resources/trips/bolivia/generate-pdf.js` — modelo del script Puppeteer
- `resources/trips/nepal/Nepal.txt` — fuente de contenido del itinerario
- `resources/trips/nepal/image/` — banco de imágenes organizadas por día
- `resources/trips/nepal/presentacion-nepal-everest.html` — **NUEVO archivo HTML a crear**
- `resources/trips/nepal/generate-pdf.js` — **NUEVO script PDF a crear**
- `resources/trips/nepal/presentacion-nepal-everest.pdf` — resultado final esperado

## Acceptance Criteria (BDD)

- Given el HTML está abierto en Chrome, when se hace Ctrl+P con tamaño 297×167mm sin márgenes, then se genera un PDF de 24 slides sin cortes de contenido entre páginas.
- Given el HTML existe en `resources/trips/nepal/`, when se abren los slides en el navegador, then ninguna imagen muestra error 404 (todas las rutas relativas a `image/` son correctas).
- Given `generate-pdf.js` existe en `resources/trips/nepal/`, when se ejecuta `node generate-pdf.js`, then se genera `presentacion-nepal-everest.pdf` sin errores.
- Given se revisa el PDF generado, when se busca precio o importe, then no aparece ningún valor numérico de precio en ninguna slide.
- Given se revisa la portada, when se verifica la fecha, then aparece "ABRIL 2027" como único dato de fecha.

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.6

### Debug Log References

### Completion Notes List

### File List

