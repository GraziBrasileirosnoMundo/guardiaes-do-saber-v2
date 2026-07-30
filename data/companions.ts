/**
 * Sistema de Companheiros/Amigos que podem ser libertados
 * Cada amigo invitado = 1 companheiro novo na casa!
 */

export interface Companion {
  id: string;
  nome: string;
  tipo: 'animal' | 'criatura' | 'mágico';
  emoji: string;
  cor: string;
  preco: number; // Moedas para libertar
  descricao: string;
  eFeliz: boolean; // Se completou quests
}

export const COMPANIONS: Companion[] = [
  {
    id: 'gato-preguicoso',
    nome: 'Miau (Gato)',
    tipo: 'animal',
    emoji: '😼',
    cor: '#F59E0B',
    preco: 500,
    descricao: 'Um gato preguiçoso que dorme o dia todo',
    eFeliz: false,
  },
  {
    id: 'cachorro-feliz',
    nome: 'Rex (Cachorro)',
    tipo: 'animal',
    emoji: '🐕',
    cor: '#8B4513',
    preco: 600,
    descricao: 'Um cachorro energético e brincalhão',
    eFeliz: false,
  },
  {
    id: 'coruja-sabio',
    nome: 'Atena (Coruja)',
    tipo: 'animal',
    emoji: '🦉',
    cor: '#6366F1',
    preco: 700,
    descricao: 'Uma coruja sábia que traz sorte nos estudos',
    eFeliz: false,
  },
  {
    id: 'coelho-energetico',
    nome: 'Cenoura (Coelho)',
    tipo: 'animal',
    emoji: '🐰',
    cor: '#EC4899',
    preco: 550,
    descricao: 'Um coelho super energético e rápido',
    eFeliz: false,
  },
  {
    id: 'dragaozinho',
    nome: 'Fuego (Dragão)',
    tipo: 'mágico',
    emoji: '🐉',
    cor: '#DC2626',
    preco: 1200,
    descricao: 'Um pequeno dragão protetor do teu quarto',
    eFeliz: false,
  },
  {
    id: 'unicornio-magico',
    nome: 'Luna (Unicórnio)',
    tipo: 'mágico',
    emoji: '🦄',
    cor: '#A78BFA',
    preco: 1500,
    descricao: 'Um unicórnio mágico que traz boas energias',
    eFeliz: false,
  },
  {
    id: 'fenix-lendaria',
    nome: 'Phoenix (Fênix)',
    tipo: 'mágico',
    emoji: '🔥',
    cor: '#FCA5A5',
    preco: 2000,
    descricao: 'Uma fênix lendária do fogo e renascimento',
    eFeliz: true,
  },
  {
    id: 'robo-amigo',
    nome: 'Beep (Robô)',
    tipo: 'criatura',
    emoji: '🤖',
    cor: '#6B7280',
    preco: 800,
    descricao: 'Um robô amigo que te ajuda nos desafios',
    eFeliz: false,
  },
  {
    id: 'elfo-floresta',
    nome: 'Silvio (Elfo)',
    tipo: 'criatura',
    emoji: '🧝',
    cor: '#10B981',
    preco: 1100,
    descricao: 'Um elfo misterioso da floresta encantada',
    eFeliz: false,
  },
  {
    id: 'espírito-luz',
    nome: 'Orb (Espírito)',
    tipo: 'mágico',
    emoji: '✨',
    cor: '#FBBF24',
    preco: 1800,
    descricao: 'Um espírito brilhante de luz pura',
    eFeliz: true,
  },
];

/**
 * Companheiros libertáveis por amigo invitado
 */
export function getCompanheirosPorAmigos(numAmigos: number): Companion[] {
  return COMPANIONS.slice(0, Math.min(numAmigos, COMPANIONS.length));
}

/**
 * Calcula preço total para libertar todos
 */
export function calcularPrecoTotalCompanheiros(numAmigos: number): number {
  return getCompanheirosPorAmigos(numAmigos).reduce((sum, c) => sum + c.preco, 0);
}
