import { getDictionary } from "@/lib/i18n/get-dictionary"

const dict = getDictionary()
const oem = dict.home.oem

export function OemSection() {
  return (
    <section className="bg-secondary/50 py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-primary">{oem.eyebrow}</p>
          <h2 className="mt-3 text-balance font-serif text-2xl font-semibold text-foreground sm:text-3xl lg:text-4xl">
            {oem.heading}
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{oem.body}</p>
        </div>

        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {oem.steps.map((step, i) => (
            <li key={step.title} className="rounded-lg border border-border bg-card p-5">
              <span className="font-serif text-2xl font-semibold text-primary">{i + 1}</span>
              <h3 className="mt-3 font-serif text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
