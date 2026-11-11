# Pantallas y flujos — ObraControl

> Guía de interfaz para construir cada pantalla: ruta, contenido, estados y bosquejo. Complementa la sección 5 de [SPEC.md](SPEC.md).

## 1. Mapa de rutas

| Pantalla | Archivo (Expo Router) | Tipo |
|---|---|---|
| Inicio | `app/index.tsx` | Inicio |
| Detalle de obra | `app/detalle-de-obra.tsx` | Detalle |
| Formulario de rubro | `app/formulario-de-rubro.tsx` | Formulario |
| Formulario de gasto | `app/formulario-de-gasto.tsx` | Formulario |
| Comparación | `app/comparacion.tsx` | Lista / vista |
| Avance | `app/avance.tsx` | Lista / vista |

**Convenciones de interfaz**

- Una acción principal por pantalla, en un botón grande abajo o en un botón flotante.
- Los formularios se abren como pantalla completa, validan al enviar y muestran el error junto al campo.
- Toda lista tiene estado vacío con una frase y un botón que lleva a la acción.
- Las acciones que borran piden confirmación explícita con el nombre del registro.
- El botón atrás nunca pierde datos sin avisar: si el formulario tiene cambios, se pregunta antes de salir.
- Textos en español de Bolivia (voseo opcional, siempre claros); montos como `Bs 1.250,00`.

## 2. Detalle por pantalla

### 2.1 Inicio

- **Archivo:** `app/index.tsx`
- **Qué muestra:** Obras con avance, gastado vs presupuesto y alertas
- **Acciones:** Nueva obra

**Bosquejo**

```
┌──────────────────────────────┐
│ ObraControl                  │
├──────────────────────────────┤
│ [ Resumen y alertas ]        │
│                              │
│  ▸ Detalle de obra          │
│  ▸ Comparación              │
│  ▸ Avance                   │
│                              │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Obras con avance, gastado vs presupuesto y alertas |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.2 Detalle de obra

- **Archivo:** `app/detalle-de-obra.tsx`
- **Qué muestra:** Resumen, rubros, gastos y avance
- **Acciones:** Agregar rubro o gasto, registrar avance
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Detalle de obra             │
├──────────────────────────────┤
│ nombre                       │
│ Resumen / totales            │
├──────────────────────────────┤
│ • registro 1                 │
│ • registro 2                 │
│ • registro 3                 │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay obras. Tocá «Agregar rubro o gasto» para empezar. |
| Con datos | Resumen, rubros, gastos y avance |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.3 Formulario de rubro

- **Archivo:** `app/formulario-de-rubro.tsx`
- **Qué muestra:** Nombre y presupuesto
- **Acciones:** Guardar
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| obra id | Selector de obras | Sí | Debe existir en `obras` |
| nombre | Texto | Sí | Texto de 1 a 80 caracteres sin espacios sobrantes |
| presupuesto | Numérico decimal | Sí | Mayor o igual a 0; Hasta 2 decimales |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de rubro         │
├──────────────────────────────┤
│ obra id                      │
│ [____________________]       │
│ nombre                       │
│ [____________________]       │
│ presupuesto                  │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay rubros. Tocá «Guardar» para empezar. |
| Con datos | Nombre y presupuesto |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.4 Formulario de gasto

- **Archivo:** `app/formulario-de-gasto.tsx`
- **Qué muestra:** Rubro, proveedor, concepto, monto, fecha
- **Acciones:** Guardar
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Campos del formulario**

| Campo | Control | Obligatorio | Validación |
|---|---|---|---|
| rubro id | Selector de rubros | Sí | Debe existir en `rubros` |
| descripcion | Texto largo | Sí | Hasta 280 caracteres |
| monto | Numérico decimal | Sí | Mayor a 0; Hasta 2 decimales |
| fecha | Fecha | Sí | Fecha real en formato AAAA-MM-DD |
| proveedor | Texto | No | Texto de 1 a 80 caracteres sin espacios sobrantes |

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Formulario de gasto         │
├──────────────────────────────┤
│ rubro id                     │
│ [____________________]       │
│ descripcion                  │
│ [____________________]       │
│ monto                        │
│ [____________________]       │
│ fecha                        │
│ [____________________]       │
│ proveedor                    │
│ [____________________]       │
│                              │
│ [        Guardar        ]    │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay gastos. Tocá «Guardar» para empezar. |
| Con datos | Rubro, proveedor, concepto, monto, fecha |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.5 Comparación

- **Archivo:** `app/comparacion.tsx`
- **Qué muestra:** Tabla presupuesto vs gasto por rubro con semáforo
- **Acciones:** Filtrar por período
- **Historias relacionadas:** HU-01, HU-02, HU-03, HU-04 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Comparación                 │
├──────────────────────────────┤
│ nombre · fecha               │
│ nombre · fecha               │
│ nombre · fecha               │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay información para mostrar. |
| Con datos | Tabla presupuesto vs gasto por rubro con semáforo |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

### 2.6 Avance

- **Archivo:** `app/avance.tsx`
- **Qué muestra:** Historial de avance con notas
- **Acciones:** Registrar avance
- **Historias relacionadas:** HU-03, HU-05 (sugerido por coincidencia de temas; confirmar al construir).

**Bosquejo**

```
┌──────────────────────────────┐
│ ←  Avance                      │
├──────────────────────────────┤
│ fecha · obra_id              │
│ fecha · obra_id              │
│ fecha · obra_id              │
│                              │
│                         (+)  │
└──────────────────────────────┘
```

**Estados**

| Estado | Qué ve el usuario |
|---|---|
| Cargando | Indicador breve; la base es local, rara vez se nota |
| Vacío | Todavía no hay avances. Tocá «Registrar avance» para empezar. |
| Con datos | Historial de avance con notas |
| Error | Mensaje «No se pudo guardar/cargar. Intentá de nuevo» con botón de reintento; el error técnico va a la consola |
| Sin cambios (formularios) | El botón guardar queda deshabilitado hasta que haya cambios válidos |

**Accesibilidad:** cada botón con `accessibilityLabel`, áreas táctiles de 48 px o más, no depender solo del color para indicar estado.

## 3. Flujos principales

**HU-01 — Crear una obra con presupuesto**

```
ingreso presupuesto 120.000 Bs  →  se crea la obra y aparece en Inicio
```

**HU-02 — Definir rubros y su presupuesto**

```
asigno rubros que suman 130.000 Bs  →  aparece una advertencia de que se supera el presupuesto total
```

**HU-03 — Registrar gastos con proveedor**

```
registro 2.500 Bs de cemento al proveedor Ferrotodo  →  el gasto aparece en el rubro y el acumulado sube
```

**HU-04 — Presupuesto vs real y alertas**

```
abro Comparación  →  aparece en alerta amarilla al 82%
```

**HU-05 — Avance con notas y exportación**

```
registro 55% con una nota  →  el avance actual pasa a 55% y se conserva el historial
```
