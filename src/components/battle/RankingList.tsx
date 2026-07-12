import { RankingRow } from './RankingRow'
import type { RankedOption } from '@/utils/ranking'

interface RankingListProps {
  ranked: RankedOption[]
}

/** Live leaderboard: rows reorder via FLIP layout animation as votes change. */
export function RankingList({ ranked }: RankingListProps) {
  return (
    <div className="space-y-2.5">
      {ranked.map((option) => (
        <RankingRow key={option.id} option={option} />
      ))}
    </div>
  )
}
