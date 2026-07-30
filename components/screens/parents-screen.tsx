'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { getMetrics } from '@/lib/storage';
import { GameButton } from '@/components/ui/game-button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { calcularCompetencias } from '@/lib/competencias';
import { calcularNivel } from '@/lib/gameLogic';
import { Perfil, EventoMetrica } from '@/types';
import { X, BarChart3, AlertTriangle, TrendingUp, CheckCircle2, GraduationCap, CalendarDays } from 'lucide-react';

function analisar(perfil: Perfil | null, metrics: EventoMetrica[]) {
  if (!perfil) return null;
  const agora = Date.now();
  const seteDias = agora - 7 * 24 * 60 * 60 * 1000;

  const competencias = calcularCompetencias(perfil);
  const comTentativas = competencias.filter((c) => c.tentativas > 0);
  const domina = comTentativas.filter((c) => c.dominado || c.taxa >= 70).sort((a, b) => b.taxa - a.taxa);
  const dificuldades = comTentativas.filter((c) => c.taxa < 50 && c.tentativas >= 2).sort((a, b) => a.taxa - b.taxa);
  const rever = comTentativas.filter((c) => c.taxa >= 50 && c.taxa < 70).sort((a, b) => a.taxa - b.taxa);

  // por disciplina
  const agg = (disc: string) => {
    const lista = comTentativas.filter((c) => c.disciplina === disc);
    const ac = lista.reduce((s, c) => s + c.acertos, 0);
    const te = lista.reduce((s, c) => s + c.tentativas, 0);
    return te > 0 ? Math.round((ac / te) * 100) : 0;
  };
  const matTaxa = agg('Matematica');
  const ptTaxa = agg('Portugues');
  const estudoTaxa = agg('Estudo do Meio');
  const inglesTaxa = agg('Ingles');

  // engajamento (metrics)
  const diasUnicos = new Set(metrics.map((m) => m?.timestamp?.split('T')?.[0] ?? '').filter(Boolean));
  const perguntas = metrics.filter((m) => m?.tipo === 'pergunta_respondida');
  const ultimos7 = metrics.filter((m) => new Date(m?.timestamp ?? 0).getTime() >= seteDias);
  const ultimos7batalhas = ultimos7.filter((m) => m?.tipo === 'batalha_concluida');

  const progressoSemanal: { dia: string; batalhas: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(agora - i * 24 * 60 * 60 * 1000);
    const dStr = d.toISOString().split('T')[0] ?? '';
    const diaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][d.getDay()] ?? '';
    const b = ultimos7batalhas.filter((m) => (m?.timestamp?.split('T')?.[0] ?? '') === dStr).length;
    progressoSemanal.push({ dia: diaSemana, batalhas: b });
  }

  const recomendacoes: string[] = [];
  for (const d of dificuldades.slice(0, 3)) {
    const nomeDisciplina =
      d.disciplina === 'Matematica' ? 'Matemática' :
      d.disciplina === 'Portugues' ? 'Português' :
      d.disciplina === 'Estudo do Meio' ? 'Estudo do Meio' :
      'Inglês';
    recomendacoes.push(`Rever “${d.tema}” (${nomeDisciplina}) — ${d.taxa}% de acerto`);
  }
  if (dificuldades.length === 0 && rever.length > 0) recomendacoes.push(`Consolidar “${rever[0].tema}” para chegar ao domínio`);
  if (recomendacoes.length === 0) recomendacoes.push('Excelente! Continua a praticar um pouco todos os dias.');

  return {
    nivel: calcularNivel(perfil.xp ?? 0),
    medalhas: (perfil.medalhas ?? []).length,
    dominadas: competencias.filter((c) => c.dominado).length,
    totalCompetencias: competencias.length,
    diasUnicos: diasUnicos.size,
    perguntasRespondidas: perguntas.length,
    batalhas: perfil.batalhasConcluidas ?? 0,
    matTaxa, ptTaxa, estudoTaxa, inglesTaxa,
    domina, dificuldades, rever,
    progressoSemanal,
    recomendacoes,
  };
}

export function ParentsScreen() {
  const { profiles, loaded } = useProfile();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (loaded && profiles?.length > 0 && !selectedId) setSelectedId(profiles?.[0]?.id ?? null);
  }, [loaded, profiles, selectedId]);

  const selectedProfile = profiles?.find((p: Perfil) => p?.id === selectedId) ?? null;
  const metrics = useMemo(() => selectedId ? getMetrics(selectedId) : [], [selectedId]);
  const stats = useMemo(() => analisar(selectedProfile, metrics), [selectedProfile, metrics]);

  if (!mounted || !loaded) return <div className="min-h-screen bg-[#0f0e1a]" />;

  return (
    <div className="min-h-screen bg-[#0f0e1a] p-4 overflow-y-auto">
      <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-display text-2xl font-bold text-purple-300 flex items-center gap-2"><BarChart3 className="w-6 h-6" /> Área dos Pais</h2>
          <button onClick={() => router.push('/game')} className="text-gray-400 hover:text-white p-2"><X className="w-6 h-6" /></button>
        </div>
        <p className="text-xs text-gray-500 mb-5">Foco na aprendizagem: o que o seu filho domina, onde precisa de apoio e como tem evoluído.</p>

        {profiles?.length > 1 && (
          <div className="flex gap-2 mb-6">
            {profiles?.map((p: Perfil) => (
              <button key={p?.id} onClick={() => setSelectedId(p?.id ?? null)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold text-sm transition-colors ${selectedId === p?.id ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-400'}`}>
                {p?.apelido ?? 'Perfil'} ({p?.ano ?? 2}.º)
              </button>
            ))}
          </div>
        )}

        {!selectedProfile || !stats ? (
          <p className="text-gray-400 text-center">Nenhum perfil selecionado</p>
        ) : (
          <div className="space-y-4">
            <Section title="Evolução" icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}>
              <div className="grid grid-cols-2 gap-3">
                <StatBox label="Nível atual" value={stats.nivel} />
                <StatBox label="Competências dominadas" value={`${stats.dominadas}/${stats.totalCompetencias}`} />
                <StatBox label="Medalhas conquistadas" value={stats.medalhas} />
                <StatBox label="Dias ativos" value={stats.diasUnicos} />
              </div>
            </Section>

            <Section title="Desempenho por Disciplina">
              <div className="space-y-3">
                <BarLinha rotulo="📊 Matemática" valor={stats.matTaxa} cor="#3b82f6" />
                <BarLinha rotulo="📚 Português" valor={stats.ptTaxa} cor="#f59e0b" />
                <BarLinha rotulo="🌍 Estudo do Meio" valor={stats.estudoTaxa} cor="#10b981" />
                <BarLinha rotulo="🗣️ Inglês" valor={stats.inglesTaxa} cor="#ec4899" />
              </div>
            </Section>

            <Section title="O que já domina" icon={<CheckCircle2 className="w-4 h-4 text-emerald-400" />}>
              {stats.domina.length === 0 ? (
                <p className="text-sm text-gray-400">Ainda a construir domínio. Cada batalha conta!</p>
              ) : (
                <div className="space-y-2">
                  {stats.domina.slice(0, 8).map((c) => (
                    <LinhaTema key={c.tema} tema={c.tema} disciplina={c.disciplina} taxa={c.taxa} cor="#10b981" dominado={c.dominado} />
                  ))}
                </div>
              )}
            </Section>

            {stats.dificuldades.length > 0 && (
              <Section title="Onde precisa de apoio" icon={<AlertTriangle className="w-4 h-4 text-amber-400" />}>
                <div className="space-y-2">
                  {stats.dificuldades.slice(0, 8).map((c) => (
                    <LinhaTema key={c.tema} tema={c.tema} disciplina={c.disciplina} taxa={c.taxa} cor="#ef4444" />
                  ))}
                </div>
              </Section>
            )}

            <Section title="Atividade dos últimos 7 dias" icon={<CalendarDays className="w-4 h-4 text-purple-400" />}>
              <div className="flex items-end justify-between gap-1 h-24">
                {stats.progressoSemanal.map((d, i) => {
                  const maxB = Math.max(1, ...stats.progressoSemanal.map((x) => x.batalhas));
                  const h = Math.max(6, (d.batalhas / maxB) * 80);
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <span className="text-[10px] text-gray-400">{d.batalhas}</span>
                      <div className="w-full rounded-t bg-purple-500" style={{ height: `${h}px` }} />
                      <span className="text-[10px] text-gray-500 mt-1">{d.dia}</span>
                    </div>
                  );
                })}
              </div>
            </Section>

            <Section title="Recomendações" icon={<GraduationCap className="w-4 h-4 text-emerald-400" />}>
              <div className="space-y-2">
                {stats.recomendacoes.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 bg-emerald-900/15 rounded-lg px-3 py-2">
                    <span className="text-emerald-400 mt-0.5">💡</span>
                    <span className="text-sm text-emerald-100">{r}</span>
                  </div>
                ))}
              </div>
            </Section>

            <div className="pb-6">
              <GameButton variant="secondary" fullWidth onClick={() => router.push('/game')}>Fechar</GameButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, children, icon }: { title: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="bg-slate-800/40 rounded-xl p-4 border border-purple-700/10">
      <h3 className="font-display text-sm font-bold text-purple-300 mb-3 flex items-center gap-2">{icon}{title}</h3>
      {children}
    </div>
  );
}

function StatBox({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-slate-900/50 rounded-lg p-3 text-center">
      <p className="text-lg font-bold text-white">{value ?? 0}</p>
      <p className="text-[11px] text-gray-500">{label ?? ''}</p>
    </div>
  );
}

function BarLinha({ rotulo, valor, cor }: { rotulo: string; valor: number; cor: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1"><span className="text-gray-300">{rotulo}</span><span className="text-gray-400">{valor}%</span></div>
      <ProgressBar value={valor} color={cor} height={10} />
    </div>
  );
}

function LinhaTema({ tema, disciplina, taxa, cor, dominado }: { tema: string; disciplina: string; taxa: number; cor: string; dominado?: boolean }) {
  const sigla =
    disciplina === 'Matematica' ? 'Mat' :
    disciplina === 'Portugues' ? 'Port' :
    disciplina === 'Estudo do Meio' ? 'E.M' :
    'Ing';
  return (
    <div className="flex items-center justify-between bg-slate-800/30 rounded-lg px-3 py-2">
      <span className="text-sm text-gray-300 truncate mr-2 flex items-center gap-1">{dominado && '🏅'}{tema}<span className="text-[10px] text-gray-500">({sigla})</span></span>
      <div className="flex items-center gap-2">
        <div className="w-20"><ProgressBar value={taxa} color={cor} height={6} /></div>
        <span className="text-xs font-bold" style={{ color: cor }}>{taxa}%</span>
      </div>
    </div>
  );
}
