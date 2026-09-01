"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const slides = dict.home.hero.slides

const AUTOPLAY_MS = 6500

export function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    reducedMotionRef.current = mq.matches
    setPlaying(!mq.matches)
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
      setPlaying(!e.matches)
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const goTo = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length)
  }, [])

  const goNext = useCallback(() => goTo(index + 1), [goTo, index])
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index])

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length)
    }, AUTOPLAY_MS)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [playing])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      goNext()
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      goPrev()
    }
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Featured highlights"
      className="relative overflow-hidden bg-secondary"
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(!reducedMotionRef.current)}
      onKeyDown={handleKeyDown}
    >
      <div className="relative h-[560px] w-full sm:h-[620px] lg:h-[680px]">
        {slides.map((slide, i) => (
          <div
            key={slide.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              i === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <div className="absolute inset-0">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.alt}
                fill
                priority={i === 0}
                className={cn(
                  "object-cover transition-transform duration-[7000ms] ease-out motion-reduce:transition-none",
                  i === index ? "scale-105" : "scale-100",
                )}
                sizes="100vw"
              />
              {/* Independent overlay layer for text contrast, not parent opacity */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#1a1207]/85 via-[#1a1207]/35 to-[#1a1207]/5"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 flex h-full max-w-6xl flex-col justify-end px-4 pb-14 sm:mx-auto sm:px-6 sm:pb-16 lg:px-8 lg:pb-20">
              <p className="max-w-md text-xs font-semibold uppercase tracking-[0.14em] text-[#f5ead4] sm:text-sm">
                {slide.eyebrow}
              </p>
              <h1 className="mt-3 max-w-xl text-balance font-serif text-3xl font-semibold leading-tight text-[#fff8ea] sm:text-4xl lg:text-5xl">
                {slide.heading}
              </h1>
              <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-[#f0e6d3] sm:text-base">
                {slide.body}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={slide.ctaPrimary.href}>{slide.ctaPrimary.label}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-[#f5ead4]/50 bg-transparent text-[#fff8ea] hover:bg-[#fff8ea]/10 hover:text-[#fff8ea]"
                >
                  <Link href={slide.ctaSecondary.href}>{slide.ctaSecondary.label}</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-4 sm:bottom-6">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-[#f5ead4]/40 bg-[#1a1207]/40 text-[#fff8ea] hover:bg-[#1a1207]/60 hover:text-[#fff8ea]"
          onClick={goPrev}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Slides">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              role="tab"
              aria-selected={i === index}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all",
                i === index ? "w-6 bg-[#fff8ea]" : "w-2 bg-[#fff8ea]/40 hover:bg-[#fff8ea]/70",
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-[#f5ead4]/40 bg-[#1a1207]/40 text-[#fff8ea] hover:bg-[#1a1207]/60 hover:text-[#fff8ea]"
          onClick={goNext}
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 border-[#f5ead4]/40 bg-[#1a1207]/40 text-[#fff8ea] hover:bg-[#1a1207]/60 hover:text-[#fff8ea]"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause carousel" : "Play carousel"}
          aria-pressed={playing}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
      </div>
    </section>
  )
}
