---
title: "PDF Bolivia 2026 detalle de viaje"
type: "feature"
created: "2026-05-08"
status: "done"
baseline_commit: "96dc93787168aa03d9bc3050808b74fad035dceb"
context:
  - "_bmad-output/project-context.md"
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Hay que entregar a clientes un PDF de detalle de viaje para Bolivia 2026 usando el mismo formato profesional ya aplicado en la propuesta de Mendoza, pero aún no existe la versión final en la carpeta del viaje de Bolivia.

**Approach:** Reutilizar la estructura visual y técnica del HTML/PDF de referencia, crear una propuesta específica para Bolivia con el contenido provisto por correo y fotos locales ya cargadas, y generar el PDF final dentro de la carpeta resources/trips/bolivia.

## Boundaries & Constraints

**Always:** Mantener el mismo estilo y layout base del entregable de referencia, usar únicamente assets del repositorio, conservar el idioma español y generar el PDF A4 desde script Node con Puppeteer.

**Ask First:** Si al maquetar aparece desborde severo de texto que obligue a recortar contenido sustancial o agregar más páginas fuera del formato esperado.

**Never:** Inventar datos comerciales no provistos, cambiar contenido de otros viajes, o modificar el diseño base de forma disruptiva.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| HAPPY_PATH | Información completa de Bolivia y carpeta images disponible | Se generan HTML y PDF finales de Bolivia con mismo formato de referencia y contenido actualizado | N/A |
| MISSING_ASSET | Falta una imagen referenciada en el HTML | El script de generación detecta error visual o render incompleto | Reemplazar referencia por otra imagen existente antes de regenerar |

</frozen-after-approval>

## Code Map

- `resources/trips/25-mayo/propuesta-25-mayo-2026.html` -- referencia de layout y estructura del entregable
- `resources/trips/25-mayo/generate-pdf.js` -- referencia del script de exportación PDF
- `resources/trips/bolivia/images/` -- banco de imágenes del viaje Bolivia 2026
- `resources/trips/bolivia/propuesta-bolivia-2026.html` -- nuevo HTML a crear para Bolivia
- `resources/trips/bolivia/generate-pdf.js` -- script PDF para Bolivia
- `resources/trips/bolivia/propuesta-bolivia-2026.pdf` -- resultado final esperado

## Tasks & Acceptance

**Execution:**
- [x] `resources/trips/bolivia/propuesta-bolivia-2026.html` -- crear versión Bolivia reutilizando formato Mendoza y reemplazando textos, datos y fotos -- asegurar consistencia visual y comercial
- [x] `resources/trips/bolivia/generate-pdf.js` -- crear script de generación apuntando al HTML/PDF de Bolivia -- habilitar exportación repetible
- [x] `resources/trips/bolivia/propuesta-bolivia-2026.pdf` -- generar PDF final con Puppeteer -- dejar entregable listo al cliente

**Acceptance Criteria:**
- Given la carpeta `resources/trips/bolivia/images` tiene imágenes válidas, when se abre el HTML de Bolivia, then se ve el contenido actualizado del viaje Bolivia 2026 con layout equivalente al de Mendoza.
- Given el script de Bolivia está disponible, when se ejecuta node sobre generate-pdf.js, then se crea `propuesta-bolivia-2026.pdf` sin errores.
- Given el PDF fue generado, when se revisan portada, bloques de información, incluidos/no incluidos, equipo y contactos, then todos los textos corresponden al brief enviado por correo.

## Spec Change Log

- 2026-05-08: Corrección de frontmatter y endurecimiento del script de generación para manejo de errores.

## Verification

**Commands:**
- `node resources/trips/bolivia/generate-pdf.js` -- expected: PDF generado sin error

**Manual checks (if no CLI):**
- Revisar el PDF y validar legibilidad, cortes de página y consistencia visual con el formato base.

## Suggested Review Order

**Entrada del entregable**

- Validar el alcance visual completo y actualización del título principal.
  [propuesta-bolivia-2026.html:6](../../resources/trips/bolivia/propuesta-bolivia-2026.html#L6)

- Revisar portada y promesa comercial del viaje Bolivia 2026.
  [propuesta-bolivia-2026.html:431](../../resources/trips/bolivia/propuesta-bolivia-2026.html#L431)

**Contenido operativo del viaje**

- Verificar bloque de información general, precio, exigencias e incluidos.
  [propuesta-bolivia-2026.html:497](../../resources/trips/bolivia/propuesta-bolivia-2026.html#L497)

- Comprobar montañas objetivo, narrativa de experiencia y nutrición.
  [propuesta-bolivia-2026.html:618](../../resources/trips/bolivia/propuesta-bolivia-2026.html#L618)

- Confirmar galería adaptada a Bolivia con fotos locales.
  [propuesta-bolivia-2026.html:724](../../resources/trips/bolivia/propuesta-bolivia-2026.html#L724)

- Revisar no incluidos, equipo y cierre comercial/contacto.
  [propuesta-bolivia-2026.html:798](../../resources/trips/bolivia/propuesta-bolivia-2026.html#L798)

**Generación y robustez del PDF**

- Confirmar rutas de entrada/salida del proceso de exportación.
  [generate-pdf.js:12](../../resources/trips/bolivia/generate-pdf.js#L12)

- Verificar validación de lectura del HTML antes de renderizar.
  [generate-pdf.js:22](../../resources/trips/bolivia/generate-pdf.js#L22)

- Revisar inicialización compatible de Puppeteer.
  [generate-pdf.js:38](../../resources/trips/bolivia/generate-pdf.js#L38)

- Validar exportación A4 con fondos y márgenes correctos.
  [generate-pdf.js:53](../../resources/trips/bolivia/generate-pdf.js#L53)

- Confirmar punto de entrada del script para uso operativo.
  [generate-pdf.js:75](../../resources/trips/bolivia/generate-pdf.js#L75)
