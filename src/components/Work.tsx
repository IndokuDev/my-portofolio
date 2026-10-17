import {
  Badge, CardBody, CardDescription, CardRoot, CardTitle, EmptyContent, EmptyDescription, EmptyHeader,
  EmptyMedia, EmptyRoot, EmptyTitle, Flex, HStack, Link, SimpleGrid, Span, Stack,
} from "@indoku/ui"
import { LuArrowUpRight, LuStar } from "react-icons/lu"
import { FaGithub } from "react-icons/fa6"
import { Section } from "./Section"
import { ButtonLink } from "./ButtonLink"
import { site, stack } from "../data/site"

export type Project = {
  name: string
  description: string
  url: string
  language: string | null
  stars: number
}

export default function Work({ projects }: { projects: Project[] }) {
  return (
    <Section
      id="work"
      eyebrow="Work"
      title="Built in the open."
      subtitle="Recent projects from my GitHub, and what I work with."
    >
      <Stack gap="10">
        <Flex wrap="wrap" gap="2" role="list" aria-label="Skills">
          {stack.map((t) => (
            <Badge key={t} role="listitem" variant="secondary" size="lg">
              {t}
            </Badge>
          ))}
        </Flex>

        {projects.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
            {projects.map((p) => (
              <Link
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name} on GitHub`}
                display="block"
                h="full"
                textDecoration="none"
                color="inherit"
              >
                <CardRoot h="full" transition="transform 0.25s ease" _hover={{ transform: "translateY(-4px)" }}>
                  <CardBody>
                    <Stack gap="3" h="full" justify="space-between">
                      <Stack gap="2">
                        <Flex justify="space-between" align="center" gap="2">
                          <CardTitle as="h3">{p.name}</CardTitle>
                          <LuArrowUpRight aria-hidden="true" />
                        </Flex>
                        <CardDescription>{p.description}</CardDescription>
                      </Stack>
                      <HStack gap="3" color="fg.muted" fontSize="sm">
                        {p.language && <Badge variant="outline">{p.language}</Badge>}
                        {p.stars > 0 && (
                          <HStack gap="1">
                            <LuStar aria-hidden="true" /> <Span>{p.stars}</Span>
                          </HStack>
                        )}
                      </HStack>
                    </Stack>
                  </CardBody>
                </CardRoot>
              </Link>
            ))}
          </SimpleGrid>
        ) : (
          <EmptyRoot>
            <EmptyHeader>
              <EmptyMedia>
                <FaGithub size={22} aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>See my latest code on GitHub</EmptyTitle>
              <EmptyDescription>Open-source projects, experiments and everything I&apos;m shipping right now.</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <ButtonLink href={site.socials.github} external variant="outline">
                <FaGithub aria-hidden="true" /> github.com/{site.handle}
              </ButtonLink>
            </EmptyContent>
          </EmptyRoot>
        )}
      </Stack>
    </Section>
  )
}
