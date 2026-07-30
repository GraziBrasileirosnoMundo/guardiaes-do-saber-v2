'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface GuardianSpeechProps {
  texto: string | null;
  is2?: boolean;
}

// Balão de fala do Guardião. Curto, positivo, legível.
export function GuardianSpeech({ texto, is2 = false }: GuardianSpeechProps) {
  return (
    <AnimatePresence mode="wait">
      {texto && (
        <motion.div
          key={texto}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="relative max-w-[240px]"
        >
          <div className={`bg-white/95 text-slate-800 rounded-2xl px-4 py-2 shadow-lg font-semibold text-center ${is2 ? 'text-base' : 'text-sm'}`}>
            {texto}
          </div>
          <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-3 h-3 bg-white/95 rotate-45" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
