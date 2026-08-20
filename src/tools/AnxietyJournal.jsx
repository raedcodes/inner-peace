import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { journalSteps, journalEmotions, journalPrompts } from '../data/help'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    feelingLabel: 'What are you feeling?',
    stepOf: (n, total) => `Step ${n} of ${total}`,
    back: 'Back',
    next: 'Next',
    save: 'Save entry',
    hide: 'Hide',
    view: 'View',
    savedEntries: (count) => `saved entries (${count})`,
    deleteData: 'Delete journal data',
    confirmDelete: 'Delete all journal entries stored in this browser? This cannot be undone.',
    privacy: 'Your entries are stored privately in this browser only — nothing is ever sent anywhere.',
    locale: 'en-US',
    emotionsTitle: 'Feeling',
  },
  ar: {
    feelingLabel: 'ما الذي تشعر به؟',
    stepOf: (n, total) => `الخطوة ${n} من ${total}`,
    back: 'رجوع',
    next: 'التالي',
    save: 'حفظ',
    hide: 'إخفاء',
    view: 'عرض',
    savedEntries: (count) => `المدخلات المحفوظة (${count})`,
    deleteData: 'حذف بيانات اليوميات',
    confirmDelete: 'هل تريد حذف جميع مدخلات اليوميات المحفوظة في هذا المتصفح؟ لا يمكن التراجع عن هذا الإجراء.',
    privacy: 'تُحفظ مدخلاتك بخصوصية في هذا المتصفح فقط — لا يُرسل شيء إلى أي مكان أبدًا.',
    locale: 'ar',
    emotionsTitle: 'الشعور',
  },
}

const emptyAnswers = { trigger: '', reframe: '', action: '' }

export default function AnxietyJournal() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const steps = journalSteps[lang]
  const emotionOptions = journalEmotions[lang]
  const legacyPrompts = journalPrompts[lang]

  const [entries, setEntries] = useLocalStorage('inner-peace:journal-entries', [])
  const [showEntries, setShowEntries] = useState(false)
  const [step, setStep] = useState(0)
  const [emotions, setEmotions] = useState([])
  const [answers, setAnswers] = useState(emptyAnswers)

  const isLastStep = step === steps.length - 1
  const currentStep = steps[step]

  const toggleEmotion = (key) => {
    setEmotions((prev) => (prev.includes(key) ? prev.filter((e) => e !== key) : [...prev, key]))
  }

  const hasContent = emotions.length > 0 || Object.values(answers).some((v) => v.trim().length > 0)

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1))
  const goBack = () => setStep((s) => Math.max(s - 1, 0))

  const saveEntry = () => {
    if (!hasContent) return
    setEntries([{ emotions, ...answers, timestamp: new Date().toISOString() }, ...entries])
    setEmotions([])
    setAnswers(emptyAnswers)
    setStep(0)
  }

  const deleteAll = () => {
    if (window.confirm(t.confirmDelete)) {
      setEntries([])
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <p className="text-xs font-medium text-ink-soft shrink-0">{t.stepOf(step + 1, steps.length)}</p>
        <div className="flex-1 h-1.5 rounded-full bg-ink/10 overflow-hidden">
          <div
            className="h-full bg-sage-dark rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {step === 0 && (
        <div className="mb-4">
          <p className="text-sm text-ink-soft mb-2">{t.feelingLabel}</p>
          <div className="flex flex-wrap gap-2">
            {emotionOptions.map((emotion) => (
              <button
                key={emotion.key}
                type="button"
                onClick={() => toggleEmotion(emotion.key)}
                aria-pressed={emotions.includes(emotion.key)}
                className={`rounded-full px-3.5 py-1.5 text-sm border transition-colors ${
                  emotions.includes(emotion.key)
                    ? 'bg-sage-light border-sage text-sage-dark'
                    : 'bg-white/60 border-ink/10 text-ink-soft hover:bg-white'
                }`}
              >
                {emotion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor={`journal-${currentStep.key}`} className="block text-sm text-ink mb-1.5 font-medium">
          {currentStep.title}
        </label>
        <textarea
          id={`journal-${currentStep.key}`}
          rows={4}
          value={answers[currentStep.key]}
          onChange={(e) => setAnswers((a) => ({ ...a, [currentStep.key]: e.target.value }))}
          placeholder={currentStep.placeholder}
          autoFocus
          className="w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-sage focus:outline-none resize-none"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        {step > 0 && (
          <button
            type="button"
            onClick={goBack}
            className="rounded-full bg-ink/5 text-ink-soft px-5 py-2 text-sm font-medium hover:bg-ink/10 transition-colors"
          >
            {t.back}
          </button>
        )}

        {isLastStep ? (
          <button
            type="button"
            onClick={saveEntry}
            disabled={!hasContent}
            className="rounded-full bg-sage text-white px-5 py-2 text-sm font-medium disabled:opacity-40 hover:bg-sage-dark transition-colors"
          >
            {t.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            className="rounded-full bg-sage text-white px-5 py-2 text-sm font-medium hover:bg-sage-dark transition-colors"
          >
            {t.next}
          </button>
        )}

        <button
          type="button"
          onClick={() => setShowEntries((v) => !v)}
          className="text-sm text-dusk-dark hover:underline"
        >
          {showEntries ? t.hide : t.view} {t.savedEntries(entries.length)}
        </button>

        {entries.length > 0 && (
          <button
            type="button"
            onClick={deleteAll}
            className="text-xs text-ink-soft/70 hover:text-ink-soft underline ms-auto"
          >
            {t.deleteData}
          </button>
        )}
      </div>

      <p className="text-xs text-ink-soft/70 mt-4">{t.privacy}</p>

      {showEntries && entries.length > 0 && (
        <ul className="mt-5 space-y-3 max-h-72 overflow-y-auto pe-1">
          {entries.map((entry) => {
            const isNewShape = entry.trigger !== undefined
            return (
              <li key={entry.timestamp} className="rounded-xl bg-white/60 border border-ink/5 px-4 py-3">
                <p className="text-xs text-ink-soft/70 mb-2">
                  {new Date(entry.timestamp).toLocaleString(t.locale, {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
                {isNewShape ? (
                  <dl className="space-y-1.5">
                    {entry.emotions?.length > 0 && (
                      <div>
                        <dt className="text-xs font-medium text-ink-soft">{t.emotionsTitle}</dt>
                        <dd className="text-sm text-ink">
                          {entry.emotions
                            .map((key) => emotionOptions.find((e) => e.key === key)?.label || key)
                            .join(', ')}
                        </dd>
                      </div>
                    )}
                    {steps.map(
                      (s) =>
                        entry[s.key] && (
                          <div key={s.key}>
                            <dt className="text-xs font-medium text-ink-soft">{s.title}</dt>
                            <dd className="text-sm text-ink">{entry[s.key]}</dd>
                          </div>
                        )
                    )}
                  </dl>
                ) : (
                  <dl className="space-y-1.5">
                    {legacyPrompts.map(
                      (prompt) =>
                        entry[prompt.key] && (
                          <div key={prompt.key}>
                            <dt className="text-xs font-medium text-ink-soft">{prompt.label}</dt>
                            <dd className="text-sm text-ink">{entry[prompt.key]}</dd>
                          </div>
                        )
                    )}
                  </dl>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
