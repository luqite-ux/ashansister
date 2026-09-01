import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const intro = dict.home.intro

export function IntroSection() {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-lg border border-border lg:order-1">
          <Image
            src={intro.image || "/placeholder.svg"}
            alt={intro.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{intro.eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            {intro.heading}
          </h2>
          <div className="mt-5 space-y-4">
            {intro.body.map((paragraph) => (
              <p key={paragraph} className="text-pretty leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
          <Link
            href={intro.cta.href}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {intro.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
