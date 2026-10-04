import { useEffect, useRef } from 'react'

// Map of KeyboardEvent.key → handler. Ignored while typing in a field or
// when a modifier is held, so browser shortcuts keep working.
export type Hotkeys = Partial<Record<string, () => void>>

export function useHotkeys(keys: Hotkeys, enabled = true) {
  // Read the latest handlers without re-binding the listener every render.
  const keysRef = useRef(keys)
  keysRef.current = keys

  useEffect(() => {
    if (!enabled) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return
      const target = e.target as HTMLElement | null
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return
      const handler = keysRef.current[e.key]
      if (!handler) return
      e.preventDefault()
      handler()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [enabled])
}
