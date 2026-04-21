---
project_name: "madness-marketing"
user_name: "Irivadeneira"
date: "2026-04-20"
sections_completed:
  [
    "technology_stack",
    "design_tokens",
    "component_patterns",
    "routing",
    "styling_rules",
    "data_layer",
    "conventions",
  ]
---

# Project Context para Agentes AI

> Reglas y patrones críticos que los agentes AI deben seguir al implementar código en este proyecto. Enfocado en detalles no obvios que los modelos suelen ignorar.

---

## Stack Tecnológico (versiones exactas)

| Capa        | Tecnología                      | Versión  |
| ----------- | ------------------------------- | -------- |
| Framework   | Next.js (App Router, Turbopack) | 16.2.4   |
| Runtime     | React                           | 19.2.4   |
| Lenguaje    | TypeScript                      | ^5       |
| Styling     | Tailwind CSS                    | ^4       |
| Animaciones | framer-motion                   | ^12.38.0 |
| Gestos      | react-swipeable                 | ^7.0.2   |
| Fuente      | Inter (Google Fonts)            | —        |
| Node        | —                               | v20.20.0 |

---

## Design Tokens (colores de marca)

Los colores de marca están definidos como custom tokens de Tailwind v4 en `web/src/app/globals.css`:

```css
@theme inline {
  --color-mx-dark: #0d1b2a; /* Fondo principal */
  --color-mx-blue: #1a3a5c; /* Azul secundario */
  --color-mx-red: #e63030; /* Rojo acento */
  --color-mx-gray: #1c1c1e; /* Gris oscuro (cards) */
}
```

**Uso en clases Tailwind:** `bg-mx-dark`, `text-mx-red`, `border-mx-blue`, etc.

**Colores especiales (inline styles, no en tokens):**

- WhatsApp CTA: `style={{ background: "#25D366", color: "#fff" }}`
- Textos con opacidad: `style={{ color: "rgba(255,255,255,0.6)" }}`
- Transparencias de fondo: `style={{ background: "rgba(13,27,42,0.97)" }}`

**Regla:** Usar clases Tailwind para tokens de marca. Usar `style={{}}` inline solo cuando se necesitan valores con opacidad/alpha o valores únicos puntuales.

---

## Tailwind CSS v4 — Reglas Críticas

1. **Sin `tailwind.config.ts`** — la configuración es 100% CSS en `globals.css` con `@theme inline`.
2. **Clases deprecadas** — usar `shrink-0` en lugar de `flex-shrink-0`. Usar fracciones/valores semánticos en lugar de valores arbitrarios cuando existan equivalentes (ej: `after:h-0.5` en lugar de `after:h-[2px]`).
3. **Breakpoints:** `lg` = 1024px (breakpoint principal mobile → desktop). **Excepción: Navbar** usa `xl` = 1280px para el hamburger en landscape mobile.
4. **Dark mode:** El sitio es siempre dark — no usar `dark:` variants, el fondo base del body es `#0D1B2A`.

---

## Estructura de Rutas (App Router)

```
web/src/app/
├── layout.tsx              — RootLayout con Inter font, lang="es", body min-h-full flex flex-col
├── page.tsx                — Home (/)
├── globals.css             — @import tailwindcss + @theme inline + tokens
├── equipo/
│   └── page.tsx            — El equipo (/equipo) — Server Component
└── viajes/
    ├── page.tsx            — Catálogo de viajes (/viajes)
    └── [slug]/
        └── page.tsx        — Ficha de viaje (/viajes/[slug]) — generateStaticParams
```

**Páginas pendientes de implementar:**

- `/proximas-salidas`
- `/como-trabajamos`
- `/grandes-expediciones`

---

## Componentes — Inventario Completo

### Globales (usados en múltiples páginas)

| Componente                   | Descripción                                                               |
| ---------------------------- | ------------------------------------------------------------------------- |
| `Navbar.tsx`                 | Navegación. Hamburger en mobile/tablet (breakpoint xl).                   |
| `Footer.tsx`                 | Footer con links y datos de contacto.                                     |
| `FloatingWhatsAppButton.tsx` | Botón flotante WhatsApp — NO incluir en FichaViaje (tiene su propio CTA). |

### Home (`/`)

| Componente                | Descripción                                     |
| ------------------------- | ----------------------------------------------- |
| `HeroSection.tsx`         | Hero con imagen de fondo y CTA principal.       |
| `TrustBlock.tsx`          | Bloque de confianza con íconos y métricas.      |
| `FeaturedTrips.tsx`       | Sección de viajes destacados usando `TripCard`. |
| `TripCard.tsx`            | Card vertical de viaje (usada en Home).         |
| `PabloSection.tsx`        | Sección sobre Pablo Fortunato (guía/fundador).  |
| `TestimonialsSection.tsx` | Carrusel de testimonios.                        |
| `TestimonialCard.tsx`     | Card individual de testimonio.                  |
| `FinalCTA.tsx`            | CTA final de la página.                         |

### Catálogo (`/viajes`)

| Componente               | Descripción                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `CatalogoViajes.tsx`     | Lista de viajes con filtros por nivel/zona. `"use client"`. |
| `TripCardHorizontal.tsx` | Card horizontal de viaje (usada en Catálogo).               |

### Ficha de Viaje (`/viajes/[slug]`)

| Componente               | Descripción                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| `FichaViaje.tsx`         | Layout completo mobile + desktop. No incluye `FloatingWhatsAppButton`. |
| `GalleryModal.tsx`       | Modal fullscreen con framer-motion backdrop (blur-2xl). Keyboard nav.  |
| `GallerySharedModal.tsx` | Visor core: AnimatePresence, swipe (react-swipeable), thumbnails.      |

### Equipo (`/equipo`)

| Componente      | Descripción                                                                          |
| --------------- | ------------------------------------------------------------------------------------ |
| `EquipoPage.tsx` | Server Component. Hero con imagen de fondo, perfil Pablo (2col en lg), grid de guías (3col en lg), CTA. Datos ficticios en `GUIDES[]` — pendiente datos reales de guías. Pablo usa `/photos/pablo2.jpeg`. |

---

## Capa de Datos — `web/src/lib/`

### `trips-data.ts`

- Fuente única de verdad para los 3 viajes.
- **Slugs:** `cordon-del-plata-iniciacion`, `cerro-punta-negra`, `bolivia-cordillera-real`
- Exports: `TRIPS` (array), `getTripBySlug(slug)`, interfaces `Trip`, `TripDate`, `ItineraryDay`, `TripTestimonial`
- El campo `imageSrc` es la imagen hero; el campo `images: string[]` son las fotos de la galería.

### `gallery-utils.ts`

- Tipos compartidos: `GalleryImage`, `SharedModalProps`
- Helpers: `animationVariants` (framer-motion), `range(start, end)`, `tripImagesToGallery(images)`

---

## Patrones de Componentes

### Páginas (Server Components por defecto)

```tsx
// web/src/app/ruta/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MiComponente from "@/components/MiComponente";

export const metadata = { title: "...", description: "..." };

export default function MiPage() {
  return (
    <>
      <Navbar />
      <main>
        <MiComponente />
      </main>
      <Footer />
    </>
  );
}
```

### Componentes con estado (Client Components)

- Agregar `"use client"` como primera línea.
- Preferir `useState` + props drilling sobre context para estado local de página.

### Importaciones

- Alias `@/*` apunta a `web/src/`
- Componentes: `import X from "@/components/X"`
- Lib: `import { fn } from "@/lib/archivo"`

---

## Sistema de Imágenes

- Usar `next/image` (`import Image from "next/image"`) para todas las imágenes de contenido.
- Fotos de viajes en `/public/photos/` — path: `/photos/nombre.jpg`
- `remotePatterns` en `next.config.ts` solo permite `picsum.photos` (desarrollo).
- Para imágenes en componentes grandes usar `fill` con `object-cover` en contenedor relativo.

---

## Convenciones de Código

- **Componentes:** PascalCase (`FichaViaje.tsx`)
- **Lib/utils:** kebab-case (`trips-data.ts`, `gallery-utils.ts`)
- **Páginas:** `page.tsx` (fijo por App Router)
- **Sub-componentes locales:** definir dentro del mismo archivo si son exclusivos de ese componente (no crear archivo separado).
- **No usar** `yet-another-react-lightbox` — fue reemplazado por `GalleryModal` + `GallerySharedModal` con framer-motion.

---

## Convenciones de Git

- **Branches:** `feature/nombre-feature`
- **Commits:** `tipo: descripción en minúsculas` (ej: `feat:`, `fix:`, `docs:`, `refactor:`)
- **Merge:** `--no-ff` con mensaje `merge: feature/x → master`
- **Branch por defecto:** `master`

---

## Prototipado de Referencia

Todos los prototipos HTML aprobados están en:

```
_bmad-output/C-UX-Scenarios/
├── 01-valentina-primera-cumbre/
│   ├── 01.1-home/prototypes/
│   ├── 01.2-catalogo-de-viajes/prototypes/catalogo-prototype.html
│   └── 01.3-ficha-de-viaje/prototypes/
├── 02-martin-validacion-tecnica/
│   ├── 02.1-proximas-salidas/prototypes/proximas-salidas-prototype.html
│   ├── 02.2-sobre-nosotros/prototypes/sobre-nosotros-prototype.html
│   └── 02.3-como-trabajamos/prototypes/como-trabajamos-prototype.html
└── 03-diego-grandes-expediciones/
    └── 03.1-grandes-expediciones/prototypes/grandes-expediciones-prototype.html
```

**Flujo al implementar una nueva página:**

1. Leer el prototipo HTML de referencia.
2. Leer la guía de contenido: `design-artifacts/A-Product-Brief/02-content-language.md`
3. Leer la dirección visual: `design-artifacts/A-Product-Brief/03-visual-direction.md`
4. Implementar siguiendo el patrón de páginas (server component wrapper + client component si hay estado).
