import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { battleService } from '@/services'
import { queryKeys } from '@/constants/queryKeys'
import type { BattleInput, BattleOption } from '@/types'
import { useFirestoreSubscription } from './useFirestoreSubscription'

/** Realtime id of the battle currently shown on the home page. */
export function useActiveBattleId() {
  return useFirestoreSubscription<string | null>({
    queryKey: queryKeys.activeBattleId,
    subscribe: useCallback(
      (onData: (id: string | null) => void, onError: (e: Error) => void) =>
        battleService.subscribeToActiveBattleId(onData, onError),
      [],
    ),
  })
}

/** One-time list of every battle for the admin panel. */
export function useBattlesList() {
  return useQuery({
    queryKey: queryKeys.battlesList,
    queryFn: () => battleService.listBattles(),
  })
}

/** Realtime options of the battle being edited (votes update live). */
export function useBattleOptions(battleId: string | null) {
  return useFirestoreSubscription<BattleOption[]>({
    queryKey: queryKeys.battleOptions(battleId ?? 'none'),
    subscribe: useCallback(
      (onData: (o: BattleOption[]) => void, onError: (e: Error) => void) =>
        battleService.subscribeToOptions(battleId ?? 'none', onData, onError),
      [battleId],
    ),
    enabled: battleId !== null,
  })
}

function useInvalidateBattles() {
  const queryClient = useQueryClient()
  return () => queryClient.invalidateQueries({ queryKey: queryKeys.battlesList })
}

export function useCreateBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (input: BattleInput) => battleService.createBattle(input),
    onSuccess: () => {
      invalidate()
      toast.success('Batalla creada')
    },
    onError: () => toast.error('No se pudo crear la batalla'),
  })
}

export function useUpdateBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: ({ battleId, input }: { battleId: string; input: BattleInput }) =>
      battleService.updateBattle(battleId, input),
    onSuccess: () => {
      invalidate()
      toast.success('Batalla actualizada')
    },
    onError: () => toast.error('No se pudo actualizar la batalla'),
  })
}

export function useDeleteBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (battleId: string) => battleService.deleteBattle(battleId),
    onSuccess: () => {
      invalidate()
      toast.success('Batalla eliminada')
    },
    onError: () => toast.error('No se pudo eliminar la batalla'),
  })
}

export function useAddOption() {
  return useMutation({
    mutationFn: ({ battleId, name }: { battleId: string; name: string }) =>
      battleService.addOption(battleId, name),
    onSuccess: () => toast.success('Opción agregada'),
    onError: () => toast.error('No se pudo agregar la opción'),
  })
}

export function useRemoveOption() {
  return useMutation({
    mutationFn: ({ battleId, optionId }: { battleId: string; optionId: string }) =>
      battleService.removeOption(battleId, optionId),
    onSuccess: () => toast.success('Opción eliminada'),
    onError: () => toast.error('No se pudo eliminar la opción'),
  })
}

export function useResetVotes() {
  return useMutation({
    mutationFn: (battleId: string) => battleService.resetVotes(battleId),
    onSuccess: () => toast.success('Votos reiniciados'),
    onError: () => toast.error('No se pudieron reiniciar los votos'),
  })
}

export function useSetActiveBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: (battleId: string | null) => battleService.setActiveBattle(battleId),
    onSuccess: (_data, battleId) => {
      invalidate()
      toast.success(battleId ? 'Batalla activada' : 'Batalla desactivada')
    },
    onError: () => toast.error('No se pudo cambiar la batalla activa'),
  })
}

export function useSeedExampleBattle() {
  const invalidate = useInvalidateBattles()
  return useMutation({
    mutationFn: () => battleService.seedExampleBattle(),
    onSuccess: () => {
      invalidate()
      toast.success('Batalla de ejemplo creada', {
        description: 'Actívala para verla en la portada.',
      })
    },
    onError: () => toast.error('No se pudo crear la batalla de ejemplo'),
  })
}
