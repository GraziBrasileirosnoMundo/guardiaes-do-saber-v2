'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Colecionavel, EquipSlots } from '@/types';
import { RARIDADE_INFO } from '@/data/collection';
import { getAudioManager } from '@/lib/audio';

interface ShopItemCardProps {
  item: Colecionavel;
  isOwned: boolean;
  isEquipped: boolean;
  onSelect: (item: Colecionavel) => void;
  onPreview: (item: Colecionavel, equip: EquipSlots) => void;
  onCancelPreview: () => void;
  onPurchase: (item: Colecionavel) => void;
  onEquip: (item: Colecionavel) => void;
  isSelected: boolean;
  userCoins: number;
  currentEquip: EquipSlots;
  isPreviewing: boolean;
}

export function ShopItemCard({
  item,
  isOwned,
  isEquipped,
  onSelect,
  onPreview,
  onCancelPreview,
  onPurchase,
  onEquip,
  isSelected,
  userCoins,
  currentEquip,
  isPreviewing,
}: ShopItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showDescription, setShowDescription] = useState(isSelected);
  const audio = getAudioManager();

  useEffect(() => {
    setShowDescription(isSelected);
  }, [isSelected]);

  const canAfford = userCoins >= item.custo;
  const rarityInfo = RARIDADE_INFO[item.raridade];

  const handleSelect = () => {
    onSelect(item);
    if (!isSelected) {
      // Ao selecionar um item novo, mostrar preview
      const newEquip = { ...currentEquip };
      // Determinar qual slot este item ocupa
      if (['chapeu', 'capacete', 'oculos', 'capa', 'asas', 'efeito', 'cor', 'companheiro'].includes(item.categoria)) {
        (newEquip as any)[item.categoria] = item.id;
        onPreview(item, newEquip);
      }
    }
  };

  const handlePurchase = () => {
    if (!canAfford) {
      audio.play('erro');
      return;
    }
    if (isOwned) {
      audio.play('erro');
      return;
    }
    audio.play('comprar');
    onPurchase(item);
  };

  const handleEquip = () => {
    audio.play('equipar');
    onEquip(item);
  };

  return (
    <motion.div
      layout
      animate={{
        scale: isSelected ? 1.05 : 1,
        boxShadow: isSelected ? '0 0 20px rgba(124, 58, 237, 0.6)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleSelect}
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-gradient-to-br from-purple-600 to-purple-800 border-2 border-purple-400'
          : 'bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-purple-500'
      }`}
    >
      {/* Cabeçalho com ícone e raridade */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-4xl">{item.icone}</div>
        <div
          className="px-2 py-1 rounded text-xs font-bold text-white"
          style={{ backgroundColor: rarityInfo.cor }}
        >
          {rarityInfo.nome}
        </div>
      </div>

      {/* Nome e categoria */}
      <h3 className="font-bold text-white text-sm mb-1">{item.nome}</h3>
      <p className="text-xs text-gray-300 mb-3">{item.categoria}</p>

      {/* Descrição (aparece quando selecionado ou em hover desktop) */}
      {(isSelected || isHovered) && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="text-xs text-gray-200 mb-3 line-clamp-2 border-t border-gray-600 pt-2"
        >
          {item.descricao}
        </motion.p>
      )}

      {/* Estados do item */}
      <div className="mb-3 flex items-center gap-2">
        {isEquipped && (
          <span className="text-xs bg-green-500/30 text-green-200 px-2 py-1 rounded">
            Equipado
          </span>
        )}
        {isOwned && !isEquipped && (
          <span className="text-xs bg-blue-500/30 text-blue-200 px-2 py-1 rounded">
            Possuído
          </span>
        )}
        {isPreviewing && item.id === (currentEquip as any)[item.categoria] && (
          <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded animate-pulse">
            Pré-visualizando
          </span>
        )}
      </div>

      {/* Preço e ações */}
      <div className="border-t border-gray-600 pt-3">
        {item.custo > 0 && (
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Preço:</span>
            <div className="flex items-center gap-1">
              <span className="text-lg">💰</span>
              <span className={`font-bold ${canAfford ? 'text-yellow-300' : 'text-red-400'}`}>
                {item.custo}
              </span>
            </div>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-2">
          {!isOwned && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePurchase();
              }}
              disabled={!canAfford}
              className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                canAfford
                  ? 'bg-green-600 hover:bg-green-700 text-white active:scale-95'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              Comprar
            </button>
          )}

          {isOwned && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEquip();
              }}
              className={`flex-1 py-1 rounded text-xs font-bold transition-all ${
                isEquipped
                  ? 'bg-gray-600 text-gray-400 cursor-default'
                  : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
              }`}
              disabled={isEquipped}
            >
              {isEquipped ? 'Equipado' : 'Equipar'}
            </button>
          )}
        </div>
      </div>

      {/* Dica de hover (desktop) */}
      {isHovered && !isSelected && (
        <p className="text-xs text-purple-300 mt-2 text-center">
          Clica para pré-visualizar
        </p>
      )}
    </motion.div>
  );
}
