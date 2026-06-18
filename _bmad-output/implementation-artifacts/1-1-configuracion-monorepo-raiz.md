---
baseline_commit: 0a46c96abae48f993116b6320efd1679874ad483
---

# Historia 1.1: Configuración del Monorepo Raíz

Status: review

---

## Story

Como desarrollador,
quiero que el `package.json` raíz configure npm workspaces apuntando a `apps/*` y `packages/*`,
para poder ejecutar comandos del monorepo desde la raíz y que las dependencias compartidas se resuelvan correctamente.

---

## Acceptance Criteria

**AC1 — Workspaces configurados e instalados:**

**Given** el `package.json` raíz del repo  
**When** se agrega la configuración `"workspaces": ["apps/*", "packages/*"]` y se corre `npm install` desde la raíz  
**Then** npm no reporta errores y los workspaces quedan enlazados

**AC2 — `npm run dev` desde la raíz arranca Next.js:**

**Given** que el monorepo está configurado  
**When** se corre `npm run dev` desde la raíz  
**Then** el servidor de desarrollo de Next.js arranca correctamente (delegando al workspace `apps/web`)

**AC3 — `npm run build` desde la raíz completa sin errores:**

**Given** que el monorepo está configurado  
**When** se corre `npm run build` desde la raíz  
**Then** el build de Next.js completa sin errores

---

## Tasks / Subtasks

- [x] **Task 1: Actualizar `package.json` raíz con workspaces** (AC: 1, 2, 3)
  - [x] 1.1 Agregar campo `"workspaces": ["apps/*", "packages/*"]`
  - [x] 1.2 Agregar campo `"name"` con valor `"madness-expeditions"` (npm workspaces requiere name en la raíz)
  - [x] 1.3 Actualizar script `"dev"` para que delegue a `apps/web` en lugar de `web`
  - [x] 1.4 Actualizar script `"build"` para que delegue a `apps/web` en lugar de `web`
  - [x] 1.5 Verificar que `devDependencies` existentes (`puppeteer`) permanezcan

- [x] **Task 2: Crear estructura de carpetas `apps/`** (AC: 1)
  - [x] 2.1 Crear la carpeta `apps/` en la raíz del repo (vacía por ahora — `web/` se mueve en Historia 1.2)
  - [x] 2.2 Crear `apps/.gitkeep` para que la carpeta vacía sea rastreada por git

- [x] **Task 3: Crear estructura de carpetas `packages/`** (AC: 1)
  - [x] 3.1 Crear la carpeta `packages/` en la raíz del repo (vacía por ahora — se popula en Historias 1.3 y 1.4)
  - [x] 3.2 Crear `packages/.gitkeep` para que la carpeta vacía sea rastreada por git

- [x] **Task 4: Validar instalación npm** (AC: 1)
  - [x] 4.1 Correr `npm install` desde la raíz y confirmar que no hay errores
  - [x] 4.2 Verificar que el `node_modules` raíz no pierde el paquete `puppeteer`
  - [x] 4.3 Confirmar que npm no reporta "workspace" errors (workspaces `apps/*` y `packages/*` pueden estar vacíos — npm lo permite)

- [x] **Task 5: Validar scripts desde la raíz** (AC: 2, 3)
  - [x] 5.1 Correr `npm run dev` desde la raíz y confirmar que Next.js arranca en `localhost:3000`
  - [x] 5.2 Correr `npm run build` desde la raíz y confirmar que el build de Next.js completa sin errores

---

## Dev Notes

### Estado Actual del Repositorio — CRÍTICO LEER ANTES DE IMPLEMENTAR

El `package.json` raíz **YA EXISTE** con el siguiente contenido:

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

**Lo que hay que cambiar:**

1. Agregar `"name"` (requerido por npm workspaces — sin él, `npm install` falla con workspaces)
2. Agregar `"workspaces": ["apps/*", "packages/*"]`
3. Cambiar `--prefix web` → `--workspace apps/web` o `--workspace=@madness/web` en los scripts (cuando `web/` se mueva a `apps/web/` en Historia 1.2)

**TRAMPA CRÍTICA — Esta historia se implementa ANTES de mover `web/` a `apps/web/`:**

- La Historia 1.2 mueve `web/` → `apps/web/`
- **En esta historia** los scripts de `dev` y `build` aún apuntan a `web/` porque `apps/web/` todavía no existe
- **Decisión de implementación:** Mantener los scripts apuntando a `web/` usando la forma de workspace que sea compatible HASTA que la Historia 1.2 cree `apps/web/`

**Alternativa recomendada para los scripts en esta historia:**
Actualizar el `package.json` raíz para que los scripts ya usen la convención de workspace pero con fallback:

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

Nota: Mantener `--prefix web` funciona en paralelo hasta que Historia 1.2 mueva la carpeta. La actualización a `--workspace apps/web` ocurre en Historia 1.2.

### Estructura de Carpetas a Crear

```
/madness-expeditions (raíz)
├── apps/                  ← CREAR (vacía, con .gitkeep)
│   └── .gitkeep
├── packages/              ← CREAR (vacía, con .gitkeep)
│   └── .gitkeep
├── web/                   ← EXISTENTE (no tocar — se mueve en Historia 1.2)
├── resources/             ← EXISTENTE (no tocar — se reorganiza en Historia 1.4)
├── package.json           ← MODIFICAR (agregar workspaces + name)
└── package-lock.json      ← SE REGENERA con npm install
```

### Comportamiento de npm workspaces con carpetas vacías

npm workspaces es tolerante a que `apps/*` y `packages/*` no tengan subpaquetes aún. Al correr `npm install` con workspaces vacíos no genera error — simplemente no enlaza nada. Esto es intencional: la estructura de carpetas se pre-crea ahora y se llena en historias subsiguientes.

**Verificación esperada tras `npm install`:**

```bash
npm warn workspaces No workspaces found:
  - apps/* (no packages found)
  - packages/* (no packages found)
```

Esto es normal y esperado en esta historia.

### Dependencias y Versiones a Preservar

| Dependencia | Versión actual | Acción                                  |
| ----------- | -------------- | --------------------------------------- |
| `puppeteer` | `^24.41.0`     | **PRESERVAR** en `devDependencies` raíz |

**No agregar** nuevas dependencias raíz en esta historia. Las dependencias de `apps/web` (Next.js, React, etc.) viven en `web/package.json` y permanecen ahí hasta Historia 1.2.

### Stack Técnico Relevante

- **Node.js**: v20.20.0 (requerido por Next.js 16)
- **npm**: debe soportar workspaces (npm 7+; Node 20 trae npm 10 — ✅ compatible)
- **Next.js**: 16.2.4 en `web/package.json` — **NO modificar** en esta historia

### Convenciones del Proyecto a Respetar

- **Nombre del package raíz**: usar `"madness-expeditions"` (consistente con el nombre del repo según MIGRATION_PLAN.md)
- **Branch activo**: `master` (no `main`)
- **Commits**: formato `feat: descripción en minúsculas`

### Archivos a NO tocar en esta Historia

- `web/` (todo su contenido) — se mueve en Historia 1.2
- `resources/` — se reorganiza en Historia 1.4
- `.gitignore` raíz — no necesita cambios para esta historia
- `package-lock.json` raíz — se regenera automáticamente con `npm install`

---

### Project Structure Notes

**Estructura resultante al finalizar esta historia:**

```
/madness-expeditions
├── apps/                  ← NUEVO (vacía, rastreada con .gitkeep)
├── packages/              ← NUEVO (vacía, rastreada con .gitkeep)
├── web/                   ← SIN CAMBIOS (Next.js app — se mueve en Historia 1.2)
├── resources/             ← SIN CAMBIOS (se reorganiza en Historia 1.4)
├── package.json           ← MODIFICADO (workspaces + name)
├── package-lock.json      ← REGENERADO por npm install
└── MIGRATION_PLAN.md      ← SIN CAMBIOS
```

**Alineación con estructura objetivo del monorepo** (del MIGRATION_PLAN.md):

- ✅ `apps/` preparada para recibir `apps/web/` (Historia 1.2) y `apps/coming-soon/` (Historia 1.3)
- ✅ `packages/` preparada para recibir los paquetes en Historia 1.4
- La estructura completa se alcanza progresivamente en todas las historias del Épico 1

**Conflictos detectados — ninguno:** Esta historia solo modifica `package.json` raíz y crea carpetas vacías. No hay riesgo de romper `web/` ni `resources/`.

---

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.1: Configuración del Monorepo Raíz]
- [Source: MIGRATION_PLAN.md#1. Nueva Arquitectura: Monorepo con Workspaces]
- [Source: _bmad-output/project-context.md#Stack Tecnológico]
- [Source: web/package.json] — estado actual del package de la app

---

## Dev Agent Record

### Agent Model Used

Gemini 3.5 Flash (High)

### Debug Log References

No debug log references needed. NPM command output checked directly in execution logs.

### Completion Notes List

- Agregado el campo `"workspaces": ["apps/*", "packages/*"]` y `"name": "madness-expeditions"` al `package.json` raíz.
- Creadas carpetas `apps/` y `packages/` vacías, rastreadas con sus respectivos archivos `.gitkeep`.
- Ejecutado `npm install` con workspaces vacíos exitosamente. Las dependencias locales (como `puppeteer`) se preservaron en `node_modules`.
- Verificado el script `dev` mediante `npm run dev` para validar que Next.js arranca en `localhost:3000`.
- Verificado el script `build` mediante `npm run build` para validar que Next.js compila el sitio de producción correctamente sin errores.

### Change Log

- Configuración inicial de npm workspaces en package.json raíz. (Fecha: 2026-06-18)
- Creación de directorios para workspaces `apps/` y `packages/`. (Fecha: 2026-06-18)

### File List

**Archivos a MODIFICAR:**

- [package.json](file:///c:/sources/github_personal/madness-marketing/package.json) (raíz)

**Archivos a CREAR:**

- [apps/.gitkeep](file:///c:/sources/github_personal/madness-marketing/apps/.gitkeep)
- [packages/.gitkeep](file:///c:/sources/github_personal/madness-marketing/packages/.gitkeep)

**Archivos que se REGENERAN automáticamente:**

- [package-lock.json](file:///c:/sources/github_personal/madness-marketing/package-lock.json) (raíz) — al correr `npm install`

---

### Review Findings

- [x] [Review][Patch] Mismatch de nombre de workspace en scripts raíz [package.json] — resuelto: `apps/web/package.json` ya declara `"name": "@madness/web"`, coincide con los scripts raíz.
