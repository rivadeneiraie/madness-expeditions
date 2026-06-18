---
title: "Reorganización de imágenes compartidas en packages/"
type: "refactor"
created: "2026-06-18"
status: "in-review"
baseline_commit: "aba33612a090cf157320fbf529344bbe83289d8a"
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Los logos de marca (`logo02.png`, `pax_logo.jpeg`, `ansilta_logo.jpg`) están duplicados en 4 carpetas de viaje, referencias cruzadas entre carpetas de trip son frágiles, y 2 referencias de imagen están rotas tras un movimiento de archivos: `../assets/images/peru/86.jpg` (movida a `apps/coming-soon/`) y `../../web-en-contruccion/logo-madness-expeditions.png` (carpeta eliminada). Además, todos los HTMLs referencian `logo-v4.png` desde `apps/web/public/` cuando el logo correcto es `logo-madness-expeditions.png`.

**Approach:** Crear `packages/images/` como carpeta centralizada de logos de marca, copiar ahí los 4 logos comunes, actualizar todas las rutas en los 14 HTMLs afectados, corregir las 2 referencias rotas, y eliminar las copias duplicadas de las carpetas de cada viaje.

## Boundaries & Constraints

**Always:**

- Todas las rutas relativas deben ser correctas desde la ubicación de cada HTML.
- Desde `packages/documents/<trip>/` → `packages/images/` la ruta es `../../images/`.
- No modificar las imágenes específicas de cada viaje (fotos, mapas, etc.), solo los logos compartidos.
- `logo-madness-expeditions.png` fuente: `packages/marketing/email/images/logo-madness-expeditions.png` — copiar a `packages/images/`, NO eliminar el original.
- Fuente de los 3 logos duplicados: copiar desde `packages/documents/peru/images/` (cualquier copia es idéntica).

**Ask First:**

- Si algún HTML de marketing (`packages/marketing/`) referencia logos que se van a mover, consultar antes de editar.

**Never:**

- Editar HTMLs de `packages/marketing/` en este scope.
- Renombrar imágenes de fotos de viaje.
- Mover `logo-madness-expeditions.png` del marketing email folder (solo copiar).

## I/O & Edge-Case Matrix

| Scenario                     | Input / Estado                                           | Salida Esperada                                                 | Manejo de error |
| ---------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- | --------------- |
| Logo desde trip folder       | HTML abre en browser desde `packages/documents/bolivia/` | `logo02.png` carga desde `packages/images/`                     | N/A             |
| Referencia rota 86.jpg       | `seis-miles/*.html`                                      | Imagen carga desde `apps/coming-soon/images/peru/86.jpg`        | N/A             |
| Referencia rota logo-madness | `cabalgata/*.html`                                       | Logo carga desde `packages/images/logo-madness-expeditions.png` | N/A             |
| logo-v4.png reemplazado      | Cualquier HTML con ref a `apps/web/public/logo-v4.png`   | Carga `logo-madness-expeditions.png` desde `packages/images/`   | N/A             |

</frozen-after-approval>

## Code Map

- `packages/images/` -- carpeta nueva; destino de los 4 logos compartidos
- `packages/marketing/email/images/logo-madness-expeditions.png` -- fuente del logo principal; NO modificar
- `packages/documents/peru/images/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- fuente para copia; eliminar tras copiar
- `packages/documents/25-mayo/images/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- duplicados; eliminar tras actualizar HTML
- `packages/documents/bolivia/images/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- duplicados; eliminar tras actualizar HTML
- `packages/documents/nepal/image/introduccion/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- duplicados; eliminar tras actualizar HTML
- `apps/coming-soon/images/peru/86.jpg` -- destino real de la imagen rota en seis-miles

## Tasks & Acceptance

**Execution:**

- [x] `packages/images/` -- CREAR carpeta; COPIAR `logo02.png`, `pax_logo.jpeg`, `ansilta_logo.jpg` desde `packages/documents/peru/images/`; COPIAR `logo-madness-expeditions.png` desde `apps/coming-soon/`
- [x] `packages/documents/25-mayo/propuesta-25-mayo-2026.html` -- REEMPLAZAR `images/logo02.png` → `../../images/logo02.png`; `images/pax_logo.jpeg` → `../../images/pax_logo.jpeg`; `images/ansilta_logo.jpg` → `../../images/ansilta_logo.jpg`; `../../../apps/web/public/logo-v4.png` → `../../images/logo-madness-expeditions.png`
- [x] `packages/documents/bolivia/propuesta-bolivia-2026.html` -- mismos 4 reemplazos que 25-mayo
- [x] `packages/documents/cabalgata/propuesta-cabalgata-2026.html` -- REEMPLAZAR `../../web-en-contruccion/logo-madness-expeditions.png` → `../../images/logo-madness-expeditions.png`; `../../../apps/web/public/logo-v4.png` → `../../images/logo-madness-expeditions.png`; `../25-mayo/images/pax_logo.jpeg` → `../../images/pax_logo.jpeg`; `../25-mayo/images/ansilta_logo.jpg` → `../../images/ansilta_logo.jpg`
- [x] `packages/documents/curso-hielo/propuesta-curso-hielo-2026.html` -- REEMPLAZAR `../bolivia/images/logo02.png` → `../../images/logo02.png`; `../bolivia/images/pax_logo.jpeg` → `../../images/pax_logo.jpeg`; `../bolivia/images/ansilta_logo.jpg` → `../../images/ansilta_logo.jpg`; `../../../apps/web/public/logo-v4.png` → `../../images/logo-madness-expeditions.png`
- [x] `packages/documents/curso-hielo/propuesta-curso-hielo-mendoza-2026.html` -- mismos 4 reemplazos que curso-hielo
- [x] `packages/documents/nepal/presentacion-nepal-everest.html` -- REEMPLAZAR `image/introduccion/logo02.png` → `../../images/logo02.png`; `../peru/images/ansilta_logo.jpg` → `../../images/ansilta_logo.jpg`; `../peru/images/pax_logo.jpeg` → `../../images/pax_logo.jpeg`
- [x] `packages/documents/nepal/propuesta-nepal-2027.html` -- REEMPLAZAR `image/introduccion/logo02.png` → `../../images/logo02.png`; `image/introduccion/pax_logo.jpeg` → `../../images/pax_logo.jpeg`; `image/introduccion/ansilta_logo.jpg` → `../../images/ansilta_logo.jpg`; `../../../apps/web/public/logo-v4.png` → `../../images/logo-madness-expeditions.png`
- [x] `packages/documents/peru/propuesta-peru-2026.html` -- REEMPLAZAR `images/logo02.png` → `../../images/logo02.png`; `images/pax_logo.jpeg` → `../../images/pax_logo.jpeg`; `images/ansilta_logo.jpg` → `../../images/ansilta_logo.jpg`; `../../../apps/web/public/logo-v4.png` → `../../images/logo-madness-expeditions.png`
- [x] `packages/documents/seis-miles/presentacion-seismiles.html` -- REEMPLAZAR `../assets/images/peru/86.jpg` → `../../../apps/coming-soon/images/peru/86.jpg`
- [x] `packages/documents/seis-miles/presentacion-seismiles-en.html` -- mismo reemplazo de 86.jpg
- [x] `packages/documents/seis-miles/presentacion-seismiles-pt.html` -- mismo reemplazo de 86.jpg
- [x] `packages/documents/seis-miles/propuesta-comercial-seismiles.html` -- REEMPLAZAR `../assets/images/peru/86.jpg` → `../../../apps/coming-soon/images/peru/86.jpg`; `../../../apps/web/public/logo-v4.png` → `../../images/logo-madness-expeditions.png`
- [x] `packages/documents/seis-miles/propuesta-comercial-seismiles-en.html` -- mismos 2 reemplazos que propuesta-comercial
- [x] `packages/documents/seis-miles/propuesta-comercial-seismiles-pt.html` -- mismos 2 reemplazos que propuesta-comercial
- [x] `packages/documents/25-mayo/images/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- ELIMINAR los 3 archivos duplicados
- [x] `packages/documents/bolivia/images/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- ELIMINAR los 3 archivos duplicados
- [x] `packages/documents/nepal/image/introduccion/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- ELIMINAR los 3 archivos duplicados
- [x] `packages/documents/peru/images/{logo02.png,pax_logo.jpeg,ansilta_logo.jpg}` -- ELIMINAR los 3 archivos duplicados

**Acceptance Criteria:**

- Given cualquier HTML de `packages/documents/`, when se abre en un browser desde su ubicación, then los logos `logo02.png`, `pax_logo.jpeg`, `ansilta_logo.jpg` y `logo-madness-expeditions.png` cargan correctamente desde `packages/images/`.
- Given los 6 HTMLs de `seis-miles/`, when se abren en un browser, then la imagen `86.jpg` carga (no aparece imagen rota).
- Given `cabalgata/propuesta-cabalgata-2026.html`, when se abre en un browser, then el logo principal carga (sin ref a `web-en-contruccion`).
- Given ningún HTML en `packages/documents/`, when se inspecciona el código fuente, then no existe ninguna referencia a `logo-v4.png`, `../assets/images/`, `../../web-en-contruccion/`, ni rutas cruzadas entre carpetas de viaje para logos.
- Given `packages/images/`, when se lista el contenido, then contiene exactamente `logo02.png`, `pax_logo.jpeg`, `ansilta_logo.jpg`, `logo-madness-expeditions.png`.
- Given las carpetas de imágenes de cada viaje, when se listan, then no contienen `logo02.png`, `pax_logo.jpeg`, ni `ansilta_logo.jpg`.

## Verification

**Manual checks:**

- Abrir cada HTML en browser y verificar que no hay imágenes rotas en la sección de logos/encabezado.
- `grep -r "logo-v4" packages/documents/` → sin resultados.
- `grep -r "assets/images" packages/documents/` → sin resultados.
- `grep -r "web-en-contruccion" packages/documents/` → sin resultados.
