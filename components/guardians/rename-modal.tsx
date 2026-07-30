'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RenameModalProps {
  currentName: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (newName: string) => void;
  guardianName?: string; // Nome do tipo de Guardião (LUMIS/TORRAK)
}

const MAX_NAME_LENGTH = 20;
const MIN_NAME_LENGTH = 1;

export function RenameModal({
  currentName,
  isOpen,
  onClose,
  onConfirm,
  guardianName = 'Guardião',
}: RenameModalProps) {
  const [newName, setNewName] = useState(currentName);
  const [error, setError] = useState('');

  const handleChange = (value: string) => {
    setError('');
    if (value.length <= MAX_NAME_LENGTH) {
      setNewName(value);
    }
  };

  const handleConfirm = () => {
    const trimmed = newName.trim();

    if (trimmed.length < MIN_NAME_LENGTH) {
      setError('O nome não pode estar vazio.');
      return;
    }

    if (trimmed === currentName) {
      onClose();
      return;
    }

    onConfirm(trimmed);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm p-6 bg-gradient-to-br from-purple-700 to-purple-900 rounded-xl shadow-2xl border-2 border-purple-500"
          >
            {/* Título */}
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-white mb-1">
                Mudar Nome do {guardianName}
              </h2>
              <p className="text-purple-200 text-sm">
                Até {MAX_NAME_LENGTH} caracteres
              </p>
            </div>

            {/* Input */}
            <div className="mb-4">
              <input
                type="text"
                value={newName}
                onChange={(e) => handleChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Novo nome..."
                maxLength={MAX_NAME_LENGTH}
                autoFocus
                className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none text-center font-semibold"
              />
              <div className="text-right text-xs text-purple-200 mt-1">
                {newName.length}/{MAX_NAME_LENGTH}
              </div>
            </div>

            {/* Erro */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-2 bg-red-500/20 border-l-4 border-red-500 rounded text-red-200 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-colors active:scale-95"
              >
                Confirmar
              </button>
            </div>

            {/* Dica */}
            <p className="text-center text-xs text-purple-300 mt-4">
              Pressiona Enter para confirmar ou Escape para cancelar
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
