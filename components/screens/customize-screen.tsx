'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { useRenameGuardian } from '@/hooks/useRenameGuardian';
import { GameButton } from '@/components/ui/game-button';
import { GuardianAvatar } from '@/components/guardians/guardian-avatar';
import { RenameModal } from '@/components/guardians/rename-modal';
import { CollectibleCard } from '@/components/collection/collectible-card';
import { COLECIONAVEIS, CATEGORIA_INFO, CATEGORIAS_EQUIPAVEIS } from '@/data/collection';
import { EquipSlots } from '@/types';
import { ArrowLeft, Ban, Edit2 } from 'lucide-react';
import { getAudioManager } from '@/lib/audio';

export function CustomizeScreen() {
  const { activeProfile, loaded, updateProfile } = useProfile();
  const { renameGuardian } = useRenameGuardian();
  const router = useRouter();
  const audio = getAudioManager();
  const [mounted, setMounted] = useState(false);
  const [cat, setCat] = useState<keyof EquipSlots>('chapeu');
  const [showRenameModal, setShowRenameModal] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !loaded || !activeProfile) {
    return <div className="min-h-screen bg-[#0f0e1a]" />;
  }

  const p = activeProfile;
  const is2 = p?.ano === 2;
  const colecao = new Set(p?.colecao ?? []);
  const equip = p?.equipado ?? ({} as EquipSlots);

  const itensCat = COLECIONAVEIS.filter((c) => c.categoria === cat);
  const possuidosCat = itensCat.filter((c) => colecao.has(c.id));

  const equipar = (id: string | null) => {
    const novo: EquipSlots = { ...equip, [cat]: id } as EquipSlots;
    updateProfile({ ...p, equipado: novo });
  };

  const handleRename = (newName: string) => {
    const updated = renameGuardian(p, newName);
    updateProfile(updated);
    audio.play('renomear');
  };

  return (
    <div className="min-h-screen bg-[#0f0e1a] p-4 pb-10">
      <div className="w-full max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => router.push('/game')} className="text-gray-400 hover:text-white p-2"><ArrowLeft className="w-5 h-5" /></button>
          <h2 className="font-display text-2xl font-bold text-purple-300">Personalizar</h2>
        </div>

        <div className="flex justify-center mb-5 bg-slate-800/30 rounded-2xl py-6 border border-purple-700/15">
          <GuardianAvatar perfil={p} size={150} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <h3 className="font-display text-xl font-bold text-white">{p.nomeGuardiao}</h3>
          <button
            onClick={() => setShowRenameModal(true)}
            className="p-2 rounded-lg bg-purple-600/50 hover:bg-purple-600 text-white transition-colors"
            title="Mudar nome do Guardião"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        <RenameModal
          currentName={p.nomeGuardiao}
          isOpen={showRenameModal}
          onClose={() => setShowRenameModal(false)}
          onConfirm={handleRename}
          guardianName={p.guardiao}
        />

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

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {CATEGORIAS_EQUIPAVEIS.map((c) => (
            <button key={c} onClick={() => setCat(c as keyof EquipSlots)}
              className={`shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${cat === c ? 'bg-purple-600 text-white' : 'bg-slate-800 text-gray-400'}`}>
              <span>{CATEGORIA_INFO[c]?.icone}</span> {CATEGORIA_INFO[c]?.nome}
            </button>
          ))}
        </div>

        {possuidosCat.length === 0 ? (
          <div className="text-center text-gray-400 text-sm bg-slate-800/30 rounded-xl p-6 mb-4">
            Ainda não tens itens desta categoria.<br />Ganha baús a jogar ou visita a Loja!
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {cat !== 'cor' && (
              <motion.button whileTap={{ scale: 0.96 }} onClick={() => equipar(null)}
                className={`rounded-2xl p-3 flex flex-col items-center justify-center border-2 ${!equip[cat] ? 'border-purple-400 bg-purple-900/30' : 'border-slate-700 bg-slate-800/50'}`}>
                <Ban className="w-7 h-7 text-gray-400 my-2" />
                <span className="text-xs font-bold text-white">Nenhum</span>
              </motion.button>
            )}
            {possuidosCat.map((item) => (
              <CollectibleCard key={item.id} item={item} owned modo="equipar" equipped={equip[cat] === item.id} onClick={() => equipar(item.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
