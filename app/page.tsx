import type { Metadata } from "next"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { IntroSection } from "@/components/home/intro-section"
import { FeaturedProducts } from "@/components/home/featured-products"
import { ManufacturingSection } from "@/components/home/manufacturing-section"
import { OemSection } from "@/components/home/oem-section"
import { QualityShowroomSection } from "@/components/home/quality-showroom-section"
import { FaqSection } from "@/components/home/faq-section"
import { NewsPreviewSection } from "@/components/home/news-preview-section"
import { FinalCtaSection } from "@/components/home/final-cta-section"
import { SectionReveal } from "@/components/motion/section-reveal"

export const metadata: Metadata = {
  title: "A SHAN SISTER | Preserved Fruit Source Manufacturer in Puning, Guangdong",
  description:
    "A SHAN SISTER is a source manufacturer of preserved tangerine peel, bergamot, lemon and other Chaoshan-style preserved fruit. Bulk wholesale and OEM/ODM packaging.",
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <SectionReveal><IntroSection /></SectionReveal>
      <SectionReveal><FeaturedProducts /></SectionReveal>
      <SectionReveal><ManufacturingSection /></SectionReveal>
      <SectionReveal><OemSection /></SectionReveal>
      <SectionReveal><QualityShowroomSection /></SectionReveal>
      <SectionReveal><FaqSection /></SectionReveal>
      <SectionReveal><NewsPreviewSection /></SectionReveal>
      <SectionReveal><FinalCtaSection /></SectionReveal>
    </>
  )
}
