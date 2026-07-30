'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { GameButton } from '@/components/ui/game-button';
import { CountUp } from '@/components/ui/count-up';
import { CollectibleCard } from '@/components/collection/collectible-card';
import { Shopkeeper, getRandomShopkeeperLine, getShopkeeperReaction, type ShopkeeperMessage } from '@/components/shop/shopkeeper';
import { COLECIONAVEIS, CATEGORIA_INFO, CATEGORIAS_EQUIPAVEIS } from '@/data/collection';
import { HOUSE_ITEMS } from '@/data/house-items';
import { Colecionavel } from '@/types';
import { registarEvento } from '@/lib/metrics';
import { getAudioManager } from '@/lib/audio';
import { ArrowLeft, Coins, X, Check } from 'lucide-react';

export function ShopScreen() {
  const { activeProfile, loaded, updateProfile } = useProfile();
  const router = useRouter();
  const audio = getAudioManager();
  const [mounted, setMounted] = useState(false);
  const [selecionado, setSelecionado] = useState<Colecionavel | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [shopkeeperMessage, setShopkeeperMessage] = useState<ShopkeeperMessage | null>(null);

  useEffect(() => {
    setMounted(true);
    if (mounted && activeProfile) {
      setShopkeeperMessage({
        type: 'happy',
        text: getRandomShopkeeperLine('welcome'),
        duration: 3000
      });
    }
  }, [mounted, activeProfile]);

  if (!mounted || !loaded || !activeProfile) return <div className="min-h-screen bg-[#0f0e1a]" />;

  const p = activeProfile;
  const colecao = new Set(p?.colecao ?? []);
  const moedas = p?.moedas ?? 0;
  const itensLoja = COLECIONAVEIS.filter((c) => c.origem === 'loja' && c.custo > 0);

  const confirmarCompra = () => {
    if (!selecionado) return;

    // ✅ Verificação 1: Já possuído
    if (colecao.has(selecionado.id)) {
      audio.play('erro');
      setShopkeeperMessage({
        type: 'thinking',
        text: getRandomShopkeeperLine('already_owned'),
        duration: 2500
      });
      setSelecionado(null);
      return;
    }

    // ✅ Verificação 2: Moedas suficientes (CRÍTICA!)
    const moedaNecessaria = selecionado.custo ?? 0;
    const moedaAtual = p?.moedas ?? 0;

    if (moedaAtual < moedaNecessaria) {
      audio.play('sem_moedas');
      setShopkeeperMessage({
        type: 'encouraging',
        text: getRandomShopkeeperLine('insufficient_coins'),
        duration: 2500
      });
      setFeedback(`❌ Faltam ${moedaNecessaria - moedaAtual} moedas!`);
      setSelecionado(null);
      setTimeout(() => setFeedback(null), 2200);
      return;
    }

    // ✅ Compra confirmada
    audio.play('comprar');
    const novo = {
      ...p,
      moedas: moedaAtual - moedaNecessaria,
      colecao: Array.from(new Set([...(p?.colecao ?? []), selecionado.id])),
    };
    updateProfile(novo);
    registarEvento(p.id, 'loja_compra', { id: selecionado.id, custo: moedaNecessaria });
    setShopkeeperMessage({
      type: 'excited',
      text: getRandomShopkeeperLine('purchase_success'),
      duration: 2500
    });
    setFeedback(`✅ ${selecionado.nome} adicionado à tua coleção!`);
    setSelecionado(null);
    setTimeout(() => setFeedback(null), 2200);
  };

  return (
    <div className="min-h-screen bg-[#0f0e1a] p-4 pb-32">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push('/game')} className="text-gray-400 hover:text-white p-2"><ArrowLeft className="w-5 h-5" /></button>
            <h2 className="font-display text-2xl font-bold text-purple-300">Loja</h2>
          </div>
          <div className="flex items-center gap-1 bg-amber-900/30 rounded-full px-3 py-1.5 border border-amber-700/20">
            <Coins className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-amber-200"><CountUp value={moedas} /></span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-4">Tudo se conquista a jogar. Nada é pago com dinheiro real. 💜</p>

        <div className="flex justify-center mb-6">
          <Shopkeeper message={shopkeeperMessage} size={100} />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', width: '100%', alignItems: 'center', minHeight: '3rem' }}>
          <button
            onClick={() => router.push('/game')}
            style={{
              flex: 1,
              padding: '1rem',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              background: 'linear-gradient(to right, #9333ea, #a855f7)',
              boxShadow: '0 0 30px rgba(147, 51, 234, 0.8)',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(147, 51, 234, 1)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(147, 51, 234, 0.8)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ← Voltar ao Jogo
          </button>
          <button
            onClick={() => router.push('/')}
            style={{
              flex: 1,
              padding: '1rem',
              fontSize: '1.125rem',
              fontWeight: 'bold',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              background: 'linear-gradient(to right, #2563eb, #3b82f6)',
              boxShadow: '0 0 30px rgba(37, 99, 235, 0.8)',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = '0 0 50px rgba(37, 99, 235, 1)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(37, 99, 235, 0.8)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            🏠 Página Inicial
          </button>
        </div>

        {CATEGORIAS_EQUIPAVEIS.map((catId) => {
          const itens = itensLoja.filter((c) => c.categoria === catId);
          if (itens.length === 0) return null;
          return (
            <div key={catId} className="mb-5">
              <h3 className="font-display text-sm font-bold text-purple-200 mb-2 flex items-center gap-1">
                <span>{CATEGORIA_INFO[catId]?.icone}</span> {CATEGORIA_INFO[catId]?.nome}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {itens.map((item) => {
                  const owned = colecao.has(item.id);
                  return (
                    <CollectibleCard
                      key={item.id}
                      item={item}
                      owned={owned}
                      modo="loja"
                      podeComprar={!owned && moedas >= item.custo}
                      onClick={() => {
                        if (!owned) {
                          setSelecionado(item);
                          audio.play('selecionar');
                          setShopkeeperMessage({
                            type: 'thinking',
                            text: getRandomShopkeeperLine('selecting'),
                            duration: 2500
                          });
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* === ITENS DA CASA === */}
        <div className="mb-5 pt-5 border-t border-purple-700/30">
          <h3 className="font-display text-sm font-bold text-emerald-300 mb-3 flex items-center gap-1">
            <span>🏠</span> Itens da Casa
          </h3>
          {['moveis', 'decoracao', 'luz', 'plantas', 'arte', 'brinquedos'].map((categoria) => {
            const itens = HOUSE_ITEMS.filter(item => item.categoria === categoria);
            return (
              <div key={categoria} className="mb-4">
                <p className="text-xs text-gray-400 mb-2 capitalize">{categoria}</p>
                <div className="grid grid-cols-4 gap-2">
                  {itens.map((item) => {
                    const owned = colecao.has(item.id);
                    return (
                      <motion.button
                        key={item.id}
                        onClick={() => {
                          if (!owned) {
                            setSelecionado(item as any);
                            audio.play('selecionar');
                            setShopkeeperMessage({
                              type: 'thinking',
                              text: getRandomShopkeeperLine('selecting'),
                              duration: 2500
                            });
                          }
                        }}
                        whileHover={{ scale: 1.05 }}
                        className={`p-2 rounded-lg text-center cursor-pointer transition-all ${
                          owned
                            ? `bg-gradient-to-br ${item.corGradient} shadow-lg`
                            : 'bg-slate-800/50 border border-slate-700/30 opacity-50'
                        }`}
                      >
                        <span className="text-3xl">{item.emoji}</span>
                        <p className="text-xs text-gray-300 mt-1 font-semibold">{item.preco}</p>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-50">
            <Check className="w-4 h-4" /> {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selecionado && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 flex items-end justify-center z-50 p-4" onClick={() => setSelecionado(null)}>
            <motion.div initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: 60 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-slate-800 rounded-2xl p-5 border border-purple-700/30">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-5xl">{selecionado.icone}</span>
                <div className="flex-1">
                  <p className="font-bold text-white">{selecionado.nome}</p>
                  <p className="text-xs text-gray-400">{selecionado.descricao}</p>
                </div>
              </div>
              {moedas < selecionado.custo ? (
                <p className="text-center text-sm text-red-300 mb-3">Faltam {selecionado.custo - moedas} moedas. Joga mais para ganhar! 💪</p>
              ) : (
                <p className="text-center text-sm text-gray-300 mb-3">Comprar por <b className="text-amber-300">{selecionado.custo}</b> moedas?</p>
              )}
              <div className="flex gap-3">
                <GameButton variant="secondary" fullWidth onClick={() => setSelecionado(null)}><X className="w-4 h-4 inline mr-1" /> Cancelar</GameButton>
                <GameButton variant="gold" fullWidth onClick={confirmarCompra} disabled={moedas < selecionado.custo}><Check className="w-4 h-4 inline mr-1" /> Comprar</GameButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
