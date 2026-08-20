export const symptomCategories = [
  {
    id: 'physical',
    label: 'Physical',
    tint: 'sage',
    description:
      'Anxiety involves the body as much as the mind. These sensations are real — and they are not exclusive to anxiety, so persistent or severe physical symptoms are always worth having checked by a doctor.',
    items: [
      { name: 'Headaches', note: 'Often linked to muscle tension and a body on high alert.' },
      { name: 'Muscle tension', note: 'Especially in the neck, shoulders, and jaw.' },
      { name: 'Fatigue', note: 'A hyper-alert body and mind can be exhausting to sustain.' },
      { name: 'Dizziness', note: 'Can relate to breathing changes or muscle tension.' },
      { name: 'Rapid heartbeat / palpitations', note: 'Part of the body preparing for perceived danger.' },
      { name: 'Sweating', note: 'A common fight-or-flight response.' },
      { name: 'Trembling', note: 'Muscles readying for action that may never come.' },
      { name: 'Shortness of breath', note: 'Breathing can shift when the body senses threat.' },
      { name: 'Stomach discomfort', note: 'The gut is closely connected to the nervous system.' },
      { name: 'Nausea', note: 'Can accompany a stress response in some people.' },
      { name: 'Sleep difficulties', note: 'A busy nervous system can make winding down harder.' },
      { name: 'Feeling hot or cold', note: 'Circulation shifts as the body prepares to respond.' },
      { name: 'Chest tightness', note: 'Often related to breathing pattern and muscle tension.' },
    ],
  },
  {
    id: 'cognitive',
    label: 'Cognitive',
    tint: 'dusk',
    description: 'Patterns in how the mind processes worry, attention, and anticipation.',
    items: [
      { name: 'Excessive worrying', note: 'Worry that feels hard to set down, even when things are okay.' },
      { name: 'Difficulty concentrating', note: 'A busy internal alarm system can crowd out focus.' },
      { name: 'Overthinking', note: 'Replaying situations or rehearsing outcomes repeatedly.' },
      { name: 'Anticipating something going wrong', note: 'A mind scanning ahead for potential threats.' },
      { name: 'Difficulty controlling worry', note: 'Worry that feels like it runs on its own.' },
    ],
  },
  {
    id: 'emotional',
    label: 'Emotional',
    tint: 'clay',
    description: 'The felt, moment-to-moment experience that often comes with anxiety.',
    items: [
      { name: 'Restlessness', note: 'Feeling keyed up or unable to settle.' },
      { name: 'Irritability', note: 'A nervous system running "hot" can shorten patience.' },
      { name: 'Feeling overwhelmed', note: 'Everything can feel like a lot at once.' },
      { name: 'Fear', note: 'Sometimes tied to a specific worry, sometimes more general.' },
      { name: 'Feeling constantly on edge', note: 'A sense of being braced for something.' },
    ],
  },
  {
    id: 'behavioral',
    label: 'Behavioral',
    tint: 'sand',
    description: 'The things anxiety can quietly shape us to do — often to feel safer in the moment.',
    items: [
      { name: 'Avoidance', note: 'Steering away from people, places, or tasks that feel threatening.' },
      { name: 'Reassurance seeking', note: 'Repeatedly asking others to confirm that things are okay.' },
      { name: 'Social withdrawal', note: 'Pulling back from connection when anxiety is high.' },
      { name: 'Checking symptoms', note: 'Frequently monitoring the body for signs something is wrong.' },
      { name: 'Difficulty relaxing', note: "A body braced for threat can find stillness hard." },
    ],
  },
]

export const symptomsDisclaimer =
  'These symptoms can occur with anxiety, but they are not exclusive to it — other causes are possible, some of which need medical attention. This list is educational, not diagnostic. If a symptom is new, severe, persistent, or worrying, please speak with a doctor or other qualified healthcare professional.'
