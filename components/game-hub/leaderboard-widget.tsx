'use client';

import { motion } from 'framer-motion';
import { Trophy, TrendingUp } from 'lucide-react';
import { Perfil } from '@/types';

interface LeaderboardWidgetProps {
  perfilAtual: Perfil;
  todosOsPerfis: Perfil[];
  is2: boolean;
}

export function LeaderboardWidget({ perfilAtual, todosOsPerfis, is2 }: LeaderboardWidgetProps) {
  // Ranking por XP (simplificado)
  const ranking = [...todosOsPerfis]
    .sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
    .slice(0, 5);

  const posicaoAtual = ranking.findIndex((p) => p.id === perfilAtual.id) + 1 || ranking.length + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-amber-900/30 to-orange-900/30 rounded-2xl p-5 border border-amber-500/30"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-amber-400" />
        <h3 className="font-display font-bold text-amber-300">Ranking Semanal</h3>
        <div className="ml-auto text-sm font-bold text-amber-300">Posição: #{posicaoAtual}</div>
      </div>

      {/* Lista de Top 5 */}
      <div className="space-y-2">
        {ranking.map((p, idx) => {
          const isActual = p.id === perfilAtual.id;
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                isActual
                  ? 'bg-purple-600/40 border border-purple-400/50'
                  : 'bg-slate-800/30 border border-slate-700/30 hover:bg-slate-800/50'
              }`}
            >
              {/* Posição */}
              <div className="w-8 text-center">
                <span className="font-bold text-lg">
                  {idx === 0 && '🥇'}
                  {idx === 1 && '🥈'}
                  {idx === 2 && '🥉'}
                  {idx >= 3 && `#${idx + 1}`}
                </span>
              </div>

              {/* Nome */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isActual ? 'text-purple-200' : 'text-gray-300'}`}>{p.apelido}</p>
                <p className="text-xs text-gray-500">{p.nomeGuardiao}</p>
              </div>

              {/* XP */}
              <div className="text-right">
                <motion.p
                  className={`text-sm font-bold ${isActual ? 'text-purple-300' : 'text-amber-300'}`}
                  animate={isActual ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {p.xp ?? 0} XP
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-4 pt-3 border-t border-amber-500/20">
        <p className="text-xs text-gray-400 text-center">Ranking reseta a cada segunda-feira! 🔄</p>
      </motion.div>
    </motion.div>
  );
}
