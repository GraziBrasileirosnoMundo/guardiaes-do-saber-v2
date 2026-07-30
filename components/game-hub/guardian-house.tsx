'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Home, Lock } from 'lucide-react';
import { Perfil } from '@/types';
import { HOUSE_ITEMS, calcularProgressoCasa } from '@/data/house-items';
import { COMPANIONS } from '@/data/companions';
import { ProgressBarWidget } from '@/components/ui/progress-bar-widget';
import { GameButton } from '@/components/ui/game-button';

interface GuardianHouseProps {
  perfil: Perfil;
  onAbrirLoja: () => void;
  is2: boolean;
}

export function GuardianHouse({ perfil, onAbrirLoja, is2 }: GuardianHouseProps) {
  const itensComprados = perfil.colecao || [];
  const progressoCasa = calcularProgressoCasa(itensComprados);

  // Companheiros libertados (baseado em amigos - simplificado: metade dos itens)
  const numCompanheirosLivre = Math.floor(itensComprados.length / 3); // 1 companheiro a cada 3 itens
  const companheirosDisp = COMPANIONS.slice(0, numCompanheirosLivre);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-gradient-to-br from-emerald-900/30 to-blue-900/30 rounded-2xl p-5 border border-emerald-500/30"
    >
      {/* === HEADER === */}
      <div className="flex items-center gap-3 mb-5">
        <Home className="w-6 h-6 text-emerald-400" />
        <div className="flex-1">
          <h3 className="font-display font-bold text-emerald-300">Casa do {perfil.nomeGuardiao}</h3>
          <p className="text-xs text-gray-400">{itensComprados.length}/{HOUSE_ITEMS.length} itens decorados</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAbrirLoja}
          className="flex items-center gap-2 px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/50 rounded-lg transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold">Loja</span>
        </motion.button>
      </div>

      {/* === PROGRESSO === */}
      <ProgressBarWidget
        label="Progresso da Casa"
        percentage={progressoCasa}
        color="green"
        icon="🏠"
        showPercentage
      />

      {/* === GRID DE ITENS === */}
      <div className="mt-5">
        <p className="text-xs text-gray-400 mb-3">Clica na loja para comprar mais itens! →</p>
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
          {HOUSE_ITEMS.slice(0, 20).map((item) => {
            const comprado = itensComprados.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={comprado ? { scale: 1.15 } : {}}
                className={`relative flex items-center justify-center rounded-lg p-2 transition-all cursor-pointer group ${
                  comprado
                    ? `bg-gradient-to-br ${item.corGradient} shadow-lg shadow-emerald-500/50`
                    : 'bg-slate-800/50 border border-slate-700/30 opacity-50'
                }`}
              >
                <span className="text-3xl">{item.emoji}</span>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block"
                >
                  <div className="bg-slate-950 border border-emerald-500/50 rounded-lg px-2 py-1 text-center whitespace-nowrap">
                    <p className="text-xs font-semibold text-emerald-300">{item.nome}</p>
                    <p className="text-[10px] text-gray-400">{item.preco} moedas</p>
                  </div>
                </motion.div>

                {/* Status */}
                {!comprado && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute top-1 right-1 text-lg"
                  >
                    🔒
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* === COMPANHEIROS === */}
      {companheirosDisp.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-5 pt-5 border-t border-emerald-500/20">
          <p className="text-xs text-gray-400 mb-3">✨ Companheiros da Casa:</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {companheirosDisp.map((comp) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center gap-1 p-3 bg-blue-900/40 border border-blue-500/30 rounded-lg cursor-pointer group"
              >
                <motion.span
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="text-2xl"
                >
                  {comp.emoji}
                </motion.span>
                <p className="text-[10px] text-center text-blue-200 font-semibold truncate">{comp.nome}</p>

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10"
                >
                  <div className="bg-slate-950 border border-blue-500/50 rounded-lg px-2 py-1 text-center">
                    <p className="text-xs font-semibold text-blue-300">{comp.descricao}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Incentivo para libertar mais */}
          {companheirosDisp.length < COMPANIONS.length && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-xs text-gray-400 mt-3 text-center">
              Compra mais itens para libertar {COMPANIONS.length - companheirosDisp.length} companheiros! 🎁
            </motion.p>
          )}
        </motion.div>
      )}

      {/* === BOTÃO LOJA === */}
      <div className="mt-5 pt-5 border-t border-emerald-500/20">
        <GameButton variant="gold" size="sm" fullWidth onClick={onAbrirLoja}>
          <ShoppingBag className="w-4 h-4 inline mr-1" /> Abrir Loja Completa
        </GameButton>
      </div>
    </motion.div>
  );
}
