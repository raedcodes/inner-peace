// A tiny synthesized "pop" using the Web Audio API — no audio file needed,
// so there's nothing to license or ship as an asset.
let audioCtx

export function playPopSound() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (!AudioContextClass) return
    audioCtx ||= new AudioContextClass()

    const now = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(680, now)
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.09)

    gain.gain.setValueAtTime(0.15, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11)

    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start(now)
    osc.stop(now + 0.12)
  } catch {
    // Web Audio unavailable/blocked — vibration + visual feedback still work
  }
}
