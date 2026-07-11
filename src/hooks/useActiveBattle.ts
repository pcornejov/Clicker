import { useCallback } from 'react'
import { battleService } from '@/services'
import { queryKeys } from '@/constants/queryKeys'
import type { Battle, BattleOption } from '@/types'
import { useFirestoreSubscription } from './useFirestoreSubscription'

export interface ActiveBattleState {
  battle: Battle | null
  options: BattleOption[]
  totalVotes: number
  isLoading: boolean
  error: Error | null
  /** True when settings explicitly say there is no active battle. */
  hasNoActiveBattle: boolean
}

/**
 * Live view of the active battle: settings/app → battle doc → options,
 * all realtime. Total votes are summed client-side from the options so the
 * battle document never becomes a write hotspot.
 */
export function useActiveBattle(): ActiveBattleState {
  const {
    data: activeBattleId,
    isLoading: idLoading,
    error: idError,
  } = useFirestoreSubscription<string | null>({
    queryKey: queryKeys.activeBattleId,
    subscribe: useCallback(
      (onData: (id: string | null) => void, onError: (e: Error) => void) =>
        battleService.subscribeToActiveBattleId(onData, onError),
      [],
    ),
  })

  const battleId = activeBattleId ?? null

  const {
    data: battle,
    isLoading: battleLoading,
    error: battleError,
  } = useFirestoreSubscription<Battle | null>({
    queryKey: queryKeys.battle(battleId ?? 'none'),
    subscribe: useCallback(
      (onData: (b: Battle | null) => void, onError: (e: Error) => void) =>
        battleService.subscribeToBattle(battleId ?? 'none', onData, onError),
      [battleId],
    ),
    enabled: battleId !== null,
  })

  const {
    data: options,
    isLoading: optionsLoading,
    error: optionsError,
  } = useFirestoreSubscription<BattleOption[]>({
    queryKey: queryKeys.battleOptions(battleId ?? 'none'),
    subscribe: useCallback(
      (onData: (o: BattleOption[]) => void, onError: (e: Error) => void) =>
        battleService.subscribeToOptions(battleId ?? 'none', onData, onError),
      [battleId],
    ),
    enabled: battleId !== null,
  })

  const resolvedOptions = options ?? []
  const totalVotes = resolvedOptions.reduce((sum, option) => sum + option.votes, 0)
  const hasNoActiveBattle = !idLoading && battleId === null

  return {
    battle: battle ?? null,
    options: resolvedOptions,
    totalVotes,
    isLoading: idLoading || (battleId !== null && (battleLoading || optionsLoading)),
    error: idError ?? battleError ?? optionsError ?? null,
    hasNoActiveBattle,
  }
}
