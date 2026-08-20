import SectionHeading from '../components/SectionHeading'
import InformationCard from '../components/InformationCard'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Understanding Anxiety',
    title: 'What is actually happening when anxiety takes over?',
    description:
      "Anxiety is the body's built-in alarm system. Generalized Anxiety Disorder (GAD) involves persistent, hard-to-control worry across many areas of life, along with physical and mental symptoms that last most days for six months or more. Understanding why this happens can sometimes make it feel less frightening.",
    cards: [
      {
        title: 'Why the body reacts',
        icon: '🛡️',
        text: "The brain's alarm center (the amygdala) is built to detect danger quickly — sometimes faster than we can consciously think. It cannot always tell the difference between a real, immediate threat and a worrying thought, so it can trigger the same fight-or-flight response either way.",
      },
      {
        title: 'A hyper-alert brain',
        icon: '👁️',
        text: 'With ongoing stress, the brain can stay on heightened alert, scanning for potential problems. This can make normal sensations feel more noticeable or concerning than they otherwise would.',
      },
      {
        title: 'Symptoms can feel very real',
        icon: '❤️',
        text: 'The physical sensations that come with anxiety — a racing heart, tight chest, dizziness — are genuinely real bodily responses, even when anxiety is the cause. Feeling something and diagnosing something are different things.',
      },
    ],
    diagramTitle: 'Mind → Body → Behavior',
    diagramSubtitle:
      'Thoughts, physical sensations, and actions are closely connected — each one can influence the next, sometimes forming a loop.',
    cycle: [
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
    ],
  },
  ar: {
    eyebrow: 'فهم القلق',
    title: 'ما الذي يحدث فعليًا حين يسيطر القلق؟',
    description:
      'القلق هو جهاز الإنذار المدمج في الجسد. اضطراب القلق العام يتضمن قلقًا مستمرًا يصعب التحكم به في نواحٍ كثيرة من الحياة، مع أعراض جسدية وذهنية تستمر معظم الأيام لستة أشهر أو أكثر. فهم سبب حدوث ذلك قد يجعله أقل إخافة أحيانًا.',
    cards: [
      {
        title: 'لماذا يتفاعل الجسد',
        icon: '🛡️',
        text: 'مركز الإنذار في الدماغ (اللوزة الدماغية) مُصمَّم لاكتشاف الخطر بسرعة — أحيانًا أسرع مما يمكننا إدراكه بوعي. وهو لا يستطيع دائمًا التمييز بين تهديد حقيقي ومباشر وفكرة مقلقة، فقد يُطلق استجابة الكر أو الفر نفسها في الحالتين.',
      },
      {
        title: 'دماغ في تأهب دائم',
        icon: '👁️',
        text: 'مع استمرار التوتر، قد يبقى الدماغ في حالة تأهب مرتفعة، يمسح المحيط بحثًا عن مشكلات محتملة. هذا قد يجعل الأحاسيس العادية تبدو أكثر وضوحًا أو إثارة للقلق مما هي عليه فعلًا.',
      },
      {
        title: 'الأعراض قد تبدو حقيقية جدًا',
        icon: '❤️',
        text: 'الأحاسيس الجسدية المرافقة للقلق — تسارع القلب، ضيق الصدر، الدوخة — هي استجابات جسدية حقيقية فعلًا، حتى عندما يكون القلق هو السبب. الشعور بشيء وتشخيصه أمران مختلفان.',
      },
    ],
    diagramTitle: 'العقل ← الجسد ← السلوك',
    diagramSubtitle:
      'الأفكار والأحاسيس الجسدية والتصرفات مترابطة بشكل وثيق — كل منها قد يؤثر في التالي، مُشكّلة أحيانًا حلقة مستمرة.',
    cycle: [
      {
        label: 'العقل',
        icon: '💭',
        text: 'تنشأ فكرة أو تهديد متصوَّر — أحيانًا واضح، وأحيانًا غامض ("هناك شيء ما ليس على ما يرام").',
      },
      {
        label: 'الجسد',
        icon: '⚡',
        text: 'يُطلق الجهاز العصبي استجابة الكر أو الفر: يتسارع القلب، تتوتر العضلات، ويتغير التنفس.',
      },
      {
        label: 'السلوك',
        icon: '🚶',
        text: 'نتصرف بناءً على ذلك الإنذار — بالتجنب، أو المراقبة، أو طلب الطمأنة — ما قد يعزز الحلقة مع الوقت.',
      },
    ],
  },
}

export default function UnderstandingAnxiety() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="understanding" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {t.cards.map((card) => (
          <InformationCard key={card.title} title={card.title} icon={card.icon}>
            {card.text}
          </InformationCard>
        ))}
      </div>

      <div className="rounded-3xl bg-white/60 border border-ink/5 shadow-soft p-6 md:p-10">
        <h3 className="text-xl font-medium text-ink font-serif text-center mb-2">{t.diagramTitle}</h3>
        <p className="text-ink-soft text-sm text-center max-w-lg mx-auto mb-10">{t.diagramSubtitle}</p>

        <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-3">
          {t.cycle.map((step, index) => (
            <div key={step.label} className="flex items-center gap-3 md:gap-3 flex-1">
              <div className="flex-1 rounded-2xl bg-cream border border-ink/5 p-5 text-center h-full">
                <div className="text-2xl mb-2" aria-hidden="true">{step.icon}</div>
                <p className="font-medium text-ink mb-1">{step.label}</p>
                <p className="text-sm text-ink-soft leading-relaxed">{step.text}</p>
              </div>
              {index < t.cycle.length - 1 && (
                <span className="hidden md:block text-ink-soft/40 text-2xl shrink-0 rtl:rotate-180" aria-hidden="true">
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
