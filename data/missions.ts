// ============================================================================
// MISSÕES — sempre pequenas, sempre possíveis, nunca obrigatórias.
// Diária, semanal e mensal. Reset automático por período.
// ============================================================================

export interface MissaoTemplate {
  id: string;
  descricao: string;
  metrica: 'batalhas' | 'acertos' | 'perguntas' | 'vitorias_perfeitas' | 'combo' | 'itens';
  meta: number;
  recompensaMoedas: number;
  recompensaItem?: string | null;
}

export const MISSOES_DIARIAS: MissaoTemplate[] = [
  { id: 'd_batalhas3', descricao: 'Vence 3 batalhas hoje', metrica: 'batalhas', meta: 3, recompensaMoedas: 40 },
  { id: 'd_acertos12', descricao: 'Acerta 12 perguntas hoje', metrica: 'acertos', meta: 12, recompensaMoedas: 40 },
  { id: 'd_perfeita1', descricao: 'Ganha 1 batalha perfeita (5/5)', metrica: 'vitorias_perfeitas', meta: 1, recompensaMoedas: 50 },
  { id: 'd_combo3', descricao: 'Faz um combo de 3 acertos seguidos', metrica: 'combo', meta: 3, recompensaMoedas: 35 },
  { id: 'd_perguntas20', descricao: 'Responde a 20 perguntas hoje', metrica: 'perguntas', meta: 20, recompensaMoedas: 45 },
];

export const MISSOES_SEMANAIS: MissaoTemplate[] = [
  { id: 'w_batalhas15', descricao: 'Vence 15 batalhas esta semana', metrica: 'batalhas', meta: 15, recompensaMoedas: 150 },
  { id: 'w_acertos60', descricao: 'Acerta 60 perguntas esta semana', metrica: 'acertos', meta: 60, recompensaMoedas: 150 },
  { id: 'w_perfeitas3', descricao: 'Ganha 3 batalhas perfeitas esta semana', metrica: 'vitorias_perfeitas', meta: 3, recompensaMoedas: 180 },
  { id: 'w_combo4', descricao: 'Faz um combo de 4 acertos seguidos', metrica: 'combo', meta: 4, recompensaMoedas: 130 },
];

export const MISSOES_MENSAIS: MissaoTemplate[] = [
  { id: 'm_batalhas50', descricao: 'Vence 50 batalhas este mês', metrica: 'batalhas', meta: 50, recompensaMoedas: 450 },
  { id: 'm_acertos200', descricao: 'Acerta 200 perguntas este mês', metrica: 'acertos', meta: 200, recompensaMoedas: 450 },
  { id: 'm_itens8', descricao: 'Coleciona 8 itens novos este mês', metrica: 'itens', meta: 8, recompensaMoedas: 400 },
];
