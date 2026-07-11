/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string
  readonly VITE_FIREBASE_AUTH_DOMAIN: string
  readonly VITE_FIREBASE_PROJECT_ID: string
  readonly VITE_FIREBASE_STORAGE_BUCKET: string
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string
  readonly VITE_FIREBASE_APP_ID: string
  /** "true" to point the app at the local Firestore Emulator. */
  readonly VITE_USE_FIREBASE_EMULATOR?: string
  /** Cloudflare Turnstile site key (protection, not yet enforced). */
  readonly VITE_TURNSTILE_SITE_KEY?: string
  /** reCAPTCHA/Turnstile key for Firebase App Check (see firebase/appCheck.ts). */
  readonly VITE_FIREBASE_APP_CHECK_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
