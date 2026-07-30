'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

type ShopkeeperReaction =
  | 'idle'
  | 'happy'
  | 'thinking'
  | 'excited'
  | 'encouraging'
  | 'shocked';

export interface ShopkeeperMessage {
  type: ShopkeeperReaction;
  text: string;
  duration?: number;
}

interface ShopkeeperProps {
  message?: ShopkeeperMessage;
  size?: number;
}

const SHOPKEEPER_EMOJI = '🧙'; // Mago/vendedor

const FACIAL_EXPRESSIONS: Record<ShopkeeperReaction, string> = {
  idle: '😊',
  happy: '😄',
  thinking: '🤔',
  excited: '😍',
  encouraging: '👍',
  shocked: '😲',
};

export function Shopkeeper({ message, size = 80 }: ShopkeeperProps) {
  const [currentReaction, setCurrentReaction] = useState<ShopkeeperReaction>('idle');

  useEffect(() => {
    if (message) {
      setCurrentReaction(message.type);
      const timer = setTimeout(() => {
        setCurrentReaction('idle');
      }, message.duration ?? 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Balão de fala */}
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white border-2 border-purple-600 rounded-lg px-3 py-2 text-center text-sm max-w-xs shadow-lg"
        >
          <p className="text-gray-800 font-semibold text-xs md:text-sm">{message.text}</p>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-purple-600"></div>
        </motion.div>
      )}

      {/* Vendedor animado */}
      <motion.div
        animate={{
          y: [0, -4, 0],
          rotate: currentReaction === 'thinking' ? [0, -2, 2, -2, 0] : 0,
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 0.6, repeat: currentReaction === 'thinking' ? 2 : 0 },
        }}
        className="relative"
      >
        {/* Corpo do vendedor */}
        <div
          style={{ fontSize: size }}
          className="filter drop-shadow-lg"
        >
          {SHOPKEEPER_EMOJI}
        </div>

        {/* Expressão dinâmica (emoji emocional) */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 1, 1],
          }}
          transition={{
            duration: 0.4,
            repeat: currentReaction !== 'idle' ? 1 : 0,
          }}
          style={{ fontSize: size * 0.5 }}
          className="absolute -top-1 -right-2"
        >
          {FACIAL_EXPRESSIONS[currentReaction]}
        </motion.div>

        {/* Estrela de brilho quando excited */}
        {currentReaction === 'excited' && (
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0, 1, 0.5],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
            }}
            className="absolute -top-3 -left-3 text-lg"
          >
            ✨
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

/**
 * Frases contextuais do vendedor
 */
export const SHOPKEEPER_LINES = {
  welcome: [
    'Bem-vindo à minha loja!',
    'Tenho equipamentos incríveis para o teu Guardião!',
    'Dá uma vista de olhos!',
  ],
  selecting: [
    'Esse combina contigo!',
    'Queres experimentar?',
    'Olha como fica no teu Guardião!',
  ],
  purchase_success: [
    'Ótima escolha!',
    'Ficou incrível!',
    'Esse equipamento parece ter sido feito para ti!',
    'Boa compra!',
  ],
  insufficient_coins: [
    'Ainda faltam algumas moedas.',
    'Mais uma batalha e talvez consigas!',
    'Guarda mais moedas para este item.',
  ],
  already_owned: [
    'Esse item já está na tua coleção.',
    'Já tens este item! Experimenta outro.',
  ],
  equip: [
    'Agora sim!',
    'Pronto para a próxima batalha!',
    'O teu Guardião ficou fantástico!',
  ],
};

export function getRandomShopkeeperLine(
  type: keyof typeof SHOPKEEPER_LINES
): string {
  const lines = SHOPKEEPER_LINES[type];
  return lines[Math.floor(Math.random() * lines.length)];
}

export function getShopkeeperReaction(
  type: keyof typeof SHOPKEEPER_LINES
): ShopkeeperReaction {
  const reactionMap: Record<string, ShopkeeperReaction> = {
    welcome: 'happy',
    selecting: 'thinking',
    purchase_success: 'excited',
    insufficient_coins: 'encouraging',
    already_owned: 'thinking',
    equip: 'happy',
  };
  return reactionMap[type] ?? 'idle';
}
