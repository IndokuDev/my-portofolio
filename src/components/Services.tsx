import type { ReactElement } from "react"
import { Box, CardBody, CardDescription, CardRoot, CardTitle, SimpleGrid, Stack, Text } from "@indoku/ui"
import { LuBot, LuLayoutDashboard, LuRocket, LuSparkles } from "react-icons/lu"
import { Section } from "./Section"
import { process, services } from "../data/site"

const icons: Record<string, ReactElement> = {
  rocket: <LuRocket size={22} aria-hidden="true" />,
  dashboard: <LuLayoutDashboard size={22} aria-hidden="true" />,
  bot: <LuBot size={22} aria-hidden="true" />,
  sparkles: <LuSparkles size={22} aria-hidden="true" />,
}

export default function Services() {
  return (
    <>
      <Section
        id="services"
        eyebrow="Services"
        title="What I can build for you."
        subtitle="From websites to AI-powered tools, designed and built end to end."
      >
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
          {services.map((s) => (
            <CardRoot key={s.title} h="full" transition="transform 0.25s ease" _hover={{ transform: "translateY(-4px)" }}>
              <CardBody>
                <Stack gap="4">
                  <Box display="inline-flex" alignItems="center" justifyContent="center" w="11" h="11" rounded="xl" bg="bg.muted" color="fg">
                    {icons[s.icon]}
                  </Box>
                  <Stack gap="2">
                    <CardTitle as="h3">{s.title}</CardTitle>
                    <CardDescription>{s.description}</CardDescription>
                  </Stack>
                </Stack>
              </CardBody>
            </CardRoot>
          ))}
        </SimpleGrid>
      </Section>

      <Section id="process" eyebrow="Process" title="Simple, transparent, no surprises.">
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="4">
          {process.map((p, i) => (
            <CardRoot key={p.title} h="full">
              <CardBody>
                <Stack gap="3">
                  <Text fontFamily="mono" fontSize="3xl" fontWeight="bold" color="fg.muted">
                    0{i + 1}
                  </Text>
                  <CardTitle as="h3">{p.title}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </Stack>
              </CardBody>
            </CardRoot>
          ))}
        </SimpleGrid>
      </Section>
    </>
  )
}
