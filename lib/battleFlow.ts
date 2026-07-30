import { Perfil, BatalhaEstado, DropBau, MissaoEstado } from '@/types';
import { calcularNivel, atualizarStreak, avancarPortal } from '@/lib/gameLogic';
import { gerarBau } from '@/lib/chests';
import { aplicarProgressoMissoes } from '@/lib/missions';
import { novasMedalhas } from '@/lib/competencias';
import { novosTrofeus } from '@/lib/achievements';
import { calcularRecompensasBatalha, aplicarRecompensasBatalha } from '@/lib/battle-rewards';

export interface ResultadoBatalha {
  perfil: Perfil;
  drop: DropBau;
  acertos: number;
  comboMax: number;
  subiuNivel: boolean;
  nivelAnterior: number;
  nivelNovo: number;
  medalhasNovas: string[];
  trofeusNovos: string[];
  missoesConcluidas: MissaoEstado[];
  multiplicador?: number;
  rewardType?: 'normal' | 'lucky' | 'rare' | 'epic';
  moedasTotais?: number;
}

function comboMaximo(respostas: { correta: boolean }[]): number {
  let cur = 0, max = 0;
  for (const r of respostas ?? []) {
    if (r?.correta) { cur += 1; max = Math.max(max, cur); } else { cur = 0; }
  }
  return max;
}

// Pipeline puro de fim de batalha: XP, moedas, baú, missões, medalhas, troféus.
// Sem dependências de React — testável isoladamente.
export function processarBatalha(perfil: Perfil, estado: BatalhaEstado, duracao: number): ResultadoBatalha {
  const acertos = estado?.acertos ?? 0;
  const comboMax = comboMaximo(estado?.respostas ?? []);
  let p = { ...(perfil ?? {}) } as Perfil;

  const nivelAnterior = calcularNivel(p?.xp ?? 0);

  // Calcula recompensas com streak + variable rewards
  const recompensas = calcularRecompensasBatalha(p, acertos, 5);
  p = aplicarRecompensasBatalha(p, recompensas);

  p.nivel = calcularNivel(p.xp);
  p.batalhaSessions = [...(p?.batalhaSessions ?? []), { data: new Date().toISOString(), acertos, total: 5, duracao }];
  p.melhorCombo = Math.max(p?.melhorCombo ?? 0, comboMax);
  p = avancarPortal(p);

  const drop = gerarBau(acertos, p);
  p.moedas = (p?.moedas ?? 0) + (drop?.moedas ?? 0);
  if (drop?.itens?.length) {
    p.colecao = Array.from(new Set([...(p?.colecao ?? []), ...drop.itens]));
  }

  const mm = aplicarProgressoMissoes(p, {
    batalhas: 1,
    acertos,
    perguntas: 5,
    vitorias_perfeitas: acertos === 5 ? 1 : 0,
    itens: drop?.itens?.length ?? 0,
    comboMax,
  });
  p = mm.perfil;

  const medalhasNovas = novasMedalhas(p);
  if (medalhasNovas.length) {
    p.medalhas = Array.from(new Set([...(p?.medalhas ?? []), ...medalhasNovas]));
    p.certificados = Array.from(new Set([...(p?.certificados ?? []), ...medalhasNovas]));
  }

  const trofeusNovos = novosTrofeus(p);
  if (trofeusNovos.length) {
    p.trofeus = Array.from(new Set([...(p?.trofeus ?? []), ...trofeusNovos]));
  }

  const nivelNovo = calcularNivel(p.xp);
  return {
    perfil: p,
    drop,
    acertos,
    comboMax,
    subiuNivel: nivelNovo > nivelAnterior,
    nivelAnterior,
    nivelNovo,
    medalhasNovas,
    trofeusNovos,
    missoesConcluidas: mm.concluidas,
    multiplicador: recompensas.multiplicador,
    rewardType: recompensas.rewardType,
    moedasTotais: p.moedas,
  };
}
