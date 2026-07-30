'use client';

import { useCallback, useState, useEffect } from 'react';
import { Perfil } from '@/types';
import {
  gerarQuestsDodia,
  verificarSeEhHoje,
  calcularRecompensaDiaria,
  todasQuestsCompletadas,
  QuestDaily,
  MissaoDiariaData,
} from '@/data/daily-quests';

export function useDailyQuests(perfil: Perfil | null) {
  const [quests, setQuests] = useState<QuestDaily[]>([]);
  const [bonusCompletado, setBonusCompletado] = useState(false);

  // Inicializar quests quando perfil carrega
  useEffect(() => {
    if (!perfil) return;

    const missaoDiaria = perfil.missaoDiaria;

    // Se não tem missão diária ou é de outro dia
    if (!missaoDiaria || !verificarSeEhHoje(missaoDiaria.data)) {
      // Gera novas quests para hoje
      const novasQuests = gerarQuestsDodia();
      setQuests(novasQuests);
      setBonusCompletado(false);
    } else {
      // Carrega as quests de hoje
      setQuests(missaoDiaria.quests);
      setBonusCompletado(missaoDiaria.bonusCompletado || false);
    }
  }, [perfil?.id]);

  /**
   * Progride uma quest
   */
  const progrirQuest = useCallback(
    (questId: string, incremento: number = 1) => {
      setQuests((prev) =>
        prev.map((q) => {
          if (q.id === questId) {
            const novoObjetivo = Math.min(q.objetivoAtual + incremento, q.objetivoMeta);
            const completada = novoObjetivo >= q.objetivoMeta;
            return { ...q, objetivoAtual: novoObjetivo, completada };
          }
          return q;
        })
      );

      // Verifica se completou todas
      const todasCompletadas = quests.some((q) => q.id === questId && q.objetivoAtual + incremento >= q.objetivoMeta)
        ? quests.filter((q) => q.id !== questId).every((q) => q.completada)
        : false;

      if (todasCompletadas) {
        setBonusCompletado(true);
      }
    },
    [quests]
  );

  /**
   * Completa uma quest manualmente
   */
  const completarQuest = useCallback((questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          return { ...q, objetivoAtual: q.objetivoMeta, completada: true };
        }
        return q;
      })
    );

    // Verifica bonus
    const todasCompletadas = quests.some((q) => q.id === questId) && quests.filter((q) => q.id !== questId).every((q) => q.completada);
    if (todasCompletadas) {
      setBonusCompletado(true);
    }
  }, [quests]);

  /**
   * Calcula moedas ganhas
   */
  const calcularMoedas = useCallback((): number => {
    return calcularRecompensaDiaria(quests, bonusCompletado);
  }, [quests, bonusCompletado]);

  /**
   * Retorna estado para salvar
   */
  const getMissaoDiaria = useCallback((): MissaoDiariaData => {
    return {
      data: new Date().toISOString().split('T')[0],
      quests,
      bonusCompletado,
    };
  }, [quests, bonusCompletado]);

  return {
    quests,
    bonusCompletado,
    progrirQuest,
    completarQuest,
    calcularMoedas,
    getMissaoDiaria,
    todasCompletadas: todasQuestsCompletadas(quests),
  };
}
