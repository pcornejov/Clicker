import { RefreshCwIcon, WifiOffIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from './EmptyState'

interface ErrorStateProps {
  title?: string
  description?: string
}

export function ErrorState({
  title = 'Algo salió mal',
  description = 'No pudimos cargar la batalla. Revisa tu conexión e inténtalo de nuevo.',
}: ErrorStateProps) {
  return (
    <EmptyState
      icon={WifiOffIcon}
      title={title}
      description={description}
      action={
        <Button variant="outline" onClick={() => window.location.reload()}>
          <RefreshCwIcon aria-hidden="true" />
          Reintentar
        </Button>
      }
    />
  )
}
