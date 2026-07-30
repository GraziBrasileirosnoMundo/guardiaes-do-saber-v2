'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { GameButton } from '@/components/ui/game-button';
import { WorldMap } from '@/components/world/world-map';
import { registarEvento } from '@/lib/metrics';
import { ArrowLeft } from 'lucide-react';

export function WorldScreen() {
  const { activeProfile, loaded } = useProfile();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (activeProfile?.id) registarEvento(activeProfile.id, 'mundo_aberto'); }, [activeProfile?.id]);

  if (!mounted || !loaded || !activeProfile) return <div className="min-h-screen bg-[#0f0e1a]" />;

  const p = activeProfile;

  return (
    <div className="min-h-screen bg-[#0f0e1a] p-4 pb-10">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push('/game')} className="text-gray-400 hover:text-white p-2"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="font-display text-2xl font-bold text-purple-300">O Teu Mundo</h2>
        </div>
        <p className="text-sm text-gray-400 mb-4">Cada batalha que vences ajuda a construir o teu mundo, peça a peça. Continua a jogar para o veres crescer!</p>
        <div className="bg-slate-800/30 rounded-2xl p-4 mb-5 border border-purple-700/15">
          <WorldMap batalhas={p?.batalhasConcluidas ?? 0} />
        </div>
        <GameButton variant="secondary" fullWidth onClick={() => router.push('/game')}>Voltar</GameButton>
      </div>
    </div>
  );
}
