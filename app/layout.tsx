import type { Metadata, Viewport } from "next"
import { Inter, Fraunces, Geist_Mono, Geist } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { buildOrganizationJsonLd, serializeJsonLd } from "@/lib/structured-data"
import "./globals.css"
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "A SHAN SISTER | Preserved Fruit Manufacturer",
    template: "%s | A SHAN SISTER",
  },
  description:
    "A SHAN SISTER is a source manufacturer of preserved tangerine peel, bergamot, lemon and other Chaoshan-style preserved fruit snacks in Puning, Guangdong, China. Bulk wholesale and OEM/ODM packaging available.",
  keywords: [
    "A Shan Sister",
    "preserved tangerine peel manufacturer",
    "preserved fruit wholesale",
    "Chaoshan preserved fruit",
    "OEM preserved fruit",
    "Guangdong food manufacturer",
  ],
  openGraph: {
    title: "A SHAN SISTER — Preserved Fruit Source Manufacturer",
    description:
      "Source manufacturer of preserved tangerine peel, bergamot, lemon and Chaoshan-style preserved fruit snacks. Bulk wholesale and OEM/ODM packaging, based in Puning, Guangdong, China.",
    url: siteUrl,
    siteName: "A SHAN SISTER",
    locale: "en_US",
    type: "website",
    images: [{ url: "/images/banner-product.jpg", width: 1600, height: 700, alt: "A SHAN SISTER preserved tangerine peel jars" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "A SHAN SISTER — Preserved Fruit Source Manufacturer",
    description:
      "Source manufacturer of preserved tangerine peel, bergamot, lemon and Chaoshan-style preserved fruit snacks. Wholesale and OEM/ODM.",
    images: ["/images/banner-product.jpg"],
  },
  icons: {
    icon: [{ url: "/icon.jpg", type: "image/jpeg" }],
    apple: [{ url: "/icon.jpg", type: "image/jpeg" }],
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#faf3e6",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationJsonLd = buildOrganizationJsonLd()

  return (
    <html lang="en" className={cn("bg-background", "font-sans", geist.variable)}>
      <body className={`${_inter.variable} ${_fraunces.variable} font-sans antialiased bg-background text-foreground`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
