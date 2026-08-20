import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    title: 'A word on spirituality',
    text: "For some people, prayer, faith, or spiritual practice is a source of comfort, hope, and steadiness during difficult periods. If that resonates with you, it can be a meaningful part of how you care for yourself. Inner Peace does not promote any particular religion or belief system, and spiritual practice is not a substitute for professional support when that's needed — it can simply be one part of a fuller picture of care.",
  },
  ar: {
    title: 'كلمة عن الجانب الروحي',
    text: 'بالنسبة لبعض الأشخاص، تكون الصلاة أو الإيمان أو الممارسة الروحية مصدرًا للراحة والأمل والثبات خلال الأوقات الصعبة. إذا كان هذا يلامسك، فقد يكون جزءًا ذا معنى من طريقتك في الاعتناء بنفسك. لا يروّج "إنر بيس" لأي دين أو معتقد بعينه، والممارسة الروحية ليست بديلاً عن الدعم المتخصص عند الحاجة إليه — بل يمكن أن تكون جزءًا واحدًا من صورة أشمل للرعاية.',
  },
}

export default function Spirituality() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="spirituality" className="bg-dusk-light/30 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-20 text-center">
        <div className="text-3xl mb-4" aria-hidden="true">🕊️</div>
        <h2 className="text-2xl md:text-3xl font-medium text-ink font-serif mb-4">{t.title}</h2>
        <p className="text-ink-soft leading-relaxed">{t.text}</p>
      </div>
    </section>
  )
}
