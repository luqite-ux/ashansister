import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/data/products"
import { getCategoryBySlug } from "@/lib/data/products"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="mt-10 rounded-lg border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
        {dict.productsPage.emptyState}
      </p>
    )
  }

  return (
    <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
      {products.map((product) => {
        const category = getCategoryBySlug(product.category)
        return (
          <li key={product.slug}>
            <Link
              href={`/products/${product.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.imageAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                {category && (
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{category.name}</p>
                )}
                <p className="mt-1 text-balance font-serif text-sm font-semibold leading-snug text-foreground sm:text-base">
                  {product.name}
                </p>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {product.shortDescription}
                </p>
              </div>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
