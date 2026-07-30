'use client';
import { motion } from 'framer-motion';
import { Star, Coins, Flame } from 'lucide-react';
import { GuardianAvatar } from '@/components/guardians/guardian-avatar';
import { GuardianSpeech } from '@/components/guardians/guardian-speech';
import { CountUp } from '@/components/ui/count-up';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Perfil } from '@/types';
import { proximosObjetivos } from '@/lib/objectives';
import type { FalaGuardiao } from '@/data/guardian-messages';

interface GameHubHeaderProps {
  perfil: Perfil;
  nivelInfo: { nivel: number; progresso: number } | null;
  is2: boolean;
  saudacao: FalaGuardiao;
}

export function GameHubHeader({ perfil, nivelInfo, is2, saudacao }: GameHubHeaderProps) {
  const fontSize = is2 ? 'text-xl' : 'text-lg';
  const objetivos = proximosObjetivos(perfil);

  return (
    <div className="relative overflow-hidden mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-yellow-500/10 to-orange-500/10 blur-3xl" />

      <div className="relative px-4 py-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 mb-6">
          <GuardianAvatar perfil={perfil} size={is2 ? 78 : 68} />
          <div className="flex-1 pt-1">
            <div className="mb-2"><GuardianSpeech texto={saudacao.texto} is2={is2} /></div>
            <h2 className={`font-display font-bold text-white ${is2 ? 'text-xl' : 'text-lg'} leading-tight`}>{perfil?.apelido ?? 'Jogador'}</h2>
            <p className="text-xs text-gray-400">{perfil?.ano ?? 2}.º Ano — {perfil?.nomeGuardiao ?? ''}</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-purple-900/30 rounded-xl p-3 text-center border border-purple-700/20">
            <Star className="w-5 h-5 text-purple-400 mx-auto mb-1" />
            <p className={`font-bold text-white ${fontSize}`}>Nível {nivelInfo?.nivel ?? 1}</p>
          </div>
          <div className="bg-amber-900/30 rounded-xl p-3 text-center border border-amber-700/20">
            <Coins className="w-5 h-5 text-amber-400 mx-auto mb-1" />
            <p className={`font-bold text-white ${fontSize}`}><CountUp value={perfil?.moedas ?? 0} /></p>
          </div>
          <div className="bg-orange-900/30 rounded-xl p-3 text-center border border-orange-700/20">
            <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className={`font-bold text-white ${fontSize}`}>{perfil?.sequenciaAtual ?? 0} dias</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-4">
          <ProgressBar value={nivelInfo?.progresso ?? 0} max={100} color="#7c3aed" height={14} label={`XP: ${perfil?.xp ?? 0}`} showPercent />
        </motion.div>

        {objetivos.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} className="space-y-2 mb-4">
            {objetivos.slice(0, 2).map((o, i) => (
              <div key={i} className="flex items-center gap-2 text-sm bg-slate-800/40 rounded-lg px-3 py-2 border border-purple-700/10">
                <span className="text-lg">{o.icone}</span>
                <span className="text-gray-200">{o.texto}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
