'use client';
import { useCallback } from 'react';
import { Perfil, BatalhaEstado } from '@/types';
import { calcularNivel, xpParaProximoNivel } from '@/lib/gameLogic';
import { processarBatalha, ResultadoBatalha } from '@/lib/battleFlow';

export type { ResultadoBatalha } from '@/lib/battleFlow';

export function useGame() {
  const getNivelInfo = useCallback((xp: number) => {
    return {
      nivel: calcularNivel(xp),
      ...xpParaProximoNivel(xp),
    };
  }, []);

  const finalizarBatalha = useCallback((perfil: Perfil, estado: BatalhaEstado, duracao: number): ResultadoBatalha => {
    return processarBatalha(perfil, estado, duracao);
  }, []);

  return { getNivelInfo, finalizarBatalha };
}
