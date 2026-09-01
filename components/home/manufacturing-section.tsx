import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { facilityStats } from "@/lib/data/facility"

const dict = getDictionary()
const manufacturing = dict.home.manufacturing

export function ManufacturingSection() {
  return (
    <section className="border-t border-border bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{manufacturing.eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            {manufacturing.heading}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{manufacturing.body}</p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3">
            {facilityStats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-primary/40 pl-3">
                <dd className="font-serif text-lg font-semibold text-foreground sm:text-xl">{stat.value}</dd>
                <dt className="mt-0.5 text-xs leading-snug text-muted-foreground">{stat.label}</dt>
              </div>
            ))}
          </dl>

          <Link
            href={manufacturing.cta.href}
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {manufacturing.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-border sm:aspect-[4/3] lg:aspect-[4/5]">
          <Image
            src={manufacturing.image || "/placeholder.svg"}
            alt={manufacturing.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>
      </div>
    </section>
  )
}
