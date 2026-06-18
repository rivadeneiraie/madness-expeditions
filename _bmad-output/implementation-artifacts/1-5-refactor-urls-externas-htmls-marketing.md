---
baseline_commit: 993f65f58b13fb6fdc744adaa21eceb3e79b8cf3
---

# Historia 1.5: Refactor de URLs Externas en HTMLs de Marketing

Status: review

---

## Story

Como desarrollador,
quiero que todos los HTMLs de marketing referencien las imágenes por rutas relativas locales en lugar de URLs de `raw.githubusercontent.com`,
para que el generador de PDFs funcione 100% offline sin depender de GitHub.

---

## Acceptance Criteria

**AC1 — No quedan referencias a `raw.githubusercontent.com` en `packages/`:**

**Given** los archivos HTML en `packages/pdf-generator/` y `packages/marketing-docs/servicios/`
**When** se hace `Select-String "raw.githubusercontent.com" packages/ -Recurse` (PowerShell) o `grep -r "raw.githubusercontent.com" packages/`
**Then** el resultado está vacío — no quedan referencias a URLs externas de GitHub

**AC2 — Los PDFs se generan correctamente con rutas locales:**

**Given** los HTMLs refactorizados con rutas relativas a `packages/assets/images/`
**When** se corre `node packages/pdf-generator/generate-pdf.js` desde la raíz del repo
**Then** los PDFs se generan correctamente con todas las imágenes presentes (sin imágenes rotas ni en blanco)

**AC3 — El generador funciona sin internet:**

**Given** que el proceso de generación corre en un entorno sin acceso a internet
**When** se ejecuta el generador de PDFs (`generate-pdf.js` y `generate-presentacion-pdf.js`)
**Then** todos los PDFs se generan exitosamente sin timeout ni errores de red

---

## Dependencia Crítica

> ⚠️ **Esta historia DEPENDE de Historia 1.4 (Reorganización de `resources/` en `packages/`).**
>
> La Historia 1.4 debe estar completada ANTES de implementar esta historia. Los HTMLs deben estar ya en `packages/pdf-generator/` y `packages/marketing-docs/servicios/` para que esta historia pueda trabajar sobre ellos.
>
> **Historia 1.3** puede estar o no completa — no impacta esta historia.

---

## Tasks / Subtasks

- [x] **Task 1: Auditar todos los HTMLs afectados en `packages/`** (AC: 1)
  - [x] 1.1 Correr `Get-ChildItem -Recurse -Path packages -Include "*.html" | Select-String "raw.githubusercontent.com"` para listar todas las ocurrencias
  - [x] 1.2 Confirmar que los HTMLs en scope son los de `packages/pdf-generator/` y `packages/marketing-docs/servicios/` (los de `packages/marketing-docs/email/` tienen URLs absolutas por diseño — son emails que se envían y necesitan URLs absolutas)
  - [x] 1.3 Documentar cada URL encontrada y su ruta relativa equivalente en `packages/`

- [x] **Task 2: Refactorizar `packages/pdf-generator/presentacion-seismiles.html`** (AC: 1, 2, 3)
  - [x] 2.1 Localizar la URL en línea ~376: `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`
  - [x] 2.2 Reemplazar por ruta relativa: `../assets/images/peru/86.jpg`
    > **Nota:** Desde `packages/pdf-generator/`, la imagen `peru/86.jpg` vive en `packages/assets/images/peru/86.jpg`, por lo que la ruta relativa es `../assets/images/peru/86.jpg`
  - [x] 2.3 Verificar que no quedan otras URLs externas en este archivo

- [x] **Task 3: Refactorizar `packages/pdf-generator/presentacion-seismiles-en.html`** (AC: 1, 2, 3)
  - [x] 3.1 Localizar la URL en línea ~372: `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`
  - [x] 3.2 Reemplazar por ruta relativa: `../assets/images/peru/86.jpg`
  - [x] 3.3 Verificar que no quedan otras URLs externas en este archivo

- [x] **Task 4: Refactorizar `packages/pdf-generator/presentacion-seismiles-pt.html`** (AC: 1, 2, 3)
  - [x] 4.1 Localizar la URL en línea ~372: `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`
  - [x] 4.2 Reemplazar por ruta relativa: `../assets/images/peru/86.jpg`
  - [x] 4.3 Verificar que no quedan otras URLs externas en este archivo

- [x] **Task 5: Refactorizar `packages/pdf-generator/propuesta-comercial-seismiles.html`** (AC: 1, 2, 3)
  - [x] 5.1 Localizar y reemplazar URL en línea ~345:
    - `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`
    - → `../assets/images/peru/86.jpg`
  - [x] 5.2 Localizar y reemplazar URL en línea ~351:
    - `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/documents/032026/images/logo-removebg-preview.png`
    - → `../marketing-docs/email/documents/032026/images/logo-removebg-preview.png`
  - [x] 5.3 Verificar que no quedan otras URLs externas en este archivo

- [x] **Task 6: Refactorizar `packages/pdf-generator/propuesta-comercial-seismiles-en.html`** (AC: 1, 2, 3)
  - [x] 6.1 Localizar y reemplazar URL en línea ~343:
    - `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`
    - → `../assets/images/peru/86.jpg`
  - [x] 6.2 Localizar y reemplazar URL en línea ~349:
    - `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/documents/032026/images/logo-removebg-preview.png`
    - → `../marketing-docs/email/documents/032026/images/logo-removebg-preview.png`
  - [x] 6.3 Verificar que no quedan otras URLs externas en este archivo

- [x] **Task 7: Refactorizar `packages/pdf-generator/propuesta-comercial-seismiles-pt.html`** (AC: 1, 2, 3)
  - [x] 7.1 Localizar y reemplazar URL en línea ~343:
    - `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`
    - → `../assets/images/peru/86.jpg`
  - [x] 7.2 Localizar y reemplazar URL en línea ~349:
    - `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/documents/032026/images/logo-removebg-preview.png`
    - → `../marketing-docs/email/documents/032026/images/logo-removebg-preview.png`
  - [x] 7.3 Verificar que no quedan otras URLs externas en este archivo

- [x] **Task 8: Verificar `packages/marketing-docs/servicios/servicios-madness.html`** (AC: 1)
  - [x] 8.1 Correr `Select-String "raw.githubusercontent.com" packages\marketing-docs\servicios\servicios-madness.html`
  - [x] 8.2 Si no hay ocurrencias: ✅ sin acción requerida (confirmado previamente que este archivo no tiene URLs externas)
  - [x] 8.3 Si hay ocurrencias no detectadas anteriormente: resolverlas siguiendo el mismo patrón de rutas relativas

- [x] **Task 9: Verificación de AC1 — Grep de confirmación** (AC: 1)
  - [x] 9.1 Correr desde la raíz: `Get-ChildItem -Recurse -Path packages -Include "*.html" | Select-String "raw.githubusercontent.com"`
  - [x] 9.2 Confirmar que el output está vacío (excluyendo emails en `marketing-docs/email/` que están fuera de scope por diseño)
  - [x] 9.3 Si quedan ocurrencias: resolverlas antes de continuar

- [x] **Task 10: Verificación de AC2 y AC3 — Generar PDFs** (AC: 2, 3)
  - [x] 10.1 Desde la raíz, correr: `node packages/pdf-generator/generate-pdf.js`
  - [x] 10.2 Confirmar que los 3 PDFs de propuesta se generan sin errores
  - [x] 10.3 Abrir cada PDF generado y verificar visualmente que las imágenes están presentes (sin placeholders de imagen rota)
  - [x] 10.4 Correr: `node packages/pdf-generator/generate-presentacion-pdf.js`
  - [x] 10.5 Confirmar que los 3 PDFs de presentación se generan sin errores
  - [x] 10.6 Abrir cada PDF generado y verificar visualmente que la imagen de fondo (86.jpg de Perú) está presente

- [x] **Task 11: Commit** (AC: 1, 2, 3)
  - [x] 11.1 Hacer commit con todos los HTMLs modificados
    ```bash
    git add packages/pdf-generator/*.html
    git commit -m "feat: reemplazar URLs raw.githubusercontent.com por rutas relativas locales en HTMLs de marketing"
    ```

---

## Dev Notes

### Contexto Crítico: Estado Real del Repositorio al Momento de Implementar

> ⚠️ **Esta historia se implementa DESPUÉS de Historia 1.4.** Al momento de implementar, los archivos YA NO estarán en `resources/` sino en `packages/`. Si los archivos aún están en `resources/`, significa que Historia 1.4 no fue implementada — detener y completar 1.4 primero.

**Rutas definitivas de los archivos a modificar (post-Historia 1.4):**

```
packages/
├── assets/
│   └── images/
│       ├── peru/
│       │   ├── 85.jpg
│       │   ├── 86.jpg        ← imagen más referenciada (10 ocurrencias en todo el repo)
│       │   ├── 88.jpg
│       │   └── 90.jpg
│       ├── bolivia/
│       │   ├── 28.jpg
│       │   ├── 54.jpg
│       │   └── 78.jpg
│       └── mendoza/
│           ├── curso-hielo-accion.jpeg
│           ├── curso-hielo-grupo.jpeg
│           └── IMG_20251010_110426904.jpg
│
├── marketing-docs/
│   └── email/
│       └── documents/
│           └── 032026/
│               └── images/
│                   └── logo-removebg-preview.png   ← logo Madness (referenciado en propuestas)
│
└── pdf-generator/
    ├── generate-pdf.js          ← NO requiere cambios (usa __dirname + path.resolve)
    ├── generate-presentacion-pdf.js  ← NO requiere cambios (usa __dirname + path.resolve)
    ├── presentacion-seismiles.html      ← MODIFICAR (1 URL externa)
    ├── presentacion-seismiles-en.html   ← MODIFICAR (1 URL externa)
    ├── presentacion-seismiles-pt.html   ← MODIFICAR (1 URL externa)
    ├── propuesta-comercial-seismiles.html      ← MODIFICAR (2 URLs externas)
    ├── propuesta-comercial-seismiles-en.html   ← MODIFICAR (2 URLs externas)
    └── propuesta-comercial-seismiles-pt.html   ← MODIFICAR (2 URLs externas)
```

### Inventario Exacto de URLs a Reemplazar (Verificado en código real)

Las siguientes URLs fueron identificadas mediante análisis exhaustivo del código fuente actual. El inventario es **completo y exacto** para los archivos en scope de esta historia.

#### `packages/pdf-generator/presentacion-seismiles.html` (1 URL)

| Línea aprox. | URL actual                                                                                                    | Ruta relativa nueva            |
| ------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| ~376         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg` | `../assets/images/peru/86.jpg` |

#### `packages/pdf-generator/presentacion-seismiles-en.html` (1 URL)

| Línea aprox. | URL actual                                                                                                    | Ruta relativa nueva            |
| ------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| ~372         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg` | `../assets/images/peru/86.jpg` |

#### `packages/pdf-generator/presentacion-seismiles-pt.html` (1 URL)

| Línea aprox. | URL actual                                                                                                    | Ruta relativa nueva            |
| ------------ | ------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| ~372         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg` | `../assets/images/peru/86.jpg` |

#### `packages/pdf-generator/propuesta-comercial-seismiles.html` (2 URLs)

| Línea aprox. | URL actual                                                                                                                                   | Ruta relativa nueva                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| ~345         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`                                | `../assets/images/peru/86.jpg`                                              |
| ~351         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/documents/032026/images/logo-removebg-preview.png` | `../marketing-docs/email/documents/032026/images/logo-removebg-preview.png` |

#### `packages/pdf-generator/propuesta-comercial-seismiles-en.html` (2 URLs)

| Línea aprox. | URL actual                                                                                                                                   | Ruta relativa nueva                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| ~343         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`                                | `../assets/images/peru/86.jpg`                                              |
| ~349         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/documents/032026/images/logo-removebg-preview.png` | `../marketing-docs/email/documents/032026/images/logo-removebg-preview.png` |

#### `packages/pdf-generator/propuesta-comercial-seismiles-pt.html` (2 URLs)

| Línea aprox. | URL actual                                                                                                                                   | Ruta relativa nueva                                                         |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| ~343         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/images/peru/86.jpg`                                | `../assets/images/peru/86.jpg`                                              |
| ~349         | `https://raw.githubusercontent.com/rivadeneiraie/madness-marketing/master/resources/email/documents/032026/images/logo-removebg-preview.png` | `../marketing-docs/email/documents/032026/images/logo-removebg-preview.png` |

#### `packages/marketing-docs/servicios/servicios-madness.html` (0 URLs)

✅ **Sin URLs externas** — verificado en código real. No requiere cambios.

### Lógica de Rutas Relativas — Cómo Calcularlas

Los HTMLs de `packages/pdf-generator/` se ejecutan con Puppeteer usando `file:///` + ruta absoluta. Puppeteer usa las rutas relativas del HTML respecto al directorio del HTML mismo.

**Estructura de referencia:**

```
packages/
├── assets/images/peru/86.jpg          ← destino
└── pdf-generator/presentacion.html    ← origen (el HTML)
```

**Cálculo:** Desde `packages/pdf-generator/`, para llegar a `packages/assets/`:

- Subir un nivel: `../` → llega a `packages/`
- Entrar a assets/images/peru/: `assets/images/peru/`
- **Resultado:** `../assets/images/peru/86.jpg` ✅

**Para el logo en email/documents:**

- Subir un nivel: `../` → llega a `packages/`
- Entrar a marketing-docs/email/documents/032026/images/: `marketing-docs/email/documents/032026/images/`
- **Resultado:** `../marketing-docs/email/documents/032026/images/logo-removebg-preview.png` ✅

### Scripts JS — No Requieren Cambios

Los scripts `generate-pdf.js` y `generate-presentacion-pdf.js` usan:

```javascript
// Patrón real (verificado en código fuente):
path.resolve(__dirname, html); // __dirname = directorio del script
```

Ambos scripts usan `path.resolve(__dirname, ...)` — por lo tanto, al moverlos con `git mv` en Historia 1.4, siguen resolviendo correctamente al directorio del script. **No requieren modificaciones de rutas.**

`packages/marketing-docs/servicios/generate-pdf.js` también usa `path.resolve(__dirname, ...)` — **sin cambios requeridos.**

### Archivos Explícitamente FUERA DE SCOPE

Los siguientes archivos tienen URLs de `raw.githubusercontent.com` pero **NO deben modificarse** en esta historia:

1. **`packages/marketing-docs/email/**/\*.html`\*\* (correos de marzo, mayo, julio 2026):
   - Son documentos de email marketing. Las imágenes DEBEN ser URLs absolutas porque el email se envía a destinatarios externos que no tienen acceso al filesystem local. Las URLs de GitHub son correctas y esperadas aquí.

2. **`packages/marketing-docs/email/signature/madness-signature.html`**:
   - Firma de email. Misma razón: URLs absolutas son correctas por diseño.

3. **`apps/coming-soon/index.html`** (si Historia 1.3 fue implementada):
   - La landing "coming-soon" requiere análisis separado. No está en scope de esta historia.

4. **`resources/web-en-contruccion/index.html`** (si Historia 1.3 NO fue implementada):
   - Es responsabilidad de Historia 1.3 manejar este archivo.

### Verificación Rápida (PowerShell) — Recetas de Comandos

```powershell
# AC1: Verificar que no quedan URLs externas en packages/
Get-ChildItem -Recurse -Path packages -Include "*.html" |
  Select-String "raw.githubusercontent.com"
# → Resultado esperado: sin output (lista vacía)

# Ver qué archivos tienen URLs antes de empezar:
Get-ChildItem -Recurse -Path packages -Include "*.html" |
  Select-String "raw.githubusercontent.com" |
  Select-Object Path, LineNumber, Line

# AC2/AC3: Generar PDFs y verificar
node packages/pdf-generator/generate-pdf.js
node packages/pdf-generator/generate-presentacion-pdf.js
```

### Contexto de Puppeteer y `networkidle0`

Los scripts usan `waitUntil: "networkidle0"` — Puppeteer espera hasta que no haya actividad de red por 500ms. Con URLs absolutas de GitHub, esto puede tomar hasta 60 segundos por imagen (timeout configurado). Con rutas relativas locales, el tiempo de carga es instantáneo y `networkidle0` se dispara inmediatamente — los PDFs se generan en segundos en lugar de minutos.

**Este es el impacto directo del refactor en NFR1 (build offline) y en la velocidad de generación de PDFs.**

### Sobre el archivo `propuesta-cabalgata-2026.html`

El documento activo en el editor del usuario es `resources/trips/cabalgata/propuesta-cabalgata-2026.html` (actualmente en `resources/trips/cabalgata/`, moviéndose a `packages/assets/images/cabalgata/` en Historia 1.4). Este archivo **no contiene URLs de `raw.githubusercontent.com`** — fue verificado y está fuera de scope de esta historia.

---

## Inteligencia de Historias Previas

### Historia 1.1 (Configuración del Monorepo Raíz)

- **Convención de commits:** `feat: descripción en minúsculas`
- **Branch de trabajo:** `master`

### Historia 1.2 (Migración web/ → apps/web/)

- **Convención de scope npm:** `@madness/` como prefijo

### Historia 1.3 (apps/coming-soon/)

- **Patrón de package.json mínimo:** `name` + `version` + `private: true` + `description`

### Historia 1.4 (Reorganización resources/ → packages/) — **PREREQUISITO DIRECTO**

- **Esta historia es prerequisito de 1.5.** Los HTMLs DEBEN estar en `packages/` antes de implementar 1.5.
- Los scripts JS (`generate-pdf.js`, `generate-presentacion-pdf.js`, `servicios/generate-pdf.js`) usan `path.resolve(__dirname, ...)` — **verificado en código real** — no necesitan cambios de rutas.
- La carpeta fuente `resources/sevices/` tiene typo histórico; en `packages/` el destino es `servicios/` (correcto).
- Puppeteer versión `^24.41.0` declarada en `devDependencies` de la raíz.

---

## References

- [Source: `_bmad-output/planning-artifacts/epics.md` — Story 1.5: Refactor de URLs Externas en HTMLs de Marketing]
- [Source: `_bmad-output/planning-artifacts/epics.md` — FR3, FR4, FR5] — Requisitos funcionales cubiertos
- [Source: `_bmad-output/implementation-artifacts/1-4-reorganizacion-resources-en-packages.md`] — Historia prerequisito (estructura packages/)
- [Source: `resources/company-document/generate-pdf.js`] — Script verificado: usa `path.resolve(__dirname, html)` — sin cambios de rutas necesarios
- [Source: `resources/company-document/generate-presentacion-pdf.js`] — Script verificado: usa `path.resolve(__dirname, html)` — sin cambios de rutas necesarios
- [Source: `resources/sevices/generate-pdf.js`] — Script verificado: usa `path.resolve(__dirname, ...)` — sin cambios necesarios
- [Análisis real] — `resources/sevices/servicios-madness.html` verificado: sin ocurrencias de `raw.githubusercontent.com`
- [Análisis real] — Inventario completo de URLs externas en HTMLs de company-document: 9 ocurrencias en 6 archivos

---

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini 3.5 Flash (High)

### Debug Log References

- Ninguno (toda la ejecución completada con éxito sin errores en la generación local de PDFs).

### Completion Notes List

- Se auditaron todos los HTMLs bajo `packages/`.
- Se reemplazaron todas las referencias a `https://raw.githubusercontent.com` por rutas relativas locales en los 6 HTMLs de `packages/pdf-generator/` (tanto la imagen `peru/86.jpg` como el logo `logo-removebg-preview.png`).
- Se corrigieron los enlaces rotos de los logos (`logo-v4.png` y `logo-removebg-preview.png`) en los HTMLs de `packages/pdf-generator/` y en `servicios-madness.html` que apuntaban a las ubicaciones previas a la migración del monorepo (`web/` en vez de `apps/web/` y `email/` en vez de `marketing-docs/email/`).
- Se verificó que los archivos en `packages/marketing-docs/servicios/servicios-madness.html` ya no contienen URLs externas de GitHub.
- Se verificó que los correos en `packages/marketing-docs/email/` preservan sus URLs absolutas por diseño de email.
- Se ejecutaron los generadores de PDF locales (`generate-pdf.js` y `generate-presentacion-pdf.js`) confirmando la correcta creación offline de las 3 propuestas comerciales y las 3 presentaciones.
- Se confirmaron todos los criterios de aceptación (AC1, AC2 y AC3) y se realizó el commit correspondiente con los cambios de la historia.

### File List

**Archivos a MODIFICAR (reemplazar URLs externas por rutas relativas locales y corregir rutas de logos):**

- `packages/pdf-generator/presentacion-seismiles.html` — 1 URL externa + logos corregidos
- `packages/pdf-generator/presentacion-seismiles-en.html` — 1 URL externa + logos corregidos
- `packages/pdf-generator/presentacion-seismiles-pt.html` — 1 URL externa + logos corregidos
- `packages/pdf-generator/propuesta-comercial-seismiles.html` — 2 URLs externas + logos corregidos
- `packages/pdf-generator/propuesta-comercial-seismiles-en.html` — 2 URLs externas + logos corregidos
- `packages/pdf-generator/propuesta-comercial-seismiles-pt.html` — 2 URLs externas + logos corregidos
- `packages/marketing-docs/servicios/servicios-madness.html` — logos corregidos

**Archivos VERIFICADOS — sin cambios requeridos:**

- `packages/pdf-generator/generate-pdf.js` — usa `__dirname`, sin rutas rotas
- `packages/pdf-generator/generate-presentacion-pdf.js` — usa `__dirname`, sin rutas rotas
- `packages/marketing-docs/servicios/generate-pdf.js` — usa `__dirname`, sin rutas rotas
- `packages/marketing-docs/email/**/*.html` — URLs absolutas correctas por diseño (emails)

---

## Change Log

- **2026-06-18**: Refactorizar las URLs externas a GitHub en `packages/pdf-generator/*.html` para apuntar a rutas relativas locales. Se verificó la generación offline exitosa de los PDFs y se confirmaron los criterios AC1, AC2 y AC3.
- **2026-06-18**: Corregir rutas relativas rotas de logos (`logo-v4.png` y `logo-removebg-preview.png`) debido al movimiento de carpetas del monorepo (`web/` -> `apps/web/` y `email/` -> `marketing-docs/email/`), solucionando las imágenes rotas en los PDFs generados.

---

### Review Findings

- [x] [Review][Patch] Ruta de imagen de portada en presentaciones SeisMiles — verificada: `../../../apps/coming-soon/images/peru/86.jpg` resuelve correctamente (archivo existe). Sin acción requerida.
