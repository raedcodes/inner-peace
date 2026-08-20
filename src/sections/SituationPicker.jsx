import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import SituationCard from '../components/SituationCard'
import RecommendationPanel from '../components/RecommendationPanel'
import { situations } from '../data/situations'
import { useSituationSupport } from '../hooks/useSituationSupport'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Right Now',
    title: 'What are you dealing with right now?',
    description: 'Pick whatever feels closest — you\'ll get a few gentle, practical suggestions and links to relevant parts of this site.',
    somethingElse: 'Something else',
    describePlaceholder: 'Briefly describe what\'s going on...',
    describeSend: 'Get suggestions',
    describeSending: 'Thinking...',
  },
  ar: {
    eyebrow: 'الآن',
    title: 'بماذا تمر الآن؟',
    description: 'اختر الأقرب لحالتك — وستحصل على بعض الاقتراحات اللطيفة والعملية، وروابط لأجزاء ذات صلة من هذا الموقع.',
    somethingElse: 'شيء آخر',
    describePlaceholder: 'صف بإيجاز ما يجول في خاطرك...',
    describeSend: 'احصل على اقتراحات',
    describeSending: 'جارٍ التفكير...',
  },
}

export default function SituationPicker() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const list = situations[lang]
  const [selectedId, setSelectedId] = useState(null)
  const [customText, setCustomText] = useState('')
  const { status, data, error, run, retry, reset } = useSituationSupport()

  const selectedSituation = list.find((s) => s.id === selectedId)
  const isCustom = selectedId === 'something-else'

  const selectCard = (id) => {
    setSelectedId(id)
    reset()
    if (id !== 'something-else') {
      run({ situationId: id, lang })
    }
  }

  const submitCustom = (event) => {
    event.preventDefault()
    if (!customText.trim()) return
    run({ customText: customText.trim(), lang })
  }

  const resolvedResources =
    status === 'success' && data
      ? isCustom
        ? list.find((s) => s.id === data.matchedSituationId)?.resources
        : selectedSituation?.resources
      : null

  return (
    <section id="right-now" className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24 scroll-mt-20">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
        {list.map((situation) => (
          <SituationCard
            key={situation.id}
            icon={situation.icon}
            title={situation.title}
            selected={selectedId === situation.id}
            onSelect={() => selectCard(situation.id)}
          />
        ))}
        <SituationCard
          icon="✍️"
          title={t.somethingElse}
          selected={isCustom}
          onSelect={() => selectCard('something-else')}
        />
      </div>

      {isCustom && (
        <form onSubmit={submitCustom} className="max-w-xl mx-auto mb-8 flex flex-col sm:flex-row gap-3">
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={2}
            placeholder={t.describePlaceholder}
            className="flex-1 rounded-xl border border-ink/10 bg-white/80 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-sage focus:outline-none"
          />
          <button
            type="submit"
            disabled={!customText.trim() || status === 'loading'}
            className="rounded-full bg-sage text-white px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-sage-dark transition-colors whitespace-nowrap"
          >
            {status === 'loading' ? t.describeSending : t.describeSend}
          </button>
        </form>
      )}

      {status !== 'idle' && (
        <div className="max-w-xl mx-auto">
          <RecommendationPanel
            lang={lang}
            status={status}
            data={data}
            error={error}
            resources={resolvedResources}
            onRetry={retry}
          />
        </div>
      )}
    </section>
  )
}
