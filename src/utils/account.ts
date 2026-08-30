import {
  createUserWithEmailAndPassword,
  reload,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from 'firebase/auth'
import { auth } from '../firebase'

class AuthUnavailableError extends Error {
  code = 'app/auth-unavailable'
}

function requireAuth() {
  if (!auth) throw new AuthUnavailableError('Firebase Auth is not configured')
  return auth
}

export const isAccountAuthAvailable = auth !== null

// The sync code used for progress storage/lookup when signed in with a real
// account — a Firestore doc under this key is created lazily the first time
// progress is pushed (see utils/progress.ts), unlike manually-typed sync
// codes which must already exist.
export function accountSyncCode(uid: string): string {
  return `uid-${uid}`
}

export function accountLabel(user: User): string {
  return user.email ?? user.displayName ?? accountSyncCode(user.uid)
}

export async function registerWithEmail(email: string, password: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(requireAuth(), email.trim(), password)
  return cred.user
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(requireAuth(), email.trim(), password)
  return cred.user
}

export async function sendVerificationEmail(user: User): Promise<void> {
  await sendEmailVerification(user)
}

// Firebase caches `emailVerified` on the User object from sign-in time, so
// it must be reloaded after the user clicks the link in their email.
export async function refreshEmailVerified(user: User): Promise<boolean> {
  await reload(user)
  return user.emailVerified
}

export async function signOutAccount(): Promise<void> {
  if (!auth) return
  try {
    await signOut(auth)
  } catch {
    // no active session — ignore
  }
}

// Returns an i18n key (under the "errors" namespace) rather than the final
// message — callers translate it with `t()` so the message follows the
// active language.
export function friendlyAuthError(err: unknown): string {
  const code = (err as { code?: string } | null)?.code ?? ''
  switch (code) {
    case 'app/auth-unavailable':
      return 'errors.authUnavailable'
    case 'auth/email-already-in-use':
      return 'errors.emailInUse'
    case 'auth/invalid-email':
      return 'errors.invalidEmail'
    case 'auth/weak-password':
      return 'errors.weakPassword'
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'errors.incorrectCredentials'
    case 'auth/too-many-requests':
      return 'errors.tooManyRequests'
    case 'auth/network-request-failed':
      return 'errors.networkError'
    default:
      return 'errors.generic'
  }
}
