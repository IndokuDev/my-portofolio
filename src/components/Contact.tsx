import { useEffect, useState } from "react"
import {
  Alert,
  Box,
  Button,
  CardBody,
  CardRoot,
  Container,
  DatePickerField,
  Field,
  Flex,
  Form,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Span,
  Stack,
  Text,
  Textarea,
  toast,
  useForm,
} from "@indoku/ui"
import { LuCheck, LuCopy, LuMail, LuPencil, LuRotateCcw, LuSend } from "react-icons/lu"
import { ButtonLink } from "./ButtonLink"
import {
  budgets,
  composeInquiry,
  emptyInquiry,
  projectTypes,
  site,
  type InquiryValues,
} from "../data/site"

type Draft = ReturnType<typeof composeInquiry>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const isoToday = () => {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function Contact() {
  const [draft, setDraft] = useState<Draft | null>(null)
  const [copied, setCopied] = useState(false)
  // Computed after mount so the static HTML never bakes in the build date.
  const [today, setToday] = useState<string>()
  useEffect(() => setToday(isoToday()), [])

  const form = useForm<InquiryValues>({
    defaultValues: emptyInquiry,
    validators: {
      name: (v) => (v.trim().length < 2 ? "Tell me your name" : undefined),
      email: (v) => (EMAIL_RE.test(v.trim()) ? undefined : "Enter a valid email so I can reply"),
      type: (v) => (v ? undefined : "Pick what you need"),
      message: (v) => (v.trim().length < 20 ? "A few more words please (20+ characters)" : undefined),
    },
    onSubmit: (values) => {
      const next = composeInquiry(values)
      setDraft(next)
      toast.success("Email draft is ready", { description: next.subject })
      // Opens the visitor's mail app with subject + body already filled in.
      window.location.href = next.href
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
    },
  })

  // The form lib also hands back `onValueChange`, which plain inputs must not receive.
  const bind = <K extends keyof InquiryValues>(name: K) => {
    const { name: n, value, onChange, onBlur } = form.getInputProps(name)
    return { name: n, value, onChange, onBlur }
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.info("Email address copied", { description: site.email })
    } catch {
      toast.error("Couldn't copy", { description: `Write to ${site.email}` })
    }
  }

  const startOver = () => {
    form.reset()
    setDraft(null)
  }

  return (
    <Box as="section" id="contact" aria-labelledby="contact-title">
      <Container maxW="6xl" px={{ base: "5", md: "8" }} py={{ base: "14", md: "20" }}>
        <CardRoot overflow="hidden">
          <CardBody p={{ base: "6", md: "14" }}>
            <Stack gap="8" align="center">
              <Stack gap="4" align={{ base: "flex-start", md: "center" }} textAlign={{ base: "left", md: "center" }}>
                <Text fontFamily="mono" fontSize="sm" color="fg.muted" letterSpacing="wider" textTransform="uppercase">
                  {draft ? "Message prepared" : "Let's work together"}
                </Text>
                <Heading as="h2" id="contact-title" fontSize={{ base: "3xl", md: "6xl" }} lineHeight="1.05" letterSpacing="-0.03em" maxW="3xl">
                  {draft ? draft.title : "Got a project in mind? Let's make it happen."}
                </Heading>
                <Text fontSize={{ base: "md", md: "lg" }} color="fg.muted" maxW="xl" aria-live="polite">
                  {draft
                    ? draft.subtitle
                    : "Fill in the brief below. I'll turn it into a ready-to-send email with the right subject and details."}
                </Text>
              </Stack>

              {draft ? (
                <Stack gap="6" w="full" maxW="2xl">
                  <Alert status="success" title="Draft opened in your mail app">
                    <Text fontSize="sm">
                      Subject: <Span fontWeight="semibold">{draft.subject}</Span>
                    </Text>
                  </Alert>
                  <Flex gap="3" wrap="wrap" justify="center">
                    <ButtonLink href={draft.href}>
                      <LuMail aria-hidden="true" /> Open draft again
                    </ButtonLink>
                    <Button variant="outline" size="lg" h="12" px="6" gap="2" rounded="full" fontWeight="semibold" onClick={copy}>
                      {copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
                      {copied ? "Copied!" : "Copy email"}
                    </Button>
                    <Button variant="ghost" size="lg" h="12" px="4" gap="2" rounded="full" onClick={() => setDraft(null)}>
                      <LuPencil aria-hidden="true" /> Edit details
                    </Button>
                    <Button variant="ghost" size="lg" h="12" px="4" gap="2" rounded="full" onClick={startOver}>
                      <LuRotateCcw aria-hidden="true" /> Start over
                    </Button>
                  </Flex>
                </Stack>
              ) : (
                <Form onSubmit={form.handleSubmit} noValidate w="full" maxW="2xl" textAlign="left" aria-label="Project inquiry">
                  <Stack gap="5">
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
                      <Field label="Name" required meta={form.getFieldMeta("name")}>
                        <Input {...bind("name")} placeholder="Your name" autoComplete="name" />
                      </Field>
                      <Field label="Email" required meta={form.getFieldMeta("email")}>
                        <Input {...bind("email")} type="email" placeholder="you@company.com" autoComplete="email" />
                      </Field>
                    </SimpleGrid>

                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="5">
                      <Field label="What do you need?" required meta={form.getFieldMeta("type")}>
                        <Select
                          name="type"
                          aria-label="Project type"
                          size="lg"
                          size="lg"
                          placeholder="Pick a project type"
                          items={projectTypes}
                          value={form.values.type}
                          onValueChange={(v) => form.setValue("type", v)}
                        />
                      </Field>
                      <Field label="Budget (optional)" meta={form.getFieldMeta("budget")}>
                        <Select
                          name="budget"
                          aria-label="Budget"
                          size="lg"
                          size="lg"
                          placeholder="Pick a range"
                          items={budgets}
                          value={form.values.budget}
                          onValueChange={(v) => form.setValue("budget", v)}
                        />
                      </Field>
                    </SimpleGrid>

                    <Field label="Ideal launch date (optional)" meta={form.getFieldMeta("deadline")}>
                      <DatePickerField
                        placeholder="Pick a date"
                        min={today}
                        value={form.values.deadline}
                        onValueChange={(v) => form.setValue("deadline", v)}
                      />
                    </Field>

                    <Field label="Project details" required meta={form.getFieldMeta("message")}>
                      <Textarea
                        {...bind("message")}
                        rows={5}
                        maxLength={1500}
                        resize="vertical"
                        placeholder="Goals, who it's for, links or references…"
                      />
                    </Field>

                    <Flex gap="3" wrap="wrap" justify="space-between" align="center">
                      <Text fontSize="sm" color="fg.muted">
                        Opens a pre-filled email to {site.email}
                      </Text>
                      <Button type="submit" size="lg" h="12" px="6" gap="2" rounded="full" fontWeight="semibold" disabled={form.isSubmitting}>
                        <LuSend aria-hidden="true" /> Send message
                      </Button>
                    </Flex>
                  </Stack>
                </Form>
              )}
            </Stack>
          </CardBody>
        </CardRoot>
      </Container>
    </Box>
  )
}
