import Link from "next/link"
import { Search, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="font-serif text-6xl font-semibold text-primary">404</p>
      <h1 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-foreground text-balance sm:text-3xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground text-pretty">
        The page you&apos;re looking for may have moved or no longer exists. Try the catalog, or head back to the
        {" "}
        {dict.brand.name} homepage.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Link href="/">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Link>
        </Button>
        <Button asChild variant="outline" className="border-border">
          <Link href="/products">
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse the catalog
          </Link>
        </Button>
      </div>
    </div>
  )
}
