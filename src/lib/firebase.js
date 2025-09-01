// Lightweight Firebase Firestore bootstrap.
// Reads config from Vite env vars (VITE_FIREBASE_*).
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export function hasFirebaseConfig() {
  return Object.values(config).every(Boolean)
}

let dbInstance = null
export function getDb() {
  if (!hasFirebaseConfig()) return null
  const app = getApps().length ? getApps()[0] : initializeApp(config)
  dbInstance = dbInstance || getFirestore(app)
  return dbInstance
}

export async function submitFormToFirestore(data, collectionName = 'submissions') {
  const db = getDb()
  if (!db) throw new Error('Firebase not configured. Set VITE_FIREBASE_* env vars.')
  const ref = collection(db, collectionName)
  const payload = { ...data, createdAt: serverTimestamp() }
  return addDoc(ref, payload)
}

