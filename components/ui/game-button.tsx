'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GameButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const variants: Record<string, string> = {
  primary: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/40',
  secondary: 'bg-slate-700 hover:bg-slate-600 text-white shadow-md',
  danger: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/40',
  gold: 'bg-amber-500 hover:bg-amber-400 text-gray-900 shadow-lg shadow-amber-900/40',
  ghost: 'bg-transparent hover:bg-white/10 text-gray-300',
};

const sizes: Record<string, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-xl',
  xl: 'px-10 py-5 text-xl rounded-2xl font-bold',
};

export function GameButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  className = '',
}: GameButtonProps) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.03 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant] ?? variants.primary}
        ${sizes[size] ?? sizes.md}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        font-semibold transition-colors duration-150
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
