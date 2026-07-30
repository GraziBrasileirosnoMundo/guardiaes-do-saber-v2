import { Colecionavel, TierBau, Raridade } from '@/types';

// ============================================================================
// CATÁLOGO DE COLEÇÃO
// Tudo é conquistado a jogar (baús) ou comprado com moedas ganhas a jogar.
// Nada é pago com dinheiro real. Sem anúncios. Sem loot boxes pagas.
// ============================================================================

export const RARIDADE_INFO: Record<Raridade, { nome: string; cor: string; corBg: string; ordem: number }> = {
  comum: { nome: 'Comum', cor: '#94a3b8', corBg: 'rgba(148,163,184,0.15)', ordem: 0 },
  raro: { nome: 'Raro', cor: '#38bdf8', corBg: 'rgba(56,189,248,0.15)', ordem: 1 },
  epico: { nome: 'Épico', cor: '#c084fc', corBg: 'rgba(192,132,252,0.18)', ordem: 2 },
  lendario: { nome: 'Lendário', cor: '#fbbf24', corBg: 'rgba(251,191,36,0.20)', ordem: 3 },
};

export const CATEGORIA_INFO: Record<string, { nome: string; icone: string }> = {
  chapeu: { nome: 'Chapéus', icone: '🎩' },
  capacete: { nome: 'Capacetes', icone: '⛑️' },
  oculos: { nome: 'Óculos', icone: '🕶️' },
  capa: { nome: 'Capas', icone: '🧥' },
  asas: { nome: 'Asas', icone: '🪽' },
  efeito: { nome: 'Efeitos', icone: '✨' },
  cor: { nome: 'Cores', icone: '🎨' },
  companheiro: { nome: 'Companheiros', icone: '🐾' },
  medalha: { nome: 'Medalhas', icone: '🏅' },
  trofeu: { nome: 'Troféus', icone: '🏆' },
};

export const COLECIONAVEIS: Colecionavel[] = [
  // ---- CHAPÉUS ----
  { id: 'chapeu_aventureiro', nome: 'Chapéu de Aventureiro', categoria: 'chapeu', raridade: 'comum', descricao: 'O teu primeiro chapéu de explorador.', icone: '🎩', custo: 0, origem: 'conquista' },
  { id: 'chapeu_festa', nome: 'Chapéu de Festa', categoria: 'chapeu', raridade: 'comum', descricao: 'Para celebrar cada vitória!', icone: '🥳', custo: 60, origem: 'loja' },
  { id: 'chapeu_mago', nome: 'Chapéu de Mago', categoria: 'chapeu', raridade: 'raro', descricao: 'Cheio de sabedoria mágica.', icone: '🧙', custo: 160, origem: 'loja' },
  { id: 'chapeu_coroa', nome: 'Coroa Real', categoria: 'chapeu', raridade: 'lendario', descricao: 'Só os maiores Guardiões a usam.', icone: '👑', custo: 0, origem: 'bau' },

  // ---- CAPACETES ----
  { id: 'capacete_bronze', nome: 'Capacete de Bronze', categoria: 'capacete', raridade: 'comum', descricao: 'Proteção para começar.', icone: '⛑️', custo: 70, origem: 'loja' },
  { id: 'capacete_guerreiro', nome: 'Capacete de Guerreiro', categoria: 'capacete', raridade: 'raro', descricao: 'De um verdadeiro herói.', icone: '🪖', custo: 150, origem: 'loja' },
  { id: 'capacete_diamante', nome: 'Capacete de Diamante', categoria: 'capacete', raridade: 'epico', descricao: 'Brilha com mil reflexos.', icone: '💎', custo: 280, origem: 'loja' },

  // ---- ÓCULOS ----
  { id: 'oculos_leitura', nome: 'Óculos de Leitura', categoria: 'oculos', raridade: 'comum', descricao: 'Para ler todas as pistas.', icone: '👓', custo: 40, origem: 'loja' },
  { id: 'oculos_sol', nome: 'Óculos de Sol', categoria: 'oculos', raridade: 'comum', descricao: 'Estilo em qualquer batalha.', icone: '🕶️', custo: 80, origem: 'loja' },
  { id: 'oculos_vr', nome: 'Óculos Futuristas', categoria: 'oculos', raridade: 'raro', descricao: 'Vê o mundo de outra forma.', icone: '🥽', custo: 150, origem: 'loja' },
  { id: 'oculos_sabio', nome: 'Monóculo do Sábio', categoria: 'oculos', raridade: 'epico', descricao: 'Para os pensadores geniais.', icone: '🧐', custo: 260, origem: 'loja' },

  // ---- CAPAS ----
  { id: 'capa_iniciante', nome: 'Capa de Iniciante', categoria: 'capa', raridade: 'comum', descricao: 'Toda a jornada começa aqui.', icone: '🧥', custo: 90, origem: 'loja' },
  { id: 'capa_heroi', nome: 'Capa de Herói', categoria: 'capa', raridade: 'raro', descricao: 'Voa alto com coragem.', icone: '🦸', custo: 170, origem: 'loja' },
  { id: 'capa_estrelas', nome: 'Capa Estelar', categoria: 'capa', raridade: 'epico', descricao: 'Feita com pó de estrelas.', icone: '🌌', custo: 300, origem: 'loja' },
  { id: 'capa_lendaria', nome: 'Capa do Guardião Supremo', categoria: 'capa', raridade: 'lendario', descricao: 'A capa mais rara de todas.', icone: '🐉', custo: 0, origem: 'bau' },

  // ---- ASAS ----
  { id: 'asas_borboleta', nome: 'Asas de Borboleta', categoria: 'asas', raridade: 'raro', descricao: 'Leves como o vento.', icone: '🦋', custo: 180, origem: 'loja' },
  { id: 'asas_anjo', nome: 'Asas de Anjo', categoria: 'asas', raridade: 'raro', descricao: 'Brancas e brilhantes.', icone: '🪽', custo: 200, origem: 'loja' },
  { id: 'asas_dragao', nome: 'Asas de Dragão', categoria: 'asas', raridade: 'epico', descricao: 'Poderosas e majestosas.', icone: '🐲', custo: 0, origem: 'bau' },
  { id: 'asas_fenix', nome: 'Asas de Fénix', categoria: 'asas', raridade: 'lendario', descricao: 'Renascem sempre mais fortes.', icone: '🦅', custo: 0, origem: 'bau' },

  // ---- EFEITOS ----
  { id: 'efeito_estrelas', nome: 'Chuva de Estrelas', categoria: 'efeito', raridade: 'comum', descricao: 'Estrelinhas à tua volta.', icone: '✨', custo: 90, origem: 'loja' },
  { id: 'efeito_fogo', nome: 'Aura de Fogo', categoria: 'efeito', raridade: 'raro', descricao: 'Chamas suaves e quentes.', icone: '🔥', custo: 150, origem: 'loja' },
  { id: 'efeito_gelo', nome: 'Aura de Gelo', categoria: 'efeito', raridade: 'raro', descricao: 'Cristais de gelo a dançar.', icone: '❄️', custo: 150, origem: 'loja' },
  { id: 'efeito_relampago', nome: 'Aura de Relâmpago', categoria: 'efeito', raridade: 'epico', descricao: 'Energia elétrica pura.', icone: '⚡', custo: 260, origem: 'loja' },
  { id: 'efeito_arcoiris', nome: 'Aura Arco-Íris', categoria: 'efeito', raridade: 'lendario', descricao: 'Todas as cores num só brilho.', icone: '🌈', custo: 0, origem: 'bau' },

  // ---- CORES (tonalidade do Guardião) ----
  { id: 'cor_original', nome: 'Cor Original', categoria: 'cor', raridade: 'comum', descricao: 'A tua cor de sempre.', icone: '🎨', custo: 0, origem: 'conquista' },
  { id: 'cor_oceano', nome: 'Azul Oceano', categoria: 'cor', raridade: 'comum', descricao: 'Fresco como o mar.', icone: '🌊', custo: 110, origem: 'loja', cor: '#0ea5e9' },
  { id: 'cor_floresta', nome: 'Verde Floresta', categoria: 'cor', raridade: 'comum', descricao: 'Vivo como a natureza.', icone: '🌿', custo: 110, origem: 'loja', cor: '#22c55e' },
  { id: 'cor_por_do_sol', nome: 'Laranja Pôr-do-Sol', categoria: 'cor', raridade: 'raro', descricao: 'Quente e acolhedor.', icone: '🌅', custo: 190, origem: 'loja', cor: '#f97316' },
  { id: 'cor_galaxia', nome: 'Roxo Galáxia', categoria: 'cor', raridade: 'epico', descricao: 'Misterioso como o espaço.', icone: '🌌', custo: 320, origem: 'loja', cor: '#a855f7' },
  { id: 'cor_dourada', nome: 'Dourado Lendário', categoria: 'cor', raridade: 'lendario', descricao: 'A cor dos campeões.', icone: '🥇', custo: 0, origem: 'bau', cor: '#f59e0b' },

  // ---- COMPANHEIROS ----
  { id: 'comp_gatinho', nome: 'Gatinho', categoria: 'companheiro', raridade: 'comum', descricao: 'Um amigo peludo e fofo.', icone: '🐱', custo: 130, origem: 'loja' },
  { id: 'comp_cachorro', nome: 'Cachorrinho', categoria: 'companheiro', raridade: 'comum', descricao: 'Sempre leal e animado.', icone: '🐶', custo: 130, origem: 'loja' },
  { id: 'comp_coruja', nome: 'Coruja Sábia', categoria: 'companheiro', raridade: 'raro', descricao: 'Sabe todas as respostas.', icone: '🦉', custo: 220, origem: 'loja' },
  { id: 'comp_robo', nome: 'Robô Amigo', categoria: 'companheiro', raridade: 'raro', descricao: 'Beep boop! Vamos jogar!', icone: '🤖', custo: 220, origem: 'loja' },
  { id: 'comp_dragaozinho', nome: 'Dragãozinho', categoria: 'companheiro', raridade: 'epico', descricao: 'Pequeno mas cheio de fogo.', icone: '🐉', custo: 0, origem: 'bau' },
  { id: 'comp_unicornio', nome: 'Unicórnio Mágico', categoria: 'companheiro', raridade: 'lendario', descricao: 'O companheiro mais raro do mundo.', icone: '🦄', custo: 0, origem: 'bau' },
];

export function getColecionavel(id: string | null | undefined): Colecionavel | undefined {
  if (!id) return undefined;
  return COLECIONAVEIS.find((c) => c.id === id);
}

// Categorias que podem ser equipadas (loadout visual do Guardião)
export const CATEGORIAS_EQUIPAVEIS: string[] = ['chapeu', 'capacete', 'oculos', 'capa', 'asas', 'efeito', 'cor', 'companheiro'];

// ============================================================================
// BAÚS — probabilidades TRANSPARENTES (mostradas ao jogador)
// O tier do baú depende do desempenho na batalha (acertos).
// Nunca há mecânica de aposta: o jogador ganha sempre algo e vê as chances.
// ============================================================================

export const TIER_INFO: Record<TierBau, { nome: string; icone: string; cor: string }> = {
  comum: { nome: 'Baú Comum', icone: '📦', cor: '#94a3b8' },
  raro: { nome: 'Baú Raro', icone: '🧰', cor: '#38bdf8' },
  epico: { nome: 'Baú Épico', icone: '🎁', cor: '#c084fc' },
  lendario: { nome: 'Baú Lendário', icone: '💠', cor: '#fbbf24' },
};

// Probabilidade (%) de cada tier de baú consoante o nº de acertos (0-5).
// Cada linha soma 100.
export const ODDS_BAU_POR_ACERTOS: Record<number, Record<TierBau, number>> = {
  5: { comum: 25, raro: 45, epico: 22, lendario: 8 },
  4: { comum: 45, raro: 40, epico: 13, lendario: 2 },
  3: { comum: 65, raro: 30, epico: 5, lendario: 0 },
  2: { comum: 85, raro: 15, epico: 0, lendario: 0 },
  1: { comum: 95, raro: 5, epico: 0, lendario: 0 },
  0: { comum: 100, raro: 0, epico: 0, lendario: 0 },
};

// Moedas por tier [min, max]
export const MOEDAS_BAU: Record<TierBau, [number, number]> = {
  comum: [15, 30],
  raro: [30, 55],
  epico: [55, 85],
  lendario: [90, 130],
};

// Raridade do item que cada tier de baú tende a largar (probabilidades transparentes)
export const ODDS_ITEM_POR_TIER: Record<TierBau, Record<Raridade, number>> = {
  comum: { comum: 100, raro: 0, epico: 0, lendario: 0 },
  raro: { comum: 35, raro: 65, epico: 0, lendario: 0 },
  epico: { comum: 0, raro: 40, epico: 60, lendario: 0 },
  lendario: { comum: 0, raro: 0, epico: 45, lendario: 55 },
};

// Chance (%) de o baú conter um item de coleção (além das moedas garantidas)
export const CHANCE_ITEM_BAU: Record<TierBau, number> = {
  comum: 45,
  raro: 80,
  epico: 100,
  lendario: 100,
};
