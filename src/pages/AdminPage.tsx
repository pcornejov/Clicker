import { useState } from 'react'
import { PlusIcon, SproutIcon, SwordsIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { BattleAdminCard } from '@/components/admin/BattleAdminCard'
import { BattleEditorDialog } from '@/components/admin/BattleEditorDialog'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { useActiveBattleId, useBattlesList, useSeedExampleBattle } from '@/hooks/useAdminBattles'
import type { Battle } from '@/types'

// TODO(roadmap): protect this route with authentication (Google login) and
// lock down the matching write rules in firestore.rules.
export function AdminPage() {
  const { data: battles, isLoading, isError } = useBattlesList()
  const { data: activeBattleId } = useActiveBattleId()
  const seedBattle = useSeedExampleBattle()
  /** undefined = dialog closed, null = creating, Battle = editing. */
  const [editing, setEditing] = useState<Battle | null | undefined>(undefined)

  if (isError) {
    return <ErrorState description="No pudimos cargar las batallas. Inténtalo de nuevo." />
  }

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Administración</h1>
          <p className="text-sm text-muted-foreground">Batallas, opciones y programación.</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            disabled={seedBattle.isPending}
            onClick={() => seedBattle.mutate()}
          >
            <SproutIcon aria-hidden="true" />
            Sembrar ejemplo
          </Button>
          <Button onClick={() => setEditing(null)}>
            <PlusIcon aria-hidden="true" />
            Nueva batalla
          </Button>
        </div>
      </header>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-32 w-full rounded-2xl" />
          ))}
        </div>
      ) : (battles ?? []).length === 0 ? (
        <EmptyState
          icon={SwordsIcon}
          title="Aún no hay batallas"
          description="Crea tu primera batalla o siembra el ejemplo de las regiones de Chile."
          action={
            <Button disabled={seedBattle.isPending} onClick={() => seedBattle.mutate()}>
              <SproutIcon aria-hidden="true" />
              Sembrar batalla de ejemplo
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {(battles ?? []).map((battle) => (
            <BattleAdminCard
              key={battle.id}
              battle={battle}
              isActive={battle.id === activeBattleId}
              onEdit={setEditing}
            />
          ))}
        </div>
      )}

      <BattleEditorDialog battle={editing} onClose={() => setEditing(undefined)} />
    </div>
  )
}
