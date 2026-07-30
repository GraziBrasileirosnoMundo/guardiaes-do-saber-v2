'use client';

import { motion } from 'framer-motion';

interface ProgressBarWidgetProps {
  label: string;
  percentage: number;
  color?: 'purple' | 'green' | 'blue' | 'amber' | 'red';
  icon?: string;
  showPercentage?: boolean;
}

export function ProgressBarWidget({
  label,
  percentage,
  color = 'purple',
  icon,
  showPercentage = true,
}: ProgressBarWidgetProps) {
  const colorMap = {
    purple: 'from-purple-500 to-blue-500',
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    amber: 'from-amber-500 to-orange-500',
    red: 'from-red-500 to-pink-500',
  };

  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <p className="text-sm font-semibold text-gray-300">{label}</p>
        </div>
        {showPercentage && (
          <motion.p className="text-xs font-bold text-gray-400" animate={{ opacity: [0.6, 1, 0.6] }}>
            {Math.round(clampedPercentage)}%
          </motion.p>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900/50 rounded-full h-3 overflow-hidden border border-slate-700/30">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedPercentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${colorMap[color]} shadow-lg`}
        />
      </div>

      {/* Celebration quando completa */}
      {clampedPercentage === 100 && (
        <motion.p className="text-xs text-green-400 font-bold mt-1" animate={{ scale: [1, 1.1, 1] }}>
          ✨ Completo!
        </motion.p>
      )}
    </motion.div>
  );
}
