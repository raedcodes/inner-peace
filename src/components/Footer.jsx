import Disclaimer from './Disclaimer'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-ink text-cream/80 mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="flex items-center gap-2 text-cream font-serif text-lg mb-3">
              <span aria-hidden="true">🌿</span>
              Inner Peace
            </p>
            <p className="text-sm leading-relaxed text-cream/70">
              A calm corner of the internet for understanding anxiety, building healthier habits, and knowing
              when to reach out for support.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream mb-3">Explore</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#understanding" className="hover:text-cream">Understanding Anxiety</a></li>
              <li><a href="#symptoms" className="hover:text-cream">Symptoms</a></li>
              <li><a href="#lifestyle" className="hover:text-cream">What Can I Do?</a></li>
              <li><a href="#therapy" className="hover:text-cream">Therapy &amp; Professional Help</a></li>
              <li><a href="#tools" className="hover:text-cream">Wellness Tools</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-cream mb-3">Support</p>
            <ul className="space-y-2 text-sm text-cream/70">
              <li><a href="#medication" className="hover:text-cream">About medication</a></li>
              <li><a href="#spirituality" className="hover:text-cream">Spiritual comfort</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6">
          <Disclaimer variant="inline" className="text-cream/60" />
          <p className="text-xs text-cream/50 mt-4">© {year} Inner Peace. Educational content only.</p>
        </div>
      </div>
    </footer>
  )
}
