import SectionHeading from '../components/SectionHeading'
import ToolCard from '../components/ToolCard'
import BreathingExercise from '../tools/BreathingExercise'
import RelaxationTimer from '../tools/RelaxationTimer'
import MoodTracker from '../tools/MoodTracker'
import CalmAudioPlayer from '../tools/CalmAudioPlayer'
import FidgetPad from '../tools/FidgetPad'
import ThoughtDissolver from '../tools/ThoughtDissolver'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Mental Wellness Tools',
    title: 'A few gentle tools, whenever you need them',
    description: 'Simple, private tools you can use in the moment. Everything you enter stays in your browser — nothing is sent anywhere.',
    cards: [
      { title: 'Breathing Exercise', description: 'A slow, guided breathing rhythm to help you find a moment of steadiness.', icon: '🫧' },
      { title: 'Relaxation Timer', description: 'A quiet, distraction-free space to rest and let your body settle.', icon: '⏳' },
      { title: 'Mood Tracker', description: 'Notice patterns in how you feel over time.', icon: '📊' },
      { title: 'Calm Audio', description: 'Short relaxation and sleep sessions, plus calming background sounds.', icon: '🎧' },
      { title: 'Fidget Pad', description: 'A small, soothing distraction for restless hands or nervous energy.', icon: '🫧' },
      { title: 'Thought Dissolver', description: 'Write down a worry, then watch it gently dissolve away.', icon: '💭' },
    ],
  },
  ar: {
    eyebrow: 'أدوات العافية النفسية',
    title: 'بضع أدوات لطيفة، كلما احتجتها',
    description: 'أدوات بسيطة وخاصة يمكنك استخدامها في اللحظة. كل ما تُدخله يبقى في متصفحك — لا يُرسل شيء إلى أي مكان.',
    cards: [
      { title: 'تمرين التنفس', description: 'إيقاع تنفس بطيء وموجَّه يساعدك على إيجاد لحظة من الثبات.', icon: '🫧' },
      { title: 'مؤقّت الاسترخاء', description: 'مساحة هادئة وخالية من التشتيت للراحة وترك جسدك يهدأ.', icon: '⏳' },
      { title: 'متتبع المزاج', description: 'لاحظ الأنماط في مشاعرك مع مرور الوقت.', icon: '📊' },
      { title: 'أصوات هادئة', description: 'جلسات استرخاء ونوم قصيرة، بالإضافة إلى أصوات خلفية مهدئة.', icon: '🎧' },
      { title: 'لوحة التسلية', description: 'إلهاء صغير ومهدئ لليدين المتوترة أو الطاقة العصبية.', icon: '🫧' },
      { title: 'مذيب الأفكار', description: 'اكتب قلقًا، ثم شاهده يذوب برفق.', icon: '💭' },
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
          <ToolCard id="tool-breathing" title={t.cards[0].title} description={t.cards[0].description} icon={t.cards[0].icon}>
            <BreathingExercise />
          </ToolCard>

          <ToolCard id="tool-relaxation-timer" title={t.cards[1].title} description={t.cards[1].description} icon={t.cards[1].icon}>
            <RelaxationTimer />
          </ToolCard>

          <ToolCard title={t.cards[2].title} description={t.cards[2].description} icon={t.cards[2].icon}>
            <MoodTracker />
          </ToolCard>

          <ToolCard id="tool-calm-audio" title={t.cards[3].title} description={t.cards[3].description} icon={t.cards[3].icon}>
            <CalmAudioPlayer />
          </ToolCard>

          <ToolCard title={t.cards[4].title} description={t.cards[4].description} icon={t.cards[4].icon}>
            <FidgetPad />
          </ToolCard>

          <ToolCard title={t.cards[5].title} description={t.cards[5].description} icon={t.cards[5].icon}>
            <ThoughtDissolver />
          </ToolCard>
        </div>
      </div>
    </section>
  )
}
