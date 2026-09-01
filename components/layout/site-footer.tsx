import Link from "next/link"
import Image from "next/image"
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { productCategories } from "@/lib/data/products"

const dict = getDictionary()

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2" aria-label={`${dict.brand.name} — Home`}>
              <Image
                src="/images/logo.jpg"
                alt={`${dict.brand.name} logo`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="font-serif text-base font-semibold text-foreground">{dict.brand.name}</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{dict.footer.tagline}</p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{dict.brand.legalNameEnNote}</p>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground">{dict.footer.columns.company}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">{dict.nav.about}</Link></li>
              <li><Link href="/manufacturing" className="hover:text-primary">{dict.nav.manufacturing}</Link></li>
              <li><Link href="/news" className="hover:text-primary">{dict.nav.news}</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground">{dict.footer.columns.catalog}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {productCategories.slice(0, 5).map((category) => (
                <li key={category.slug}>
                  <Link href={`/products?category=${category.slug}`} className="hover:text-primary">
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="font-medium text-primary hover:underline">
                  View all products
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm font-semibold text-foreground">{dict.footer.columns.contact}</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={dict.contactInfo.phoneHref} className="hover:text-primary">{dict.contactInfo.phone}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={dict.contactInfo.whatsappHref} className="hover:text-primary" target="_blank" rel="noopener noreferrer">
                  WhatsApp: {dict.contactInfo.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="flex flex-col">
                  <a href={`mailto:${dict.contactInfo.emailPrimary}`} className="hover:text-primary">{dict.contactInfo.emailPrimary}</a>
                  <a href={`mailto:${dict.contactInfo.emailSecondary}`} className="hover:text-primary">{dict.contactInfo.emailSecondary}</a>
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
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {dict.brand.legalNameEnNote}. {dict.footer.rightsReserved}
          </p>
          <p>{dict.brand.legalNameZh}</p>
        </div>
      </div>
    </footer>
  )
}
