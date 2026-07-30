'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

interface Character {
  id: string;
  nome: string;
  titulo: string;
  cor: string;
  corBg: string;
  emoji: string;
}

const CHARACTERS: Character[] = [
  {
    id: 'lumis',
    nome: 'Lumis',
    titulo: 'Guardião de Luz',
    cor: '#60A5FA',
    corBg: '#1E3A8A',
    emoji: '💙',
  },
  {
    id: 'faisca',
    nome: 'Faísca',
    titulo: 'Guardião de Fogo',
    cor: '#FF6B35',
    corBg: '#7C2D12',
    emoji: '🔥',
  },
  {
    id: 'verdor',
    nome: 'Verdor',
    titulo: 'Guardião da Floresta',
    cor: '#10B981',
    corBg: '#064E3B',
    emoji: '🌿',
  },
  {
    id: 'torrak',
    nome: 'Torrak',
    titulo: 'Guardião de Terra',
    cor: '#8B5CF6',
    corBg: '#3F0F5F',
    emoji: '💜',
  },
  {
    id: 'eclipse',
    nome: 'Eclipse',
    titulo: 'Guardião do Ouro',
    cor: '#FBBF24',
    corBg: '#78350F',
    emoji: '⭐',
  },
];

const CHARACTER_IMAGES: Record<string, string> = {
  lumis: '/images/characters/lumis.png',
  faisca: '/images/characters/faisca.png',
  verdor: '/images/characters/verdor.png',
  torrak: '/images/characters/torrak.png',
  eclipse: '/images/characters/eclipse.png',
};

interface CharacterSelectorProps {
  selected?: string;
  onSelect: (characterId: string) => void;
}

export function CharacterSelector({ selected, onSelect }: CharacterSelectorProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-5 gap-3 sm:gap-4">
        {CHARACTERS.map((char, idx) => (
          <motion.button
            key={char.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => onSelect(char.id)}
            className={`relative group flex flex-col items-center p-3 sm:p-4 rounded-xl transition-all cursor-pointer ${
              selected === char.id
                ? 'ring-2 scale-105'
                : 'hover:scale-102 hover:ring-2 hover:ring-purple-500/50'
            }`}
            style={{
              background: selected === char.id ? `${char.corBg}77` : `${char.corBg}44`,
              borderColor: char.cor,
              borderWidth: selected === char.id ? '2px' : '1px',
            }}
          >
            {/* Imagem do Personagem */}
            <motion.div
              className="w-16 sm:w-20 h-16 sm:h-20 mb-2 sm:mb-3 relative"
              animate={selected === char.id ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Image
                src={CHARACTER_IMAGES[char.id]}
                alt={char.nome}
                fill
                className="object-contain"
                priority
              />
            </motion.div>

            {/* Nome */}
            <h3
              className="font-display font-bold text-xs sm:text-sm text-center"
              style={{ color: char.cor }}
            >
              {char.nome}
            </h3>

            {/* Subtítulo */}
            <p className="text-[10px] sm:text-xs text-gray-400 text-center mt-1 line-clamp-2">
              {char.titulo}
            </p>

            {/* Check mark se selecionado */}
            {selected === char.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
              >
                ✓
              </motion.div>
            )}

            {/* Glow effect */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none blur-sm"
              style={{ background: char.cor }}
            />
          </motion.button>
        ))}
      </div>

      {/* Info box */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 rounded-xl text-center"
          style={{
            background: `${CHARACTERS.find((c) => c.id === selected)?.corBg}44`,
            borderLeft: `4px solid ${CHARACTERS.find((c) => c.id === selected)?.cor}`,
          }}
        >
          <p className="text-sm text-gray-300">
            Selecionaste <span style={{ color: CHARACTERS.find((c) => c.id === selected)?.cor }} className="font-bold">
              {CHARACTERS.find((c) => c.id === selected)?.nome}
            </span>!
          </p>
        </motion.div>
      )}
    </div>
  );
}
