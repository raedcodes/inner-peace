// Resource `href`s point only to anchors that actually exist on the page.
// Gemini never supplies links or resource text — it only classifies
// "something else" into one of these ids and writes the short supportive copy.
//
// `acknowledgment` / `suggestions` are pre-written (not from Gemini) so picking
// a fixed card is instant — no API round trip. They follow the same safety
// rules as the live Gemini prompt in situation-support.js: no diagnosis, no
// medication guidance, and the anti-spiral rule for health-anxiety (reassure
// first, one clear medical-care signal, never a list of possible causes).

export const categories = {
  en: [
    { id: 'acute', icon: '🚨', label: 'Acute Feeling' },
    { id: 'mind-body', icon: '🧠', label: 'Mind & Body' },
    { id: 'performance', icon: '💼', label: 'Performance & Events' },
    { id: 'life-relationships', icon: '🔄', label: 'Life & Relationships' },
    { id: 'other', icon: '✍️', label: 'Other' },
  ],
  ar: [
    { id: 'acute', icon: '🚨', label: 'مشاعر حادة' },
    { id: 'mind-body', icon: '🧠', label: 'العقل والجسد' },
    { id: 'performance', icon: '💼', label: 'الأداء والمناسبات' },
    { id: 'life-relationships', icon: '🔄', label: 'الحياة والعلاقات' },
    { id: 'other', icon: '✍️', label: 'أخرى' },
  ],
}

export const situations = {
  en: [
    {
      id: 'very-anxious',
      icon: '😰',
      category: 'acute',
      title: 'Feeling very anxious',
      acknowledgment:
        "It sounds like anxiety has your whole body on alert right now — that's exhausting, and it makes complete sense you're looking for something to help.",
      suggestions: [
        'Try slow breathing for a minute or two — in for 4, hold for 4, out for 6 — to help your nervous system downshift.',
        'Name 5 things you can see and 3 you can hear right now; grounding in your senses can ease the spiral.',
        "Remind yourself this feeling, however intense, will pass — you've gotten through it before.",
      ],
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Understanding Anxiety', href: '#understanding' },
        { label: 'Relaxation Timer', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'overthinking',
      icon: '💭',
      category: 'mind-body',
      title: 'Overthinking / racing thoughts',
      acknowledgment:
        "Racing thoughts can feel like they're multiplying the moment you notice them — it's a common and very human pattern, not a flaw.",
      suggestions: [
        'Write your thoughts down, even messily — getting them out of your head and onto paper can quiet the loop.',
        'Try the breathing exercise below to give your mind something steady to focus on instead.',
        "Ask yourself: is this a problem you can act on right now, or one you're just replaying? If it's the latter, gently set it aside for later.",
      ],
      resources: [
        { label: 'Understanding Anxiety', href: '#understanding' },
        { label: 'Journaling tips', href: '#lifestyle-journaling' },
        { label: 'Breathing Exercise', href: '#tool-breathing' },
      ],
    },
    {
      id: 'trouble-sleeping',
      icon: '😴',
      category: 'mind-body',
      title: 'Trouble sleeping',
      acknowledgment:
        "A restless mind at bedtime is one of the most common ways anxiety shows up — you're far from alone in this.",
      suggestions: [
        'Try the relaxation timer or calm audio a little before you plan to sleep, as a wind-down cue for your body.',
        "If you're lying awake worrying, jot the worry down on paper and tell yourself you'll deal with it tomorrow.",
        'Keep the room dim and put your phone out of reach — even small routine changes can help signal it\'s time to rest.',
      ],
      resources: [
        { label: 'Sleep tips', href: '#lifestyle-sleep' },
        { label: 'Relaxation Timer', href: '#tool-relaxation-timer' },
        { label: 'Calm Audio', href: '#tool-calm-audio' },
      ],
    },
    {
      id: 'health-anxiety',
      icon: '🫀',
      category: 'mind-body',
      title: 'Worried about physical symptoms / health anxiety',
      acknowledgment:
        'Noticing a physical sensation and immediately worrying about it is incredibly common — and most day-to-day sensations like this are not a sign of anything serious.',
      suggestions: [
        'Try to gently redirect your attention to something engaging for the next few minutes, rather than monitoring the sensation closely.',
        'Searching symptoms online often fuels worry rather than easing it — it may help to step away from that for now.',
        "If the sensation is sudden, severe, or unlike anything you've felt before, that's worth checking with a doctor — otherwise, it's okay to just observe and let it pass.",
      ],
      resources: [
        { label: 'The Mind-Body Connection', href: '#psychosomatic' },
        { label: 'Symptoms of GAD', href: '#symptoms' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'exam-anxiety',
      icon: '🎓',
      category: 'performance',
      title: 'Exam or study anxiety',
      acknowledgment:
        'Exam pressure can make even well-prepared people doubt themselves — that nervous energy is normal.',
      suggestions: [
        'Try a short breathing exercise before you sit down to study or test, to settle your body first.',
        'Break your remaining study time into small, specific chunks rather than one overwhelming block.',
        'Protect your sleep tonight — a rested mind performs better than a few extra hours of cramming.',
      ],
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Sleep tips', href: '#lifestyle-sleep' },
        { label: 'Understanding Anxiety', href: '#understanding' },
      ],
    },
    {
      id: 'work-anxiety',
      icon: '💼',
      category: 'performance',
      title: 'Job interview / work anxiety',
      acknowledgment:
        "Wanting things to go well can bring up a lot of pressure — that nervousness is a sign you care, not a sign you'll do badly.",
      suggestions: [
        'Try slow breathing for a minute beforehand to steady your voice and thoughts.',
        'Prepare one or two key points you want to get across, so you have something to anchor to if your mind blanks.',
        "Remind yourself that one interview or one day is a small sample — it doesn't define your worth or ability.",
      ],
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'public-speaking',
      icon: '🎤',
      category: 'performance',
      title: 'Presentation / public speaking',
      acknowledgment:
        "Nerves before speaking in front of others are one of the most common fears there is — you're in very good company.",
      suggestions: [
        'Try the breathing exercise beforehand — a steadier breath often steadies your voice too.',
        "Remember that a little adrenaline can sharpen focus; it doesn't have to mean something is wrong.",
        'Facing this gradually, one small step at a time, tends to make it feel less overwhelming over time.',
      ],
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Quotes & Expert Insights', href: '#quotes' },
      ],
    },
    {
      id: 'social-event',
      icon: '👥',
      category: 'performance',
      title: 'Social event / meeting people',
      acknowledgment: 'Feeling nervous before being around people, especially new people, is a very common experience.',
      suggestions: [
        "Give yourself permission to arrive a little early or leave a little early if you need to — there's no rule you have to stay the whole time.",
        'Having one or two easy topics or questions in mind can take the pressure off making conversation.',
        'A slow breath before you walk in can help settle the initial rush of nerves.',
      ],
      resources: [
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Social Connection tips', href: '#lifestyle-connection' },
        { label: 'Breathing Exercise', href: '#tool-breathing' },
      ],
    },
    {
      id: 'relationship-anxiety',
      icon: '❤️',
      category: 'life-relationships',
      title: 'Relationship or marriage anxiety',
      acknowledgment: 'Worry in a relationship you care about can feel especially heavy, because so much matters to you.',
      suggestions: [
        'Try naming the specific worry to yourself clearly — vague unease is harder to sit with than a clear thought.',
        'Consider whether this is something worth gently raising with your partner directly, rather than carrying it alone.',
        'Be as compassionate with yourself as you would be with a friend going through the same thing.',
      ],
      resources: [
        { label: 'Boundaries tips', href: '#lifestyle-boundaries' },
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'travel-anxiety',
      icon: '✈️',
      category: 'performance',
      title: 'Travel / flying anxiety',
      acknowledgment: "Anxiety around travel or flying is common, even for people who've flown many times before.",
      suggestions: [
        'Try slow breathing during moments that feel tense, like takeoff — it can help keep your body calmer.',
        'Distraction can genuinely help here — music, a show, or a book you enjoy gives your mind somewhere else to go.',
        "Remind yourself that the nervous feeling is your body's alarm system, not a prediction of what will actually happen.",
      ],
      resources: [
        { label: 'Breathing Exercise', href: '#tool-breathing' },
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Relaxation Timer', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'boundaries-difficulty',
      icon: '🗣️',
      category: 'life-relationships',
      title: 'Difficulty setting boundaries',
      acknowledgment: "Struggling to set a boundary usually comes from caring about the people around you — that instinct isn't the problem.",
      suggestions: [
        "Start small — a boundary doesn't have to be a big confrontation, even a short, clear sentence counts.",
        'Remind yourself that saying no to one thing is saying yes to your own limits, which matters too.',
        "It's okay if it feels uncomfortable at first — that discomfort tends to ease with practice.",
      ],
      resources: [
        { label: 'Boundaries tips', href: '#lifestyle-boundaries' },
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'feeling-low',
      icon: '😔',
      category: 'acute',
      title: 'Feeling low or overwhelmed',
      acknowledgment: 'Feeling low or overwhelmed can make even small things feel like a lot — be gentle with yourself right now.',
      suggestions: [
        'Try to do one small, manageable thing for yourself right now, rather than everything on your list.',
        'Reaching out to one person you trust, even briefly, can help you feel less alone in this.',
        'Notice this feeling without judging yourself for having it — feelings like this tend to shift with time and care.',
      ],
      resources: [
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Social Connection tips', href: '#lifestyle-connection' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'avoidance',
      icon: '🎯',
      category: 'life-relationships',
      title: 'Avoiding something I need to face',
      acknowledgment: "Avoiding something that feels overwhelming is a very natural response — it usually means it matters to you, not that something's wrong with you.",
      suggestions: [
        'Try breaking the task into the smallest possible first step, small enough that it feels almost easy to start.',
        "Give yourself credit for even thinking about it today — that's part of facing it, too.",
        'Facing things gradually, at a pace that feels manageable, tends to work better than forcing yourself all at once.',
      ],
      resources: [
        { label: 'Facing Fears, Gradually', href: '#lifestyle-facing-fears' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
        { label: 'Quotes & Expert Insights', href: '#quotes' },
      ],
    },
    {
      id: 'life-change',
      icon: '🔄',
      category: 'life-relationships',
      title: 'Major life change',
      acknowledgment: "Big changes can stir up anxiety even when they're changes you wanted — that's a very normal response to uncertainty.",
      suggestions: [
        'Give yourself permission to feel unsettled for a while — adjusting to change takes time.',
        'Try to keep one or two small routines steady, as an anchor while everything else shifts.',
        'Leaning on people you trust during a transition can make it feel less overwhelming.',
      ],
      resources: [
        { label: 'Self-Compassion tips', href: '#lifestyle-self-compassion' },
        { label: 'Social Connection tips', href: '#lifestyle-connection' },
        { label: 'Therapy & Professional Help', href: '#therapy' },
      ],
    },
    {
      id: 'waiting-news',
      icon: '⏳',
      category: 'acute',
      title: 'Waiting for important news / results',
      acknowledgment: 'Waiting for something important out of your control is one of the hardest kinds of anxiety to sit with.',
      suggestions: [
        'Try to plan something small and engaging for the waiting period, rather than checking constantly.',
        'The breathing exercise or relaxation timer can help you get through moments when the waiting feels hardest.',
        "Remind yourself that the outcome won't be changed by how much you worry — your energy is better spent caring for yourself right now.",
      ],
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
      category: 'acute',
      title: 'أشعر بقلق شديد',
      acknowledgment: 'يبدو أن القلق جعل جسدك بأكمله في حالة تأهب الآن — وهذا مرهق، ومن الطبيعي جدًا أن تبحث عمّا قد يساعدك.',
      suggestions: [
        'جرّب التنفس ببطء لدقيقة أو دقيقتين — شهيق لمدة 4 عدات، احبس النفس 4 عدات، ثم زفير لمدة 6 — لمساعدة جسدك على الهدوء.',
        'عدّ 5 أشياء تراها و3 أشياء تسمعها الآن؛ التركيز على حواسك قد يخفف من دوامة القلق.',
        'ذكّر نفسك أن هذا الشعور، مهما كان شديدًا، سيمر — لقد تجاوزته من قبل.',
      ],
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'فهم القلق', href: '#understanding' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'overthinking',
      icon: '💭',
      category: 'mind-body',
      title: 'إفراط في التفكير / أفكار متسارعة',
      acknowledgment: 'الأفكار المتسارعة قد تشعرك وكأنها تتضاعف بمجرد ملاحظتها — وهذا نمط شائع وإنساني جدًا، وليس عيبًا فيك.',
      suggestions: [
        'اكتب أفكارك، حتى لو بشكل غير منظم — إخراجها من رأسك إلى الورق قد يهدئ الدوامة.',
        'جرّب تمرين التنفس أدناه لتمنح ذهنك شيئًا ثابتًا يركّز عليه بدلاً من الأفكار.',
        'اسأل نفسك: هل هذه مشكلة يمكنك التصرف حيالها الآن، أم أنك تكررها فقط في ذهنك؟ إذا كانت الثانية، ضعها جانبًا برفق لوقت لاحق.',
      ],
      resources: [
        { label: 'فهم القلق', href: '#understanding' },
        { label: 'نصائح كتابة اليوميات', href: '#lifestyle-journaling' },
        { label: 'تمرين التنفس', href: '#tool-breathing' },
      ],
    },
    {
      id: 'trouble-sleeping',
      icon: '😴',
      category: 'mind-body',
      title: 'صعوبة في النوم',
      acknowledgment: 'الذهن المتيقظ وقت النوم من أكثر الطرق شيوعًا التي يظهر بها القلق — أنت لست وحدك في هذا.',
      suggestions: [
        'جرّب مؤقّت الاسترخاء أو الأصوات الهادئة قبل موعد نومك بقليل، كإشارة لجسدك بأن وقت الراحة قد اقترب.',
        'إذا كنت مستيقظًا وقلقًا، اكتب ما يقلقك على ورقة وأخبر نفسك أنك ستتعامل معه غدًا.',
        'أبقِ الغرفة خافتة الإضاءة وابعد هاتفك عن متناولك — حتى التغييرات الصغيرة في الروتين قد تساعد.',
      ],
      resources: [
        { label: 'نصائح النوم', href: '#lifestyle-sleep' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
        { label: 'أصوات هادئة', href: '#tool-calm-audio' },
      ],
    },
    {
      id: 'health-anxiety',
      icon: '🫀',
      category: 'mind-body',
      title: 'قلق بشأن أعراض جسدية / القلق الصحي',
      acknowledgment: 'ملاحظة إحساس جسدي والقلق بشأنه فورًا أمر شائع جدًا — ومعظم الأحاسيس اليومية كهذه ليست علامة على شيء خطير.',
      suggestions: [
        'حاول توجيه انتباهك برفق نحو شيء آخر لبضع دقائق، بدلاً من مراقبة الإحساس عن كثب.',
        'البحث عن الأعراض على الإنترنت غالبًا ما يزيد القلق بدلاً من تخفيفه — قد يكون من المفيد الابتعاد عن ذلك الآن.',
        'إذا كان الإحساس مفاجئًا أو شديدًا أو مختلفًا تمامًا عمّا شعرت به من قبل، فمن الجيد مراجعة طبيب — وإلا، يمكنك فقط ملاحظته والسماح له بالمرور.',
      ],
      resources: [
        { label: 'رابط الجسد والعقل', href: '#psychosomatic' },
        { label: 'أعراض القلق العام', href: '#symptoms' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'exam-anxiety',
      icon: '🎓',
      category: 'performance',
      title: 'قلق الامتحانات أو الدراسة',
      acknowledgment: 'ضغط الامتحانات قد يجعل حتى المستعدين جيدًا يشكّون في أنفسهم — هذه الطاقة العصبية طبيعية.',
      suggestions: [
        'جرّب تمرين تنفس قصير قبل الجلوس للدراسة أو الامتحان، لتهدئة جسدك أولاً.',
        'قسّم وقت الدراسة المتبقي إلى أجزاء صغيرة ومحددة بدلاً من كتلة واحدة مرهقة.',
        'احرص على نومك الليلة — الذهن المرتاح يؤدي أفضل من ساعات إضافية من المذاكرة المكثفة.',
      ],
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'نصائح النوم', href: '#lifestyle-sleep' },
        { label: 'فهم القلق', href: '#understanding' },
      ],
    },
    {
      id: 'work-anxiety',
      icon: '💼',
      category: 'performance',
      title: 'قلق العمل / مقابلة العمل',
      acknowledgment: 'الرغبة في أن تسير الأمور بشكل جيد قد تجلب معها الكثير من الضغط — هذا التوتر علامة على اهتمامك، لا على أنك ستؤدي بشكل سيئ.',
      suggestions: [
        'جرّب التنفس ببطء لدقيقة قبل المقابلة لتثبيت صوتك وأفكارك.',
        'حضّر نقطة أو نقطتين رئيسيتين تريد إيصالهما، لتكون لديك نقطة ارتكاز إذا شعرت بالتشويش.',
        'ذكّر نفسك أن مقابلة واحدة أو يومًا واحدًا عيّنة صغيرة جدًا — لا تُعرّف قيمتك أو قدرتك.',
      ],
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'public-speaking',
      icon: '🎤',
      category: 'performance',
      title: 'التحدث أمام الجمهور / العرض التقديمي',
      acknowledgment: 'التوتر قبل التحدث أمام الآخرين من أكثر المخاوف شيوعًا على الإطلاق — أنت في رفقة كثيرين.',
      suggestions: [
        'جرّب تمرين التنفس قبل الحديث — التنفس الأكثر ثباتًا غالبًا ما يثبّت صوتك أيضًا.',
        'تذكّر أن القليل من التوتر قد يزيد تركيزك؛ لا يعني بالضرورة أن هناك خطأ ما.',
        'مواجهة هذا تدريجيًا، خطوة صغيرة في كل مرة، يجعله يبدو أقل إرهاقًا مع الوقت.',
      ],
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'اقتباسات ورؤى الخبراء', href: '#quotes' },
      ],
    },
    {
      id: 'social-event',
      icon: '👥',
      category: 'performance',
      title: 'مناسبة اجتماعية / لقاء أشخاص جدد',
      acknowledgment: 'الشعور بالتوتر قبل التواجد بين الناس، خصوصًا أشخاصًا جددًا، تجربة شائعة جدًا.',
      suggestions: [
        'اسمح لنفسك بالوصول مبكرًا قليلاً أو المغادرة مبكرًا إذا احتجت لذلك — لا توجد قاعدة تلزمك بالبقاء طوال الوقت.',
        'وجود موضوع أو سؤالين بسيطين في ذهنك مسبقًا قد يخفف ضغط بدء الحديث.',
        'نفس بطيء قبل الدخول قد يساعد على تهدئة اندفاع التوتر الأولي.',
      ],
      resources: [
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'نصائح التواصل الاجتماعي', href: '#lifestyle-connection' },
        { label: 'تمرين التنفس', href: '#tool-breathing' },
      ],
    },
    {
      id: 'relationship-anxiety',
      icon: '❤️',
      category: 'life-relationships',
      title: 'قلق العلاقة أو الزواج',
      acknowledgment: 'القلق في علاقة تهمك قد يبدو ثقيلاً بشكل خاص، لأن الكثير على المحك بالنسبة لك.',
      suggestions: [
        'حاول تسمية قلقك بوضوح لنفسك؛ الشعور الغامض بعدم الارتياح أصعب على التعايش معه من فكرة واضحة.',
        'فكّر إن كان هذا الأمر يستحق طرحه برفق مباشرة مع شريكك، بدلاً من حمله وحدك.',
        'كن رحيمًا مع نفسك بقدر ما كنت لتكون مع صديق يمر بالتجربة نفسها.',
      ],
      resources: [
        { label: 'نصائح الحدود الشخصية', href: '#lifestyle-boundaries' },
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'travel-anxiety',
      icon: '✈️',
      category: 'performance',
      title: 'قلق السفر / الطيران',
      acknowledgment: 'القلق المرتبط بالسفر أو الطيران شائع، حتى لدى من سافروا مرات عديدة من قبل.',
      suggestions: [
        'جرّب التنفس ببطء خلال اللحظات المتوترة، مثل الإقلاع — قد يساعد جسدك على البقاء أكثر هدوءًا.',
        'الإلهاء قد يساعد فعلاً هنا — موسيقى أو مسلسل أو كتاب تستمتع به يمنح ذهنك مكانًا آخر يذهب إليه.',
        'ذكّر نفسك أن شعور التوتر هو نظام إنذار جسدك، لا تنبؤ بما سيحدث فعلاً.',
      ],
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
      ],
    },
    {
      id: 'boundaries-difficulty',
      icon: '🗣️',
      category: 'life-relationships',
      title: 'صعوبة في وضع الحدود',
      acknowledgment: 'صعوبة وضع حد عادة ما تنبع من اهتمامك بمن حولك — هذه الغريزة ليست المشكلة.',
      suggestions: [
        'ابدأ صغيرًا — الحد لا يجب أن يكون مواجهة كبيرة، حتى جملة قصيرة وواضحة كافية.',
        'ذكّر نفسك أن قول لا لشيء ما هو قول نعم لحدودك الخاصة، وهذا مهم أيضًا.',
        'لا بأس إن شعرت بعدم الارتياح في البداية — هذا الشعور يخف مع الممارسة.',
      ],
      resources: [
        { label: 'نصائح الحدود الشخصية', href: '#lifestyle-boundaries' },
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'feeling-low',
      icon: '😔',
      category: 'acute',
      title: 'الشعور بالانخفاض أو الإرهاق',
      acknowledgment: 'الشعور بالانخفاض أو الإرهاق قد يجعل حتى الأمور الصغيرة تبدو كثيرة — كن لطيفًا مع نفسك الآن.',
      suggestions: [
        'حاول القيام بشيء صغير وقابل للتحقيق من أجل نفسك الآن، بدلاً من كل ما في قائمتك.',
        'التواصل مع شخص تثق به، ولو لفترة قصيرة، قد يساعدك على الشعور بأنك أقل وحدة.',
        'لاحظ هذا الشعور دون أن تلوم نفسك عليه — مثل هذه المشاعر تميل إلى التغير مع الوقت والعناية.',
      ],
      resources: [
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'نصائح التواصل الاجتماعي', href: '#lifestyle-connection' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'avoidance',
      icon: '🎯',
      category: 'life-relationships',
      title: 'تجنّب أمر أحتاج لمواجهته',
      acknowledgment: 'تجنّب أمر يبدو مرهقًا استجابة طبيعية جدًا — وغالبًا ما يعني أنه يهمّك، وليس أن هناك خطأ فيك.',
      suggestions: [
        'حاول تقسيم المهمة إلى أصغر خطوة أولى ممكنة، صغيرة بما يكفي لتبدو سهلة البدء.',
        'امنح نفسك تقديرًا لمجرد تفكيرك في الأمر اليوم — هذا أيضًا جزء من مواجهته.',
        'مواجهة الأمور تدريجيًا، بوتيرة تشعر أنها ممكنة، غالبًا ما تنجح أكثر من إجبار نفسك دفعة واحدة.',
      ],
      resources: [
        { label: 'مواجهة المخاوف تدريجيًا', href: '#lifestyle-facing-fears' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
        { label: 'اقتباسات ورؤى الخبراء', href: '#quotes' },
      ],
    },
    {
      id: 'life-change',
      icon: '🔄',
      category: 'life-relationships',
      title: 'تغيير كبير في الحياة',
      acknowledgment: 'التغييرات الكبيرة قد تثير القلق حتى لو كانت تغييرات أردتها — وهذا رد فعل طبيعي جدًا تجاه عدم اليقين.',
      suggestions: [
        'اسمح لنفسك بالشعور بعدم الاستقرار لفترة — التأقلم مع التغيير يستغرق وقتًا.',
        'حاول الحفاظ على روتين صغير أو اثنين ثابتين، كنقطة ارتكاز بينما يتغير كل شيء آخر.',
        'الاعتماد على من تثق بهم خلال فترة الانتقال قد يجعلها تبدو أقل إرهاقًا.',
      ],
      resources: [
        { label: 'نصائح الرأفة بالذات', href: '#lifestyle-self-compassion' },
        { label: 'نصائح التواصل الاجتماعي', href: '#lifestyle-connection' },
        { label: 'العلاج والمساعدة المتخصصة', href: '#therapy' },
      ],
    },
    {
      id: 'waiting-news',
      icon: '⏳',
      category: 'acute',
      title: 'انتظار أخبار أو نتائج مهمة',
      acknowledgment: 'انتظار أمر مهم خارج عن إرادتك من أصعب أنواع القلق على الإطلاق.',
      suggestions: [
        'حاول التخطيط لشيء صغير وممتع خلال فترة الانتظار، بدلاً من التحقق باستمرار.',
        'تمرين التنفس أو مؤقّت الاسترخاء قد يساعدانك على تجاوز اللحظات التي يبدو فيها الانتظار أصعب.',
        'ذكّر نفسك أن النتيجة لن تتغير بمقدار قلقك — طاقتك أفضل استثمارًا في الاعتناء بنفسك الآن.',
      ],
      resources: [
        { label: 'تمرين التنفس', href: '#tool-breathing' },
        { label: 'مؤقّت الاسترخاء', href: '#tool-relaxation-timer' },
        { label: 'فهم القلق', href: '#understanding' },
      ],
    },
  ],
}

export const situationIds = situations.en.map((s) => s.id)
