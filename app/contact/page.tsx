import type { Metadata } from "next"
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { InquiryForm } from "@/components/contact/inquiry-form"

const dict = getDictionary()

export const metadata: Metadata = {
  title: dict.contactPage.heading,
  description: dict.contactPage.intro,
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-2xl">
        <p className="font-sans text-sm font-medium uppercase tracking-wide text-primary">
          {dict.nav.contact}
        </p>
        <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
          {dict.contactPage.heading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
          {dict.contactPage.intro}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
          <InquiryForm />
        </div>

        <aside className="space-y-8">
          <div className="rounded-xl border border-border bg-secondary/50 p-6 sm:p-8">
            <h2 className="font-serif text-lg font-semibold text-foreground">
              {dict.contactPage.directHeading}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {dict.contactPage.directBody}
            </p>

            <ul className="mt-6 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={dict.contactInfo.phoneHref} className="text-foreground hover:text-primary">
                  {dict.contactInfo.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a
                  href={dict.contactInfo.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-primary"
                >
                  WhatsApp: {dict.contactInfo.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <div className="flex flex-col">
                  <a href={`mailto:${dict.contactInfo.emailPrimary}`} className="text-foreground hover:text-primary">
                    {dict.contactInfo.emailPrimary}
                  </a>
                  <a href={`mailto:${dict.contactInfo.emailSecondary}`} className="text-foreground hover:text-primary">
                    {dict.contactInfo.emailSecondary}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="text-foreground">
                  {dict.contactPage.addressHeading}
                  <br />
                  {dict.contactInfo.addressLine1}
                  <br />
                  {dict.contactInfo.addressLine2}
                </span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
