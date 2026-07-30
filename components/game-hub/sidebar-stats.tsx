'use client';
import { Perfil } from '@/types';
import { GuardianAvatar } from '@/components/guardians/guardian-avatar';
import { CountUp } from '@/components/ui/count-up';
import { Coins, Zap } from 'lucide-react';

interface SidebarStatsProps {
  profile: Perfil;
  compact?: boolean;
}

export function SidebarStats({ profile, compact = false }: SidebarStatsProps) {
  const xpPercentage = ((profile.xp || 0) / (1000)) * 100;

  return (
    <div className="flex flex-col gap-6">
      {/* Guardian Avatar */}
      <div className="flex flex-col items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 via-yellow-500 to-orange-500 rounded-full opacity-20 blur-lg" />
          <GuardianAvatar perfil={profile} size={compact ? 80 : 120} />
          <div className="absolute bottom-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg shadow-cyan-500/50">
            Nível {profile.nivel}
          </div>
        </div>
        <div className="text-center">
          <h3 className="font-display text-lg font-bold text-white">{profile.nomeGuardiao}</h3>
          <p className="text-sm text-gray-400">{profile.apelido}</p>
        </div>
      </div>

      {/* XP Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-300 flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            XP
          </span>
          <span className="text-xs text-gray-400">
            <CountUp value={profile.xp || 0} /> / 1000
          </span>
        </div>
        <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden border border-purple-700/30">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300"
            style={{ width: `${Math.min(xpPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* Coins & Streaks */}
      <div className="grid grid-cols-2 gap-3">
        {/* Moedas */}
        <div className="bg-gradient-to-br from-amber-900/30 to-yellow-900/20 border border-amber-700/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Coins className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-gray-400">Moedas</span>
          </div>
          <p className="font-bold text-amber-200">
            <CountUp value={profile.moedas || 0} />
          </p>
        </div>

        {/* Sequência */}
        <div className="bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-700/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-gray-400">Sequência</span>
          </div>
          <p className="font-bold text-orange-200">🔥 {profile.sequenciaAtual || 0}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-purple-700/0 via-purple-700/50 to-purple-700/0" />

      {/* Stats Summary */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Batalhas</span>
          <span className="font-semibold text-white">{Object.keys(profile.perguntasRespondidas || {}).length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Taxa Acertos</span>
          <span className="font-semibold text-green-400">
            {profile.perguntasRespondidas && Object.keys(profile.perguntasRespondidas).length > 0
              ? Math.round(
                  (Object.values(profile.perguntasRespondidas).reduce((sum, q) => sum + (q.acertos || 0), 0) /
                    Object.values(profile.perguntasRespondidas).reduce((sum, q) => sum + (q.tentativas || 0), 0)) *
                    100
                )
              : 0}
            %
          </span>
        </div>
      </div>
    </div>
  );
}
