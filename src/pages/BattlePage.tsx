import { SwordsIcon, TrophyIcon } from 'lucide-react'
import { BattleHeader } from '@/components/battle/BattleHeader'
import { CountdownTimer } from '@/components/battle/CountdownTimer'
import { RankingList } from '@/components/battle/RankingList'
import { ShareButton } from '@/components/battle/ShareButton'
import { TotalVotesCounter } from '@/components/battle/TotalVotesCounter'
import { BattleSkeleton } from '@/components/shared/BattleSkeleton'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import { useActiveBattle } from '@/hooks/useActiveBattle'
import { useVote } from '@/hooks/useVote'
import { buildRanking } from '@/utils/ranking'
import { getEffectiveStatus } from '@/utils/battleStatus'
import { getRegionPhoto } from '@/constants/regionPhotos'

export function BattlePage() {
  const { battle, options, isLoading, error, hasNoActiveBattle } = useActiveBattle()
  const { vote, pendingVotes } = useVote(battle?.id ?? null)

  if (error) return <ErrorState />
  if (isLoading) return <BattleSkeleton />
  if (hasNoActiveBattle || !battle) {
    return (
      <EmptyState
        icon={SwordsIcon}
        title="No hay ninguna batalla activa"
        description="La próxima batalla está por comenzar. Vuelve pronto para votar por tu favorito."
      />
    )
  }

  const status = getEffectiveStatus(battle)
  const { ranked, totalVotes } = buildRanking(options, pendingVotes)
  const canVote = status === 'live' && ranked.length > 0
  const winner = status === 'ended' ? ranked[0] : undefined

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 sm:space-y-10">
      <BattleHeader battle={battle} status={status} />

      <div className="flex items-center justify-center gap-10 sm:gap-14">
        <TotalVotesCounter totalVotes={totalVotes} />
        {status === 'scheduled' ? (
          <CountdownTimer label="Comienza en" target={battle.startDate} />
        ) : (
          <CountdownTimer label="Termina en" target={status === 'ended' ? null : battle.endDate} />
        )}
      </div>

      <div className="flex justify-center">
        <ShareButton battleTitle={battle.title} />
      </div>

      {winner && winner.displayVotes > 0 && (
        <div className="flex items-center justify-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-amber-300">
          <TrophyIcon className="size-5 shrink-0" aria-hidden="true" />
          <p className="text-sm font-semibold sm:text-base">
            Batalla finalizada — ganó {winner.name}
          </p>
        </div>
      )}

      {status === 'scheduled' && (
        <p className="text-center text-sm text-muted-foreground">
          La votación aún no comienza. ¡Comparte el link para que nadie se lo pierda!
        </p>
      )}

      {ranked.length === 0 ? (
        <EmptyState
          icon={SwordsIcon}
          title="Sin opciones todavía"
          description="Esta batalla aún no tiene competidores."
        />
      ) : (
        <RankingList ranked={ranked} canVote={canVote} onVote={vote} />
      )}

      {canVote && (
        <p className="text-center text-xs text-muted-foreground">
          Toca una tarjeta para votar. Puedes votar todas las veces que quieras.
        </p>
      )}

      {ranked.some((option) => getRegionPhoto(option.name)) && (
        <p className="pb-4 text-center text-[11px] text-muted-foreground/60">
          Fotos:{' '}
          <a
            href="https://commons.wikimedia.org"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-muted-foreground"
          >
            Wikimedia Commons
          </a>{' '}
          (CC BY-SA / CC BY / dominio público)
        </p>
      )}
    </div>
  )
}
