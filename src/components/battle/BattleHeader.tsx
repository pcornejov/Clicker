import type { Battle, EffectiveBattleStatus } from '@/types'
import { cn } from '@/lib/utils'

const STATUS_BADGES: Record<EffectiveBattleStatus, { label: string; className: string }> = {
  live: { label: 'En vivo', className: 'border-red-500/30 bg-red-500/10 text-red-400' },
  scheduled: {
    label: 'Próximamente',
    className: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
  },
  ended: { label: 'Finalizada', className: 'border-border bg-card text-muted-foreground' },
  draft: { label: 'Borrador', className: 'border-border bg-card text-muted-foreground' },
}

interface BattleHeaderProps {
  battle: Battle
  status: EffectiveBattleStatus
}

export function BattleHeader({ battle, status }: BattleHeaderProps) {
  const badge = STATUS_BADGES[status]
  return (
    <header className="space-y-4 text-center">
      <span
        className={cn(
          'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest',
          badge.className,
        )}
      >
        {status === 'live' && (
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-red-500" />
          </span>
        )}
        {badge.label}
      </span>
      <h1 className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">{battle.title}</h1>
      {battle.description && (
        <p className="mx-auto max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          {battle.description}
        </p>
      )}
    </header>
  )
}
