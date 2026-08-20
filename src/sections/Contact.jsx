import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import { useLanguage } from '../i18n/LanguageContext'

const copy = {
  en: {
    eyebrow: 'Reach Out',
    title: 'Want to talk to someone?',
    description:
      "This isn't therapy, counseling, or a crisis service — just a genuine, listening ear if you'd like to chit-chat, get something off your chest, or aren't sure who else to tell. Mental health isn't abstract to me either — I've been through my own share of it, which is part of why this site exists. Messages go directly and privately — they aren't shared, sold, or posted anywhere.",
    nameLabel: 'Your name',
    optional: '(optional)',
    emailLabel: 'Your email',
    emailOptional: "(optional — only if you'd like a reply)",
    messageLabel: 'Your message',
    messagePlaceholder: 'Whatever is on your mind...',
    send: 'Send Message',
    sending: 'Sending...',
    footnote:
      "Sending goes straight to us and is not stored on this website. If you're in crisis or in immediate danger, please contact local emergency services instead of using this form.",
    success: 'Thank you — your message has been sent.',
    error: "Something went wrong sending your message. Please try again in a moment.",
  },
  ar: {
    eyebrow: 'تواصل معنا',
    title: 'تريد التحدث إلى أحد؟',
    description:
      'هذه ليست جلسة علاج أو استشارة أو خدمة أزمات — بل مجرد أذن صاغية إن أردت الدردشة، أو تفريغ ما بداخلك، أو لست متأكدًا لمن تخبره. الصحة النفسية ليست أمرًا بعيدًا عني أيضًا — فقد مررت بتجربتي الخاصة معها، وهذا جزء من سبب وجود هذا الموقع. تصل الرسائل مباشرة وبخصوصية تامة — لا تُشارَك أو تُباع أو تُنشر في أي مكان.',
    nameLabel: 'اسمك',
    optional: '(اختياري)',
    emailLabel: 'بريدك الإلكتروني',
    emailOptional: '(اختياري — فقط إن أردت ردًا)',
    messageLabel: 'رسالتك',
    messagePlaceholder: 'أي شيء يدور في ذهنك...',
    send: 'إرسال الرسالة',
    sending: 'جارٍ الإرسال...',
    footnote:
      'تصل الرسالة إلينا مباشرة ولا تُخزَّن على هذا الموقع. إذا كنت تمر بأزمة أو خطر مباشر، يُرجى التواصل مع خدمات الطوارئ المحلية بدلًا من استخدام هذا النموذج.',
    success: 'شكرًا لك — تم إرسال رسالتك.',
    error: 'حدث خطأ أثناء إرسال رسالتك. يُرجى المحاولة مرة أخرى بعد قليل.',
  },
}

function encodeForm(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&')
}

export default function Contact() {
  const { lang } = useLanguage()
  const t = copy[lang]
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [botField, setBotField] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const canSend = message.trim().length > 0 && status !== 'sending'

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!message.trim() || status === 'sending') return

    if (botField) return // honeypot triggered — silently drop

    setStatus('sending')
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encodeForm({
          'form-name': 'contact',
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          'bot-field': botField,
        }),
      })

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`)

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="bg-dusk-light/40 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />

        {status === 'success' ? (
          <div className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-8 text-center text-ink">
            {t.success}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white/70 border border-ink/5 shadow-soft p-6 md:p-8 space-y-4"
          >
            <p className="hidden" aria-hidden="true">
              <label>
                Don’t fill this out if you’re human: <input tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
              </label>
            </p>

            <div>
              <label htmlFor="contact-name" className="block text-sm text-ink-soft mb-1.5">
                {t.nameLabel} <span className="text-ink-soft/60">{t.optional}</span>
              </label>
              <input
                id="contact-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-ink/10 bg-white/80 px-4 py-2.5 text-sm text-ink focus:border-dusk focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-email" className="block text-sm text-ink-soft mb-1.5">
                {t.emailLabel} <span className="text-ink-soft/60">{t.emailOptional}</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-ink/10 bg-white/80 px-4 py-2.5 text-sm text-ink focus:border-dusk focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm text-ink-soft mb-1.5">
                {t.messageLabel}
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                maxLength={2000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className="w-full rounded-xl border border-ink/10 bg-white/80 px-4 py-3 text-sm text-ink placeholder:text-ink-soft/40 focus:border-dusk focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!canSend}
              className="rounded-full bg-dusk-dark text-white px-6 py-2.5 text-sm font-medium disabled:opacity-40 hover:bg-dusk-dark/90 transition-colors"
            >
              {status === 'sending' ? t.sending : t.send}
            </button>

            {status === 'error' && <p className="text-xs text-clay">{t.error}</p>}

            <p className="text-xs text-ink-soft/70 leading-relaxed pt-1">{t.footnote}</p>
          </form>
        )}
      </div>
    </section>
  )
}
