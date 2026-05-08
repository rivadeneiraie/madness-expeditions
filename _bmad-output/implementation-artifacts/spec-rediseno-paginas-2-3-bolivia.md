---
title: "Rediseño Páginas 2 y 3 — Propuesta Bolivia 2026"
type: "refactor"
created: "2026-05-08"
status: "in-review"
baseline_commit: "3260c4ea4b9e5d482a722294f75bb55a0cf5eff3"
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Las páginas 2 y 3 del PDF `propuesta-bolivia-2026.html` comparten la misma estructura visual (hero + stats strip + caja de descripción + grilla 2 columnas), lo que hace que parezcan dos viajes distintos (Opción A / Opción B). Las estadísticas se repiten, hay dos bloques de texto emocional casi idénticos y las montañas —el atractivo principal— aparecen como simples ítems de lista.

**Approach:** Rediseñar las dos páginas con propósitos visuales claramente diferenciados: **Página 2 = "El Viaje"** (descripción editorial + precio + qué incluye) y **Página 3 = "Montañas & Logística"** (las 4 montañas como tarjetas visuales + logística + qué no incluye). Se elimina la confusión de "opción A / opción B" y se mueve "Qué no incluye" de la página 5 a la página 3, junto al contexto de precio.

## Boundaries & Constraints

**Always:**

- Mantener el sistema de diseño existente: colores `#0d1b2a` fondo, `#4a9fd4` acento azul, `#e63030` acento rojo, tipografía Arial, clases `.doc-header`, `.doc-footer`, `.page-num`
- Solo modificar las páginas 2 y 3 (`#resumen-expedicion` y `#itinerario-montanas`); no tocar portada, galería ni servicios-equipo
- Mover "Qué no incluye" de página 5 (`#servicios-equipo`) a página 3, eliminándolo de página 5
- El contenido textual es el que ya existe en el HTML (no inventar datos)

**Ask First:**

- Si al quitar "Qué no incluye" de página 5 el layout queda con demasiado espacio vacío, se puede rellenar ampliando la descripción de alimentación o de equipo — preguntar antes de hacerlo

**Never:**

- Cambiar el número de páginas del documento
- Modificar imágenes, rutas de archivos ni el footer/header compartido
- Usar un layout que siga viendo como "dos opciones de viaje"

## I/O & Edge-Case Matrix

| Scenario            | Input / State                         | Expected Output / Behavior                             | Error Handling                                         |
| ------------------- | ------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------ |
| Impresión A4        | Chrome → Imprimir → A4 · sin márgenes | Ambas páginas caben en A4 sin overflow                 | Verificar visualmente con `overflow: hidden` ya activo |
| Pantalla en browser | Abrir el archivo local en Chrome      | El layout nuevo se renderiza correctamente en pantalla | n/a                                                    |

</frozen-after-approval>

## Code Map

- `resources/trips/bolivia/propuesta-bolivia-2026.html` — archivo único objetivo; contiene todo el HTML y CSS inline del documento de 5 páginas

## Tasks & Acceptance

**Execution:**

- [ ] `resources/trips/bolivia/propuesta-bolivia-2026.html` — **Página 2 (HOJA 2 #resumen-expedicion)**: Reemplazar las 6 estadísticas (opt-stats) por 4 stats clave (6.088 m · 13 días · Alta física · Alta técnica). Reemplazar el `aclaracion-box` por un bloque de texto editorial sin recuadro (clase `body-text`). Mantener price-band e includes sin cambios. Actualizar el badge de "Expedicion Bolivia 2026" para que sea neutro (sin `opt-badge a/b`).

- [ ] `resources/trips/bolivia/propuesta-bolivia-2026.html` — **Página 3 (HOJA 3 #itinerario-montanas)**: Reemplazar el hero + stats + aclaracion-box + grilla actual por: (1) sección "Montañas Objetivo" con 4 tarjetas horizontales (una por montaña, con altitud destacada y rol en la expedición), (2) dos columnas inferiores: izquierda = logística y encuentro, derecha = "Qué no incluye" (traído desde página 5).

- [ ] `resources/trips/bolivia/propuesta-bolivia-2026.html` — **Página 5 (#servicios-equipo)**: Eliminar el bloque `<!-- Que no incluye -->` (sección + `.two-cols-opt.excludes`) ahora movido a página 3. Verificar que el espacio restante no deje un gap visual excesivo.

- [ ] `resources/trips/bolivia/propuesta-bolivia-2026.html` — **CSS**: Agregar los estilos nuevos para `.mountain-cards`, `.mountain-card` y demás clases nuevas dentro del `<style>` existente.

**Acceptance Criteria:**

- Dado que se abre el archivo en Chrome, cuando se visualizan las páginas 2 y 3, entonces ninguna de las dos páginas usa los badges de color rojo/azul (`opt-badge a/b`) ni luce como una "opción alternativa"
- Dado el diseño de página 3, cuando se visualiza la sección de montañas, entonces las 4 montañas aparecen como tarjetas horizontales en fila con altitud en tipografía grande y un rol/etiqueta debajo
- Dado que se imprime el documento en A4 sin márgenes, cuando se genera el PDF, entonces las páginas 2 y 3 no tienen overflow ni elementos cortados
- Dado que se eliminó "Qué no incluye" de página 5, cuando se visualiza página 3, entonces "Qué no incluye" aparece ahí con todos los ítems originales
- Dado que se visualiza página 5, cuando se revisa su layout, entonces no hay un bloque vacío donde estaba "Qué no incluye"

## Design Notes

**Página 2 — antes/después:**

- Antes: 6 stats (redundantes) + aclaracion-box (recuadro amarillo) + precio + 2-col includes
- Después: 4 stats esenciales + párrafo editorial sin recuadro + precio + 2-col includes

**Página 3 — diseño de tarjetas de montañas:**

```
┌──────────────────────────────────────────────────────────────┐
│  [ Austria ]  [ Tarija ]  [ Peq. Alpamayo ]  [ Huayna Potosí ]│
│   5.300 m      5.200 m       5.330 m            6.088 m        │
│  Apertura    Aclimatación    Alta dificultad   Cima Final      │
└──────────────────────────────────────────────────────────────┘
```

Cada tarjeta: fondo sutil `rgba(26,58,92,0.45)`, borde azul tenue, altitud en `#4a9fd4` grande, nombre en blanco, rol/etiqueta en texto pequeño en uppercase.

**Página 3 — layout inferior (2 columnas):**

- Columna izquierda `includes`: Logística y punto de encuentro
- Columna derecha `excludes`: Qué no incluye

## Verification

**Manual checks:**

- Abrir `resources/trips/bolivia/propuesta-bolivia-2026.html` en Chrome y verificar páginas 2, 3 y 5 visualmente
- Ctrl+P → A4, sin márgenes → revisar que ninguna página hace overflow
