import { Link, Outlet } from 'react-router'
import { APP_FLAG_EMOJI, APP_NAME, APP_TAGLINE } from '@/constants/appConfig'
import { ROUTES } from '@/constants/routes'

export function MainLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.amber.500/10%),transparent)]"
      />

      <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-4 py-5">
        <Link
          to={ROUTES.home}
          className="flex items-center gap-2 font-bold tracking-tight transition-opacity hover:opacity-80"
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            {APP_FLAG_EMOJI}
          </span>
          {APP_NAME}
        </Link>
        <span className="text-xs text-muted-foreground">{APP_TAGLINE}</span>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6 sm:py-10">
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-2xl px-4 py-6 text-center text-xs text-muted-foreground">
        {APP_NAME} — hecho en Chile {APP_FLAG_EMOJI}
      </footer>
    </div>
  )
}
