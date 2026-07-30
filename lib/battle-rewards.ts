/**
 * Lógica para calcular e aplicar recompensas de batalha
 * Inclui: streak, multiplicador, daily quests, variable rewards
 */

import { Perfil } from '@/types';
import { verificarSeEhHoje } from '@/data/daily-quests';

interface RecompensasAplicadas {
  moedasGanhas: number;
  xpGanho: number;
  novoStreak: number;
  multiplicador: number;
  rewardType: 'normal' | 'lucky' | 'rare' | 'epic';
}

/**
 * Calcula multiplicador baseado em streak
 */
function calcularMultiplicador(streak: number): number {
  if (streak === 0) return 1.0;
  if (streak < 3) return 1.0;
  if (streak < 5) return 1.25;
  if (streak < 10) return 1.5;
  if (streak < 15) return 1.75;
  if (streak < 20) return 2.0;
  return 2.0 + (streak - 20) * 0.05;
}

/**
 * Determina tipo de recompensa (variable rewards)
 * 70% normal, 20% lucky, 8% rare, 2% epic
 */
function gerarTipoRecompensa(): 'normal' | 'lucky' | 'rare' | 'epic' {
  const random = Math.random() * 100;
  if (random < 70) return 'normal';
  if (random < 90) return 'lucky'; // +100% moedas
  if (random < 98) return 'rare'; // +200% moedas
  return 'epic'; // +400% moedas + item raro
}

/**
 * Calcula multiplicador da recompensa variável
 */
function getMultiplicadorRecompensa(tipo: 'normal' | 'lucky' | 'rare' | 'epic'): number {
  switch (tipo) {
    case 'normal':
      return 1.0;
    case 'lucky':
      return 2.0; // Dobro
    case 'rare':
      return 3.0; // Triplo
    case 'epic':
      return 5.0; // 5x
  }
}

/**
 * Calcula recompensas totais de uma batalha
 */
export function calcularRecompensasBatalha(
  perfil: Perfil,
  acertos: number,
  totalPerguntas: number = 5
): RecompensasAplicadas {
  const moedasBase = acertos * 20; // 20 moedas por acerto
  const xpBase = acertos * 10; // 10 XP por acerto

  // Calcula novo streak
  const acertouTudo = acertos === totalPerguntas;
  const novoStreak = acertouTudo ? (perfil.streak || 0) + 1 : 0;

  // Calcula multiplicador de streak
  const multiplicadorStreak = calcularMultiplicador(novoStreak);

  // Gera tipo de recompensa (variable)
  const rewardType = gerarTipoRecompensa();
  const multiplicadorRecompensa = getMultiplicadorRecompensa(rewardType);

  // Calcula moedas finais
  const moedasComStreak = Math.floor(moedasBase * multiplicadorStreak);
  const moedasFinais = Math.floor(moedasComStreak * multiplicadorRecompensa);
  const xpFinal = Math.floor(xpBase * multiplicadorStreak);

  return {
    moedasGanhas: moedasFinais,
    xpGanho: xpFinal,
    novoStreak,
    multiplicador: multiplicadorStreak * multiplicadorRecompensa,
    rewardType,
  };
}

/**
 * Aplica recompensas ao perfil
 */
export function aplicarRecompensasBatalha(
  perfil: Perfil,
  recompensas: RecompensasAplicadas
): Perfil {
  const atualizado = { ...perfil };

  // Atualiza streak
  atualizado.streak = recompensas.novoStreak;

  // Atualiza moedas
  atualizado.moedas = (atualizado.moedas || 0) + recompensas.moedasGanhas;

  // Atualiza XP
  atualizado.xp = (atualizado.xp || 0) + recompensas.xpGanho;

  // Atualiza batalhas concluídas
  atualizado.batalhasConcluidas = (atualizado.batalhasConcluidas || 0) + 1;

  // Atualiza melhor combo
  if (recompensas.novoStreak > (atualizado.melhorCombo || 0)) {
    atualizado.melhorCombo = recompensas.novoStreak;
  }

  // Atualiza total de acertos
  atualizado.totalAcertos = (atualizado.totalAcertos || 0) + 1; // Simplificado: +1 por batalha vencida

  return atualizado;
}

/**
 * Reseta streak se perdeu (optional - chamar manualmente se necessário)
 */
export function resetarStreakSePerdi(perfil: Perfil): Perfil {
  return { ...perfil, streak: 0 };
}
