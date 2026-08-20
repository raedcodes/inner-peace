import { useEffect, useRef, useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import SituationCard from '../components/SituationCard'
import RecommendationPanel from '../components/RecommendationPanel'
import { situations } from '../data/situations'
import { useSituationSupport } from '../hooks/useSituationSupport'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useLanguage } from '../i18n/LanguageContext'

const PATTERN_WINDOW_DAYS = 7
const PATTERN_THRESHOLD = 3

const copy = {
  en: {
    eyebrow: 'Right Now',
    title: 'What are you dealing with right now?',
    description: 'Pick whatever feels closest — you\'ll get a few gentle, practical suggestions and links to relevant parts of this site.',
    somethingElse: 'Something else',
    describePlaceholder: 'Briefly describe what\'s going on...',
    describeSend: 'Get suggestions',
    describeSending: 'Thinking...',
    clearHistory: 'Clear my check-in history',
    privacyNote: 'Check-ins are remembered only in this browser, so we can gently notice patterns for you — never sent anywhere.',
  },
  ar: {
    eyebrow: 'الآن',
    title: 'بماذا تمر الآن؟',
    description: 'اختر الأقرب لحالتك — وستحصل على بعض الاقتراحات اللطيفة والعملية، وروابط لأجزاء ذات صلة من هذا الموقع.',
    somethingElse: 'شيء آخر',
    describePlaceholder: 'صف بإيجاز ما يجول في خاطرك...',
    describeSend: 'احصل على اقتراحات',
    describeSending: 'جارٍ التفكير...',
    clearHistory: 'مسح سجل تسجيلاتي',
    privacyNote: 'تُحفظ تسجيلاتك في هذا المتصفح فقط، لنتمكن من ملاحظة الأنماط برفق — لا تُرسل إلى أي مكان.',
  },
}

function countRecent(history, situationId) {
  const cutoff = Date.now() - PATTERN_WINDOW_DAYS * 24 * 60 * 60 * 1000
  return history.filter((entry) => entry.situationId === situationId && entry.timestamp >= cutoff).length
}

export default function SituationPicker() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const list = situations[lang]
  const [selectedId, setSelectedId] = useState(null)
  const [customText, setCustomText] = useState('')
  const { status, data, error, run, retry, reset } = useSituationSupport()
  const [history, setHistory] = useLocalStorage('inner-peace:checkin-history', [])
  const panelRef = useRef(null)
  const loggedDataRef = useRef(null)

  useEffect(() => {
    if (status !== 'idle') {
      panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [status])

  const selectedSituation = list.find((s) => s.id === selectedId)
  const isCustom = selectedId === 'something-else'

  const resolvedId = isCustom ? data?.matchedSituationId : selectedId

  useEffect(() => {
    if (status === 'success' && data && resolvedId && loggedDataRef.current !== data) {
      loggedDataRef.current = data
      setHistory((prev) => [...prev, { situationId: resolvedId, timestamp: Date.now() }].slice(-200))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, data])

  const patternCount = status === 'success' && resolvedId ? countRecent(history, resolvedId) : 0

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

  const pickAnother = () => {
    setSelectedId(null)
    setCustomText('')
    reset()
  }

  const clearHistory = () => setHistory([])

  const resolvedResources =
    status === 'success' && data
      ? isCustom
        ? list.find((s) => s.id === data.matchedSituationId)?.resources
        : selectedSituation?.resources
      : null

  const resolvedTitle = status === 'success' ? list.find((s) => s.id === resolvedId)?.title : null

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
        <div className="max-w-xl mx-auto -mt-1 mb-8 rounded-2xl bg-white/70 border border-sage/30 shadow-soft p-4">
          <form onSubmit={submitCustom} className="flex flex-col sm:flex-row gap-3">
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              rows={2}
              placeholder={t.describePlaceholder}
              autoFocus
              className="flex-1 rounded-xl border border-ink/10 bg-white/80 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-sage focus:outline-none resize-none"
            />
            <button
              type="submit"
              disabled={!customText.trim() || status === 'loading'}
              className="rounded-full bg-sage text-white px-5 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-sage-dark transition-colors whitespace-nowrap"
            >
              {status === 'loading' ? t.describeSending : t.describeSend}
            </button>
          </form>
        </div>
      )}

      {status !== 'idle' && (
        <div ref={panelRef} className="max-w-xl mx-auto scroll-mt-24">
          <RecommendationPanel
            lang={lang}
            status={status}
            data={data}
            error={error}
            resources={resolvedResources}
            onRetry={retry}
            onPickAnother={pickAnother}
            patternCount={patternCount >= PATTERN_THRESHOLD ? patternCount : 0}
            patternTitle={resolvedTitle}
          />
        </div>
      )}

      <p className="text-xs text-ink-soft/60 text-center mt-8 max-w-md mx-auto">
        {t.privacyNote}{' '}
        {history.length > 0 && (
          <button type="button" onClick={clearHistory} className="underline hover:text-ink-soft">
            {t.clearHistory}
          </button>
        )}
      </p>
    </section>
  )
}
