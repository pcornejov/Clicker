import { OptionVoteCard } from './OptionVoteCard'
import type { RankedOption } from '@/utils/ranking'

interface OptionGridProps {
  /** Should already be in a stable order (e.g. alphabetical) — never re-sorted by votes. */
  options: RankedOption[]
  canVote: boolean
  onVote: (optionId: string) => void
}

/** Fixed-order voting grid. See OptionVoteCard for why the order never changes. */
export function OptionGrid({ options, canVote, onVote }: OptionGridProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {options.map((option) => (
        <OptionVoteCard key={option.id} option={option} canVote={canVote} onVote={onVote} />
      ))}
    </div>
  )
}
