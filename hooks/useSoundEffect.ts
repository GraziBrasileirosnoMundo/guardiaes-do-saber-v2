import { useCallback } from 'react';

type SoundType = 'click' | 'hover' | 'success' | 'unlock' | 'complete' | 'open' | 'error' | 'coin';

export function useSoundEffect() {
  const playSound = useCallback((soundType: SoundType) => {
    try {
      // Criar audio context
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const now = audioContext.currentTime;

      switch (soundType) {
        case 'click':
          // Som de clique (beep curto)
          playBeep(audioContext, now, 400, 0.05);
          break;
        case 'hover':
          // Som de hover (beep muito curto e agudo)
          playBeep(audioContext, now, 600, 0.02);
          break;
        case 'success':
          // Som de sucesso (2 beeps)
          playBeep(audioContext, now, 500, 0.1);
          playBeep(audioContext, now + 0.15, 650, 0.1);
          break;
        case 'unlock':
          // Som de desbloqueio (ascendente)
          playBeep(audioContext, now, 400, 0.1);
          playBeep(audioContext, now + 0.12, 550, 0.1);
          playBeep(audioContext, now + 0.24, 700, 0.15);
          break;
        case 'complete':
          // Som de conclusão (3 beeps)
          playBeep(audioContext, now, 523, 0.1); // C5
          playBeep(audioContext, now + 0.15, 659, 0.1); // E5
          playBeep(audioContext, now + 0.3, 784, 0.15); // G5
          break;
        case 'open':
          // Som de abrir (whoosh)
          playWhoosh(audioContext, now);
          break;
        case 'error':
          // Som de erro (grave)
          playBeep(audioContext, now, 200, 0.1);
          playBeep(audioContext, now + 0.1, 150, 0.1);
          break;
        case 'coin':
          // Som de moeda tipo Sonic (ding ding ding!)
          playBeep(audioContext, now, 880, 0.08); // A5
          playBeep(audioContext, now + 0.1, 1047, 0.08); // C6
          playBeep(audioContext, now + 0.2, 1319, 0.08); // E6
          playBeep(audioContext, now + 0.3, 1568, 0.12); // G6
          break;
      }
    } catch (e) {
      // Se falhar, ignora silenciosamente
      console.debug('Som desativado:', e);
    }
  }, []);

  return { playSound };
}

function playBeep(audioContext: AudioContext, startTime: number, frequency: number, duration: number) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  gainNode.gain.setValueAtTime(0.1, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

function playWhoosh(audioContext: AudioContext, startTime: number) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();

  oscillator.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.type = 'sawtooth';
  oscillator.frequency.setValueAtTime(800, startTime);
  oscillator.frequency.exponentialRampToValueAtTime(200, startTime + 0.3);

  filter.type = 'highpass';
  filter.frequency.value = 1000;

  gainNode.gain.setValueAtTime(0.15, startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3);

  oscillator.start(startTime);
  oscillator.stop(startTime + 0.3);
}
