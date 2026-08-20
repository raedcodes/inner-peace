export const therapySignals = {
  en: [
    'Anxiety is interfering with daily life, work, or studies.',
    'Worry feels difficult to control, even when you try.',
    'Avoidance of people, places, or tasks is increasing over time.',
    'Relationships are being affected by anxiety or its effects.',
    'Physical symptoms are persistent or distressing.',
    'You feel stuck despite trying lifestyle changes.',
  ],
  ar: [
    'يتداخل القلق مع الحياة اليومية أو العمل أو الدراسة.',
    'يصعب التحكم بالقلق، حتى عند المحاولة.',
    'تجنّب الأشخاص أو الأماكن أو المهام يزداد مع الوقت.',
    'تتأثر العلاقات بالقلق أو بآثاره.',
    'الأعراض الجسدية مستمرة أو مزعجة.',
    'تشعر بالعجز رغم تجربة تغييرات في نمط الحياة.',
  ],
}

export const therapyApproaches = {
  en: [
    {
      name: 'Cognitive Behavioral Therapy (CBT)',
      description:
        'A well-studied, structured approach that helps people notice anxious thought patterns and gradually build more balanced, flexible ways of responding to them.',
    },
    {
      name: 'Exposure-based approaches',
      description:
        'Guided, gradual, and paced approaches to facing feared situations safely, with the support of a trained professional who can adjust pacing to what feels manageable.',
    },
  ],
  ar: [
    {
      name: 'العلاج المعرفي السلوكي',
      description:
        'نهج منظم ومدروس جيدًا يساعد الأشخاص على ملاحظة أنماط الأفكار القلقة، وبناء طرق أكثر توازنًا ومرونة للاستجابة لها تدريجيًا.',
    },
    {
      name: 'أساليب قائمة على التعرّض التدريجي',
      description:
        'أساليب موجَّهة وتدريجية لمواجهة المواقف المخيفة بأمان، بدعم من أخصائي مدرَّب يمكنه ضبط الوتيرة بما يناسبك.',
    },
  ],
}

export const medicationPoints = {
  en: [
    'Medication can be a part of treatment for some people, alongside or instead of other approaches.',
    'A psychiatrist or other qualified doctor is the right person to assess whether medication may be appropriate for you.',
    'Whether medication helps — and which kind — depends on the individual; there is no single right answer for everyone.',
    'Medication should not be started, stopped, or changed without professional guidance.',
    'Therapy, lifestyle changes, and medication are sometimes used together, depending on the person and their needs.',
  ],
  ar: [
    'قد تكون الأدوية جزءًا من العلاج لدى بعض الأشخاص، إلى جانب أساليب أخرى أو بدلًا منها.',
    'الطبيب النفسي أو طبيب مؤهل آخر هو الشخص المناسب لتقييم ما إذا كان الدواء مناسبًا لك.',
    'مدى فعالية الدواء — ونوعه — يعتمد على الفرد؛ لا توجد إجابة واحدة صحيحة للجميع.',
    'لا ينبغي بدء الدواء أو إيقافه أو تغييره دون توجيه متخصص.',
    'يُستخدم العلاج وتغييرات نمط الحياة والدواء معًا أحيانًا، بحسب احتياجات الشخص.',
  ],
}

// Kept only so previously-saved entries (from the old 7-field journal) still
// display correctly in "view saved entries" — the new journal saves in the
// journalSteps shape below instead.
export const journalPrompts = {
  en: [
    { key: 'feeling', label: 'What am I feeling?' },
    { key: 'situation', label: 'What happened?' },
    { key: 'thoughts', label: 'What thoughts am I having?' },
    { key: 'worry', label: 'What am I worried about?' },
    { key: 'evidence', label: 'What evidence supports this thought?' },
    { key: 'perspective', label: 'What might be another perspective?' },
    { key: 'control', label: 'What can I control right now?' },
  ],
  ar: [
    { key: 'feeling', label: 'بماذا أشعر؟' },
    { key: 'situation', label: 'ماذا حدث؟' },
    { key: 'thoughts', label: 'ما الأفكار التي تراودني؟' },
    { key: 'worry', label: 'ما الذي يقلقني؟' },
    { key: 'evidence', label: 'ما الدليل الذي يدعم هذه الفكرة؟' },
    { key: 'perspective', label: 'ما وجهة نظر أخرى ممكنة؟' },
    { key: 'control', label: 'ما الذي أستطيع التحكم به الآن؟' },
  ],
}

export const journalEmotions = {
  en: [
    { key: 'anxious', label: 'Anxious' },
    { key: 'overwhelmed', label: 'Overwhelmed' },
    { key: 'restless', label: 'Restless' },
    { key: 'fearful', label: 'Fearful' },
    { key: 'sad', label: 'Sad' },
    { key: 'irritable', label: 'Irritable' },
    { key: 'racing-thoughts', label: 'Racing thoughts' },
    { key: 'tired', label: 'Tired' },
  ],
  ar: [
    { key: 'anxious', label: 'قلق' },
    { key: 'overwhelmed', label: 'مرهق نفسيًا' },
    { key: 'restless', label: 'متوتر' },
    { key: 'fearful', label: 'خائف' },
    { key: 'sad', label: 'حزين' },
    { key: 'irritable', label: 'سريع الانفعال' },
    { key: 'racing-thoughts', label: 'أفكار متسارعة' },
    { key: 'tired', label: 'متعب' },
  ],
}

// The redesigned journal: 3 steps instead of 7 fields, shown one at a time.
export const journalSteps = {
  en: [
    {
      key: 'trigger',
      title: 'What is making you feel anxious right now?',
      placeholder: 'What happened, or what are you worried about?',
    },
    {
      key: 'reframe',
      title: 'Is there another way to look at this, or evidence against it?',
      placeholder: 'A different angle, or something that challenges the thought...',
    },
    {
      key: 'action',
      title: 'What is one small thing you can control right now?',
      placeholder: 'A small, doable next step...',
    },
  ],
  ar: [
    {
      key: 'trigger',
      title: 'ما الذي يجعلك تشعر بالقلق الآن؟',
      placeholder: 'ماذا حدث، أو ما الذي يقلقك؟',
    },
    {
      key: 'reframe',
      title: 'هل هناك طريقة أخرى للنظر إلى هذا، أو دليل يعارضه؟',
      placeholder: 'زاوية مختلفة، أو شيء يتحدى هذه الفكرة...',
    },
    {
      key: 'action',
      title: 'ما الشيء الصغير الذي يمكنك التحكم به الآن؟',
      placeholder: 'خطوة صغيرة وقابلة للتنفيذ...',
    },
  ],
}

export const moodOptions = {
  en: [
    { key: 'good', emoji: '😊', label: 'Good' },
    { key: 'okay', emoji: '🙂', label: 'Okay' },
    { key: 'neutral', emoji: '😐', label: 'Neutral' },
    { key: 'anxious', emoji: '😟', label: 'Anxious' },
    { key: 'low', emoji: '😔', label: 'Low' },
  ],
  ar: [
    { key: 'good', emoji: '😊', label: 'جيد' },
    { key: 'okay', emoji: '🙂', label: 'مقبول' },
    { key: 'neutral', emoji: '😐', label: 'محايد' },
    { key: 'anxious', emoji: '😟', label: 'قلق' },
    { key: 'low', emoji: '😔', label: 'منخفض' },
  ],
}
