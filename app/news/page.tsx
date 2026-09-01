import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Newspaper } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getPublishedArticles } from "@/lib/catalog-db"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const page = dict.newsPage

export const metadata: Metadata = {
  title: "News",
  description: "Company news and announcements from A SHAN SISTER.",
  alternates: { canonical: "/news" },
}

export default async function NewsPage() {
  const newsArticles = await getPublishedArticles()
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <header className="max-w-2xl">
        <h1 className="text-balance font-serif text-3xl font-semibold text-foreground sm:text-4xl">
          {page.heading}
        </h1>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{page.intro}</p>
      </header>

      {newsArticles.length === 0 ? (
        <div className="mx-auto mt-10 max-w-lg">
          <Empty className="rounded-lg border border-border bg-card">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Newspaper aria-hidden="true" />
              </EmptyMedia>
              <EmptyTitle>{page.emptyTitle}</EmptyTitle>
              <EmptyDescription>{page.emptyBody}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        </div>
      ) : (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsArticles.map((article) => (
            <li key={article.slug}>
              <Link
                href={`/news/${article.slug}`}
                className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={article.coverImage || "/placeholder.svg"}
                    alt={article.coverImageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground">
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="mt-1 text-balance font-serif text-base font-semibold text-foreground">
                    {article.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
