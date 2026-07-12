import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useCreateBattle, useUpdateBattle } from '@/hooks/useAdminBattles'
import type { Battle, BattleInput } from '@/types'
import { BattleForm } from './BattleForm'
import { OptionsEditor } from './OptionsEditor'

interface BattleEditorDialogProps {
  /** undefined = closed, null = creating, Battle = editing. */
  battle: Battle | null | undefined
  onClose: () => void
}

export function BattleEditorDialog({ battle, onClose }: BattleEditorDialogProps) {
  const createBattle = useCreateBattle()
  const updateBattle = useUpdateBattle()
  const isEditing = Boolean(battle)

  const handleSubmit = (input: BattleInput) => {
    if (battle) {
      updateBattle.mutate({ battleId: battle.id, input }, { onSuccess: onClose })
    } else {
      createBattle.mutate(input, { onSuccess: onClose })
    }
  }

  return (
    <Dialog open={battle !== undefined} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[85dvh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Editar batalla' : 'Nueva batalla'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Cambia los datos, la programación o las opciones.'
              : 'Crea la batalla y luego agrégale opciones.'}
          </DialogDescription>
        </DialogHeader>

        <BattleForm
          key={battle?.id ?? 'new'}
          battle={battle ?? undefined}
          isPending={createBattle.isPending || updateBattle.isPending}
          onSubmit={handleSubmit}
        />

        {battle && (
          <>
            <Separator />
            <OptionsEditor battleId={battle.id} />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
