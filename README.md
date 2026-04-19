# Madness Expeditions — Workspace de Diseño Digital

> Repositorio de trabajo para la construcción de la presencia digital de **Madness Expeditions** — operadora premium de expediciones de montaña con base en Mendoza, Argentina.

---

## ¿Qué es este repositorio?

Este repo es el **workspace de diseño y desarrollo end-to-end** del sitio web y la estrategia digital de Madness Expeditions. Contiene todos los artefactos del proceso de diseño — desde el brief estratégico inicial hasta el código de producción.

El proceso sigue el framework **WDS (Web Design System)** de BMad, que recorre las fases de discovery, estrategia, diseño UX y desarrollo agentic.

---

## Estado del Proyecto

| Fase | Nombre | Estado |
|------|--------|--------|
| 1A | Product Brief | ✅ Completado |
| 1B | Contenido & Lenguaje | ✅ Completado |
| 1C | Dirección Visual | ✅ Completado |
| 1D | Plataforma & Tecnología | ✅ Completado |
| 2 | Trigger Mapping | ✅ Completado |
| 3 | UX Scenarios | ✅ Completado |
| 4 | UX Design (prototipos HTML) | ✅ Completado — 7/7 páginas prototipadas |
| 5 | Agentic Development | 🔄 En progreso — Home completada, resto pendiente |

**Branch activo:** `feature/home-page` → mergeado a `master`

---

## Estructura del Repositorio

```
madness-marketing/
├── web/                       # Proyecto Next.js (código de producción)
│   ├── src/
│   │   ├── app/               — App Router (layout, page, globals.css)
│   │   └── components/        — Componentes React de la Home
│   │       ├── Navbar.tsx
│   │       ├── HeroSection.tsx
│   │       ├── TrustBlock.tsx
│   │       ├── PabloSection.tsx
│   │       ├── TripCard.tsx
│   │       ├── FeaturedTrips.tsx
│   │       ├── TestimonialCard.tsx
│   │       ├── TestimonialsSection.tsx
│   │       ├── FinalCTA.tsx
│   │       ├── Footer.tsx
│   │       └── FloatingWhatsAppButton.tsx
│   ├── next.config.ts
│   └── package.json
│
├── design-artifacts/          # Artefactos de diseño finales (fuente de verdad)
│   └── A-Product-Brief/
│       ├── 01-product-brief.md         — Estrategia, visión y posicionamiento
│       ├── 02-content-language.md      — Guía de contenido y voz de marca
│       ├── 03-visual-direction.md      — Dirección visual e identidad
│       └── 04-platform-requirements.md — Stack técnico e integraciones
│
├── _bmad-output/              # Artefactos de trabajo del proceso WDS
│   ├── B-Trigger-Map/         — Mapa de triggers, objetivos y personas
│   ├── C-UX-Scenarios/        — Escenarios UX + prototipos HTML por página
│   │   ├── 01-valentina-primera-cumbre/   (Home · Catálogo · Ficha de Viaje)
│   │   ├── 02-martin-validacion-tecnica/  (Próximas Salidas · Equipo · Cómo Trabajamos)
│   │   └── 03-diego-grandes-expediciones/ (Grandes Expediciones)
│   ├── dialog/                — Artefactos intermedios de conversación de diseño
│   ├── planning-artifacts/    — Investigación de mercado y planificación
│   └── _progress/             — Log de diseño con estado del proyecto
│
├── _bmad/                     # Framework BMad (skills, configuración, agentes)
├── docs/                      — Documentación adicional
└── resources/                 — Recursos (email templates, imágenes, assets)
```

---

## Contexto del Negocio

**Madness Expeditions** es una empresa de expediciones de montaña fundada y liderada por Pablo Fortunato — montañista forjado en el Aconcagua, con un equipo de guías de élite con formación en las mejores escuelas del país.

**El problema que resuelve este proyecto:** La empresa opera 100% por boca en boca. No tiene web, no tiene presencia en Google ni en redes sociales. Este proyecto construye esa presencia digital con la web como eje central.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Lenguaje | TypeScript |
| Hosting | Vercel (planificado) |

---

## Páginas del Sitio (7 páginas planificadas)

| # | Página | Prototipo | Código |
|---|--------|-----------|--------|
| 1 | Home | ✅ Mobile + Desktop | ✅ Completada — en revisión |
| 2 | Catálogo de Viajes | ✅ Mobile | ⏳ Pendiente |
| 3 | Ficha de Viaje | ✅ Mobile | ⏳ Pendiente |
| 4 | Próximas Salidas | ✅ Desktop | ⏳ Pendiente |
| 5 | Sobre Nosotros / El Equipo | ✅ Desktop | ⏳ Pendiente |
| 6 | Cómo Trabajamos | ✅ Desktop | ⏳ Pendiente |
| 7 | Grandes Expediciones | ✅ Desktop | ⏳ Pendiente |

---

## Correr el Proyecto Localmente

```bash
# Instalar dependencias
cd web
npm install

# Dev server (localhost:3000)
npm run dev

# O desde la raíz:
npm run dev
```

---

## Cómo navegar los artefactos

### 1. Entender la estrategia
Empezá por el [Product Brief](design-artifacts/A-Product-Brief/01-product-brief.md) — es la fundación de todo el proyecto: visión, posicionamiento, usuarios objetivo y criterios de éxito.

### 2. Entender al usuario
Revisá las [personas del Trigger Map](_bmad-output/B-Trigger-Map/personas/) y el [mapa de insights clave](_bmad-output/B-Trigger-Map/05-key-insights.md).

**Persona de diseño primaria:** Valentina — la curiosa sin experiencia que quiere hacer su primera montaña pero no sabe por dónde empezar.

### 3. Entender el diseño UX
Explorá los [escenarios UX](_bmad-output/C-UX-Scenarios/00-ux-scenarios.md) — cada escenario traza el recorrido de una persona por el sitio web, con prototipos HTML aprobados en cada paso.

### 4. Ver el progreso
El [design log](_bmad-output/_progress/00-design-log.md) documenta el estado actualizado de cada fase y los próximos pasos.

---

## Configuración del Entorno (Proceso de Diseño)

Este workspace usa el framework **BMad** con el módulo **WDS**. Para continuar el proceso en una nueva sesión:

1. Abrí el repo en VS Code
2. Tené GitHub Copilot activo en modo agente
3. Invocá el skill WDS apropiado según la fase en curso (ver design log)

---

## Contacto del Proyecto

| Rol | Persona |
|-----|---------|
| Propietario / Product Owner | Pablo Fortunato |
| Diseño & Desarrollo | Irivadeneira |


---

## Estructura del Repositorio

```
madness-marketing/
├── design-artifacts/          # Artefactos de diseño finales (fuente de verdad)
│   └── A-Product-Brief/
│       ├── 01-product-brief.md         — Estrategia, visión y posicionamiento
│       ├── 02-content-language.md      — Guía de contenido y voz de marca
│       ├── 03-visual-direction.md      — Dirección visual e identidad
│       └── 04-platform-requirements.md — Stack técnico e integraciones
│
├── _bmad-output/              # Artefactos de trabajo del proceso WDS
│   ├── B-Trigger-Map/         — Mapa de triggers, objetivos y personas
│   ├── C-UX-Scenarios/        — Escenarios UX por persona
│   │   ├── 01-valentina-primera-cumbre/
│   │   ├── 02-martin-validacion-tecnica/
│   │   └── 03-diego-grandes-expediciones/
│   ├── dialog/                — Artefactos intermedios de conversación de diseño
│   ├── planning-artifacts/    — Investigación de mercado y planificación
│   └── _progress/             — Log de diseño con estado del proyecto
│
├── _bmad/                     # Framework BMad (skills, configuración, agentes)
├── docs/                      — Documentación adicional
└── resources/                 — Recursos (email templates, imágenes, assets)
```

---

## Contexto del Negocio

**Madness Expeditions** es una empresa de expediciones de montaña fundada y liderada por Pablo Fortunato — montañista forjado en el Aconcagua, con un equipo de guías de élite con formación en las mejores escuelas del país.

**El problema que resuelve este proyecto:** La empresa opera 100% por boca en boca. No tiene web, no tiene presencia en Google ni en redes sociales. Este proyecto construye esa presencia digital con la web como eje central.

**Stack tecnológico decidido:**

| Capa | Tecnología |
|------|------------|
| Framework | Next.js 14+ (App Router) |
| Styling | Tailwind CSS |
| CMS | Sanity (headless) |
| Hosting | Vercel |

---

## Cómo navegar los artefactos

### 1. Entender la estrategia
Empezá por el [Product Brief](design-artifacts/A-Product-Brief/01-product-brief.md) — es la fundación de todo el proyecto: visión, posicionamiento, usuarios objetivo y criterios de éxito.

### 2. Entender al usuario
Revisá las [personas del Trigger Map](_bmad-output/B-Trigger-Map/personas/) y el [mapa de insights clave](_bmad-output/B-Trigger-Map/05-key-insights.md).

**Persona de diseño primaria:** Valentina — la curiosa sin experiencia que quiere hacer su primera montaña pero no sabe por dónde empezar.

### 3. Entender el diseño UX
Explorá los [escenarios UX](_bmad-output/C-UX-Scenarios/00-ux-scenarios.md) — cada escenario traza el recorrido de una persona por el sitio web.

### 4. Ver el progreso
El [design log](_bmad-output/_progress/00-design-log.md) documenta el estado actualizado de cada fase y los próximos pasos.

---

## Configuración del Entorno

Este workspace usa el framework **BMad** con el módulo **WDS**. Para continuar el proceso de diseño en una nueva sesión:

1. Abrí el repo en VS Code
2. Tené GitHub Copilot activo en modo agente
3. Invocá el agente WDS apropiado según la fase en curso (ver design log)

No se requiere instalación de dependencias para trabajar con los artefactos de diseño — son archivos Markdown.

---

## Contacto del Proyecto

| Rol | Persona |
|-----|---------|
| Propietario / Product Owner | Pablo Fortunato |
| Diseño & Desarrollo | Irivadeneira |
