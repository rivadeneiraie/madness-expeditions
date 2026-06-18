---
stepsCompleted: ["step-01-validate-prerequisites", "step-02-design-epics", "step-03-create-stories"]
inputDocuments:
  - "MIGRATION_PLAN.md"
  - "design-artifacts/A-Product-Brief/04-platform-requirements.md"
  - "_bmad-output/project-context.md"
scope: "Universo B — Migración de Infraestructura & Deploy en VPS"
---

# madness-marketing - Epic Breakdown (Universo B: Infraestructura)

## Overview

Este documento descompone los requerimientos del plan de migración e infraestructura del proyecto Madness Expeditions en épicas e historias implementables. El objetivo es profesionalizar el repositorio para desplegarlo en un VPS propio con Gitea como servidor Git self-hosted, Docker para deploy inmutable, y Gitea Actions para CI/CD automatizado.

## Requirements Inventory

### Functional Requirements

FR1: El proyecto debe reorganizarse como monorepo con npm workspaces, separando apps/ (web, coming-soon) y packages/ (assets, pdf-generator).

FR2: La carpeta web/ debe moverse a apps/web/ manteniendo toda su funcionalidad existente (Next.js, Sanity, rutas, componentes).

FR3: Los recursos de imágenes ya existen localmente en resources/trips/. Las URLs de raw.githubusercontent.com en los HTMLs de marketing deben reemplazarse por rutas relativas a packages/assets/images/ (no hay descarga necesaria — solo refactor de paths).

FR4: El generador de PDFs (Puppeteer) debe refactorizarse para cargar todos sus recursos desde rutas locales, eliminando dependencias a URLs externas en build time.

FR5: Los archivos HTML de marketing/presentaciones deben refactorizarse para reemplazar URLs absolutas de GitHub por rutas relativas locales.

FR6: Debe configurarse un repositorio en Gitea (self-hosted en el VPS) como nuevo remote de origen del proyecto.

FR7: Git LFS debe activarse en el repositorio para gestionar PDFs y assets pesados sin degradar el rendimiento de git clone.

FR8: Debe configurarse un pipeline de CI/CD en Gitea Actions con tres jobs: Build (Next.js), PDF Generation (Puppeteer), y Deploy (al VPS).

FR9: La aplicación Next.js debe contenerizarse con Docker para deploy inmutable en el VPS.

FR10: Las variables de entorno (Sanity, GA, Brevo, etc.) deben migrarse de Vercel Secrets a Gitea Secrets para el pipeline de CI/CD.

FR11: El container registry de Gitea debe usarse para almacenar las imágenes Docker buildeadas por el pipeline.

FR12: Debe existir una landing page "coming-soon" en apps/coming-soon/ separada de la app principal de Next.js.

### NonFunctional Requirements

NFR1: El build de la aplicación debe poder ejecutarse completamente offline (sin conexión a internet), usando solo recursos locales.

NFR2: El git clone del repositorio no debe degradarse por la presencia de assets pesados — Git LFS es obligatorio para archivos > 1MB binarios.

NFR3: El deploy debe ser inmutable: cada release genera una nueva imagen Docker versionada; no se modifican imágenes en producción.

NFR4: El LCP (Largest Contentful Paint) debe mejorar al eliminar dependencia de raw.githubusercontent.com — recursos servidos desde mismo dominio o subdominio de assets.

NFR5: Las variables de entorno y secretos nunca deben estar commiteados en el repositorio (usar Gitea Secrets exclusivamente).

NFR6: El pipeline de CI/CD debe ejecutarse automáticamente en cada push a main/master.

### Additional Requirements

- Stack actual: Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Sanity CMS, Framer Motion — la reorganización NO debe romper ninguna dependencia existente.
- Variables de entorno requeridas: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, NEXT_PUBLIC_GA_MEASUREMENT_ID, BREVO_API_KEY, CONTACT_FORM_EMAIL.
- El alias @/* debe seguir apuntando a web/src/ después de la reorganización (ajustar tsconfig.json y next.config.ts en apps/web/).
- El Sanity Studio embebido en /studio debe seguir funcionando tras el movimiento a apps/web/.
- El VPS ya tiene Docker Engine, Gitea, y múltiples containers corriendo.
- El reverse proxy es Traefik (ya configurado): detecta automáticamente containers que exponen el puerto 80 y enruta por dominio. Solo requiere agregar labels de Traefik en docker-compose.yml — no se necesita configurar Nginx ni Caddy.
- Traefik gestiona SSL/TLS automáticamente (Let's Encrypt) — no hay configuración de certificados manual.
- Gitea Actions necesita un runner self-hosted en el VPS o en otra máquina con acceso al servidor.
- El docker-compose.yml del proyecto debe incluir los labels de Traefik correctos para que madnessexpeditions.com sea enrutado al container de Next.js.

### UX Design Requirements

N/A — Este universo es puramente de infraestructura, sin cambios de UI/UX para el usuario final.

### FR Coverage Map

| FR | Épica | Descripción breve |
|---|---|---|
| FR1 | Epic 1 | Configurar npm workspaces en package.json raíz |
| FR2 | Epic 1 | Mover web/ → apps/web/ con aliases y configs intactos |
| FR3 | Epic 1 | Reemplazar URLs GitHub raw por rutas relativas en HTMLs de marketing |
| FR4 | Epic 1 | Refactorizar Puppeteer/generate-pdf.js con rutas locales |
| FR5 | Epic 1 | Reorganizar resources/ en packages/ con estructura clara |
| FR6 | Epic 2 | Crear repo en Gitea y cambiar remote de origin |
| FR7 | Epic 2 | Activar Git LFS para PDFs y assets binarios pesados |
| FR8 | Epic 3 | Workflow de Gitea Actions (build + deploy jobs) |
| FR9 | Epic 3 | Dockerfile multi-stage para Next.js |
| FR10 | Epic 3 | Migrar variables de entorno a Gitea Secrets |
| FR11 | Epic 3 | Usar Gitea Container Registry para imágenes Docker |
| FR12 | Epic 1 | Crear apps/coming-soon/ desde resources/web-en-contruccion/ |

## Epic List

### Epic 1: Monorepo Local — Reorganización y Recursos Offline
El repositorio se reorganiza como monorepo con npm workspaces. La app Next.js vive en apps/web/, la landing coming-soon en apps/coming-soon/, y todos los assets y documentos de marketing en packages/. Todas las referencias a URLs externas de GitHub en los HTMLs se reemplazan por rutas relativas locales. El proyecto buildea 100% sin internet.
**FRs cubiertos:** FR1, FR2, FR3, FR4, FR5, FR12

### Epic 2: Repositorio Gitea — Remote Propio y Git LFS
Gitea en el VPS se convierte en la fuente de verdad del código. Git LFS se activa para PDFs e imágenes pesadas, garantizando clones rápidos. El historial completo migra desde GitHub.
**FRs cubiertos:** FR6, FR7

### Epic 3: Deploy Automatizado — Docker + Gitea Actions + Traefik
Cada push a master dispara un pipeline que buildea la imagen Docker de Next.js, la sube al Container Registry de Gitea, y la despliega en el VPS. Traefik detecta el container automáticamente y lo expone por el dominio. Las variables de entorno están seguras en Gitea Secrets.
**FRs cubiertos:** FR8, FR9, FR10, FR11

---

## Epic 1: Monorepo Local — Reorganización y Recursos Offline

El repositorio se reorganiza como monorepo con npm workspaces. La app Next.js vive en `apps/web/`, la landing coming-soon en `apps/coming-soon/`, y todos los assets y documentos de marketing en `packages/`. Todas las referencias a URLs externas de GitHub en los HTMLs se reemplazan por rutas relativas locales. El proyecto buildea 100% sin internet.

**FRs:** FR1, FR2, FR3, FR4, FR5, FR12 | **NFRs:** NFR1

### Story 1.1: Configuración del Monorepo Raíz

Como desarrollador,
quiero que el `package.json` raíz configure npm workspaces apuntando a `apps/*` y `packages/*`,
para poder ejecutar comandos del monorepo desde la raíz y que las dependencias compartidas se resuelvan correctamente.

**Acceptance Criteria:**

**Given** el `package.json` raíz del repo
**When** se agrega la configuración `"workspaces": ["apps/*", "packages/*"]` y se corre `npm install` desde la raíz
**Then** npm no reporta errores y los workspaces quedan enlazados

**Given** que el monorepo está configurado
**When** se corre `npm run dev` desde la raíz
**Then** el servidor de desarrollo de Next.js arranca correctamente (delegando al workspace `apps/web`)

**Given** que el monorepo está configurado
**When** se corre `npm run build` desde la raíz
**Then** el build de Next.js completa sin errores

---

### Story 1.2: Migración de `web/` a `apps/web/`

Como desarrollador,
quiero que la carpeta `web/` se mueva a `apps/web/` con todos sus archivos y configuraciones intactos,
para que la app Next.js funcione idénticamente desde su nueva ubicación sin romper imports, aliases ni el Sanity Studio embebido.

**Acceptance Criteria:**

**Given** la carpeta `apps/web/` en su nueva ubicación
**When** se corre `npm run dev` desde la raíz
**Then** el sitio carga en `localhost:3000` con todas las páginas funcionales (`/`, `/viajes`, `/viajes/[slug]`, `/contacto`, `/equipo`, `/como-trabajamos`, `/studio`)

**Given** el alias `@/*` definido en `tsconfig.json` de `apps/web/`
**When** TypeScript compila el proyecto
**Then** no hay errores de resolución de paths — el alias sigue apuntando a `apps/web/src/`

**Given** el Sanity Studio embebido en `/studio`
**When** se accede a `localhost:3000/studio`
**Then** el studio carga correctamente usando las variables de entorno de `apps/web/.env.local`

---

### Story 1.3: Creación de `apps/coming-soon/`

Como visitante del sitio durante mantenimiento,
quiero ver una landing page de "en construcción" funcional servida como app independiente,
para que el dominio nunca quede sin respuesta mientras la app principal está en deploy.

**Acceptance Criteria:**

**Given** los archivos de `resources/web-en-contruccion/` (`index.html`, `favicon.ico`, `logo-*.png`)
**When** se mueven a `apps/coming-soon/` y se agrega un `package.json` mínimo con nombre `@madness/coming-soon`
**Then** el workspace queda registrado en el monorepo raíz

**Given** `apps/coming-soon/index.html` abierto en el browser directamente
**When** se visualiza la página
**Then** carga correctamente con el logo y el contenido existente, sin referencias rotas a imágenes ni assets

---

### Story 1.4: Reorganización de `resources/` en `packages/`

Como desarrollador,
quiero que los materiales de marketing y assets del proyecto estén organizados en `packages/` con nombres descriptivos,
para que cualquier miembro del equipo encuentre rápidamente dónde vive cada tipo de recurso.

**Acceptance Criteria:**

**Given** la estructura actual de `resources/`
**When** se ejecuta la reorganización
**Then** la estructura resultante es:
- `packages/assets/images/` ← contenido de `resources/trips/`
- `packages/pdf-generator/` ← contenido de `resources/company-document/`
- `packages/marketing-docs/email/` ← contenido de `resources/email/`
- `packages/marketing-docs/servicios/` ← contenido de `resources/sevices/`
- La carpeta `resources/` original queda eliminada del repo

**Given** cada subdirectorio en `packages/`
**When** se verifica su contenido
**Then** tiene un `package.json` mínimo con nombre `@madness/<nombre>` para que npm workspaces lo reconozca

---

### Story 1.5: Refactor de URLs Externas en HTMLs de Marketing

Como desarrollador,
quiero que todos los HTMLs de marketing referencien las imágenes por rutas relativas locales en lugar de URLs de `raw.githubusercontent.com`,
para que el generador de PDFs funcione 100% offline sin depender de GitHub.

**Acceptance Criteria:**

**Given** los archivos HTML en `packages/pdf-generator/` y `packages/marketing-docs/servicios/`
**When** se hace `grep -r "raw.githubusercontent.com"` en `packages/`
**Then** el resultado está vacío — no quedan referencias a URLs externas de GitHub

**Given** los HTMLs refactorizados con rutas relativas a `packages/assets/images/`
**When** se corre `node packages/pdf-generator/generate-pdf.js` desde la raíz del repo
**Then** los PDFs se generan correctamente con todas las imágenes presentes (sin imágenes rotas ni en blanco)

**Given** que el proceso de generación corre en un entorno sin acceso a internet
**When** se ejecuta el generador de PDFs
**Then** todos los PDFs se generan exitosamente sin timeout ni errores de red

---

## Epic 2: Repositorio Gitea — Remote Propio y Git LFS

Gitea en el VPS se convierte en la fuente de verdad del código. Git LFS se activa para PDFs e imágenes pesadas, garantizando clones rápidos. El historial completo migra desde GitHub.

**FRs:** FR6, FR7 | **NFRs:** NFR2

### Story 2.1: Configuración de Git LFS y `.gitattributes`

Como desarrollador,
quiero que Git LFS esté configurado en el repo local con las reglas correctas en `.gitattributes`,
para que los PDFs y archivos binarios pesados se almacenen en LFS y no inflen el historial de Git ni degraden el `git clone`.

**Acceptance Criteria:**

**Given** el repositorio local con los PDFs en `packages/pdf-generator/` (~8-12 MB cada uno) y assets en `packages/assets/`
**When** se corre `git lfs install` y se crea `.gitattributes` con reglas para `*.pdf`, `*.png`, `*.jpg`, `*.jpeg`, `*.gif`, `*.webp`, `*.docx`
**Then** `git lfs status` muestra los archivos binarios pesados como tracked por LFS

**Given** `.gitattributes` con las reglas de LFS configuradas
**When** se hace `git add .gitattributes` y un commit
**Then** los archivos afectados quedan registrados como punteros LFS en el historial (verificable con `git lfs ls-files`)

**Given** el `.gitattributes` commiteado
**When** un segundo desarrollador hace `git clone` del repo sin LFS instalado
**Then** recibe advertencia clara de que LFS no está instalado (no descarga silenciosa de archivos corruptos)

---

### Story 2.2: Migración del Remote a Gitea

Como desarrollador,
quiero que Gitea en el VPS sea el remote `origin` del repositorio y que todo el historial y los assets LFS estén en él,
para operar con independencia total de GitHub y tener el código en infraestructura propia.

**Acceptance Criteria:**

**Given** el repositorio local con Git LFS configurado (Story 2.1 completa)
**When** se ejecutan los comandos de migración:
```bash
git remote rename origin github
git remote add origin https://<gitea-url>/<usuario>/madness-expeditions.git
git push -u origin master
git lfs push --all origin
```
**Then** Gitea muestra el repositorio con el historial completo y los archivos LFS accesibles desde la UI

**Given** Gitea como nuevo `origin`
**When** se hace `git clone` limpio del repo desde Gitea y luego `git lfs pull`
**Then** el clon trae el código y los binarios LFS se descargan correctamente

**Given** que `github` sigue siendo un remote secundario
**When** se corre `git remote -v`
**Then** se ven ambos remotes: `origin` → Gitea (principal), `github` → GitHub (backup de lectura)

---

## Epic 3: Deploy Automatizado — Docker + Gitea Actions + Traefik

Cada push a `master` dispara un pipeline que buildea la imagen Docker de Next.js, la sube al Container Registry de Gitea, y la despliega en el VPS. Traefik detecta el container automáticamente y lo expone por el dominio. Las variables de entorno están seguras en Gitea Secrets.

**FRs:** FR8, FR9, FR10, FR11 | **NFRs:** NFR3, NFR5, NFR6

### Story 3.1: Dockerfile Multi-Stage para Next.js

Como desarrollador,
quiero un `Dockerfile` multi-stage en `apps/web/` que produzca una imagen Docker minimal y lista para producción,
para que la app Next.js sea deployable como container inmutable en el VPS.

**Acceptance Criteria:**

**Given** el `Dockerfile` en `apps/web/` con stages: `deps` (instalación), `builder` (build Next.js), `runner` (Node Alpine mínimo)
**When** se corre `docker build -t madness-web .` desde `apps/web/`
**Then** la imagen se construye exitosamente sin errores

**Given** la imagen Docker construida
**When** se corre `docker run -p 3000:3000 --env-file .env.local madness-web`
**Then** el sitio responde en `localhost:3000` con todas las rutas funcionales

**Given** la imagen de producción
**When** se inspecciona con `docker images`
**Then** el tamaño final de la imagen es inferior a 500MB (Next.js standalone output)

**And** la imagen corre con usuario no-root `nextjs` (seguridad básica de containers)

---

### Story 3.2: `docker-compose.yml` con Labels de Traefik

Como operador del VPS,
quiero un `docker-compose.yml` en `infra/` que defina el servicio Next.js con los labels de Traefik correctos,
para que al hacer `docker compose up -d` el sitio quede expuesto automáticamente en el dominio configurado sin tocar Traefik manualmente.

**Acceptance Criteria:**

**Given** el `docker-compose.yml` en `infra/` con el servicio `web` y los labels de Traefik para `madnessexpeditions.com` con TLS via certresolver de Let's Encrypt
**When** se corre `docker compose up -d` en el VPS (con Traefik corriendo en la red compartida)
**Then** Traefik detecta el container y enruta `madnessexpeditions.com` al servicio Next.js en el puerto 3000

**Given** el container corriendo con los labels de Traefik
**When** se accede a `https://madnessexpeditions.com`
**Then** el sitio responde con HTTPS válido (certificado gestionado por Traefik/Let's Encrypt)

**Given** que las variables de entorno se pasan via referencia a `${VAR_NAME}` en el compose
**When** se inspecciona el `docker-compose.yml` commiteado en el repo
**Then** no hay valores sensibles hardcodeados — solo nombres de variables

---

### Story 3.3: Migración de Variables de Entorno a Gitea Secrets

Como operador del VPS,
quiero que todas las variables de entorno de producción estén almacenadas como Gitea Secrets,
para que el pipeline de CI/CD pueda usarlas de forma segura sin que nunca aparezcan en el código ni en los logs.

**Acceptance Criteria:**

**Given** las variables requeridas: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`, `BREVO_API_KEY`, `CONTACT_FORM_EMAIL`, `VPS_SSH_HOST`, `VPS_SSH_USER`, `VPS_SSH_KEY`
**When** se configuran en Gitea → Settings → Secrets del repositorio
**Then** todas las variables están presentes y accesibles como `${{ secrets.NOMBRE_VAR }}` en los workflows

**Given** los secrets configurados en Gitea
**When** se revisa el historial de commits y todos los archivos del repo
**Then** ningún valor de variable de entorno sensible está commiteado en texto plano

**Given** un archivo `.env.example` creado en la raíz del repo
**When** se lo abre
**Then** lista todas las variables requeridas con valores de ejemplo (sin valores reales) como documentación para nuevos integrantes

---

### Story 3.4: Workflow de Gitea Actions — Build, Push y Deploy

Como desarrollador,
quiero un workflow en `.gitea/workflows/deploy.yml` que en cada push a `master` construya la imagen Docker, la publique en el Container Registry de Gitea, y la despliegue en el VPS via SSH,
para tener un ciclo de deploy continuo, automático e inmutable.

**Acceptance Criteria:**

**Given** el archivo `.gitea/workflows/deploy.yml` con jobs `build-and-push` y `deploy` (dependiente del primero)
**When** se hace un push a `master`
**Then** el workflow se dispara automáticamente en Gitea Actions

**Given** el job `build-and-push` corriendo exitosamente
**When** termina
**Then** la nueva imagen aparece en el Container Registry de Gitea con el tag del commit SHA y el tag `latest`

**Given** el job `deploy` corriendo via SSH al VPS
**When** termina exitosamente
**Then** el VPS corre la nueva versión — verificable accediendo a `https://madnessexpeditions.com`

**Given** un push que provoca fallo en el build de Next.js
**When** el job `build-and-push` falla
**Then** el job `deploy` no se ejecuta — la versión anterior sigue en producción sin interrupción

