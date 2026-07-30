'use client';
import { motion } from 'framer-motion';
import { Lock, Zap } from 'lucide-react';

interface WorldCardProfessionalProps {
  id: number;
  nome: string;
  tema: string;
  descricao: string;
  icon: React.ReactNode;
  bgGradient: { from: string; to: string };
  badgeColor: string;
  badgeText: string;
  buttonGradient: string;
  locked?: boolean;
  progress?: number;
}

export function WorldCardProfessional({
  id,
  nome,
  tema,
  descricao,
  icon,
  bgGradient,
  badgeColor,
  badgeText,
  buttonGradient,
  locked = false,
  progress = 0,
}: WorldCardProfessionalProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ y: -16, scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="group relative h-80"
    >
      {/* Glow Background Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient.from} ${bgGradient.to} opacity-20 group-hover:opacity-40 rounded-3xl blur-2xl transition-all duration-300 -z-10`} />

      {/* Card Container */}
      <div className={`relative h-full bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-sm border-2 border-white/10 hover:border-white/30 rounded-3xl p-6 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xl hover:shadow-2xl hover:shadow-blue-500/20`}>

        {/* Top Section - Icon and Badge */}
        <div className="flex items-start justify-between mb-4">
          {/* Large Icon Container */}
          <div className={`relative group/icon`}>
            <div className={`absolute -inset-4 bg-gradient-to-br ${bgGradient.from} ${bgGradient.to} opacity-30 group-hover/icon:opacity-50 rounded-2xl blur-lg transition-all`} />
            <div className={`relative w-24 h-24 bg-gradient-to-br ${bgGradient.from} ${bgGradient.to} rounded-2xl flex items-center justify-center text-5xl shadow-lg group-hover/icon:scale-110 transition-transform`}>
              {icon}
            </div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.1, type: 'spring' }}
            className={`${badgeColor} text-white text-xs font-black px-4 py-2 rounded-full shadow-lg transform -rotate-12 hover:rotate-0 transition-transform`}
          >
            {badgeText}
          </motion.div>
        </div>

        {/* Middle Section - Title and Description */}
        <div className="flex-1">
          <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff, #ffffff)`,
            }}
          >
            {nome}
          </h3>
          <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors mb-3 line-clamp-2">
            {descricao}
          </p>

          {/* Progress Bar */}
          {progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500 font-semibold">Progresso</span>
                <span className="text-xs text-yellow-400 font-bold">{progress}%</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden border border-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className={`h-full bg-gradient-to-r ${buttonGradient} shadow-lg`}
                />
              </div>
            </div>
          )}

          {/* Tema */}
          <div className="text-xs text-gray-500">
            <span className="text-white/70">Tema:</span> <span className="text-white font-semibold">{tema}</span>
          </div>
        </div>

        {/* Bottom Section - Button */}
        {locked ? (
          <button className="w-full py-4 px-4 bg-gradient-to-r from-slate-700 to-slate-600 text-gray-400 font-black rounded-xl transition-all opacity-50 cursor-not-allowed flex items-center justify-center gap-2">
            <Lock className="w-4 h-4" />
            Bloqueado
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-4 px-4 bg-gradient-to-r ${buttonGradient} text-white font-black rounded-xl transition-all shadow-lg hover:shadow-2xl group-hover:shadow-2xl text-lg uppercase tracking-wide`}
          >
            Explorar →
          </motion.button>
        )}

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full -ml-12 -mb-12 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}
