---
title: "Actualización presentación Nepal — cambios pedidos por Pablo"
type: feature
created: "2026-05-30"
status: draft
context:
  - "_bmad-output/project-context.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problema:** Pablo revisó la presentación `presentacion-nepal-everest.html` y envió una lista de correcciones y mejoras: aclaraciones de texto en varias páginas, cambio de fotos, y más contenido visual del campo base. Varias observaciones ya están incorporadas en el archivo actual; las que faltan se listan aquí como tareas accionables.

**Approach:** Editar `resources/trips/nepal/presentacion-nepal-everest.html` para aplicar las correcciones de texto y fotos pendientes, y agregar una nueva slide-galería de servicios en el campo base con fotos inéditas de `Dia13-02/`. Las Páginas que Pablo marcó como PERFECTO o cuyo cambio ya está en el archivo quedan excluidas.

## Referencia: Mapeo de páginas Pablo → slides HTML

Pablo numera las 24 slides principales (sin contar galerías). La equivalencia con el atributo `slide-num` del HTML es:

| PAG Pablo | ID slide HTML | slide-num | Contenido                            |
| --------- | ------------- | --------- | ------------------------------------ |
| 1         | s1            | 1/43      | Portada                              |
| 2         | s-empresa     | 2/43      | Empresa / servicios                  |
| 3         | s-d1          | 3/43      | Día 1 Argentina → KTM                |
| 4         | s-d2          | 4/43      | Día 2 KTM City Tour                  |
| 5         | s-gal-d2      | 5/43      | Galería Día 2 KTM                    |
| 10        | s-d7          | 16/43     | Día 7 Namche → Sanasa (Everest View) |
| 11        | s-d8          | 18/43     | Día 8 Sanasa → Pangboche             |
| 15        | s-d12         | 26/43     | Día 12 Lobuche → EBC                 |
| 16        | s-d13a        | 28/43     | Día 13 EBC día completo              |
| 17        | s-servicios   | 30/43     | Servicios en el campamento           |
| 23        | s-d19         | 41/43     | Día 19 Regreso a Argentina           |
| 24        | s-cierre      | 43/43     | Cierre / contacto                    |

## Estado actual (qué ya está hecho)

Las siguientes observaciones de Pablo **ya están incorporadas** en el archivo actual y NO requieren acción:

- **PAG 2:** La `svc-grid` ya lista Guías Locales, Alojamiento en Teahouse, Comidas, Logística, Visitas Guiadas, Hotel KTM, Alojamiento y Servicio en Campo Base, Transfers In/Out, Permisos y Trámites.
- **PAG 4:** `s-d2` ya menciona "Kumari, la Niña Diosa Viviente" junto con Durbar Square.
- **PAG 10:** `s-d7` ya dice "Hotel Everest View tenemos la primera vista panorámica del Everest".
- **PAG 11 (Rododendros):** No existe ninguna mención de "rododendros" en el archivo actual — ya fue eliminado.
- **PAG 15:** `s-d12` ya menciona "Cerro Mirador Kala Patthar (5.644 msnm) para vistas panorámicas del Everest".
- **PAG 16:** `s-d13a` ya usa "los mejores montañistas del mundo" (no "alpinistas").
- **PAG 17 (texto):** `s-servicios` ya tiene "Carpas de a dos", "Duchas · Electricidad · Servicio Full".
- **PAG 24:** `s-cierre` ya muestra `<div class="name">Madness Expeditions</div>` — no el nombre de Pablo.

## Boundaries & Constraints

**Always:**

- Mantener el sistema visual existente (dark navy `#0d1b2a`, acento `#4a9fd4`, overlays, Arial, 297×167 mm).
- Usar únicamente imágenes ya presentes en `resources/trips/nepal/image/`.
- Idioma español en todos los textos.
- Al agregar la galería de servicios (nueva slide), incrementar todos los `slide-num` subsiguientes en 1 (de 31/43 a 43/43 pasan a ser 31/44 … 44/44).

**Ask First:**

- Para PAG 5 (cambio de foto KTM): ¿cuál de las fotos del grid reemplazar y por cuál foto del directorio `Día02/`? Las opciones disponibles son: `(1).jpeg`, `(6).jpeg`, los archivos `20.04.56` y `20.04.57`. Preguntar al usuario antes de codificar.
- Para las fotos de Ansilta y Pax en esquinas: no existen imágenes con esos nombres en ninguna carpeta de `image/`. Requerimos que el usuario provea los archivos antes de implementar este cambio.

**Never:**

- Inventar o cambiar altitudes, tiempos de caminata ni información técnica.
- Mostrar precios.
- Modificar archivos fuera de `resources/trips/nepal/`.
- Cambiar el CSS de slides marcadas PERFECTO por Pablo (slides 6–9, 12–14, 18–22).

</frozen-after-approval>

## Code Map

- `resources/trips/nepal/presentacion-nepal-everest.html` — único archivo a editar; contiene las 43 slides en HTML inline
- `resources/trips/nepal/image/Día02/` — fotos adicionales disponibles para PAG 5 (sin usar aún: `(1).jpeg`, `(6).jpeg`, archivos `20.04.56.*`, `20.04.57.jpeg`)
- `resources/trips/nepal/image/Dia13-02/` — 12 fotos de servicio de campo base; solo `18.18.21.jpeg` está en uso como bg-img de s-servicios; las 11 restantes son inéditas
- `resources/trips/nepal/image/Dia19/` — 7 fotos disponibles para PAG 23; bg-img actual: `19.40.20 (1).jpeg`

## Tasks & Acceptance

**Execution:**

- [ ] `resources/trips/nepal/presentacion-nepal-everest.html` — **PAG 3 · texto escalas (s-d1)** — Hacer más explícita la variabilidad de escalas. Reemplazar el texto actual "cerca de 37 hs. de vuelo con escalas (según la aerolínea con la que viajemos)" por "cerca de **37 hs. de vuelo** (las escalas y ciudades intermedias varían según la aerolínea elegida)". Mantener el tono.

- [ ] `resources/trips/nepal/presentacion-nepal-everest.html` — **PAG 5 · foto galería KTM (s-gal-d2)** — ⚠️ BLOQUEADO: preguntar al usuario qué foto cambiar y por cuál (ver Ask First). Una vez confirmado, actualizar el `src` correspondiente en `s-gal-d2`.

- [ ] `resources/trips/nepal/presentacion-nepal-everest.html` — **PAG 17 · nueva galería servicios campo base** — Insertar una nueva slide `id="s-gal-servicios"` con clase `slide slide-gallery` después de `s-servicios` (actualmente slide 30/43). Usar 4 fotos inéditas de `image/Dia13-02/`: `18.18.22 (1).jpeg`, `18.18.22 (2).jpeg`, `18.18.22 (3).jpeg`, `18.18.22 (4).jpeg`. Incrementar todos los `slide-num` de las slides posteriores (de 31/43 → 31/44, …, 43/43 → 44/44) y actualizar el total en todos los spans.

- [ ] `resources/trips/nepal/presentacion-nepal-everest.html` — **PAG 23 · foto regreso (s-d19)** — Cambiar el `src` de `bg-img` en `s-d19` de `Dia19/WhatsApp Image 2026-05-18 at 19.40.20 (1).jpeg` a `Dia19/WhatsApp Image 2026-05-18 at 19.40.20.jpeg` (variante sin el `(1)`).

- [ ] `resources/trips/nepal/presentacion-nepal-everest.html` — **[DEFERRED] Fotos Ansilta y Pax en esquinas** — No implementable hasta recibir las imágenes. Cuando estén disponibles: agregar CSS para `.corner-pets` (posición `absolute bottom-right`, tamaño ~18mm) y dos `<img>` en cada `.slide` con las fotos. Registrar en deferred-work.md.

**Acceptance Criteria:**

- Dado que se abre el HTML en el navegador, cuando se llega al slide `s-d1` (PAG 3), entonces el texto hace referencia explícita a que las escalas varían según la aerolínea, con esa frase resaltada o claramente separada.
- Dado que se llega al slide `s-gal-d2` (PAG 5), cuando se miran las 4 fotos del grid, entonces al menos una foto es diferente a las actuales `(5)`, `(2)`, `(3)`, `(4)`.
- Dado que se llega al slide `s-gal-servicios` (nuevo slide después del PAG 17), entonces se muestran 4 fotos de servicios del campo base (`Dia13-02/`) con un encabezado "Servicios en el Campo Base — Imágenes".
- Dado que se llega al slide `s-d19` (PAG 23), entonces la foto de fondo es diferente a `19.40.20 (1).jpeg`.
- Dado que se imprime el HTML a PDF (Ctrl+P, 297×167 mm, sin márgenes), entonces cada slide ocupa exactamente una página y no hay cortes de contenido.
- El total de slides actualizados en los `slide-num` es 44 (antes 43) y todos los números son correlativos.

## Spec Change Log

## Design Notes

La nueva galería de servicios (`s-gal-servicios`) debe reutilizar exactamente la misma estructura que `s-gal-d13a`:

```html
<div class="slide slide-gallery" id="s-gal-servicios">
  <div class="gal-content">
    <div class="gal-header">
      <div class="gal-label">Campo Base Everest · 5.400 msnm</div>
      <div class="gal-title">Servicios en el Campo Base — Imágenes</div>
    </div>
    <div class="photo-grid-2x2">
      <!-- 4 p-card con fotos de Dia13-02 -->
    </div>
  </div>
  <span class="slide-num">31 / 44</span>
</div>
```

## Verification

**Manual checks:**

- Abrir el HTML en Chrome/Edge y verificar visualmente los 5 cambios (PAG 3 texto, PAG 5 foto, nueva galería servicios, PAG 23 foto, numeración 1/44 … 44/44).
- Ctrl+P → Imprimir como PDF → Tamaño personalizado 297×167 mm · Sin márgenes → verificar que todas las slides se imprimen limpias.
