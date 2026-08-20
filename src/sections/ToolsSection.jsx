import SectionHeading from '../components/SectionHeading'
import ToolCard from '../components/ToolCard'
import BreathingExercise from '../tools/BreathingExercise'
import RelaxationTimer from '../tools/RelaxationTimer'
import CalmAudioPlayer from '../tools/CalmAudioPlayer'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Mental Wellness Tools',
    title: 'A few gentle tools, whenever you need them',
    description: 'Simple tools you can use in the moment, right in your browser.',
    cards: [
      { title: 'Breathing Exercise', description: 'A slow, guided breathing rhythm to help you find a moment of steadiness.', icon: '🫧' },
      { title: 'Relaxation Timer', description: 'A quiet, distraction-free space to rest and let your body settle.', icon: '⏳' },
      { title: 'Calm Audio', description: 'Short relaxation and sleep sessions, plus calming background sounds.', icon: '🎧' },
    ],
  },
  ar: {
    eyebrow: 'أدوات العافية النفسية',
    title: 'بضع أدوات لطيفة، كلما احتجتها',
    description: 'أدوات بسيطة يمكنك استخدامها في اللحظة، مباشرة من متصفحك.',
    cards: [
      { title: 'تمرين التنفس', description: 'إيقاع تنفس بطيء وموجَّه يساعدك على إيجاد لحظة من الثبات.', icon: '🫧' },
      { title: 'مؤقّت الاسترخاء', description: 'مساحة هادئة وخالية من التشتيت للراحة وترك جسدك يهدأ.', icon: '⏳' },
      { title: 'أصوات هادئة', description: 'جلسات استرخاء ونوم قصيرة، بالإضافة إلى أصوات خلفية مهدئة.', icon: '🎧' },
    ],
  },
}

export default function ToolsSection() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <section id="tools" className="bg-sage-light/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        <div className="grid lg:grid-cols-2 gap-6">
          <ToolCard title={t.cards[0].title} description={t.cards[0].description} icon={t.cards[0].icon}>
            <BreathingExercise />
          </ToolCard>

          <ToolCard title={t.cards[1].title} description={t.cards[1].description} icon={t.cards[1].icon}>
            <RelaxationTimer />
          </ToolCard>

          <ToolCard title={t.cards[2].title} description={t.cards[2].description} icon={t.cards[2].icon}>
            <CalmAudioPlayer />
          </ToolCard>
        </div>
      </div>
    </section>
  )
}
