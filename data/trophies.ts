import { Raridade } from '@/types';

// ============================================================================
// TROFÉUS — conquistas por marcos importantes (nunca por gastar dinheiro).
// ============================================================================

export type CriterioTrofeu =
  | { tipo: 'batalhas'; valor: number }
  | { tipo: 'nivel'; valor: number }
  | { tipo: 'combo'; valor: number }
  | { tipo: 'colecao'; valor: number }
  | { tipo: 'medalhas'; valor: number }
  | { tipo: 'mundo'; valor: number }; // nº de edifícios completos

export interface Trofeu {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
  raridade: Raridade;
  criterio: CriterioTrofeu;
}

export const TROFEUS: Trofeu[] = [
  { id: 'trofeu_primeira_vitoria', nome: 'Primeira Vitória', icone: '🏅', descricao: 'Venceste a tua primeira batalha!', raridade: 'comum', criterio: { tipo: 'batalhas', valor: 1 } },
  { id: 'trofeu_10_batalhas', nome: 'Aprendiz Valente', icone: '🥉', descricao: 'Venceste 10 batalhas.', raridade: 'comum', criterio: { tipo: 'batalhas', valor: 10 } },
  { id: 'trofeu_25_batalhas', nome: 'Guardião Corajoso', icone: '🥈', descricao: 'Venceste 25 batalhas.', raridade: 'raro', criterio: { tipo: 'batalhas', valor: 25 } },
  { id: 'trofeu_50_batalhas', nome: 'Herói do Saber', icone: '🥇', descricao: 'Venceste 50 batalhas.', raridade: 'epico', criterio: { tipo: 'batalhas', valor: 50 } },
  { id: 'trofeu_100_batalhas', nome: 'Lenda Viva', icone: '🏆', descricao: 'Venceste 100 batalhas!', raridade: 'lendario', criterio: { tipo: 'batalhas', valor: 100 } },
  { id: 'trofeu_nivel_max', nome: 'Nível Máximo', icone: '⭐', descricao: 'Chegaste ao nível 5.', raridade: 'epico', criterio: { tipo: 'nivel', valor: 5 } },
  { id: 'trofeu_combo_lenda', nome: 'Mestre do Combo', icone: '🔥', descricao: 'Fizeste um combo de 5 acertos seguidos.', raridade: 'raro', criterio: { tipo: 'combo', valor: 5 } },
  { id: 'trofeu_colecionador', nome: 'Colecionador', icone: '💎', descricao: 'Colecionaste 15 itens diferentes.', raridade: 'raro', criterio: { tipo: 'colecao', valor: 15 } },
  { id: 'trofeu_mestre_colecionador', nome: 'Mestre Colecionador', icone: '👑', descricao: 'Colecionaste 30 itens diferentes.', raridade: 'lendario', criterio: { tipo: 'colecao', valor: 30 } },
  { id: 'trofeu_sabio', nome: 'Sábio', icone: '🎓', descricao: 'Conquistaste 5 medalhas de competência.', raridade: 'epico', criterio: { tipo: 'medalhas', valor: 5 } },
  { id: 'trofeu_construtor', nome: 'Grande Construtor', icone: '🏗️', descricao: 'Construíste todo o teu mundo!', raridade: 'lendario', criterio: { tipo: 'mundo', valor: 8 } },
];

export function getTrofeu(id: string): Trofeu | undefined {
  return TROFEUS.find((t) => t.id === id);
}
