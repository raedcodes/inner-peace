import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const sessions = {
  en: [
    { id: 'relaxation', title: 'Relaxation', file: '/audio/relaxation.mp3' },
    { id: 'sleep-relaxation', title: 'Sleep Relaxation', file: '/audio/sleep-relaxation.mp3' },
    { id: 'calm-background', title: 'Calm Background Sounds', file: '/audio/calm-background.mp3' },
  ],
  ar: [
    { id: 'relaxation', title: 'استرخاء', file: '/audio/relaxation.mp3' },
    { id: 'sleep-relaxation', title: 'استرخاء للنوم', file: '/audio/sleep-relaxation.mp3' },
    { id: 'calm-background', title: 'أصوات خلفية هادئة', file: '/audio/calm-background.mp3' },
  ],
}

const copy = {
  en: {
    missing: 'Audio coming soon — add a royalty-free file at',
  },
  ar: {
    missing: 'الصوت قادم قريبًا — أضِف ملفًا خاليًا من حقوق الملكية في',
  },
}

export default function CalmAudioPlayer() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const list = sessions[lang]
  const [missing, setMissing] = useState({})

  return (
    <div className="space-y-4">
      {list.map((session) => (
        <div key={session.id} className="rounded-xl bg-white/60 border border-ink/5 px-4 py-3.5">
          <p className="text-sm font-medium text-ink mb-2">{session.title}</p>
          {missing[session.id] ? (
            <p className="text-xs text-ink-soft/70 italic">
              {t.missing}{' '}
              <code className="bg-ink/5 px-1 py-0.5 rounded" dir="ltr">
                public{session.file}
              </code>
              .
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
    </div>
  )
}
