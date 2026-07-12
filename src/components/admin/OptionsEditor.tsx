import { useState, type FormEvent } from 'react'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { useAddOption, useBattleOptions, useRemoveOption } from '@/hooks/useAdminBattles'
import { formatVotes } from '@/utils/format'

interface OptionsEditorProps {
  battleId: string
}

/** Live list of a battle's options with add/remove controls. */
export function OptionsEditor({ battleId }: OptionsEditorProps) {
  const { data: options, isLoading } = useBattleOptions(battleId)
  const addOption = useAddOption()
  const removeOption = useRemoveOption()
  const [name, setName] = useState('')

  const handleAdd = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    addOption.mutate({ battleId, name: trimmed }, { onSuccess: () => setName('') })
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold">Opciones</h3>

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nueva opción"
          aria-label="Nombre de la nueva opción"
        />
        <Button type="submit" size="icon" disabled={addOption.isPending || !name.trim()}>
          <PlusIcon aria-hidden="true" />
          <span className="sr-only">Agregar opción</span>
        </Button>
      </form>

      {isLoading ? (
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))}
        </div>
      ) : (options ?? []).length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          Sin opciones. Agrega la primera arriba.
        </p>
      ) : (
        <ul className="space-y-1.5">
          {(options ?? []).map((option) => (
            <li
              key={option.id}
              className="flex items-center justify-between gap-2 rounded-lg border bg-card/60 px-3 py-2"
            >
              <span className="truncate text-sm font-medium">{option.name}</span>
              <span className="flex items-center gap-3">
                <span
                  className="text-xs text-muted-foreground"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {formatVotes(option.votes)} votos
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-7 text-muted-foreground hover:text-destructive"
                  disabled={removeOption.isPending}
                  onClick={() => removeOption.mutate({ battleId, optionId: option.id })}
                >
                  <Trash2Icon aria-hidden="true" />
                  <span className="sr-only">Eliminar {option.name}</span>
                </Button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
