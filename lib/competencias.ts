import { Perfil, CompetenciaProgresso, Disciplina } from '@/types';
import { PERGUNTAS } from '@/data/questions';

// Critério de domínio (medalha + certificado)
export const DOMINIO_TAXA_MIN = 85;      // % de acerto
export const DOMINIO_TENTATIVAS_MIN = 6; // número mínimo de tentativas

// Mapa tema -> disciplina (construído a partir do banco de perguntas)
const TEMA_DISCIPLINA: Record<string, Disciplina> = (() => {
  const map: Record<string, Disciplina> = {};
  for (const p of PERGUNTAS) {
    if (p?.tema && !map[p.tema]) map[p.tema] = p.disciplina;
  }
  return map;
})();

// Temas disponíveis para um dado ano (para mostrar progresso mesmo antes de tentar)
export function temasDoAno(ano: number): { tema: string; disciplina: Disciplina }[] {
  const vistos = new Set<string>();
  const out: { tema: string; disciplina: Disciplina }[] = [];
  for (const p of PERGUNTAS) {
    if (p.ano === ano && !vistos.has(p.tema)) {
      vistos.add(p.tema);
      out.push({ tema: p.tema, disciplina: p.disciplina });
    }
  }
  return out;
}

export function calcularCompetencias(perfil: Perfil | null): CompetenciaProgresso[] {
  if (!perfil) return [];
  const acertosMap = perfil.acertosPorTema ?? {};
  const errosMap = perfil.errosPorTema ?? {};
  const temas = temasDoAno(perfil.ano);
  const out: CompetenciaProgresso[] = temas.map(({ tema, disciplina }) => {
    const acertos = acertosMap[tema] ?? 0;
    const erros = errosMap[tema] ?? 0;
    const tentativas = acertos + erros;
    const taxa = tentativas > 0 ? Math.round((acertos / tentativas) * 100) : 0;
    const dominado = taxa >= DOMINIO_TAXA_MIN && tentativas >= DOMINIO_TENTATIVAS_MIN;
    return { tema, disciplina, acertos, tentativas, taxa, dominado };
  });
  // ordenar: dominados primeiro (celebrar conquistas), depois por taxa desc
  return out.sort((a, b) => {
    if (a.dominado !== b.dominado) return a.dominado ? -1 : 1;
    return b.taxa - a.taxa;
  });
}

// Temas atualmente dominados
export function temasDominados(perfil: Perfil | null): string[] {
  return calcularCompetencias(perfil).filter((c) => c.dominado).map((c) => c.tema);
}

// Deteta medalhas/certificados novos (dominados que ainda não estão registados)
export function novasMedalhas(perfil: Perfil): string[] {
  const jaTem = new Set(perfil.medalhas ?? []);
  return temasDominados(perfil).filter((t) => !jaTem.has(t));
}

export function disciplinaDoTema(tema: string): Disciplina | null {
  return TEMA_DISCIPLINA[tema] ?? null;
}
