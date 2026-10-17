import { useState, type MouseEvent } from "react"
import { Badge, Box, Flex, Image } from "@indoku/ui"
import { LuMousePointerClick, LuUndo2 } from "react-icons/lu"
import { site } from "../data/site"

const noMotion = { "@media (prefers-reduced-motion: reduce)": { transition: "none" } }

// Shows the @indokudev avatar first. Click / tap / Enter reveals the real photo with a
// circular wipe that grows from the exact point that was clicked. Click again to go back.
export default function HeroPhoto() {
  const [revealed, setRevealed] = useState(false)
  const [origin, setOrigin] = useState({ x: 50, y: 50 })
  const [burst, setBurst] = useState(0)

  const toggle = (e: MouseEvent<HTMLElement>) => {
    if (!revealed) {
      const rect = e.currentTarget.getBoundingClientRect()
      // Keyboard activation reports detail = 0, so fall back to the center.
      const fromPointer = e.detail > 0
      setOrigin({
        x: fromPointer ? ((e.clientX - rect.left) / rect.width) * 100 : 50,
        y: fromPointer ? ((e.clientY - rect.top) / rect.height) * 100 : 50,
      })
    }
    setRevealed((v) => !v)
    setBurst((n) => n + 1)
  }

  const at = `${origin.x}% ${origin.y}%`

  return (
    <Box
      as="button"
      type="button"
      onClick={toggle}
      aria-pressed={revealed}
      aria-label={revealed ? "Show the @indokudev avatar again" : "Reveal the real photo of Ahmad Raghib Zahron"}
      className="fx-ring"
      position="relative"
      zIndex={0}
      display="block"
      w="full"
      aspectRatio="1 / 1"
      p="0"
      borderWidth="0"
      borderRadius="2rem"
      overflow="hidden"
      cursor="pointer"
      bg="transparent"
      boxShadow="0 30px 80px -30px rgba(109, 93, 252, 0.6)"
      _focusVisible={{ outline: "3px solid #6d5dfc", outlineOffset: "4px" }}
    >
      {/* Layer 1: @indokudev avatar */}
      <Image
        src={site.avatar}
        alt={site.avatarAlt}
        htmlWidth={400}
        htmlHeight={400}
        draggable={false}
        position="absolute"
        inset="4px"
        zIndex={1}
        w="calc(100% - 8px)"
        h="calc(100% - 8px)"
        fit="cover"
        borderRadius="calc(2rem - 4px)"
        bg="#fff"
        userSelect="none"
        transform={revealed ? "scale(0.9)" : "scale(1)"}
        filter={revealed ? "blur(6px)" : "none"}
        transition="transform 1.1s cubic-bezier(0.7, 0, 0.2, 1), filter 1.1s ease"
        css={noMotion}
      />

      {/* Layer 2: the real photo, hidden behind a 0-radius circle until revealed */}
      <Image
        src={site.photo}
        alt={site.photoAlt}
        htmlWidth={900}
        htmlHeight={900}
        draggable={false}
        position="absolute"
        inset="4px"
        zIndex={1}
        w="calc(100% - 8px)"
        h="calc(100% - 8px)"
        fit="cover"
        align="50% 30%"
        borderRadius="calc(2rem - 4px)"
        userSelect="none"
        clipPath={`circle(${revealed ? "150%" : "0%"} at ${at})`}
        transform={revealed ? "scale(1)" : "scale(1.18)"}
        filter={revealed ? "none" : "blur(10px) saturate(1.5)"}
        transition="clip-path 1.1s cubic-bezier(0.7, 0, 0.2, 1), transform 1.3s cubic-bezier(0.2, 0.7, 0.2, 1), filter 1.3s ease"
        css={noMotion}
      />

      {/* Shockwave ring from the click point (remounts on every click) */}
      {burst > 0 && (
        <Box
          key={burst}
          as="span"
          aria-hidden="true"
          className="fx-burst"
          position="absolute"
          zIndex={2}
          left={`${origin.x}%`}
          top={`${origin.y}%`}
          w="24px"
          h="24px"
          ml="-12px"
          mt="-12px"
          rounded="full"
          borderWidth="3px"
          borderColor="#fff"
          pointerEvents="none"
        />
      )}

      {/* Hint pill */}
      <Flex as="span" position="absolute" zIndex={3} left="0" right="0" bottom="3" justify="center" pointerEvents="none">
        <Badge variant="secondary" size="lg" className={revealed ? undefined : "fx-pulse"} gap="2">
          {revealed ? <LuUndo2 aria-hidden="true" /> : <LuMousePointerClick aria-hidden="true" />}
          {revealed ? "Back to @indokudev" : "Take a look of him"}
        </Badge>
      </Flex>
    </Box>
  )
}
