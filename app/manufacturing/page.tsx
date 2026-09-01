import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { FileCheck2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { facilityStats } from "@/lib/data/facility"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const page = dict.manufacturingPage

export const metadata: Metadata = {
  title: "Manufacturing & Capacity",
  description:
    "A SHAN SISTER's Lihu Town, Puning facility: nine workshops, four semi-automatic production lines, approximately 167 metric tons monthly capacity, and an SC food production license.",
  alternates: { canonical: "/manufacturing" },
}

export default function ManufacturingPage() {
  return (
    <div>
      <section className="relative h-[320px] w-full sm:h-[380px] lg:h-[440px]">
        <Image
          src={page.heroImage || "/placeholder.svg"}
          alt={page.heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1207]/80 via-[#1a1207]/25 to-transparent" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-8 sm:px-6 sm:pb-10 lg:px-8 lg:pb-14">
          <h1 className="max-w-xl text-balance font-serif text-3xl font-semibold text-[#fff8ea] sm:text-4xl">
            {page.heading}
          </h1>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <p className="max-w-2xl text-pretty leading-relaxed text-muted-foreground">{page.intro}</p>

        <div className="mt-10">
          <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">{page.statsHeading}</h2>
          <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {facilityStats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-4">
                <dd className="font-serif text-xl font-semibold text-primary sm:text-2xl">{stat.value}</dd>
                <dt className="mt-1 text-xs leading-snug text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-14 grid gap-10 border-t border-border pt-14 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">{page.processHeading}</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{page.processBody}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-md bg-accent/15 p-2 text-accent">
                <FileCheck2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-serif text-base font-semibold text-foreground">{page.licenseHeading}</h2>
            </div>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{page.licenseBody}</p>
          </div>
        </div>

        <div className="mt-14 border-t border-border pt-14">
          <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">{page.galleryHeading}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {page.galleryImages.map((image) => (
              <div key={image.src} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start gap-4 rounded-lg border border-border bg-secondary/50 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">{page.oemHeading}</h2>
            <p className="mt-2 max-w-xl text-pretty leading-relaxed text-muted-foreground">{page.oemBody}</p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={page.cta.href}>{page.cta.label}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
