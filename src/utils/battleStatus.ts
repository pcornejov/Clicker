import type { Battle, EffectiveBattleStatus } from '@/types'

/**
 * Derives what the user should see right now from the stored status plus the
 * scheduled window. Keeping this on the client means no cron job has to
 * mutate battle documents when a scheduled start/end time passes.
 */
export function getEffectiveStatus(battle: Battle, now: Date = new Date()): EffectiveBattleStatus {
  if (battle.status === 'draft') return 'draft'
  if (battle.status === 'ended') return 'ended'
  if (battle.startDate && now < battle.startDate) return 'scheduled'
  if (battle.endDate && now > battle.endDate) return 'ended'
  return 'live'
}

export function isVotable(battle: Battle, now: Date = new Date()): boolean {
  return getEffectiveStatus(battle, now) === 'live'
}
