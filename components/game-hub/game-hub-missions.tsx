'use client';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { Profile, Mission, TipoMissao } from '@/types';
import { MissionRow } from '@/components/game/mission-row';
import { reclamarMissao, podeReclamar } from '@/lib/missions';
import { registarEvento } from '@/lib/metrics';
import { useSoundEffect } from '@/hooks/useSoundEffect';

interface GameHubMissionsProps {
  perfil: Profile;
  is2: boolean;
  onUpdateProfile: (perfil: Profile) => void;
}

export function GameHubMissions({ perfil, is2, onUpdateProfile }: GameHubMissionsProps) {
  const { playSound } = useSoundEffect();

  const handleReclamar = useCallback((tipo: TipoMissao) => {
    const { perfil: updated, recompensa } = reclamarMissao(perfil, tipo);
    if (recompensa) {
      playSound('success');
      onUpdateProfile(updated);
      registarEvento(perfil.id, 'missao_concluida', { tipo, reclamada: true });
    }
  }, [perfil, onUpdateProfile, playSound]);

  const temReclamavel = podeReclamar(perfil.missaoDiaria) || podeReclamar(perfil.missaoSemanal) || podeReclamar(perfil.missaoMensal);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }} className="bg-slate-800/30 rounded-2xl p-4 mb-5 border border-purple-700/15 mx-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-3">
        <Target className="w-5 h-5 text-amber-400" />
        <h3 className="font-display font-bold text-purple-200">Missões</h3>
        {temReclamavel && <span className="ml-auto text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">Recompensa!</span>}
      </div>
      <div className="space-y-2">
        <MissionRow titulo="Diária" missao={perfil.missaoDiaria ?? null} onReclamar={() => handleReclamar('diaria')} is2={is2} />
        <MissionRow titulo="Semanal" missao={perfil.missaoSemanal ?? null} onReclamar={() => handleReclamar('semanal')} is2={is2} />
        <MissionRow titulo="Mensal" missao={perfil.missaoMensal ?? null} onReclamar={() => handleReclamar('mensal')} is2={is2} />
      </div>
    </motion.div>
  );
}
