import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage'
import { getFirebaseApp, useEmulator } from './app'

let storage: FirebaseStorage | null = null

export function getStorageInstance(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp())
    if (useEmulator) {
      connectStorageEmulator(storage, '127.0.0.1', 9199)
    }
  }
  return storage
}
