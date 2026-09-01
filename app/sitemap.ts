import type { MetadataRoute } from "next"
import { products } from "@/lib/data/products"
import { newsArticles } from "@/lib/data/news"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/products`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/manufacturing`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/news`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteUrl}/products/${product.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  const newsRoutes: MetadataRoute.Sitemap = newsArticles.map((article) => ({
    url: `${siteUrl}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "monthly",
    priority: 0.4,
  }))

  return [...staticRoutes, ...productRoutes, ...newsRoutes]
}
