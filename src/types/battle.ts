export type BattleStatus = 'draft' | 'active' | 'ended'

/**
 * Effective status derived on the client from `status` + schedule dates.
 * See `utils/battleStatus.ts`.
 */
export type EffectiveBattleStatus = 'draft' | 'scheduled' | 'live' | 'ended'

export interface Battle {
  id: string
  title: string
  description: string
  status: BattleStatus
  /** Optional scheduled start. The battle is votable only after this time. */
  startDate: Date | null
  /** Optional scheduled end. The battle stops accepting votes after this time. */
  endDate: Date | null
  createdAt: Date
  updatedAt: Date
}

/** Payload for creating or editing a battle from the admin panel. */
export interface BattleInput {
  title: string
  description: string
  startDate: Date | null
  endDate: Date | null
}
