import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "@indoku/ui"

type Step = { key: string; code?: string }
const KONAMI: Step[] = [
  { key: "ArrowUp" }, { key: "ArrowUp" }, { key: "ArrowDown" }, { key: "ArrowDown" },
  { key: "ArrowLeft" }, { key: "ArrowRight" }, { key: "ArrowLeft" }, { key: "ArrowRight" },
  { key: "b", code: "KeyB" }, { key: "a", code: "KeyA" },
]
// Pressing these mid-code must not reset it (Shift / Caps Lock are easy to hit by accident).
const MODIFIERS = new Set(["Shift", "Control", "Alt", "AltGraph", "Meta", "CapsLock"])
// Matches Caps Lock ("B"), and non-Latin layouts via the physical key (`code`).
const matches = (e: KeyboardEvent, step: Step) =>
  e.key === step.key || e.key.toLowerCase() === step.key || (!!step.code && e.code === step.code)

const JOKES = [
  { title: "It works on my machine.", description: "Shipping my machine to you is not included in the quote." },
  { title: "Compiled with 0 errors.", description: "Please do not look at the warnings." },
  { title: "sudo make me a sandwich", description: "Permission granted. Sandwich not found." },
  { title: "git push --force", description: "Kidding. I read the docs first. Usually." },
  { title: "Coffee level: critical", description: "Deadlines are met on caffeine, not on faith." },
  { title: "Found a bug!", description: "Okay, it's a feature. It was always a feature." },
]

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && !!t.closest("input, textarea, select, [contenteditable='true']")

// Two hidden triggers: the Konami code on a keyboard, or poking the logo 5x on touch screens.
export function useEasterEggs() {
  const [burst, setBurst] = useState(0)
  const progress = useRef(0)
  const clicks = useRef({ n: 0, t: 0 })
  const jokeIndex = useRef(0)

  const celebrate = useCallback((title: string, description: string) => {
    toast.success(title, { description })
    setBurst((n) => n + 1)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // A held-down key fires repeats; modifiers are neutral; typing in a field never counts.
      if (e.repeat || MODIFIERS.has(e.key) || isTyping(e.target)) return
      if (matches(e, KONAMI[progress.current])) progress.current += 1
      else progress.current = matches(e, KONAMI[0]) ? 1 : 0
      if (progress.current === KONAMI.length) {
        progress.current = 0
        celebrate("Cheat code unlocked: +30 lives", "Now spend one of them hiring Ahmad.")
      }
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [celebrate])

  const onLogoClick = useCallback(() => {
    const now = Date.now()
    if (now - clicks.current.t > 1500) clicks.current.n = 0
    clicks.current.t = now
    clicks.current.n += 1
    if (clicks.current.n === 3) {
      toast.info("Ow. That tickles.", { description: "Two more and something happens." })
    } else if (clicks.current.n >= 5) {
      clicks.current.n = 0
      const joke = JOKES[jokeIndex.current % JOKES.length]
      jokeIndex.current += 1
      celebrate(joke.title, joke.description)
    }
  }, [celebrate])

  return { burst, onLogoClick }
}
