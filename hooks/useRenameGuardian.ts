import { useCallback } from 'react';
import { Perfil } from '@/types';
import { registarEvento } from '@/lib/metrics';

interface UseRenameGuardianReturn {
  renameGuardian: (perfil: Perfil, newName: string) => Perfil;
}

/**
 * Hook para alterar o nome do Guardião
 * Valida e persiste a mudança
 */
export function useRenameGuardian(): UseRenameGuardianReturn {
  const renameGuardian = useCallback((perfil: Perfil, newName: string): Perfil => {
    const trimmed = newName.trim();

    if (trimmed.length === 0) {
      console.warn('Nome do Guardião não pode estar vazio');
      return perfil;
    }

    if (trimmed.length > 20) {
      console.warn('Nome do Guardião ultrapassou 20 caracteres');
      return { ...perfil, nomeGuardiao: trimmed.substring(0, 20) };
    }

    // Registrar evento
    registarEvento(perfil.id, 'item_desbloqueado', {
      nomeAntigo: perfil.nomeGuardiao,
      nomeNovo: trimmed,
    });

    return {
      ...perfil,
      nomeGuardiao: trimmed,
      atualizadoEm: new Date().toISOString(),
    };
  }, []);

  return { renameGuardian };
}
