# Backlog de issues — ObraControl

> Lista lista para pasar a GitHub Issues, con milestones, etiquetas, estimaciones y trazabilidad a las historias. Se puede crear todo de una vez con [crear-issues.sh](crear-issues.sh).

## 1. Milestones

| Milestone | Fase | Días | Tareas | Horas est. |
|---|---|---|---|---|
| Fase 1 — Estructura base y navegación | 1 | 2 | 6 | 12 |
| Fase 2 — Obras y rubros | 2 | 3 | 7 | 17.5 |
| Fase 3 — Gastos y proveedores | 3 | 3 | 7 | 17.5 |
| Fase 4 — Presupuesto vs real y alertas | 4 | 4 | 7 | 24.5 |
| Fase 5 — Avance y exportación CSV | 5 | 3 | 7 | 17.5 |

Total: **34 tareas**, ~89 horas (15 días a 6 horas efectivas).

## 2. Etiquetas

| Etiqueta | Uso |
|---|---|
| ui | Pantallas y componentes |
| datos | Tablas, consultas y migraciones |
| lógica | Reglas de negocio y cálculos |
| pruebas | Pruebas automáticas y manuales |
| integración | Cámara, notificaciones, PDF, compartir |
| tarea | Otras tareas |
| bug | Errores |
| mejora | Ideas para v1.1+ |

## 3. Issues del MVP

### Fase 1 — Estructura base y navegación

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F1-T1` | Instalar dependencias y abrir la app en Expo Go | — | tarea | Alta | 2 |
| `F1-T2` | Verificar creación y migración de la base | — | datos | Alta | 2 |
| `F1-T3` | Definir la navegación principal | — | ui | Alta | 2 |
| `F1-T4` | Aplicar tema y componente Pantalla | — | ui | Alta | 2 |
| `F1-T5` | Pantalla de inicio con accesos | — | ui | Alta | 2 |
| `F1-T6` | Confirmar CI en verde | — | tarea | Alta | 2 |

### Fase 2 — Obras y rubros

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F2-T1` | CRUD de obras y rubros. | HU-01, HU-02 | tarea | Alta | 2.5 |
| `F2-T2` | Advertencia cuando los rubros superan el presupuesto total (función pura con pruebas). | HU-01, HU-02 | lógica, pruebas | Alta | 2.5 |
| `F2-T3` | Pantalla Detalle de obra. | HU-01, HU-02 | ui | Alta | 2.5 |
| `F2-T4` | Rubros base sugeridos (albañilería, electricidad, plomería, acabados). | HU-01, HU-02 | datos | Alta | 2.5 |
| `F2-T5` | Validaciones, estados vacíos y mensajes en español | HU-01, HU-02 | lógica | Alta | 2.5 |
| `F2-T6` | Pruebas automáticas y verificación manual de criterios | HU-01, HU-02 | pruebas | Alta | 2.5 |
| `F2-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-01, HU-02 | pruebas | Alta | 2.5 |

### Fase 3 — Gastos y proveedores

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F3-T1` | Registro de gastos con rubro obligatorio. | HU-03 | tarea | Alta | 2.5 |
| `F3-T2` | Lista de proveedores reutilizables con autocompletado. | HU-03 | ui | Alta | 2.5 |
| `F3-T3` | Acumulado por rubro. | HU-03 | tarea | Alta | 2.5 |
| `F3-T4` | Edición y borrado con confirmación. | HU-03 | tarea | Alta | 2.5 |
| `F3-T5` | Validaciones, estados vacíos y mensajes en español | HU-03 | lógica | Alta | 2.5 |
| `F3-T6` | Pruebas automáticas y verificación manual de criterios | HU-03 | pruebas | Alta | 2.5 |
| `F3-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-03 | pruebas | Alta | 2.5 |

### Fase 4 — Presupuesto vs real y alertas

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F4-T1` | Función pura de desviación y semáforo (80% y 100%) con pruebas. | HU-04 | lógica, pruebas | Media | 3.5 |
| `F4-T2` | Pantalla Comparación. | HU-04 | ui | Media | 3.5 |
| `F4-T3` | Alerta visible en Inicio y notificación local al cruzar el 80%. | HU-04 | integración | Media | 3.5 |
| `F4-T4` | Filtros por período. | HU-04 | tarea | Media | 3.5 |
| `F4-T5` | Validaciones, estados vacíos y mensajes en español | HU-04 | lógica | Media | 3.5 |
| `F4-T6` | Pruebas automáticas y verificación manual de criterios | HU-04 | pruebas | Media | 3.5 |
| `F4-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-04 | pruebas | Media | 3.5 |

### Fase 5 — Avance y exportación CSV

| ID | Título | Historias | Etiquetas | Prioridad | Horas |
|---|---|---|---|---|---|
| `F5-T1` | Registro de avance con nota y fecha. | HU-05 | tarea | Media | 2.5 |
| `F5-T2` | Regla de no disminución con corrección explícita. | HU-05 | lógica | Media | 2.5 |
| `F5-T3` | Exportación CSV de gastos con expo-file-system y expo-sharing. | HU-05 | integración | Media | 2.5 |
| `F5-T4` | Pruebas del generador CSV. | HU-05 | pruebas, integración | Media | 2.5 |
| `F5-T5` | Validaciones, estados vacíos y mensajes en español | HU-05 | lógica | Media | 2.5 |
| `F5-T6` | Pruebas automáticas y verificación manual de criterios | HU-05 | pruebas | Media | 2.5 |
| `F5-T7` | Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG | HU-05 | pruebas | Media | 2.5 |

## 4. Orden recomendado de ataque

1. Terminá cada fase completa antes de abrir la siguiente; dentro de la fase, de arriba hacia abajo.
2. Las tareas `lógica` y `datos` van antes que las `ui` que las usan.
3. Cada issue se cierra con un commit o PR que lo mencione (`Cierra #N`).
4. Nada de abrir issues de v1.1 hasta tener el APK de la v1.0.0.

## 5. Ideas para después del MVP

| Idea | Esfuerzo | Valor |
|---|---|---|
| Modo oscuro | Bajo | Medio |
| Búsqueda y filtros avanzados | Medio | Alto |
| Estadísticas y gráficos simples en inicio | Medio | Medio |
| Respaldo y restauración de la base | Medio | Alto |
| Publicación en Google Play | Bajo | Alto |
| Sincronización opcional entre dispositivos | Alto | Depende de demanda |
