import { useState } from 'react'

const sessions = [
  { id: 'relaxation', title: 'Relaxation', file: '/audio/relaxation.mp3' },  
  // { id: '5-min-breathing', title: '5-Minute Breathing', file: '/audio/5-min-breathing.mp3' },
  { id: 'sleep-relaxation', title: 'Sleep Relaxation', file: '/audio/sleep-relaxation.mp3' },
  { id: 'calm-background', title: 'Calm Background Sounds', file: '/audio/calm-background.mp3' },
]

export default function CalmAudioPlayer() {
  const [missing, setMissing] = useState({})

  return (
    <div className="space-y-4">
      {sessions.map((session) => (
        <div key={session.id} className="rounded-xl bg-white/60 border border-ink/5 px-4 py-3.5">
          <p className="text-sm font-medium text-ink mb-2">{session.title}</p>
          {missing[session.id] ? (
            <p className="text-xs text-ink-soft/70 italic">
              Audio coming soon — add a royalty-free file at{' '}
              <code className="bg-ink/5 px-1 py-0.5 rounded">public{session.file}</code>.
            </p>
          ) : (
            <audio
              controls
              preload="none"
              className="w-full h-10"
              onError={() => setMissing((m) => ({ ...m, [session.id]: true }))}
            >
              <source src={session.file} type="audio/mpeg" />
            </audio>
          )}
        </div>
      ))}
      <p className="text-xs text-ink-soft/70">
        Only royalty-free or public-domain audio should be used here — never copyrighted music without permission.
      </p>
    </div>
  )
}
