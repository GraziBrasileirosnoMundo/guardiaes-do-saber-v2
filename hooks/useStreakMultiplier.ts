'use client';

/**
 * Hook para calcular multiplicador de moedas baseado em streak
 */

export function useStreakMultiplier() {
  /**
   * Calcula o multiplicador baseado no streak
   * Streaks maiores = multiplicadores maiores
   */
  const calcularMultiplicador = (streak: number): number => {
    if (streak === 0) return 1.0;
    if (streak < 3) return 1.0; // Não há bonus até 3
    if (streak < 5) return 1.25; // +25%
    if (streak < 10) return 1.5; // +50%
    if (streak < 15) return 1.75; // +75%
    if (streak < 20) return 2.0; // +100% (dobrado!)
    return 2.0 + (streak - 20) * 0.05; // +5% por vitória adicional
  };

  /**
   * Calcula moedas com multiplicador
   */
  const calcularMoedasComMultiplicador = (moedasBase: number, streak: number): number => {
    const multiplicador = calcularMultiplicador(streak);
    return Math.floor(moedasBase * multiplicador);
  };

  /**
   * Descrição do multiplicador
   */
  const descricaoMultiplicador = (streak: number): string => {
    if (streak === 0) return 'Começa teu streak!';
    if (streak < 3) return `${streak} de vitória seguida`;
    if (streak < 5) return `🔥 ${streak} - Multiplicador x1.25!`;
    if (streak < 10) return `🔥🔥 ${streak} - Multiplicador x1.5!`;
    if (streak < 15) return `🔥🔥🔥 ${streak} - Multiplicador x1.75!`;
    if (streak < 20) return `🔥🔥🔥🔥 ${streak} - Multiplicador x2.0!`;
    return `🔥🔥🔥🔥🔥 ${streak} - Multiplicador x${calcularMultiplicador(streak).toFixed(2)}!`;
  };

  return {
    calcularMultiplicador,
    calcularMoedasComMultiplicador,
    descricaoMultiplicador,
  };
}
