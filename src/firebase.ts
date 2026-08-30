import { initializeApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// getAuth() validates the API key synchronously and throws if it's missing
// or malformed. That must never take down the rest of the app (in
// particular the existing sync-code flow, which doesn't use Auth at all) —
// so a broken Auth setup degrades to "account sign-in unavailable" instead
// of a blank screen.
export let auth: Auth | null = null
try {
  auth = getAuth(app)
} catch (err) {
  console.error('Firebase Auth failed to initialize — account sign-in will be unavailable.', err)
}
