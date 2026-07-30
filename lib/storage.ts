import { Perfil, EventoMetrica, EquipSlots } from '@/types';
import { COLECIONAVEIS } from '@/data/collection';

const PROFILES_KEY = 'gds_profiles';
const ACTIVE_KEY = 'gds_active_profile';

const CATALOGO_IDS = new Set(COLECIONAVEIS.map((c) => c.id));

function equipVazio(): EquipSlots {
  return { chapeu: null, capacete: null, oculos: null, capa: null, asas: null, efeito: null, cor: null, companheiro: null };
}

// Garante que perfis antigos ganham os novos campos (Fase 2) sem perder dados.
export function migrarPerfil(perfil: Perfil): Perfil {
  const p: Perfil = { ...perfil };

  if (!Array.isArray(p.colecao)) {
    // Recupera itens antigos que ainda existam no catálogo novo
    const antigos = (p.itensDesbloqueados ?? []).filter((id) => CATALOGO_IDS.has(id));
    const base = new Set<string>(['chapeu_aventureiro', 'cor_original', ...antigos]);
    p.colecao = Array.from(base);
  }
  if (!p.equipado) {
    p.equipado = { ...equipVazio(), chapeu: 'chapeu_aventureiro', cor: 'cor_original' };
  } else {
    p.equipado = { ...equipVazio(), ...p.equipado };
  }
  if (!Array.isArray(p.medalhas)) p.medalhas = [];
  if (!Array.isArray(p.certificados)) p.certificados = [];
  if (!Array.isArray(p.trofeus)) p.trofeus = [];
  if (p.missaoDiaria === undefined) p.missaoDiaria = null;
  if (p.missaoSemanal === undefined) p.missaoSemanal = null;
  if (p.missaoMensal === undefined) p.missaoMensal = null;
  if (typeof p.melhorCombo !== 'number') p.melhorCombo = 0;
  if (typeof p.totalAcertos !== 'number') {
    // estimativa a partir das estatísticas existentes
    const somaAcertos = Object.values(p.acertosPorTema ?? {}).reduce((a, b) => a + (b ?? 0), 0);
    p.totalAcertos = somaAcertos;
  }
  return p;
}

function safeGetItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage full or unavailable
  }
}

export function getProfiles(): Perfil[] {
  const raw = safeGetItem(PROFILES_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(migrarPerfil) : [];
  } catch {
    return [];
  }
}

export function saveProfiles(profiles: Perfil[]): void {
  safeSetItem(PROFILES_KEY, JSON.stringify(profiles ?? []));
}

export function getActiveProfileId(): string | null {
  return safeGetItem(ACTIVE_KEY);
}

export function setActiveProfileId(id: string): void {
  safeSetItem(ACTIVE_KEY, id);
}

export function getActiveProfile(): Perfil | null {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  if (!activeId) return profiles?.[0] ?? null;
  return profiles?.find((p: Perfil) => p?.id === activeId) ?? null;
}

export function updateProfile(updated: Perfil): void {
  const profiles = getProfiles();
  const idx = profiles?.findIndex((p: Perfil) => p?.id === updated?.id);
  if (idx >= 0) {
    profiles[idx] = updated;
  } else {
    profiles.push(updated);
  }
  saveProfiles(profiles);
}

export function deleteProfile(id: string): void {
  const profiles = getProfiles()?.filter((p: Perfil) => p?.id !== id);
  saveProfiles(profiles);
  const activeId = getActiveProfileId();
  if (activeId === id) {
    const remaining = profiles?.[0];
    if (remaining) setActiveProfileId(remaining.id);
    else if (typeof window !== 'undefined') {
      try { localStorage.removeItem(ACTIVE_KEY); } catch {}
    }
  }
}

export function getMetrics(profileId: string): EventoMetrica[] {
  const raw = safeGetItem(`gds_metrics_${profileId}`);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveMetrics(profileId: string, metrics: EventoMetrica[]): void {
  safeSetItem(`gds_metrics_${profileId}`, JSON.stringify(metrics ?? []));
}

export function createProfileId(): string {
  return `p_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
