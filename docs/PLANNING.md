# Plan de desarrollo — ObraControl

Guía para construir el MVP **fase por fase**. Complementa a [ROADMAP.md](ROADMAP.md) (qué y cuándo) y [SPEC.md](SPEC.md) (qué debe hacer la app).

## Forma de trabajo

1. **Una fase por rama:** `git checkout -b fase-N-nombre`.
2. **Un issue por tarea** (usá los títulos de abajo) y un milestone por fase en GitHub.
3. **Commits chicos** con prefijo: `feat:`, `fix:`, `test:`, `docs:`, `chore:`.
4. **Pull request al cerrar la fase** con la lista de criterios de salida marcada.
5. **Primero la lógica pura y sus pruebas** (en `src/lib/`), después la pantalla que la usa.
6. **Probá en el teléfono** al terminar cada tarea de pantalla, no solo al final de la fase.

### Definición de «terminado» (vale para toda tarea y fase)

- [ ] `npm run lint`, `npx tsc --noEmit` y `npm test` sin errores.
- [ ] Funciona en modo avión.
- [ ] Estados vacíos, de carga y de error resueltos, con textos en español.
- [ ] Los datos persisten al reiniciar la app.
- [ ] La regla de negocio correspondiente tiene prueba o verificación manual anotada.
- [ ] CHANGELOG actualizado al cerrar la fase.

## Calendario sugerido

| Fase | Nombre | Días | Acumulado |
|---|---|---|---|
| 1 | Estructura base y navegación | 2 | 2 |
| 2 | Obras y rubros | 3 | 5 |
| 3 | Gastos y proveedores | 3 | 8 |
| 4 | Presupuesto vs real y alertas | 4 | 12 |
| 5 | Avance y exportación CSV | 3 | 15 |

Total: **15 días** (~3 semanas). Si una fase se pasa del doble de lo estimado, recortá alcance dentro de la fase en lugar de saltar a la siguiente.

---

## Fase 1 — Estructura base y navegación

**Estimación:** 2 días.

**Objetivo:** dejar el esqueleto funcionando para construir encima sin fricción. La estructura ya viene en el repositorio.

**Tareas**

- [ ] **F1-T1** `npm install` y `npx expo start`: la app abre en Expo Go.
- [ ] **F1-T2** Revisar `src/db/schema.ts`: la base se crea y migra sola al primer arranque (verificar en el teléfono).
- [ ] **F1-T3** Definir la navegación principal en `app/_layout.tsx` (inicio + una sección por entidad).
- [ ] **F1-T4** Aplicar el tema de `src/theme.ts` y el componente `Pantalla` a todas las rutas.
- [ ] **F1-T5** Pantalla de inicio con tarjetas de acceso a cada sección.
- [ ] **F1-T6** Confirmar que el CI de GitHub Actions pasa en verde.

**Criterio de salida:** la app abre, navega entre secciones vacías y no da errores; lint, tipos y tests en verde.

---

## Fase 2 — Obras y rubros

**Estimación:** 3 días. **Rama sugerida:** `fase-2-obras-y-rubros`.

**Objetivo:** Obras y rubros.

**Historias que se completan:** HU-01 (Crear una obra con presupuesto), HU-02 (Definir rubros y su presupuesto).

**Tareas**

- [ ] **F2-T1** CRUD de obras y rubros.
- [ ] **F2-T2** Advertencia cuando los rubros superan el presupuesto total (función pura con pruebas).
- [ ] **F2-T3** Pantalla Detalle de obra.
- [ ] **F2-T4** Rubros base sugeridos (albañilería, electricidad, plomería, acabados).
- [ ] **F2-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F2-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F2-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-01 — el formulario de obra → ingreso presupuesto 120.000 Bs → se crea la obra y aparece en Inicio.
- [ ] HU-01 — presupuesto vacío o 0 → intento guardar → la app lo rechaza.
- [ ] HU-02 — una obra de 120.000 Bs → asigno rubros que suman 130.000 Bs → aparece una advertencia de que se supera el presupuesto total.

**Criterio de salida:**

- [ ] La advertencia de presupuesto aparece con casos de prueba.
- [ ] Definición de «terminado» cumplida.

---

## Fase 3 — Gastos y proveedores

**Estimación:** 3 días. **Rama sugerida:** `fase-3-gastos-y-proveedores`.

**Objetivo:** Gastos y proveedores.

**Historias que se completan:** HU-03 (Registrar gastos con proveedor).

**Tareas**

- [ ] **F3-T1** Registro de gastos con rubro obligatorio.
- [ ] **F3-T2** Lista de proveedores reutilizables con autocompletado.
- [ ] **F3-T3** Acumulado por rubro.
- [ ] **F3-T4** Edición y borrado con confirmación.
- [ ] **F3-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F3-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F3-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-03 — un rubro → registro 2.500 Bs de cemento al proveedor Ferrotodo → el gasto aparece en el rubro y el acumulado sube.
- [ ] HU-03 — un gasto sin rubro → intento guardar → la app exige elegir un rubro.

**Criterio de salida:**

- [ ] El acumulado por rubro coincide con la suma de gastos.
- [ ] Definición de «terminado» cumplida.

---

## Fase 4 — Presupuesto vs real y alertas

**Estimación:** 4 días. **Rama sugerida:** `fase-4-presupuesto-vs-real-y-alertas`.

**Objetivo:** Presupuesto vs real y alertas.

**Historias que se completan:** HU-04 (Presupuesto vs real y alertas).

**Tareas**

- [ ] **F4-T1** Función pura de desviación y semáforo (80% y 100%) con pruebas.
- [ ] **F4-T2** Pantalla Comparación.
- [ ] **F4-T3** Alerta visible en Inicio y notificación local al cruzar el 80%.
- [ ] **F4-T4** Filtros por período.
- [ ] **F4-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F4-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F4-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-04 — un rubro de 10.000 Bs con 8.200 gastados → abro Comparación → aparece en alerta amarilla al 82%.
- [ ] HU-04 — un rubro que supera el 100% → abro Comparación → aparece en rojo con el monto de sobrecosto.

**Criterio de salida:**

- [ ] Los umbrales de 80% y 100% disparan el estado correcto.
- [ ] Definición de «terminado» cumplida.

---

## Fase 5 — Avance y exportación CSV

**Estimación:** 3 días. **Rama sugerida:** `fase-5-avance-y-exportacion-csv`.

**Objetivo:** Avance y exportación CSV.

**Historias que se completan:** HU-05 (Avance con notas y exportación).

**Tareas**

- [ ] **F5-T1** Registro de avance con nota y fecha.
- [ ] **F5-T2** Regla de no disminución con corrección explícita.
- [ ] **F5-T3** Exportación CSV de gastos con expo-file-system y expo-sharing.
- [ ] **F5-T4** Pruebas del generador CSV.
- [ ] **F5-T5** Validaciones, estados vacíos y mensajes de error en español para todo lo nuevo.
- [ ] **F5-T6** Pruebas automáticas de la lógica de la fase y verificación manual de los criterios de abajo.
- [ ] **F5-T7** Probar en un teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

**Pruebas de aceptación manuales** (de [SPEC.md](SPEC.md)):

- [ ] HU-05 — una obra al 40% → registro 55% con una nota → el avance actual pasa a 55% y se conserva el historial.
- [ ] HU-05 — gastos de la obra → toco «Exportar CSV» → se genera un archivo con una fila por gasto.

**Criterio de salida:**

- [ ] El CSV abre bien en Excel.
- [ ] Definición de «terminado» cumplida.

---

## Lanzamiento del MVP (v1.0.0)

- [ ] Revisar todas las historias de [SPEC.md](SPEC.md) y marcar sus criterios.
- [ ] Capturas de pantalla para el README.
- [ ] Revisar textos, íconos y nombre de la app en `app.json`.
- [ ] `npm run build:apk` y probar el APK en un teléfono limpio, sin Expo Go y en modo avión.
- [ ] Publicar el release v1.0.0 con el APK adjunto.
- [ ] Pasar las ideas pendientes a issues para la versión 1.1.

## Plantilla de issue

Copiá esto al crear cada issue:

```
Título: [F2-T1] <descripción de la tarea>
Fase: N — <nombre>
Historia: HU-XX
Criterios:
- [ ] ...
Notas técnicas: ...
```

---

## Cronograma día por día

Guía para no perder el hilo: cada día tiene tareas concretas. Si un día se atrasa, mové la tarea al siguiente, no la saltees.

### Fase 1 — Estructura base y navegación

- **Día 1** (día 1 de la fase): `F1-T1` Instalar dependencias y abrir la app en Expo Go; `F1-T2` Verificar creación y migración de la base; `F1-T3` Definir la navegación principal.
- **Día 2** (día 2 de la fase): `F1-T4` Aplicar tema y componente Pantalla; `F1-T5` Pantalla de inicio con accesos; `F1-T6` Confirmar CI en verde.

### Fase 2 — Obras y rubros

- **Día 3** (día 1 de la fase): `F2-T1` CRUD de obras y rubros.; `F2-T2` Advertencia cuando los rubros superan el presupuesto total (función pura con pruebas).; `F2-T3` Pantalla Detalle de obra..
- **Día 4** (día 2 de la fase): `F2-T4` Rubros base sugeridos (albañilería, electricidad, plomería, acabados).; `F2-T5` Validaciones, estados vacíos y mensajes en español; `F2-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 5** (día 3 de la fase): `F2-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 3 — Gastos y proveedores

- **Día 6** (día 1 de la fase): `F3-T1` Registro de gastos con rubro obligatorio.; `F3-T2` Lista de proveedores reutilizables con autocompletado.; `F3-T3` Acumulado por rubro..
- **Día 7** (día 2 de la fase): `F3-T4` Edición y borrado con confirmación.; `F3-T5` Validaciones, estados vacíos y mensajes en español; `F3-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 8** (día 3 de la fase): `F3-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 4 — Presupuesto vs real y alertas

- **Día 9** (día 1 de la fase): `F4-T1` Función pura de desviación y semáforo (80% y 100%) con pruebas.; `F4-T2` Pantalla Comparación..
- **Día 10** (día 2 de la fase): `F4-T3` Alerta visible en Inicio y notificación local al cruzar el 80%.; `F4-T4` Filtros por período..
- **Día 11** (día 3 de la fase): `F4-T5` Validaciones, estados vacíos y mensajes en español; `F4-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 12** (día 4 de la fase): `F4-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

### Fase 5 — Avance y exportación CSV

- **Día 13** (día 1 de la fase): `F5-T1` Registro de avance con nota y fecha.; `F5-T2` Regla de no disminución con corrección explícita.; `F5-T3` Exportación CSV de gastos con expo-file-system y expo-sharing..
- **Día 14** (día 2 de la fase): `F5-T4` Pruebas del generador CSV.; `F5-T5` Validaciones, estados vacíos y mensajes en español; `F5-T6` Pruebas automáticas y verificación manual de criterios.
- **Día 15** (día 3 de la fase): `F5-T7` Prueba en teléfono real en modo avión; actualizar ROADMAP y CHANGELOG.

## Rutina diaria

1. Empezá releyendo la tarea del día en [BACKLOG.md](BACKLOG.md) y su regla o historia en [SPEC.md](SPEC.md).
2. Escribí primero la prueba de la lógica, después el código.
3. Probá en el teléfono antes de hacer commit.
4. Cerrá el día con un commit, el issue marcado y una línea en el CHANGELOG si corresponde.

## Qué hacer si te trabás

- Más de 2 horas sin avanzar: simplificá la tarea al caso mínimo y anotá lo que quedó fuera como issue `mejora`.
- Duda de alcance: la respuesta está en la sección 2 del [SPEC](SPEC.md); si no está, no entra al MVP.
- Duda de datos o validaciones: [DATOS.md](DATOS.md).
- Duda de pantallas: [PANTALLAS.md](PANTALLAS.md).
- Duda de cómo probar: [PRUEBAS.md](PRUEBAS.md).
