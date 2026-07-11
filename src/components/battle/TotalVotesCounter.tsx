import { AnimatedNumber } from '@/components/shared/AnimatedNumber'

interface TotalVotesCounterProps {
  totalVotes: number
}

export function TotalVotesCounter({ totalVotes }: TotalVotesCounterProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Votos totales
      </span>
      <AnimatedNumber
        value={totalVotes}
        className="text-2xl font-bold tracking-tight sm:text-3xl"
      />
    </div>
  )
}
