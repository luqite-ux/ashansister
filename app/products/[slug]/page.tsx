import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import {
  getCategoryBySlug,
  products,
} from "@/lib/data/products"
import { getCatalogProduct, getCatalogProducts } from "@/lib/catalog-db"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { buildProductBreadcrumbJsonLd, buildProductJsonLd, serializeJsonLd } from "@/lib/structured-data"

const dict = getDictionary()

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getCatalogProduct(slug)
  if (!product) return {}

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      url: `/products/${product.slug}`,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getCatalogProduct(slug)
  if (!product) notFound()

  const category = getCategoryBySlug(product.category)
  const related = (await getCatalogProducts()).filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 3)
  const productJsonLd = buildProductJsonLd(product)
  const breadcrumbJsonLd = buildProductBreadcrumbJsonLd(product, category?.name)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/products">{dict.nav.products}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {category && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/products?category=${category.slug}`}>{category.name}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border border-border">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(min-width: 1024px) 560px, 100vw"
            />
          </div>
          {product.gallery && product.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {product.gallery.map((image) => (
                <div key={image.src} className="relative aspect-square overflow-hidden rounded-md border border-border">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="180px"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          {category && (
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">
              {dict.productDetail.categoryLabel}: {category.name}
            </p>
          )}
          <h1 className="mt-2 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{product.shortDescription}</p>

          <div className="mt-6 space-y-4 border-t border-border pt-6">
            <h2 className="font-serif text-base font-semibold text-foreground">
              {dict.productDetail.descriptionHeading}
            </h2>
            {product.description.map((paragraph) => (
              <p key={paragraph} className="text-pretty leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-6 space-y-2 border-t border-border pt-6">
            <h2 className="font-serif text-base font-semibold text-foreground">
              {dict.productDetail.packagingHeading}
            </h2>
            <p className="text-pretty leading-relaxed text-muted-foreground">{product.packagingNote}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`}>
                {dict.productDetail.inquireCta}
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                <ArrowLeft className="mr-1.5 h-4 w-4" aria-hidden="true" />
                {dict.productDetail.backLabel}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-serif text-xl font-semibold text-foreground">{dict.productDetail.otherInCategory}</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/products/${item.slug}`}
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, 50vw"
                    />
                  </div>
                  <p className="p-3 text-balance font-serif text-sm font-semibold leading-snug text-foreground sm:p-4 sm:text-base">
                    {item.name}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
