'use client';
import { useCallback, useRef } from 'react';
import { BatalhaEstado, Perfil } from '@/types';
import { selecionarPerguntas, atualizarDificuldade } from '@/lib/questionSelector';
import { calcularMoedasPergunta, calcularXpPergunta } from '@/lib/gameLogic';
import { registarEvento } from '@/lib/metrics';
import { getAudioManager } from '@/lib/audio';
import { MONSTROS } from '@/data/items';

interface UseBattleActionsParams {
  estado: BatalhaEstado | null;
  feedback: { tipo: 'acerto' | 'erro'; explicacao?: string } | null;
  onSetEstado: (estado: BatalhaEstado | ((prev: BatalhaEstado | null) => BatalhaEstado | null)) => void;
  onSetFeedback: (fb: { tipo: 'acerto' | 'erro'; explicacao?: string } | null) => void;
  onSetBatalhaTerminada: (fim: boolean) => void;
  onUpdatePerfil: (p: Perfil) => void;
}

export function useBattleActions({
  estado,
  feedback,
  onSetEstado,
  onSetFeedback,
  onSetBatalhaTerminada,
  onUpdatePerfil,
}: UseBattleActionsParams) {
  const perfilRef = useRef<Perfil | null>(null);

  const iniciarBatalha = useCallback((perfil: Perfil | null) => {
    if (!perfil) return;
    perfilRef.current = perfil;
    const perguntas = selecionarPerguntas(perfil, 5);
    const monstro = MONSTROS[Math.floor(Math.random() * MONSTROS.length)];
    const novoEstado: BatalhaEstado = {
      perguntas,
      perguntaAtual: 0,
      acertos: 0,
      moedasGanhas: 0,
      xpGanho: 0,
      sequenciaAcertos: 0,
      monstro,
      monstroPV: 100,
      monstroPVMax: 100,
      inicio: Date.now(),
      respostas: [],
    };
    onSetEstado(novoEstado);
    onSetFeedback(null);
    onSetBatalhaTerminada(false);
    registarEvento(perfil.id, 'batalha_iniciada');
  }, [onSetEstado, onSetFeedback, onSetBatalhaTerminada]);

  const responder = useCallback((indiceEscolhido: number) => {
    if (!estado || !perfilRef.current || feedback) return;
    const pergunta = estado?.perguntas?.[estado?.perguntaAtual ?? 0];
    if (!pergunta) return;

    const correta = indiceEscolhido === pergunta?.indiceCorretoEmbaralhado;
    const tempo = Date.now() - estado.inicio;
    const stats = perfilRef.current?.perguntasRespondidas ?? {};
    const perguntaStats = stats?.[pergunta.id] ?? { acertos: 0, tentativas: 0, ultimaVez: '' };
    const primeiraTentativa = (perguntaStats?.tentativas ?? 0) === 0;

    let novoEstado = { ...estado };
    let novoPerfil = { ...perfilRef.current } as Perfil;
    const novaSeq = correta ? (novoEstado?.sequenciaAcertos ?? 0) + 1 : 0;
    const moedas = calcularMoedasPergunta(correta, novaSeq);
    const xp = calcularXpPergunta(correta);

    novoEstado.sequenciaAcertos = novaSeq;
    novoEstado.moedasGanhas = (novoEstado?.moedasGanhas ?? 0) + moedas;
    novoEstado.xpGanho = (novoEstado?.xpGanho ?? 0) + xp;

    if (correta) {
      const audio = getAudioManager();
      audio.play('acertar');
      novoEstado.acertos = (novoEstado?.acertos ?? 0) + 1;
      novoEstado.monstroPV = Math.max(0, (novoEstado?.monstroPV ?? 100) - 20);
    }

    novoEstado.respostas = [...(novoEstado?.respostas ?? []), {
      perguntaId: pergunta.id,
      correta,
      primeiraTentativa,
      tempo,
    }];

    novoPerfil.perguntasRespondidas = {
      ...(novoPerfil?.perguntasRespondidas ?? {}),
      [pergunta.id]: {
        acertos: (perguntaStats?.acertos ?? 0) + (correta ? 1 : 0),
        tentativas: (perguntaStats?.tentativas ?? 0) + 1,
        ultimaVez: new Date().toISOString(),
      },
    };
    novoPerfil.sequenciaAtual = novaSeq;
    novoPerfil = atualizarDificuldade(novoPerfil, pergunta?.tema ?? '', correta);
    onUpdatePerfil(novoPerfil);

    registarEvento(novoPerfil.id, 'pergunta_respondida', {
      disciplina: pergunta.disciplina,
      tema: pergunta.tema,
      competencia: pergunta.competencia,
      dificuldade: pergunta.dificuldade,
      correta,
      primeiraTentativa,
      tempo,
    });
    registarEvento(novoPerfil.id, correta ? 'resposta_correta' : 'resposta_errada');

    onSetFeedback({
      tipo: correta ? 'acerto' : 'erro',
      explicacao: correta ? undefined : pergunta?.explicacao,
    });
    onSetEstado(novoEstado);

    const delay = correta ? 1000 : 2000;
    const advanceTimer = setTimeout(() => {
      onSetFeedback(null);
      if ((novoEstado?.perguntaAtual ?? 0) >= 4) {
        onSetBatalhaTerminada(true);
        registarEvento(novoPerfil.id, 'batalha_concluida', {
          duracao: Date.now() - novoEstado.inicio,
          acertos: novoEstado.acertos,
          total: 5,
        });
      } else {
        onSetEstado((prev: BatalhaEstado | null) => prev ? { ...prev, perguntaAtual: (prev?.perguntaAtual ?? 0) + 1 } : null);
      }
    }, delay);
  }, [estado, feedback, onSetEstado, onSetFeedback, onSetBatalhaTerminada, onUpdatePerfil]);

  const abandonar = useCallback(() => {
    if (perfilRef.current) {
      registarEvento(perfilRef.current.id, 'batalha_abandonada');
    }
    onSetEstado(() => null);
    onSetFeedback(null);
    onSetBatalhaTerminada(false);
  }, [onSetEstado, onSetFeedback, onSetBatalhaTerminada]);

  return { iniciarBatalha, responder, abandonar };
}
