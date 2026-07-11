import type { BattleOption } from '@/types'

export interface RankedOption extends BattleOption {
  /** Server votes + optimistic clicks not yet flushed. */
  displayVotes: number
  /** 1-based position in the ranking. */
  position: number
  /** Share of the total votes, 0–100. */
  percentage: number
  /** Relative to the leader, 0–100 — drives the progress bar width. */
  relativeToLeader: number
}

/**
 * Merges optimistic pending clicks into the option list and derives the
 * ranking. Ties break alphabetically so equal options don't jitter.
 */
export function buildRanking(
  options: BattleOption[],
  pendingVotes: Readonly<Record<string, number>> = {},
): { ranked: RankedOption[]; totalVotes: number } {
  const withVotes = options.map((option) => ({
    ...option,
    displayVotes: option.votes + (pendingVotes[option.id] ?? 0),
  }))
  const totalVotes = withVotes.reduce((sum, option) => sum + option.displayVotes, 0)
  const leaderVotes = Math.max(0, ...withVotes.map((option) => option.displayVotes))

  const ranked = withVotes
    .sort((a, b) => b.displayVotes - a.displayVotes || a.name.localeCompare(b.name, 'es'))
    .map((option, index) => ({
      ...option,
      position: index + 1,
      percentage: totalVotes > 0 ? (option.displayVotes / totalVotes) * 100 : 0,
      relativeToLeader: leaderVotes > 0 ? (option.displayVotes / leaderVotes) * 100 : 0,
    }))

  return { ranked, totalVotes }
}
