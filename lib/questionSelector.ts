import { Pergunta, PerguntaEmbaralhada, Perfil, AnoEscolar } from '@/types';
import { PERGUNTAS } from '@/data/questions';

function embaralharArray<T>(arr: T[]): T[] {
  const copy = [...(arr ?? [])];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function embaralharPergunta(p: Pergunta): PerguntaEmbaralhada {
  const respostaCorreta = p?.alternativas?.[p?.correta ?? 0] ?? '';
  const alternativasEmbaralhadas = embaralharArray([...(p?.alternativas ?? [])]);
  const indiceCorretoEmbaralhado = alternativasEmbaralhadas?.indexOf(respostaCorreta) ?? 0;
  return {
    ...(p ?? {}),
    alternativasEmbaralhadas,
    indiceCorretoEmbaralhado: indiceCorretoEmbaralhado >= 0 ? indiceCorretoEmbaralhado : 0,
  } as PerguntaEmbaralhada;
}

export function selecionarPerguntas(perfil: Perfil, quantidade: number = 5): PerguntaEmbaralhada[] {
  const ano: AnoEscolar = perfil?.ano ?? 2;
  const perguntasDoAno = PERGUNTAS?.filter((p: Pergunta) => p?.ano === ano) ?? [];
  if (perguntasDoAno.length === 0) return [];

  const respondidas = perfil?.perguntasRespondidas ?? {};
  const errosPorTema = perfil?.errosPorTema ?? {};
  const acertosPorTema = perfil?.acertosPorTema ?? {};
  const dificuldadeAtual = perfil?.dificuldadeAtual ?? {};
  const sequenciaAtual = perfil?.sequenciaAtual ?? 0;

  // Get recently answered (last 10)
  const recentIds = Object.entries(respondidas)
    .sort((a: any, b: any) => {
      const timeA = new Date(a?.[1]?.ultimaVez ?? 0).getTime();
      const timeB = new Date(b?.[1]?.ultimaVez ?? 0).getTime();
      return timeB - timeA;
    })
    .slice(0, 10)
    .map((e: any) => e?.[0] ?? '');

  // Score each question by priority
  const scored = perguntasDoAno.map((p: Pergunta) => {
    let score = 50; // base
    // Recently answered → lower priority
    if (recentIds?.includes(p?.id)) score -= 40;
    // Errors in this theme → higher priority
    const erros = errosPorTema?.[p?.tema ?? ''] ?? 0;
    const acertos = acertosPorTema?.[p?.tema ?? ''] ?? 0;
    const total = erros + acertos;
    if (total > 0) {
      const taxa = acertos / total;
      if (taxa < 0.5) score += 30; // weak topic
      else if (taxa > 0.8) score -= 15; // mastered
    }
    // Difficulty adjustment
    const temaDif = dificuldadeAtual?.[p?.tema ?? ''] ?? 1;
    if ((p?.dificuldade ?? 1) === temaDif) score += 10;
    if (Math.abs((p?.dificuldade ?? 1) - temaDif) > 1) score -= 20;
    // Adaptive: 3+ streak → prefer harder
    if (sequenciaAtual >= 3 && (p?.dificuldade ?? 1) >= 2) score += 15;
    // Add randomness
    score += Math.random() * 20;
    return { pergunta: p, score };
  });

  scored.sort((a: any, b: any) => (b?.score ?? 0) - (a?.score ?? 0));

  // Select alternating disciplines
  const selecionadas: Pergunta[] = [];
  const disciplinas = ['Matematica', 'Portugues'];
  let discIdx = 0;

  for (const item of scored) {
    if (selecionadas.length >= quantidade) break;
    const targetDisc = disciplinas[discIdx % 2];
    if (item?.pergunta?.disciplina === targetDisc || selecionadas.length >= quantidade - 1) {
      selecionadas.push(item.pergunta);
      discIdx++;
    }
  }

  // Fill remaining if needed
  if (selecionadas.length < quantidade) {
    for (const item of scored) {
      if (selecionadas.length >= quantidade) break;
      if (!selecionadas?.find((s: Pergunta) => s?.id === item?.pergunta?.id)) {
        selecionadas.push(item.pergunta);
      }
    }
  }

  return selecionadas.slice(0, quantidade).map(embaralharPergunta);
}

export function atualizarDificuldade(
  perfil: Perfil,
  tema: string,
  correta: boolean
): Perfil {
  const dificuldadeAtual = { ...(perfil?.dificuldadeAtual ?? {}) };
  const errosPorTema = { ...(perfil?.errosPorTema ?? {}) };
  const acertosPorTema = { ...(perfil?.acertosPorTema ?? {}) };
  const atual = dificuldadeAtual[tema] ?? 1;

  if (correta) {
    acertosPorTema[tema] = (acertosPorTema[tema] ?? 0) + 1;
    // 3 consecutive correct in this theme → increase difficulty
    const totalAcertos = acertosPorTema[tema] ?? 0;
    if (totalAcertos % 3 === 0 && atual < 3) {
      dificuldadeAtual[tema] = atual + 1;
    }
  } else {
    errosPorTema[tema] = (errosPorTema[tema] ?? 0) + 1;
    // 2 errors → decrease difficulty
    const totalErros = errosPorTema[tema] ?? 0;
    if (totalErros % 2 === 0 && atual > 1) {
      dificuldadeAtual[tema] = atual - 1;
    }
  }

  return {
    ...(perfil ?? {}),
    dificuldadeAtual,
    errosPorTema,
    acertosPorTema,
  } as Perfil;
}
