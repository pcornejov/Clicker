export const APP_NAME = 'BattleHub'
export const APP_TAGLINE = 'Batallas virales de clicks'

/** How often locally accumulated clicks are flushed to the backend. */
export const VOTE_FLUSH_INTERVAL_MS = 1500

/**
 * Max clicks sent in a single flush. Must match the delta cap enforced in
 * `firestore.rules` — keep both in sync.
 */
export const MAX_VOTES_PER_FLUSH = 100
