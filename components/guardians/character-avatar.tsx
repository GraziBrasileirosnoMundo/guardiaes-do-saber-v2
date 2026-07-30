'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface CharacterAvatarProps {
  characterId: string;
  size?: number;
  animate?: boolean;
}

const CHARACTER_INFO = {
  lumis: {
    nome: 'Lumis',
    cor: '#60A5FA',
    imagem: '/images/characters/lumis.png',
  },
  faisca: {
    nome: 'Faísca',
    cor: '#FF6B35',
    imagem: '/images/characters/faisca.png',
  },
  verdor: {
    nome: 'Verdor',
    cor: '#10B981',
    imagem: '/images/characters/verdor.png',
  },
  torrak: {
    nome: 'Torrak',
    cor: '#8B5CF6',
    imagem: '/images/characters/torrak.png',
  },
  eclipse: {
    nome: 'Eclipse',
    cor: '#FBBF24',
    imagem: '/images/characters/eclipse.png',
  },
};

export function CharacterAvatar({ characterId, size = 100, animate = true }: CharacterAvatarProps) {
  const info = CHARACTER_INFO[characterId as keyof typeof CHARACTER_INFO] || CHARACTER_INFO.lumis;

  const MotionDiv = animate ? motion.div : 'div';

  return (
    <MotionDiv
      className="flex flex-col items-center"
      initial={animate ? { scale: 0 } : undefined}
      animate={animate ? { scale: 1 } : undefined}
      transition={animate ? { type: 'spring', stiffness: 300, damping: 20 } : undefined}
    >
      <motion.div
        className="rounded-full flex items-center justify-center mb-3 shadow-lg overflow-hidden relative"
        style={{
          width: size,
          height: size,
          background: `${info.cor}22`,
          border: `3px solid ${info.cor}`,
        }}
        animate={animate ? { scale: [1, 1.05, 1] } : undefined}
        transition={animate ? { repeat: Infinity, duration: 2.5 } : undefined}
      >
        <Image
          src={info.imagem}
          alt={info.nome}
          fill
          className="object-contain p-2"
          priority
        />
      </motion.div>
      <p className="font-display font-bold text-sm" style={{ color: info.cor }}>
        {info.nome}
      </p>
    </MotionDiv>
  );
}
