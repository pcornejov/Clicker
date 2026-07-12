import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import { useConsent } from '@/hooks/useConsent'
import { ADS_ENABLED } from '@/lib/ads'
import { ROUTES } from '@/constants/routes'

/**
 * Cookie-consent prompt for personalized ads. Renders nothing unless ads
 * are enabled (VITE_ADS_ENABLED=true) and the visitor hasn't answered yet.
 */
export function ConsentBanner() {
  const { consent, setConsent } = useConsent()

  if (!ADS_ENABLED || consent !== null) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-4 backdrop-blur">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-xs text-muted-foreground sm:text-left">
          Usamos cookies para mostrar publicidad personalizada.{' '}
          <Link to={ROUTES.privacy} className="underline underline-offset-2 hover:text-foreground">
            Más información
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <Button size="sm" variant="outline" onClick={() => setConsent('rejected')}>
            Rechazar
          </Button>
          <Button size="sm" onClick={() => setConsent('accepted')}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  )
}
