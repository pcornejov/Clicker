import { MAX_VOTES_PER_FLUSH, VOTE_FLUSH_INTERVAL_MS } from '@/constants/appConfig'
import type { BattleService } from './battleService'

interface PendingVotes {
  battleId: string
  count: number
}

/**
 * Accumulates clicks locally and flushes them in batched `increment(n)`
 * writes instead of one write per click.
 *
 * Rationale: rapid clicking would otherwise hit Firestore's ~1 write/s
 * per-document guidance and multiply write costs. The UI stays optimistic —
 * clicks are reflected instantly on screen while the buffer syncs in the
 * background every VOTE_FLUSH_INTERVAL_MS (and on page hide, best effort).
 */
export class VoteBuffer {
  private pending = new Map<string, PendingVotes>()
  private timer: ReturnType<typeof setInterval> | null = null
  private readonly service: Pick<BattleService, 'submitVotes'>

  constructor(service: Pick<BattleService, 'submitVotes'>) {
    this.service = service
    if (typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') void this.flush()
      })
      window.addEventListener('pagehide', () => void this.flush())
    }
  }

  add(battleId: string, optionId: string, count = 1): void {
    const entry = this.pending.get(optionId)
    if (entry) {
      entry.count += count
    } else {
      this.pending.set(optionId, { battleId, count })
    }
    this.ensureTimer()
  }

  async flush(): Promise<void> {
    if (this.pending.size === 0) {
      this.stopTimer()
      return
    }
    const batch = this.pending
    this.pending = new Map()
    await Promise.all(
      [...batch.entries()].flatMap(([optionId, { battleId, count }]) => {
        // Split very large bursts to respect the cap enforced in firestore.rules.
        const writes: Promise<void>[] = []
        for (let remaining = count; remaining > 0; remaining -= MAX_VOTES_PER_FLUSH) {
          writes.push(
            this.service
              .submitVotes(battleId, optionId, Math.min(remaining, MAX_VOTES_PER_FLUSH))
              .catch(() => {
                // Put the votes back so they retry on the next flush.
                this.add(battleId, optionId, Math.min(remaining, MAX_VOTES_PER_FLUSH))
              }),
          )
        }
        return writes
      }),
    )
    if (this.pending.size === 0) this.stopTimer()
  }

  private ensureTimer(): void {
    this.timer ??= setInterval(() => void this.flush(), VOTE_FLUSH_INTERVAL_MS)
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
