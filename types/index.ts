export type AnoEscolar = 2 | 5;
export type GuardiaoTipo = 'LUMIS' | 'TORRAK';
export type Disciplina = 'Matematica' | 'Portugues' | 'Estudo do Meio' | 'Ingles';
export type Dificuldade = 1 | 2 | 3;

export interface Pergunta {
  id: string;
  pais: 'PT';
  ano: AnoEscolar;
  disciplina: Disciplina;
  tema: string;
  competencia: string;
  dificuldade: Dificuldade;
  enunciado: string;
  alternativas: string[];
  correta: number;
  explicacao: string;
}

export interface PerguntaEmbaralhada extends Pergunta {
  alternativasEmbaralhadas: string[];
  indiceCorretoEmbaralhado: number;
}

export interface PerfilPerguntaStats {
  acertos: number;
  tentativas: number;
  ultimaVez: string;
}

export interface BatalhaSessao {
  data: string;
  acertos: number;
  total: number;
  duracao: number;
}

export interface Perfil {
  id: string;
  apelido: string;
  ano: AnoEscolar;
  guardiao: GuardiaoTipo;
  personagem?: string; // 'lumis' | 'faisca' | 'verdor' | 'torrak' | 'eclipse'
  nomeGuardiao: string;
  nivel: number;
  xp: number;
  moedas: number;
  streak: number;
  ultimoJogo: string;
  portalProgress: number;
  portalEtapa: number;
  itensDesbloqueados: string[];
  aparenciaAtiva: string;
  acessorioAtivo: string | null;
  perguntasRespondidas: Record<string, PerfilPerguntaStats>;
  dificuldadeAtual: Record<string, number>;
  errosPorTema: Record<string, number>;
  acertosPorTema: Record<string, number>;
  sequenciaAtual: number;
  batalhasConcluidas: number;
  batalhaSessions: BatalhaSessao[];
  criadoEm: string;
  atualizadoEm?: string;

  // === Fase 2 (produto) — campos opcionais migrados com valores por defeito ===
  colecao?: string[];                 // ids de colecionáveis possuídos
  equipado?: EquipSlots;              // itens equipados (loadout visual)
  medalhas?: string[];                // ids de medalhas de competência conquistadas
  certificados?: string[];            // temas com certificado de domínio
  trofeus?: string[];                 // ids de troféus conquistados
  missaoDiaria?: MissaoEstado | null;
  missaoSemanal?: MissaoEstado | null;
  missaoMensal?: MissaoEstado | null;
  melhorCombo?: number;               // maior sequência de acertos de sempre
  totalAcertos?: number;              // total de respostas certas de sempre

  // === Daily Quests ===
  questsDiaria?: {
    data: string;
    quests: any[];
    bonusCompletado: boolean;
  } | null;

  // === Companheiros (Amigos) ===
  companheirosLivre?: string[];       // ids dos companheiros libertados
}

export type EventoTipo =
  | 'perfil_criado'
  | 'jogo_aberto'
  | 'batalha_iniciada'
  | 'pergunta_respondida'
  | 'resposta_correta'
  | 'resposta_errada'
  | 'batalha_concluida'
  | 'batalha_abandonada'
  | 'jogar_novamente_clicado'
  | 'recompensa_aberta'
  | 'perfil_trocado'
  | 'missao_concluida'
  | 'item_desbloqueado'
  | 'medalha_ganha'
  | 'certificado_ganho'
  | 'trofeu_ganho'
  | 'loja_compra'
  | 'colecao_aberta'
  | 'mundo_aberto'
  | 'bau_aberto';

export interface EventoMetrica {
  tipo: EventoTipo;
  timestamp: string;
  dados?: Record<string, any>;
}

export interface RecompensaBau {
  moedas: number;
  acessorio?: string;
  pecaBase?: string;
  efeitoVisual?: string;
}

export interface BatalhaEstado {
  perguntas: PerguntaEmbaralhada[];
  perguntaAtual: number;
  acertos: number;
  moedasGanhas: number;
  xpGanho: number;
  sequenciaAcertos: number;
  monstro: string;
  monstroPV: number;
  monstroPVMax: number;
  inicio: number;
  respostas: { perguntaId: string; correta: boolean; primeiraTentativa: boolean; tempo: number }[];
}

export interface ItemLoja {
  id: string;
  nome: string;
  tipo: 'acessorio' | 'peca_base' | 'aparencia' | 'efeito';
  descricao: string;
  custo: number;
}

// === Sistema de coleção / economia / mundo / missões ===
export type Raridade = 'comum' | 'raro' | 'epico' | 'lendario';

export type CategoriaColecao =
  | 'chapeu'
  | 'capacete'
  | 'oculos'
  | 'capa'
  | 'asas'
  | 'efeito'
  | 'cor'
  | 'companheiro'
  | 'medalha'
  | 'trofeu';

export interface ItemPlacement {
  offsetX: number;               // posição relativa X (px)
  offsetY: number;               // posição relativa Y (px)
  scale: number;                 // escala (1 = original)
  rotation: number;              // rotação (graus)
  zIndex: number;                // camada visual (ordem de renderização)
}

export interface Colecionavel {
  id: string;
  nome: string;
  categoria: CategoriaColecao;
  raridade: Raridade;
  descricao: string;
  icone: string;                 // emoji representativo
  custo: number;                 // preço na loja (0 = não vendável, só conquista/baú)
  origem: 'loja' | 'bau' | 'conquista';
  cor?: string;                  // só para categoria 'cor' (override do guardião)
  // === Novo: posicionamento no Guardião ===
  placements?: {
    lumis?: ItemPlacement;       // posição específica para LUMIS
    torrak?: ItemPlacement;      // posição específica para TORRAK
  };
}

export interface EquipSlots {
  chapeu: string | null;
  capacete: string | null;
  oculos: string | null;
  capa: string | null;
  asas: string | null;
  efeito: string | null;
  cor: string | null;
  companheiro: string | null;
}

export type TierBau = 'comum' | 'raro' | 'epico' | 'lendario';

export interface DropBau {
  tier: TierBau;
  moedas: number;
  itens: string[];               // ids de colecionáveis ganhos
}

export interface MissaoEstado {
  id: string;
  descricao: string;
  metrica: string;               // contador seguido (ex.: batalhas, acertos, combo)
  meta: number;
  progresso: number;
  periodoKey: string;            // chave do período (dia/semana/mês)
  recompensaMoedas: number;
  recompensaItem?: string | null;
  recompensada: boolean;
}

export interface CompetenciaProgresso {
  tema: string;
  disciplina: Disciplina;
  acertos: number;
  tentativas: number;
  taxa: number;                  // 0-100 percentagem de acerto
  dominado: boolean;             // atingiu critério de medalha
}

// === Tipos de Missões (Antes espalhados em lib/missions.ts) ===
export type TipoMissao = 'diaria' | 'semanal' | 'mensal';

export interface DeltasMissao {
  batalhas?: number;
  acertos?: number;
  perguntas?: number;
  vitorias_perfeitas?: number;
  itens?: number;
  comboMax?: number;
}

// === Tipos de Batalla (Antes em lib/battleFlow.ts) ===
export interface ResultadoBatalha {
  perfil: Perfil;
  drop: DropBau;
  acertos: number;
  comboMax: number;
  subiuNivel: boolean;
  nivelAnterior: number;
  nivelNovo: number;
  medalhasNovas: string[];
  trofeusNovos: string[];
  missoesConcluidas: MissaoEstado[];
  multiplicador?: number;
  rewardType?: 'normal' | 'lucky' | 'rare' | 'epic';
  moedasTotais?: number;
}

// === Tipos de Objetivos (Antes em lib/objectives.ts) ===
export interface ObjetivoProximo {
  icone: string;
  texto: string;
  tipo: 'missao' | 'nivel' | 'mundo' | 'colecao';
}

// === Tipos de Troféus (Antes em lib/achievements.ts) ===
export interface ContextoTrofeu {
  batalhas: number;
  nivel: number;
  melhorCombo: number;
  colecaoCount: number;
  medalhasCount: number;
  mundoCompletos: number;
}
