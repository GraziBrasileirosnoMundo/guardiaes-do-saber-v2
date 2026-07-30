'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { useGame } from '@/hooks/useGame';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import { useMundoContext } from '@/context/MundoContext';
import { useMundoBackground } from '@/hooks/useMundoBackground';
import { Sparkles, Lock, ArrowLeft, Coins, Gem, Sword, Palette, Users, Flame, Star, Backpack, ShoppingBag, GraduationCap, Map, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { GuardianAvatar } from '@/components/guardians/guardian-avatar';
import { GuardianSpeech } from '@/components/guardians/guardian-speech';
import { CountUp } from '@/components/ui/count-up';
import { ProgressBar } from '@/components/ui/progress-bar';
import { GameButton } from '@/components/ui/game-button';
import { WorldMap } from '@/components/world/world-map';
import { MissionRow } from '@/components/game/mission-row';
import { WorldCardImage } from '@/components/game-hub/world-card-image';
import { PlayerStatusCard } from '@/components/game-hub/player-status-card';
import { DailyQuestsWidget } from '@/components/ui/daily-quests-widget';
import { GuardianHouse } from '@/components/game-hub/guardian-house';
import { LeaderboardWidget } from '@/components/game-hub/leaderboard-widget';
import { registarEvento } from '@/lib/metrics';
import { mensagemGuardiao } from '@/data/guardian-messages';
import { proximosObjetivos } from '@/lib/objectives';
import { garantirMissoes, reclamarMissao, podeReclamar, TipoMissao } from '@/lib/missions';
import { useDailyQuests } from '@/hooks/useDailyQuests';

const MUNDOS = [
  {
    id: 1,
    nome: 'Portal Magico',
    descricao: 'A passagem para novos mundos',
    batalhaPara: 1,
    background: 'from-purple-900 via-blue-900 to-cyan-900',
    borderColor: 'border-cyan-500/50',
    shadowColor: 'shadow-cyan-500/30',
    locked: false,
    completed: true,
  },
  {
    id: 2,
    nome: 'Laboratorio Magico',
    descricao: 'Experiências e descobertas incríveis',
    batalhaPara: 5,
    background: 'from-green-900 via-teal-900 to-cyan-900',
    borderColor: 'border-green-500/50',
    shadowColor: 'shadow-green-500/30',
    locked: false,
    completed: false,
  },
  {
    id: 3,
    nome: 'Arena dos Guardioes',
    descricao: 'Enfrenta outros Guardioes e prova o teu valor',
    batalhaPara: 10,
    background: 'from-red-900 via-orange-900 to-yellow-900',
    borderColor: 'border-orange-500/50',
    shadowColor: 'shadow-orange-500/30',
    locked: false,
    completed: false,
  },
  {
    id: 4,
    nome: 'Castelo Dourado',
    descricao: 'Um palacio antigo cheio de misterios',
    batalhaPara: 18,
    background: 'from-blue-900 via-indigo-900 to-purple-900',
    borderColor: 'border-blue-500/50',
    shadowColor: 'shadow-blue-500/30',
    locked: true,
    completed: false,
  },
  {
    id: 5,
    nome: 'Floresta Encantada',
    descricao: 'Desafios secretos e criaturas misteriosas',
    batalhaPara: 28,
    background: 'from-green-900 via-emerald-900 to-teal-900',
    borderColor: 'border-emerald-500/50',
    shadowColor: 'shadow-emerald-500/30',
    locked: true,
    completed: false,
  },
  {
    id: 6,
    nome: 'Montanha Gelada',
    descricao: 'Picos cobertos de gelo e neve eterna',
    batalhaPara: 45,
    background: 'from-cyan-900 via-blue-900 to-indigo-900',
    borderColor: 'border-cyan-500/50',
    shadowColor: 'shadow-cyan-500/30',
    locked: true,
    completed: false,
  },
  {
    id: 7,
    nome: 'Templo Antigo',
    descricao: 'Ruinas misteriosas carregadas de poder',
    batalhaPara: 60,
    background: 'from-yellow-900 via-orange-900 to-red-900',
    borderColor: 'border-yellow-500/50',
    shadowColor: 'shadow-yellow-500/30',
    locked: true,
    completed: false,
  },
  {
    id: 8,
    nome: 'Tesouro Final',
    descricao: 'Um baú cheio de surpresas épicas espera por ti!',
    batalhaPara: 999,
    background: 'from-yellow-700 via-red-700 to-purple-700',
    borderColor: 'border-yellow-500/50',
    shadowColor: 'shadow-yellow-500/50',
    locked: true,
    completed: false,
  },
];

export function GameHub() {
  const { activeProfile, loaded, updateProfile } = useProfile();
  const { getNivelInfo } = useGame();
  const { playSound } = useSoundEffect();
  const { mundoSelecionado, setMundoSelecionado } = useMundoContext();
  const { backgroundStyle } = useMundoBackground();
  const { quests, bonusCompletado } = useDailyQuests(activeProfile);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [saudacao] = useState(() => mensagemGuardiao('boas_vindas'));
  const [mostrarLoja, setMostrarLoja] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    if (loaded && !activeProfile) router.replace('/');
    playSound('suspense');
  }, [loaded, activeProfile, router, playSound]);

  useEffect(() => {
    if (activeProfile?.id) registarEvento(activeProfile.id, 'jogo_aberto');
  }, [activeProfile?.id]);

  useEffect(() => {
    if (!loaded || !activeProfile) return;
    const upd = garantirMissoes(activeProfile);
    if (
      upd.missaoDiaria?.periodoKey !== activeProfile.missaoDiaria?.periodoKey ||
      upd.missaoSemanal?.periodoKey !== activeProfile.missaoSemanal?.periodoKey ||
      upd.missaoMensal?.periodoKey !== activeProfile.missaoMensal?.periodoKey
    ) {
      updateProfile(upd);
    }
  }, [loaded, activeProfile?.id, activeProfile?.missaoDiaria?.periodoKey, activeProfile?.missaoSemanal?.periodoKey, activeProfile?.missaoMensal?.periodoKey]);

  const handleParentsDown = useCallback((e: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    e?.preventDefault?.();
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      longPressTimer.current = null;
      router.push('/parents');
    }, 3000);
  }, [router]);

  const handleParentsUp = useCallback(() => {
    if (longPressTimer.current) { clearTimeout(longPressTimer.current); longPressTimer.current = null; }
  }, []);

  useEffect(() => () => { if (longPressTimer.current) clearTimeout(longPressTimer.current); }, []);

  const handleReclamar = useCallback((tipo: TipoMissao) => {
    if (!activeProfile) return;
    const { perfil, recompensa } = reclamarMissao(activeProfile, tipo);
    if (recompensa) {
      playSound('success');
      updateProfile(perfil);
      registarEvento(activeProfile.id, 'missao_concluida', { tipo, reclamada: true });
    }
  }, [activeProfile, updateProfile, playSound]);

  if (!mounted || !loaded || !activeProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }}>
          <Sparkles className="w-12 h-12 text-purple-400" />
        </motion.div>
      </div>
    );
  }

  const p = activeProfile;
  const is2 = p?.ano === 2;
  const nivelInfo = getNivelInfo(p?.xp ?? 0);
  const fontSize = is2 ? 'text-xl' : 'text-lg';
  const objetivos = proximosObjetivos(p);
  const temReclamavel = podeReclamar(p.missaoDiaria) || podeReclamar(p.missaoSemanal) || podeReclamar(p.missaoMensal);
  const completedWorlds = MUNDOS.filter(m => m.completed).length;

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-slate-950 via-purple-950 to-slate-950 pb-20"
      style={{
        backgroundColor: '#0f0e1a',
        ...backgroundStyle,
      }}
    >
      <div className="relative overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-yellow-500/10 to-orange-500/10 blur-3xl" />

        <div className="relative px-4 py-6 max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 mb-6">
            <GuardianAvatar perfil={p} size={is2 ? 78 : 68} />
            <div className="flex-1 pt-1">
              <div className="mb-2"><GuardianSpeech texto={saudacao.texto} is2={is2} /></div>
              <h2 className={`font-display font-bold text-white ${is2 ? 'text-xl' : 'text-lg'} leading-tight`}>{p?.apelido ?? 'Jogador'}</h2>
              <p className="text-xs text-gray-400">{p?.ano ?? 2}.º Ano — {p?.nomeGuardiao ?? ''}</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-purple-900/30 rounded-xl p-3 text-center border border-purple-700/20">
              <Star className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className={`font-bold text-white ${fontSize}`}>Nível {nivelInfo?.nivel ?? 1}</p>
            </div>
            <div className="bg-amber-900/30 rounded-xl p-3 text-center border border-amber-700/20">
              <Coins className="w-5 h-5 text-amber-400 mx-auto mb-1" />
              <p className={`font-bold text-white ${fontSize}`}><CountUp value={p?.moedas ?? 0} /></p>
            </div>
            <div className="bg-orange-900/30 rounded-xl p-3 text-center border border-orange-700/20">
              <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
              <p className={`font-bold text-white ${fontSize}`}>{p?.sequenciaAtual ?? 0} dias</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mb-4">
            <ProgressBar value={nivelInfo?.progresso ?? 0} max={100} color="#7c3aed" height={14} label={`XP: ${p?.xp ?? 0}`} showPercent />
          </motion.div>

          {objetivos.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} className="space-y-2 mb-4">
              {objetivos.slice(0, 2).map((o, i) => (
                <div key={i} className="flex items-center gap-2 text-sm bg-slate-800/40 rounded-lg px-3 py-2 border border-purple-700/10">
                  <span className="text-lg">{o.icone}</span>
                  <span className="text-gray-200">{o.texto}</span>
                </div>
              ))}
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black text-transparent bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 bg-clip-text">
                MUNDOS DOS GUARDIÕES
              </h2>
              <div className="text-sm font-bold text-gray-300">{completedWorlds}/{MUNDOS.length}</div>
            </div>
            <p className="text-gray-400 text-sm mb-4">Explore, aprenda e conquista cada lugar mágico!</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MUNDOS.map((mundo, idx) => (
                <motion.button
                  key={mundo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ y: -8 }}
                  onMouseEnter={() => playSound('hover')}
                  onClick={() => {
                    if (mundo.locked) {
                      playSound('error');
                    } else {
                      playSound('click');
                      setMundoSelecionado(mundo.id);
                      router.push(`/battle?mundoId=${mundo.id}`);
                    }
                  }}
                  className="group cursor-pointer bg-transparent border-none p-0"
                  disabled={mundo.locked}
                >
                  <div className={`relative h-40 bg-gradient-to-br ${mundo.background} rounded-2xl border-2 ${mundo.borderColor} overflow-hidden transition-all group-hover:shadow-2xl group-hover:${mundo.shadowColor}`}>
                    <WorldCardImage mundoId={mundo.id} nome={mundo.nome} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    {mundo.locked && (
                      <div className="absolute top-3 right-3 bg-slate-800/80 p-2 rounded-lg z-10">
                        <Lock className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 flex flex-col justify-end p-3 z-5">
                      <h3 className="text-lg font-black text-white mb-1">{mundo.nome}</h3>
                      <p className="text-xs text-gray-300 mb-1 line-clamp-1">{mundo.descricao}</p>
                      <p className="text-xs font-bold text-amber-300">{mundo.batalhaPara} batalhas</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mb-5">
            <PlayerStatusCard perfil={p} is2={is2} />
          </motion.div>

          {quests.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.24 }} className="mb-5">
              <DailyQuestsWidget quests={quests} bonusCompletado={bonusCompletado} />
            </motion.div>
          )}

          {activeProfile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }} className="mb-5">
              <GuardianHouse
                perfil={activeProfile}
                onAbrirLoja={() => setMostrarLoja(true)}
                is2={is2}
              />
            </motion.div>
          )}

          {activeProfile && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="mb-5">
              <LeaderboardWidget
                perfilAtual={activeProfile}
                todosOsPerfis={[activeProfile]}
                is2={is2}
              />
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22 }} className="mb-5">
            <GameButton variant="gold" size="xl" fullWidth onClick={() => { playSound('success'); router.push(`/battle?mundoId=${mundoSelecionado}`); }}>
              <Sword className="w-6 h-6 inline mr-2" /> JOGAR AGORA
            </GameButton>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.26 }} className="bg-slate-800/30 rounded-2xl p-4 mb-5 border border-purple-700/15">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="font-display font-bold text-purple-200">Missões</h3>
              {temReclamavel && <span className="ml-auto text-[10px] bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">Recompensa!</span>}
            </div>
            <div className="space-y-2">
              <MissionRow titulo="Diária" missao={p.missaoDiaria ?? null} onReclamar={() => handleReclamar('diaria')} is2={is2} />
              <MissionRow titulo="Semanal" missao={p.missaoSemanal ?? null} onReclamar={() => handleReclamar('semanal')} is2={is2} />
              <MissionRow titulo="Mensal" missao={p.missaoMensal ?? null} onReclamar={() => handleReclamar('mensal')} is2={is2} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative my-8 overflow-hidden rounded-2xl border border-purple-500/20">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950/80 z-10" />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="relative z-0">
          <WorldMap batalhas={p?.batalhasConcluidas ?? 0} compacto={false} />
        </motion.div>
        <div className="absolute inset-0 z-20 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-5">
          <button onClick={() => router.push('/world')} className="w-full text-xs text-purple-300 hover:text-purple-200 font-semibold mb-4">
            Ver o mundo completo →
          </button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          <NavTile icon={<Backpack className="w-5 h-5" />} label="Coleção" onClick={() => router.push('/collection')} />
          <NavTile icon={<ShoppingBag className="w-5 h-5" />} label="Loja" onClick={() => router.push('/shop')} />
          <NavTile icon={<GraduationCap className="w-5 h-5" />} label="Competências" onClick={() => router.push('/skills')} />
          <NavTile icon={<Palette className="w-5 h-5" />} label="Personalizar" onClick={() => router.push('/customize')} />
          <NavTile icon={<Map className="w-5 h-5" />} label="Mundo" onClick={() => router.push('/world')} />
          <NavTile icon={<Users className="w-5 h-5" />} label="Trocar Perfil" onClick={() => router.push('/')} />
        </div>
      </div>

      <div className="fixed bottom-4 right-4">
        <button
          onMouseDown={handleParentsDown}
          onMouseUp={handleParentsUp}
          onMouseLeave={handleParentsUp}
          onTouchStart={handleParentsDown}
          onTouchEnd={handleParentsUp}
          onTouchCancel={handleParentsUp}
          onContextMenu={(e: React.MouseEvent) => e?.preventDefault?.()}
          className="flex items-center gap-1 px-3 py-2 text-xs text-gray-500 hover:text-gray-400 transition-colors rounded-lg bg-slate-900/50 select-none touch-none"
        >
          <Lock className="w-3 h-3" /> Área dos Pais
        </button>
      </div>
    </div>
  );
}

function NavTile({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  const { playSound } = useSoundEffect();

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => { playSound('click'); onClick(); }}
      onMouseEnter={() => playSound('hover')}
      className="flex flex-col items-center justify-center gap-1.5 bg-slate-800/60 hover:bg-slate-700/60 rounded-xl py-3 border border-purple-700/10 text-purple-200 transition-colors"
    >
      {icon}
      <span className="text-[11px] font-semibold text-gray-200">{label}</span>
    </motion.button>
  );
}
