'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { GameButton } from '@/components/ui/game-button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { calcularCompetencias, DOMINIO_TAXA_MIN, DOMINIO_TENTATIVAS_MIN } from '@/lib/competencias';
import { CompetenciaProgresso } from '@/types';
import { ArrowLeft, Award, X, GraduationCap } from 'lucide-react';

export function SkillsScreen() {
  const { activeProfile, loaded } = useProfile();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [certificado, setCertificado] = useState<CompetenciaProgresso | null>(null);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !loaded || !activeProfile) return <div className="min-h-screen bg-[#0f0e1a]" />;

  const p = activeProfile;
  const competencias = calcularCompetencias(p);
  const mat = competencias.filter((c) => c.disciplina === 'Matematica');
  const pt = competencias.filter((c) => c.disciplina === 'Portugues');
  const dominadas = competencias.filter((c) => c.dominado).length;

  const corBarra = (c: CompetenciaProgresso) => c.dominado ? '#f59e0b' : c.taxa >= 50 ? '#10b981' : c.tentativas > 0 ? '#ef4444' : '#64748b';

  const Bloco = ({ titulo, cor, lista }: { titulo: string; cor: string; lista: CompetenciaProgresso[] }) => (
    <div className="mb-5">
      <h3 className="font-display text-sm font-bold mb-2" style={{ color: cor }}>{titulo}</h3>
      <div className="space-y-2">
        {lista.map((c) => (
          <div key={c.tema} className="bg-slate-800/40 rounded-xl p-3 border border-purple-700/10">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-white font-semibold flex items-center gap-1.5">
                {c.dominado && <span className="text-base">🏅</span>}{c.tema}
              </span>
              <span className="text-xs font-bold" style={{ color: corBarra(c) }}>{c.taxa}%</span>
            </div>
            <ProgressBar value={c.taxa} color={corBarra(c)} height={8} />
            <div className="flex items-center justify-between mt-1.5">
              <span className="text-[11px] text-gray-500">{c.tentativas} {c.tentativas === 1 ? 'resposta' : 'respostas'}</span>
              {c.dominado ? (
                <button onClick={() => setCertificado(c)} className="text-[11px] font-bold text-amber-300 flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Ver certificado</button>
              ) : c.tentativas === 0 ? (
                <span className="text-[11px] text-gray-500">Ainda por treinar</span>
              ) : c.taxa < DOMINIO_TAXA_MIN ? (
                <span className="text-[11px] text-gray-500">Faltam {DOMINIO_TAXA_MIN - c.taxa}% de acerto</span>
              ) : (
                <span className="text-[11px] text-gray-500">Responde a +{Math.max(1, DOMINIO_TENTATIVAS_MIN - c.tentativas)} para a medalha</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f0e1a] p-4 pb-10">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push('/game')} className="text-gray-400 hover:text-white p-2"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="font-display text-2xl font-bold text-purple-300">Competências</h2>
        </div>

        <div className="bg-gradient-to-r from-purple-900/30 to-amber-900/20 rounded-2xl p-4 mb-5 border border-purple-700/15 text-center">
          <GraduationCap className="w-7 h-7 text-amber-300 mx-auto mb-1" />
          <p className="text-sm text-gray-200">Dominaste <b className="text-amber-300">{dominadas}</b> de <b className="text-white">{competencias.length}</b> competências!</p>
          <p className="text-[11px] text-gray-400 mt-1">Chega a {DOMINIO_TAXA_MIN}% de acerto para ganhares a medalha e o certificado.</p>
        </div>

        <Bloco titulo="📊 Matemática" cor="#60a5fa" lista={mat} />
        <Bloco titulo="📚 Português" cor="#fbbf24" lista={pt} />

        <GameButton variant="secondary" fullWidth onClick={() => router.push('/game')}>Voltar</GameButton>
      </div>

      {/* Certificado */}
      <AnimatePresence>
        {certificado && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setCertificado(null)}>
            <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0 }} onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl p-6 text-center relative" style={{ background: 'linear-gradient(135deg,#fef3c7,#fde68a)', border: '4px double #b45309' }}>
              <button onClick={() => setCertificado(null)} className="absolute top-2 right-2 text-amber-900/70"><X className="w-5 h-5" /></button>
              <div className="text-5xl mb-1">🏅</div>
              <p className="font-display text-xs font-bold text-amber-800 uppercase tracking-widest">Certificado de Domínio</p>
              <div className="my-3 border-t border-b border-amber-700/40 py-3">
                <p className="text-amber-900 text-sm">Atribuído a</p>
                <p className="font-display text-2xl font-bold text-amber-950">{p?.apelido}</p>
                <p className="text-amber-900 text-sm mt-2">por dominar</p>
                <p className="font-display text-xl font-bold text-amber-950">{certificado.tema}</p>
                <p className="text-amber-800 text-xs mt-1">{certificado.disciplina === 'Matematica' ? 'Matemática' : 'Português'} — {certificado.taxa}% de acerto</p>
              </div>
              <p className="text-[11px] text-amber-800">Guardião {p?.nomeGuardiao} • Guardiões do Saber</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
