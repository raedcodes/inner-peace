import SectionHeading from '../components/SectionHeading'
import { therapySignals, therapyApproaches } from '../data/help'

export default function Therapy() {
  return (
    <section id="therapy" className="bg-dusk-light/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="Therapy & Professional Help"
          title="When should I consider therapy?"
          description="There’s no single threshold — but some signs suggest it may be time to talk with a professional."
        />

        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          <div>
            <h3 className="text-lg font-medium text-ink font-serif mb-4">Consider reaching out if...</h3>
            <ul className="space-y-3">
              {therapySignals.map((signal) => (
                <li key={signal} className="flex gap-3 rounded-xl bg-white/70 border border-ink/5 px-4 py-3">
                  <span className="text-dusk-dark shrink-0" aria-hidden="true">✓</span>
                  <span className="text-sm text-ink-soft leading-relaxed">{signal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-ink font-serif mb-4">Evidence-based approaches</h3>
            <div className="space-y-4">
              {therapyApproaches.map((approach) => (
                <div key={approach.name} className="rounded-xl bg-white/70 border border-ink/5 px-5 py-4">
                  <p className="font-medium text-ink text-sm mb-1">{approach.name}</p>
                  <p className="text-sm text-ink-soft leading-relaxed">{approach.description}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-ink-soft/80 mt-4 leading-relaxed">
              A qualified mental-health professional can help determine which approach, if any, fits your
              situation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
