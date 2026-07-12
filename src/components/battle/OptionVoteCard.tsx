import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { OptionAvatar } from './OptionAvatar'
import { cn } from '@/lib/utils'
import type { RankedOption } from '@/utils/ranking'

interface OptionVoteCardProps {
  option: RankedOption
  canVote: boolean
  onVote: (optionId: string) => void
}

interface Burst {
  id: number
  x: number
}

/**
 * Fixed-position vote button in the OptionGrid. Cards never move — the
 * RankingList below is the only place standings reorder, so rapid clicking
 * never has to chase a target that just shifted under the finger.
 */
export function OptionVoteCard({ option, canVote, onVote }: OptionVoteCardProps) {
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
      whileTap={canVote ? { scale: 0.96 } : undefined}
      className={cn(
        'relative flex select-none items-center gap-2.5 overflow-hidden rounded-2xl border bg-card/60 p-3 text-left backdrop-blur transition-colors',
        canVote && 'cursor-pointer hover:border-blue-500/40 hover:bg-card',
        isLeader && 'border-amber-500/40 shadow-[0_0_24px_-10px_theme(colors.amber.500/60%)]',
      )}
      aria-label={`Votar por ${option.name}`}
    >
      <OptionAvatar name={option.name} imageUrl={option.imageUrl} className="size-9 sm:size-10" />
      <span className="min-w-0 flex-1 truncate text-sm font-semibold sm:text-base">
        {option.name}
      </span>

      <AnimatePresence>
        {bursts.map((burst) => (
          <motion.span
            key={burst.id}
            initial={{ opacity: 1, y: 0, scale: 0.9 }}
            animate={{ opacity: 0, y: -28, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() =>
              setBursts((current) => current.filter((b) => b.id !== burst.id))
            }
            className="pointer-events-none absolute top-2 text-xs font-bold text-blue-400"
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
