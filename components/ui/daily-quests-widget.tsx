'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';
import { QuestDaily } from '@/data/daily-quests';

interface DailyQuestsWidgetProps {
  quests: QuestDaily[];
  bonusCompletado: boolean;
}

export function DailyQuestsWidget({ quests, bonusCompletado }: DailyQuestsWidgetProps) {
  const completadas = quests.filter((q) => q.completada).length;
  const todasCompletadas = quests.length > 0 && quests.every((q) => q.completada);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-xl p-4 border border-purple-500/30"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📋</span>
          <div>
            <h3 className="font-display font-bold text-purple-300">Missões do Dia</h3>
            <p className="text-xs text-gray-400">{completadas}/3 completadas</p>
          </div>
        </div>
        {todasCompletadas && (
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-2xl">
            ✨
          </motion.div>
        )}
      </div>

      {/* Quests */}
      <div className="space-y-2">
        {quests.map((quest) => (
          <motion.div
            key={quest.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex items-start gap-3 p-3 rounded-lg transition-all ${
              quest.completada
                ? 'bg-green-900/20 border border-green-500/30'
                : 'bg-slate-800/30 border border-slate-700/30'
            }`}
          >
            {/* Icon/Status */}
            <div className="mt-1">
              {quest.completada ? (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-green-400">
                  <CheckCircle className="w-5 h-5" />
                </motion.div>
              ) : (
                <Circle className="w-5 h-5 text-gray-500" />
              )}
            </div>

            {/* Conteúdo */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-sm text-white">
                  {quest.icone} {quest.titulo}
                </p>
                <span className={`text-xs font-bold px-2 py-1 rounded ${
                  quest.completada ? 'bg-green-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  +{quest.recompensa} moedas
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{quest.descricao}</p>

              {/* Progress Bar */}
              <div className="mt-2 bg-slate-900 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(quest.objetivoAtual / quest.objetivoMeta) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full ${
                    quest.completada
                      ? 'bg-gradient-to-r from-green-500 to-green-400'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500'
                  }`}
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">
                {quest.objetivoAtual}/{quest.objetivoMeta}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bonus Info */}
      {todasCompletadas && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-amber-900/30 border border-amber-500/30 rounded-lg"
        >
          <p className="text-sm font-bold text-amber-300">
            🎁 Bonus Completado! +500 moedas extra!
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
