import { initializeApp, type FirebaseApp } from 'firebase/app'

const env = import.meta.env

export const useEmulator = env.VITE_USE_FIREBASE_EMULATOR === 'true'

/**
 * All Firebase configuration comes from environment variables — never
 * hardcode keys. See `.env.example`.
 *
 * In emulator mode only a project id is needed; a demo id keeps the
 * emulator fully offline.
 */
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: useEmulator
    ? (env.VITE_FIREBASE_PROJECT_ID ?? 'demo-clicker')
    : env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
}

/**
 * True when the app has enough configuration to talk to Firebase.
 * The UI shows a friendly setup screen instead of crashing when it's not.
 */
export const isFirebaseConfigured =
  useEmulator || Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)

let app: FirebaseApp | null = null

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    app = initializeApp(firebaseConfig)
  }
  return app
}
