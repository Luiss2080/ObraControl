# Roadmap de ObraControl

> Que quien construye sepa, rubro por rubro, cuánto presupuestó, cuánto gastó y cuánto avanzó.

Ruta de desarrollo del MVP, fase por fase. Cada fase termina con algo que se puede **usar y probar en un teléfono**. Trabajá una fase a la vez y no pases a la siguiente hasta cumplir su criterio de salida.

## Resumen

- **Objetivo del MVP:** Presupuesto vs gasto real de una obra o remodelación, por rubro, con avance y proveedores.
- **Usuario:** Propietario que construye o remodela, o un maestro/contratista que controla varias obras pequeñas.
- **Duración estimada:** ~15 días de trabajo efectivo (~3 semanas a ritmo tranquilo).
- **Costo:** $0 (sin servidores, sin suscripciones, todo offline en SQLite).

## Línea de tiempo

| Fase | Nombre | Objetivo | Días | Semana acumulada |
|---|---|---|---|---|
| 1 | Estructura base y navegación | Verificar la base y dejar la navegación y el tema listos. | 2 | 1 |
| 2 | Obras y rubros | Obras y rubros. | 3 | 1 |
| 3 | Gastos y proveedores | Gastos y proveedores. | 3 | 2 |
| 4 | Presupuesto vs real y alertas | Presupuesto vs real y alertas. | 4 | 3 |
| 5 | Avance y exportación CSV | Avance y exportación CSV. | 3 | 3 |

## Hitos

### Hito 1 — Estructura base y navegación

**Demo:** La app abre en Expo Go, navega entre secciones vacías y el CI pasa en verde.

### Hito 2 — Obras y rubros

**Demo:** La advertencia de presupuesto aparece con casos de prueba.

### Hito 3 — Gastos y proveedores

**Demo:** El acumulado por rubro coincide con la suma de gastos.

### Hito 4 — Presupuesto vs real y alertas

**Demo:** Los umbrales de 80% y 100% disparan el estado correcto.

### Hito 5 — Avance y exportación CSV

**Demo:** El CSV abre bien en Excel.

## Detalle por fase

### Fase 1 — Estructura base y navegación

- **Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción.
- **Historias cubiertas:** ninguna (infraestructura).
- **Depende de:** nada.
- **Criterio de salida:** la app abre, navega y el CI está en verde.

### Fase 2 — Obras y rubros

- **Objetivo:** Obras y rubros.
- **Historias cubiertas:** HU-01 Crear una obra con presupuesto; HU-02 Definir rubros y su presupuesto
- **Depende de:** fase 1.
- **Duración:** 3 días.
- **Criterio de salida:**
  - La advertencia de presupuesto aparece con casos de prueba.

### Fase 3 — Gastos y proveedores

- **Objetivo:** Gastos y proveedores.
- **Historias cubiertas:** HU-03 Registrar gastos con proveedor
- **Depende de:** fase 2.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El acumulado por rubro coincide con la suma de gastos.

### Fase 4 — Presupuesto vs real y alertas

- **Objetivo:** Presupuesto vs real y alertas.
- **Historias cubiertas:** HU-04 Presupuesto vs real y alertas
- **Depende de:** fase 3.
- **Duración:** 4 días.
- **Criterio de salida:**
  - Los umbrales de 80% y 100% disparan el estado correcto.

### Fase 5 — Avance y exportación CSV

- **Objetivo:** Avance y exportación CSV.
- **Historias cubiertas:** HU-05 Avance con notas y exportación
- **Depende de:** fase 4.
- **Duración:** 3 días.
- **Criterio de salida:**
  - El CSV abre bien en Excel.

## Estado

- [ ] **Fase 1:** Estructura base y navegación
- [ ] **Fase 2:** Obras y rubros
- [ ] **Fase 3:** Gastos y proveedores
- [ ] **Fase 4:** Presupuesto vs real y alertas
- [ ] **Fase 5:** Avance y exportación CSV

## Dependencias y supuestos

- Un teléfono Android real para probar (Expo Go) y, al final, para instalar el APK.
- Node.js 20+ y la app Expo Go.
- Todo lo demás (cuentas, nube, pagos) queda fuera del MVP.

## Después del MVP (v1.1 en adelante)

- [ ] Modo oscuro.
- [ ] Búsqueda y filtros avanzados en las listas.
- [ ] Estadísticas y gráficos simples en la pantalla de inicio.
- [ ] Publicación en Google Play (cuenta de desarrollador, pago único de USD 25).
- [ ] Respaldo y restauración de la base de datos.
- [ ] Sincronización opcional entre dispositivos (solo si hay demanda real).

## Cómo usar este documento

1. [SPEC.md](SPEC.md) define **qué** debe hacer la app (historias, reglas, pantallas, datos).
2. [PLANNING.md](PLANNING.md) define **cómo** construirla fase por fase (tareas, pruebas, issues).
3. Al cerrar una fase: marcá el estado acá, actualizá el [CHANGELOG](../CHANGELOG.md) y fusioná la rama a `main`.

## Trazabilidad: historias por fase

| Historia | Fase | Entrega |
|---|---|---|
| HU-01 Crear una obra con presupuesto | 2 | Obras y rubros |
| HU-02 Definir rubros y su presupuesto | 2 | Obras y rubros |
| HU-03 Registrar gastos con proveedor | 3 | Gastos y proveedores |
| HU-04 Presupuesto vs real y alertas | 4 | Presupuesto vs real y alertas |
| HU-05 Avance con notas y exportación | 5 | Avance y exportación CSV |

## Indicadores de avance

| Indicador | Cómo se mide | Meta |
|---|---|---|
| Avance de tareas | Issues cerrados / 34 | 100 % al lanzar |
| Historias aceptadas | Casos CP- marcados ✔ / 9 | 100 % |
| Reglas cubiertas | RN con prueba / 6 | 100 % |
| Ritmo | Días reales vs estimados por fase | Desvío menor al 50 % |
| Calidad | Errores abiertos al cierre de fase | 0 críticos |

## Revisión de fin de fase

Antes de pasar a la siguiente fase respondé por escrito (5 minutos):

1. ¿Se cumplieron todos los criterios de salida?
2. ¿Cuántos días tomó realmente frente a lo estimado?
3. ¿Qué se recortó o se dejó para después?
4. ¿Hay algo que cambie el SPEC? Actualizalo antes de seguir.

## Documentos de apoyo

- [DATOS.md](DATOS.md): campos, validaciones, consultas y migraciones.
- [PANTALLAS.md](PANTALLAS.md): ruta, estados y bosquejo de cada pantalla.
- [PRUEBAS.md](PRUEBAS.md): casos de prueba por regla, historia y borde.
- [BACKLOG.md](BACKLOG.md): issues listos para GitHub con milestones y etiquetas.
