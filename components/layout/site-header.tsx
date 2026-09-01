"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()

const navItems = [
  { href: "/", label: dict.nav.home },
  { href: "/products", label: dict.nav.products },
  { href: "/manufacturing", label: dict.nav.manufacturing },
  { href: "/about", label: dict.nav.about },
  { href: "/news", label: dict.nav.news },
  { href: "/contact", label: dict.nav.contact },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label={`${dict.brand.name} — Home`}>
          <Image
            src="/images/logo.jpg"
            alt={`${dict.brand.name} logo`}
            width={44}
            height={44}
            className="h-10 w-10 rounded-lg object-cover lg:h-12 lg:w-12"
            priority
          />
          <span className="hidden font-serif text-lg font-semibold tracking-tight text-foreground sm:inline">
            {dict.brand.name}
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary hover:text-foreground",
                  active ? "text-primary" : "text-foreground/80",
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden shrink-0 lg:block">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/contact">{dict.nav.requestQuote}</Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-border lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background p-6">
            <SheetTitle className="flex items-center justify-between font-serif text-lg">
              <span className="flex items-center gap-2">
                <Image
                  src="/images/logo.jpg"
                  alt={`${dict.brand.name} logo`}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-md object-cover"
                />
                {dict.brand.name}
              </span>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" aria-label="Close navigation menu">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </SheetTitle>
            <nav aria-label="Mobile" className="mt-8 flex flex-col gap-1">
              {navItems.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <SheetClose asChild key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "rounded-md px-3 py-3 text-base font-medium transition-colors hover:bg-secondary",
                        active ? "text-primary" : "text-foreground/85",
                      )}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                )
              })}
              <SheetClose asChild>
                <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">{dict.nav.requestQuote}</Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
