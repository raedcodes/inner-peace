import SectionHeading from '../components/SectionHeading'
import ToolCard from '../components/ToolCard'
import BreathingExercise from '../tools/BreathingExercise'
import MoodTracker from '../tools/MoodTracker'
import AnxietyJournal from '../tools/AnxietyJournal'
import RelaxationTimer from '../tools/RelaxationTimer'
import CalmAudioPlayer from '../tools/CalmAudioPlayer'

export default function ToolsSection() {
  return (
    <section id="tools" className="bg-sage-light/40 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-24">
        <SectionHeading
          eyebrow="Mental Wellness Tools"
          title="A few gentle tools, whenever you need them"
          description="Simple, private tools you can use in the moment. Everything you enter stays in your browser — nothing is sent anywhere."
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <ToolCard
            title="Breathing Exercise"
            description="A slow, guided breathing rhythm to help you find a moment of steadiness."
            icon="🫧"
          >
            <BreathingExercise />
          </ToolCard>

          <ToolCard
            title="Relaxation Timer"
            description="A quiet, distraction-free space to rest and let your body settle."
            icon="⏳"
          >
            <RelaxationTimer />
          </ToolCard>

          <ToolCard
            title="Mood Tracker"
            description="Notice patterns in how you feel over time."
            icon="📊"
          >
            <MoodTracker />
          </ToolCard>

          <ToolCard
            title="Anxiety Journal"
            description="A short, structured space to work through a worry."
            icon="📓"
          >
            <AnxietyJournal />
          </ToolCard>

          <ToolCard
            title="Calm Audio"
            description="Short relaxation and sleep sessions, plus calming background sounds."
            icon="🎧"
          >
            <CalmAudioPlayer />
          </ToolCard>
        </div>
      </div>
    </section>
  )
}
