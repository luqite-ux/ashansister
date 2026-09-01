import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const finalCta = dict.home.finalCta

export function FinalCtaSection() {
  return (
    <section className="bg-[#2c2015] py-14 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance font-serif text-2xl font-semibold text-[#fff8ea] sm:text-3xl lg:text-4xl">
          {finalCta.heading}
        </h2>
        <p className="max-w-xl text-pretty leading-relaxed text-[#f0e6d3]">{finalCta.body}</p>
        <Button asChild size="lg" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href={finalCta.cta.href}>{finalCta.cta.label}</Link>
        </Button>
      </div>
    </section>
  )
}
