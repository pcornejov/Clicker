import { useCallback, useEffect, useSyncExternalStore } from 'react'
import { voteBuffer } from '@/services'

type PendingVotesMap = Readonly<Record<string, number>>

/**
 * Tiny external store for clicks not yet flushed to the backend. Kept outside
 * React so rapid clicking never drops updates and every subscribed component
 * sees the same counters.
 */
let pendingVotes: PendingVotesMap = {}
const storeListeners = new Set<() => void>()

function emitChange() {
  storeListeners.forEach((listener) => listener())
}

function addPending(optionId: string, count: number) {
  const next = { ...pendingVotes, [optionId]: (pendingVotes[optionId] ?? 0) + count }
  if (next[optionId] <= 0) delete next[optionId]
  pendingVotes = next
  emitChange()
}

const subscribeToStore = (listener: () => void) => {
  storeListeners.add(listener)
  return () => storeListeners.delete(listener)
}

const getSnapshot = () => pendingVotes

export interface UseVoteResult {
  /** Register one click for an option. Optimistic and instant. */
  vote: (optionId: string) => void
  /** Clicks per option still waiting to be flushed. Add to server votes for display. */
  pendingVotes: PendingVotesMap
}

export function useVote(battleId: string | null): UseVoteResult {
  const pending = useSyncExternalStore(subscribeToStore, getSnapshot)

  useEffect(() => {
    // When the buffer hands votes to the backend they show up in the realtime
    // snapshot, so they must leave the optimistic counter at the same moment.
    return voteBuffer.onFlush((optionId, count) => addPending(optionId, -count))
  }, [])

  const vote = useCallback(
    (optionId: string) => {
      if (!battleId) return
      addPending(optionId, 1)
      voteBuffer.add(battleId, optionId)
    },
    [battleId],
  )

  return { vote, pendingVotes: pending }
}
