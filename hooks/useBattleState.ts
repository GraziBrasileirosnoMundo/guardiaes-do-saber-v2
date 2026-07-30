'use client';
import { useState } from 'react';
import { BatalhaEstado } from '@/types';

export function useBattleState() {
  const [estado, setEstado] = useState<BatalhaEstado | null>(null);
  const [feedback, setFeedback] = useState<{ tipo: 'acerto' | 'erro'; explicacao?: string } | null>(null);
  const [batalhaTerminada, setBatalhaTerminada] = useState(false);

  return {
    estado,
    setEstado,
    feedback,
    setFeedback,
    batalhaTerminada,
    setBatalhaTerminada,
  };
}
