import { firestoreBattleService } from './firestoreBattleService'
import { VoteBuffer } from './voteBuffer'

export type { BattleService, Unsubscribe } from './battleService'

/**
 * Active backend implementation. To migrate off Firestore, provide another
 * `BattleService` implementation and swap it here — nothing else changes.
 */
export const battleService = firestoreBattleService

export const voteBuffer = new VoteBuffer(battleService)
