import { motion } from 'motion/react'
import { OptionCard } from './OptionCard'
import type { RankedOption } from '@/utils/ranking'

interface RankingListProps {
  ranked: RankedOption[]
  canVote: boolean
  onVote: (optionId: string) => void
}

/**
 * Ranking with FLIP layout animation: when an option overtakes another, the
 * cards glide to their new positions.
 */
export function RankingList({ ranked, canVote, onVote }: RankingListProps) {
  return (
    <div className="space-y-3">
      {ranked.map((option) => (
        <motion.div
          key={option.id}
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        >
          <OptionCard option={option} canVote={canVote} onVote={onVote} />
        </motion.div>
      ))}
    </div>
  )
}
