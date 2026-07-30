'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface MundoContextType {
  mundoSelecionado: number | null;
  setMundoSelecionado: (id: number) => void;
}

const MundoContext = createContext<MundoContextType | undefined>(undefined);

export function MundoProvider({ children }: { children: ReactNode }) {
  const [mundoSelecionado, setMundoSelecionado] = useState<number | null>(1); // Padrão: Portal Mágico

  return (
    <MundoContext.Provider value={{ mundoSelecionado, setMundoSelecionado }}>
      {children}
    </MundoContext.Provider>
  );
}

export function useMundoContext() {
  const context = useContext(MundoContext);
  if (!context) {
    throw new Error('useMundoContext deve ser usado dentro de MundoProvider');
  }
  return context;
}
