import SectionHeading from '../components/SectionHeading'
import InformationCard from '../components/InformationCard'
import { lifestyleTopics } from '../data/lifestyleTips'

const icons = {
  sleep: '🌙',
  movement: '🚶',
  connection: '🤝',
  nutrition: '🍎',
  journaling: '📝',
  boundaries: '🧭',
  'self-compassion': '💛',
  'facing-fears': '🌤️',
}

export default function Lifestyle() {
  return (
    <section id="lifestyle" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading
        eyebrow="What Can I Do?"
        title="Small, steady steps toward feeling better"
        description="You don't have to figure everything out at once. These are general wellness habits that many people find helpful — not a treatment plan, and not a replacement for professional guidance where that's needed."
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {lifestyleTopics.map((topic) => (
          <InformationCard key={topic.id} title={topic.title} icon={icons[topic.id]}>
            <p className="mb-3">{topic.summary}</p>
            <ul className="space-y-1.5">
              {topic.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm">
                  <span className="text-sage-dark shrink-0" aria-hidden="true">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </InformationCard>
        ))}
      </div>
    </section>
  )
}
