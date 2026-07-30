'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface VictoryCelebrationProps {
  show: boolean;
  streak: number;
  moedasGanhas: number;
  multiplicador: number;
}

export function VictoryCelebration({ show, streak, moedasGanhas, multiplicador }: VictoryCelebrationProps) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      // Auto-fecha após 3 segundos
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!isVisible) return null;

  // Gera confete
  const confetes = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.3,
    duration: 2 + Math.random() * 1,
    xOffset: (Math.random() - 0.5) * 400,
    rotate: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Confete */}
      {confetes.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 1, y: -20, x: 0, rotate: 0 }}
          animate={{ opacity: 0, y: 500, x: c.xOffset, rotate: c.rotate }}
          transition={{ delay: c.delay, duration: c.duration, ease: 'easeOut' }}
          className="absolute left-1/2 top-0 text-2xl"
        >
          ✨
        </motion.div>
      ))}

      {/* Centro de Celebração */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center pointer-events-auto cursor-default">
          {/* "VITÓRIA!" Grande */}
          <motion.h1
            animate={{ scale: [1, 1.1, 0.95, 1], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 0.5 }}
            className="font-display text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 mb-4"
          >
            VITÓRIA!
          </motion.h1>

          {/* Streak */}
          {streak > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <p className="text-3xl font-bold text-red-400">🔥 {streak} de Vitória!</p>
              <p className="text-sm text-gray-300">Multiplicador: x{multiplicador.toFixed(1)}</p>
            </motion.div>
          )}

          {/* Moedas Ganhas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-4"
          >
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-5xl mb-2">
              💰
            </motion.div>
            <p className="text-2xl font-bold text-amber-300">+{moedasGanhas} Moedas!</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
