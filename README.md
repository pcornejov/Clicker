# 🇨🇱 Chile Vota

Plataforma de batallas virales de clicks. Los usuarios entran, votan por su opción favorita haciendo clic (sin registro, sin login) y comparten el sitio para que gane. La primera batalla es **"¿Cuál es la mejor región de Chile?"**, pero la temática se cambia por completo editando datos en Firestore — el código es agnóstico al tema.

## Stack

- **React 19** + **TypeScript** (estricto) + **Vite**
- **TailwindCSS v4** + **shadcn/ui** + **motion** (animaciones)
- **React Router** + **TanStack React Query**
- **Firebase Firestore** (tiempo real, sin backend propio) + **App Check** (preparado)
- **Cloudflare Pages / GitHub Pages** para hosting, **Cloudflare Turnstile** (preparado)

## Instalación

```bash
git clone https://github.com/pcornejov/Clicker.git
cd Clicker
npm install
cp .env.example .env   # completa tus claves de Firebase
npm run dev
```

### Desarrollo sin credenciales (Firestore Emulator)

```bash
# Terminal 1 — requiere Java
npx firebase-tools emulators:start --project demo-clicker

# Terminal 2
VITE_USE_FIREBASE_EMULATOR=true npm run dev
```

Con el emulador no se necesita ningún proyecto Firebase real. Visita `/admin`, presiona **"Sembrar ejemplo"** y luego **"Activar"**.

## Variables de entorno

| Variable                                         | Descripción                                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------- |
| `VITE_FIREBASE_API_KEY` … `VITE_FIREBASE_APP_ID` | Configuración web de tu proyecto Firebase (Consola → Configuración → Tus apps). |
| `VITE_USE_FIREBASE_EMULATOR`                     | `true` para usar el Firestore Emulator local.                                   |
| `VITE_TURNSTILE_SITE_KEY`                        | Site key de Cloudflare Turnstile (protección, aún no activa).                   |
| `VITE_FIREBASE_APP_CHECK_KEY`                    | Clave del proveedor de App Check (ver `src/firebase/appCheck.ts`).              |
| `VITE_BASE_PATH`                                 | Solo para builds bajo subruta (lo define el workflow de GitHub Pages).          |

Ninguna clave va hardcodeada; el `.env` real nunca se commitea.

## Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/) (sin Google Analytics).
2. Agrega una **app web** y copia la configuración al `.env`.
3. Crea una base **Firestore** (modo producción).
4. Publica las reglas: `npx firebase-tools deploy --only firestore:rules`.
5. En el sitio, entra a `/admin` → **Sembrar ejemplo** → **Activar**.

> ⚠️ **Seguridad del MVP**: `/admin` no tiene autenticación todavía y las reglas de escritura administrativas están abiertas (`isAdmin()` devuelve `true` en `firestore.rules`). Es un riesgo aceptado para validar la hipótesis; el TODO de login + reglas reales está marcado en el código.

## Deploy

### GitHub Pages (activo)

El workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) construye y publica en cada push a `main`.

1. En GitHub: **Settings → Pages → Source: GitHub Actions**.
2. En **Settings → Secrets and variables → Actions**, crea los secrets `VITE_FIREBASE_*` con los valores de tu `.env`.
3. Push a `main` → el sitio queda en `https://<usuario>.github.io/Clicker/`.
4. En Firebase Console → Authentication/App Check no hay nada que tocar, pero agrega el dominio de Pages a los dominios autorizados si activas App Check.

El build copia `index.html` a `404.html` para que el enrutado SPA funcione en Pages.

### Cloudflare Pages (preparado)

Flujo de dominio: **NIC Chile → Cloudflare DNS → Cloudflare Pages → React → Firestore**.

1. Cloudflare Dashboard → **Workers & Pages → Create → Pages → conectar el repo**.
2. Build command: `npm run build` · Output: `dist` (el archivo `public/_redirects` ya maneja el SPA).
3. Define las variables `VITE_FIREBASE_*` en la configuración del proyecto.
4. Apunta los nameservers del dominio `.cl` (NIC Chile) a Cloudflare y asigna el dominio custom al proyecto de Pages.
5. Activa **Cloudflare Web Analytics** desde el dashboard (no requiere código; no usamos Google/Firebase Analytics).

## Arquitectura

Toda la comunicación con Firebase pasa por una **capa de servicios**; los componentes nunca tocan Firestore.

```
Componentes → Hooks (React Query) → BattleService (interfaz) → Firestore
```

- **`BattleService`** (`src/services/battleService.ts`) es una interfaz agnóstica al backend. Para migrar a un backend propio basta con escribir otra implementación y cambiarla en `src/services/index.ts`.
- **Realtime sin polling**: `useFirestoreSubscription` conecta `onSnapshot` con el cache de React Query (`setQueryData`), y los componentes consumen datos vivos con `useQuery`.
- **Batching de votos**: los clicks se acumulan en `VoteBuffer` y se envían con `increment(n)` cada 1,5 s (y al ocultar la página). La UI es optimista: el contador local se reconcilia con los snapshots. Esto reduce ~10-50× los writes y evita el límite de escritura por documento.
- **Total de votos en el cliente**: se suma desde las opciones; el documento de la batalla nunca es un hot-spot de escritura.
- **Estado efectivo derivado**: `getEffectiveStatus()` combina `status` con `startDate`/`endDate`, sin cron jobs.

### Modelo de datos (Firestore)

```
battles/{battleId}              title, description, status, startDate, endDate, createdAt, updatedAt
  └─ options/{optionId}         battleId, name, votes, createdAt
settings/app                    activeBattleId
```

## Estructura del proyecto

```
src/
  assets/          Recursos estáticos
  components/
    battle/        Portada: header, countdown, tarjetas de opciones, ranking, compartir
    admin/         Panel: formulario, editor de opciones, tarjetas de batalla
    shared/        Skeletons, estados vacíos/error, número animado
    ui/            shadcn/ui
  constants/       Config de la app, rutas, query keys, datos de ejemplo
  contexts/        Providers (React Query + toasts)
  firebase/        Init por env vars, emulador, stub de App Check
  hooks/           useActiveBattle, useVote, useCountdown, useShare, admin CRUD
  layouts/         MainLayout
  pages/           BattlePage, AdminPage, NotFoundPage
  services/        BattleService (interfaz) + implementación Firestore + VoteBuffer
  types/           Battle, BattleOption, AppSettings
  utils/           Ranking, formato es-CL, fechas, estado efectivo
firestore.rules    Reglas con validación de incrementos de votos
```

## Scripts

| Script                            | Descripción                                 |
| --------------------------------- | ------------------------------------------- |
| `npm run dev`                     | Servidor de desarrollo con HMR.             |
| `npm run build`                   | Typecheck + build de producción en `dist/`. |
| `npm run preview`                 | Sirve el build localmente.                  |
| `npm run lint`                    | ESLint.                                     |
| `npm run typecheck`               | `tsc -b` sin emitir.                        |
| `npm run format` / `format:check` | Prettier.                                   |

## Roadmap (TODOs, no implementado)

- [ ] Usuarios y login con Google (y con ello, reglas reales para `/admin`)
- [ ] Historial y batallas archivadas
- [ ] Rankings históricos y logros
- [ ] Notificaciones
- [ ] Publicidad, donaciones y patrocinios
- [ ] SEO (Open Graph, títulos dinámicos) y PWA
- [ ] Tema claro e internacionalización
- [ ] Sharding de contadores si una opción supera ~1 write/s sostenido
- [ ] Activar Firebase App Check + Cloudflare Turnstile (stubs listos)
