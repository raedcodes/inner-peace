import SectionHeading from '../components/SectionHeading'
import InformationCard from '../components/InformationCard'

const cycle = [
  {
    label: 'Mind',
    icon: '💭',
    text: 'A thought or perceived threat arises — sometimes clear, sometimes vague ("something feels wrong").',
  },
  {
    label: 'Body',
    icon: '⚡',
    text: 'The nervous system triggers a fight-or-flight response: heart rate rises, muscles tense, breathing shifts.',
  },
  {
    label: 'Behavior',
    icon: '🚶',
    text: 'We act on that alarm — avoiding, checking, seeking reassurance — which can reinforce the cycle over time.',
  },
]

export default function UnderstandingAnxiety() {
  return (
    <section id="understanding" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading
        eyebrow="Understanding Anxiety"
        title="What is actually happening when anxiety takes over?"
        description="Anxiety is the body's built-in alarm system. Generalized Anxiety Disorder (GAD) involves persistent, hard-to-control worry across many areas of life, along with physical and mental symptoms that last most days for six months or more. Understanding why this happens can sometimes make it feel less frightening."
      />

      <div className="grid md:grid-cols-3 gap-5 mb-14">
        <InformationCard title="Why the body reacts" icon="🛡️">
          The brain’s alarm center (the amygdala) is built to detect danger quickly — sometimes faster than we can
          consciously think. It cannot always tell the difference between a real, immediate threat and a worrying
          thought, so it can trigger the same fight-or-flight response either way.
        </InformationCard>
        <InformationCard title="A hyper-alert brain" icon="👁️">
          With ongoing stress, the brain can stay on heightened alert, scanning for potential problems. This can
          make normal sensations feel more noticeable or concerning than they otherwise would.
        </InformationCard>
        <InformationCard title="Symptoms can feel very real" icon="❤️">
          The physical sensations that come with anxiety — a racing heart, tight chest, dizziness — are genuinely
          real bodily responses, even when anxiety is the cause. Feeling something and diagnosing something are
          different things.
        </InformationCard>
      </div>

      <div className="rounded-3xl bg-white/60 border border-ink/5 shadow-soft p-6 md:p-10">
        <h3 className="text-xl font-medium text-ink font-serif text-center mb-2">Mind → Body → Behavior</h3>
        <p className="text-ink-soft text-sm text-center max-w-lg mx-auto mb-10">
          Thoughts, physical sensations, and actions are closely connected — each one can influence the next,
          sometimes forming a loop.
        </p>

        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
          {cycle.map((step, index) => (
            <div key={step.label} className="flex items-center gap-3 md:gap-3 flex-1">
              <div className="flex-1 rounded-2xl bg-cream border border-ink/5 p-5 text-center h-full">
                <div className="text-2xl mb-2" aria-hidden="true">{step.icon}</div>
                <p className="font-medium text-ink mb-1">{step.label}</p>
                <p className="text-sm text-ink-soft leading-relaxed">{step.text}</p>
              </div>
              {index < cycle.length - 1 && (
                <span className="hidden md:block text-ink-soft/40 text-2xl shrink-0" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
