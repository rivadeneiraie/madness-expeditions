---
title: "Página /equipo — El Equipo (Sobre Nosotros)"
type: "feature"
created: "2026-04-20"
status: "in-progress"
context:
  - "_bmad-output/project-context.md"
  - "design-artifacts/A-Product-Brief/03-visual-direction.md"
baseline_commit: "29c3a18fca2663e526be30c70f7befd8b6c66d8d"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** La web no tiene página `/equipo`. Los usuarios técnicos (persona Martín) necesitan validar credenciales, historial y equipo de guías antes de confiar en la empresa con una expedición.

**Approach:** Crear ruta `/equipo` con componente `EquipoPage.tsx` — Server Component, sin estado. Layout responsivo mobile-first con: hero, perfil destacado de Pablo (foto + certs + bio + stats + historial), grid de guías del equipo, y CTA hacia "Cómo trabajamos". Referencia de diseño: `sobre-nosotros-prototype.html`.

## Boundaries & Constraints

**Always:**

- Fondo base `#0D1B2A`, colores de marca via clases Tailwind (`bg-mx-dark`, `text-mx-red`, `bg-mx-blue`, `bg-mx-gray`)
- `next/image` para todas las imágenes; usar `picsum.photos` como placeholder (ya está en `remotePatterns`)
- Incluir `FloatingWhatsAppButton` (esta página no tiene CTA propio de WhatsApp embebido)
- Layout mobile-first: columna única en mobile, dos columnas en `lg:` (1024px) para el perfil de Pablo
- Breakpoints: `lg` para mobile→desktop, excepto `Navbar` que ya usa `xl`
- Sub-componentes locales dentro del mismo archivo `EquipoPage.tsx`
- `shrink-0` nunca `flex-shrink-0`

**Ask First:**

- Si se necesitan fotos reales del equipo (Carlos, Lucía, Marcos) en vez de placeholders
- Si los nombres/datos de los guías secundarios son ficticios o reales

**Never:**

- `"use client"` — esta página no tiene estado interactivo
- `FloatingWhatsAppButton` duplicado (viene del layout de la página)
- Inline styles para colores de tokens de marca — usar clases Tailwind

</frozen-after-approval>

## Code Map

- `web/src/app/equipo/page.tsx` -- nueva ruta App Router, Server Component, metadata
- `web/src/components/EquipoPage.tsx` -- componente principal con todo el layout
- `web/src/components/Navbar.tsx` -- referencia para entender el link activo "El equipo"
- `web/src/components/FloatingWhatsAppButton.tsx` -- incluir en page.tsx
- `web/src/components/Footer.tsx` -- incluir en page.tsx
- `_bmad-output/C-UX-Scenarios/02-martin-validacion-tecnica/02.2-sobre-nosotros/prototypes/sobre-nosotros-prototype.html` -- prototipo de referencia

## Tasks & Acceptance

**Execution:**

- [ ] `web/src/app/equipo/page.tsx` -- crear ruta con metadata, Navbar, EquipoPage, Footer, FloatingWhatsAppButton
- [ ] `web/src/components/EquipoPage.tsx` -- implementar layout completo con las siguientes secciones:
  - **Hero**: gradient overlay sobre imagen de fondo, label rojo, h1, subtítulo
  - **Pablo — perfil principal**: mobile: imagen → certs → bio. Desktop: 2 col `lg:grid-cols-2`, foto+certs izq, bio+stats+historial der
  - **Grid de guías**: 3 cards con foto, nombre, rol, descripción, tags. Mobile: columna única. Desktop: `lg:grid-cols-3`
  - **CTA "Cómo trabajamos"**: fila con texto + botón. Mobile: apilado. Desktop: `flex justify-between`

**Acceptance Criteria:**

- Dado que el usuario visita `/equipo` en mobile, ve las secciones apiladas en columna única sin overflow horizontal
- Dado que el usuario visita `/equipo` en desktop (≥1024px), ve el perfil de Pablo en 2 columnas y el grid de guías en 3 columnas
- La página tiene metadata (title, description) correcta
- Las imágenes usan `next/image` con `picsum.photos` como src y dimensiones explícitas o `fill`
- `FloatingWhatsAppButton` visible en la página
- No hay errores de compilación ni warnings de Tailwind v4

## Design Notes

**Hero background:** gradient `linear-gradient(to right, rgba(13,27,42,0.96) 45%, rgba(13,27,42,0.4) 100%)` sobre imagen picsum. En mobile se aplica un overlay más oscuro uniforme para legibilidad.

**Cert badges:** `bg-mx-blue/40 border border-mx-blue/80 rounded-xl p-4` — 2 columnas en todo breakpoint.

**Stats de Pablo:** 3 columnas fijas (`grid-cols-3`), valores en `text-mx-red font-black text-3xl`.

**Timeline de expediciones:** dot rojo `w-3 h-3 rounded-full bg-mx-red shrink-0 mt-1` + texto.

**Cards de guías:** `rounded-2xl overflow-hidden border border-white/[0.07]` con foto arriba y contenido abajo `bg-white/[0.03]`.

## Verification

- [ ] `npm run build` pasa sin errores
- [ ] Página visible en `/equipo` en dev server
- [ ] Mobile (375px): sin scroll horizontal, secciones apiladas correctamente
- [ ] Desktop (1280px): 2 columnas en Pablo, 3 columnas en guías
