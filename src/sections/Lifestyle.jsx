import SectionHeading from '../components/SectionHeading'
import LifestyleCard from '../components/LifestyleCard'
import { lifestyleTopics } from '../data/lifestyleTips'
import { useLanguage } from '../i18n/LanguageContext'

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

const copy = {
  en: {
    eyebrow: 'What Can I Do?',
    title: 'Small, steady steps toward feeling better',
    description:
      "You don't have to figure everything out at once. These are general wellness habits that many people find helpful — not a treatment plan, and not a replacement for professional guidance where that's needed.",
  },
  ar: {
    eyebrow: 'ماذا يمكنني أن أفعل؟',
    title: 'خطوات صغيرة وثابتة نحو الشعور بتحسن',
    description:
      'لست مضطرًا لحل كل شيء دفعة واحدة. هذه عادات صحية عامة يجدها كثيرون مفيدة — وليست خطة علاجية، ولا بديلاً عن التوجيه المتخصص حين يكون ضروريًا.',
  },
}

export default function Lifestyle() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const topics = lifestyleTopics[lang]

  return (
    <section id="lifestyle" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {topics.map((topic) => (
          <LifestyleCard
            key={topic.id}
            id={`lifestyle-${topic.id}`}
            title={topic.title}
            icon={icons[topic.id]}
            summary={topic.summary}
            points={topic.points}
          />
        ))}
      </div>
    </section>
  )
}
