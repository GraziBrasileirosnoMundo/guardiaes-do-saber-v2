'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useProfile } from '@/hooks/useProfile';
import { GameButton } from '@/components/ui/game-button';
import { CollectibleCard } from '@/components/collection/collectible-card';
import { COLECIONAVEIS, CATEGORIA_INFO, RARIDADE_INFO, CATEGORIAS_EQUIPAVEIS } from '@/data/collection';
import { TROFEUS } from '@/data/trophies';
import { calcularCompetencias } from '@/lib/competencias';
import { registarEvento } from '@/lib/metrics';
import { ArrowLeft } from 'lucide-react';

type Aba = 'itens' | 'medalhas' | 'trofeus';

export function CollectionScreen() {
  const { activeProfile, loaded } = useProfile();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [aba, setAba] = useState<Aba>('itens');

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { if (activeProfile?.id) registarEvento(activeProfile.id, 'colecao_aberta'); }, [activeProfile?.id]);

  if (!mounted || !loaded || !activeProfile) return <div className="min-h-screen bg-[#0f0e1a]" />;

  const p = activeProfile;
  const colecao = new Set(p?.colecao ?? []);
  const itensColecionaveis = COLECIONAVEIS.filter((c) => CATEGORIAS_EQUIPAVEIS.includes(c.categoria));
  const totalItens = itensColecionaveis.length;
  const possuidos = itensColecionaveis.filter((c) => colecao.has(c.id)).length;

  const medalhas = p?.medalhas ?? [];
  const competencias = calcularCompetencias(p);
  const trofeus = new Set(p?.trofeus ?? []);

  return (
    <div className="min-h-screen bg-[#0f0e1a] p-4 pb-10">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push('/game')} className="text-gray-400 hover:text-white p-2"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="font-display text-2xl font-bold text-purple-300">Coleção</h2>
        </div>

        <div className="flex gap-2 mb-4">
          {([['itens','Itens'],['medalhas','Medalhas'],['trofeus','Troféus']] as [Aba,string][]).map(([k,label]) => (
            <button key={k} onClick={() => setAba(k)} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${aba === k ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-400'}`}>{label}</button>
          ))}
        </div>

        {aba === 'itens' && (
          <>
            <p className="text-center text-sm text-gray-300 mb-3">Colecionaste <b className="text-amber-300">{possuidos}</b> de <b className="text-white">{totalItens}</b> itens</p>
            {CATEGORIAS_EQUIPAVEIS.map((catId) => {
              const itens = COLECIONAVEIS.filter((c) => c.categoria === catId);
              if (itens.length === 0) return null;
              return (
                <div key={catId} className="mb-5">
                  <h3 className="font-display text-sm font-bold text-purple-200 mb-2 flex items-center gap-1">
                    <span>{CATEGORIA_INFO[catId]?.icone}</span> {CATEGORIA_INFO[catId]?.nome}
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {itens.map((item) => (
                      <CollectibleCard key={item.id} item={item} owned={colecao.has(item.id)} modo="colecao" />
                    ))}
                  </div>
                </div>
              );
            })}
          </>
        )}

        {aba === 'medalhas' && (
          <div className="space-y-2">
            <p className="text-center text-sm text-gray-300 mb-2">Medalhas por dominar cada competência (85%+ de acerto)</p>
            {competencias.map((c) => {
              const ganha = medalhas.includes(c.tema) || c.dominado;
              return (
                <div key={c.tema} className={`flex items-center gap-3 rounded-xl px-3 py-3 border ${ganha ? 'border-amber-500/40 bg-amber-900/15' : 'border-slate-700/40 bg-slate-800/40'}`}>
                  <span className="text-3xl" style={{ filter: ganha ? 'none' : 'grayscale(1) brightness(0.6)' }}>🏅</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{c.tema}</p>
                    <p className="text-xs text-gray-400">{c.disciplina === 'Matematica' ? 'Matemática' : 'Português'} — {c.taxa}% de acerto</p>
                  </div>
                  {ganha ? <span className="text-xs font-bold text-amber-300">Dominado!</span> : <span className="text-xs text-gray-500">Em progresso</span>}
                </div>
              );
            })}
          </div>
        )}

        {aba === 'trofeus' && (
          <div className="grid grid-cols-2 gap-2">
            {TROFEUS.map((t) => {
              const ganho = trofeus.has(t.id);
              const rar = RARIDADE_INFO[t.raridade];
              return (
                <div key={t.id} className="rounded-xl p-3 flex flex-col items-center text-center border" style={{ borderColor: ganho ? `${rar.cor}66` : 'rgba(100,116,139,0.2)', background: ganho ? rar.corBg : 'rgba(15,23,42,0.5)' }}>
                  <span className="text-4xl my-1" style={{ filter: ganho ? 'none' : 'grayscale(1) brightness(0.5)' }}>{ganho ? t.icone : '🔒'}</span>
                  <p className="text-xs font-bold text-white">{t.nome}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{t.descricao}</p>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-6"><GameButton variant="secondary" fullWidth onClick={() => router.push('/game')}>Voltar</GameButton></div>
      </div>
    </div>
  );
}
