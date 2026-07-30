'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { GameButton } from '@/components/ui/game-button';
import { Lumis } from '@/components/guardians/lumis';
import { Torrak } from '@/components/guardians/torrak';
import { CharacterSelector } from '@/components/guardians/character-selector';
import { CharacterAvatar } from '@/components/guardians/character-avatar';
import { ArrowRight, Sparkles } from 'lucide-react';

type Passo = 1 | 2 | 3 | 4 | 5;

export function ProfileSetupScreen() {
  const [passo, setPasso] = useState<Passo>(1);
  const [ano, setAno] = useState<2 | 5 | null>(null);
  const [apelido, setApelido] = useState('');
  const [personagem, setPersonagem] = useState<string | null>(null);
  const [nomeGuardiao, setNomeGuardiao] = useState('');
  const { createProfile } = useProfile();
  const router = useRouter();

  // Map de personagem para tipo de guardião
  const personagemToGuardiao = (pid: string): 'LUMIS' | 'TORRAK' => {
    if (pid === 'lumis' || pid === 'faisca' || pid === 'verdor') return 'LUMIS';
    return 'TORRAK'; // torrak e eclipse
  };

  const is2 = ano === 2;
  const guardiaoAtual = personagem ? personagemToGuardiao(personagem) : null;

  const avancar = () => {
    if (passo < 5) setPasso((p) => (p + 1) as Passo);
  };

  const finalizar = () => {
    if (!ano || !personagem || !apelido?.trim()) return;
    const guardiao = personagemToGuardiao(personagem);
    createProfile({
      apelido: apelido.trim(),
      ano,
      guardiao,
      personagem, // Guardar qual personagem foi escolhido
      nomeGuardiao: nomeGuardiao?.trim() || 'Guardião',
    });
    router.push('/game');
  };

  const btnSize = is2 ? 'xl' : 'lg';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0f0e1a]">
      <div className="w-full max-w-md">
        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <motion.div
              key={s}
              className={`w-3 h-3 rounded-full transition-colors ${
                s <= passo ? 'bg-gradient-to-r from-purple-500 to-blue-500' : 'bg-gray-700'
              }`}
              animate={s === passo ? { scale: 1.3 } : { scale: 1 }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {passo === 1 && (
            <motion.div key="p1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
              <h2 className="font-display text-3xl font-bold mb-2 text-purple-300">Em que ano andas?</h2>
              <p className="text-gray-400 mb-8">Escolhe o teu ano escolar</p>
              <div className="flex flex-col gap-4">
                <GameButton size="xl" variant="primary" fullWidth onClick={() => { setAno(2); avancar(); }}>
                  🌟 2.º Ano
                </GameButton>
                <GameButton size="xl" variant="primary" fullWidth onClick={() => { setAno(5); avancar(); }}>
                  ⚔️ 5.º Ano
                </GameButton>
              </div>
            </motion.div>
          )}

          {passo === 2 && (
            <motion.div key="p2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
              <h2 className="font-display text-3xl font-bold mb-2 text-purple-300">Qual é o teu nome?</h2>
              <p className="text-gray-400 mb-6">Escolhe um apelido para o jogo</p>
              <input
                type="text"
                maxLength={20}
                value={apelido}
                onChange={(e) => setApelido(e?.target?.value ?? '')}
                placeholder="O teu apelido..."
                className={`w-full bg-slate-800 border border-purple-600/40 rounded-xl px-4 text-center text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 mb-6 ${
                  is2 ? 'py-5 text-2xl' : 'py-4 text-xl'
                }`}
                autoFocus
              />
              <GameButton
                size={btnSize}
                fullWidth
                onClick={avancar}
                disabled={!apelido?.trim()}
              >
                Continuar <ArrowRight className="w-5 h-5 inline ml-1" />
              </GameButton>
            </motion.div>
          )}

          {passo === 3 && (
            <motion.div key="p3" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
              <h2 className="font-display text-3xl font-bold mb-2 text-purple-300">Escolhe o teu Personagem!</h2>
              <p className="text-gray-400 mb-6">Cada um tem poderes especiais</p>
              <CharacterSelector selected={personagem ?? undefined} onSelect={(pid) => setPersonagem(pid)} />
              <div className="mt-8">
                <GameButton
                  size={btnSize}
                  fullWidth
                  onClick={avancar}
                  disabled={!personagem}
                >
                  Continuar <ArrowRight className="w-5 h-5 inline ml-1" />
                </GameButton>
              </div>
            </motion.div>
          )}

          {passo === 4 && (
            <motion.div key="p4" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} className="text-center">
              <h2 className="font-display text-3xl font-bold mb-2 text-purple-300">Dá um nome ao teu Guardião!</h2>
              <div className="flex justify-center my-6">
                {personagem && <CharacterAvatar characterId={personagem} size={is2 ? 120 : 100} />}
              </div>
              <input
                type="text"
                maxLength={20}
                value={nomeGuardiao}
                onChange={(e) => setNomeGuardiao(e?.target?.value ?? '')}
                placeholder="Nome do guardião..."
                className={`w-full bg-slate-800 border border-purple-600/40 rounded-xl px-4 text-center text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 mb-6 ${
                  is2 ? 'py-5 text-2xl' : 'py-4 text-xl'
                }`}
              />
              <GameButton size={btnSize} fullWidth onClick={avancar}>
                Continuar <ArrowRight className="w-5 h-5 inline ml-1" />
              </GameButton>
            </motion.div>
          )}

          {passo === 5 && (
            <motion.div key="p5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <Sparkles className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h2 className="font-display text-3xl font-bold mb-2 text-amber-300">Tudo pronto!</h2>
              <p className="text-gray-400 mb-4">
                {apelido}, o teu guardião <span className="text-purple-300 font-bold">{nomeGuardiao || 'Guardião'}</span> está à tua espera!
              </p>
              <div className="flex justify-center mb-6">
                {personagem && <CharacterAvatar characterId={personagem} size={is2 ? 140 : 120} />}
              </div>
              <GameButton size="xl" variant="gold" fullWidth onClick={finalizar}>
                🚀 COMEÇAR AVENTURA!
              </GameButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
