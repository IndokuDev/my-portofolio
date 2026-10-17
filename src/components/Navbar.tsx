import { useEffect, useState } from "react"
import { Box, ColorModeButton, Container, Flex, Link, Span } from "@indoku/ui"
import { ButtonLink } from "./ButtonLink"
import { mailto } from "../data/site"

const links = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
]

export default function Navbar({ onLogoClick }: { onLogoClick?: () => void }) {
  // The theme is only known in the browser, so render the toggle after mount
  // (keeps server HTML and the first client render identical).
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      zIndex={50}
      bg="bg/70"
      backdropFilter="blur(14px)"
      borderBottomWidth="1px"
      borderColor="border"
    >
      <Container maxW="6xl" px={{ base: "4", md: "8" }}>
        <Flex h="16" align="center" justify="space-between" gap="4">
          <Link href="#top" onClick={onLogoClick} fontFamily="mono" fontWeight="bold" color="fg" textDecoration="none" aria-label="indokudev home">
            <Span color="fg.muted">@</Span>indokudev
          </Link>

          <Flex as="nav" aria-label="Primary" gap="6" display={{ base: "none", md: "flex" }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} color="fg.muted" fontSize="sm" fontWeight="medium" textDecoration="none" _hover={{ color: "fg" }}>
                {l.label}
              </Link>
            ))}
          </Flex>

          <Flex align="center" gap="2">
            {mounted ? <ColorModeButton variant="ghost" size="sm" /> : <Box w="7" h="7" aria-hidden="true" />}
            <ButtonLink href={mailto("Project inquiry")} size="md">
              Hire me
            </ButtonLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
