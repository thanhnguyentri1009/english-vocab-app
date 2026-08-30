# Project notes for CV / LaTeX resume

Raw material about this project, meant to be pasted to an AI assistant when
asking it to draft a "Projects" section of a résumé/CV in LaTeX. It's
factual and detailed on purpose — trim/rephrase as needed for the target
job and available space.

## Project

**English Vocabulary Builder** — a personal, full-stack web app for
learning English vocabulary, grammar, and speaking, with progress synced
across devices. Live on GitHub Pages, source on GitHub
(`thanhnguyentri1009/english-vocab-app`).

## Tech stack

- **Frontend:** React 19 + TypeScript, Vite build tooling, React Router
  (client-side routing driven entirely by the URL — no separate global
  nav state)
- **UI:** Ant Design (antd) component library, hand-rolled CSS for custom
  pieces (card grids, progress badges, animations)
- **Backend/data:** Firebase — Cloud Firestore (cross-device progress
  sync, real-time listeners) and Firebase Authentication (email/password
  with mandatory email verification)
- **CI/CD:** GitHub Actions workflow builds on every push to `main` and
  deploys automatically to GitHub Pages; Firebase config injected via
  encrypted repo secrets, never committed
- **Tooling:** oxlint for linting, `tsc --noEmit` for strict type
  checking (`strict`, `noUnusedLocals`, `noUnusedParameters` all on)

## Core features

- **Vocabulary learning across 6 curricula** — Oxford CEFR word lists
  (A1–C2), TOEIC, IELTS, collocations, phrasal verbs, and idioms —
  roughly **3,000+ vocabulary entries**, each with IPA pronunciation,
  definition, example sentence, and Vietnamese translation
- **Spaced, batch-based learning flow** — words are presented in
  configurable batch sizes (3/6/10), tracked per level in a
  `learnedWords` set so a user only ever sees new material, then
  quizzed on the batch before advancing
- **Grammar & word-type practice bank** — **1,600 multiple-choice
  questions** across 8 categories (tenses, conditionals, passive voice,
  articles/prepositions, nouns, verbs, adjectives, adverbs), each with a
  detailed bilingual (Vietnamese) explanation covering the grammar rule,
  why the answer fits the specific sentence, and a tip to avoid the
  nearest wrong option
- **Mastery-based staged practice engine** — questions are grouped into
  20-question stages; a wrong answer doesn't just get marked wrong, it's
  requeued to the end of the stage and re-asked until answered correctly,
  while the *first-attempt* accuracy is still tracked separately for
  grading — so "must get everything right to finish" and "meaningful
  score" coexist. Stages unlock sequentially as the previous one is
  completed
- **Speaking practice module** — Web Speech API integration: text-to-
  speech plays a target sentence (CEFR-leveled sentence bank), speech
  recognition captures the user's spoken attempt, and a similarity score
  drives pass/fail feedback
- **Cross-device sync, two ways in** — a lightweight "sync code" scheme
  (no account, pick a code, progress keyed by that string in Firestore)
  kept alongside a full account system added later (email/password
  registration via Firebase Auth, mandatory email verification before
  first access, login, "switch account"); both paths converge on the
  same Firestore-backed progress model so neither had to be thrown away
- **Local-first, sync-second persistence** — progress writes to
  `localStorage` immediately and pushes to Firestore opportunistically
  (last-write-wins via a client timestamp), so the app stays usable
  offline and never blocks the UI on a network round trip

## Notable engineering decisions

- Designed the retry-queue algorithm for staged practice from scratch
  (in-memory queue + three persisted id sets — mastered / first-try-correct
  / wrong-once — to reconcile "practice until correct" with "keep an
  honest accuracy score") and verified it end-to-end with a scripted
  browser test (Playwright) that answers questions programmatically and
  asserts the exact number of retries matches the number of wrong answers
- Hardened Firebase Auth initialization: `getAuth()` throws synchronously
  on a misconfigured API key, which would otherwise blank-screen the
  *entire* app (including the unrelated sync-code flow) — wrapped it so
  a broken Auth config degrades to "account sign-in unavailable" instead
  of a hard crash
- Kept backward compatibility when evolving the local persisted schema
  (adding retry-queue fields, later adding a friendly account label
  alongside the sync code) by normalizing/defaulting missing fields on
  read rather than requiring a migration step
- Redesigned the UI twice on user feedback: first pass added
  gamified elements (progress rings, badges, emoji); simplified it down
  to a plain, typography- and color-led design after feedback that it
  read as generic/AI-generated rather than deliberately designed
- Verified UI changes against a real running instance (Vite dev server +
  headless Chromium via Playwright) rather than relying on type-checking
  alone — screenshots and console-error checks for every visual change

## Suggested CV bullet points (adapt/trim as needed)

- Built and shipped a full-stack English-learning web app (React 19,
  TypeScript, Firebase) serving 3,000+ vocabulary entries and 1,600
  grammar/word-type practice questions across 6 vocabulary curricula and
  8 grammar categories.
- Designed a mastery-based practice engine that requeues incorrectly
  answered questions until mastered while preserving first-attempt
  accuracy for grading; validated the algorithm with an automated
  Playwright test that programmatically answers questions and asserts
  retry counts.
- Implemented dual authentication flows (anonymous sync-code and
  Firebase email/password with mandatory email verification) sharing one
  Firestore-backed progress model, with local-first persistence and
  last-write-wins conflict resolution for offline-friendly cross-device
  sync.
- Set up CI/CD with GitHub Actions to auto-build and deploy to GitHub
  Pages on every push, with secrets-managed environment configuration.
- Hardened third-party SDK integration (Firebase Auth) against
  misconfiguration so a broken dependency degrades gracefully instead of
  crashing the app.
