const votesFormatter = new Intl.NumberFormat('es-CL')

export function formatVotes(votes: number): string {
  return votesFormatter.format(votes)
}

/** Percentage of `votes` over `total`, safe against division by zero. */
export function votePercentage(votes: number, total: number): number {
  if (total <= 0) return 0
  return (votes / total) * 100
}

export function formatPercentage(value: number): string {
  return `${value.toLocaleString('es-CL', { maximumFractionDigits: 1 })}%`
}
