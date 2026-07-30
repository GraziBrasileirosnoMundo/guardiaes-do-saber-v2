'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { useBattle } from '@/hooks/useBattle';
import { useGame } from '@/hooks/useGame';
import { useMundoBackground } from '@/hooks/useMundoBackground';
import { useMundoContext } from '@/context/MundoContext';
import { MonsterSVG } from '@/components/monsters/monster-svg';
import { GuardianAvatar } from '@/components/guardians/guardian-avatar';
import { GuardianSpeech } from '@/components/guardians/guardian-speech';
import type { Expressao } from '@/components/guardians/lumis';
import { ProgressBar } from '@/components/ui/progress-bar';
import { GameButton } from '@/components/ui/game-button';
import { MONSTRO_NOMES } from '@/data/items';
import { mensagemGuardiao } from '@/data/guardian-messages';
import { registarEvento } from '@/lib/metrics';
import { ArrowLeft, Zap, Coins } from 'lucide-react';

const FRASES_ACERTO = ['Boa!', 'Fantástico!', 'Incrível!', 'Muito bem!', 'Excelente!'];

export function BattleScreen() {
  const { activeProfile, loaded, updateProfile } = useProfile();
  const { finalizarBatalha } = useGame();
  const { backgroundStyle } = useMundoBackground();
  const { setMundoSelecionado } = useMundoContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [showDamage, setShowDamage] = useState(false);
  const [guardMsg, setGuardMsg] = useState<string | null>(null);
  const [guardExpr, setGuardExpr] = useState<Expressao>('feliz');
  const endBattleProcessed = useRef(false);

  const { estado, feedback, batalhaTerminada, iniciarBatalha, responder, abandonar } = useBattle(
    activeProfile,
    updateProfile
  );

  // ✅ Ler mundoId da URL e setar no contexto
  useEffect(() => {
    const mundoId = searchParams?.get('mundoId');
    if (mundoId) {
      const id = parseInt(mundoId, 10);
      console.log('⚔️ BattleScreen - setando mundoId:', id);
      setMundoSelecionado(id);
    }
  }, [searchParams, setMundoSelecionado]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && loaded && activeProfile && !estado && !batalhaTerminada) {
      iniciarBatalha();
    }
  }, [mounted, loaded, activeProfile, estado, batalhaTerminada, iniciarBatalha]);

  useEffect(() => {
    if (feedback?.tipo === 'acerto') {
      setShowDamage(true);
      const t = setTimeout(() => setShowDamage(false), 400);
      return () => clearTimeout(t);
    }
  }, [feedback]);

  // Reset selection when question changes
  useEffect(() => {
    setSelectedIdx(null);
    setGuardMsg(null);
    setGuardExpr('feliz');
  }, [estado?.perguntaAtual]);

  // Guardião vivo: reage a cada resposta com expressão + mensagem positiva
  useEffect(() => {
    if (!feedback) return;
    if (feedback.tipo === 'acerto') {
      const combo = (estado?.sequenciaAcertos ?? 0) >= 3;
      const f = mensagemGuardiao(combo ? 'combo' : 'acerto');
      setGuardMsg(f.texto);
      setGuardExpr(f.expressao);
    } else {
      const f = mensagemGuardiao('erro');
      setGuardMsg(f.texto);
      setGuardExpr(f.expressao);
    }
  }, [feedback, estado?.sequenciaAcertos]);

  // BUG 1 FIX: Move end-of-battle processing to useEffect to avoid side effects during render
  useEffect(() => {
    if (!batalhaTerminada || !estado || !activeProfile || endBattleProcessed.current) return;
    endBattleProcessed.current = true;

    const duracao = Date.now() - (estado?.inicio ?? Date.now());
    const r = finalizarBatalha(activeProfile, estado, duracao);
    updateProfile(r.perfil);
    registarEvento(activeProfile.id, 'recompensa_aberta');
    registarEvento(activeProfile.id, 'bau_aberto', { tier: r.drop.tier });
    r.missoesConcluidas.forEach((m) => registarEvento(activeProfile.id, 'missao_concluida', { id: m.id }));
    r.medalhasNovas.forEach((t) => registarEvento(activeProfile.id, 'medalha_ganha', { tema: t }));
    r.trofeusNovos.forEach((t) => registarEvento(activeProfile.id, 'trofeu_ganho', { id: t }));
    r.drop.itens.forEach((id) => registarEvento(activeProfile.id, 'item_desbloqueado', { id }));
    try {
      sessionStorage?.setItem('gds_last_reward', JSON.stringify({
        acertos: r.acertos,
        moedasBatalha: estado?.moedasGanhas ?? 0,
        xpBatalha: (estado?.xpGanho ?? 0) + 10,
        drop: r.drop,
        subiuNivel: r.subiuNivel,
        nivelNovo: r.nivelNovo,
        medalhasNovas: r.medalhasNovas,
        trofeusNovos: r.trofeusNovos,
        missoesConcluidas: r.missoesConcluidas,
        comboMax: r.comboMax,
        multiplicador: r.multiplicador,
        rewardType: r.rewardType,
        moedasFinais: r.moedasTotais,
      }));
    } catch {}
    router.replace('/rewards');
  }, [batalhaTerminada, estado, activeProfile, finalizarBatalha, updateProfile, router]);

  if (!mounted || !loaded || !activeProfile) {
    return <div className="min-h-screen bg-[#0f0e1a] flex items-center justify-center"><div className="text-white">Carregando...</div></div>;
  }

  const p = activeProfile;
  const is2 = p?.ano === 2;

  // Show loading while processing end of battle
  if (batalhaTerminada) {
    return <div className="min-h-screen bg-[#0f0e1a]" />;
  }

  if (!estado) {
    return <div className="min-h-screen bg-[#0f0e1a]" />;
  }

  const pergunta = estado?.perguntas?.[estado?.perguntaAtual ?? 0];
  if (!pergunta) return null;
  const alternativas = pergunta?.alternativasEmbaralhadas ?? [];

  const handleResposta = (idx: number) => {
    if (feedback || selectedIdx !== null) return;
    setSelectedIdx(idx);
    responder(idx);
  };

  const getButtonStyle = (idx: number) => {
    if (!feedback) return 'bg-slate-700 hover:bg-slate-600 border-slate-600 text-white';
    if (idx === pergunta?.indiceCorretoEmbaralhado) return 'bg-emerald-600 border-emerald-400 text-white';
    if (idx === selectedIdx && feedback?.tipo === 'erro') return 'bg-red-600 border-red-400 text-white';
    return 'bg-slate-800 border-slate-700 text-gray-500';
  };

  return (
    <div
      className="min-h-screen flex flex-col p-4 relative"
      style={{
        backgroundColor: '#0f0e1a',
        backgroundImage: backgroundStyle.backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full max-w-md mx-auto flex flex-col flex-1">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { abandonar(); router.push('/game'); }} className="text-gray-500 hover:text-gray-300 p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-purple-400"><Zap className="w-4 h-4 inline" /> {estado?.xpGanho ?? 0} XP</span>
            <span className="text-amber-400"><Coins className="w-4 h-4 inline" /> {estado?.moedasGanhas ?? 0}</span>
          </div>
          <div className="text-sm text-gray-400">
            {(estado?.perguntaAtual ?? 0) + 1}/5
          </div>
        </div>

        {/* Combo indicator */}
        <div className="h-8 flex items-center justify-center mb-1">
          <AnimatePresence>
            {feedback?.tipo === 'acerto' && (estado?.sequenciaAcertos ?? 0) >= 2 && (
              <motion.div
                key={`combo-${estado?.sequenciaAcertos}`}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                className={`font-display font-bold px-4 py-1 rounded-full ${
                  (estado?.sequenciaAcertos ?? 0) >= 3
                    ? 'bg-amber-500/25 text-amber-300 text-lg'
                    : 'bg-orange-500/20 text-orange-300 text-base'
                }`}
              >
                {(estado?.sequenciaAcertos ?? 0) >= 3
                  ? `⚡ Poder Ativado! Combo x${estado?.sequenciaAcertos}`
                  : `🔥 Combo x${estado?.sequenciaAcertos}`}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Monster area */}
        <div className="flex flex-col items-center mb-4 relative">
          <p className={`font-display font-bold text-gray-300 mb-2 ${is2 ? 'text-lg' : 'text-base'}`}>
            {MONSTRO_NOMES?.[estado?.monstro ?? ''] ?? 'Monstro'}
          </p>
          <div className="relative">
            <MonsterSVG tipo={estado?.monstro ?? 'NEBLUS'} size={is2 ? 100 : 90} shake={showDamage} />
            {/* White flash on hit */}
            <AnimatePresence>
              {showDamage && (
                <motion.div
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0 rounded-full bg-white pointer-events-none"
                  style={{ mixBlendMode: 'overlay' }}
                />
              )}
            </AnimatePresence>
            {/* Flying coins toward top on correct answer */}
            <AnimatePresence>
              {showDamage && [0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`coin-${estado?.perguntaAtual}-${i}`}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{ opacity: 0, x: (i - 1.5) * 30, y: -120, scale: 0.5 }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.04 }}
                  className="absolute left-1/2 top-1/2 text-amber-400 text-lg pointer-events-none"
                >
                  🪙
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="w-48 mt-2">
            <ProgressBar
              value={estado?.monstroPV ?? 100}
              max={estado?.monstroPVMax ?? 100}
              color="#ef4444"
              height={10}
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`q-${estado?.perguntaAtual ?? 0}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
            className="flex-1 flex flex-col"
          >
            {/* Discipline badge */}
            <div className="flex justify-center mb-2">
              <span className={`text-xs px-3 py-1 rounded-full ${
                pergunta?.disciplina === 'Matematica'
                  ? 'bg-blue-900/50 text-blue-300'
                  : 'bg-amber-900/50 text-amber-300'
              }`}>
                {pergunta?.disciplina === 'Matematica' ? '📊 Matemática' : '📚 Português'}
              </span>
            </div>

            <div className="bg-slate-800/60 rounded-xl p-4 mb-4 border border-purple-700/15">
              <p className={`text-center font-semibold ${is2 ? 'text-xl' : 'text-lg'} text-white leading-relaxed`}>
                {pergunta?.enunciado ?? ''}
              </p>
            </div>

            {/* Alternatives */}
            <div className="flex flex-col gap-3">
              {alternativas?.map((alt: string, idx: number) => (
                <motion.button
                  key={`${estado?.perguntaAtual}-${idx}`}
                  whileTap={!feedback ? { scale: 0.97 } : {}}
                  onClick={() => handleResposta(idx)}
                  disabled={!!feedback}
                  className={`w-full border-2 rounded-xl transition-all font-medium text-left ${
                    is2 ? 'py-5 px-5 text-xl min-h-[64px]' : 'py-4 px-5 text-lg min-h-[56px]'
                  } ${getButtonStyle(idx)} ${!feedback ? 'cursor-pointer active:scale-[0.97]' : ''}`}
                >
                  {alt ?? ''}
                </motion.button>
              )) ?? null}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-4 rounded-xl p-4 text-center ${
                    feedback?.tipo === 'acerto'
                      ? 'bg-emerald-900/40 border border-emerald-600/30'
                      : 'bg-slate-800/60 border border-slate-600/30'
                  }`}
                >
                  {feedback?.tipo === 'acerto' ? (
                    <p className={`font-display font-bold text-emerald-300 ${is2 ? 'text-2xl' : 'text-xl'}`}>
                      {FRASES_ACERTO[(estado?.acertos ?? 0) % FRASES_ACERTO.length] ?? 'Boa!'}
                    </p>
                  ) : (
                    <p className={`text-gray-300 ${is2 ? 'text-lg' : 'text-base'}`}>
                      {feedback?.explicacao ?? ''}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Guardian at bottom — companheiro vivo */}
        <div className="flex flex-col items-center mt-4 gap-1">
          <div className="h-12 flex items-end">
            <GuardianSpeech texto={guardMsg} is2={is2} />
          </div>
          <motion.div
            animate={feedback?.tipo === 'acerto' ? { scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] } : { scale: 1 }}
            transition={{ duration: 0.45 }}
          >
            <GuardianAvatar
              perfil={p}
              size={is2 ? 66 : 56}
              glow={feedback?.tipo === 'acerto'}
              expressao={feedback ? guardExpr : 'feliz'}
              float={false}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
