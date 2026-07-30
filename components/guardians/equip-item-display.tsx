'use client';

import { motion } from 'framer-motion';
import { GuardiaoTipo } from '@/types';
import { getColecionavel } from '@/data/collection';
import { getItemPlacement } from '@/data/itemPlacements';

interface EquipItemDisplayProps {
  itemId: string | null;
  guardianType: GuardiaoTipo;
  size: number;
  animated?: boolean;
  category?: string; // para efeitos especiais
}

/**
 * Componente que renderiza um item equipado com placement correto
 * para o Guardião especificado, responsivo a tamanho
 */
export function EquipItemDisplay({
  itemId,
  guardianType,
  size,
  animated = true,
  category,
}: EquipItemDisplayProps) {
  if (!itemId) return null;

  const colecionavel = getColecionavel(itemId);
  if (!colecionavel) return null;

  const placement = getItemPlacement(itemId, guardianType);
  if (!placement) {
    // Item sem placement definido — renderizar simples no centro
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: size * 0.3,
          zIndex: 20,
          lineHeight: 1,
        }}
      >
        {colecionavel.icone}
      </div>
    );
  }

  // Renderizar com placement específico e animação conforme categoria
  const isEffect = category === 'efeito';
  const isCompanion = category === 'companheiro';

  const MotionComponent = animated ? motion.div : 'div';

  const commonProps = {
    style: {
      position: 'absolute',
      top: `calc(50% + ${placement.offsetY}px)`,
      left: `calc(50% + ${placement.offsetX}px)`,
      transform: `translate(-50%, -50%) scale(${placement.scale}) rotate(${placement.rotation}deg)`,
      fontSize: size * 0.4,
      zIndex: placement.zIndex,
      lineHeight: 1,
      transformOrigin: 'center center',
    } as React.CSSProperties,
  };

  if (isEffect && animated) {
    return (
      <motion.div
        {...commonProps}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [placement.scale * 0.95, placement.scale * 1.05, placement.scale * 0.95],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {colecionavel.icone}
      </motion.div>
    );
  }

  if (isCompanion && animated) {
    return (
      <motion.div
        {...commonProps}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {colecionavel.icone}
      </motion.div>
    );
  }

  return <div {...commonProps}>{colecionavel.icone}</div>;
}
