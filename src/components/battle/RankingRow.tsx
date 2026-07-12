import { motion } from 'motion/react'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { OptionAvatar } from './OptionAvatar'
import { formatPercentage } from '@/utils/format'
import { cn } from '@/lib/utils'
import type { RankedOption } from '@/utils/ranking'

const RANK_STYLES: Record<number, string> = {
  // Copper tone — a nod to Chile as the world's top copper producer.
  1: 'bg-gradient-to-br from-amber-400 to-orange-600 text-neutral-950',
  2: 'bg-neutral-300 text-neutral-900',
  3: 'bg-amber-800/80 text-amber-100',
}

interface RankingRowProps {
  option: RankedOption
}

/**
 * Read-only leaderboard row: position, name, live vote count, share
 * percentage and a bar relative to the current leader. Not a vote target —
 * see OptionGrid for that. Reorders via layout animation as votes change.
 */
export function RankingRow({ option }: RankingRowProps) {
  const isLeader = option.position === 1 && option.displayVotes > 0

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 32 }}
      data-testid="ranking-row"
      data-name={option.name}
      className={cn(
        'flex items-center gap-2.5 rounded-2xl border bg-card/60 p-3 backdrop-blur sm:gap-3.5 sm:p-4',
        isLeader && 'border-amber-500/40 shadow-[0_0_32px_-12px_theme(colors.amber.500/60%)]',
      )}
    >
      <span
        className={cn(
          'flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold sm:size-8 sm:text-sm',
          // Medals only mean something once there are votes.
          (option.displayVotes > 0 && RANK_STYLES[option.position]) ||
            'bg-secondary text-muted-foreground',
        )}
        style={{ fontVariantNumeric: 'tabular-nums' }}
      >
        {option.position}
      </span>

      <OptionAvatar name={option.name} imageUrl={option.imageUrl} className="size-8 sm:size-9" />

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-baseline justify-between gap-3">
          <span className="truncate text-sm font-semibold">{option.name}</span>
          <span className="flex shrink-0 items-baseline gap-2">
            <AnimatedNumber value={option.displayVotes} className="text-sm font-bold" />
            <span
              className="w-10 text-right text-xs text-muted-foreground"
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
                ? 'bg-gradient-to-r from-blue-500 to-amber-500'
                : 'bg-gradient-to-r from-blue-500/70 to-blue-400/70',
            )}
            initial={false}
            animate={{ width: `${Math.max(option.relativeToLeader, 1)}%` }}
            transition={{ type: 'spring', stiffness: 140, damping: 26 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
