import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { fromDatetimeLocal, toDatetimeLocal } from '@/utils/datetime'
import type { Battle, BattleInput } from '@/types'

interface BattleFormProps {
  battle?: Battle
  isPending: boolean
  onSubmit: (input: BattleInput) => void
}

/** Create/edit form for a battle, including optional schedule. */
export function BattleForm({ battle, isPending, onSubmit }: BattleFormProps) {
  const [title, setTitle] = useState(battle?.title ?? '')
  const [description, setDescription] = useState(battle?.description ?? '')
  const [start, setStart] = useState(toDatetimeLocal(battle?.startDate ?? null))
  const [end, setEnd] = useState(toDatetimeLocal(battle?.endDate ?? null))

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return
    onSubmit({
      title,
      description,
      startDate: fromDatetimeLocal(start),
      endDate: fromDatetimeLocal(end),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="battle-title">Título</Label>
        <Input
          id="battle-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="¿Cuál es la mejor…?"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="battle-description">Descripción</Label>
        <Textarea
          id="battle-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Cuenta de qué se trata la batalla"
          rows={3}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="battle-start">Inicio programado</Label>
          <Input
            id="battle-start"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="battle-end">Término programado</Label>
          <Input
            id="battle-end"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Deja las fechas vacías para una batalla sin límite de tiempo.
      </p>
      <Button type="submit" disabled={isPending || !title.trim()} className="w-full">
        {isPending ? 'Guardando…' : battle ? 'Guardar cambios' : 'Crear batalla'}
      </Button>
    </form>
  )
}
