/**
 * Sistema de Missões Diárias
 * Reset diário às 00:00
 */

export interface QuestDaily {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  objetivoAtual: number;
  objetivoMeta: number;
  recompensa: number;
  completada: boolean;
}

export interface MissaoDiariaData {
  data: string; // YYYY-MM-DD
  quests: QuestDaily[];
  bonusCompletado: boolean;
}

/**
 * Gera as 3 quests do dia
 */
export function gerarQuestsDodia(): QuestDaily[] {
  return [
    {
      id: 'ganha-5-batalhas',
      titulo: 'Vencedor',
      descricao: 'Ganha 5 batalhas',
      icone: '⚔️',
      objetivoAtual: 0,
      objetivoMeta: 5,
      recompensa: 200,
      completada: false,
    },
    {
      id: 'acerta-80pct',
      titulo: 'Mestre',
      descricao: 'Acerta 80%+ num mundo',
      icone: '🎯',
      objetivoAtual: 0,
      objetivoMeta: 1,
      recompensa: 150,
      completada: false,
    },
    {
      id: 'completa-mundo-novo',
      titulo: 'Explorador',
      descricao: 'Completa um mundo novo',
      icone: '🌟',
      objetivoAtual: 0,
      objetivoMeta: 1,
      recompensa: 250,
      completada: false,
    },
  ];
}

/**
 * Verifica se as quests são do dia de hoje
 */
export function verificarSeEhHoje(dataSalva: string): boolean {
  const hoje = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  return dataSalva === hoje;
}

/**
 * Calcula recompensa total do dia
 */
export function calcularRecompensaDiaria(quests: QuestDaily[], bonusCompletado: boolean): number {
  const totalQuests = quests.reduce((sum, q) => sum + (q.completada ? q.recompensa : 0), 0);
  const bonus = bonusCompletado ? 500 : 0; // Bonus por completar todos os 3
  return totalQuests + bonus;
}

/**
 * Verifica se todos as quests foram completadas
 */
export function todasQuestsCompletadas(quests: QuestDaily[]): boolean {
  return quests.length > 0 && quests.every((q) => q.completada);
}
