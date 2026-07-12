export interface BattleOption {
  id: string
  /** Denormalized parent id, kept to ease a future migration off Firestore. */
  battleId: string
  name: string
  votes: number
  createdAt: Date
  /** Admin-uploaded photo (Firebase Storage download URL). Overrides any curated default. */
  imageUrl?: string
}
