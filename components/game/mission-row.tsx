'use client';
import { motion } from 'framer-motion';
import { MissaoEstado } from '@/types';
import { podeReclamar, missaoConcluida } from '@/lib/missions';
import { Coins, Check, Gift } from 'lucide-react';

interface MissionRowProps {
  titulo: string;
  missao: MissaoEstado | null;
  onReclamar?: () => void;
  is2?: boolean;
}

export function MissionRow({ titulo, missao, onReclamar, is2 = false }: MissionRowProps) {
  if (!missao) return null;
  const pct = Math.min(100, Math.round((missao.progresso / Math.max(1, missao.meta)) * 100));
  const reclamavel = podeReclamar(missao);
  const concluida = missaoConcluida(missao);

  return (
    <div className="bg-slate-800/50 rounded-xl p-3 border border-purple-700/10">
      <div className="flex items-center justify-between mb-1.5">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-purple-400 font-bold">{titulo}</p>
          <p className={`text-white font-semibold ${is2 ? 'text-sm' : 'text-xs'}`}>{missao.descricao}</p>
        </div>
        <div className="flex items-center gap-1 text-amber-300 text-xs font-bold shrink-0">
          <Coins className="w-3.5 h-3.5" /> {missao.recompensaMoedas}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-full overflow-hidden bg-white/10" style={{ height: 8 }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full"
            style={{ background: concluida ? '#10b981' : 'linear-gradient(90deg,#7c3aed,#f59e0b)' }}
          />
        </div>
        <span className="text-[10px] text-gray-400 w-10 text-right">{Math.min(missao.progresso, missao.meta)}/{missao.meta}</span>
      </div>
      {reclamavel && onReclamar && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onReclamar}
          className="mt-2 w-full flex items-center justify-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-lg py-1.5 text-sm"
        >
          <Gift className="w-4 h-4" /> Reclamar recompensa!
        </motion.button>
      )}
      {concluida && !reclamavel && (
        <p className="mt-1.5 text-[11px] text-emerald-400 font-semibold flex items-center gap-1"><Check className="w-3.5 h-3.5" /> Concluída</p>
      )}
    </div>
  );
}
