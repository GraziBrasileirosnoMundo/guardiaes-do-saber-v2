import type { Expressao } from '@/components/guardians/lumis';

// ============================================================================
// PERSONALIDADE DO GUARDIÃO
// Mensagens sempre positivas. Nunca culpa, nunca medo, nunca ansiedade.
// O Guardião é um companheiro que celebra e encoraja.
// ============================================================================

export type ContextoGuardiao =
  | 'boas_vindas'
  | 'acerto'
  | 'combo'
  | 'erro'
  | 'vitoria'
  | 'nivel'
  | 'medalha'
  | 'convite';

interface FalaGuardiao {
  texto: string;
  expressao: Expressao;
}

const MENSAGENS: Record<ContextoGuardiao, FalaGuardiao[]> = {
  boas_vindas: [
    { texto: 'Que bom ver-te! Vamos aprender juntos?', expressao: 'muito_feliz' },
    { texto: 'Senti a tua falta! Preparado para a aventura?', expressao: 'animado' },
    { texto: 'Olá, amigo! Hoje vai ser um grande dia!', expressao: 'muito_feliz' },
    { texto: 'Estou tão contente por jogares comigo!', expressao: 'animado' },
  ],
  acerto: [
    { texto: 'Boa! Sabia que conseguias!', expressao: 'muito_feliz' },
    { texto: 'Isso mesmo! És incrível!', expressao: 'muito_feliz' },
    { texto: 'Fantástico! Continua assim!', expressao: 'animado' },
  ],
  combo: [
    { texto: 'Estás a arrasar! Que combo!', expressao: 'animado' },
    { texto: 'Imparável! Adoro ver-te assim!', expressao: 'muito_feliz' },
    { texto: 'Uau! Estás em grande forma!', expressao: 'animado' },
  ],
  erro: [
    { texto: 'Quase! Errar faz parte de aprender.', expressao: 'calmo' },
    { texto: 'Sem problema! Da próxima acertas.', expressao: 'calmo' },
    { texto: 'Estou aqui contigo. Vamos tentar outra?', expressao: 'calmo' },
    { texto: 'Boa tentativa! Aprendemos com tudo.', expressao: 'calmo' },
  ],
  vitoria: [
    { texto: 'Ganhamos! Que batalha fantástica!', expressao: 'muito_feliz' },
    { texto: 'Estou tão orgulhoso de ti!', expressao: 'muito_feliz' },
    { texto: 'Conseguimos juntos! Boa!', expressao: 'animado' },
  ],
  nivel: [
    { texto: 'Subimos de nível! Cada vez mais fortes!', expressao: 'animado' },
    { texto: 'Novo nível! Estás a crescer imenso!', expressao: 'muito_feliz' },
  ],
  medalha: [
    { texto: 'Dominaste isto! Que conquista!', expressao: 'muito_feliz' },
    { texto: 'Uau! Ganhaste uma medalha!', expressao: 'muito_feliz' },
  ],
  convite: [
    { texto: 'Vamos jogar mais uma?', expressao: 'feliz' },
    { texto: 'Falta pouco para a próxima recompensa!', expressao: 'animado' },
    { texto: 'Bora treinar um bocadinho mais?', expressao: 'feliz' },
  ],
};

export function mensagemGuardiao(contexto: ContextoGuardiao, seed?: number): FalaGuardiao {
  const lista = MENSAGENS[contexto] ?? MENSAGENS.boas_vindas;
  const i = seed != null ? seed % lista.length : Math.floor(Math.random() * lista.length);
  return lista[i] ?? lista[0];
}
