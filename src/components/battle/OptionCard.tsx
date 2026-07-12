import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { OptionAvatar } from './OptionAvatar'
import { formatPercentage } from '@/utils/format'
import { cn } from '@/lib/utils'
import type { RankedOption } from '@/utils/ranking'

interface OptionCardProps {
  option: RankedOption
  canVote: boolean
  onVote: (optionId: string) => void
}

interface Burst {
  id: number
  x: number
}

const RANK_STYLES: Record<number, string> = {
  1: 'bg-gradient-to-br from-amber-400 to-orange-500 text-neutral-950',
  2: 'bg-neutral-300 text-neutral-900',
  3: 'bg-amber-800/80 text-amber-100',
}

/**
 * One votable option: whole card is the vote button. Shows rank, name, live
 * vote count, share percentage and a bar relative to the current leader.
 */
export function OptionCard({ option, canVote, onVote }: OptionCardProps) {
  const [bursts, setBursts] = useState<Burst[]>([])
  const burstId = useRef(0)
  const isLeader = option.position === 1 && option.displayVotes > 0

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!canVote) return
    onVote(option.id)
    const rect = event.currentTarget.getBoundingClientRect()
    const id = burstId.current++
    const x = event.clientX > 0 ? event.clientX - rect.left : rect.width / 2
    setBursts((current) => [...current.slice(-4), { id, x }])
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      disabled={!canVote}
      whileTap={canVote ? { scale: 0.975 } : undefined}
      className={cn(
        'relative w-full select-none overflow-hidden rounded-2xl border bg-card/60 p-4 text-left backdrop-blur transition-colors sm:p-5',
        canVote && 'cursor-pointer hover:border-amber-500/40 hover:bg-card',
        isLeader && 'border-amber-500/40 shadow-[0_0_32px_-12px_theme(colors.amber.500/60%)]',
      )}
      aria-label={`Votar por ${option.name}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        <span
          className={cn(
            'flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold sm:size-9 sm:text-sm',
            // Medals only mean something once there are votes.
            (option.displayVotes > 0 && RANK_STYLES[option.position]) ||
              'bg-secondary text-muted-foreground',
          )}
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {option.position}
        </span>

        <OptionAvatar name={option.name} imageUrl={option.imageUrl} />

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex items-baseline justify-between gap-3">
            <span className="truncate font-semibold sm:text-lg">{option.name}</span>
            <span className="flex shrink-0 items-baseline gap-2">
              <AnimatedNumber
                value={option.displayVotes}
                className="text-sm font-bold sm:text-base"
              />
              <span
                className="w-12 text-right text-xs text-muted-foreground"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {formatPercentage(option.percentage)}
              </span>
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
            <motion.div
              className={cn(
                'h-full rounded-full',
                isLeader
                  ? 'bg-gradient-to-r from-amber-400 to-red-500'
                  : 'bg-gradient-to-r from-amber-500/70 to-orange-500/70',
              )}
              initial={false}
              animate={{ width: `${Math.max(option.relativeToLeader, 1)}%` }}
              transition={{ type: 'spring', stiffness: 140, damping: 26 }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.span
            key={burst.id}
            initial={{ opacity: 1, y: 0, scale: 0.9 }}
            animate={{ opacity: 0, y: -36, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setBursts((current) => current.filter((b) => b.id !== burst.id))
            }
            className="pointer-events-none absolute top-3 text-sm font-bold text-amber-400"
            style={{ left: burst.x }}
            aria-hidden="true"
          >
            +1
          </motion.span>
        ))}
      </AnimatePresence>
    </motion.button>
  )
}
