import type { ReactNode } from "react"
import { Box, Container, Heading, Stack, Text } from "@indoku/ui"

type Props = {
  id: string
  eyebrow: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function Section({ id, eyebrow, title, subtitle, children }: Props) {
  return (
    <Box as="section" id={id} aria-labelledby={`${id}-title`}>
      <Container maxW="6xl" px={{ base: "5", md: "8" }} py={{ base: "14", md: "20" }}>
        <Stack gap="3" mb={{ base: "8", md: "12" }} maxW="2xl">
          <Text fontFamily="mono" fontSize="sm" color="fg.muted" letterSpacing="wider" textTransform="uppercase">
            {eyebrow}
          </Text>
          <Heading as="h2" id={`${id}-title`} fontSize={{ base: "3xl", md: "5xl" }} lineHeight="1.1" letterSpacing="-0.02em">
            {title}
          </Heading>
          {subtitle && (
            <Text fontSize={{ base: "md", md: "lg" }} color="fg.muted">
              {subtitle}
            </Text>
          )}
        </Stack>
        <Box>{children}</Box>
      </Container>
    </Box>
  )
}
