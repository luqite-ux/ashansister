import type { Product } from "@/lib/data/products"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c")
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A SHAN SISTER",
    legalName: "广东阿珊姐食品有限公司",
    url: siteUrl,
    logo: `${siteUrl}/images/logo.jpg`,
    foundingDate: "2016",
    address: { "@type": "PostalAddress", addressLocality: "Puning", addressRegion: "Guangdong", addressCountry: "CN" },
    contactPoint: { "@type": "ContactPoint", telephone: "+86-186-8969-2126", contactType: "sales", availableLanguage: ["English", "Chinese"] },
  }
}

export function buildProductJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: [product.image, ...(product.gallery || []).map((image) => image.src)],
    category: product.category,
    brand: { "@type": "Brand", name: "A SHAN SISTER" },
    manufacturer: { "@type": "Organization", name: "A SHAN SISTER" },
    url: `${siteUrl}/products/${product.slug}`,
  }
}

export function buildProductBreadcrumbJsonLd(product: Product, categoryName?: string) {
  const items = [{ "@type": "ListItem", position: 1, name: "Products", item: `${siteUrl}/products` }]
  if (categoryName) items.push({ "@type": "ListItem", position: 2, name: categoryName, item: `${siteUrl}/products?category=${product.category}` })
  items.push({ "@type": "ListItem", position: items.length + 1, name: product.name, item: `${siteUrl}/products/${product.slug}` })
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items }
}
