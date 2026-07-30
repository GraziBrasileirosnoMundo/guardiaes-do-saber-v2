// ============================================================================
// CONSTRUÇÃO DO MUNDO
// O progresso deixa de ser só o Portal: agora é um mundo inteiro que a criança
// vê a crescer. Cada edifício desbloqueia e constrói-se com as batalhas ganhas.
// ============================================================================

export interface Edificio {
  id: string;
  nome: string;
  icone: string;           // emoji
  descricao: string;
  batalhasDesbloqueio: number;  // batalhas para o edifício começar a aparecer
  batalhasCompleto: number;     // batalhas para ficar totalmente construído
  ordem: number;
}

export const EDIFICIOS: Edificio[] = [
  { id: 'ilha', nome: 'Ilha dos Guardiões', icone: '🏝️', descricao: 'O lar de onde tudo começa.', batalhasDesbloqueio: 0, batalhasCompleto: 0, ordem: 0 },
  { id: 'portal', nome: 'Portal Mágico', icone: '🌀', descricao: 'A porta para novas aventuras.', batalhasDesbloqueio: 1, batalhasCompleto: 4, ordem: 1 },
  { id: 'laboratorio', nome: 'Laboratório', icone: '🔬', descricao: 'Onde a ciência ganha vida.', batalhasDesbloqueio: 5, batalhasCompleto: 9, ordem: 2 },
  { id: 'arena', nome: 'Arena', icone: '⚔️', descricao: 'Palco das grandes batalhas.', batalhasDesbloqueio: 10, batalhasCompleto: 15, ordem: 3 },
  { id: 'castelo', nome: 'Castelo', icone: '🏰', descricao: 'A fortaleza dos Guardiões.', batalhasDesbloqueio: 18, batalhasCompleto: 25, ordem: 4 },
  { id: 'floresta', nome: 'Floresta Encantada', icone: '🌲', descricao: 'Cheia de segredos e magia.', batalhasDesbloqueio: 28, batalhasCompleto: 38, ordem: 5 },
  { id: 'montanha', nome: 'Montanha Gelada', icone: '🄔', descricao: 'O cume mais alto do mundo.', batalhasDesbloqueio: 45, batalhasCompleto: 58, ordem: 6 },
  { id: 'templo', nome: 'Templo Antigo', icone: '🛕', descricao: 'O tesouro final do teu mundo.', batalhasDesbloqueio: 68, batalhasCompleto: 85, ordem: 7 },
];

export type EstadoEdificio = 'bloqueado' | 'em_construcao' | 'completo';

export interface EdificioProgresso {
  edificio: Edificio;
  estado: EstadoEdificio;
  progresso: number;   // 0-100 dentro da construção do próprio edifício
}

export function estadoEdificio(ed: Edificio, batalhas: number): EdificioProgresso {
  if (batalhas < ed.batalhasDesbloqueio) {
    return { edificio: ed, estado: 'bloqueado', progresso: 0 };
  }
  if (batalhas >= ed.batalhasCompleto) {
    return { edificio: ed, estado: 'completo', progresso: 100 };
  }
  const total = Math.max(1, ed.batalhasCompleto - ed.batalhasDesbloqueio);
  const feito = batalhas - ed.batalhasDesbloqueio;
  return { edificio: ed, estado: 'em_construcao', progresso: Math.round((feito / total) * 100) };
}

export function mundoProgresso(batalhas: number): {
  edificios: EdificioProgresso[];
  completos: number;
  total: number;
  percentagem: number;
  proximo: EdificioProgresso | null;
  batalhasParaProximo: number;
} {
  const edificios = EDIFICIOS.map((e) => estadoEdificio(e, batalhas));
  const total = EDIFICIOS.length;
  const completos = edificios.filter((e) => e.estado === 'completo').length;
  // próximo = primeiro edifício ainda não completo
  const proximo = edificios.find((e) => e.estado !== 'completo') ?? null;
  let batalhasParaProximo = 0;
  if (proximo) {
    const alvo = proximo.estado === 'bloqueado'
      ? proximo.edificio.batalhasDesbloqueio
      : proximo.edificio.batalhasCompleto;
    batalhasParaProximo = Math.max(0, alvo - batalhas);
  }
  return {
    edificios,
    completos,
    total,
    percentagem: Math.round((completos / total) * 100),
    proximo,
    batalhasParaProximo,
  };
}
