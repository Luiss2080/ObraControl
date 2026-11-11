# Especificación del MVP — ObraControl

> Documento vivo. Si una decisión cambia, se actualiza acá primero y después en el código.

## 1. Resumen

**Propuesta de valor:** Que quien construye sepa, rubro por rubro, cuánto presupuestó, cuánto gastó y cuánto avanzó.

**Problema:** Las obras pequeñas se llevan con recibos sueltos y fotos; recién al final se descubre que se gastó más de lo previsto y nadie sabe en qué rubro.

**Cómo se resuelve hoy:** Recibos, fotos de facturas y planillas de Excel.

**Usuario objetivo:** Propietario que construye o remodela, o un maestro/contratista que controla varias obras pequeñas.

**Métricas de éxito del MVP:**

- Ver en una pantalla presupuesto vs gasto real por rubro.
- Registrar un gasto en menos de 20 segundos.
- Recibir una alerta antes de pasarse del presupuesto de un rubro.

## 2. Alcance del MVP

### Incluido

- Obras con presupuesto total y fecha de inicio.
- Rubros (albañilería, electricidad, acabados) con su presupuesto.
- Gastos por rubro con proveedor y monto.
- Comparación presupuesto vs gasto real y alertas de sobrecosto.
- Avance porcentual de la obra con notas.
- Exportación CSV para contabilidad.

### Fuera del MVP

- Cuentas de usuario, inicio de sesión y multiusuario.
- Servidor propio, nube o sincronización entre dispositivos.
- Pagos en línea o pasarelas de cobro.
- Publicación en App Store (iOS).
- Cualquier servicio de pago o con costo recurrente.

## 3. Reglas de negocio

Reglas que el código **debe** cumplir. Cada una se cubre con pruebas automáticas cuando es lógica pura.

- **RN-01** La suma de los presupuestos de los rubros no puede superar el presupuesto total de la obra (se advierte, no se bloquea).
- **RN-02** Un gasto siempre pertenece a un rubro.
- **RN-03** Desviación de un rubro = gasto real − presupuesto del rubro.
- **RN-04** Un rubro está en alerta al llegar al 80% de su presupuesto y en sobrecosto al superar el 100%.
- **RN-05** El avance de la obra es un valor de 0 a 100 y se registra con fecha; el último valor es el actual.
- **RN-06** El avance no puede disminuir salvo corrección explícita con nota.

## 4. Historias de usuario y criterios de aceptación

Formato: **Dado** un contexto, **Cuando** el usuario hace algo, **Entonces** pasa algo verificable.

### HU-01 — Crear una obra con presupuesto

**Como** propietario **quiero** crear la obra con presupuesto total y fecha de inicio **para** tener la referencia para controlar.

**Fase:** 2 — Obras y rubros

**Criterios de aceptación:**

1. **Dado:** el formulario de obra. **Cuando:** ingreso presupuesto 120.000 Bs. **Entonces:** se crea la obra y aparece en Inicio.
2. **Dado:** presupuesto vacío o 0. **Cuando:** intento guardar. **Entonces:** la app lo rechaza.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-02 — Definir rubros y su presupuesto

**Como** propietario **quiero** dividir la obra en rubros con su monto **para** saber en qué se va el dinero.

**Fase:** 2 — Obras y rubros

**Criterios de aceptación:**

1. **Dado:** una obra de 120.000 Bs. **Cuando:** asigno rubros que suman 130.000 Bs. **Entonces:** aparece una advertencia de que se supera el presupuesto total.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-03 — Registrar gastos con proveedor

**Como** propietario **quiero** anotar cada gasto con rubro, proveedor y monto **para** no perder ningún comprobante.

**Fase:** 3 — Gastos y proveedores

**Criterios de aceptación:**

1. **Dado:** un rubro. **Cuando:** registro 2.500 Bs de cemento al proveedor Ferrotodo. **Entonces:** el gasto aparece en el rubro y el acumulado sube.
2. **Dado:** un gasto sin rubro. **Cuando:** intento guardar. **Entonces:** la app exige elegir un rubro.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-04 — Presupuesto vs real y alertas

**Como** propietario **quiero** ver la desviación por rubro y recibir alertas **para** frenar a tiempo.

**Fase:** 4 — Presupuesto vs real y alertas

**Criterios de aceptación:**

1. **Dado:** un rubro de 10.000 Bs con 8.200 gastados. **Cuando:** abro Comparación. **Entonces:** aparece en alerta amarilla al 82%.
2. **Dado:** un rubro que supera el 100%. **Cuando:** abro Comparación. **Entonces:** aparece en rojo con el monto de sobrecosto.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

### HU-05 — Avance con notas y exportación

**Como** propietario **quiero** registrar el avance y exportar los datos **para** rendir cuentas al contador o a los socios.

**Fase:** 5 — Avance y exportación CSV

**Criterios de aceptación:**

1. **Dado:** una obra al 40%. **Cuando:** registro 55% con una nota. **Entonces:** el avance actual pasa a 55% y se conserva el historial.
2. **Dado:** gastos de la obra. **Cuando:** toco «Exportar CSV». **Entonces:** se genera un archivo con una fila por gasto.

Criterios comunes a toda historia:

- [ ] Funciona sin conexión a internet.
- [ ] Los datos persisten al cerrar y reabrir la app.
- [ ] Los errores de validación se muestran en español y junto al campo.
- [ ] Hay un estado vacío claro cuando todavía no hay datos.

## 5. Pantallas y navegación

| Pantalla | Qué muestra | Acciones principales |
|---|---|---|
| Inicio | Obras con avance, gastado vs presupuesto y alertas | Nueva obra |
| Detalle de obra | Resumen, rubros, gastos y avance | Agregar rubro o gasto, registrar avance |
| Formulario de rubro | Nombre y presupuesto | Guardar |
| Formulario de gasto | Rubro, proveedor, concepto, monto, fecha | Guardar |
| Comparación | Tabla presupuesto vs gasto por rubro con semáforo | Filtrar por período |
| Avance | Historial de avance con notas | Registrar avance |

**Navegación:** la pantalla de inicio es el punto de partida; desde ahí se llega a cada sección con un toque y se vuelve con el botón atrás. Las acciones frecuentes (nuevo registro) están siempre a la vista. La navegación se implementa con Expo Router (rutas por archivo en `app/`).

## 6. Modelo de datos

Base SQLite local versionada con `PRAGMA user_version`. Las fechas se guardan como texto ISO 8601 y los montos como números reales (en bolivianos).

### `obras`

Cada obra con su presupuesto total.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `nombre` | TEXT | Obligatorio |
| `presupuesto_total` | REAL | Obligatorio; Por defecto 0 |
| `fecha_inicio` | TEXT | Opcional |

### `rubros`

Partidas de la obra con su presupuesto.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `obra_id` | INTEGER | Obligatorio; Referencia a obras (se borra en cascada) |
| `nombre` | TEXT | Obligatorio |
| `presupuesto` | REAL | Obligatorio; Por defecto 0 |

### `gastos`

Gastos reales por rubro y proveedor.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `rubro_id` | INTEGER | Obligatorio; Referencia a rubros (se borra en cascada) |
| `descripcion` | TEXT | Obligatorio |
| `monto` | REAL | Obligatorio |
| `fecha` | TEXT | Obligatorio |
| `proveedor` | TEXT | Opcional |

### `avances`

Porcentaje de avance con notas.

| Campo | Tipo | Reglas |
|---|---|---|
| `id` | INTEGER | Clave primaria autoincremental |
| `obra_id` | INTEGER | Obligatorio; Referencia a obras (se borra en cascada) |
| `fecha` | TEXT | Obligatorio |
| `porcentaje` | REAL | Obligatorio |
| `nota` | TEXT | Opcional |

Detalle de la política de migraciones: nunca editar una migración publicada; agregar una nueva al final de la lista en `src/db/schema.ts`.

## 7. Casos borde a contemplar

- Gasto con IVA o sin factura: campo opcional «con factura».
- Gasto que se reparte entre dos rubros: registrar dos gastos.
- Obra pausada: estado «pausada» sin alertas.
- Cambio del presupuesto total: queda registrado el valor anterior en una nota.

## 8. Requisitos no funcionales

- **Offline total:** ninguna función del MVP requiere internet.
- **Rendimiento:** la app abre en menos de 2 segundos; las listas responden de inmediato con cientos de registros (consultas con índices y listas virtualizadas).
- **Privacidad:** los datos nunca salen del teléfono, salvo lo que el usuario comparte a propósito.
- **Idioma y formato:** español de Bolivia, montos en bolivianos (Bs) con dos decimales, fechas día/mes/año.
- **Usabilidad:** botones grandes, formularios cortos y flujos de pocos toques; pensado para usarse de pie y con una mano.
- **Accesibilidad básica:** contraste suficiente, etiquetas de accesibilidad en botones y tamaño de texto que respeta el ajuste del sistema.
- **Calidad:** `npm run lint`, `npx tsc --noEmit` y `npm test` pasan en cada commit (CI en GitHub Actions).
- **Compatibilidad:** Android 8 o superior (probado con Expo Go y con el APK).

### Capacidades de Expo que usa

| Paquete | Para qué | Permiso |
|---|---|---|
| `expo-sharing` | Compartir PDF, CSV o respaldos con otras apps | — |
| `expo-file-system` | Guardar y leer archivos locales (CSV, respaldos) | — |

## 9. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Gastos que no se registran | Registro rápido con pocos campos y recordatorio semanal opcional. |
| Sobrecosto descubierto tarde | Alerta temprana al 80% y semáforo en Inicio. |
| Cambios de esquema que rompan datos | Migraciones con `PRAGMA user_version`; nunca editar una migración publicada |
| El alcance crece | Todo lo que no esté en la sección 2 va a «Después del MVP» en el [ROADMAP](ROADMAP.md) |

## 10. Criterios para lanzar el MVP (v1.0.0)

- [ ] Todas las historias de la sección 4 cumplen sus criterios de aceptación.
- [ ] Todas las reglas de negocio de la sección 3 tienen pruebas o verificación manual.
- [ ] Probado en un teléfono Android real, en modo avión.
- [ ] APK generado con `npm run build:apk` e instalado en un teléfono limpio.
- [ ] README con capturas de pantalla y CHANGELOG actualizado.
- [ ] Release v1.0.0 publicado con el APK adjunto.

## 11. Glosario

| Término | Significado en ObraControl |
|---|---|
| `obras` | Cada obra con su presupuesto total. |
| `rubros` | Partidas de la obra con su presupuesto. |
| `gastos` | Gastos reales por rubro y proveedor. |
| `avances` | Porcentaje de avance con notas. |

## 12. Mensajes estándar

| Situación | Mensaje |
|---|---|
| Campo obligatorio vacío | Completá este campo |
| Número inválido | Ingresá un número válido |
| Monto cero o negativo | El monto debe ser mayor a 0 |
| Fecha inválida | Fecha no válida |
| Guardado correcto | Guardado |
| Error al guardar | No se pudo guardar. Intentá de nuevo |
| Confirmar borrado | ¿Borrar «{nombre}»? No se puede deshacer |
| Lista vacía | Todavía no hay nada acá. Tocá «+» para empezar |

## 13. Trazabilidad

| Historia | Fase | Casos de prueba |
|---|---|---|
| HU-01 Crear una obra con presupuesto | 2 | CP-01-1, CP-01-2 |
| HU-02 Definir rubros y su presupuesto | 2 | CP-02-1 |
| HU-03 Registrar gastos con proveedor | 3 | CP-03-1, CP-03-2 |
| HU-04 Presupuesto vs real y alertas | 4 | CP-04-1, CP-04-2 |
| HU-05 Avance con notas y exportación | 5 | CP-05-1, CP-05-2 |

## 14. Documentos relacionados

- [DATOS.md](DATOS.md) · [PANTALLAS.md](PANTALLAS.md) · [PRUEBAS.md](PRUEBAS.md) · [BACKLOG.md](BACKLOG.md) · [ROADMAP.md](ROADMAP.md) · [PLANNING.md](PLANNING.md)
