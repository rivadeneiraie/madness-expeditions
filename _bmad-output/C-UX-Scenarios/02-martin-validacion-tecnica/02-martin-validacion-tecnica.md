# 02: La Validación Técnica de Martín

**Proyecto:** Madness Expeditions
**Creado:** 2026-04-08
**Método:** Whiteport Design Studio (WDS)
**Design Intent:** S — Suggest
**Design Status:** not-started

---

## Transacción (Q1)

**Lo que cubre este escenario:**
Demostrarle en el menor tiempo posible que Madness tiene el nivel técnico que exige y que no va a terminar en un grupo de principiantes.

---

## Objetivo de Negocio (Q2)

**Objetivo:** OBJ-2 — Consultas calificadas digitales (métrica principal)
**Referencia:** Consultas nuevas de personas que llegaron por canales digitales con conocimiento del viaje que les interesa. OBJ-3 (conversión a reserva) como resultado deseable pero no como métrica de éxito de la web.

---

## Usuario y Situación (Q3)

**Persona:** Martín (Secundaria)
**Situación:** Martín tiene 41 años, vive en Córdoba y trabaja como ingeniero. Una noche o fin de semana, sentado frente a la computadora, en una sesión donde evalúa varias operadoras en paralelo. Tiene criterio técnico claro y descarta rápido — si la web no le muestra nivel en los primeros minutos, cierra y sigue. Lleva años haciendo montaña solo porque sus amigos no comparten la pasión; quiere seguir progresando con personas a su altura.

---

## Fuerzas Impulsoras (Q4)

**Esperanza:** Encontrar una operadora con guías de formación real y grupos segmentados por nivel — que le demuestre que puede seguir progresando con personas a su altura.

**Miedo:** Que sea otra empresa que vende "aventura para todos" sin nivel técnico real, y que termine pagando para ir más lento de lo que va solo.

---

## Dispositivo y Punto de Partida (Q5 + Q6)

**Dispositivo:** Desktop — búsqueda deliberada, con tiempo y comodidad para evaluar en profundidad.
**Entrada:** Busca en Google desde desktop con términos técnicos específicos — "operadora montañismo técnico Argentina", "escalada en hielo Mendoza guía EPGAMT", "expedición 6000m Argentina" — y hace clic en el resultado orgánico de Madness Expeditions.

---

## Mejor Resultado Posible (Q7)

**Martín logra:** Confirmar que los guías tienen formación real y credenciales verificables, que los grupos están segmentados por nivel, y ver fechas concretas disponibles — suficiente para contactar con una consulta técnica específica.

**El negocio logra:** Una consulta calificada de un perfil de conversión rápida — alguien que ya quiere ir y solo necesita una respuesta técnica de Pablo para reservar.

---

## Camino Más Corto (Q8)

*Camino lineal — sin bifurcaciones. El contacto se realiza vía botón WhatsApp flotante, siempre visible durante la navegación.*

1. **Próximas salidas** — Confirma que hay viajes a su nivel con fechas concretas disponibles — filtro inicial
2. **Sobre nosotros / El equipo** — Superado el filtro, valida las credenciales y formación real de los guías
3. **Cómo trabajamos** — Confirma que los grupos están segmentados por nivel — no va a terminar con principiantes
4. **WhatsApp** *(botón flotante)* — Envía su consulta técnica específica a Pablo ✓

---

## Conexiones con el Trigger Map

**Persona:** Martín — El Montañista Sin Compañía (Secundaria)

**Fuerzas Impulsoras Abordadas:**
- ✅ **Deseo:** Seguir progresando — sumar cumbres más exigentes, no estancarse
- ✅ **Deseo:** Grupo de su nivel — personas con compromiso y experiencia similar
- ❌ **Miedo:** Caer en un grupo de principiantes — que lo ralenticen o que el viaje no tenga el nivel que busca
- ❌ **Miedo:** Operadora sin nivel técnico real — empresas que venden aventura pero sin guías serios

**Objetivo de Negocio:** OBJ-2 — Consultas calificadas digitales (10-30 consultas por período de salida desde canales digitales)

---

## Pasos del Escenario

| Paso | Carpeta | Propósito | Acción de Salida |
|------|---------|-----------|-----------------|
| 02.1 | `02.1-proximas-salidas/` | Filtro inicial — ¿tienen viajes a mi nivel con fechas reales? | Navega a "El equipo" |
| 02.2 | `02.2-sobre-nosotros/` | Validar credenciales y formación real de los guías | Navega a "Cómo trabajamos" |
| 02.3 | `02.3-como-trabajamos/` | Confirmar segmentación por nivel — no va a ir con principiantes | Toca WhatsApp flotante ✓ |

**El paso 02.1 incluye** contexto de entrada completo (Q3 + Q4 + Q5 + Q6).
**Interacciones dentro del paso** (que no salen de la página) se documentan como ítems de storyboard dentro de cada especificación de página.
