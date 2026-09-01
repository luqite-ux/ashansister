import Image from "next/image"
import Link from "next/link"
import { FileCheck2 } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const quality = dict.home.quality
const showroom = dict.home.showroom

export function QualityShowroomSection() {
  return (
    <section className="border-t border-border bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-lg border border-border lg:order-1">
          <Image
            src={showroom.image || "/placeholder.svg"}
            alt={showroom.imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 560px, 100vw"
          />
        </div>

        <div className="order-1 flex flex-col gap-10 lg:order-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{showroom.eyebrow}</p>
            <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl">
              {showroom.heading}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{showroom.body}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <span className="rounded-md bg-accent/15 p-2 text-accent">
                <FileCheck2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{quality.eyebrow}</p>
                <h3 className="mt-1 text-balance font-serif text-lg font-semibold text-foreground">
                  {quality.heading}
                </h3>
              </div>
            </div>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">{quality.body}</p>
            <Link
              href={quality.cta.href}
              className="mt-4 inline-flex text-sm font-semibold text-primary hover:underline"
            >
              {quality.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
