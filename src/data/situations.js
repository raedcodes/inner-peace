// Resource `href`s point only to anchors that actually exist on the page.
// Gemini never supplies links or resource text — it only classifies
// "something else" into one of these ids and writes the short supportive copy.

export const situations = {
  en: [
    {
      id: 'very-anxious',
      icon: '😰',
      title: 'Feeling very anxious',
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Understanding Anxiety', href: '#understanding' },
        { label: 'Relaxation Timer', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'overthinking',
      icon: '💭',
      title: 'Overthinking / racing thoughts',
      resources: [
        { label: 'Understanding Anxiety', href: '#understanding' },
        { label: 'Journaling tips', href: '#lifestyle-journaling' },
        { label: 'Breathing Exercise', href: '#tool-breathing' },
      ],
    },
    {
      id: 'trouble-sleeping',
      icon: '😴',
      title: 'Trouble sleeping',
      resources: [
        { label: 'Sleep tips', href: '#lifestyle-sleep' },
        { label: 'Relaxation Timer', href: '#tool-relaxation-timer' },
        { label: 'Calm Audio', href: '#tool-calm-audio' },
      ],
    },
    {
      id: 'health-anxiety',
      icon: '🫀',
      title: 'Worried about physical symptoms / health anxiety',
      resources: [
        { label: 'The Mind-Body Connection', href: '#psychosomatic' },
        { label: 'Symptoms of GAD', href: '#symptoms' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'exam-anxiety',
      icon: '🎓',
      title: 'Exam or study anxiety',
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Sleep tips', href: '#lifestyle-sleep' },
        { label: 'Understanding Anxiety', href: '#understanding' },
      ],
    },
    {
      id: 'work-anxiety',
      icon: '💼',
      title: 'Job interview / work anxiety',
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'public-speaking',
      icon: '🎤',
      title: 'Presentation / public speaking',
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Quotes & Expert Insights', href: '#quotes' },
      ],
    },
    {
      id: 'social-event',
      icon: '👥',
      title: 'Social event / meeting people',
      resources: [
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Social Connection tips', href: '#lifestyle-connection' },
        { label: 'Breathing Exercise', href: '#tool-breathing' },
      ],
    },
    {
      id: 'relationship-anxiety',
      icon: '❤️',
      title: 'Relationship or marriage anxiety',
      resources: [
        { label: 'Boundaries tips', href: '#lifestyle-boundaries' },
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'travel-anxiety',
      icon: '✈️',
      title: 'Travel / flying anxiety',
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Relaxation Timer', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'boundaries-difficulty',
      icon: '🗣️',
      title: 'Difficulty setting boundaries',
      resources: [
        { label: 'Boundaries tips', href: '#lifestyle-boundaries' },
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'feeling-low',
      icon: '😔',
      title: 'Feeling low or overwhelmed',
      resources: [
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Social Connection tips', href: '#lifestyle-connection' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'avoidance',
      icon: '🎯',
      title: 'Avoiding something I need to face',
      resources: [
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
        { label: 'Quotes & Expert Insights', href: '#quotes' },
      ],
    },
    {
      id: 'life-change',
      icon: '🔄',
      title: 'Major life change',
      resources: [
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Social Connection tips', href: '#lifestyle-connection' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'waiting-news',
      icon: '⏳',
      title: 'Waiting for important news / results',
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Relaxation Timer', href: '#tool-relaxation-timer' },
        { label: 'Understanding Anxiety', href: '#understanding' },
      ],
    },
  ],
  ar: [
    {
      id: 'very-anxious',
      icon: '😰',
      title: 'أشعر بقلق شديد',
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'فهم القلق', href: '#understanding' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'overthinking',
      icon: '💭',
      title: 'إفراط في التفكير / أفكار متسارعة',
      resources: [
        { label: 'فهم القلق', href: '#understanding' },
        { label: 'نصائح كتابة اليوميات', href: '#lifestyle-journaling' },
        { label: 'تمرين التنفس', href: '#tool-breathing' },
      ],
    },
    {
      id: 'trouble-sleeping',
      icon: '😴',
      title: 'صعوبة في النوم',
      resources: [
        { label: 'نصائح النوم', href: '#lifestyle-sleep' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
        { label: 'أصوات هادئة', href: '#tool-calm-audio' },
      ],
    },
    {
      id: 'health-anxiety',
      icon: '🫀',
      title: 'قلق بشأن أعراض جسدية / القلق الصحي',
      resources: [
        { label: 'رابط الجسد والعقل', href: '#psychosomatic' },
        { label: 'أعراض القلق العام', href: '#symptoms' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'exam-anxiety',
      icon: '🎓',
      title: 'قلق الامتحانات أو الدراسة',
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'نصائح النوم', href: '#lifestyle-sleep' },
        { label: 'فهم القلق', href: '#understanding' },
      ],
    },
    {
      id: 'work-anxiety',
      icon: '💼',
      title: 'قلق العمل / مقابلة العمل',
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'public-speaking',
      icon: '🎤',
      title: 'التحدث أمام الجمهور / العرض التقديمي',
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'اقتباسات ورؤى الخبراء', href: '#quotes' },
      ],
    },
    {
      id: 'social-event',
      icon: '👥',
      title: 'مناسبة اجتماعية / لقاء أشخاص جدد',
      resources: [
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'نصائح التواصل الاجتماعي', href: '#lifestyle-connection' },
        { label: 'تمرين التنفس', href: '#tool-breathing' },
      ],
    },
    {
      id: 'relationship-anxiety',
      icon: '❤️',
      title: 'قلق العلاقة أو الزواج',
      resources: [
        { label: 'نصائح الحدود الشخصية', href: '#lifestyle-boundaries' },
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'travel-anxiety',
      icon: '✈️',
      title: 'قلق السفر / الطيران',
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'boundaries-difficulty',
      icon: '🗣️',
      title: 'صعوبة في وضع الحدود',
      resources: [
        { label: 'نصائح الحدود الشخصية', href: '#lifestyle-boundaries' },
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'feeling-low',
      icon: '😔',
      title: 'الشعور بالانخفاض أو الإرهاق',
      resources: [
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'نصائح التواصل الاجتماعي', href: '#lifestyle-connection' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'avoidance',
      icon: '🎯',
      title: 'تجنّب أمر أحتاج لمواجهته',
      resources: [
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
        { label: 'اقتباسات ورؤى الخبراء', href: '#quotes' },
      ],
    },
    {
      id: 'life-change',
      icon: '🔄',
      title: 'تغيير كبير في الحياة',
      resources: [
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'نصائح التواصل الاجتماعي', href: '#lifestyle-connection' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'waiting-news',
      icon: '⏳',
      title: 'انتظار أخبار أو نتائج مهمة',
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
        { label: 'فهم القلق', href: '#understanding' },
      ],
    },
  ],
}

export const situationIds = situations.en.map((s) => s.id)
