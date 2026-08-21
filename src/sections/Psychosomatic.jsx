import SectionHeading from '../components/SectionHeading'
import InformationCard from '../components/InformationCard'
import Panel from '../components/Panel'
import { cyberchondriaNote, psychosomaticCards, psychosomaticReassurance } from '../data/psychosomatic'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'The Mind-Body Connection',
    title: 'When every test comes back normal, but the symptoms are real',
    description:
      "It's a common, frustrating experience: physical symptoms that are genuinely distressing, yet blood work, scans, or exams find nothing wrong. This is sometimes described as psychosomatic — and understanding what that actually means can bring some relief on its own.",
  },
  ar: {
    eyebrow: 'رابط الجسد والعقل',
    title: 'حين تكون كل الفحوصات طبيعية، لكن الأعراض حقيقية',
    description:
      'إنها تجربة شائعة ومحبطة: أعراض جسدية مزعجة فعلًا، لكن التحاليل أو الأشعة أو الفحوصات لا تجد شيئًا خاطئًا. يُوصف هذا أحيانًا بأنه نفسي جسدي — وفهم معنى ذلك فعليًا قد يمنح بعض الراحة بحد ذاته.',
  },
}

export default function Psychosomatic() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const cards = psychosomaticCards[lang]
  const note = cyberchondriaNote[lang]

  return (
    <section id="psychosomatic" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="grid sm:grid-cols-2 gap-5 mb-5">
        {cards.map((card) => (
          <InformationCard key={card.title} title={card.title} icon={card.icon}>
            {card.text}
          </InformationCard>
        ))}
      </div>

      <Panel className="flex items-start gap-3 px-5 py-4 mb-8">
        <span className="text-xl shrink-0" aria-hidden="true">{note.icon}</span>
        <div>
          <p className="text-sm font-medium text-ink mb-1">{note.title}</p>
          <p className="text-sm text-ink-soft leading-relaxed">{note.body}</p>
        </div>
      </Panel>

      <Panel as="p" className="text-sm text-ink-soft leading-relaxed max-w-2xl px-5 py-4">
        {psychosomaticReassurance[lang]}
      </Panel>
    </section>
  )
}
