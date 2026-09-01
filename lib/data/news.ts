/**
 * News / articles data.
 *
 * No factual articles have been supplied for A SHAN SISTER, so this
 * starts as an empty, typed array. The `/news` and `/news/[slug]`
 * templates are built to render real entries the moment they're
 * added here (or swapped for a CMS/DB query) — no other code needs
 * to change.
 */
export interface NewsArticle {
  slug: string
  title: string
  excerpt: string
  publishedAt: string // ISO date
  coverImage: string
  coverImageAlt: string
  content: string[]
}

export const newsArticles: NewsArticle[] = []

export function getNewsArticleBySlug(slug: string) {
  return newsArticles.find((article) => article.slug === slug)
}
