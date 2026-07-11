import type { Battle, BattleInput, BattleOption } from '@/types'

export type Unsubscribe = () => void

/**
 * Backend-agnostic contract for everything the app needs from a data source.
 *
 * Components and hooks depend only on this interface; the Firestore
 * implementation lives in `firestoreBattleService.ts`. Swapping Firestore for
 * a custom backend later means writing a new implementation of this
 * interface — the UI stays untouched.
 */
export interface BattleService {
  /** Realtime feed of the id configured in settings (null = no active battle). */
  subscribeToActiveBattleId(
    onData: (battleId: string | null) => void,
    onError: (error: Error) => void,
  ): Unsubscribe

  /** Realtime feed of a single battle document (null = deleted/missing). */
  subscribeToBattle(
    battleId: string,
    onData: (battle: Battle | null) => void,
    onError: (error: Error) => void,
  ): Unsubscribe

  /** Realtime feed of a battle's options, unsorted (ranking is derived in the UI). */
  subscribeToOptions(
    battleId: string,
    onData: (options: BattleOption[]) => void,
    onError: (error: Error) => void,
  ): Unsubscribe

  /**
   * Send `count` accumulated votes for one option. Called by the vote buffer,
   * never once per click.
   */
  submitVotes(battleId: string, optionId: string, count: number): Promise<void>

  // ----- Admin -----

  listBattles(): Promise<Battle[]>
  createBattle(input: BattleInput): Promise<string>
  updateBattle(battleId: string, input: BattleInput): Promise<void>
  /** Deletes the battle and all of its options. */
  deleteBattle(battleId: string): Promise<void>
  addOption(battleId: string, name: string): Promise<string>
  removeOption(battleId: string, optionId: string): Promise<void>
  /** Sets every option of the battle back to zero votes. */
  resetVotes(battleId: string): Promise<void>
  /** Marks a battle as the one shown on the home page (null = none). */
  setActiveBattle(battleId: string | null): Promise<void>
  /** Creates the example battle (Chilean regions) in one atomic write. */
  seedExampleBattle(): Promise<string>
}
