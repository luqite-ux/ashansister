import "server-only"
import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import { products as workbookProducts, type Product, type ProductCategorySlug } from "@/lib/data/products"

type ProductRow = {
  slug: string | null
  name: string | null
  name_en: string | null
  name_i18n: Record<string, string> | null
  description: string | null
  description_en: string | null
  description_i18n: Record<string, string> | null
  overview_i18n: Record<string, string> | null
  category_slug: string | null
  image_url: string | null
  specs: Record<string, unknown> | null
  extra_data: Record<string, unknown> | null
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

function localized(map: Record<string, string> | null, locale: string, fallback = "") {
  if (!map) return fallback
  return map[locale] || map.en || map.zh || Object.values(map).find(Boolean) || fallback
}

function toProduct(row: ProductRow, locale: string): Product {
  const extra = row.extra_data ?? {}
  const gallery = Array.isArray(extra.images) ? extra.images.filter((item): item is string => typeof item === "string") : []
  const description = localized(row.description_i18n, locale, row.description_en || row.description || "")
  const category = categoryMap[row.category_slug || ""]
  if (!category) throw new Error(`Unknown database product category: ${row.category_slug}`)
  const specification = typeof row.specs?.specification === "string" ? row.specs.specification : ""
  return {
    sku: typeof extra.sku === "string" ? extra.sku : "",
    slug: row.slug || "",
    name: localized(row.name_i18n, locale, row.name_en || row.name || "Untitled product"),
    category,
    shortDescription: description,
    description: [localized(row.overview_i18n, locale, description)],
    image: row.image_url || "/images/product-image-pending.svg",
    imageAlt: `${localized(row.name_i18n, locale, row.name_en || row.name || "Product")} — customer-supplied product photograph`,
    gallery: gallery.map((src, index) => ({ src, alt: `Product photograph ${index + 1}` })),
    packagingNote: specification ? `Carton specification: ${specification}. Packaging details are confirmed per order.` : "Packaging details are confirmed per order.",
    imageStatus: typeof extra.image_status === "string" ? extra.image_status : "verified-customer-source",
  }
}

export async function getCatalogProducts(locale = "en"): Promise<Product[]> {
  const client = getSupabaseClient()
  const tenantId = getTenantId()
  if (!client || !tenantId) return workbookProducts
  const { data, error } = await client.from("products")
    .select("slug,name,name_en,name_i18n,description,description_en,description_i18n,overview_i18n,category_slug,image_url,specs,extra_data")
    .eq("tenant_id", tenantId).eq("is_active", true).order("sort_order", { ascending: true })
  if (error) throw new Error(`[catalog-db] configured product query failed: ${error.message}`)
  return (data as unknown as ProductRow[]).map((row) => toProduct(row, locale))
}

export async function getCatalogProduct(slug: string, locale = "en") {
  return (await getCatalogProducts(locale)).find((product) => product.slug === slug)
}

export type Article = { slug: string; title: string; excerpt: string; content: string[]; publishedAt: string; coverImage: string; coverImageAlt: string }

export async function getPublishedArticles(locale = "en"): Promise<Article[]> {
  const client = getSupabaseClient()
  const tenantId = getTenantId()
  if (!client || !tenantId) return []
  const { data, error } = await client.from("articles")
    .select("slug,title,title_en,title_i18n,excerpt,excerpt_en,excerpt_i18n,content,content_en,content_i18n,published_at,featured_image")
    .eq("tenant_id", tenantId).eq("is_published", true).order("published_at", { ascending: false })
  if (error) throw new Error(`[catalog-db] configured article query failed: ${error.message}`)
  return (data ?? []).map((row) => {
    const title = localized(row.title_i18n as Record<string, string> | null, locale, row.title_en || row.title || "")
    const excerpt = localized(row.excerpt_i18n as Record<string, string> | null, locale, row.excerpt_en || row.excerpt || "")
    const content = localized(row.content_i18n as Record<string, string> | null, locale, row.content_en || row.content || "")
    return { slug: row.slug || "", title, excerpt, content: content.split(/\n\s*\n/).filter(Boolean), publishedAt: row.published_at || new Date(0).toISOString(), coverImage: row.featured_image || "/images/product-image-pending.svg", coverImageAlt: title }
  })
}

export async function getPublishedArticle(slug: string, locale = "en") {
  return (await getPublishedArticles(locale)).find((article) => article.slug === slug)
}
