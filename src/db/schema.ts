// Cada elemento es una migración. Para cambiar el esquema, AGREGÁ uno nuevo al final;
// nunca edites uno ya publicado.
export const MIGRACIONES: string[] = [
  `CREATE TABLE obras (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, presupuesto_total REAL NOT NULL DEFAULT 0, fecha_inicio TEXT);
CREATE TABLE rubros (id INTEGER PRIMARY KEY AUTOINCREMENT, obra_id INTEGER NOT NULL REFERENCES obras(id) ON DELETE CASCADE, nombre TEXT NOT NULL, presupuesto REAL NOT NULL DEFAULT 0);
CREATE TABLE gastos (id INTEGER PRIMARY KEY AUTOINCREMENT, rubro_id INTEGER NOT NULL REFERENCES rubros(id) ON DELETE CASCADE, descripcion TEXT NOT NULL, monto REAL NOT NULL, fecha TEXT NOT NULL, proveedor TEXT);
CREATE TABLE avances (id INTEGER PRIMARY KEY AUTOINCREMENT, obra_id INTEGER NOT NULL REFERENCES obras(id) ON DELETE CASCADE, fecha TEXT NOT NULL, porcentaje REAL NOT NULL, nota TEXT);`,
];

export const TABLAS = ['obras', 'rubros', 'gastos', 'avances'] as const;
