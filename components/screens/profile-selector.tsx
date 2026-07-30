'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useProfile } from '@/hooks/useProfile';
import { GameButton } from '@/components/ui/game-button';
import { Lumis } from '@/components/guardians/lumis';
import { Torrak } from '@/components/guardians/torrak';
import { Shield, Plus, Sparkles, LogOut } from 'lucide-react';
import { Perfil } from '@/types';

export function ProfileSelector() {
  const { profiles, loaded, switchProfile } = useProfile();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted || !loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0e1a]">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
          <Sparkles className="w-8 h-8 text-purple-400" />
        </motion.div>
      </div>
    );
  }

  const handleSelect = (id: string) => {
    switchProfile(id);
    router.push('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#0f0e1a]">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <Shield className="w-10 h-10 text-purple-400" />
          <h1 className="font-display text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-amber-400 to-emerald-400 bg-clip-text text-transparent">
            Guardiões do Saber
          </h1>
        </div>
        <p className="text-gray-400 text-lg">Escolhe o teu perfil para começar a aventura!</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        {(profiles ?? []).map((p: Perfil, i: number) => (
          <motion.button
            key={p?.id ?? i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(p?.id ?? '')}
            className="flex-1 bg-gradient-to-br from-purple-900/60 to-slate-800/60 rounded-2xl p-6 border border-purple-700/30 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-3">
              {p?.guardiao === 'LUMIS' ? (
                <Lumis ano={p?.ano ?? 2} size={56} />
              ) : (
                <Torrak ano={p?.ano ?? 2} size={56} />
              )}
              <div>
                <h3 className="font-display text-xl font-bold text-white">{p?.apelido ?? 'Jogador'}</h3>
                <p className="text-sm text-gray-400">{p?.ano ?? 2}.º Ano</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Nível {p?.nivel ?? 1}</span>
              <span>{p?.moedas ?? 0} 🪙</span>
            </div>
          </motion.button>
        ))}
      </div>

      {(profiles?.length ?? 0) < 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <GameButton
            variant="gold"
            size="lg"
            onClick={() => router.push('/profile-setup')}
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Novo Perfil
          </GameButton>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '2rem', display: 'flex', gap: '1rem', width: '100%', maxWidth: '28rem', alignItems: 'center', minHeight: '3rem' }}
      >
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
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.clear();
              window.location.href = '/';
            }
          }}
          style={{
            flex: 1,
            padding: '1rem',
            fontSize: '1.125rem',
            fontWeight: 'bold',
            borderRadius: '0.75rem',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            background: 'linear-gradient(to right, #dc2626, #ef4444)',
            boxShadow: '0 0 30px rgba(220, 38, 38, 0.8)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            zIndex: 10
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.boxShadow = '0 0 50px rgba(220, 38, 38, 1)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.boxShadow = '0 0 30px rgba(220, 38, 38, 0.8)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </motion.div>
    </div>
  );
}
