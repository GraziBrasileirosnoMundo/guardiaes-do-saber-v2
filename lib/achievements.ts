import { Perfil, ContextoTrofeu } from '@/types';
import { TROFEUS } from '@/data/trophies';
import { mundoProgresso } from '@/data/world';
import { calcularNivel } from '@/lib/gameLogic';


export function contextoDoPerfil(perfil: Perfil): ContextoTrofeu {
  return {
    batalhas: perfil.batalhasConcluidas ?? 0,
    nivel: calcularNivel(perfil.xp ?? 0),
    melhorCombo: perfil.melhorCombo ?? 0,
    colecaoCount: (perfil.colecao ?? []).length,
    medalhasCount: (perfil.medalhas ?? []).length,
    mundoCompletos: mundoProgresso(perfil.batalhasConcluidas ?? 0).completos,
  };
}

function criterioAtingido(crit: (typeof TROFEUS)[number]['criterio'], ctx: ContextoTrofeu): boolean {
  switch (crit.tipo) {
    case 'batalhas': return ctx.batalhas >= crit.valor;
    case 'nivel': return ctx.nivel >= crit.valor;
    case 'combo': return ctx.melhorCombo >= crit.valor;
    case 'colecao': return ctx.colecaoCount >= crit.valor;
    case 'medalhas': return ctx.medalhasCount >= crit.valor;
    case 'mundo': return ctx.mundoCompletos >= crit.valor;
    default: return false;
  }
}

// Devolve ids de troféus conquistados agora (ainda não registados no perfil)
export function novosTrofeus(perfil: Perfil): string[] {
  const ctx = contextoDoPerfil(perfil);
  const jaTem = new Set(perfil.trofeus ?? []);
  return TROFEUS.filter((t) => !jaTem.has(t.id) && criterioAtingido(t.criterio, ctx)).map((t) => t.id);
}

export function trofeuDesbloqueado(perfil: Perfil, trofeuId: string): boolean {
  return (perfil.trofeus ?? []).includes(trofeuId);
}
