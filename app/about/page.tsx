import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const page = dict.aboutPage

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A SHAN SISTER is a source manufacturer of Chaoshan-style preserved fruit, founded in 2016 in Lihu Town, Puning, Guangdong, China.",
  alternates: { canonical: "/about" },
}

export default function AboutPage() {
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

        <div className="mt-14 border-t border-border pt-14">
          <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">{page.historyHeading}</h2>
          <div className="mt-4 max-w-2xl space-y-4">
            {page.historyBody.map((paragraph) => (
              <p key={paragraph} className="text-pretty leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-10 border-t border-border pt-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground sm:text-2xl">{page.modelHeading}</h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{page.modelBody}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border">
            <Image
              src={page.modelImage || "/placeholder.svg"}
              alt={page.modelImageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-border pt-14 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-serif text-xl font-semibold text-foreground">{page.contactHeading}</h2>
            <p className="mt-2 max-w-md text-pretty leading-relaxed text-muted-foreground">{page.contactBody}</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={dict.contactInfo.phoneHref} className="hover:text-primary">
                  {dict.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href={dict.contactInfo.whatsappHref}
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: {dict.contactInfo.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="flex flex-col">
                  <a href={`mailto:${dict.contactInfo.emailPrimary}`} className="hover:text-primary">
                    {dict.contactInfo.emailPrimary}
                  </a>
                  <a href={`mailto:${dict.contactInfo.emailSecondary}`} className="hover:text-primary">
                    {dict.contactInfo.emailSecondary}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  {dict.contactInfo.addressLine1}
                  <br />
                  {dict.contactInfo.addressLine2}
                </span>
              </li>
            </ul>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href={page.cta.href}>{page.cta.label}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
