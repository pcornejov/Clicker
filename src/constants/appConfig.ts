export const APP_NAME = 'Chile Vota'
export const APP_TAGLINE = 'Batallas virales de clicks'
export const APP_FLAG_EMOJI = '🇨🇱'

/** How often locally accumulated clicks are flushed to the backend. */
export const VOTE_FLUSH_INTERVAL_MS = 1500

/**
 * Max clicks sent in a single flush. Must match the delta cap enforced in
 * `firestore.rules` — keep both in sync.
 */
export const MAX_VOTES_PER_FLUSH = 100

/** Raw file size accepted before client-side resize. Must match `storage.rules`. */
export const MAX_UPLOAD_IMAGE_BYTES = 8 * 1024 * 1024
