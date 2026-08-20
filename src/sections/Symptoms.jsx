import { useState } from 'react'
import SectionHeading from '../components/SectionHeading'
import SymptomCard from '../components/SymptomCard'
import { symptomCategories, symptomsDisclaimer } from '../data/symptoms'

export default function Symptoms() {
  const [openId, setOpenId] = useState(symptomCategories[0].id)

  return (
    <section id="symptoms" className="bg-sage-light/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="Symptoms of GAD"
          title="How anxiety can show up"
          description="Anxiety can affect the body, thoughts, emotions, and behavior all at once. Tap a category to explore it."
        />

        <div className="space-y-4 mb-8">
          {symptomCategories.map((category) => (
            <SymptomCard
              key={category.id}
              category={category}
              isOpen={openId === category.id}
              onToggle={() => setOpenId(openId === category.id ? null : category.id)}
            />
          ))}
        </div>

        <p className="text-sm text-ink-soft leading-relaxed max-w-2xl bg-white/60 border border-ink/5 rounded-2xl px-5 py-4">
          {symptomsDisclaimer}
        </p>
      </div>
    </section>
  )
}
