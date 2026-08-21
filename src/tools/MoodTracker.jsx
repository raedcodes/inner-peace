import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { moodOptions } from '../data/help'
import { useLanguage } from '../i18n/LanguageContext'
import Button from '../components/Button'
import Panel from '../components/Panel'

const copy = {
  en: {
    prompt: 'How are you feeling right now?',
    noteLabel: 'Optional note',
    notePlaceholder: "What's going on today? (optional)",
    save: 'Save entry',
    deleteHistory: 'Delete history',
    confirmDelete: 'Delete all saved mood entries from this browser?',
    privacy: 'Saved only in this browser — nothing is ever sent anywhere.',
    locale: 'en-US',
  },
  ar: {
    prompt: 'كيف تشعر الآن؟',
    noteLabel: 'ملاحظة اختيارية',
    notePlaceholder: 'ما الذي يجول في خاطرك اليوم؟ (اختياري)',
    save: 'حفظ',
    deleteHistory: 'حذف السجل',
    confirmDelete: 'هل تريد حذف جميع مدخلات المزاج المحفوظة في هذا المتصفح؟',
    privacy: 'تُحفظ فقط في هذا المتصفح — لا يُرسل شيء إلى أي مكان أبدًا.',
    locale: 'ar',
  },
}

export default function MoodTracker() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const options = moodOptions[lang]
  const [entries, setEntries] = useLocalStorage('inner-peace:mood-entries', [])
  const [selected, setSelected] = useState(null)
  const [note, setNote] = useState('')

  const logMood = () => {
    if (!selected) return
    const entry = {
      mood: selected,
      note: note.trim(),
      timestamp: new Date().toISOString(),
    }
    setEntries([entry, ...entries].slice(0, 30))
    setSelected(null)
    setNote('')
  }

  const clearHistory = () => {
    if (window.confirm(t.confirmDelete)) {
      setEntries([])
    }
  }

  return (
    <div>
      <fieldset>
        <legend className="text-sm text-ink-soft mb-3">{t.prompt}</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => setSelected(option.key)}
              aria-pressed={selected === option.key}
              className={`flex flex-col items-center gap-1 rounded-xl px-3.5 py-2.5 border transition-colors ${
                selected === option.key
                  ? 'bg-sage-light border-sage text-sage-dark'
                  : 'bg-white/60 border-ink/10 text-ink-soft hover:bg-white'
              }`}
            >
              <span className="text-xl" aria-hidden="true">{option.emoji}</span>
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <label htmlFor="mood-note" className="block text-sm text-ink-soft mt-4 mb-2">
        {t.noteLabel}
      </label>
      <textarea
        id="mood-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder={t.notePlaceholder}
        className="w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-sage"
      />

      <div className="flex items-center justify-between mt-4">
        <Button onClick={logMood} disabled={!selected} className="px-5 py-2 text-sm">
          {t.save}
        </Button>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="text-xs text-ink-soft/70 hover:text-ink-soft underline"
          >
            {t.deleteHistory}
          </button>
        )}
      </div>

      <p className="text-xs text-ink-soft/70 mt-4">{t.privacy}</p>

      {entries.length > 0 && (
        <ul className="mt-5 space-y-2 max-h-56 overflow-y-auto pe-1">
          {entries.map((entry) => {
            const option = options.find((m) => m.key === entry.mood)
            return (
              <Panel as="li" key={entry.timestamp} radius="xl" className="flex items-start gap-3 px-3.5 py-2.5">
                <span className="text-lg" aria-hidden="true">{option?.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs text-ink-soft/70">
                    {new Date(entry.timestamp).toLocaleString(t.locale, {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                  {entry.note && <p className="text-sm text-ink mt-0.5 wrap-break-word">{entry.note}</p>}
                </div>
              </Panel>
            )
          })}
        </ul>
      )}
    </div>
  )
}
