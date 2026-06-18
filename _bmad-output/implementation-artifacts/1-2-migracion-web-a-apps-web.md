---
baseline_commit: 0a46c96abae48f993116b6320efd1679874ad483
---

# Historia 1.2: Migración de `web/` a `apps/web/`

Status: review

---

## Story

Como desarrollador,
quiero que la carpeta `web/` se mueva a `apps/web/` con todos sus archivos y configuraciones intactos,
para que la app Next.js funcione idénticamente desde su nueva ubicación sin romper imports, aliases ni el Sanity Studio embebido.

---

## Acceptance Criteria

**AC1 — Sitio carga correctamente desde la nueva ubicación:**

**Given** la carpeta `apps/web/` en su nueva ubicación  
**When** se corre `npm run dev` desde la raíz  
**Then** el sitio carga en `localhost:3000` con todas las páginas funcionales (`/`, `/viajes`, `/viajes/[slug]`, `/contacto`, `/equipo`, `/como-trabajamos`, `/studio`)

**AC2 — El alias `@/*` sigue resolviendo correctamente:**

**Given** el alias `@/*` definido en `tsconfig.json` de `apps/web/`  
**When** TypeScript compila el proyecto  
**Then** no hay errores de resolución de paths — el alias sigue apuntando a `apps/web/src/`

**AC3 — El Sanity Studio embebido funciona:**

**Given** el Sanity Studio embebido en `/studio`  
**When** se accede a `localhost:3000/studio`  
**Then** el studio carga correctamente usando las variables de entorno de `apps/web/.env.local`

---

## Dependencia Crítica

> ⚠️ **Esta historia DEPENDE de Historia 1.1 (Configuración del Monorepo Raíz).**
> 
> La Historia 1.1 debe estar completada ANTES de implementar esta historia. El `package.json` raíz debe tener:
> - `"name": "madness-expeditions"`
> - `"workspaces": ["apps/*", "packages/*"]`
> - Scripts actualizados (ver Tarea 5 de esta historia)
> 
> **Si la Historia 1.1 NO está implementada:** El `package.json` raíz actual (sin workspaces) requiere que primero se complete esa historia. Ver estado actual en Dev Notes.

---

## Tasks / Subtasks

- [x] **Task 1: Mover carpeta `web/` → `apps/web/`** (AC: 1, 2, 3)
  - [x] 1.1 Ejecutar `git mv web apps/web` para preservar el historial git de todos los archivos
  - [x] 1.2 Verificar que el directorio `apps/web/` contiene todos los archivos esperados (ver lista completa en Dev Notes)
  - [x] 1.3 Confirmar que `git status` muestra los archivos como `renamed` (no deleted+added)

- [x] **Task 2: Actualizar `tsconfig.json` en `apps/web/`** (AC: 2)
  - [x] 2.1 Abrir `apps/web/tsconfig.json`
  - [x] 2.2 Verificar que el path alias `"@/*": ["./src/*"]` ya usa ruta relativa — **no necesita cambio** si usa `./src/*` (relativo a la ubicación del `tsconfig.json`)
  - [x] 2.3 Si hubiera alguna ruta absoluta hardcodeada apuntando a `web/`, corregirla a `apps/web/`

- [x] **Task 3: Actualizar `next.config.ts` en `apps/web/`** (AC: 1)
  - [x] 3.1 Abrir `apps/web/next.config.ts`
  - [x] 3.2 Revisar la opción `turbopack.root: path.resolve(__dirname)` — en la nueva ubicación `__dirname` resuelve a `apps/web/`, que es correcto
  - [x] 3.3 Verificar que no haya ninguna ruta hardcodeada con `web/` en ninguna parte del archivo

- [x] **Task 4: Actualizar `sanity.config.ts` en `apps/web/`** (AC: 3)
  - [x] 4.1 Abrir `apps/web/sanity.config.ts`
  - [x] 4.2 Verificar que el import `"./src/sanity/schemas"` es relativo — **no necesita cambio** (es relativo al archivo)
  - [x] 4.3 Confirmar que la ruta `basePath: "/studio"` sigue siendo correcta (es una URL path, no un path de filesystem)

- [x] **Task 5: Actualizar scripts en `package.json` raíz** (AC: 1)
  - [x] 5.1 Cambiar script `"dev"` de `"npm run dev --prefix web"` → `"npm run dev --workspace=apps/web"`
  - [x] 5.2 Cambiar script `"build"` de `"npm run build --prefix web"` → `"npm run build --workspace=apps/web"`
  - [x] 5.3 Verificar que el `package.json` de `apps/web/` tiene `"name": "@madness/web"` (npm workspaces lo requiere para la sintaxis `--workspace=@madness/web`)
  - [x] 5.4 Si el nombre del workspace es `"web"` (sin scope), usar `"npm run dev --workspace=web"` en su lugar

- [x] **Task 6: Actualizar `package.json` de `apps/web/`** (AC: 1)
  - [x] 6.1 Cambiar el campo `"name"` de `"web"` → `"@madness/web"` para seguir la convención del monorepo
  - [x] 6.2 Verificar que `"private": true` se mantiene (correcto para workspaces)
  - [x] 6.3 Mantener todos los `dependencies` y `devDependencies` sin cambios

- [x] **Task 7: Actualizar `.gitignore` de `apps/web/`** (AC: 1)
  - [x] 7.1 Verificar que el `.gitignore` de `apps/web/` (movido desde `web/.gitignore`) no tiene rutas relativas que ya no apliquen
  - [x] 7.2 Si hay entradas como `/web/...` o paths absolutos, corregirlos

- [x] **Task 8: Correr npm install y validar workspaces** (AC: 1)
  - [x] 8.1 Correr `npm install` desde la raíz del monorepo
  - [x] 8.2 Verificar que npm detecta el workspace `apps/web` (o `@madness/web`)
  - [x] 8.3 Confirmar que no hay errores de workspaces

- [x] **Task 9: Validar el sitio completo** (AC: 1, 2, 3)
  - [x] 9.1 Correr `npm run dev` desde la raíz y confirmar que Next.js inicia en `localhost:3000`
  - [x] 9.2 Navegar a `/` — confirmar que la página home carga
  - [x] 9.3 Navegar a `/viajes` — confirmar listado de viajes
  - [x] 9.4 Navegar a `/contacto`, `/equipo`, `/como-trabajamos` — confirmar que cargan
  - [x] 9.5 Navegar a `/studio` — confirmar que el Sanity Studio embebido carga
  - [x] 9.6 Correr `npm run build` desde la raíz y confirmar que el build de Next.js completa sin errores TypeScript

---

## Dev Notes

### Estado Actual del Repositorio — CRÍTICO LEER ANTES DE IMPLEMENTAR

**Estado verificado del repositorio al momento de escribir esta historia:**

```
/madness-marketing (raíz)
├── .agents/
├── .git/
├── .github/
├── .gitignore          ← 15 bytes (mínimo)
├── MIGRATION_PLAN.md
├── README.md
├── _bmad/
├── _bmad-output/
├── design-artifacts/
├── docs/
├── node_modules/       ← puppeteer ^24.41.0
├── package-lock.json
├── package.json        ← SIN workspaces aún (Historia 1.1 pendiente)
├── resources/
└── web/                ← AQUÍ VIVE LA APP ACTUALMENTE
```

**El `package.json` raíz ACTUAL (sin Historia 1.1 implementada):**
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

**El `package.json` raíz REQUERIDO (después de Historia 1.1):**
```json
{
  "name": "madness-expeditions",
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "npm run dev --prefix web",
    "build": "npm run build --prefix web"
  },
  "devDependencies": {
    "puppeteer": "^24.41.0"
  }
}
```

> **Nota:** Si Historia 1.1 ya actualizó los scripts a `--workspace`, no cambiar. La Task 5 de esta historia termina de adaptar los scripts para la nueva ruta.

### Contenido Actual de `web/` (a mover íntegramente a `apps/web/`)

```
web/
├── .env.local              ← Variables de entorno de Sanity — CRÍTICO: no perder
├── .gitignore              ← 521 bytes
├── .next/                  ← Cache de build (gitignoreado — no mover, se regenera)
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts          ← Contiene turbopack.root: path.resolve(__dirname)
├── node_modules/           ← Se reinstala con npm install — NO mover
├── package-lock.json       ← Se regenera con npm install — NO mover
├── package.json            ← MODIFICAR nombre: "web" → "@madness/web"
├── postcss.config.mjs
├── public/
├── sanity.cli.ts
├── sanity.config.ts        ← Import relativo "./src/sanity/schemas" — OK
├── src/
│   ├── app/
│   │   ├── como-trabajamos/
│   │   ├── contacto/
│   │   ├── equipo/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── studio/
│   │   │   └── [[...tool]]/
│   │   │       └── page.tsx   ← import "../../../../sanity.config" (relativo — OK)
│   │   └── viajes/
│   ├── components/
│   ├── lib/
│   └── sanity/
├── tsconfig.json           ← "@/*": ["./src/*"] — relativo, no necesita cambio
└── tsconfig.tsbuildinfo    ← Cache de TypeScript — gitignoreado, no mover
```

**IMPORTANTE — qué NO mover:**
- `web/node_modules/` — se reinstala con `npm install` desde la raíz
- `web/.next/` — cache de build, se regenera con `npm run build`
- `web/package-lock.json` — se regenera con `npm install`
- `web/tsconfig.tsbuildinfo` — cache de TypeScript

**Con `git mv web apps/web`**, git mueve todo el contenido incluyendo `.env.local`, `.gitignore`, y todos los archivos fuente. Los directorios ignorados por git (`.next/`, `node_modules/`) no se mueven porque no están trackeados.

### Análisis de Paths Críticos

#### `tsconfig.json` — paths alias
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```
✅ **Relativo al archivo** — `./src/*` resuelve a `apps/web/src/` en la nueva ubicación. **No requiere cambio.**

#### `next.config.ts` — turbopack root
```typescript
turbopack: {
  root: path.resolve(__dirname),
}
```
✅ `__dirname` en Node.js siempre es el directorio del archivo en ejecución. En la nueva ubicación `apps/web/next.config.ts`, `__dirname` = `apps/web/`. **No requiere cambio.**

#### `sanity.config.ts` — import de schemas
```typescript
import { schemaTypes } from "./src/sanity/schemas";
```
✅ **Relativo al archivo** — resuelve a `apps/web/src/sanity/schemas`. **No requiere cambio.**

#### `src/app/studio/[[...tool]]/page.tsx` — import de sanity.config
```typescript
import config from "../../../../sanity.config";
```
✅ **Relativo** — 4 niveles arriba desde `src/app/studio/[[...tool]]/` llega a `apps/web/sanity.config`. **No requiere cambio.** (Antes: `web/sanity.config`. Ahora: `apps/web/sanity.config`. La ruta relativa es la misma.)

#### `.env.local` — variables de entorno
```
# contenido aproximado (79 bytes)
NEXT_PUBLIC_SANITY_PROJECT_ID=6zqw6gnm
NEXT_PUBLIC_SANITY_DATASET=production
```
✅ **No tiene paths de filesystem** — solo valores de configuración. **No requiere cambio.**

#### `sanity.cli.ts` — CLI de Sanity
Archivo de configuración del CLI de Sanity. Ruta relativa internamente — **no requiere cambio.**

### Stack Técnico de `apps/web/`

| Dependencia | Versión | Notas |
|---|---|---|
| `next` | 16.2.4 | App Router (no Pages Router) |
| `react` | 19.2.4 | React 19 |
| `react-dom` | 19.2.4 | React 19 |
| `typescript` | ^5 | Modo strict |
| `tailwindcss` | ^4 | Tailwind v4 (rompe con v3) |
| `@tailwindcss/postcss` | ^4 | Plugin PostCSS de Tailwind v4 |
| `sanity` | ^5.22.0 | Sanity Studio v3 |
| `next-sanity` | ^12.3.1 | Integración Next.js + Sanity |
| `framer-motion` | ^12.38.0 | Animaciones |
| `@sanity/image-url` | ^2.1.1 | URLs de imágenes Sanity |
| `react-swipeable` | ^7.0.2 | Gestos touch |
| `yet-another-react-lightbox` | ^3.31.0 | Lightbox de imágenes |

### Convención de Nombres de Workspaces

Todos los workspaces del monorepo usan el scope `@madness/`:
- `apps/web/` → `@madness/web`
- `apps/coming-soon/` → `@madness/coming-soon` (Historia 1.3)
- `packages/assets/` → `@madness/assets` (Historia 1.4)
- `packages/pdf-generator/` → `@madness/pdf-generator` (Historia 1.4)
- `packages/marketing-docs/` → `@madness/marketing-docs` (Historia 1.4)

### Comando de Migración Recomendado

```bash
# Desde la raíz del repositorio
git mv web apps/web
```

Este comando:
1. Mueve todos los archivos trackeados por git
2. Preserva el historial de cada archivo
3. Ignora automáticamente los archivos en `.gitignore` (`.next/`, `node_modules/`, etc.)

**Verificar después del `git mv`:**
```bash
git status
# Debe mostrar todos los archivos como: renamed: web/X -> apps/web/X
```

### Trampa Crítica — `.next/` y `node_modules/`

Al ejecutar `git mv web apps/web`, las carpetas `web/.next/` y `web/node_modules/` **no se mueven** porque están en el `.gitignore`. Esto es correcto — se regeneran automáticamente:
- `apps/web/.next/` → se crea al correr `npm run dev` o `npm run build`
- `apps/web/node_modules/` → se crea al correr `npm install` desde la raíz (npm workspaces las instala en la raíz y crea symlinks)

### Script de npm para ejecutar en workspace

Tras actualizar el `package.json` de `apps/web/` con `"name": "@madness/web"`, los scripts raíz pueden usar:

```json
{
  "scripts": {
    "dev": "npm run dev --workspace=@madness/web",
    "build": "npm run build --workspace=@madness/web"
  }
}
```

Alternativa sin scope (si se prefiere simplicidad):
```json
{
  "name": "web",
  ...
}
```
```json
{
  "scripts": {
    "dev": "npm run dev --workspace=web"
  }
}
```

**Recomendación:** Usar `@madness/web` con scope para consistencia con los demás packages.

### Rutas de Todas las Páginas a Verificar

| Ruta | Archivo fuente |
|---|---|
| `/` | `apps/web/src/app/page.tsx` |
| `/viajes` | `apps/web/src/app/viajes/page.tsx` |
| `/viajes/[slug]` | `apps/web/src/app/viajes/[slug]/page.tsx` |
| `/contacto` | `apps/web/src/app/contacto/page.tsx` |
| `/equipo` | `apps/web/src/app/equipo/page.tsx` |
| `/como-trabajamos` | `apps/web/src/app/como-trabajamos/page.tsx` |
| `/studio` | `apps/web/src/app/studio/[[...tool]]/page.tsx` |

### Variables de Entorno — `.env.local`

El archivo `web/.env.local` (79 bytes) se mueve a `apps/web/.env.local` con `git mv`. **No está trackeado por git** (está en `.gitignore`), por lo tanto **`git mv` no lo moverá**.

> ⚠️ **Acción manual requerida:** Copiar `web/.env.local` → `apps/web/.env.local` manualmente después del `git mv`.

```bash
# Después de git mv web apps/web
# El .env.local NO se mueve — copiar manualmente:
copy web\.env.local apps\web\.env.local
# (o en Linux/Mac: cp web/.env.local apps/web/.env.local)
```

El Sanity Studio necesita estas variables para funcionar (AC3).

### Estructura Objetivo al Finalizar Esta Historia

```
/madness-marketing (raíz)
├── apps/
│   └── web/                   ← MOVIDA desde web/
│       ├── .env.local          ← Copiado manualmente (no trackeado por git)
│       ├── .gitignore
│       ├── AGENTS.md
│       ├── CLAUDE.md
│       ├── README.md
│       ├── eslint.config.mjs
│       ├── next-env.d.ts
│       ├── next.config.ts
│       ├── package.json        ← name: "@madness/web"
│       ├── postcss.config.mjs
│       ├── public/
│       ├── sanity.cli.ts
│       ├── sanity.config.ts
│       ├── src/
│       └── tsconfig.json
├── packages/                   ← Vacía (creada en Historia 1.1)
├── resources/                  ← SIN CAMBIOS
├── node_modules/               ← Reinstalado por npm install
├── package.json                ← Scripts actualizados a --workspace=@madness/web
└── MIGRATION_PLAN.md           ← SIN CAMBIOS
```

**La carpeta `web/` desaparece del nivel raíz al final de esta historia.**

### Relación con Otras Historias

| Historia | Relación |
|---|---|
| **1.1** (Monorepo Raíz) | **PREREQUISITO** — debe estar completa antes |
| **1.3** (coming-soon) | Se crea `apps/coming-soon/` en paralelo o después — no depende de 1.2 |
| **1.4** (packages/) | Reorganiza `resources/` — no depende de 1.2 |
| **1.5** (URLs externas) | Refactoriza HTMLs en `packages/` — no depende de 1.2 |

---

### Project Structure Notes

**Conflictos potenciales:**
- El directorio `apps/` se creó vacío en Historia 1.1 — `git mv web apps/web` poblará correctamente ese directorio.
- Si Historia 1.1 no fue implementada, `apps/` no existe aún — `git mv web apps/web` creará `apps/` automáticamente como parte del move (git crea directorios intermedios).

**Riesgo de regresión — NINGUNO en otros packages:**
- Esta historia no toca `resources/`, `_bmad-output/`, ni ningún otro directorio raíz.
- El único riesgo es que el sitio no arranque si hay una ruta hardcodeada con `web/` que no fue actualizada.

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.2: Migración de `web/` a `apps/web/`]
- [Source: _bmad-output/implementation-artifacts/1-1-configuracion-monorepo-raiz.md] — Historia prerequisito
- [Source: web/package.json] — estado actual del workspace
- [Source: web/tsconfig.json] — alias `@/*` verificado como relativo
- [Source: web/next.config.ts] — turbopack.root verificado como seguro
- [Source: web/sanity.config.ts] — imports verificados como relativos
- [Source: web/src/app/studio/[[...tool]]/page.tsx] — import sanity.config verificado

---

## Dev Agent Record

### Agent Model Used

Antigravity / Gemini 3.5 Flash (High)

### Debug Log References
- Browser validation session: `verify_routes_1781782902531.webp`

### Completion Notes List
- Verified all website pages navigate and load successfully under `http://localhost:3000` via automated browser checks.
- Ran Next.js production build (`npm run build`) successfully with no TypeScript compilation or route generation errors.
- Confirmed Sanity Studio loads and resolves variables properly on `/studio`.

### File List

**Archivos MOVIDOS:**
- `web/` → `apps/web/` (todos los archivos trackeados en git)
- `web/.env.local` → `apps/web/.env.local` (copiado manual)

**Archivos MODIFICADOS:**
- `apps/web/package.json` — nombre actualizado a `@madness/web`
- `package.json` (raíz) — scripts `dev` y `build` actualizados para usar `--workspace=@madness/web`

### Change Log
- Finalized migration validation (Task 9). Run build and dev servers, verified routes, and marked the story status as `review`.
