import { Link, Outlet } from 'react-router'
import { AdSlot } from '@/components/ads/AdSlot'
import { ConsentBanner } from '@/components/ads/ConsentBanner'
import { APP_FLAG_EMOJI, APP_NAME, APP_TAGLINE } from '@/constants/appConfig'
import { ROUTES } from '@/constants/routes'

export function MainLayout() {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-clip">
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] bg-[radial-gradient(60%_50%_at_50%_0%,theme(colors.blue.500/12%),transparent)]"
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

      {/*
        Deliberately in the footer, far from the voting grid at the top of
        the page — see lib/ads.ts for why proximity to the tap target matters.
      */}
      <div className="mx-auto w-full max-w-2xl px-4">
        <AdSlot />
      </div>

      <footer className="mx-auto w-full max-w-2xl space-y-2 px-4 py-6 text-center text-xs text-muted-foreground">
        <p>
          {APP_NAME} — hecho en Chile {APP_FLAG_EMOJI}
        </p>
        <Link
          to={ROUTES.privacy}
          className="inline-block underline underline-offset-2 hover:text-foreground"
        >
          Privacidad
        </Link>
      </footer>

      <ConsentBanner />
    </div>
  )
}
