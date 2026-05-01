---
title: "Refactor: reorganización de módulos en web/src"
type: "refactor"
created: "2026-04-30"
status: "in-progress"
baseline_commit: "dd983a455d3eefa6b66456c8e020d55b3aaba3d5"
context:
  - "_bmad-output/project-context.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** `lib/` mezcla configuración de sitio, utilidades de galería y acceso a datos de viajes en un nivel plano sin organización por dominio. `sanity/lib/` tiene un anidado innecesario con solo 2 archivos. La falta de separación por responsabilidad dificulta encontrar dónde vive cada cosa.

**Approach:** Separar `lib/trips-data.ts` en tipos (`lib/trips/types.ts`) y funciones de API (`lib/trips/api.ts`); mover las utilidades de galería junto con los componentes (`components/gallery/utils.ts`); aplanar `sanity/lib/` directamente en `sanity/`. Actualizar todos los imports afectados. La configuración del sitio queda en `lib/config.ts` sin cambios.

## Boundaries & Constraints

**Always:**

- Mantener todos los paths de importación funcionando — actualizar todos los consumers al nuevo path
- No cambiar lógica ni comportamiento — solo mover/renombrar/reorganizar
- `sanity.config.ts` importa desde `./src/sanity/schemas` — esa ruta no cambia

**Ask First:**

- Si se detecta algún import no listado en el Code Map durante la ejecución

**Never:**

- Cambiar `sanity/schemas/` ni sus contenidos
- Cambiar `lib/config.ts`
- Añadir lógica nueva o refactorizar el código interno de los archivos movidos

</frozen-after-approval>

## Code Map

- `src/lib/trips-data.ts` — origen: interfaces Trip + funciones getAllTrips/getTripBySlug; ELIMINAR al final
- `src/lib/gallery-utils.ts` — origen: GalleryImage, SharedModalProps, animationVariants, range, tripImagesToGallery; ELIMINAR al final
- `src/sanity/lib/client.ts` — origen: Sanity client config; ELIMINAR al final
- `src/sanity/lib/queries.ts` — origen: GROQ queries ALL_TRIPS_QUERY, TRIP_BY_SLUG_QUERY; ELIMINAR al final
- `src/lib/trips/types.ts` — NUEVO: interfaces Trip, TripDate, ItineraryDay, TripTestimonial
- `src/lib/trips/api.ts` — NUEVO: normalizeSpots, normalizeTrip, getAllTrips, getTripBySlug
- `src/components/gallery/utils.ts` — NUEVO: contenido de gallery-utils.ts
- `src/sanity/client.ts` — NUEVO: contenido de sanity/lib/client.ts
- `src/sanity/queries.ts` — NUEVO: contenido de sanity/lib/queries.ts
- `src/components/views/FichaViaje.tsx` — consumer: actualizar 2 imports
- `src/components/views/CatalogoViajes.tsx` — consumer: actualizar 1 import
- `src/components/sections/FeaturedTrips.tsx` — consumer: actualizar 1 import
- `src/components/gallery/GallerySharedModal.tsx` — consumer: actualizar 1 import
- `src/components/gallery/GalleryModal.tsx` — consumer: actualizar 1 import
- `src/app/viajes/[slug]/page.tsx` — consumer: actualizar 1 import
- `src/app/viajes/page.tsx` — consumer: actualizar 1 import

## Tasks & Acceptance

**Execution:**

- [ ] `src/sanity/client.ts` -- CREAR con el contenido exacto de sanity/lib/client.ts -- aplanar estructura innecesaria
- [ ] `src/sanity/queries.ts` -- CREAR con el contenido exacto de sanity/lib/queries.ts -- aplanar estructura innecesaria
- [ ] `src/lib/trips/types.ts` -- CREAR con las interfaces Trip, TripDate, ItineraryDay, TripTestimonial extraídas de trips-data.ts -- separar tipos de lógica de fetching
- [ ] `src/lib/trips/api.ts` -- CREAR con normalizeSpots, normalizeTrip, getAllTrips, getTripBySlug; imports desde `@/sanity/client` y `@/sanity/queries`; importar Trip desde `./types`; importar TripLevel/DifficultyLevel desde `@/components/ui/TripCard` -- capa de acceso a datos
- [ ] `src/components/gallery/utils.ts` -- CREAR con el contenido exacto de gallery-utils.ts -- co-ubicar utilidades con los componentes que las usan
- [ ] `src/components/views/FichaViaje.tsx` -- ACTUALIZAR: `@/lib/trips-data` → `@/lib/trips/types`; `@/lib/gallery-utils` → `@/components/gallery/utils`
- [ ] `src/components/views/CatalogoViajes.tsx` -- ACTUALIZAR: `@/lib/trips-data` → `@/lib/trips/types`
- [ ] `src/components/sections/FeaturedTrips.tsx` -- ACTUALIZAR: `@/lib/trips-data` → `@/lib/trips/api`
- [ ] `src/components/gallery/GallerySharedModal.tsx` -- ACTUALIZAR: `@/lib/gallery-utils` → `./utils`
- [ ] `src/components/gallery/GalleryModal.tsx` -- ACTUALIZAR: `@/lib/gallery-utils` → `./utils`
- [ ] `src/app/viajes/[slug]/page.tsx` -- ACTUALIZAR: `@/lib/trips-data` → `@/lib/trips/api`
- [ ] `src/app/viajes/page.tsx` -- ACTUALIZAR: `@/lib/trips-data` → `@/lib/trips/api`
- [ ] `src/lib/trips-data.ts` -- ELIMINAR
- [ ] `src/lib/gallery-utils.ts` -- ELIMINAR
- [ ] `src/sanity/lib/client.ts` -- ELIMINAR
- [ ] `src/sanity/lib/queries.ts` -- ELIMINAR
- [ ] `src/sanity/lib/` -- ELIMINAR directorio vacío

**Acceptance Criteria:**

- Dado que el proyecto compila, cuando se ejecuta `tsc --noEmit` en `web/`, entonces no hay errores de TypeScript
- Dado que los archivos viejos fueron eliminados, cuando se busca `@/lib/trips-data` o `@/lib/gallery-utils` o `sanity/lib/` en `src/`, entonces no hay resultados
- Dado que los nuevos paths existen, cuando se navega a cualquier ruta de la app, entonces la app funciona igual que antes del refactor

## Verification

**Commands:**

- `cd web ; npx tsc --noEmit` -- expected: sin errores de compilación
- `grep -r "lib/trips-data\|lib/gallery-utils\|sanity/lib/" src/` -- expected: sin resultados
