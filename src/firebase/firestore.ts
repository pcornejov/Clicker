import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'
import { getFirebaseApp, useEmulator } from './app'
import { initAppCheck } from './appCheck'

let db: Firestore | null = null

export function getDb(): Firestore {
  if (!db) {
    const app = getFirebaseApp()
    // App Check must be initialized before any Firestore traffic.
    initAppCheck(app)
    db = getFirestore(app)
    if (useEmulator) {
      connectFirestoreEmulator(db, '127.0.0.1', 8080)
    }
  }
  return db
}
