'use client';
import { useState, useEffect, useCallback } from 'react';
import { Perfil } from '@/types';
import { getProfiles, getActiveProfile, setActiveProfileId, updateProfile, saveProfiles, deleteProfile as deleteProfileStorage, createProfileId } from '@/lib/storage';
import { registarEvento } from '@/lib/metrics';

export function useProfile() {
  const [profiles, setProfilesState] = useState<Perfil[]>([]);
  const [activeProfile, setActiveProfile] = useState<Perfil | null>(null);
  const [loaded, setLoaded] = useState(false);

  const refresh = useCallback(() => {
    const p = getProfiles();
    setProfilesState(p ?? []);
    const a = getActiveProfile();
    setActiveProfile(a ?? null);
  }, []);

  useEffect(() => {
    refresh();
    setLoaded(true);
  }, [refresh]);

  const switchProfile = useCallback((id: string) => {
    setActiveProfileId(id);
    registarEvento(id, 'perfil_trocado');
    refresh();
  }, [refresh]);

  const createProfile = useCallback((data: {
    apelido: string;
    ano: 2 | 5;
    guardiao: 'LUMIS' | 'TORRAK';
    personagem?: string; // lumis, faisca, verdor, torrak, eclipse
    nomeGuardiao: string;
  }): Perfil => {
    const id = createProfileId();
    const guardiao = data?.guardiao ?? 'LUMIS';
    const aparenciaInicial = guardiao === 'LUMIS' ? 'lumis_normal' : 'torrak_normal';
    const novoPerfil: Perfil = {
      id,
      apelido: data?.apelido ?? 'Jogador',
      ano: data?.ano ?? 2,
      guardiao,
      personagem: data?.personagem, // Guardar qual personagem foi escolhido
      nomeGuardiao: data?.nomeGuardiao ?? guardiao,
      nivel: 1,
      xp: 0,
      moedas: 0,
      streak: 0,
      ultimoJogo: '',
      portalProgress: 0,
      portalEtapa: 1,
      itensDesbloqueados: [aparenciaInicial, 'chapeu_aventureiro'],
      aparenciaAtiva: aparenciaInicial,
      acessorioAtivo: null,
      perguntasRespondidas: {},
      dificuldadeAtual: {},
      errosPorTema: {},
      acertosPorTema: {},
      sequenciaAtual: 0,
      batalhasConcluidas: 0,
      batalhaSessions: [],
      criadoEm: new Date().toISOString(),
      // Fase 2 (produto)
      colecao: ['chapeu_aventureiro', 'cor_original'],
      equipado: {
        chapeu: 'chapeu_aventureiro', capacete: null, oculos: null, capa: null,
        asas: null, efeito: null, cor: 'cor_original', companheiro: null,
      },
      medalhas: [],
      certificados: [],
      trofeus: [],
      missaoDiaria: null,
      missaoSemanal: null,
      missaoMensal: null,
      melhorCombo: 0,
      totalAcertos: 0,
    };
    updateProfile(novoPerfil);
    setActiveProfileId(id);
    registarEvento(id, 'perfil_criado');
    refresh();
    return novoPerfil;
  }, [refresh]);

  const update = useCallback((perfil: Perfil) => {
    updateProfile(perfil);
    refresh();
  }, [refresh]);

  const deleteProf = useCallback((id: string) => {
    deleteProfileStorage(id);
    refresh();
  }, [refresh]);

  return { profiles, activeProfile, loaded, switchProfile, createProfile, updateProfile: update, deleteProfile: deleteProf, refresh };
}
