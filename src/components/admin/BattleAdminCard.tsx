import { useState } from 'react'
import { EraserIcon, PencilIcon, PowerIcon, Trash2Icon } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDeleteBattle, useResetVotes, useSetActiveBattle } from '@/hooks/useAdminBattles'
import { formatDateTime } from '@/utils/datetime'
import { getEffectiveStatus } from '@/utils/battleStatus'
import type { Battle, EffectiveBattleStatus } from '@/types'

const STATUS_LABELS: Record<EffectiveBattleStatus, string> = {
  live: 'En vivo',
  scheduled: 'Programada',
  ended: 'Finalizada',
  draft: 'Borrador',
}

interface BattleAdminCardProps {
  battle: Battle
  isActive: boolean
  onEdit: (battle: Battle) => void
}

/** One battle in the admin list, with activate / edit / reset / delete actions. */
export function BattleAdminCard({ battle, isActive, onEdit }: BattleAdminCardProps) {
  const setActive = useSetActiveBattle()
  const resetVotes = useResetVotes()
  const deleteBattle = useDeleteBattle()
  const [confirmingDelete, setConfirmingDelete] = useState(false)
  const status = getEffectiveStatus(battle)

  return (
    <article className="space-y-3 rounded-2xl border bg-card/60 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <h3 className="truncate font-semibold">{battle.title}</h3>
          <p className="text-xs text-muted-foreground">
            {formatDateTime(battle.startDate)} → {formatDateTime(battle.endDate)}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          {isActive && (
            <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-400">Activa</Badge>
          )}
          <Badge variant="outline" className="text-muted-foreground">
            {STATUS_LABELS[status]}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={isActive ? 'secondary' : 'default'}
          disabled={setActive.isPending}
          onClick={() => setActive.mutate(isActive ? null : battle.id)}
        >
          <PowerIcon aria-hidden="true" />
          {isActive ? 'Desactivar' : 'Activar'}
        </Button>
        <Button size="sm" variant="outline" onClick={() => onEdit(battle)}>
          <PencilIcon aria-hidden="true" />
          Editar
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={resetVotes.isPending}
          onClick={() => resetVotes.mutate(battle.id)}
        >
          <EraserIcon aria-hidden="true" />
          Reiniciar votos
        </Button>

        <AlertDialog open={confirmingDelete} onOpenChange={setConfirmingDelete}>
          <AlertDialogTrigger asChild>
            <Button
              size="sm"
              variant="ghost"
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2Icon aria-hidden="true" />
              Eliminar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Eliminar “{battle.title}”?</AlertDialogTitle>
              <AlertDialogDescription>
                Se borrará la batalla con todas sus opciones y votos. Esta acción no se puede
                deshacer.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={() => deleteBattle.mutate(battle.id)}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </article>
  )
}
