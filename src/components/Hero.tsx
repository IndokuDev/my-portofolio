import { Badge, Box, Container, Flex, Heading, HStack, Span, Stack, Status, Text } from "@indoku/ui"
import { LuArrowRight, LuMail, LuMapPin } from "react-icons/lu"
import { ButtonLink } from "./ButtonLink"
import HeroPhoto from "./HeroPhoto"
import { mailto, site } from "../data/site"

const delay = (s: number) => ({ ["--d" as string]: `${s}s` })

export default function Hero() {
  return (
    <Box as="section" id="top" aria-labelledby="hero-title" position="relative" overflow="hidden">
      {/* Background glow (fades out at the bottom) */}
      <Box
        aria-hidden="true"
        position="absolute"
        inset="0"
        overflow="hidden"
        pointerEvents="none"
        css={{ maskImage: "linear-gradient(to bottom, #000 55%, transparent 100%)" }}
      >
        <Box
          className="fx-float"
          position="absolute"
          rounded="full"
          bg="#6d5dfc"
          opacity={0.35}
          filter="blur(110px)"
          w="min(32rem, 90vw)"
          h="min(32rem, 90vw)"
          top="-8rem"
          left="-10rem"
        />
        <Box
          className="fx-float"
          style={{ animationDelay: "-6s" }}
          position="absolute"
          rounded="full"
          bg="#22d3ee"
          opacity={0.35}
          filter="blur(110px)"
          w="min(26rem, 80vw)"
          h="min(26rem, 80vw)"
          bottom="-6rem"
          right="-8rem"
        />
      </Box>

      <Container maxW="6xl" px={{ base: "5", md: "8" }} pt={{ base: "10", md: "20" }} pb={{ base: "16", md: "28" }} position="relative">
        <Flex direction={{ base: "column-reverse", md: "row" }} align="center" justify="space-between" gap={{ base: "10", md: "16" }}>
          {/* Copy */}
          <Stack gap={{ base: "5", md: "6" }} flex="1" align={{ base: "center", md: "flex-start" }} textAlign={{ base: "center", md: "left" }}>
            <Badge variant="outline" size="lg" className="fx-fade-up" style={delay(0)}>
              <Status colorPalette="green" size="sm">Available for freelance projects</Status>
            </Badge>

            <Heading
              as="h1"
              id="hero-title"
              className="fx-fade-up"
              style={delay(0.1)}
              fontSize={{ base: "4xl", md: "6xl", lg: "7xl" }}
              lineHeight="1.05"
              letterSpacing="-0.03em"
              fontWeight="extrabold"
            >
              Hi, I&apos;m <Span className="fx-gradient-text">Ahmad</Span>. I&apos;m a web developer &amp;{" "}
              <Span className="fx-gradient-text">AI engineer</Span>.
            </Heading>

            <Text className="fx-fade-up" style={delay(0.2)} fontSize={{ base: "md", md: "xl" }} color="fg.muted" maxW="xl">
              I&apos;m <Span color="fg" fontWeight="semibold">{site.name}</Span>, also known online as @{site.handle}. I design and build
              websites, web apps and AI-powered tools, from first idea to launch.
            </Text>

            <Flex className="fx-fade-up" style={delay(0.3)} gap="3" wrap="wrap" justify={{ base: "center", md: "flex-start" }}>
              <ButtonLink href={mailto("Project inquiry")}>
                <LuMail aria-hidden="true" /> {site.email}
              </ButtonLink>
              <ButtonLink href="#services" variant="outline">
                What I do <LuArrowRight aria-hidden="true" />
              </ButtonLink>
            </Flex>

            <HStack className="fx-fade-up" style={delay(0.4)} gap="2" color="fg.muted" fontSize="sm">
              <LuMapPin aria-hidden="true" />
              <Span>Based in {site.location} · Remote-friendly</Span>
            </HStack>
          </Stack>

          {/* Avatar -> click to reveal the real photo */}
          <Box
            className="fx-fade-up"
            style={delay(0.2)}
            position="relative"
            w={{ base: "15rem", sm: "18rem", md: "22rem", lg: "26rem" }}
            flexShrink={0}
          >
            <HeroPhoto />
            <Box className="fx-chip" position="absolute" zIndex={4} top="6%" left="-8%" pointerEvents="none">
              <Badge variant="secondary" size="lg">Web Dev</Badge>
            </Box>
            <Box className="fx-chip" style={{ animationDelay: "-2s" }} position="absolute" zIndex={4} top="42%" right="-10%" pointerEvents="none">
              <Badge variant="secondary" size="lg">AI Engineer</Badge>
            </Box>
            <Box className="fx-chip" style={{ animationDelay: "-4s" }} position="absolute" zIndex={4} bottom="24%" left="-6%" pointerEvents="none">
              <Badge variant="secondary" size="lg">@indokudev</Badge>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
