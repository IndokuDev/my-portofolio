import type { ReactNode } from "react"
import { Button } from "@indoku/ui"

type Props = {
  href: string
  children: ReactNode
  variant?: "primary" | "outline"
  size?: "md" | "lg"
  external?: boolean
}

// `asChild` is supported at runtime but missing from ButtonProps' typings.
const asChild = { asChild: true } as Record<string, unknown>

// A real <a href> (crawlable, works without JS) wearing the library's Button styles.
export function ButtonLink({ href, children, variant = "primary", size = "lg", external }: Props) {
  const big = size === "lg"
  return (
    <Button
      {...asChild}
      variant={variant === "primary" ? "solid" : "outline"}
      size={size}
      h={big ? "12" : "10"}
      px={big ? "6" : "4"}
      gap="2"
      rounded="full"
      fontWeight="semibold"
      textDecoration="none"
      transition="transform 0.2s ease, opacity 0.2s ease"
      _hover={{ transform: "translateY(-2px)" }}
    >
      <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    </Button>
  )
}
