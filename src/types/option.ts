export interface BattleOption {
  id: string
  /** Denormalized parent id, kept to ease a future migration off Firestore. */
  battleId: string
  name: string
  votes: number
  createdAt: Date
}
