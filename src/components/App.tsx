// src/components/App.tsx
import { Box, Link, Provider, Toaster } from "@indoku/ui"
import Navbar from "./Navbar"
import Hero from "./Hero"
import Services from "./Services"
import Work, { type Project } from "./Work"
import Contact from "./Contact"
import Footer from "./Footer"
import Confetti from "./Confetti"
import { useEasterEggs } from "./useEasterEggs"

export default function App({ projects = [] }: { projects?: Project[] }) {
  const { burst, onLogoClick } = useEasterEggs()
  return (
    <Provider defaultColorMode="dark">
      <Box bg="bg" color="fg" minH="100vh">
        <Link
          href="#main"
          position="absolute"
          left="4"
          top="-4rem"
          zIndex={100}
          px="4"
          py="2"
          rounded="lg"
          bg="#6d5dfc"
          color="#fff"
          fontWeight="semibold"
          textDecoration="none"
          css={{ "&:focus": { top: "1rem" } }}
        >
          Skip to content
        </Link>
        <Navbar onLogoClick={onLogoClick} />
        <Box as="main" id="main">
          <Hero />
          <Services />
          <Work projects={projects} />
          <Contact />
        </Box>
        <Footer />
      </Box>
      <Confetti burst={burst} />
      <Toaster />
    </Provider>
  )
}
