import type { Metadata } from "next"
import { CategoryFilter } from "@/components/products/category-filter"
import { ProductGrid } from "@/components/products/product-grid"
import { getCategoryBySlug, type ProductCategorySlug } from "@/lib/data/products"
import { getCatalogProducts } from "@/lib/catalog-db"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse A SHAN SISTER's preserved-fruit catalog, including preserved tangerine peel, bergamot, lemon, mango, sour plum strips, Indian gooseberry, fruit chewy bites and tangerine-peel ginger candy.",
  alternates: { canonical: "/products" },
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const activeCategory = category && getCategoryBySlug(category) ? (category as ProductCategorySlug) : undefined
  const allProducts = await getCatalogProducts()
  const products = activeCategory ? allProducts.filter((product) => product.category === activeCategory) : allProducts
  const categoryInfo = activeCategory ? getCategoryBySlug(activeCategory) : undefined

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          {dict.productsPage.heading}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {categoryInfo ? categoryInfo.description : dict.productsPage.intro}
        </p>
      </header>

      <div className="mt-8">
        <CategoryFilter activeCategory={activeCategory} />
      </div>

      <ProductGrid products={products} />
    </div>
  )
}
