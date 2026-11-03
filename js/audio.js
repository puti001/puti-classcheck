/**
 * Puti Classroomscreen - Audio Synthesis Engine
 * Uses Web Audio API for zero-dependency, instant, pleasant acoustic feedback.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem('puti_cs_muted') === 'true';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem('puti_cs_muted', this.muted);
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Soft click / tick
  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Pleasant bubble pop for UI switches & additions
  playPop() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(900, now + 0.07);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.07);
  }

  // Traffic light bell ding
  playBell() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now); // A5
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.6);
  }

  // Timer Finished - warm two-tone chime
  playChime() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + idx * 0.12;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.22, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.8);
    });
  }

  // Fanfare / victory celebration
  playFanfare() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const melody = [
      { f: 523.25, d: 0.1 },  // C5
      { f: 659.25, d: 0.1 },  // E5
      { f: 783.99, d: 0.1 },  // G5
      { f: 1046.50, d: 0.35 } // C6
    ];

    let t = this.ctx.currentTime;
    melody.forEach((note) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + note.d);
      t += note.d * 0.9;
    });
  }

  // Rapid dice rattle sound
  playDiceRoll() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        this.playTick();
      }, i * 45);
    }
  }

  // Warning buzz (sound meter noise threshold exceeded)
  playWarningBuzz() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.linearRampToValueAtTime(220, now + 0.3);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // ==========================================
  // 課堂即時互動音效庫 (Clap, Cheer, Correct, Wrong, Fireworks)
  // ==========================================

  // 1. 熱烈鼓掌 (長達 2.5 秒、音量充沛的全班齊聲鼓掌)
  playClap() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    // 提高掌聲密集度至 65 次擊掌疊加，並調大音量振幅 (大幅增強實測音量)
    const duration = 2.4;
    const totalClaps = 65;

    for (let i = 0; i < totalClaps; i++) {
      const delay = Math.pow(Math.random(), 1.05) * duration;
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.06);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);

        for (let j = 0; j < bufferSize; j++) {
          // 雙重共振脈衝衰減，模擬厚實的手掌碰撞聲音
          data[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.22));
        }

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        // 雙濾波：低頻肉質手掌共鳴 (350Hz) + 中頻脆擊 (1200Hz)
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 650 + Math.random() * 900;
        filter.Q.value = 1.4;

        const gain = this.ctx.createGain();
        const progress = delay / duration;
        const env = Math.sin(progress * Math.PI);
        // 音量增益提升至 0.35 ~ 0.65，確保大教室音量清晰響亮
        const vol = (0.35 + Math.random() * 0.3) * Math.max(0.35, env);

        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(now);
      }, delay * 1000);
    }
  }

  // 2. 歡呼尖叫 (長達 2.5 秒全班熱血歡騰 + 勝利和弦 + 掌聲齊鳴)
  playCheer() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const duration = 2.5;

    // 多層次群體興奮升調人聲模擬 (合唱群管共振)
    const vocalPitches = [
      { base: 330, peak: 440 }, // E4 -> A4
      { base: 392, peak: 523 }, // G4 -> C5
      { base: 523, peak: 698 }, // C5 -> F5
      { base: 659, peak: 880 }, // E5 -> A5
      { base: 784, peak: 1046 } // G5 -> C6
    ];

    vocalPitches.forEach((pitch, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = i % 2 === 0 ? 'triangle' : 'sine';
      // 升調曲線
      osc.frequency.setValueAtTime(pitch.base, now);
      osc.frequency.exponentialRampToValueAtTime(pitch.peak, now + 0.7);
      osc.frequency.linearRampToValueAtTime(pitch.peak * 0.98, now + duration);

      // 人聲顫音 (Vibrato)
      const vibrato = this.ctx.createOscillator();
      const vibratoGain = this.ctx.createGain();
      vibrato.frequency.value = 5.5 + i * 0.4;
      vibratoGain.gain.value = 14;
      vibrato.connect(osc.frequency);
      vibrato.start(now + 0.3);
      vibrato.stop(now + duration);

      // 音量波封 (湧入 -> 狂歡盛宴 -> 慢慢落下)
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.5);
      gain.gain.linearRampToValueAtTime(0.12, now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    });

    // 伴隨長達 2 秒的熱烈歡呼掌聲
    this.playClap();
    setTimeout(() => this.playClap(), 400);
  }

  // 3. 答對啦！(清脆叮咚兩聲)
  playCorrect() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    gain1.gain.setValueAtTime(0.22, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.25);

    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880.00, now + 0.15); // A5
    gain2.gain.setValueAtTime(0.28, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.65);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.15);
    osc2.stop(now + 0.65);
  }

  // 4. 答錯了 (幽默低沉嘟嘟)
  playWrong() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.16].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(174.61, now + offset); // F3
      gain.gain.setValueAtTime(0.18, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + offset);
      osc.stop(now + offset + 0.14);
    });
  }

  // 5. 放煙火 (升空咻與盛大爆炸開花)
  playFireworks() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // 升空口哨嘯音 (whistle)
    const whistle = this.ctx.createOscillator();
    const whistleGain = this.ctx.createGain();
    whistle.type = 'sine';
    whistle.frequency.setValueAtTime(400, now);
    whistle.frequency.exponentialRampToValueAtTime(2200, now + 0.4);
    whistleGain.gain.setValueAtTime(0.15, now);
    whistleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    whistle.connect(whistleGain);
    whistleGain.connect(this.ctx.destination);
    whistle.start(now);
    whistle.stop(now + 0.4);

    // 綻放炸裂
    setTimeout(() => {
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.5;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.18));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, t);
      filter.frequency.exponentialRampToValueAtTime(150, t + 0.45);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(t);

      // 同步引爆彩帶粒子
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
      }
    }, 400);
  }
}

window.soundEngine = new SoundEngine();
