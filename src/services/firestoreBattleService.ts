import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  writeBatch,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryDocumentSnapshot,
} from 'firebase/firestore'
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { getDb } from '@/firebase/firestore'
import { getStorageInstance } from '@/firebase/storage'
import { SEED_BATTLE, SEED_OPTIONS } from '@/constants/seedData'
import type { Battle, BattleInput, BattleOption, BattleStatus } from '@/types'
import type { BattleService, Unsubscribe } from './battleService'

/**
 * Firestore layout:
 *
 *   battles/{battleId}                     → battle metadata + status + schedule
 *   battles/{battleId}/options/{optionId}  → one doc per option, `votes` counter
 *   settings/app                           → { activeBattleId }
 *
 * Votes are written with `increment()` so concurrent clients never clobber
 * each other. TODO(scale): shard each option counter across N sub-docs if a
 * single option ever sustains > ~1 write/s after client-side batching.
 */

const BATTLES = 'battles'
const OPTIONS = 'options'
const SETTINGS_APP_PATH = 'settings/app'

// serverTimestamp() is null in latency-compensated local snapshots; 'estimate'
// substitutes a client-side approximation so the UI never sees null dates.
const SNAPSHOT_OPTIONS = { serverTimestamps: 'estimate' } as const

function toDate(value: Timestamp | null | undefined): Date | null {
  return value ? value.toDate() : null
}

const battleConverter: FirestoreDataConverter<Battle> = {
  toFirestore(): DocumentData {
    throw new Error('Battles are written with explicit payloads, not via converter')
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): Battle {
    const data = snapshot.data(SNAPSHOT_OPTIONS)
    return {
      id: snapshot.id,
      title: (data.title as string) ?? '',
      description: (data.description as string) ?? '',
      status: (data.status as BattleStatus) ?? 'draft',
      startDate: toDate(data.startDate as Timestamp | null),
      endDate: toDate(data.endDate as Timestamp | null),
      createdAt: toDate(data.createdAt as Timestamp | null) ?? new Date(),
      updatedAt: toDate(data.updatedAt as Timestamp | null) ?? new Date(),
    }
  },
}

const optionConverter: FirestoreDataConverter<BattleOption> = {
  toFirestore(): DocumentData {
    throw new Error('Options are written with explicit payloads, not via converter')
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): BattleOption {
    const data = snapshot.data(SNAPSHOT_OPTIONS)
    return {
      id: snapshot.id,
      battleId: (data.battleId as string) ?? '',
      name: (data.name as string) ?? '',
      votes: (data.votes as number) ?? 0,
      createdAt: toDate(data.createdAt as Timestamp | null) ?? new Date(),
      imageUrl: (data.imageUrl as string | undefined) || undefined,
    }
  },
}

function optionImageRef(battleId: string, optionId: string) {
  // Fixed extension: uploads are always re-encoded to JPEG client-side
  // (see utils/image.ts), so re-uploads overwrite cleanly with no orphans.
  return ref(getStorageInstance(), `battles/${battleId}/options/${optionId}.jpg`)
}

function battlesCol() {
  return collection(getDb(), BATTLES).withConverter(battleConverter)
}

function battleDoc(battleId: string) {
  return doc(getDb(), BATTLES, battleId).withConverter(battleConverter)
}

function optionsCol(battleId: string) {
  return collection(getDb(), BATTLES, battleId, OPTIONS).withConverter(optionConverter)
}

function battleInputToFirestore(input: BattleInput): DocumentData {
  return {
    title: input.title.trim(),
    description: input.description.trim(),
    startDate: input.startDate ? Timestamp.fromDate(input.startDate) : null,
    endDate: input.endDate ? Timestamp.fromDate(input.endDate) : null,
  }
}

export const firestoreBattleService: BattleService = {
  subscribeToActiveBattleId(onData, onError): Unsubscribe {
    return onSnapshot(
      doc(getDb(), SETTINGS_APP_PATH),
      (snapshot) => {
        const id = snapshot.exists() ? (snapshot.data().activeBattleId as string | null) : null
        onData(id ?? null)
      },
      onError,
    )
  },

  subscribeToBattle(battleId, onData, onError): Unsubscribe {
    return onSnapshot(
      battleDoc(battleId),
      (snapshot) => onData(snapshot.exists() ? snapshot.data() : null),
      onError,
    )
  },

  subscribeToOptions(battleId, onData, onError): Unsubscribe {
    return onSnapshot(
      query(optionsCol(battleId), orderBy('createdAt', 'asc')),
      (snapshot) => onData(snapshot.docs.map((docSnap) => docSnap.data())),
      onError,
    )
  },

  async submitVotes(battleId, optionId, count) {
    if (count <= 0) return
    await updateDoc(doc(getDb(), BATTLES, battleId, OPTIONS, optionId), {
      votes: increment(count),
    })
  },

  async listBattles() {
    const snapshot = await getDocs(query(battlesCol(), orderBy('createdAt', 'desc')))
    return snapshot.docs.map((docSnap) => docSnap.data())
  },

  async createBattle(input) {
    const ref = doc(collection(getDb(), BATTLES))
    await setDoc(ref, {
      ...battleInputToFirestore(input),
      status: 'draft' satisfies BattleStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return ref.id
  },

  async updateBattle(battleId, input) {
    await updateDoc(doc(getDb(), BATTLES, battleId), {
      ...battleInputToFirestore(input),
      updatedAt: serverTimestamp(),
    })
  },

  async deleteBattle(battleId) {
    // The client SDK doesn't cascade-delete subcollections.
    const options = await getDocs(collection(getDb(), BATTLES, battleId, OPTIONS))
    const batch = writeBatch(getDb())
    options.docs.forEach((docSnap) => batch.delete(docSnap.ref))
    batch.delete(doc(getDb(), BATTLES, battleId))
    await batch.commit()
  },

  async addOption(battleId, name) {
    const ref = doc(collection(getDb(), BATTLES, battleId, OPTIONS))
    await setDoc(ref, {
      battleId,
      name: name.trim(),
      votes: 0,
      createdAt: serverTimestamp(),
    })
    return ref.id
  },

  async removeOption(battleId, optionId) {
    await deleteDoc(doc(getDb(), BATTLES, battleId, OPTIONS, optionId))
  },

  async uploadOptionImage(battleId, optionId, file) {
    const storageRef = optionImageRef(battleId, optionId)
    await uploadBytes(storageRef, file, { contentType: 'image/jpeg' })
    const url = await getDownloadURL(storageRef)
    await updateDoc(doc(getDb(), BATTLES, battleId, OPTIONS, optionId), { imageUrl: url })
    return url
  },

  async removeOptionImage(battleId, optionId) {
    await deleteObject(optionImageRef(battleId, optionId)).catch(() => {
      // Best-effort: nothing to clean up if it was never uploaded.
    })
    await updateDoc(doc(getDb(), BATTLES, battleId, OPTIONS, optionId), {
      imageUrl: deleteField(),
    })
  },

  async resetVotes(battleId) {
    const options = await getDocs(collection(getDb(), BATTLES, battleId, OPTIONS))
    const batch = writeBatch(getDb())
    options.docs.forEach((docSnap) => batch.update(docSnap.ref, { votes: 0 }))
    await batch.commit()
  },

  async setActiveBattle(battleId) {
    const db = getDb()
    const batch = writeBatch(db)
    batch.set(doc(db, SETTINGS_APP_PATH), { activeBattleId: battleId })
    // Demote the previously active battle so only one ever reads as active.
    const settings = await getDoc(doc(db, SETTINGS_APP_PATH))
    const previousId = settings.exists()
      ? ((settings.data().activeBattleId as string | null) ?? null)
      : null
    if (previousId && previousId !== battleId) {
      const previous = await getDoc(doc(db, BATTLES, previousId))
      if (previous.exists()) {
        batch.update(previous.ref, {
          status: 'draft' satisfies BattleStatus,
          updatedAt: serverTimestamp(),
        })
      }
    }
    if (battleId) {
      batch.update(doc(db, BATTLES, battleId), {
        status: 'active' satisfies BattleStatus,
        updatedAt: serverTimestamp(),
      })
    }
    await batch.commit()
  },

  async seedExampleBattle() {
    const battleRef = doc(collection(getDb(), BATTLES))
    const batch = writeBatch(getDb())
    batch.set(battleRef, {
      ...battleInputToFirestore(SEED_BATTLE),
      status: 'draft' satisfies BattleStatus,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    SEED_OPTIONS.forEach((name, index) => {
      const optionRef = doc(collection(battleRef, OPTIONS))
      batch.set(optionRef, {
        battleId: battleRef.id,
        name,
        votes: 0,
        // Staggered so `orderBy('createdAt')` keeps the seeded order stable.
        createdAt: Timestamp.fromMillis(Date.now() + index),
      })
    })
    await batch.commit()
    return battleRef.id
  },
}
