import { Link } from 'react-router'
import { CompassIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/shared/EmptyState'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <EmptyState
      icon={CompassIcon}
      title="Página no encontrada"
      description="El enlace que seguiste no existe o fue movido."
      action={
        <Button asChild variant="outline">
          <Link to={ROUTES.home}>Ir a la batalla</Link>
        </Button>
      }
    />
  )
}
