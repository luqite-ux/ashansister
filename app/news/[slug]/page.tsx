import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getPublishedArticle } from "@/lib/catalog-db"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()

export function generateStaticParams() {
  return []
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getPublishedArticle(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/news/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage, alt: article.coverImageAlt }],
    },
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getPublishedArticle(slug)
  if (!article) notFound()

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <Link
        href="/news"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        {dict.newsPage.backLabel}
      </Link>

      <header className="mt-6">
        <p className="text-xs text-muted-foreground">
          {new Date(article.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h1 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          {article.title}
        </h1>
      </header>

      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg border border-border">
        <Image
          src={article.coverImage || "/placeholder.svg"}
          alt={article.coverImageAlt}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 1024px) 768px, 100vw"
        />
      </div>

      <div className="mt-8 space-y-4">
        {article.content.map((paragraph) => (
          <p key={paragraph} className="text-pretty leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href={dict.newsPage.cta.href}>{dict.newsPage.cta.label}</Link>
        </Button>
      </div>
    </article>
  )
}
