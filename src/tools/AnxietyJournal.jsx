import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { journalPrompts } from '../data/help'

const emptyDraft = journalPrompts.reduce((acc, prompt) => ({ ...acc, [prompt.key]: '' }), {})

export default function AnxietyJournal() {
  const [draft, setDraft] = useState(emptyDraft)
  const [entries, setEntries] = useLocalStorage('inner-peace:journal-entries', [])
  const [showEntries, setShowEntries] = useState(false)

  const hasContent = Object.values(draft).some((value) => value.trim().length > 0)

  const saveEntry = () => {
    if (!hasContent) return
    setEntries([{ ...draft, timestamp: new Date().toISOString() }, ...entries])
    setDraft(emptyDraft)
  }

  const deleteAll = () => {
    if (window.confirm('Delete all journal entries stored in this browser? This cannot be undone.')) {
      setEntries([])
    }
  }

  return (
    <div>
      <div className="space-y-4">
        {journalPrompts.map((prompt) => (
          <div key={prompt.key}>
            <label htmlFor={`journal-${prompt.key}`} className="block text-sm text-ink-soft mb-1.5">
              {prompt.label}
            </label>
            <textarea
              id={`journal-${prompt.key}`}
              rows={2}
              value={draft[prompt.key]}
              onChange={(e) => setDraft((d) => ({ ...d, [prompt.key]: e.target.value }))}
              className="w-full rounded-xl border border-ink/10 bg-white/70 px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/40 focus:border-sage focus:outline-none"
            />
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mt-5">
        <button
          type="button"
          onClick={saveEntry}
          disabled={!hasContent}
          className="rounded-full bg-sage text-white px-5 py-2 text-sm font-medium disabled:opacity-40 hover:bg-sage-dark transition-colors"
        >
          Save entry
        </button>
        <button
          type="button"
          onClick={() => setShowEntries((v) => !v)}
          className="text-sm text-dusk-dark hover:underline"
        >
          {showEntries ? 'Hide' : 'View'} saved entries ({entries.length})
        </button>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={deleteAll}
            className="text-xs text-ink-soft/70 hover:text-ink-soft underline ml-auto"
          >
            Delete journal data
          </button>
        )}
      </div>

      <p className="text-xs text-ink-soft/70 mt-4">
        Your entries are stored privately in this browser only (localStorage) — nothing is sent to a server.
      </p>

      {showEntries && entries.length > 0 && (
        <ul className="mt-5 space-y-3 max-h-72 overflow-y-auto pr-1">
          {entries.map((entry) => (
            <li key={entry.timestamp} className="rounded-xl bg-white/60 border border-ink/5 px-4 py-3">
              <p className="text-xs text-ink-soft/70 mb-2">
                {new Date(entry.timestamp).toLocaleString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </p>
              <dl className="space-y-1.5">
                {journalPrompts.map(
                  (prompt) =>
                    entry[prompt.key] && (
                      <div key={prompt.key}>
                        <dt className="text-xs font-medium text-ink-soft">{prompt.label}</dt>
                        <dd className="text-sm text-ink">{entry[prompt.key]}</dd>
                      </div>
                    )
                )}
              </dl>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
