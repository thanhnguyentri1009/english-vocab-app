// One-time merge: injects Vietnamese translations (keyed by word id) into the
// generated JLPT vocabulary files, and saves the translation maps under
// scripts/data/japanese-vi/ so a future re-run of import-japanese-data.mjs
// can restore them (see that script's use of loadViMap). Run with:
//   node scripts/merge-japanese-vi.mjs

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.join(__dirname, '..')
const VOCAB_DIR = path.join(REPO_ROOT, 'src', 'data', 'japanese', 'vocabulary')
const VI_DIR = path.join(__dirname, 'data', 'japanese-vi')

const SCRATCHPAD =
  'C:\\Users\\YENTRA~1\\AppData\\Local\\Temp\\claude\\C--Users-YEN-TRAM-Documents-GitHub-english-vocab-app\\a3bb175c-6871-41c6-aeb6-c2d709e58d2e\\scratchpad'

const CHUNKS = {
  n1: ['n1_c1.json', 'n1_c2.json', 'n1_c3.json', 'n1_c4.json'],
  n2: ['n2_c1.json', 'n2_c2.json', 'n2_c3.json'],
  n3: ['n3_c1.json', 'n3_c2.json', 'n3_c3.json'],
  n4: ['n4_c1.json'],
  n5: ['n5_c1.json'],
}

async function loadViMap(level) {
  const map = new Map()
  for (const file of CHUNKS[level]) {
    const text = await readFile(path.join(SCRATCHPAD, file), 'utf-8')
    const entries = JSON.parse(text)
    for (const { id, vi } of entries) {
      if (map.has(id)) throw new Error(`duplicate id ${id} in ${level}`)
      map.set(id, vi)
    }
  }
  return map
}

async function mergeLevel(level) {
  const filePath = path.join(VOCAB_DIR, `${level}.ts`)
  const source = await readFile(filePath, 'utf-8')

  const marker = '] = '
  const idx = source.indexOf(marker)
  if (idx === -1) throw new Error(`could not find array literal in ${filePath}`)
  const header = source.slice(0, idx + marker.length)
  const arrayLiteral = source.slice(idx + marker.length).trimEnd()
  /** @type {Array<{id:string,jp:string,reading:string,romaji:string,meaning:string}>} */
  const words = JSON.parse(arrayLiteral)

  const viMap = await loadViMap(level)
  if (viMap.size !== words.length) {
    throw new Error(
      `${level}: translation count ${viMap.size} does not match word count ${words.length}`,
    )
  }

  const merged = words.map((w) => {
    const vi = viMap.get(w.id)
    if (vi === undefined) throw new Error(`${level}: missing translation for ${w.id}`)
    return { ...w, vi }
  })

  await writeFile(filePath, `${header}${JSON.stringify(merged, null, 2)}\n`, 'utf-8')
  console.log(`merged ${merged.length} vi translations -> ${path.relative(REPO_ROOT, filePath)}`)

  await mkdir(VI_DIR, { recursive: true })
  const viOnly = Object.fromEntries(merged.map((w) => [w.id, w.vi]))
  await writeFile(
    path.join(VI_DIR, `${level}.json`),
    `${JSON.stringify(viOnly, null, 2)}\n`,
    'utf-8',
  )
  console.log(`  saved translation map -> scripts/data/japanese-vi/${level}.json`)
}

for (const level of Object.keys(CHUNKS)) {
  await mergeLevel(level)
}
console.log('Done.')
