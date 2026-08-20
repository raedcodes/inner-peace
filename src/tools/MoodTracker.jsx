import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { moodOptions } from '../data/help'

export default function MoodTracker() {
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
    if (window.confirm('Delete all saved mood entries from this browser?')) {
      setEntries([])
    }
  }

  return (
    <div>
      <fieldset>
        <legend className="text-sm text-ink-soft mb-3">How are you feeling right now?</legend>
        <div className="flex flex-wrap gap-2">
          {moodOptions.map((option) => (
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
        Optional note
      </label>
      <textarea
        id="mood-note"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={2}
        placeholder="What's going on today? (optional)"
        className="w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 focus:border-sage focus:outline-none"
      />

      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          onClick={logMood}
          disabled={!selected}
          className="rounded-full bg-sage text-white px-5 py-2 text-sm font-medium disabled:opacity-40 hover:bg-sage-dark transition-colors"
        >
          Save entry
        </button>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="text-xs text-ink-soft/70 hover:text-ink-soft underline"
          >
            Delete history
          </button>
        )}
      </div>

      <p className="text-xs text-ink-soft/70 mt-4">
        Saved only in this browser (localStorage) — nothing is sent to a server.
      </p>

      {entries.length > 0 && (
        <ul className="mt-5 space-y-2 max-h-56 overflow-y-auto pr-1">
          {entries.map((entry) => {
            const option = moodOptions.find((m) => m.key === entry.mood)
            return (
              <li
                key={entry.timestamp}
                className="flex items-start gap-3 rounded-xl bg-white/60 border border-ink/5 px-3.5 py-2.5"
              >
                <span className="text-lg" aria-hidden="true">{option?.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs text-ink-soft/70">
                    {new Date(entry.timestamp).toLocaleString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </p>
                  {entry.note && <p className="text-sm text-ink mt-0.5 break-words">{entry.note}</p>}
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
