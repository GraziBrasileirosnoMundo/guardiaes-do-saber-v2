'use client';
import { motion } from 'framer-motion';
import { Colecionavel } from '@/types';
import { RARIDADE_INFO } from '@/data/collection';
import { Check, Lock, Coins } from 'lucide-react';

interface CollectibleCardProps {
  item: Colecionavel;
  owned: boolean;
  equipped?: boolean;
  onClick?: () => void;
  // rodapé: mostrar custo (loja), estado de posse, ou bloqueado
  modo?: 'colecao' | 'loja' | 'equipar';
  podeComprar?: boolean;
}

export function CollectibleCard({ item, owned, equipped = false, onClick, modo = 'colecao', podeComprar = false }: CollectibleCardProps) {
  const rar = RARIDADE_INFO[item.raridade];
  const bloqueado = modo === 'equipar' && !owned;
  const naLoja = modo === 'loja';
  const semImg = !owned && modo === 'colecao';

  return (
    <motion.button
      whileTap={onClick ? { scale: 0.96 } : undefined}
      onClick={onClick}
      className="relative rounded-2xl p-3 flex flex-col items-center text-center border-2 transition-all w-full"
      style={{
        borderColor: equipped ? rar.cor : `${rar.cor}55`,
        background: equipped ? rar.corBg : 'rgba(15,23,42,0.5)',
        boxShadow: equipped ? `0 0 14px ${rar.cor}66` : 'none',
        opacity: semImg ? 0.65 : 1,
      }}
    >
      {/* Selo de raridade */}
      <span className="absolute top-1.5 left-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: rar.corBg, color: rar.cor }}>
        {rar.nome}
      </span>
      {equipped && (
        <span className="absolute top-1.5 right-1.5"><Check className="w-4 h-4" style={{ color: rar.cor }} /></span>
      )}
      {semImg && (
        <span className="absolute top-1.5 right-1.5"><Lock className="w-3.5 h-3.5 text-gray-500" /></span>
      )}

      <div className="text-4xl my-2" style={{ filter: semImg ? 'grayscale(1) brightness(0.6)' : 'none' }}>
        {semImg ? '❓' : item.icone}
      </div>
      <p className="text-xs font-bold text-white leading-tight">{item.nome}</p>
      <p className="text-[10px] text-gray-400 leading-tight mt-0.5 min-h-[26px]">{item.descricao}</p>

      {/* Rodapé por modo */}
      {naLoja && !owned && (
        <div className="mt-1 flex items-center gap-1 text-sm font-bold" style={{ color: podeComprar ? '#fbbf24' : '#6b7280' }}>
          <Coins className="w-4 h-4" /> {item.custo}
        </div>
      )}
      {naLoja && owned && (
        <div className="mt-1 text-[11px] font-bold text-emerald-400">Na coleção ✓</div>
      )}
      {modo === 'equipar' && owned && !equipped && (
        <div className="mt-1 text-[11px] text-purple-300">Tocar para equipar</div>
      )}
      {modo === 'equipar' && equipped && (
        <div className="mt-1 text-[11px] font-bold" style={{ color: rar.cor }}>Equipado</div>
      )}
    </motion.button>
  );
}
