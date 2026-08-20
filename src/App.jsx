import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Disclaimer from './components/Disclaimer'
import Hero from './sections/Hero'
import SituationPicker from './sections/SituationPicker'
import UnderstandingAnxiety from './sections/UnderstandingAnxiety'
import Symptoms from './sections/Symptoms'
import Psychosomatic from './sections/Psychosomatic'
import Lifestyle from './sections/Lifestyle'
import Therapy from './sections/Therapy'
import Medication from './sections/Medication'
import ToolsSection from './sections/ToolsSection'
import Quotes from './sections/Quotes'
import Spirituality from './sections/Spirituality'
import Contact from './sections/Contact'
import { useLanguage } from './i18n/LanguageContext'

const copy = {
  en: { skip: 'Skip to main content' },
  ar: { skip: 'انتقل إلى المحتوى الرئيسي' },
}

function App() {
  const { lang } = useLanguage()
  const t = copy[lang]

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#understanding"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-3 focus:start-3 focus:bg-ink focus:text-cream focus:px-4 focus:py-2 focus:rounded-full"
      >
        {t.skip}
      </a>

      <Navbar />

      <main className="flex-1">
        <Hero />
        <SituationPicker />
        <UnderstandingAnxiety />
        <Symptoms />
        <Psychosomatic />
        <Lifestyle />
        <Therapy />
        <Medication />
        <ToolsSection />
        <Quotes />
        <Spirituality />
        <Contact />

        <div className="max-w-6xl mx-auto px-5 md:px-8 pb-16">
          <Disclaimer />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
