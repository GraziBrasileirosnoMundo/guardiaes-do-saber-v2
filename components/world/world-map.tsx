'use client';
import { motion } from 'framer-motion';
import { mundoProgresso } from '@/data/world';

interface WorldMapProps {
  batalhas: number;
  compacto?: boolean;
}

export function WorldMap({ batalhas, compacto = false }: WorldMapProps) {
  const { edificios, completos, total, percentagem, proximo, batalhasParaProximo } = mundoProgresso(batalhas);

  return (
    <div className="w-full">
      {/* Barra global do mundo */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-bold text-purple-200">O teu Mundo</span>
        <span className="text-xs text-gray-400">{completos}/{total} construídos</span>
      </div>
      <div className="w-full rounded-full overflow-hidden bg-white/10 mb-3" style={{ height: 8 }}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentagem}%` }} transition={{ duration: 0.6 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-purple-500 to-amber-400" />
      </div>

      <div className={`grid gap-2 ${compacto ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {edificios.map((e, i) => {
          const bloqueado = e.estado === 'bloqueado';
          const construindo = e.estado === 'em_construcao';
          return (
            <motion.div
              key={e.edificio.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              className="relative rounded-xl p-2 flex flex-col items-center text-center border"
              style={{
                borderColor: e.estado === 'completo' ? 'rgba(251,191,36,0.4)' : 'rgba(124,58,237,0.15)',
                background: e.estado === 'completo' ? 'rgba(251,191,36,0.08)' : 'rgba(15,23,42,0.5)',
              }}
            >
              <div className="text-3xl" style={{ filter: bloqueado ? 'grayscale(1) brightness(0.5)' : construindo ? 'grayscale(0.4) opacity(0.85)' : 'none' }}>
                {bloqueado ? '🔒' : e.edificio.icone}
              </div>
              <p className="text-[10px] font-semibold text-white leading-tight mt-1">{e.edificio.nome}</p>
              {construindo && (
                <>
                  <div className="w-full rounded-full overflow-hidden bg-white/10 mt-1" style={{ height: 4 }}>
                    <div className="h-full bg-amber-400" style={{ width: `${e.progresso}%` }} />
                  </div>
                  <span className="text-[9px] text-amber-300 mt-0.5">🏗️ {e.progresso}%</span>
                </>
              )}
              {e.estado === 'completo' && <span className="text-[9px] text-emerald-400 mt-0.5">Concluído ✓</span>}
              {bloqueado && <span className="text-[9px] text-gray-500 mt-0.5">{e.edificio.batalhasDesbloqueio} batalhas</span>}
            </motion.div>
          );
        })}
      </div>

      {proximo && batalhasParaProximo > 0 && (
        <p className="text-xs text-center text-gray-300 mt-3">
          {proximo.estado === 'bloqueado'
            ? <>Falta{batalhasParaProximo === 1 ? '' : 'm'} <b className="text-white">{batalhasParaProximo}</b> {batalhasParaProximo === 1 ? 'batalha' : 'batalhas'} para desbloquear <b className="text-purple-200">{proximo.edificio.nome}</b>!</>
            : <>Falta{batalhasParaProximo === 1 ? '' : 'm'} <b className="text-white">{batalhasParaProximo}</b> {batalhasParaProximo === 1 ? 'batalha' : 'batalhas'} para terminar <b className="text-purple-200">{proximo.edificio.nome}</b>!</>}
        </p>
      )}
      {!proximo && (
        <p className="text-sm text-center text-amber-300 mt-3 font-bold">🎉 Construíste todo o teu mundo!</p>
      )}
    </div>
  );
}
