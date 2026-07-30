'use client';

type SoundKey =
  | 'renomear'
  | 'acertar'
  | 'comprar'
  | 'selecionar'
  | 'equipar'
  | 'sem_moedas'
  | 'erro'
  | 'open'
  | 'suspense'
  | 'click'
  | 'hover';

interface SoundAsset {
  path: string;
  volume: number;
}

const SOUND_ASSETS: Record<SoundKey, SoundAsset> = {
  renomear: { path: '', volume: 0.6 }, // Mario coin
  acertar: { path: '', volume: 0.8 }, // Mario power-up
  comprar: { path: '', volume: 0.6 }, // Mario coin
  selecionar: { path: '', volume: 0.7 }, // Mario jump
  equipar: { path: '', volume: 0.7 }, // Mario jump
  sem_moedas: { path: '', volume: 0.5 }, // Mario fail
  erro: { path: '', volume: 0.5 }, // Mario fail
  open: { path: '', volume: 0.7 }, // Mario opening
  suspense: { path: '', volume: 0.6 }, // Mario opening
  click: { path: '', volume: 0.5 }, // Mario click
  hover: { path: '', volume: 0.3 }, // Mario hover
};

class AudioManager {
  private enabled: boolean = true;
  private masterVolume: number = 1.0;
  private currentAudio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;

  constructor() {
    this.loadPreferences();
  }

  private initAudioContext(): void {
    if (this.audioContext) {
      // Se já existe, verificar se está suspenso (mobile)
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch((e) => {
          console.warn('⚠️ Erro ao resumir AudioContext:', e);
        });
      }
      return;
    }
    if (typeof window === 'undefined') return;
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      console.log('✅ AudioContext inicializado');

      // Se criar já suspended (mobile), resumir
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch((e) => {
          console.warn('⚠️ Erro ao resumir AudioContext:', e);
        });
      }
    } catch (e) {
      console.error('❌ Erro ao criar AudioContext:', e);
    }
  }

  private loadPreferences() {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem('gds_audio_prefs');
      if (stored) {
        const prefs = JSON.parse(stored);
        this.enabled = prefs.enabled ?? true;
        this.masterVolume = prefs.masterVolume ?? 1.0;
      }
    } catch (e) {
      console.warn('Erro ao carregar preferências:', e);
    }
  }

  private savePreferences() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(
        'gds_audio_prefs',
        JSON.stringify({
          enabled: this.enabled,
          masterVolume: this.masterVolume,
        })
      );
    } catch (e) {
      console.warn('Erro ao salvar preferências:', e);
    }
  }

  private playNote(freq: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(this.audioContext.destination);

    gain.gain.setValueAtTime(0.6 * this.masterVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

    osc.start(now);
    osc.stop(now + duration);
  }

  private playSynthesizedSound(soundKey: SoundKey, volume: number): void {
    if (!this.audioContext) return;
    const now = this.audioContext.currentTime;

    try {
      if (soundKey === 'open' || soundKey === 'suspense') {
        // Som de abertura Mario Bros - Power-up theme
        // Notas: E5, G5, E6
        const notes = [
          { freq: 330, duration: 0.15 },  // E
          { freq: 495, duration: 0.15 },  // G
          { freq: 660, duration: 0.3 },   // E alta
        ];

        notes.forEach((note, idx) => {
          const startTime = now + idx * 0.15;
          const osc = this.audioContext!.createOscillator();
          const gain = this.audioContext!.createGain();

          osc.type = 'square';
          osc.frequency.value = note.freq;
          osc.connect(gain);
          gain.connect(this.audioContext!.destination);

          gain.gain.setValueAtTime(0.5 * this.masterVolume, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);

          osc.start(startTime);
          osc.stop(startTime + note.duration);
        });
      } else if (soundKey === 'acertar') {
        // Som de power-up Mario - escalinha
        const notes = [
          { freq: 523, duration: 0.1 },   // C5
          { freq: 659, duration: 0.1 },   // E5
          { freq: 784, duration: 0.2 },   // G5
        ];

        notes.forEach((note, idx) => {
          const startTime = now + idx * 0.1;
          const osc = this.audioContext!.createOscillator();
          const gain = this.audioContext!.createGain();

          osc.type = 'square';
          osc.frequency.value = note.freq;
          osc.connect(gain);
          gain.connect(this.audioContext!.destination);

          gain.gain.setValueAtTime(0.5 * this.masterVolume, startTime);
          gain.gain.exponentialRampToValueAtTime(0.01, startTime + note.duration);

          osc.start(startTime);
          osc.stop(startTime + note.duration);
        });
      } else if (soundKey === 'selecionar' || soundKey === 'equipar') {
        // Som de pulo Mario
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'square';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.setValueAtTime(0.5 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);

        osc.start(now);
        osc.stop(now + 0.1);
      } else if (soundKey === 'comprar' || soundKey === 'renomear') {
        // Som de moeda Mario - "ding"
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 784; // G5
        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.setValueAtTime(0.5 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
      } else if (soundKey === 'erro' || soundKey === 'sem_moedas') {
        // Som de falha Mario
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(50, now + 0.3);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.setValueAtTime(0.4 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

        osc.start(now);
        osc.stop(now + 0.3);
      } else if (soundKey === 'click') {
        // Som leve de click
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 600;
        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.setValueAtTime(0.3 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.start(now);
        osc.stop(now + 0.08);
      } else if (soundKey === 'hover') {
        // Som bem leve de hover
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.type = 'sine';
        osc.frequency.value = 400;
        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        gain.gain.setValueAtTime(0.2 * this.masterVolume, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (error) {
      console.warn(`Erro ao sintetizar som ${soundKey}:`, error);
    }
  }

  play(soundKey: SoundKey): void {
    if (!this.enabled) return;

    try {
      // Garantir que AudioContext foi inicializado
      this.initAudioContext();

      // Tentar resumir AudioContext se estiver suspenso (mobile)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume().catch((e) => {
          console.warn('⚠️ AudioContext ainda está suspenso:', e);
        });
      }

      // Parar som anterior
      if (this.currentAudio) {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      }

      const asset = SOUND_ASSETS[soundKey];
      if (!asset) {
        console.warn(`Som não encontrado: ${soundKey}`);
        return;
      }

      console.log(`🔊 Reproduzindo som: ${soundKey}`);

      // Se é um som sintetizado (path vazio)
      if (!asset.path) {
        this.playSynthesizedSound(soundKey, asset.volume);
        return;
      }

      // Criar novo Audio element (fallback para arquivos reais)
      const audio = new Audio(asset.path);
      audio.volume = (asset.volume * this.masterVolume) / 2;
      audio.play().catch((err) => {
        console.warn(`Erro ao reproduzir ${soundKey}:`, err);
      });

      this.currentAudio = audio;
    } catch (error) {
      console.error(`Erro ao reproduzir som ${soundKey}:`, error);
    }
  }

  // Método público para desbloqueio de áudio (mobile) - deve ser chamado em uma interação
  unblockAudio(): void {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        console.log('✅ Áudio desbloqueado!');
      }).catch((e) => {
        console.error('❌ Erro ao desbloquear áudio:', e);
      });
    }
  }

  stop(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio = null;
    }
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    this.savePreferences();
    if (!enabled) this.stop();
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  setMasterVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
    this.savePreferences();
  }

  getMasterVolume(): number {
    return this.masterVolume;
  }
}

// Singleton
let audioManagerInstance: AudioManager | null = null;

export function getAudioManager(): AudioManager {
  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager();
  }
  return audioManagerInstance;
}

export type { SoundKey };
