import { Box, Container, Flex, IconButton, Span, Text, Tooltip } from "@indoku/ui"
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6"
import { LuMail } from "react-icons/lu"
import { mailto, site } from "../data/site"

// `asChild` is supported at runtime but missing from ButtonProps' typings.
const asChild = { asChild: true } as Record<string, unknown>

const socials = [
  { label: "GitHub", href: site.socials.github, icon: <FaGithub size={18} aria-hidden="true" /> },
  { label: "LinkedIn", href: site.socials.linkedin, icon: <FaLinkedinIn size={18} aria-hidden="true" /> },
  { label: "X (Twitter)", href: site.socials.x, icon: <FaXTwitter size={18} aria-hidden="true" /> },
  { label: "Email", href: mailto(), icon: <LuMail size={18} aria-hidden="true" /> },
]

export default function Footer() {
  return (
    <Box as="footer">
      <Container maxW="6xl" px={{ base: "5", md: "8" }} py="8" borderTopWidth="1px" borderColor="border">
        <Flex direction={{ base: "column", md: "row" }} justify="space-between" align="center" gap="4">
          <Text fontSize="sm" color="fg.muted">
            © {new Date().getFullYear()} {site.name} · @{site.handle}
            <Span display={{ base: "none", md: "inline" }}> · psst, try the Konami code</Span>
            <Span display={{ base: "inline", md: "none" }}> · psst, poke the logo 5 times</Span>
          </Text>
          <Flex as="nav" aria-label="Social links" gap="1">
            {socials.map((s) => (
              <Tooltip.Root key={s.label} positioning={{ placement: "top" }}>
                <Tooltip.Trigger asChild border="0" px="0" h="auto" bg="transparent" _hover={{ bg: "transparent" }}>
                  <IconButton {...asChild} variant="ghost" size="md" aria-label={s.label}>
                    <a href={s.href} {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                      {s.icon}
                    </a>
                  </IconButton>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>{s.label}</Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip.Root>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
