import { useEffect, useState } from 'react'
import { useQuery, useQueryClient, type QueryKey } from '@tanstack/react-query'
import type { Unsubscribe } from '@/services'

interface UseFirestoreSubscriptionOptions<T> {
  queryKey: QueryKey
  /**
   * Must be referentially stable (wrap in useCallback) — it's an effect
   * dependency and an unstable identity would resubscribe on every render.
   */
  subscribe: (onData: (data: T) => void, onError: (error: Error) => void) => Unsubscribe
  enabled?: boolean
}

/**
 * Bridges a realtime subscription (Firestore onSnapshot behind the service
 * layer) into the React Query cache: every snapshot lands via
 * `setQueryData`, so components consume live data through the normal
 * useQuery API. No polling anywhere.
 */
export function useFirestoreSubscription<T>({
  queryKey,
  subscribe,
  enabled = true,
}: UseFirestoreSubscriptionOptions<T>) {
  const queryClient = useQueryClient()
  const [subscriptionError, setSubscriptionError] = useState<Error | null>(null)
  const keyHash = JSON.stringify(queryKey)
  const [prevKeyHash, setPrevKeyHash] = useState(keyHash)

  // Reset the error during render when the subscription target changes.
  if (prevKeyHash !== keyHash) {
    setPrevKeyHash(keyHash)
    setSubscriptionError(null)
  }

  useEffect(() => {
    if (!enabled) return
    const key = JSON.parse(keyHash) as QueryKey
    return subscribe(
      (data) => queryClient.setQueryData(key, data),
      (error) => setSubscriptionError(error),
    )
  }, [queryClient, subscribe, enabled, keyHash])

  const query = useQuery<T>({
    queryKey,
    // The listener resolves this query via setQueryData; it never fetches.
    queryFn: () => new Promise<T>(() => {}),
    staleTime: Infinity,
    retry: false,
    enabled,
  })

  return {
    data: query.data,
    isLoading: enabled && query.isPending && !subscriptionError,
    error: subscriptionError,
  }
}
