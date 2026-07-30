import { useCallback } from 'react';
import { getAudioManager } from '@/lib/audio';

type SoundType = 'click' | 'hover' | 'success' | 'unlock' | 'complete' | 'open' | 'error' | 'coin';

// Mapeamento de SoundType para SoundKey do AudioManager
const soundTypeMap: Record<SoundType, any> = {
  'click': 'click',
  'hover': 'hover',
  'success': 'acertar',
  'unlock': 'equipar',
  'complete': 'complete',
  'open': 'open',
  'error': 'erro',
  'coin': 'comprar',
};

export function useSoundEffect() {
  const playSound = useCallback((soundType: SoundType) => {
    try {
      const audioManager = getAudioManager();
      const soundKey = soundTypeMap[soundType];

      if (soundKey) {
        audioManager.play(soundKey);
      }
    } catch (e) {
      // Se falhar, ignora silenciosamente
      console.debug('Som desativado:', e);
    }
  }, []);

  return { playSound };
}
