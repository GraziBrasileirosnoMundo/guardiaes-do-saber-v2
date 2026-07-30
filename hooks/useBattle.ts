'use client';
import { useRef, useEffect } from 'react';
import { Perfil } from '@/types';
import { useBattleState } from '@/hooks/useBattleState';
import { useBattleActions } from '@/hooks/useBattleActions';

export function useBattle(perfil: Perfil | null, onUpdate: (p: Perfil) => void) {
  const { estado, setEstado, feedback, setFeedback, batalhaTerminada, setBatalhaTerminada } = useBattleState();
  const perfilRef = useRef(perfil);
  perfilRef.current = perfil;

  const { iniciarBatalha, responder, abandonar } = useBattleActions({
    estado,
    feedback,
    onSetEstado: setEstado,
    onSetFeedback: setFeedback,
    onSetBatalhaTerminada: setBatalhaTerminada,
    onUpdatePerfil: onUpdate,
  });

  const iniciarBatalhaWrapper = () => iniciarBatalha(perfilRef.current);

  return { estado, feedback, batalhaTerminada, iniciarBatalha: iniciarBatalhaWrapper, responder, abandonar };
}
