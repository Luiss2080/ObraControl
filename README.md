<div align="center">

<img src="docs/assets/logo.svg" alt="ObraControl" width="96" height="96">

# ObraControl

**Presupuesto vs gasto real de una obra o remodelación, por rubro, con avance y proveedores.** Pensado para quien construye o remodela, offline.

[🚀 Características](#-características) · [🧰 Stack](#-stack) · [📂 Estructura](#-estructura) · [🔧 Configuración](#-configuración) · [🧪 Pruebas](#-pruebas) · [🤝 Contribuir](#-contribuir) · [📄 Licencia](#-licencia)

</div>

---

## 🚀 Características

- Obras con presupuesto total y fecha de inicio.
- Rubros (albañilería, electricidad, acabados) con su presupuesto.
- Gastos por rubro con proveedor y monto.
- Comparación presupuesto vs gasto real y alertas de sobrecosto.
- Avance porcentual de la obra con notas.
- Exportación CSV para contabilidad.

> Sin servidores, sin suscripciones y sin servicios de pago: todos los datos viven en el dispositivo (SQLite).

## 🧰 Stack

| Capa | Tecnología |
|---|---|
| App | React Native + Expo (TypeScript) |
| Datos | SQLite local (expo-sqlite) |
| Navegación | Expo Router |
| Compartir | Hoja de compartir del sistema (expo-sharing), WhatsApp incluido |
| Archivos | Exportación CSV al dispositivo (expo-file-system) |
| Distribución | APK / EAS Build local |

### Modelo de datos

- `obras` (id, nombre, presupuesto_total, fecha_inicio)
- `rubros` (id, obra_id, nombre, presupuesto)
- `gastos` (id, rubro_id, descripcion, monto, fecha, proveedor)
- `avances` (id, obra_id, fecha, porcentaje, nota)

El detalle de cada tabla y la política de migraciones están en [docs/ARQUITECTURA.md](docs/ARQUITECTURA.md).

## 🗺️ Roadmap

1. Estructura base y navegación
2. Obras y rubros
3. Gastos y proveedores
4. Presupuesto vs real y alertas
5. Avance y exportación CSV

> Detalle fase por fase: [docs/ROADMAP.md](docs/ROADMAP.md) · [docs/SPEC.md](docs/SPEC.md) · [docs/PLANNING.md](docs/PLANNING.md)

## 📂 Estructura

```
ObraControl/
├── app/            # Pantallas y rutas (Expo Router)
├── src/
│   ├── db/         # Esquema, migraciones y consultas SQLite
│   ├── components/ # Componentes reutilizables
│   └── lib/        # Utilidades (formato, CSV)
├── docs/assets/    # Logo y recursos del README
└── .github/        # Plantillas, CI y Dependabot
```

## 🔧 Configuración

**Requisitos:** Node.js 20+ y la app Expo Go (o un emulador).

```bash
git clone https://github.com/Luiss2080/ObraControl.git
cd ObraControl
npm install
npx expo start
```

Escaneá el QR con Expo Go para abrir la app en tu teléfono. La base local se crea sola en el primer arranque.

El repositorio está en fase inicial: la estructura, la base de datos y la documentación están listas y la app se construye siguiendo el roadmap.

## 🧪 Pruebas

```bash
npm test
npm run lint
npx tsc --noEmit
```

## 🤝 Contribuir

Leé la [guía de contribución](CONTRIBUTING.md) y el [código de conducta](CODE_OF_CONDUCT.md). Para reportar vulnerabilidades consultá la [política de seguridad](SECURITY.md); para dudas, [SUPPORT.md](SUPPORT.md).

## 📄 Licencia

Distribuido bajo licencia MIT. Consultá [LICENSE](LICENSE).

---

<div align="center">

Hecho por [Luiss2080](https://github.com/Luiss2080)

</div>
