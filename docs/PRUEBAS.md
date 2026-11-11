# Plan de pruebas — ObraControl

> Qué probar, cuándo y cómo. Cada historia y cada regla de negocio tiene casos concretos. Complementa a [SPEC.md](SPEC.md).

## 1. Estrategia

| Nivel | Herramienta | Qué cubre | Cuándo |
|---|---|---|---|
| Unitarias | jest-expo (`npm test`) | Lógica pura de `src/lib/` (cálculos, validaciones, formatos) | En cada commit (CI) |
| Manuales por historia | Teléfono con Expo Go | Criterios de aceptación de SPEC (casos CP-) | Al cerrar cada tarea de pantalla |
| Regresión por fase | Teléfono real | Lo ya terminado sigue andando | Al cerrar cada fase |
| Aceptación final | APK en teléfono limpio, modo avión | Criterios de lanzamiento | Antes de v1.0.0 |

Meta de cobertura: **100 % de las reglas de negocio** con prueba automática o caso manual, y **100 % de los criterios de aceptación** ejecutados al menos una vez en un teléfono real.

## 2. Pruebas unitarias por regla de negocio

Crear un archivo `src/lib/<tema>.test.ts` por tema. Una prueba por regla como mínimo; agregar los bordes de la sección 4.

| ID | Regla | Tipo de prueba | Casos mínimos |
|---|---|---|---|
| RN-01 | La suma de los presupuestos de los rubros no puede superar el presupuesto total de la obra (se advierte, no se bloquea). | Unitaria (cálculo) | Valor típico, cero, redondeo a 2 decimales, valor grande |
| RN-02 | Un gasto siempre pertenece a un rubro. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-03 | Desviación de un rubro = gasto real − presupuesto del rubro. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-04 | Un rubro está en alerta al llegar al 80% de su presupuesto y en sobrecosto al superar el 100%. | Unitaria o manual | Caso válido, caso inválido, límite |
| RN-05 | El avance de la obra es un valor de 0 a 100 y se registra con fecha; el último valor es el actual. | Unitaria (fechas) | Hoy, mañana, fin de mes, año bisiesto |
| RN-06 | El avance no puede disminuir salvo corrección explícita con nota. | Unitaria o manual | Caso válido, caso inválido, límite |

## 3. Casos manuales por historia

Formato: ejecutar en el teléfono, marcar ✔ o ✘ y anotar la fecha. Si falla, abrir un issue con el ID del caso.

### HU-01 — Crear una obra con presupuesto (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-01-1 | el formulario de obra | ingreso presupuesto 120.000 Bs | se crea la obra y aparece en Inicio | ☐ |
| CP-01-2 | presupuesto vacío o 0 | intento guardar | la app lo rechaza | ☐ |

Casos transversales: **CP-01-T1** modo avión · **CP-01-T2** cerrar y reabrir la app (persistencia) · **CP-01-T3** texto del sistema en tamaño grande.

### HU-02 — Definir rubros y su presupuesto (fase 2)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-02-1 | una obra de 120.000 Bs | asigno rubros que suman 130.000 Bs | aparece una advertencia de que se supera el presupuesto total | ☐ |

Casos transversales: **CP-02-T1** modo avión · **CP-02-T2** cerrar y reabrir la app (persistencia) · **CP-02-T3** texto del sistema en tamaño grande.

### HU-03 — Registrar gastos con proveedor (fase 3)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-03-1 | un rubro | registro 2.500 Bs de cemento al proveedor Ferrotodo | el gasto aparece en el rubro y el acumulado sube | ☐ |
| CP-03-2 | un gasto sin rubro | intento guardar | la app exige elegir un rubro | ☐ |

Casos transversales: **CP-03-T1** modo avión · **CP-03-T2** cerrar y reabrir la app (persistencia) · **CP-03-T3** texto del sistema en tamaño grande.

### HU-04 — Presupuesto vs real y alertas (fase 4)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-04-1 | un rubro de 10.000 Bs con 8.200 gastados | abro Comparación | aparece en alerta amarilla al 82% | ☐ |
| CP-04-2 | un rubro que supera el 100% | abro Comparación | aparece en rojo con el monto de sobrecosto | ☐ |

Casos transversales: **CP-04-T1** modo avión · **CP-04-T2** cerrar y reabrir la app (persistencia) · **CP-04-T3** texto del sistema en tamaño grande.

### HU-05 — Avance con notas y exportación (fase 5)

| ID | Dado | Cuando | Entonces | Resultado |
|---|---|---|---|---|
| CP-05-1 | una obra al 40% | registro 55% con una nota | el avance actual pasa a 55% y se conserva el historial | ☐ |
| CP-05-2 | gastos de la obra | toco «Exportar CSV» | se genera un archivo con una fila por gasto | ☐ |

Casos transversales: **CP-05-T1** modo avión · **CP-05-T2** cerrar y reabrir la app (persistencia) · **CP-05-T3** texto del sistema en tamaño grande.

## 4. Casos borde

| ID | Caso | Resultado esperado | Resultado |
|---|---|---|---|
| CB-01 | Gasto con IVA o sin factura: campo opcional «con factura». | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-02 | Gasto que se reparte entre dos rubros: registrar dos gastos. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-03 | Obra pausada: estado «pausada» sin alertas. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |
| CB-04 | Cambio del presupuesto total: queda registrado el valor anterior en una nota. | La app no se rompe; el mensaje o comportamiento es claro y no se pierden datos | ☐ |

## 5. Pruebas de datos y migraciones

| ID | Prueba | Esperado |
|---|---|---|
| CD-01 | Primer arranque en teléfono limpio | La base se crea con todas las tablas y `user_version` queda en 1 |
| CD-02 | Actualizar de una versión anterior con datos cargados | Las migraciones nuevas se aplican y no se pierde ningún registro |
| CD-03 | Borrar un registro padre | Los hijos se borran o se bloquea con mensaje, según el esquema |
| CD-04 | Intentar guardar con campos obligatorios vacíos | No se inserta nada y se marcan los campos |
| CD-05 | Cargar 1.000 registros de prueba | Las listas siguen fluidas (scroll sin trabas) y abren en menos de 2 s |

## 6. Regresión al cerrar cada fase

**Fase 1 — Estructura base y navegación**

- [ ] La app abre y navega sin errores

**Fase 2 — Obras y rubros**

- [ ] La advertencia de presupuesto aparece con casos de prueba.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 3 — Gastos y proveedores**

- [ ] El acumulado por rubro coincide con la suma de gastos.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 4 — Presupuesto vs real y alertas**

- [ ] Los umbrales de 80% y 100% disparan el estado correcto.
- [ ] Los criterios de las fases anteriores siguen funcionando

**Fase 5 — Avance y exportación CSV**

- [ ] El CSV abre bien en Excel.
- [ ] Los criterios de las fases anteriores siguen funcionando

## 7. Matriz de dispositivos

| Dispositivo | Android | Qué se verifica |
|---|---|---|
| Gama baja (2–3 GB de RAM) | 8–10 | Fluidez de listas, tiempo de arranque |
| Gama media | 11–13 | Flujo completo y APK |
| Pantalla pequeña (5") | cualquiera | Que nada quede cortado ni oculto por el teclado |
| Texto del sistema grande | cualquiera | Que los formularios sigan siendo usables |

## 8. Lista de verificación para el lanzamiento (v1.0.0)

- [ ] Todas las historias ejecutadas en teléfono real (casos CP-)
- [ ] Todos los casos borde (CB-) ejecutados
- [ ] Pruebas de datos (CD-) ejecutadas
- [ ] APK instalado en un teléfono limpio sin Expo Go
- [ ] Probado en modo avión durante todo el flujo principal
- [ ] Rotación de pantalla no pierde datos del formulario
- [ ] Permisos solicitados solo cuando se necesitan y con explicación
- [ ] Sin errores en la consola durante un recorrido completo
- [ ] README con capturas y CHANGELOG al día

## 9. Informe de errores

```
Título: [Bug] <qué pasó>
ID de caso: CP-XX-X
Pasos: 1... 2... 3...
Esperado: ...
Obtenido: ...
Dispositivo / Android: ...
Captura o video: ...
```
