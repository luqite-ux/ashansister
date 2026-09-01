import type { Metadata } from "next"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${dict.brand.legalNameEnNote} collects and uses information submitted through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <p className="font-sans text-sm font-medium uppercase tracking-wide text-primary">Legal</p>
      <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: this policy applies to {dict.brand.name}.</p>

      <div className="mt-10 space-y-8 text-sm leading-relaxed text-foreground/90">
        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground">Who we are</h2>
          <p className="mt-3 text-pretty">
            This website is operated by {dict.brand.legalNameEnNote} ({dict.brand.legalNameZh}), trading as{" "}
            {dict.brand.name}, based in {dict.contactInfo.addressLine1}, {dict.contactInfo.addressLine2}.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground">Information we collect</h2>
          <p className="mt-3 text-pretty">
            When you submit our contact or inquiry form, we collect the information you choose to provide, which
            may include your name, company name, email address, phone or WhatsApp number, target product,
            purchase requirement and any message you enter. We do not collect this information through any other
            means on this site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground">How we use your information</h2>
          <p className="mt-3 text-pretty">
            Information submitted through our inquiry form is used solely to respond to your inquiry, including
            following up about wholesale or OEM/ODM requests. We do not sell your information to third parties.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground">How we store your information</h2>
          <p className="mt-3 text-pretty">
            Inquiry submissions are handled according to our current technical setup at the time of submission. If
            our submission process changes, we will update this policy to reflect how inquiries are stored and
            processed.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-semibold text-foreground">Contact us about this policy</h2>
          <p className="mt-3 text-pretty">
            If you have questions about this privacy policy or how your information is handled, contact us at{" "}
            <a href={`mailto:${dict.contactInfo.emailPrimary}`} className="text-primary hover:underline">
              {dict.contactInfo.emailPrimary}
            </a>{" "}
            or{" "}
            <a href={dict.contactInfo.phoneHref} className="text-primary hover:underline">
              {dict.contactInfo.phone}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
