import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const faq = dict.home.faq

export function FaqSection() {
  return (
    <section className="bg-secondary/50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{faq.eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl">
            {faq.heading}
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {faq.items.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-serif text-base font-semibold text-foreground hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
