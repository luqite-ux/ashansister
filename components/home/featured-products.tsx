import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { getCategoryBySlug } from "@/lib/data/products"
import { getCatalogProducts } from "@/lib/catalog-db"

const dict = getDictionary()
const featured = dict.home.featured
export async function FeaturedProducts() {
  const featuredProducts = (await getCatalogProducts()).filter((product) => product.imageStatus === "verified-customer-source").slice(0, 4)
  return (
    <section className="bg-secondary/50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{featured.eyebrow}</p>
            <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
              {featured.heading}
            </h2>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{featured.body}</p>
          </div>
          <Link
            href={featured.cta.href}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
          >
            {featured.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featuredProducts.map((product) => {
            const category = getCategoryBySlug(product.category)
            return (
              <li key={product.slug}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 25vw, 50vw"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    {category && (
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">
                        {category.name}
                      </p>
                    )}
                    <p className="mt-1 text-balance font-serif text-sm font-semibold leading-snug text-foreground sm:text-base">
                      {product.name}
                    </p>
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
