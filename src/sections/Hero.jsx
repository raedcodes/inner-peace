export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 20%, rgba(122,155,118,0.16), transparent), radial-gradient(50% 40% at 85% 15%, rgba(123,147,168,0.16), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-20 md:pb-28 text-center">
        <p className="inline-flex items-center gap-2 text-sm font-medium text-sage-dark bg-sage-light rounded-full px-4 py-1.5 mb-8">
          <span aria-hidden="true">🌿</span>
          A calm, educational space — not a clinic
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-ink leading-[1.1] text-balance max-w-3xl mx-auto mb-6">
          A calmer mind starts with understanding.
        </h1>

        <p className="text-lg text-ink-soft max-w-xl mx-auto leading-relaxed text-balance mb-10">
          Inner Peace offers practical tools, clear information, and gentle guidance for people navigating
          anxiety, stress, and difficult moments — at your own pace, in your own time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#understanding"
            className="w-full sm:w-auto rounded-full bg-ink text-cream px-7 py-3 text-sm font-medium hover:bg-ink/90 transition-colors shadow-soft"
          >
            Explore Inner Peace
          </a>
          <a
            href="#tools"
            className="w-full sm:w-auto rounded-full bg-white/80 border border-ink/10 text-ink px-7 py-3 text-sm font-medium hover:bg-white transition-colors"
          >
            Start Feeling Better
          </a>
        </div>

        <p className="text-xs text-ink-soft/70 mt-8 max-w-md mx-auto">
          Educational and wellness information only — not a substitute for professional care.
        </p>
      </div>
    </section>
  )
}
