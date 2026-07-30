'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import { GameButton } from '@/components/ui/game-button';
import { CountUp } from '@/components/ui/count-up';
import { WorldMap } from '@/components/world/world-map';
import { GuardianAvatar } from '@/components/guardians/guardian-avatar';
import { GuardianSpeech } from '@/components/guardians/guardian-speech';
import { registarEvento } from '@/lib/metrics';
import { proximosObjetivos } from '@/lib/objectives';
import { mensagemGuardiao } from '@/data/guardian-messages';
import { getColecionavel, TIER_INFO, RARIDADE_INFO, ODDS_BAU_POR_ACERTOS } from '@/data/collection';
import { getTrofeu } from '@/data/trophies';
import { DropBau, MissaoEstado, TierBau } from '@/types';
import { Trophy, Coins, Zap, Home, Sword, Sparkles, Info, Flame } from 'lucide-react';
import { VictoryCelebration } from '@/components/ui/victory-celebration';
import { useStreakMultiplier } from '@/hooks/useStreakMultiplier';

interface RewardData {
  acertos: number;
  moedasBatalha: number;
  xpBatalha: number;
  drop: DropBau;
  subiuNivel?: boolean;
  nivelNovo?: number;
  medalhasNovas?: string[];
  trofeusNovos?: string[];
  missoesConcluidas?: MissaoEstado[];
  comboMax?: number;
  multiplicador?: number;
  rewardType?: 'normal' | 'lucky' | 'rare' | 'epic';
  moedasFinais?: number;
}

export function RewardsScreen() {
  const { activeProfile, loaded, updateProfile } = useProfile();
  const { playSound } = useSoundEffect();
  const { descricaoMultiplicador } = useStreakMultiplier();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [rewardData, setRewardData] = useState<RewardData | null>(null);
  const [bauAberto, setBauAberto] = useState(false);
  const [mostrarOdds, setMostrarOdds] = useState(false);
  const [fala] = useState(() => mensagemGuardiao('vitoria'));
  const [mostrarCelebracao, setMostrarCelebracao] = useState(true);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = sessionStorage?.getItem?.('gds_last_reward');
      if (raw) {
        const data = JSON.parse(raw) as RewardData;
        setRewardData(data);
        sessionStorage?.removeItem?.('gds_last_reward');
        // Perfil já foi atualizado em battle-screen.tsx via updateProfile(r.perfil)
      }
    } catch { setRewardData(null); }
  }, []);

  if (!mounted || !loaded || !activeProfile) {
    return <div className="min-h-screen bg-[#0f0e1a]" />;
  }

  const p = activeProfile;
  const is2 = p?.ano === 2;
  const acertos = rewardData?.acertos ?? 0;
  const drop = rewardData?.drop;
  const tier: TierBau = drop?.tier ?? 'comum';
  const tierInfo = TIER_INFO[tier];
  const subiuNivel = rewardData?.subiuNivel ?? false;
  const medalhas = rewardData?.medalhasNovas ?? [];
  const trofeus = rewardData?.trofeusNovos ?? [];
  const missoes = rewardData?.missoesConcluidas ?? [];
  const objetivos = proximosObjetivos(p);
  const odds = ODDS_BAU_POR_ACERTOS[Math.max(0, Math.min(5, acertos))] ?? ODDS_BAU_POR_ACERTOS[0];

  const handleJogarNovamente = () => { registarEvento(p.id, 'jogar_novamente_clicado'); router.push('/battle'); };

  return (
    <div className="min-h-screen bg-[#0f0e1a] flex flex-col items-center p-4 py-8">
      {/* CELEBRAÇÃO VISUAL */}
      {mostrarCelebracao && rewardData && (
        <VictoryCelebration
          show={true}
          streak={p?.streak || 0}
          moedasGanhas={rewardData.moedasFinais || rewardData.moedasBatalha || 0}
          multiplicador={rewardData.multiplicador || 1}
        />
      )}

      <div className="w-full max-w-md">
        {/* STREAK INDICATOR */}
        {p && p.streak > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 flex items-center justify-center gap-2 p-3 bg-red-900/30 rounded-xl border border-red-500/30"
          >
            <Flame className="w-5 h-5 text-red-400" />
            <span className="font-bold text-red-300">{p.streak} de Vitória! x{(rewardData?.multiplicador || 1).toFixed(1)}</span>
          </motion.div>
        )}

        {/* Vitória + Guardião */}
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }} className="flex flex-col items-center mb-4">
          <Trophy className={`mb-1 text-amber-400 ${is2 ? 'w-14 h-14' : 'w-12 h-12'}`} />
          <h2 className={`font-display font-bold text-amber-300 ${is2 ? 'text-3xl' : 'text-2xl'}`}>Monstro Derrotado!</h2>
          <div className="mt-2"><GuardianSpeech texto={fala.texto} is2={is2} /></div>
          <div className="mt-1"><GuardianAvatar perfil={p} size={is2 ? 70 : 60} glow expressao={fala.expressao} float={false} /></div>
        </motion.div>

        {/* Level up */}
        <AnimatePresence>
          {subiuNivel && (
            <motion.div initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.1 }}
              className="mb-4 rounded-2xl p-4 text-center bg-gradient-to-r from-purple-600/40 to-amber-500/40 border border-amber-400/40 glow-pulse">
              <p className={`font-display font-bold text-amber-200 ${is2 ? 'text-2xl' : 'text-xl'}`}>🎉 Subiste ao Nível {rewardData?.nivelNovo ?? p?.nivel}!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-slate-800/50 rounded-2xl p-5 mb-4 border border-purple-700/15">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div><p className={`font-bold text-emerald-400 ${is2 ? 'text-3xl' : 'text-2xl'}`}>{acertos}/5</p><p className="text-xs text-gray-400">Acertos</p></div>
            <div><p className={`font-bold text-amber-400 ${is2 ? 'text-3xl' : 'text-2xl'}`}><Coins className="w-4 h-4 inline" /> <CountUp value={rewardData?.moedasBatalha ?? 0} /></p><p className="text-xs text-gray-400">Moedas Base</p></div>
            <div><p className={`font-bold text-purple-400 ${is2 ? 'text-3xl' : 'text-2xl'}`}><Zap className="w-4 h-4 inline" /> <CountUp value={rewardData?.xpBatalha ?? 0} /></p><p className="text-xs text-gray-400">XP</p></div>
          </div>
        </motion.div>

        {/* MOEDAS FINAIS COM MULTIPLICADOR */}
        {rewardData?.moedasFinais && rewardData.multiplicador && rewardData.multiplicador > 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`mb-4 p-4 rounded-2xl border-2 ${
              rewardData.rewardType === 'epic'
                ? 'bg-purple-900/40 border-purple-500/50'
                : rewardData.rewardType === 'rare'
                  ? 'bg-blue-900/40 border-blue-500/50'
                  : 'bg-amber-900/40 border-amber-500/50'
            }`}
          >
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-center">
              <p className="text-xs text-gray-400 mb-1">Moedas Finais</p>
              <p className={`font-display font-black ${is2 ? 'text-4xl' : 'text-3xl'} text-amber-300`}>
                <CountUp value={rewardData.moedasFinais} />
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Base: {rewardData.moedasBatalha} × {rewardData.multiplicador.toFixed(1)} = {rewardData.moedasFinais}
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* Baú por tier */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 }}
          className="rounded-2xl p-5 mb-4 relative overflow-hidden border" style={{ borderColor: `${tierInfo.cor}55`, background: `linear-gradient(135deg, ${tierInfo.cor}22, rgba(30,27,75,0.4))` }}>
          {!bauAberto ? (
            <button onClick={() => { playSound('coin'); setBauAberto(true); }} className="w-full flex flex-col items-center py-2 select-none" aria-label="Abrir baú">
              <motion.div animate={{ scale: [1, 1.08, 1], rotate: [0, -3, 3, 0] }} transition={{ repeat: Infinity, duration: 1.4 }} className={is2 ? 'text-7xl' : 'text-6xl'}>{tierInfo.icone}</motion.div>
              <p className="font-display font-bold mt-2" style={{ color: tierInfo.cor }}>{tierInfo.nome}</p>
              <p className={`font-display font-bold text-amber-300 mt-1 ${is2 ? 'text-xl' : 'text-lg'}`}>Toca para abrir!</p>
            </button>
          ) : (
            <>
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[...Array(12)].map((_, i) => {
                  const ang = (i / 12) * Math.PI * 2;
                  return (
                    <motion.div key={`b-${i}`} initial={{ opacity: 1, x: 0, y: 0, scale: 1 }} animate={{ opacity: 0, x: Math.cos(ang) * 120, y: Math.sin(ang) * 100, scale: 0.3 }} transition={{ duration: 0.7 }} className="absolute text-lg" style={{ color: tierInfo.cor }}>✨</motion.div>
                  );
                })}
              </div>
              <div className="text-center mb-3">
                <motion.div initial={{ scale: 0.5, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }} className={is2 ? 'text-5xl' : 'text-4xl'}>{tierInfo.icone}</motion.div>
                <h3 className="font-display text-lg font-bold mt-1" style={{ color: tierInfo.cor }}>{tierInfo.nome} aberto!</h3>
              </div>
              <div className="space-y-2">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-2 bg-amber-900/30 rounded-lg px-4 py-2">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span className={`text-amber-200 ${is2 ? 'text-lg' : 'text-base'}`}>+<CountUp value={drop?.moedas ?? 0} /> moedas</span>
                </motion.div>
                {(drop?.itens ?? []).map((id, idx) => {
                  const c = getColecionavel(id);
                  if (!c) return null;
                  const rar = RARIDADE_INFO[c.raridade];
                  return (
                    <motion.div key={id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + idx * 0.15 }} className="flex items-center gap-2 rounded-lg px-4 py-2" style={{ background: rar.corBg }}>
                      <span className="text-2xl">{c.icone}</span>
                      <div className="flex-1">
                        <span className="text-white font-semibold text-sm">{c.nome}</span>
                        <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: rar.corBg, color: rar.cor }}>{rar.nome}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-400">NOVO!</span>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
          {/* Probabilidades transparentes */}
          <button onClick={() => setMostrarOdds((v) => !v)} className="mt-3 flex items-center gap-1 text-[11px] text-gray-400 hover:text-gray-300 mx-auto">
            <Info className="w-3.5 h-3.5" /> {mostrarOdds ? 'Esconder' : 'Ver'} probabilidades
          </button>
          {mostrarOdds && (
            <div className="mt-2 bg-slate-900/50 rounded-lg p-2 text-[11px] text-gray-300">
              <p className="mb-1 text-gray-400">Com {acertos}/5 acertos, as chances de baú eram:</p>
              <div className="grid grid-cols-4 gap-1 text-center">
                {(['comum','raro','epico','lendario'] as TierBau[]).map((t) => (
                  <div key={t} className="rounded p-1" style={{ background: `${TIER_INFO[t].cor}18` }}>
                    <div className="text-base">{TIER_INFO[t].icone}</div>
                    <div className="font-bold" style={{ color: TIER_INFO[t].cor }}>{odds[t]}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Celebrações: medalhas / troféus / missões */}
        {bauAberto && (medalhas.length > 0 || trofeus.length > 0 || missoes.length > 0) && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-2 mb-4">
            {medalhas.map((tema) => (
              <div key={`m-${tema}`} className="flex items-center gap-2 bg-amber-900/20 border border-amber-500/30 rounded-lg px-3 py-2">
                <span className="text-2xl">🏅</span>
                <span className="text-sm text-amber-200">Nova medalha: <b>{tema}</b> dominado!</span>
              </div>
            ))}
            {trofeus.map((id) => {
              const t = getTrofeu(id); if (!t) return null;
              return (
                <div key={`t-${id}`} className="flex items-center gap-2 bg-purple-900/20 border border-purple-500/30 rounded-lg px-3 py-2">
                  <span className="text-2xl">{t.icone}</span>
                  <span className="text-sm text-purple-200">Troféu: <b>{t.nome}</b>!</span>
                </div>
              );
            })}
            {missoes.map((m) => (
              <div key={`ms-${m.id}`} className="flex items-center gap-2 bg-emerald-900/20 border border-emerald-500/30 rounded-lg px-3 py-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-emerald-200">Missão concluída! Reclama na Base.</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Teasers */}
        <AnimatePresence>
          {bauAberto && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="bg-slate-800/40 rounded-2xl p-4 mb-4 border border-purple-700/15">
                <WorldMap batalhas={p?.batalhasConcluidas ?? 0} compacto />
              </div>
              {objetivos.length > 0 && (
                <div className="space-y-2 mb-5">
                  {objetivos.map((o, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-purple-100 bg-purple-900/20 rounded-lg px-3 py-2">
                      <span className="text-lg">{o.icone}</span><span>{o.texto}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botões */}
        <div className="flex flex-col gap-3">
          <GameButton variant="gold" size={is2 ? 'xl' : 'lg'} fullWidth onClick={handleJogarNovamente}>
            <Sword className="w-5 h-5 inline mr-2" /> JOGAR NOVAMENTE
          </GameButton>
          <GameButton variant="secondary" size="md" fullWidth onClick={() => router.push('/game')}>
            <Home className="w-4 h-4 inline mr-1" /> Ir para Base
          </GameButton>
        </div>
      </div>
    </div>
  );
}
