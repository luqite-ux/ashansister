import Link from "next/link"
import { Newspaper } from "lucide-react"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { newsArticles } from "@/lib/data/news"

const dict = getDictionary()
const news = dict.home.news

export function NewsPreviewSection() {
  return (
    <section className="border-t border-border bg-background py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{news.eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            {news.heading}
          </h2>
        </div>

        <div className="mx-auto mt-8 max-w-lg">
          {newsArticles.length === 0 ? (
            <Empty className="rounded-lg border border-border bg-card">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Newspaper aria-hidden="true" />
                </EmptyMedia>
                <EmptyTitle>{news.emptyTitle}</EmptyTitle>
                <EmptyDescription>{news.emptyBody}</EmptyDescription>
              </EmptyHeader>
            </Empty>
          ) : null}
        </div>

        <div className="mt-6 text-center">
          <Link href={news.cta.href} className="text-sm font-semibold text-primary hover:underline">
            {news.cta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
