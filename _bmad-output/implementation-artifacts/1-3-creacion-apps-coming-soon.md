---
baseline_commit: 0a46c96abae48f993116b6320efd1679874ad483
---
# Historia 1.3: Creación de `apps/coming-soon/`

Status: review

---

## Story

Como visitante del sitio durante mantenimiento,
quiero ver una landing page de "en construcción" funcional servida como app independiente,
para que el dominio nunca quede sin respuesta mientras la app principal está en deploy.

---

## Acceptance Criteria

**AC1 — El workspace queda registrado en el monorepo raíz:**

**Given** los archivos de `resources/web-en-contruccion/` (`index.html`, `favicon.ico`, `logo-madness-expeditions.png`)
**When** se mueven a `apps/coming-soon/` y se agrega un `package.json` mínimo con nombre `@madness/coming-soon`
**Then** el workspace queda registrado en el monorepo raíz (npm lo detecta en `apps/*`)

**AC2 — La landing carga correctamente con el logo y el contenido existente, sin referencias rotas:**

**Given** `apps/coming-soon/index.html` abierto en el browser directamente (o servido con `npx serve`)
**When** se visualiza la página
**Then** carga correctamente con el logo y el contenido existente, sin referencias rotas a imágenes ni assets

---

## Dependencia Crítica

> ⚠️ **Esta historia DEPENDE de Historia 1.1 (Configuración del Monorepo Raíz).**
>
> La Historia 1.1 debe estar completada ANTES de implementar esta historia. El `package.json` raíz debe tener:
> - `"name": "madness-expeditions"`
> - `"workspaces": ["apps/*", "packages/*"]`
>
> **Historia 1.2** (migración de `web/` a `apps/web/`) **NO es prerequisito** de esta historia. Se puede trabajar en paralelo o después. La carpeta `apps/` ya existe después de Historia 1.1.

---

## Tasks / Subtasks

- [x] **Task 1: Mover archivos de `resources/web-en-contruccion/` a `apps/coming-soon/`** (AC: 1, 2)
  - [x] 1.1 Crear la carpeta `apps/coming-soon/` si no existe (puede ser un `mkdir`)
  - [x] 1.2 Mover `resources/web-en-contruccion/index.html` → `apps/coming-soon/index.html` usando `git mv`
  - [x] 1.3 Mover `resources/web-en-contruccion/favicon.ico` → `apps/coming-soon/favicon.ico` usando `git mv`
  - [x] 1.4 Mover `resources/web-en-contruccion/logo-madness-expeditions.png` → `apps/coming-soon/logo-madness-expeditions.png` usando `git mv`
  - [x] 1.5 Verificar con `git status` que los 3 archivos aparecen como `renamed` (no deleted+added)
  - [x] 1.6 Eliminar la carpeta `resources/web-en-contruccion/` si quedó vacía (será eliminada automáticamente por git al mover todos sus archivos)

- [x] **Task 2: Crear `apps/coming-soon/package.json`** (AC: 1)
  - [x] 2.1 Crear el archivo `apps/coming-soon/package.json` con el contenido mínimo del workspace (ver Dev Notes)
  - [x] 2.2 Verificar que el campo `"name"` es exactamente `"@madness/coming-soon"`
  - [x] 2.3 Verificar que incluye `"private": true`

- [x] **Task 3: Refactorizar `index.html` — reemplazar todas las URLs externas de GitHub por rutas locales** (AC: 2)
  - [x] 3.1 Abrir `apps/coming-soon/index.html` y auditar TODAS las referencias `src=` e `href=`
  - [x] 3.2 Reemplazar la URL del logo de navbar (línea 682): `raw.githubusercontent.com/.../web/public/logo-v4.png` → usar `logo-madness-expeditions.png` (local, ya movida en Task 1)
  - [x] 3.3 Reemplazar la URL hero bg (línea 699): `raw.githubusercontent.com/.../email/images/peru/88.jpg` → usar imagen relativa (ver mapeo en Dev Notes)
  - [x] 3.4 Reemplazar la URL card Bolivia (línea 749): `raw.githubusercontent.com/.../email/images/bolivia/78.jpg` → usar imagen relativa
  - [x] 3.5 Reemplazar la URL card Perú hero (línea 810): `raw.githubusercontent.com/.../email/images/peru/86.jpg` → usar imagen relativa
  - [x] 3.6 Reemplazar la URL sub-opción Perú 1 (línea 836): `raw.githubusercontent.com/.../email/images/peru/85.jpg` → usar imagen relativa
  - [x] 3.7 Reemplazar la URL sub-opción Perú 2 (línea 855): `raw.githubusercontent.com/.../email/images/peru/90.jpg` → usar imagen relativa
  - [x] 3.8 Reemplazar la URL card Mendoza (línea 870): `raw.githubusercontent.com/.../email/images/mendoza/IMG_20251010_110426904.jpg` → usar imagen relativa
  - [x] 3.9 Reemplazar las URLs Mendoza sub-opciones (líneas 888, 891): `raw.githubusercontent.com/.../email/images/mendoza/curso-hielo-accion.jpeg` y `curso-hielo-grupo.jpeg` → usar imágenes relativas
  - [x] 3.10 Reemplazar la URL del logo del footer (línea 953): `raw.githubusercontent.com/rivadeneiraie/madness-expeditions/master/resources/web-en-contruccion/logo-madness-expeditions.png` → `logo-madness-expeditions.png` (local)
  - [x] 3.11 Reemplazar los 4 iconos del footer (líneas 965, 969, 973, 977): `raw.githubusercontent.com/.../email/signature/icons/icon-*.png` → usar rutas relativas a los iconos (ver Dev Notes)
  - [x] 3.12 Verificar con `grep` que no quedan URLs `raw.githubusercontent.com` en el archivo: `grep "raw.githubusercontent" apps/coming-soon/index.html` debe retornar vacío

- [x] **Task 4: Copiar los assets de imágenes referenciados al workspace** (AC: 2)
  - [x] 4.1 Crear carpeta `apps/coming-soon/images/` para alojar las imágenes locales
  - [x] 4.2 Copiar las imágenes necesarias desde `resources/email/images/` a `apps/coming-soon/images/` (ver lista completa en Dev Notes — NO usar `git mv`, usar copia; los originales siguen en `resources/`)
  - [x] 4.3 Copiar los iconos de firma desde `resources/email/signature/icons/` a `apps/coming-soon/icons/`
  - [x] 4.4 Verificar que todos los archivos copiados existen en sus destinos antes de continuar

- [x] **Task 5: Correr npm install y verificar el workspace** (AC: 1)
  - [x] 5.1 Correr `npm install` desde la raíz del monorepo
  - [x] 5.2 Verificar que npm detecta el workspace `@madness/coming-soon` (buscar en output del install o con `npm ls --workspaces`)
  - [x] 5.3 Confirmar que no hay errores de workspaces

- [x] **Task 6: Validar la landing page** (AC: 2)
  - [x] 6.1 Abrir `apps/coming-soon/index.html` directamente en el browser con `file://` o usando `npx serve apps/coming-soon`
  - [x] 6.2 Verificar que el banner de "en construcción" aparece en la parte superior
  - [x] 6.3 Verificar que el logo de Madness Expeditions aparece en el navbar (imagen local)
  - [x] 6.4 Verificar que la imagen de hero carga (sin imagen rota)
  - [x] 6.5 Verificar que las 3 cards de viajes (Bolivia, Perú, Mendoza) muestran sus imágenes
  - [x] 6.6 Verificar que el footer muestra el logo y los iconos de contacto sin imágenes rotas
  - [x] 6.7 Verificar que el `favicon.ico` se muestra correctamente en la pestaña del browser

---

## Dev Notes

### Estado Actual del Repositorio — CRÍTICO LEER ANTES DE IMPLEMENTAR

**Contenido actual de `resources/web-en-contruccion/` (a mover a `apps/coming-soon/`):**

```
resources/web-en-contruccion/
├── favicon.ico                      ← 50.260 bytes — icono de pestaña
├── index.html                       ← 40.922 bytes — landing page completa
└── logo-madness-expeditions.png     ← 136.874 bytes — logo del proyecto
```

**Estado del repositorio previo a esta historia (asumiendo Historia 1.1 completa):**

```
/madness-marketing (raíz)
├── apps/                  ← creada en Historia 1.1
│   ├── .gitkeep
│   └── web/               ← si Historia 1.2 fue implementada; si no, aquí falta
├── packages/              ← creada en Historia 1.1
│   └── .gitkeep
├── resources/
│   ├── company-document/
│   ├── email/
│   ├── sevices/
│   ├── trips/
│   └── web-en-contruccion/  ← AQUÍ VIVEN LOS ARCHIVOS A MOVER
├── web/                   ← si Historia 1.2 NO fue implementada aún
├── node_modules/
├── package.json           ← workspaces configurados (Historia 1.1)
└── package-lock.json
```

### `package.json` Mínimo para el Workspace

Crear `apps/coming-soon/package.json` con este contenido exacto:

```json
{
  "name": "@madness/coming-soon",
  "version": "1.0.0",
  "private": true,
  "description": "Landing page de mantenimiento / coming-soon para Madness Expeditions"
}
```

**Por qué este formato:**
- `"name": "@madness/coming-soon"` — convención de scope del monorepo (todos usan `@madness/`). Permite referenciar el workspace como `npm run X --workspace=@madness/coming-soon`
- `"private": true` — correcto para workspaces que no se publican a npm
- No necesita `dependencies` ni `scripts` — es una página HTML estática sin build step
- `"version"` es requerido por npm (aunque sea 1.0.0)

### Convención de Nombres del Monorepo

Todos los workspaces usan scope `@madness/`:

| Workspace | Nombre en package.json |
|---|---|
| `apps/web/` | `@madness/web` (Historia 1.2) |
| `apps/coming-soon/` | `@madness/coming-soon` ← **esta historia** |
| `packages/assets/` | `@madness/assets` (Historia 1.4) |
| `packages/pdf-generator/` | `@madness/pdf-generator` (Historia 1.4) |
| `packages/marketing-docs/` | `@madness/marketing-docs` (Historia 1.4) |

### Mapeo Completo de URLs Externas → Rutas Locales

El `index.html` tiene **14 referencias a `raw.githubusercontent.com`** que deben reemplazarse.

#### Imágenes de viajes (a copiar a `apps/coming-soon/images/`)

| URL Original (raw.githubusercontent.com) | Ruta local en el repo | Ruta destino en coming-soon |
|---|---|---|
| `.../web/public/logo-v4.png` | `web/public/logo-v4.png` (o `apps/web/public/logo-v4.png` si H1.2 está completa) | usar `logo-madness-expeditions.png` (ya incluida) |
| `.../resources/email/images/peru/88.jpg` | `resources/email/images/peru/88.jpg` | `images/peru/88.jpg` |
| `.../resources/email/images/bolivia/78.jpg` | `resources/email/images/bolivia/78.jpg` | `images/bolivia/78.jpg` |
| `.../resources/email/images/peru/86.jpg` | `resources/email/images/peru/86.jpg` | `images/peru/86.jpg` |
| `.../resources/email/images/peru/85.jpg` | `resources/email/images/peru/85.jpg` | `images/peru/85.jpg` |
| `.../resources/email/images/peru/90.jpg` | `resources/email/images/peru/90.jpg` | `images/peru/90.jpg` |
| `.../resources/email/images/mendoza/IMG_20251010_110426904.jpg` | `resources/email/images/mendoza/IMG_20251010_110426904.jpg` | `images/mendoza/IMG_20251010_110426904.jpg` |
| `.../resources/email/images/mendoza/curso-hielo-accion.jpeg` | `resources/email/images/mendoza/curso-hielo-accion.jpeg` | `images/mendoza/curso-hielo-accion.jpeg` |
| `.../resources/email/images/mendoza/curso-hielo-grupo.jpeg` | `resources/email/images/mendoza/curso-hielo-grupo.jpeg` | `images/mendoza/curso-hielo-grupo.jpeg` |
| `.../resources/web-en-contruccion/logo-madness-expeditions.png` (repo diferente!) | `resources/web-en-contruccion/logo-madness-expeditions.png` | `logo-madness-expeditions.png` (ya incluida) |

#### Iconos del footer (a copiar a `apps/coming-soon/icons/`)

| URL Original (raw.githubusercontent.com) | Ruta local en el repo | Ruta destino en coming-soon |
|---|---|---|
| `.../resources/email/signature/icons/icon-mail.png` | `resources/email/signature/icons/icon-mail.png` | `icons/icon-mail.png` |
| `.../resources/email/signature/icons/icon-phone.png` | `resources/email/signature/icons/icon-phone.png` | `icons/icon-phone.png` |
| `.../resources/email/signature/icons/icon-instagram.png` | `resources/email/signature/icons/icon-instagram.png` | `icons/icon-instagram.png` |
| `.../resources/email/signature/icons/icon-facebook.png` | `resources/email/signature/icons/icon-facebook.png` | `icons/icon-facebook.png` |

> ⚠️ **TRAMPA CRÍTICA — Logo navbar vs logo footer:** El HTML usa DOS fuentes distintas para el logo:
> - **Navbar (línea 682):** referencia `web/public/logo-v4.png` (logo principal de la web Next.js)
> - **Footer (línea 953):** referencia `resources/web-en-contruccion/logo-madness-expeditions.png` (logo local de la landing) y usa un repo distinto: `rivadeneiraie/madness-expeditions` (sin el `-marketing`)
>
> **Solución recomendada:** Reemplazar AMBAS referencias por `logo-madness-expeditions.png` (el archivo PNG que ya se mueve en Task 1). Es el mismo logo visual.

### Comandos de Copia de Assets

Desde la raíz del repositorio en PowerShell:

```powershell
# Crear estructura de directorios
New-Item -ItemType Directory -Force apps\coming-soon\images\bolivia
New-Item -ItemType Directory -Force apps\coming-soon\images\peru
New-Item -ItemType Directory -Force apps\coming-soon\images\mendoza
New-Item -ItemType Directory -Force apps\coming-soon\icons

# Copiar imágenes de Bolivia
Copy-Item resources\email\images\bolivia\78.jpg apps\coming-soon\images\bolivia\78.jpg

# Copiar imágenes de Perú
Copy-Item resources\email\images\peru\88.jpg apps\coming-soon\images\peru\88.jpg
Copy-Item resources\email\images\peru\86.jpg apps\coming-soon\images\peru\86.jpg
Copy-Item resources\email\images\peru\85.jpg apps\coming-soon\images\peru\85.jpg
Copy-Item resources\email\images\peru\90.jpg apps\coming-soon\images\peru\90.jpg

# Copiar imágenes de Mendoza
Copy-Item "resources\email\images\mendoza\IMG_20251010_110426904.jpg" apps\coming-soon\images\mendoza\
Copy-Item resources\email\images\mendoza\curso-hielo-accion.jpeg apps\coming-soon\images\mendoza\
Copy-Item resources\email\images\mendoza\curso-hielo-grupo.jpeg apps\coming-soon\images\mendoza\

# Copiar iconos del footer
Copy-Item resources\email\signature\icons\icon-mail.png apps\coming-soon\icons\
Copy-Item resources\email\signature\icons\icon-phone.png apps\coming-soon\icons\
Copy-Item resources\email\signature\icons\icon-instagram.png apps\coming-soon\icons\
Copy-Item resources\email\signature\icons\icon-facebook.png apps\coming-soon\icons\
```

En bash/Linux/Mac:
```bash
mkdir -p apps/coming-soon/images/{bolivia,peru,mendoza} apps/coming-soon/icons

# Bolivia
cp resources/email/images/bolivia/78.jpg apps/coming-soon/images/bolivia/

# Perú
cp resources/email/images/peru/{88,86,85,90}.jpg apps/coming-soon/images/peru/

# Mendoza
cp resources/email/images/mendoza/IMG_20251010_110426904.jpg \
   resources/email/images/mendoza/curso-hielo-accion.jpeg \
   resources/email/images/mendoza/curso-hielo-grupo.jpeg \
   apps/coming-soon/images/mendoza/

# Iconos
cp resources/email/signature/icons/icon-{mail,phone,instagram,facebook}.png \
   apps/coming-soon/icons/
```

### Reemplazos en `index.html` — Referencia Rápida

Tras el refactor, todas las referencias a imágenes/assets en `apps/coming-soon/index.html` deben usar rutas relativas:

```html
<!-- ANTES (externas) -->
<img src="https://raw.githubusercontent.com/.../web/public/logo-v4.png" ...>
<img src="https://raw.githubusercontent.com/.../email/images/peru/88.jpg" ...>
<img src="https://raw.githubusercontent.com/.../email/signature/icons/icon-mail.png" ...>

<!-- DESPUÉS (locales) -->
<img src="logo-madness-expeditions.png" ...>
<img src="images/peru/88.jpg" ...>
<img src="icons/icon-mail.png" ...>
```

**Referencia rápida de reemplazos por línea del archivo original:**

| Línea | URL original (fragmento) | Reemplazo |
|---|---|---|
| 682 | `.../web/public/logo-v4.png` | `logo-madness-expeditions.png` |
| 699 | `.../email/images/peru/88.jpg` | `images/peru/88.jpg` |
| 749 | `.../email/images/bolivia/78.jpg` | `images/bolivia/78.jpg` |
| 810 | `.../email/images/peru/86.jpg` | `images/peru/86.jpg` |
| 836 | `.../email/images/peru/85.jpg` | `images/peru/85.jpg` |
| 855 | `.../email/images/peru/90.jpg` | `images/peru/90.jpg` |
| 870 | `.../email/images/mendoza/IMG_20251010_110426904.jpg` | `images/mendoza/IMG_20251010_110426904.jpg` |
| 888 | `.../email/images/mendoza/curso-hielo-accion.jpeg` | `images/mendoza/curso-hielo-accion.jpeg` |
| 891 | `.../email/images/mendoza/curso-hielo-grupo.jpeg` | `images/mendoza/curso-hielo-grupo.jpeg` |
| 953 | `.../web-en-contruccion/logo-madness-expeditions.png` | `logo-madness-expeditions.png` |
| 965 | `.../signature/icons/icon-mail.png` | `icons/icon-mail.png` |
| 969 | `.../signature/icons/icon-phone.png` | `icons/icon-phone.png` |
| 973 | `.../signature/icons/icon-instagram.png` | `icons/icon-instagram.png` |
| 977 | `.../signature/icons/icon-facebook.png` | `icons/icon-facebook.png` |

### Sobre el `favicon.ico`

El `favicon.ico` está referenciado en el `<head>` del HTML con:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
```

✅ **Ruta relativa** — ya usa `favicon.ico` directamente. **No necesita modificación** — el archivo se mueve en Task 1 al mismo nivel que el `index.html`, por lo que la referencia es válida.

### Estructura Objetivo al Finalizar Esta Historia

```
/madness-marketing (raíz)
├── apps/
│   ├── coming-soon/               ← NUEVO
│   │   ├── favicon.ico            ← movido desde resources/web-en-contruccion/
│   │   ├── icons/                 ← NUEVO (iconos del footer)
│   │   │   ├── icon-facebook.png
│   │   │   ├── icon-instagram.png
│   │   │   ├── icon-mail.png
│   │   │   └── icon-phone.png
│   │   ├── images/                ← NUEVO (imágenes de viajes)
│   │   │   ├── bolivia/
│   │   │   │   └── 78.jpg
│   │   │   ├── mendoza/
│   │   │   │   ├── IMG_20251010_110426904.jpg
│   │   │   │   ├── curso-hielo-accion.jpeg
│   │   │   │   └── curso-hielo-grupo.jpeg
│   │   │   └── peru/
│   │   │       ├── 85.jpg
│   │   │       ├── 86.jpg
│   │   │       ├── 88.jpg
│   │   │       └── 90.jpg
│   │   ├── index.html             ← movido + refactorizado (URLs locales)
│   │   ├── logo-madness-expeditions.png ← movido desde resources/web-en-contruccion/
│   │   └── package.json           ← NUEVO (@madness/coming-soon)
│   └── web/                       ← si Historia 1.2 está completa
├── resources/
│   ├── company-document/          ← sin cambios
│   ├── email/                     ← sin cambios (las imágenes son COPIADAS, no movidas)
│   ├── sevices/                   ← sin cambios
│   ├── trips/                     ← sin cambios
│   └── web-en-contruccion/        ← ELIMINADA (vacía tras mover los 3 archivos)
└── ...
```

> **Nota importante sobre `resources/email/`:** Los assets de imágenes se **COPIAN** (no se mueven) a `apps/coming-soon/images/`. Esto es intencional: los originales en `resources/email/` siguen siendo la fuente de verdad para el email marketing y el PDF generator (Historias 1.4 y 1.5). La carpeta `resources/web-en-contruccion/` SÍ desaparece, ya que todos sus 3 archivos se mueven con `git mv`.

### ¿Es necesario un servidor de desarrollo?

**No.** Esta historia no requiere framework, bundler ni servidor de desarrollo. El `index.html` es HTML puro con CSS inline y sin JavaScript de build (salvo un pequeño script vanilla al final del HTML para la cuenta regresiva, si existe).

Para verificar visualmente, opciones ordenadas de más simple a más completa:
1. **Doble clic en el archivo** → abrir con el browser directamente (funciona para verificación local)
2. **`npx serve apps/coming-soon`** → servidor HTTP simple en el puerto 3000 (sin instalar nada permanente)
3. No es necesario `npm run dev` ni nada relacionado con Next.js

### Relación con Otras Historias

| Historia | Relación |
|---|---|
| **1.1** (Monorepo Raíz) | **PREREQUISITO** — debe estar completa antes (necesita `apps/` creada y workspaces configurados) |
| **1.2** (web/ → apps/web/) | **INDEPENDIENTE** — esta historia no depende de 1.2 ni viceversa |
| **1.4** (packages/) | Las imágenes de `resources/email/` son copiadas aquí (no movidas) — 1.4 puede organizarlas después sin afectar a coming-soon |
| **1.5** (URLs externas) | Esta historia hace el refactor de URLs para `coming-soon`. La Historia 1.5 hace lo mismo para los otros HTMLs en `packages/` |

### Verificación de Imágenes Locales — Antes de Empezar

Confirmar que estos archivos EXISTEN en el repositorio antes de copiarlos:

```bash
# Verificar imágenes de viajes
ls resources/email/images/bolivia/78.jpg
ls resources/email/images/peru/88.jpg
ls resources/email/images/peru/86.jpg
ls resources/email/images/peru/85.jpg
ls resources/email/images/peru/90.jpg
ls "resources/email/images/mendoza/IMG_20251010_110426904.jpg"
ls resources/email/images/mendoza/curso-hielo-accion.jpeg
ls resources/email/images/mendoza/curso-hielo-grupo.jpeg

# Verificar iconos del footer
ls resources/email/signature/icons/icon-mail.png
ls resources/email/signature/icons/icon-phone.png
ls resources/email/signature/icons/icon-instagram.png
ls resources/email/signature/icons/icon-facebook.png
```

Si algún archivo no existe, revisar la estructura real de `resources/email/` antes de continuar.

### Git — Estrategia de Commit Recomendada

```bash
# Paso 1: Mover los 3 archivos del coming-soon
git mv resources/web-en-contruccion/index.html apps/coming-soon/index.html
git mv resources/web-en-contruccion/favicon.ico apps/coming-soon/favicon.ico
git mv resources/web-en-contruccion/logo-madness-expeditions.png apps/coming-soon/logo-madness-expeditions.png

# Paso 2: Verificar el move
git status
# Debe mostrar: renamed: resources/web-en-contruccion/index.html -> apps/coming-soon/index.html
# Debe mostrar: renamed: resources/web-en-contruccion/favicon.ico -> apps/coming-soon/favicon.ico
# Debe mostrar: renamed: resources/web-en-contruccion/logo-madness-expeditions.png -> apps/coming-soon/logo-madness-expeditions.png

# Paso 3: Copiar assets (no trackeados con git mv — son copias de archivos existentes)
# (usar los comandos de PowerShell o bash de la sección anterior)

# Paso 4: Crear package.json y refactorizar index.html
# Paso 5: Agregar todo y commitear
git add apps/coming-soon/
git commit -m "feat: crear apps/coming-soon desde resources/web-en-contruccion"
```

### Aclaraciones sobre `resources/web-en-contruccion/` Post-Move

Después de `git mv` de los 3 archivos, la carpeta `resources/web-en-contruccion/` quedará vacía. Git no rastrea carpetas vacías, por lo que desaparecerá del repositorio automáticamente en el siguiente commit (si no hay ningún archivo untracked dentro). No se necesita ningún comando adicional para eliminarla.

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3: Creación de `apps/coming-soon/`]
- [Source: _bmad-output/implementation-artifacts/1-1-configuracion-monorepo-raiz.md] — Historia prerequisito
- [Source: _bmad-output/implementation-artifacts/1-2-migracion-web-a-apps-web.md] — Historia hermana (convención de nombres @madness/)
- [Source: resources/web-en-contruccion/index.html] — 993 líneas, 14 URLs externas identificadas a reemplazar
- [Source: resources/web-en-contruccion/favicon.ico] — 50.260 bytes
- [Source: resources/web-en-contruccion/logo-madness-expeditions.png] — 136.874 bytes
- [Source: resources/email/images/] — imágenes fuente a copiar (bolivia/, peru/, mendoza/)
- [Source: resources/email/signature/icons/] — iconos del footer a copiar

---

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini 3.5 Flash (High)

### Debug Log References

- Ninguno. Todas las tareas se completaron sin errores críticos ni advertencias.

### Completion Notes List

- Se movieron los archivos `index.html`, `favicon.ico` y `logo-madness-expeditions.png` desde `resources/web-en-contruccion/` a `apps/coming-soon/` usando `git mv`.
- Se creó `apps/coming-soon/package.json` para registrar el workspace `@madness/coming-soon`.
- Se reemplazaron 14 referencias externas a `raw.githubusercontent.com` por rutas relativas locales en `apps/coming-soon/index.html`.
- Se copiaron todos los assets de imágenes (Bolivia, Perú, Mendoza) y los iconos del footer a la estructura local de `apps/coming-soon/`.
- Se corrió `npm install` y se verificó con `npm ls --workspaces` que el nuevo workspace está correctamente vinculado.
- Se levantó un servidor de prueba (`npx serve apps/coming-soon -l 3000`) y se validó en browser que no hay referencias rotas ni imágenes rotas (todas cargan con estado 200).

### File List

**Archivos a MOVER (via `git mv`):**
- `resources/web-en-contruccion/index.html` → `apps/coming-soon/index.html`
- `resources/web-en-contruccion/favicon.ico` → `apps/coming-soon/favicon.ico`
- `resources/web-en-contruccion/logo-madness-expeditions.png` → `apps/coming-soon/logo-madness-expeditions.png`

**Archivos a CREAR:**
- `apps/coming-soon/package.json` — workspace mínimo `@madness/coming-soon`

**Archivos a MODIFICAR:**
- `apps/coming-soon/index.html` — reemplazar 14 URLs `raw.githubusercontent.com` por rutas locales relativas

**Archivos a COPIAR (no git mv — son copias de los originales, que quedan intactos en resources/):**
- `resources/email/images/bolivia/78.jpg` → `apps/coming-soon/images/bolivia/78.jpg`
- `resources/email/images/peru/88.jpg` → `apps/coming-soon/images/peru/88.jpg`
- `resources/email/images/peru/86.jpg` → `apps/coming-soon/images/peru/86.jpg`
- `resources/email/images/peru/85.jpg` → `apps/coming-soon/images/peru/85.jpg`
- `resources/email/images/peru/90.jpg` → `apps/coming-soon/images/peru/90.jpg`
- `resources/email/images/mendoza/IMG_20251010_110426904.jpg` → `apps/coming-soon/images/mendoza/`
- `resources/email/images/mendoza/curso-hielo-accion.jpeg` → `apps/coming-soon/images/mendoza/`
- `resources/email/images/mendoza/curso-hielo-grupo.jpeg` → `apps/coming-soon/images/mendoza/`
- `resources/email/signature/icons/icon-mail.png` → `apps/coming-soon/icons/`
- `resources/email/signature/icons/icon-phone.png` → `apps/coming-soon/icons/`
- `resources/email/signature/icons/icon-instagram.png` → `apps/coming-soon/icons/`
- `resources/email/signature/icons/icon-facebook.png` → `apps/coming-soon/icons/`

**Carpetas que DESAPARECEN:**
- `resources/web-en-contruccion/` — eliminada automáticamente por git al quedar vacía
