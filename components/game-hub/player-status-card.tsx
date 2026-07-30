'use client';

import { motion } from 'framer-motion';
import { Flame, Target, Trophy } from 'lucide-react';
import { Perfil } from '@/types';
import { ProgressBarWidget } from '@/components/ui/progress-bar-widget';
import { useStreakMultiplier } from '@/hooks/useStreakMultiplier';

interface PlayerStatusCardProps {
  perfil: Perfil;
  is2: boolean;
}

export function PlayerStatusCard({ perfil, is2 }: PlayerStatusCardProps) {
  const { calcularMultiplicador, descricaoMultiplicador } = useStreakMultiplier();
  const multiplicador = calcularMultiplicador(perfil.streak || 0);

  // Calcula progresso para o próximo nivel
  const xpProximoNivel = Math.floor(perfil.nivel * 1000); // Exemplo: nivel * 1000
  const percentualXP = Math.min((perfil.xp / xpProximoNivel) * 100, 100);

  // Calcula progresso para o próximo item (exemplo: 3000 moedas = um item completo)
  const moedaProximoItem = 3000;
  const percentualMoedas = Math.min((perfil.moedas / moedaProximoItem) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-purple-900/40 to-blue-900/40 rounded-2xl p-5 border border-purple-500/30 space-y-4"
    >
      {/* === STREAK === */}
      {perfil.streak > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-between p-3 bg-red-900/30 rounded-xl border border-red-500/30"
        >
          <div className="flex items-center gap-3">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="text-2xl">
              🔥
            </motion.span>
            <div>
              <p className="text-xs text-gray-400">Vitórias Seguidas</p>
              <p className="font-bold text-red-300">{perfil.streak} de Vitória</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">Multiplicador</p>
            <p className="text-xl font-bold text-amber-300">x{multiplicador.toFixed(1)}</p>
          </div>
        </motion.div>
      )}

      {/* === PROGRESS BARS === */}
      <div className="space-y-3">
        {/* Próximo Nível */}
        <ProgressBarWidget
          label="Próximo Nível"
          percentage={percentualXP}
          color="blue"
          icon="⚡"
          showPercentage
        />

        {/* Próximo Item */}
        <ProgressBarWidget
          label="Próximo Item da Casa"
          percentage={percentualMoedas}
          color="amber"
          icon="💰"
          showPercentage
        />

        {/* Batalhas Completadas */}
        <ProgressBarWidget
          label="Mundos Explorados"
          percentage={Math.min((perfil.batalhasConcluidas / 50) * 100, 100)}
          color="green"
          icon="🗺️"
          showPercentage
        />
      </div>

      {/* === STATS RÁPIDAS === */}
      <div className="grid grid-cols-3 gap-2 pt-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700/30"
        >
          <Trophy className="w-4 h-4 text-amber-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400">Melhor</p>
          <p className="font-bold text-amber-300">{perfil.melhorCombo || 0}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700/30"
        >
          <Target className="w-4 h-4 text-green-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400">Acertos</p>
          <p className="font-bold text-green-300">{perfil.totalAcertos || 0}</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-slate-800/50 rounded-lg p-2 text-center border border-slate-700/30"
        >
          <Flame className="w-4 h-4 text-red-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400">Troféus</p>
          <p className="font-bold text-red-300">{perfil.trofeus?.length || 0}</p>
        </motion.div>
      </div>

      {/* === DICA DE MULTIPLICADOR === */}
      {perfil.streak > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xs text-center text-gray-400 italic"
        >
          {descricaoMultiplicador(perfil.streak)}
        </motion.p>
      )}
    </motion.div>
  );
}
