import { useEffect, useRef, useState } from 'react'
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
  en: { missing: 'Audio coming soon — add a royalty-free file at' },
  ar: { missing: 'الصوت قادم قريبًا — أضِف ملفًا خاليًا من حقوق الملكية في' },
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

const rangeThumbClasses =
  '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sage-dark [&::-webkit-slider-thumb]:cursor-pointer ' +
  '[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-sage-dark [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer'

function AudioTrack({ title, file, playingId, onPlay }) {
  const { lang } = useLanguage()
  const t = copy[lang]
  const audioRef = useRef(null)
  const [missing, setMissing] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const isActive = playingId === file

  useEffect(() => {
    if (!isActive && isPlaying) {
      audioRef.current?.pause()
    }
  }, [isActive, isPlaying])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
    } else {
      onPlay(file)
      audio.play().catch(() => setMissing(true))
    }
  }

  const seek = (event) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    audio.currentTime = Number(event.target.value)
    setCurrentTime(audio.currentTime)
  }

  if (missing) {
    return (
      <div className="rounded-xl bg-white/60 border border-ink/5 px-4 py-3.5">
        <p className="text-sm font-medium text-ink mb-2">{title}</p>
        <p className="text-xs text-ink-soft/70 italic">
          {t.missing}{' '}
          <code className="bg-ink/5 px-1 py-0.5 rounded" dir="ltr">
            public{file}
          </code>
          .
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white/60 border border-ink/5 px-4 py-3.5">
      <p className="text-sm font-medium text-ink mb-3">{title}</p>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="shrink-0 w-9 h-9 rounded-full bg-sage-dark text-white flex items-center justify-center hover:bg-sage transition-colors"
        >
          {isPlaying ? (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <rect x="1" y="0.5" width="3.5" height="11" rx="1" />
              <rect x="7.5" y="0.5" width="3.5" height="11" rx="1" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <path d="M1 0.8c0-.65.7-1.06 1.27-.74l9 5.2c.57.33.57 1.15 0 1.48l-9 5.2c-.57.32-1.27-.1-1.27-.74z" />
            </svg>
          )}
        </button>

        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={seek}
          aria-label={title}
          className={`flex-1 h-1.5 rounded-full bg-ink/10 accent-sage-dark cursor-pointer ${rangeThumbClasses}`}
        />

        <span className="shrink-0 text-xs text-ink-soft/70 tabular-nums" dir="ltr">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        preload="none"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onError={() => setMissing(true)}
      >
        <source src={file} type="audio/mpeg" />
      </audio>
    </div>
  )
}

export default function CalmAudioPlayer() {
  const { lang } = useLanguage()
  const list = sessions[lang]
  const [playingId, setPlayingId] = useState(null)

  return (
    <div className="space-y-4">
      {list.map((session) => (
        <AudioTrack
          key={session.id}
          title={session.title}
          file={session.file}
          playingId={playingId}
          onPlay={setPlayingId}
        />
      ))}
    </div>
  )
}
