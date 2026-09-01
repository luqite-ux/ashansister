import catalog from "@/data/products.json"

export type ProductCategorySlug =
  | "tangerine-peel"
  | "bergamot"
  | "lemon"
  | "mango"
  | "plum-strips"
  | "gooseberry"
  | "chewy-bites"
  | "ginger-candy"

export interface ProductCategory {
  slug: ProductCategorySlug
  name: string
  description: string
}

export interface Product {
  sku: string
  slug: string
  name: string
  category: ProductCategorySlug
  shortDescription: string
  description: string[]
  image: string
  imageAlt: string
  gallery?: { src: string; alt: string }[]
  packagingNote: string
  imageStatus: string
}

const categoryMap: Record<string, ProductCategorySlug> = {
  "preserved-tangerine-peel": "tangerine-peel",
  "preserved-bergamot": "bergamot",
  "preserved-lemon": "lemon",
  "preserved-mango": "mango",
  "preserved-sour-plum-strips": "plum-strips",
  "preserved-indian-gooseberry": "gooseberry",
  "fruit-drops": "chewy-bites",
  "preserved-fruit-chewy-bites": "chewy-bites",
  candy: "ginger-candy",
}

export const productCategories: ProductCategory[] = [
  { slug: "tangerine-peel", name: "Preserved Tangerine Peel", description: "Preserved tangerine peel in the flavors and cuts listed in the customer catalog." },
  { slug: "bergamot", name: "Preserved Bergamot", description: "Preserved bergamot products for bulk wholesale and private-label orders." },
  { slug: "lemon", name: "Preserved Lemon", description: "Preserved lemon products from the verified customer catalog." },
  { slug: "mango", name: "Preserved Mango", description: "Preserved mango products for wholesale supply." },
  { slug: "plum-strips", name: "Preserved Sour Plum Strips", description: "Sour plum strip formats listed in the customer catalog." },
  { slug: "gooseberry", name: "Preserved Indian Gooseberry", description: "Preserved Indian gooseberry products for wholesale supply." },
  { slug: "chewy-bites", name: "Fruit Drops & Chewy Bites", description: "Fruit drop and chewy-bite formats from the customer catalog." },
  { slug: "ginger-candy", name: "Candy", description: "Candy products listed in the customer catalog." },
]

type CatalogProduct = (typeof catalog)[number]

function toProduct(item: CatalogProduct): Product {
  const images = item.images ?? []
  const description = item.description_i18n.en || item.overview_i18n.en
  const category = categoryMap[item.category_key]

  if (!category) throw new Error(`Unknown product category: ${item.category_key}`)

  return {
    sku: item.sku,
    slug: item.slug,
    name: item.name_i18n.en,
    category,
    shortDescription: description,
    description: [description],
    image: images[0] || "/images/product-image-pending.svg",
    imageAlt: images.length > 0 ? `${item.name_i18n.en} — customer-supplied product photograph` : `${item.name_i18n.en} — image pending source verification`,
    gallery: images.slice(1).map((src, index) => ({
      src,
      alt: `${item.name_i18n.en} — customer-supplied product photograph ${index + 2}`,
    })),
    packagingNote: item.specification
      ? `Carton specification: ${item.specification}. Packaging details are confirmed per order.`
      : "Packaging details are confirmed per order.",
    imageStatus: item.image_status,
  }
}

export const products: Product[] = catalog.map(toProduct)

export function getProductsByCategory(category?: ProductCategorySlug) {
  if (!category) return products
  return products.filter((product) => product.category === category)
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

export function getCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug)
}

export function getFeaturedProducts(limit = 4) {
  return products.filter((product) => product.imageStatus === "verified-customer-source").slice(0, limit)
}
