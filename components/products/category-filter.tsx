import Link from "next/link"
import { cn } from "@/lib/utils"
import { productCategories } from "@/lib/data/products"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()

export function CategoryFilter({ activeCategory }: { activeCategory?: string }) {
  return (
    <nav aria-label="Filter products by category" className="-mx-1 flex flex-wrap gap-2 overflow-x-auto px-1 pb-1">
      <Link
        href="/products"
        aria-current={!activeCategory ? "page" : undefined}
        className={cn(
          "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
          !activeCategory
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border bg-card text-foreground hover:border-primary/50 hover:text-primary",
        )}
      >
        {dict.productsPage.allCategoriesLabel}
      </Link>
      {productCategories.map((category) => {
        const active = activeCategory === category.slug
        return (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground hover:border-primary/50 hover:text-primary",
            )}
          >
            {category.name}
          </Link>
        )
      })}
    </nav>
  )
}
