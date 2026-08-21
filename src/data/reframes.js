// Original, written for this site — short, warm, non-diagnostic reminders.
// A new one is deterministically selected each calendar day.

export const reframes = {
  en: [
    "You don't have to figure out your whole life today. Just the next hour.",
    'Rest is not the same as giving up.',
    'You can be anxious and still take one small step forward.',
    'Not every thought deserves your full attention.',
    "It's okay to not have it all together right now.",
    "Progress doesn't have to look impressive to count.",
    "You've gotten through hard days before, even when it didn't feel possible.",
    "You don't need to earn rest by finishing everything first.",
    "Some days are just about getting through, and that's enough.",
    "Your worth isn't measured by how productive today was.",
    "It's alright to ask for help before you're at your limit.",
    'You can care about something and still let it go for now.',
    'Small steps still move you forward.',
    "You're allowed to change your mind about what you can handle today.",
    "Discomfort doesn't always mean something is wrong.",
    "You don't have to solve everything to feel a little better.",
    "One calm breath doesn't fix everything, but it's still worth taking.",
    "You're doing better than your anxious thoughts are telling you.",
    "It's okay to slow down before you burn out, not just after.",
    "You are not behind. There is no schedule you're failing to keep.",
  ],
  ar: [
    'لست مضطرًا لحل حياتك كلها اليوم. فقط الساعة القادمة.',
    'الراحة ليست استسلامًا.',
    'يمكنك أن تكون قلقًا وأن تخطو خطوة صغيرة إلى الأمام في الوقت نفسه.',
    'ليست كل فكرة تستحق انتباهك الكامل.',
    'لا بأس ألا يكون كل شيء منظمًا الآن.',
    'التقدّم لا يحتاج أن يبدو مبهرًا ليُحتسب.',
    'تجاوزت أيامًا صعبة من قبل، حتى حين شعرت أن ذلك مستحيل.',
    'لست مضطرًا لتستحق الراحة بإنهاء كل شيء أولًا.',
    'بعض الأيام تدور فقط حول تجاوزها، وهذا كافٍ.',
    'قيمتك لا تُقاس بمدى إنتاجيتك اليوم.',
    'لا بأس بطلب المساعدة قبل أن تصل إلى حدّك الأقصى.',
    'يمكنك أن تهتم بأمر ما وتتركه جانبًا الآن.',
    'الخطوات الصغيرة ما زالت تحرّكك إلى الأمام.',
    'يحق لك أن تغيّر رأيك حول ما يمكنك تحمّله اليوم.',
    'الانزعاج لا يعني دائمًا أن هناك خطأً ما.',
    'لست مضطرًا لحل كل شيء لتشعر بتحسن ولو قليلًا.',
    'نَفَس هادئ واحد لا يُصلح كل شيء، لكنه يستحق أن تأخذه.',
    'أنت أفضل حالًا مما تخبرك به أفكارك القلقة.',
    'لا بأس بالتباطؤ قبل أن تُرهق نفسك، لا بعد ذلك فقط.',
    'أنت لست متأخرًا. لا يوجد جدول زمني تفشل في الالتزام به.',
  ],
}

export function todaysReframe(lang) {
  const list = reframes[lang]
  const dateKey = new Date().toDateString()
  let hash = 0
  for (let i = 0; i < dateKey.length; i += 1) {
    hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0
  }
  return list[hash % list.length]
}
