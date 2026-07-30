'use client';
import { useRouter } from 'next/navigation';
import { Zap, Sword, Award, Trophy, ScrollText, Crown, Settings, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { icon: Zap, label: 'Mundos', route: '/game', color: 'from-cyan-600 to-blue-600', shadow: 'cyan' },
  { icon: Sword, label: 'Batalhas', route: '#batalhas', color: 'from-red-600 to-orange-600', shadow: 'red' },
  { icon: Award, label: 'Habilidades', route: '#habilidades', color: 'from-purple-600 to-pink-600', shadow: 'purple' },
  { icon: Trophy, label: 'Conquistas', route: '#conquistas', color: 'from-yellow-500 to-amber-600', shadow: 'yellow' },
  { icon: ScrollText, label: 'Missões', route: '#missoes', color: 'from-orange-600 to-red-600', shadow: 'orange' },
  { icon: Crown, label: 'Ranking', route: '#ranking', color: 'from-blue-600 to-cyan-600', shadow: 'blue' },
  { icon: Settings, label: 'Definições', route: '#definicoes', color: 'from-gray-600 to-slate-700', shadow: 'gray' },
  { icon: ShoppingCart, label: 'Loja', route: '/shop', color: 'from-amber-500 to-yellow-600', shadow: 'amber' },
];

export function BottomNavigation() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    if (route.startsWith('/')) {
      router.push(route);
    } else {
      // Para futuros links internos
      console.log('Navigate to:', route);
    }
  };

  return (
    <div className="flex overflow-x-auto lg:overflow-x-visible gap-2 p-4 lg:justify-center lg:gap-1">
      {NAV_ITEMS.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.button
            key={item.route}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation(item.route)}
            className="shrink-0 flex flex-col items-center gap-1 px-4 py-3 lg:px-6 rounded-xl bg-gradient-to-b from-slate-800/50 to-slate-900/50 border border-purple-700/30 hover:border-purple-500/50 transition-all group cursor-pointer"
          >
            <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} group-hover:shadow-lg group-hover:shadow-${item.color.split(' ')[1]}/50 transition-all`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-semibold text-gray-300 group-hover:text-white transition-colors whitespace-nowrap">
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
