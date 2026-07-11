import { InfinityIcon } from 'lucide-react'
import { useCountdown } from '@/hooks/useCountdown'

interface CountdownTimerProps {
  label: string
  target: Date | null
}

const pad = (n: number) => String(n).padStart(2, '0')

export function CountdownTimer({ label, target }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(target)

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {target === null ? (
        <span className="flex h-8 items-center text-muted-foreground" title="Sin fecha límite">
          <InfinityIcon className="size-6" aria-label="Sin fecha límite" />
        </span>
      ) : (
        <span
          className="text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {isExpired
            ? '00:00:00'
            : `${days > 0 ? `${days}d ` : ''}${pad(hours)}:${pad(minutes)}:${pad(seconds)}`}
        </span>
      )}
    </div>
  )
}
