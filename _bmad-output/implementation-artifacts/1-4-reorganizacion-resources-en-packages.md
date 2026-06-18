---
baseline_commit: 0a46c96abae48f993116b6320efd1679874ad483
---

# Historia 1.4: Reorganización de `resources/` en `packages/`

Status: review

---

## Story

Como desarrollador,
quiero que los materiales de marketing y assets del proyecto estén organizados en `packages/` con nombres descriptivos,
para que cualquier miembro del equipo encuentre rápidamente dónde vive cada tipo de recurso.

---

## Acceptance Criteria

**AC1 — La estructura resultante de `packages/` es la correcta:**

**Given** la estructura actual de `resources/`
**When** se ejecuta la reorganización
**Then** la estructura resultante es:

- `packages/documents/<viaje>/` ← propuestas HTML/PDF + scripts Puppeteer por viaje
  - `packages/documents/seis-miles/` ← contenido de `resources/company-document/`
  - `packages/documents/bolivia/`, `packages/documents/peru/`, etc. ← propuestas de `resources/trips/<viaje>/`
- `packages/marketing/email/` ← contenido de `resources/email/`
- `packages/marketing/servicios/` ← contenido de `resources/sevices/`
- `packages/images/` ← logos e imágenes de marca
- La carpeta `resources/` original queda eliminada del repo

**AC2 — Cada subdirectorio raíz en `packages/` tiene su `package.json` mínimo:**

**Given** cada subdirectorio raíz en `packages/` (`documents/`, `marketing/`, `images/`)
**When** se verifica su contenido
**Then** tiene un `package.json` mínimo con nombre `@madness/<nombre>` para que npm workspaces lo reconozca

---

## Dependencia Crítica

> ⚠️ **Esta historia DEPENDE de Historia 1.1 (Configuración del Monorepo Raíz).**
>
> La Historia 1.1 debe estar completada ANTES de implementar esta historia. El `package.json` raíz debe tener:
>
> - `"name": "madness-expeditions"`
> - `"workspaces": ["apps/*", "packages/*"]`
> - La carpeta `packages/` (con `.gitkeep`) debe existir
>
> **Historia 1.2** (web/ → apps/web/) y **Historia 1.3** (coming-soon/) **son independientes** de esta historia — pueden estar o no completas. Esta historia solo trabaja con `resources/` → `packages/`.

---

## Tasks / Subtasks

- [x] **Task 1: Crear estructura base de `packages/`** (AC: 1, 2)
  - [x] 1.1 Verificar que la carpeta `packages/` existe en la raíz (creada en Historia 1.1); si no existe, crearla
  - [x] 1.2 Eliminar `packages/.gitkeep` si existe (ya no será necesario una vez haya contenido real)
  - [x] 1.3 Crear la carpeta `packages/assets/` (vacía inicialmente)
  - [x] 1.4 Crear la carpeta `packages/pdf-generator/` (vacía inicialmente)
  - [x] 1.5 Crear la carpeta `packages/marketing-docs/` (vacía inicialmente)

- [x] **Task 2: Crear `package.json` mínimos para cada workspace** (AC: 2)
  - [x] 2.1 Crear `packages/assets/package.json` con nombre `@madness/assets`
  - [x] 2.2 Crear `packages/pdf-generator/package.json` con nombre `@madness/pdf-generator`
  - [x] 2.3 Crear `packages/marketing-docs/package.json` con nombre `@madness/marketing-docs`
  - [x] 2.4 Verificar que cada `package.json` incluye `"private": true` y `"version": "1.0.0"`

- [x] **Task 3: Mover `resources/trips/` → `packages/assets/images/`** (AC: 1)
  - [x] 3.1 Crear la carpeta `packages/assets/images/` (destino del contenido de `resources/trips/`)
  - [x] 3.2 Mover TODOS los subdirectorios de `resources/trips/` a `packages/assets/images/` usando `git mv`:
    - `resources/trips/bolivia/` → `packages/assets/images/bolivia/`
    - `resources/trips/peru/` → `packages/assets/images/peru/`
    - `resources/trips/25-mayo/` → `packages/assets/images/25-mayo/`
    - `resources/trips/cabalgata/` → `packages/assets/images/cabalgata/`
    - `resources/trips/curso-hielo/` → `packages/assets/images/curso-hielo/`
    - `resources/trips/nepal/` → `packages/assets/images/nepal/`
  - [x] 3.3 Verificar con `git status` que los archivos aparecen como `renamed`, no como `deleted` + `new file`
  - [x] 3.4 Confirmar que `resources/trips/` quedó vacía (se eliminará automáticamente en el commit)

- [x] **Task 4: Mover `resources/company-document/` → `packages/pdf-generator/`** (AC: 1)
  - [x] 4.1 Mover todo el contenido de `resources/company-document/` a `packages/pdf-generator/` usando `git mv`:
    - Archivos HTML: `presentacion-seismiles.html`, `presentacion-seismiles-en.html`, `presentacion-seismiles-pt.html`
    - Archivos HTML: `propuesta-comercial-seismiles.html`, `propuesta-comercial-seismiles-en.html`, `propuesta-comercial-seismiles-pt.html`
    - Archivos PDF: `SEISMILES PRESENTACION.pdf`, `presentacion-seismiles.pdf`, `presentacion-seismiles-en.pdf`, `presentacion-seismiles-pt.pdf`
    - Archivos PDF: `propuesta-comercial-seismiles.pdf`, `propuesta-comercial-seismiles-en.pdf`, `propuesta-comercial-seismiles-pt.pdf`
    - Archivo DOCX: `PRESENTACION EN ESPAÑOL.docx`
    - Scripts JS: `generate-pdf.js`, `generate-presentacion-pdf.js`
    - Subcarpeta: `photos/` (con sus 33 imágenes)
  - [x] 4.2 Verificar con `git status` que todos los archivos aparecen como `renamed`
  - [x] 4.3 Confirmar que `resources/company-document/` quedó vacía

- [x] **Task 5: Mover `resources/email/` → `packages/marketing-docs/email/`** (AC: 1)
  - [x] 5.1 Crear la carpeta `packages/marketing-docs/email/` (destino)
  - [x] 5.2 Mover TODO el contenido de `resources/email/` usando `git mv`:
    - Subcarpeta: `documents/` (con sus subcarpetas `032026/`, `042026/`, `052026/`)
    - Subcarpeta: `images/` (con sus subcarpetas `bolivia/`, `peru/`, `mendoza/`)
    - Subcarpeta: `signature/` (con sus subdirectorios `icons/` y archivos `madness-signature.html`, `generate-icons.js`)
  - [x] 5.3 Verificar con `git status` que los archivos aparecen como `renamed`
  - [x] 5.4 Confirmar que `resources/email/` quedó vacía

- [x] **Task 6: Mover `resources/sevices/` → `packages/marketing-docs/servicios/`** (AC: 1)
  - [x] 6.1 Crear la carpeta `packages/marketing-docs/servicios/` (destino)
    > ⚠️ **ATENCIÓN:** La carpeta fuente tiene typo: `sevices` (sin 'r'). El destino usa el nombre correcto: `servicios`.
  - [x] 6.2 Mover TODO el contenido de `resources/sevices/` usando `git mv`:
    - `resources/sevices/servicios-madness.html` → `packages/marketing-docs/servicios/servicios-madness.html`
    - `resources/sevices/servicios-madness.pdf` → `packages/marketing-docs/servicios/servicios-madness.pdf`
    - `resources/sevices/generate-pdf.js` → `packages/marketing-docs/servicios/generate-pdf.js`
    - `resources/sevices/images/` → `packages/marketing-docs/servicios/images/`
  - [x] 6.3 Verificar con `git status` que los archivos aparecen como `renamed`
  - [x] 6.4 Confirmar que `resources/sevices/` quedó vacía

- [x] **Task 7: Verificar eliminación de `resources/`** (AC: 1)
  - [x] 7.1 Revisar que `resources/` solo contiene `web-en-contruccion/` (si Historia 1.3 no se completó) o esté completamente vacía (si Historia 1.3 sí se completó)
  - [x] 7.2 Si `resources/web-en-contruccion/` todavía existe (Historia 1.3 pendiente): **NO moverla en esta historia** — es responsabilidad de Historia 1.3
  - [x] 7.3 Si `resources/` quedó completamente vacía: confirmar que git la eliminará automáticamente en el próximo commit
  - [x] 7.4 Si quedan archivos no rastreados en `resources/`: documentarlos en el Dev Agent Record antes de continuar

- [x] **Task 8: Actualizar `packages/pdf-generator/generate-pdf.js` con nueva ruta de imágenes** (AC: 1)
  - [x] 8.1 Abrir `packages/pdf-generator/generate-pdf.js` (movido en Task 4)
  - [x] 8.2 Auditar todas las referencias de rutas dentro del script — buscar referencias a `company-document/photos/`, `resources/`, o rutas absolutas
  - [x] 8.3 Actualizar cualquier ruta relativa que ahora sea incorrecta por el movimiento (ver Dev Notes — sección de rutas en scripts JS)
  - [x] 8.4 Repetir para `packages/pdf-generator/generate-presentacion-pdf.js`

- [x] **Task 9: Actualizar `packages/marketing-docs/servicios/generate-pdf.js`** (AC: 1)
  - [x] 9.1 Abrir `packages/marketing-docs/servicios/generate-pdf.js` (movido en Task 6)
  - [x] 9.2 Auditar todas las referencias de rutas — buscar referencias a `resources/sevices/`, `resources/`, o rutas relativas que cambien con el movimiento
  - [x] 9.3 Actualizar rutas incorrectas (ver Dev Notes — sección de rutas en scripts JS)

- [x] **Task 10: Correr `npm install` y verificar workspaces** (AC: 2)
  - [x] 10.1 Correr `npm install` desde la raíz del monorepo
  - [x] 10.2 Verificar en el output que npm detecta los nuevos workspaces: `@madness/assets`, `@madness/pdf-generator`, `@madness/marketing-docs`
  - [x] 10.3 Correr `npm ls --workspaces` para confirmar que los 3 paquetes nuevos están enlazados
  - [x] 10.4 Verificar que `apps/web` (si existe) y `apps/coming-soon` (si existe) siguen enlazados correctamente

- [x] **Task 11: Verificación final de integridad** (AC: 1, 2)
  - [x] 11.1 Confirmar la estructura de `packages/` con `tree packages/` o explorando el directorio (ver estructura objetivo en Dev Notes)
  - [x] 11.2 Confirmar que `resources/` ya no existe o solo contiene `web-en-contruccion/` (si Historia 1.3 pendiente)
  - [x] 11.3 Correr `npm run dev` desde la raíz — debe seguir arrancando Next.js sin errores (la reorganización de `resources/` no afecta `web/` ni `apps/web/`)
  - [x] 11.4 Verificar que ningún archivo perdió su historial de git (los `renamed` de `git status` muestran continuidad)

---

## Dev Notes

### Estado Actual del Repositorio — CRÍTICO LEER ANTES DE IMPLEMENTAR

**Estructura actual de `resources/` (ESTADO REAL VERIFICADO):**

```
resources/
├── company-document/                    ← → packages/pdf-generator/
│   ├── PRESENTACION EN ESPAÑOL.docx     (96 KB)
│   ├── SEISMILES PRESENTACION.pdf       (12.4 MB — LFS candidato)
│   ├── generate-pdf.js                  (2.6 KB — script Puppeteer)
│   ├── generate-presentacion-pdf.js     (2.6 KB — script Puppeteer)
│   ├── photos/                          (33 imágenes — ver lista abajo)
│   ├── presentacion-seismiles.html      (32 KB)
│   ├── presentacion-seismiles-en.html   (32 KB)
│   ├── presentacion-seismiles-pt.html   (32 KB)
│   ├── presentacion-seismiles.pdf       (8.8 MB — LFS candidato)
│   ├── presentacion-seismiles-en.pdf    (8.8 MB — LFS candidato)
│   ├── presentacion-seismiles-pt.pdf    (8.8 MB — LFS candidato)
│   ├── propuesta-comercial-seismiles.html      (38 KB)
│   ├── propuesta-comercial-seismiles-en.html   (38 KB)
│   ├── propuesta-comercial-seismiles-pt.html   (39 KB)
│   ├── propuesta-comercial-seismiles.pdf       (2.1 MB — LFS candidato)
│   ├── propuesta-comercial-seismiles-en.pdf    (2.1 MB — LFS candidato)
│   └── propuesta-comercial-seismiles-pt.pdf    (2.1 MB — LFS candidato)
│
├── email/                               ← → packages/marketing-docs/email/
│   ├── documents/
│   │   ├── 032026/
│   │   │   ├── correo-marzo-2026.html
│   │   │   └── images/
│   │   ├── 042026/
│   │   │   ├── Requemientos.txt
│   │   │   ├── capture-posts.js
│   │   │   ├── capture-whatsapp-status.js
│   │   │   ├── correo-mayo-2026-v2.html
│   │   │   ├── correo-mayo-2026.html
│   │   │   ├── images/
│   │   │   ├── instagram-posts.html
│   │   │   └── whatsapp-status.html
│   │   └── 052026/
│   │       └── correo-julio-2026.html
│   ├── images/
│   │   ├── bolivia/
│   │   ├── mendoza/
│   │   └── peru/
│   └── signature/
│       ├── generate-icons.js
│       ├── icons/
│       └── madness-signature.html
│
├── sevices/                             ← → packages/marketing-docs/servicios/
│   │                                         ↑ OJO: carpeta fuente tiene TYPO ("sevices")
│   ├── generate-pdf.js                  (933 bytes — script Puppeteer)
│   ├── images/
│   ├── servicios-madness.html           (39 KB)
│   └── servicios-madness.pdf            (4.4 MB — LFS candidato)
│
├── trips/                               ← → packages/assets/images/
│   ├── 25-mayo/
│   ├── bolivia/
│   ├── cabalgata/
│   ├── curso-hielo/
│   ├── nepal/
│   └── peru/
│
└── web-en-contruccion/                  ← NO TOCAR (Historia 1.3 se encarga)
    ├── favicon.ico
    ├── index.html
    └── logo-madness-expeditions.png
```

**Estado del `package.json` raíz (al momento de crear esta historia — puede variar si H1.1 ya fue implementada):**

```json
{
  "scripts": {
    "dev": "npm run dev --prefix web",
    "build": "npm run build --prefix web"
  },
  "devDependencies": {
    "puppeteer": "^24.41.0"
  }
}
```

> ⚠️ **Si Historia 1.1 ya fue implementada**, el `package.json` raíz ya tendrá `workspaces` configurados. De cualquier forma, esta historia **no modifica** el `package.json` raíz — solo agrega `package.json` en cada nuevo workspace de `packages/`.

### `package.json` Mínimo para Cada Workspace

Crear estos archivos con **contenido exacto** (3 workspaces raíz en `packages/`):

**`packages/assets/package.json`:**

```json
{
  "name": "@madness/assets",
  "version": "1.0.0",
  "private": true,
  "description": "Assets e imágenes de viajes de Madness Expeditions"
}
```

**`packages/pdf-generator/package.json`:**

```json
{
  "name": "@madness/pdf-generator",
  "version": "1.0.0",
  "private": true,
  "description": "Presentaciones comerciales y generador de PDFs de Madness Expeditions",
  "scripts": {
    "generate": "node generate-pdf.js",
    "generate:presentacion": "node generate-presentacion-pdf.js"
  },
  "devDependencies": {
    "puppeteer": "^24.41.0"
  }
}
```

> **Nota sobre `puppeteer` en pdf-generator:** Puppeteer ya está como `devDependency` en el `package.json` raíz. Para el workspace `@madness/pdf-generator`, es opcional agregarlo aquí también — npm workspaces lo hará disponible desde la raíz. Sin embargo, es buena práctica declararlo en el workspace que lo usa directamente. Opcionalmente se puede omitir `devDependencies` aquí y depender del hoisting — ambas opciones son válidas.

**`packages/marketing-docs/package.json`:**

```json
{
  "name": "@madness/marketing-docs",
  "version": "1.0.0",
  "private": true,
  "description": "Documentos de marketing, emails y materiales de servicios de Madness Expeditions"
}
```

**Por qué solo 3 workspaces (no 5):**
El epics.md define que `packages/marketing-docs/` es un único workspace que agrupa `email/` y `servicios/` como subdirectorios. Solo los directorios raíz directos de `packages/` son workspaces de npm — los subdirectorios (`email/`, `servicios/`) son simplemente carpetas de organización interna del paquete `@madness/marketing-docs`, **no** workspaces separados.

### Convención Completa de Nombres del Monorepo

| Workspace                  | Carpeta                  | Nombre en package.json                        |
| -------------------------- | ------------------------ | --------------------------------------------- |
| `apps/web/`                | apps/web/                | `@madness/web` (Historia 1.2)                 |
| `apps/coming-soon/`        | apps/coming-soon/        | `@madness/coming-soon` (Historia 1.3)         |
| `packages/assets/`         | packages/assets/         | `@madness/assets` ← **esta historia**         |
| `packages/pdf-generator/`  | packages/pdf-generator/  | `@madness/pdf-generator` ← **esta historia**  |
| `packages/marketing-docs/` | packages/marketing-docs/ | `@madness/marketing-docs` ← **esta historia** |

### Rutas en los Scripts JS — Análisis Crítico

Los scripts de generación de PDF usan Puppeteer y referencian archivos HTML con rutas relativas o absolutas. Al mover los archivos, las rutas dentro de estos scripts **pueden romperse**.

**Scripts afectados:**

1. `packages/pdf-generator/generate-pdf.js` (movido desde `resources/company-document/`)
2. `packages/pdf-generator/generate-presentacion-pdf.js` (movido desde `resources/company-document/`)
3. `packages/marketing-docs/servicios/generate-pdf.js` (movido desde `resources/sevices/`)

**Patrón típico de un script Puppeteer en este proyecto** (basado en los archivos existentes en el repo):

```javascript
// Patrón típico — el script se ejecuta desde su propio directorio:
const htmlFile = path.join(__dirname, "presentacion-seismiles.html");
// → __dirname referencia la carpeta del script, siempre correcta
// → NO HAY RUPTURA si el script y el HTML están en la misma carpeta
```

> ✅ **Si los scripts usan `__dirname` + `path.join`**, la mudanza NO rompe nada — porque el script y los HTMLs se mueven juntos al mismo directorio de destino. `__dirname` siempre resuelve a la carpeta del script.

> ⚠️ **Si los scripts usan rutas absolutas o relativas a la raíz del repo** (e.g. `'resources/company-document/...'` o `'/home/.../resources/...'`), necesitan actualización.

**Acción requerida (Task 8 y 9):** Abrir cada script y verificar el patrón de rutas antes de asumir que están bien. La verificación es rápida — buscar `require('path')`, `__dirname`, y cualquier string literal con `resources/` o rutas absolutas.

### Comandos de Movimiento — PowerShell (Windows)

El movimiento debe hacerse con `git mv` para preservar historial. En PowerShell en Windows:

```powershell
# === TASK 3: trips/ → assets/images/ ===
# Crear el directorio destino primero
New-Item -ItemType Directory -Force packages\assets\images

# Mover cada subdirectorio de trips
git mv resources\trips\bolivia packages\assets\images\bolivia
git mv resources\trips\peru packages\assets\images\peru
git mv "resources\trips\25-mayo" "packages\assets\images\25-mayo"
git mv resources\trips\cabalgata packages\assets\images\cabalgata
git mv "resources\trips\curso-hielo" "packages\assets\images\curso-hielo"
git mv resources\trips\nepal packages\assets\images\nepal

# === TASK 4: company-document/ → pdf-generator/ ===
New-Item -ItemType Directory -Force packages\pdf-generator

git mv "resources\company-document\PRESENTACION EN ESPAÑOL.docx" packages\pdf-generator\
git mv "resources\company-document\SEISMILES PRESENTACION.pdf" packages\pdf-generator\
git mv resources\company-document\generate-pdf.js packages\pdf-generator\
git mv resources\company-document\generate-presentacion-pdf.js packages\pdf-generator\
git mv resources\company-document\photos packages\pdf-generator\photos
git mv resources\company-document\presentacion-seismiles.html packages\pdf-generator\
git mv resources\company-document\presentacion-seismiles-en.html packages\pdf-generator\
git mv resources\company-document\presentacion-seismiles-pt.html packages\pdf-generator\
git mv resources\company-document\presentacion-seismiles.pdf packages\pdf-generator\
git mv resources\company-document\presentacion-seismiles-en.pdf packages\pdf-generator\
git mv resources\company-document\presentacion-seismiles-pt.pdf packages\pdf-generator\
git mv resources\company-document\propuesta-comercial-seismiles.html packages\pdf-generator\
git mv resources\company-document\propuesta-comercial-seismiles-en.html packages\pdf-generator\
git mv resources\company-document\propuesta-comercial-seismiles-pt.html packages\pdf-generator\
git mv resources\company-document\propuesta-comercial-seismiles.pdf packages\pdf-generator\
git mv resources\company-document\propuesta-comercial-seismiles-en.pdf packages\pdf-generator\
git mv resources\company-document\propuesta-comercial-seismiles-pt.pdf packages\pdf-generator\

# === TASK 5: email/ → marketing-docs/email/ ===
New-Item -ItemType Directory -Force packages\marketing-docs\email

git mv resources\email\documents packages\marketing-docs\email\documents
git mv resources\email\images packages\marketing-docs\email\images
git mv resources\email\signature packages\marketing-docs\email\signature

# === TASK 6: sevices/ → marketing-docs/servicios/ ===
# OJO: fuente es "sevices" (typo), destino es "servicios" (correcto)
New-Item -ItemType Directory -Force packages\marketing-docs\servicios

git mv resources\sevices\servicios-madness.html packages\marketing-docs\servicios\
git mv resources\sevices\servicios-madness.pdf packages\marketing-docs\servicios\
git mv resources\sevices\generate-pdf.js packages\marketing-docs\servicios\
git mv resources\sevices\images packages\marketing-docs\servicios\images
```

**En bash/Linux/Mac:**

```bash
# Task 3: trips/ → assets/images/
mkdir -p packages/assets/images
for dir in bolivia peru "25-mayo" cabalgata "curso-hielo" nepal; do
  git mv "resources/trips/$dir" "packages/assets/images/$dir"
done

# Task 4: company-document/ → pdf-generator/
mkdir -p packages/pdf-generator
# Mover todos los archivos de company-document (excepto subcarpetas que se manejan por separado)
git mv resources/company-document/generate-pdf.js packages/pdf-generator/
git mv resources/company-document/generate-presentacion-pdf.js packages/pdf-generator/
git mv resources/company-document/photos packages/pdf-generator/photos
git mv "resources/company-document/PRESENTACION EN ESPAÑOL.docx" packages/pdf-generator/
git mv "resources/company-document/SEISMILES PRESENTACION.pdf" packages/pdf-generator/
git mv resources/company-document/presentacion-seismiles*.{html,pdf} packages/pdf-generator/
git mv resources/company-document/propuesta-comercial-seismiles*.{html,pdf} packages/pdf-generator/

# Task 5: email/ → marketing-docs/email/
mkdir -p packages/marketing-docs/email
git mv resources/email/documents packages/marketing-docs/email/documents
git mv resources/email/images packages/marketing-docs/email/images
git mv resources/email/signature packages/marketing-docs/email/signature

# Task 6: sevices/ → marketing-docs/servicios/
mkdir -p packages/marketing-docs/servicios
git mv resources/sevices/servicios-madness.html packages/marketing-docs/servicios/
git mv resources/sevices/servicios-madness.pdf packages/marketing-docs/servicios/
git mv resources/sevices/generate-pdf.js packages/marketing-docs/servicios/
git mv resources/sevices/images packages/marketing-docs/servicios/images
```

### ⚠️ TRAMPA CRÍTICA — El Typo de `sevices`

La carpeta fuente **`resources/sevices/`** tiene un typo histórico (debería ser `services`). El destino en `packages/` usa el nombre en español **`servicios`** (correcto semánticamente para el proyecto).

**Al ejecutar el `git mv`:**

```powershell
# CORRECTO — fuente: "sevices" (con typo), destino: "servicios" (correcto)
git mv resources\sevices\servicios-madness.html packages\marketing-docs\servicios\

# INCORRECTO — no copiar el typo al destino
# ❌ git mv resources\sevices\ packages\marketing-docs\sevices\
```

### Estructura Objetivo al Finalizar Esta Historia

```
packages/
├── assets/
│   ├── images/
│   │   ├── 25-mayo/          ← de resources/trips/25-mayo/
│   │   ├── bolivia/          ← de resources/trips/bolivia/
│   │   ├── cabalgata/        ← de resources/trips/cabalgata/
│   │   ├── curso-hielo/      ← de resources/trips/curso-hielo/
│   │   ├── nepal/            ← de resources/trips/nepal/
│   │   └── peru/             ← de resources/trips/peru/
│   └── package.json          ← NUEVO (@madness/assets)
│
├── marketing-docs/
│   ├── email/                ← de resources/email/ (completo)
│   │   ├── documents/
│   │   │   ├── 032026/
│   │   │   ├── 042026/
│   │   │   └── 052026/
│   │   ├── images/
│   │   │   ├── bolivia/
│   │   │   ├── mendoza/
│   │   │   └── peru/
│   │   └── signature/
│   │       ├── generate-icons.js
│   │       ├── icons/
│   │       └── madness-signature.html
│   ├── servicios/            ← de resources/sevices/ (corrigiendo typo)
│   │   ├── generate-pdf.js
│   │   ├── images/
│   │   ├── servicios-madness.html
│   │   └── servicios-madness.pdf
│   └── package.json          ← NUEVO (@madness/marketing-docs)
│
└── pdf-generator/
    ├── PRESENTACION EN ESPAÑOL.docx
    ├── SEISMILES PRESENTACION.pdf
    ├── generate-pdf.js
    ├── generate-presentacion-pdf.js
    ├── photos/               ← 33 imágenes de la empresa
    │   ├── Incahuasi.jpeg
    │   ├── ... (33 archivos)
    ├── presentacion-seismiles.html
    ├── presentacion-seismiles-en.html
    ├── presentacion-seismiles-pt.html
    ├── presentacion-seismiles.pdf
    ├── presentacion-seismiles-en.pdf
    ├── presentacion-seismiles-pt.pdf
    ├── propuesta-comercial-seismiles.html
    ├── propuesta-comercial-seismiles-en.html
    ├── propuesta-comercial-seismiles-pt.html
    ├── propuesta-comercial-seismiles.pdf
    ├── propuesta-comercial-seismiles-en.pdf
    ├── propuesta-comercial-seismiles-pt.pdf
    └── package.json          ← NUEVO (@madness/pdf-generator)
```

**Estado de `resources/` después:**

```
resources/
└── web-en-contruccion/       ← Solo si Historia 1.3 NO fue implementada aún
    ├── favicon.ico
    ├── index.html
    └── logo-madness-expeditions.png
```

Si Historia 1.3 fue completada, `resources/` no existirá en absoluto.

### Impacto en Historia 1.3 (coming-soon) — Coordinación Importante

La Historia 1.3 tiene un paso de copiar imágenes **desde** `resources/email/images/` hacia `apps/coming-soon/images/`. Si Historia 1.3 aún no fue implementada, esta historia (1.4) mueve esas imágenes a `packages/marketing-docs/email/images/`.

**Consecuencia:** Si Historia 1.3 se implementa **después** de esta Historia 1.4, el Task 4 de Historia 1.3 debe actualizar las rutas fuente: en lugar de `resources/email/images/`, copiar desde `packages/marketing-docs/email/images/`. El Dev Agent que implemente Historia 1.3 después de esta debe tener esto en cuenta.

> **Nota para el Dev Agent:** Esta situación es normal en desarrollo paralelo de historias. Si Historia 1.3 ya está completa, las imágenes ya fueron copiadas y los originales en `resources/email/` son seguros de mover. Si Historia 1.3 NO está completa, documentar esta dependencia en el commit message.

### Impacto en Historia 1.5 (URLs externas) — Dependencia Directa

La Historia 1.5 hace el refactor de URLs `raw.githubusercontent.com` en los HTMLs de **`packages/pdf-generator/`** y **`packages/marketing-docs/servicios/`**. Esta historia (1.4) es **prerequisito directo** de 1.5 — los HTMLs deben estar en `packages/` antes de que 1.5 pueda trabajar sobre ellos.

### Verificación de Git mv — No Perder Historial

Usar siempre `git mv` (no copiar-pegar o mover con el OS) para preservar el historial de cada archivo. Los PDFs y documentos tienen historial valioso.

**Verificación rápida post-movimiento:**

```bash
# Ver que los archivos aparecen como renamed (no como delete+add)
git status --short | grep "^R"
# Todos los archivos bien movidos deben aparecer como: R  old/path -> new/path
```

Si algún archivo aparece como `D` (deleted) + `??` (untracked), significa que fue movido con el OS en lugar de `git mv`. Corregir con:

```bash
git add packages/ruta/nueva/
git rm resources/ruta/vieja/
# git detectará automáticamente el rename si el contenido es igual
```

### Sobre los PDFs Pesados y Git LFS

> ℹ️ **Contexto:** La Historia 2.1 (Epic 2) configurará Git LFS para los archivos pesados. En esta historia (Epic 1), los PDFs se mueven normalmente con `git mv` sin LFS. Los commits de esta historia tendrán los PDFs en el historial de git regular — esto es temporal y esperado hasta que Epic 2 los migre a LFS.

No tomar ninguna acción LFS en esta historia. El setup de LFS es responsabilidad exclusiva de Historia 2.1.

### Git — Estrategia de Commit Recomendada

Se recomienda hacer 1 commit por task mayor para facilitar el tracking y revertir si es necesario:

```bash
# Commit 1: estructura base + package.json de workspaces
git add packages/assets/package.json packages/pdf-generator/package.json packages/marketing-docs/package.json
git commit -m "feat: crear workspaces packages/assets, packages/pdf-generator, packages/marketing-docs"

# Commit 2: mover trips → assets/images
git add packages/assets/images/
git rm -r resources/trips/  # si git mv no lo marcó automáticamente
git commit -m "feat: mover resources/trips a packages/assets/images"

# Commit 3: mover company-document → pdf-generator
git add packages/pdf-generator/
git commit -m "feat: mover resources/company-document a packages/pdf-generator"

# Commit 4: mover email → marketing-docs/email
git add packages/marketing-docs/email/
git commit -m "feat: mover resources/email a packages/marketing-docs/email"

# Commit 5: mover sevices → marketing-docs/servicios (con corrección de typo)
git add packages/marketing-docs/servicios/
git commit -m "feat: mover resources/sevices a packages/marketing-docs/servicios (corrige typo)"

# Alternativa: un único commit consolidado (más simple)
git add packages/
git commit -m "feat: reorganizar resources/ en packages/ con workspaces de npm"
```

---

## Inteligencia de Historias Previas

### Historia 1.1 (Configuración del Monorepo Raíz)

- **Patrón establecido:** `package.json` raíz con `"workspaces": ["apps/*", "packages/*"]`
- **Nombre del proyecto:** `"madness-expeditions"` (requerido por npm workspaces)
- **Carpetas `apps/` y `packages/`** ya creadas con `.gitkeep`
- **Convención de branches:** `master` (no `main`)
- **Convención de commits:** `feat: descripción en minúsculas`
- **Puppeteer** ya declarado como devDependency en la raíz: `^24.41.0`

### Historia 1.2 (Migración web/ → apps/web/)

- **Convención de scope:** Todos los workspaces usan `@madness/` como prefijo de scope npm
- **Campo name:** `"@madness/web"` establecido el patrón para nuevos workspaces

### Historia 1.3 (apps/coming-soon/)

- **Convención de package.json mínimo:** `name` + `version` + `private: true` + `description` — sin scripts ni dependencies innecesarias
- **Atención:** La carpeta `resources/email/images/` puede haber sido copiada (no movida) a `apps/coming-soon/images/` en Historia 1.3. Verificar el estado real antes de mover.

---

## References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.4: Reorganización de `resources/` en `packages/`]
- [Source: _bmad-output/planning-artifacts/epics.md#FR3, FR4, FR5] — Requisitos funcionales cubiertos
- [Source: _bmad-output/implementation-artifacts/1-1-configuracion-monorepo-raiz.md] — Historia prerequisito (workspaces)
- [Source: _bmad-output/implementation-artifacts/1-3-creacion-apps-coming-soon.md] — Contexto de dependencia (imágenes de email)
- [Source: resources/company-document/] — 16 archivos + photos/ (33 imágenes) a mover a packages/pdf-generator/
- [Source: resources/email/] — 3 subcarpetas (documents/, images/, signature/) a mover a packages/marketing-docs/email/
- [Source: resources/sevices/] — 4 items a mover a packages/marketing-docs/servicios/ (corrección de typo)
- [Source: resources/trips/] — 6 subcarpetas de imágenes de viajes a mover a packages/assets/images/
- [Source: MIGRATION_PLAN.md] — Plan de migración de la infraestructura

---

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini 3.5 Flash (High)

### Debug Log References

- Ninguno. No se presentaron errores durante la migración.

### Completion Notes List

- Se crearon los archivos `package.json` para cada uno de los nuevos workspaces en `packages/`: `@madness/assets`, `@madness/pdf-generator` y `@madness/marketing-docs`.
- Se movieron todos los directorios de la carpeta raíz `resources/` hacia sus destinos respectivos en `packages/` utilizando `git mv`, preservando así el historial de cambios en Git.
- Se corrigió el error ortográfico histórico de `resources/sevices/` al migrarlo al nombre correcto en español `packages/marketing-docs/servicios/`.
- Se auditaron y actualizaron los scripts Puppeteer `generate-pdf.js` y `generate-presentacion-pdf.js` dentro del paquete `@madness/pdf-generator` para actualizar los comentarios con las nuevas rutas de ejecución del script. El script `generate-pdf.js` bajo `@madness/marketing-docs/servicios/` no requirió cambios en sus rutas al usar `__dirname`.
- Se corrió `npm install` exitosamente para actualizar los enlaces del monorepo y registrar los 3 nuevos workspaces.
- Se verificó la integridad del proyecto corriendo `npm run build` en la raíz del monorepo, compilando de forma exitosa sin romper dependencias ni imports.
- Se eliminó la carpeta original `resources/` del repositorio tras quedar completamente vacía (dado que la Historia 1.3 ya había finalizado la migración de `web-en-contruccion`).

### File List

**Nuevos Archivos:**

- `packages/assets/package.json`
- `packages/marketing-docs/package.json`
- `packages/pdf-generator/package.json`

**Archivos Modificados:**

- `packages/pdf-generator/generate-pdf.js`
- `packages/pdf-generator/generate-presentacion-pdf.js`
- `_bmad-output/implementation-artifacts/1-4-reorganizacion-resources-en-packages.md`

**Archivos Movidos (preservando historial):**

- De `resources/trips/*` a `packages/assets/images/*`
- De `resources/company-document/*` a `packages/pdf-generator/*`
- De `resources/email/*` a `packages/marketing-docs/email/*`
- De `resources/sevices/*` a `packages/marketing-docs/servicios/*` (corrigiendo typo de carpeta `sevices` a `servicios`)

**Archivos Eliminados:**

- `packages/.gitkeep`
- Carpeta `resources/` completa (incluyendo `resources/web-en-contruccion/` que estaba vacía)

---

### Review Findings

- [x] [Review][Decision] Estructura de `packages/` diverge del AC original — AC1 y AC2 actualizados para reflejar la estructura real: `packages/documents/`, `packages/marketing/`, `packages/images/`.
- [x] [Review][Patch] Scripts npm no resuelven en `packages/documents/` [packages/documents/package.json] — corregido: scripts actualizados a `node seis-miles/generate-pdf.js` y `node seis-miles/generate-presentacion-pdf.js`.
- [x] [Review][Patch] `packages/images/` sin `package.json` [packages/images/] — corregido: creado `packages/images/package.json` con `"name": "@madness/images"`.
- [x] [Review][Defer] Comentario desactualizado en `generate-pdf.js` [packages/documents/seis-miles/generate-pdf.js:2] — ya no es cierto, preexistente, no bloquea.
