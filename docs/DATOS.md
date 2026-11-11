# Modelo de datos — ObraControl

> Diseño detallado de la base SQLite: campos, validaciones, consultas y migraciones. Complementa la sección 6 de [SPEC.md](SPEC.md).

## 1. Convenciones

- Base local `SQLite` con `expo-sqlite`; versión del esquema en `PRAGMA user_version`.
- Claves primarias `INTEGER AUTOINCREMENT` llamadas `id`.
- Fechas como texto ISO `AAAA-MM-DD` (y `AAAA-MM-DDTHH:MM` cuando hay hora). Nunca se guardan textos como «hoy».
- Montos como `REAL` en bolivianos; se redondean a 2 decimales al guardar y se formatean al mostrar.
- Booleanos como `INTEGER` 0/1.
- Los textos se guardan sin espacios sobrantes (`trim()`).
- Todas las consultas usan parámetros (`?`), nunca concatenan texto del usuario.
- Las claves foráneas se activan con `PRAGMA foreign_keys = ON` al abrir la base.

## 2. Relaciones

| Campo | Apunta a | Comportamiento |
|---|---|---|
| `rubros.obra_id` | `obras` | Al borrar el padre se borran los hijos |
| `gastos.rubro_id` | `rubros` | Al borrar el padre se borran los hijos |
| `avances.obra_id` | `obras` | Al borrar el padre se borran los hijos |

```
obras  ──<  rubros, avances
rubros  ──<  gastos
gastos
avances
```

## 3. Detalle por tabla

### 3.1 `obras`

Cada obra con su presupuesto total.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `presupuesto_total` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |
| `fecha_inicio` | TEXT → `string \| null` | Fecha | Opcional; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_obras_fecha_inicio ON obras(fecha_inicio);
```

**Consultas base** (en `src/db/obras.ts`):

```ts
listar(): Promise<Obra[]>            // SELECT * FROM obras ORDER BY id DESC
obtener(id: number): Promise<Obra | null>   // SELECT * FROM obras WHERE id = ?
crear(datos: NuevoObra): Promise<number>   // INSERT INTO obras (nombre, presupuesto_total, fecha_inicio) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoObra): Promise<void>   // UPDATE obras SET nombre = ?, presupuesto_total = ?, fecha_inicio = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM obras WHERE id = ?
```

### 3.2 `rubros`

Partidas de la obra con su presupuesto.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `obra_id` | INTEGER → `number` | Selector de obras | Obligatorio; Debe existir en `obras` | «Elegí un registro» |
| `nombre` | TEXT → `string` | Texto | Obligatorio; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí nombre» |
| `presupuesto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales; Valor inicial `0` | «Ingresá un número válido» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_rubros_obra_id ON rubros(obra_id);
```

**Consultas base** (en `src/db/rubros.ts`):

```ts
listar(): Promise<Rubro[]>            // SELECT * FROM rubros ORDER BY id DESC
obtener(id: number): Promise<Rubro | null>   // SELECT * FROM rubros WHERE id = ?
crear(datos: NuevoRubro): Promise<number>   // INSERT INTO rubros (obra_id, nombre, presupuesto) VALUES (?, ?, ?)
actualizar(id: number, datos: NuevoRubro): Promise<void>   // UPDATE rubros SET obra_id = ?, nombre = ?, presupuesto = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM rubros WHERE id = ?
listarPorObra(obra_id: number): Promise<Rubro[]>   // WHERE obra_id = ?
```

### 3.3 `gastos`

Gastos reales por rubro y proveedor.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `rubro_id` | INTEGER → `number` | Selector de rubros | Obligatorio; Debe existir en `rubros` | «Elegí un registro» |
| `descripcion` | TEXT → `string` | Texto largo | Obligatorio; Hasta 280 caracteres | «Máximo 280 caracteres» |
| `monto` | REAL → `number` | Numérico decimal | Obligatorio; Mayor a 0; Hasta 2 decimales | «Ingresá un monto mayor a 0» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `proveedor` | TEXT → `string \| null` | Texto | Opcional; Texto de 1 a 80 caracteres sin espacios sobrantes | «Escribí proveedor» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_gastos_rubro_id ON gastos(rubro_id);
CREATE INDEX IF NOT EXISTS idx_gastos_fecha ON gastos(fecha);
```

**Consultas base** (en `src/db/gastos.ts`):

```ts
listar(): Promise<Gasto[]>            // SELECT * FROM gastos ORDER BY id DESC
obtener(id: number): Promise<Gasto | null>   // SELECT * FROM gastos WHERE id = ?
crear(datos: NuevoGasto): Promise<number>   // INSERT INTO gastos (rubro_id, descripcion, monto, fecha, proveedor) VALUES (?, ?, ?, ?, ?)
actualizar(id: number, datos: NuevoGasto): Promise<void>   // UPDATE gastos SET rubro_id = ?, descripcion = ?, monto = ?, fecha = ?, proveedor = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM gastos WHERE id = ?
listarPorRubro(rubro_id: number): Promise<Gasto[]>   // WHERE rubro_id = ?
```

### 3.4 `avances`

Porcentaje de avance con notas.

| Campo | Tipo SQL → TS | Control en formulario | Validación | Mensaje de error |
|---|---|---|---|---|
| `id` | INTEGER | Automático | Clave primaria | — |
| `obra_id` | INTEGER → `number` | Selector de obras | Obligatorio; Debe existir en `obras` | «Elegí un registro» |
| `fecha` | TEXT → `string` | Fecha | Obligatorio; Fecha real en formato AAAA-MM-DD | «Fecha no válida» |
| `porcentaje` | REAL → `number` | Numérico decimal | Obligatorio; Mayor o igual a 0; Hasta 2 decimales | «Ingresá un número válido» |
| `nota` | TEXT → `string \| null` | Texto largo | Opcional; Hasta 280 caracteres | «Máximo 280 caracteres» |

**Índices recomendados** (agregarlos en la migración si aún no existen):

```sql
CREATE INDEX IF NOT EXISTS idx_avances_obra_id ON avances(obra_id);
CREATE INDEX IF NOT EXISTS idx_avances_fecha ON avances(fecha);
```

**Consultas base** (en `src/db/avances.ts`):

```ts
listar(): Promise<Avanc[]>            // SELECT * FROM avances ORDER BY id DESC
obtener(id: number): Promise<Avanc | null>   // SELECT * FROM avances WHERE id = ?
crear(datos: NuevoAvanc): Promise<number>   // INSERT INTO avances (obra_id, fecha, porcentaje, nota) VALUES (?, ?, ?, ?)
actualizar(id: number, datos: NuevoAvanc): Promise<void>   // UPDATE avances SET obra_id = ?, fecha = ?, porcentaje = ?, nota = ? WHERE id = ?
eliminar(id: number): Promise<void>      // DELETE FROM avances WHERE id = ?
listarPorObra(obra_id: number): Promise<Avanc[]>   // WHERE obra_id = ?
```

## 4. Tipos TypeScript

Copiar a `src/db/tipos.ts`:

```ts
export interface Obra {
  id: number;
  nombre: string;
  presupuesto_total: number;
  fecha_inicio: string | null;
}
export type NuevoObra = Omit<Obra, 'id'>;

export interface Rubro {
  id: number;
  obra_id: number;
  nombre: string;
  presupuesto: number;
}
export type NuevoRubro = Omit<Rubro, 'id'>;

export interface Gasto {
  id: number;
  rubro_id: number;
  descripcion: string;
  monto: number;
  fecha: string;
  proveedor: string | null;
}
export type NuevoGasto = Omit<Gasto, 'id'>;

export interface Avanc {
  id: number;
  obra_id: number;
  fecha: string;
  porcentaje: number;
  nota: string | null;
}
export type NuevoAvanc = Omit<Avanc, 'id'>;

```

## 5. Valores permitidos (enumeraciones)

Esta app no usa columnas con valores cerrados.

## 6. Migraciones

Migración 1 = esquema inicial (ya en `src/db/schema.ts`). Cada cambio posterior es una migración nueva al final de la lista; nunca se edita una ya publicada.

No se prevén migraciones adicionales dentro del MVP.

## 7. Esquema inicial completo

```sql
CREATE TABLE obras (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, presupuesto_total REAL NOT NULL DEFAULT 0, fecha_inicio TEXT);
CREATE TABLE rubros (id INTEGER PRIMARY KEY AUTOINCREMENT, obra_id INTEGER NOT NULL REFERENCES obras(id) ON DELETE CASCADE, nombre TEXT NOT NULL, presupuesto REAL NOT NULL DEFAULT 0);
CREATE TABLE gastos (id INTEGER PRIMARY KEY AUTOINCREMENT, rubro_id INTEGER NOT NULL REFERENCES rubros(id) ON DELETE CASCADE, descripcion TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL, proveedor TEXT);
CREATE TABLE avances (id INTEGER PRIMARY KEY AUTOINCREMENT, obra_id INTEGER NOT NULL REFERENCES obras(id) ON DELETE CASCADE, fecha TEXT NOT NULL, porcentaje REAL NOT NULL, nota TEXT);
```

## 8. Reglas de integridad que NO delega a la base

- **RN-01** La suma de los presupuestos de los rubros no puede superar el presupuesto total de la obra (se advierte, no se bloquea).
- **RN-02** Un gasto siempre pertenece a un rubro.
- **RN-03** Desviación de un rubro = gasto real − presupuesto del rubro.
- **RN-04** Un rubro está en alerta al llegar al 80% de su presupuesto y en sobrecosto al superar el 100%.
- **RN-05** El avance de la obra es un valor de 0 a 100 y se registra con fecha; el último valor es el actual.
- **RN-06** El avance no puede disminuir salvo corrección explícita con nota.

Estas reglas se implementan en `src/lib/` como funciones puras y se prueban de forma automática (ver [PRUEBAS.md](PRUEBAS.md)).
