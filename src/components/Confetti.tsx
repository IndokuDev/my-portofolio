import { useEffect, useMemo, useState } from "react"
import { Box } from "@indoku/ui"

const COLORS = ["#6d5dfc", "#8b7bff", "#22d3ee", "#f472b6", "#facc15", "#34d399"]
const COUNT = 70

// Pure effect: pieces fall from the top. Layout/colour via @indoku/ui props, motion via .fx-confetti.
export default function Confetti({ burst }: { burst: number }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (burst === 0) return
    // Respect reduced motion: the toast still shows, the confetti does not.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    setVisible(true)
    const t = setTimeout(() => setVisible(false), 4200)
    return () => clearTimeout(t)
  }, [burst])

  const pieces = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        dx: (Math.random() - 0.5) * 40,
        rot: 360 + Math.random() * 720,
        delay: Math.random() * 0.6,
        w: 6 + Math.random() * 8,
        h: 8 + Math.random() * 10,
        color: COLORS[i % COLORS.length],
        round: i % 4 === 0,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burst],
  )

  if (!visible) return null

  return (
    <Box aria-hidden="true" position="fixed" inset="0" zIndex={200} overflow="hidden" pointerEvents="none">
      {pieces.map((p) => (
        <Box
          key={`${burst}-${p.id}`}
          as="span"
          className="fx-confetti"
          style={{ ["--dx" as string]: `${p.dx}vw`, ["--r" as string]: `${p.rot}deg`, ["--d" as string]: `${p.delay}s` }}
          position="absolute"
          top="-3vh"
          left={`${p.left}%`}
          w={`${p.w}px`}
          h={`${p.h}px`}
          bg={p.color}
          rounded={p.round ? "full" : "2px"}
        />
      ))}
    </Box>
  )
}
