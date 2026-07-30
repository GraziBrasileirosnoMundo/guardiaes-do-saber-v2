'use client';
import { motion } from 'framer-motion';
import { PORTAL_ETAPAS } from '@/data/items';
import { batalhasParaProximaEtapa, progressoDentroEtapa } from '@/lib/gameLogic';

interface PortalVisualProps {
  progress: number;
  etapa: number;
  size?: 'sm' | 'md';
  showProgressText?: boolean;
}

export function PortalVisual({ progress = 0, etapa = 1, size = 'md', showProgressText = false }: PortalVisualProps) {
  const isSm = size === 'sm';
  const w = isSm ? 160 : 240;
  const h = isSm ? 100 : 150;
  const nomeEtapa = PORTAL_ETAPAS?.find((e: any) => (e?.etapa ?? 0) === (etapa ?? 1))?.nome ?? 'Terreno';
  const dentro = progressoDentroEtapa(progress);
  const { batalhas, proximaEtapa } = batalhasParaProximaEtapa(progress);

  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 240 150" width={w} height={h}>
        {/* Ground */}
        <rect x="10" y="120" width="220" height="30" rx="5" fill="#1e1b4b" opacity="0.5" />
        {/* Etapa 1 - Terreno */}
        <rect x="20" y="110" width="200" height="15" rx="3"
          fill={etapa >= 1 ? '#10b981' : '#374151'} opacity={etapa >= 1 ? 0.8 : 0.3} />
        {/* Etapa 2 - Base */}
        <rect x="40" y="85" width="160" height="30" rx="4"
          fill={etapa >= 2 ? '#7c3aed' : '#374151'} opacity={etapa >= 2 ? 0.7 : 0.2} />
        {/* Etapa 3 - Estrutura */}
        <rect x="55" y="55" width="50" height="35" rx="3"
          fill={etapa >= 3 ? '#6366f1' : '#374151'} opacity={etapa >= 3 ? 0.8 : 0.2} />
        <rect x="135" y="55" width="50" height="35" rx="3"
          fill={etapa >= 3 ? '#6366f1' : '#374151'} opacity={etapa >= 3 ? 0.8 : 0.2} />
        {/* Etapa 4 - Energia */}
        {etapa >= 4 && (
          <>
            <line x1="80" y1="55" x2="120" y2="30" stroke="#f59e0b" strokeWidth="3" opacity="0.7">
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
            </line>
            <line x1="160" y1="55" x2="120" y2="30" stroke="#f59e0b" strokeWidth="3" opacity="0.7">
              <animate attributeName="opacity" values="0.9;0.4;0.9" dur="2s" repeatCount="indefinite" />
            </line>
          </>
        )}
        {/* Etapa 5 - Portal */}
        {etapa >= 5 && (
          <ellipse cx="120" cy="50" rx="25" ry="35" fill="none" stroke="#a78bfa" strokeWidth="3">
            <animate attributeName="stroke" values="#a78bfa;#f59e0b;#a78bfa" dur="3s" repeatCount="indefinite" />
          </ellipse>
        )}
        {etapa >= 5 && (
          <ellipse cx="120" cy="50" rx="15" ry="22" fill="#7c3aed" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
          </ellipse>
        )}
      </svg>
      <div className="flex gap-1">
        {PORTAL_ETAPAS?.map((e: any, i: number) => (
          <div
            key={e?.etapa ?? i}
            className={`w-2 h-2 rounded-full ${
              (etapa ?? 0) >= (e?.etapa ?? 0) ? 'bg-purple-400' : 'bg-gray-700'
            }`}
          />
        )) ?? null}
      </div>
      {!showProgressText && (
        <p className="text-xs text-gray-400">
          {nomeEtapa} — {Math.round(progress ?? 0)}%
        </p>
      )}
      {showProgressText && (
        <div className="w-full max-w-[220px] mt-1">
          <p className="text-xs text-center text-purple-200 mb-1 font-semibold">
            Etapa {etapa} de 5: {nomeEtapa}
          </p>
          <div className="w-full rounded-full overflow-hidden bg-white/10" style={{ height: 8 }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${dentro}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-amber-400"
            />
          </div>
          {proximaEtapa ? (
            <p className="text-xs text-center text-gray-400 mt-1">
              {batalhas === 1 ? 'Falta 1 batalha' : `Faltam ${batalhas} batalhas`} para {proximaEtapa}
            </p>
          ) : (
            <p className="text-xs text-center text-amber-300 mt-1">Portal completo! 🎉</p>
          )}
        </div>
      )}
    </div>
  );
}
