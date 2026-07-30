'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, Sword } from 'lucide-react';
import { useSoundEffect } from '@/hooks/useSoundEffect';
import { useMundoContext } from '@/context/MundoContext';
import { WorldCardImage } from '@/components/game-hub/world-card-image';
import { GameButton } from '@/components/ui/game-button';

const MUNDOS = [
  { id: 1, nome: 'Portal Magico', descricao: 'A passagem para novos mundos', batalhaPara: 1, background: 'from-purple-900 via-blue-900 to-cyan-900', borderColor: 'border-cyan-500/50', shadowColor: 'shadow-cyan-500/30', locked: false, completed: true },
  { id: 2, nome: 'Laboratorio Magico', descricao: 'Experiências e descobertas incríveis', batalhaPara: 5, background: 'from-green-900 via-teal-900 to-cyan-900', borderColor: 'border-green-500/50', shadowColor: 'shadow-green-500/30', locked: false, completed: false },
  { id: 3, nome: 'Arena dos Guardioes', descricao: 'Enfrenta outros Guardioes e prova o teu valor', batalhaPara: 10, background: 'from-red-900 via-orange-900 to-yellow-900', borderColor: 'border-orange-500/50', shadowColor: 'shadow-orange-500/30', locked: false, completed: false },
  { id: 4, nome: 'Castelo Dourado', descricao: 'Um palacio antigo cheio de misterios', batalhaPara: 18, background: 'from-blue-900 via-indigo-900 to-purple-900', borderColor: 'border-blue-500/50', shadowColor: 'shadow-blue-500/30', locked: true, completed: false },
  { id: 5, nome: 'Floresta Encantada', descricao: 'Desafios secretos e criaturas misteriosas', batalhaPara: 28, background: 'from-green-900 via-emerald-900 to-teal-900', borderColor: 'border-emerald-500/50', shadowColor: 'shadow-emerald-500/30', locked: true, completed: false },
  { id: 6, nome: 'Montanha Gelada', descricao: 'Picos cobertos de gelo e neve eterna', batalhaPara: 45, background: 'from-cyan-900 via-blue-900 to-indigo-900', borderColor: 'border-cyan-500/50', shadowColor: 'shadow-cyan-500/30', locked: true, completed: false },
  { id: 7, nome: 'Templo Antigo', descricao: 'Ruinas misteriosas carregadas de poder', batalhaPara: 60, background: 'from-yellow-900 via-orange-900 to-red-900', borderColor: 'border-yellow-500/50', shadowColor: 'shadow-yellow-500/30', locked: true, completed: false },
  { id: 8, nome: 'Tesouro Final', descricao: 'Um baú cheio de surpresas épicas espera por ti!', batalhaPara: 999, background: 'from-yellow-700 via-red-700 to-purple-700', borderColor: 'border-yellow-500/50', shadowColor: 'shadow-yellow-500/50', locked: true, completed: false },
];

interface GameHubWorldsProps {
  mundoSelecionado: number;
}

export function GameHubWorlds({ mundoSelecionado }: GameHubWorldsProps) {
  const router = useRouter();
  const { playSound } = useSoundEffect();
  const { setMundoSelecionado } = useMundoContext();
  const completedWorlds = MUNDOS.filter(m => m.completed).length;

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-8 px-4 max-w-7xl mx-auto">
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

      <div className="px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.22 }} className="mb-5">
          <GameButton variant="gold" size="xl" fullWidth onClick={() => { playSound('success'); router.push(`/battle?mundoId=${mundoSelecionado}`); }}>
            <Sword className="w-6 h-6 inline mr-2" /> JOGAR AGORA
          </GameButton>
        </motion.div>
      </div>
    </>
  );
}
