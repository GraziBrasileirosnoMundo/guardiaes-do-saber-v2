/**
 * Itens para comprar e decorar a Casa do Guardião
 * Cada item tem: nome, preço, emoji, categoria, descrição
 */

export interface HouseItem {
  id: string;
  nome: string;
  categoria: 'moveis' | 'decoracao' | 'luz' | 'plantas' | 'arte' | 'brinquedos';
  emoji: string;
  preco: number;
  descricao: string;
  corGradient: string; // Para quando comprado (cor brilhante)
}

export const HOUSE_ITEMS: HouseItem[] = [
  // === MÓVEIS ===
  {
    id: 'cama-vermelha',
    nome: 'Cama Confortável',
    categoria: 'moveis',
    emoji: '🛏️',
    preco: 800,
    descricao: 'Uma cama super confortável para descansar',
    corGradient: 'from-red-400 to-red-600',
  },
  {
    id: 'sofa-azul',
    nome: 'Sofá Aconchego',
    categoria: 'moveis',
    emoji: '🛋️',
    preco: 1200,
    descricao: 'Um sofá macio para relaxar',
    corGradient: 'from-blue-400 to-blue-600',
  },
  {
    id: 'mesa-madeira',
    nome: 'Mesa de Trabalho',
    categoria: 'moveis',
    emoji: '🪑',
    preco: 600,
    descricao: 'Perfeita para estudar e fazer lições',
    corGradient: 'from-amber-400 to-yellow-600',
  },
  {
    id: 'estante-livros',
    nome: 'Estante de Livros',
    categoria: 'moveis',
    emoji: '📚',
    preco: 1500,
    descricao: 'Guarda todos os teus livros especiais',
    corGradient: 'from-purple-400 to-purple-600',
  },
  {
    id: 'armario-roupa',
    nome: 'Guarda-Roupa',
    categoria: 'moveis',
    emoji: '🚪',
    preco: 1800,
    descricao: 'Organiza toda a tua roupa em um só lugar',
    corGradient: 'from-pink-400 to-pink-600',
  },

  // === DECORAÇÃO ===
  {
    id: 'tapete-redondo',
    nome: 'Tapete Fofinho',
    categoria: 'decoracao',
    emoji: '🟤',
    preco: 400,
    descricao: 'Um tapete macio e colorido',
    corGradient: 'from-orange-400 to-orange-600',
  },
  {
    id: 'cortina-roxa',
    nome: 'Cortina Encantada',
    categoria: 'decoracao',
    emoji: '🪟',
    preco: 700,
    descricao: 'Cortina com cores mágicas',
    corGradient: 'from-purple-400 to-indigo-600',
  },
  {
    id: 'almofada-fofa',
    nome: 'Almofada Conforto',
    categoria: 'decoracao',
    emoji: '🎀',
    preco: 300,
    descricao: 'Almofadas coloridas e super fofas',
    corGradient: 'from-pink-400 to-rose-600',
  },
  {
    id: 'tapete-galaxy',
    nome: 'Tapete Galáxia',
    categoria: 'decoracao',
    emoji: '🌌',
    preco: 950,
    descricao: 'Tapete com estampa do universo',
    corGradient: 'from-indigo-400 to-blue-600',
  },

  // === LUZ ===
  {
    id: 'lampada-mesa',
    nome: 'Lâmpada de Mesa',
    categoria: 'luz',
    emoji: '💡',
    preco: 600,
    descricao: 'Ilumina o teu espaço de trabalho',
    corGradient: 'from-yellow-300 to-yellow-600',
  },
  {
    id: 'luz-neon',
    nome: 'Luz Neon Rosa',
    categoria: 'luz',
    emoji: '🌟',
    preco: 1200,
    descricao: 'Decoração com luz neon brilhante',
    corGradient: 'from-pink-400 to-purple-600',
  },
  {
    id: 'led-rgb',
    nome: 'Fita LED Colorida',
    categoria: 'luz',
    emoji: '✨',
    preco: 1500,
    descricao: 'Fita LED que muda de cores',
    corGradient: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'vela-aromatica',
    nome: 'Vela Aromática',
    categoria: 'luz',
    emoji: '🕯️',
    preco: 400,
    descricao: 'Vela que ilumina e perfuma',
    corGradient: 'from-orange-400 to-red-600',
  },

  // === PLANTAS ===
  {
    id: 'planta-verde',
    nome: 'Planta Suculenta',
    categoria: 'plantas',
    emoji: '🌿',
    preco: 500,
    descricao: 'Uma planta verde para trazer vida',
    corGradient: 'from-green-400 to-green-600',
  },
  {
    id: 'vaso-flores',
    nome: 'Vaso de Flores',
    categoria: 'plantas',
    emoji: '🌸',
    preco: 700,
    descricao: 'Vaso com flores coloridas',
    corGradient: 'from-pink-400 to-red-600',
  },
  {
    id: 'arvore-pequena',
    nome: 'Árvore Decorativa',
    categoria: 'plantas',
    emoji: '🌳',
    preco: 1100,
    descricao: 'Uma árvore pequena e linda',
    corGradient: 'from-green-500 to-emerald-600',
  },
  {
    id: 'cacto-fofo',
    nome: 'Cacto Carinhoso',
    categoria: 'plantas',
    emoji: '🌵',
    preco: 600,
    descricao: 'Um cacto que quase não precisa de água',
    corGradient: 'from-green-400 to-lime-600',
  },

  // === ARTE ===
  {
    id: 'quadro-arte',
    nome: 'Quadro de Arte',
    categoria: 'arte',
    emoji: '🖼️',
    preco: 850,
    descricao: 'Um quadro com arte legal',
    corGradient: 'from-purple-400 to-pink-600',
  },
  {
    id: 'poster-heroi',
    nome: 'Poster Herói',
    categoria: 'arte',
    emoji: '🦸',
    preco: 500,
    descricao: 'Poster do teu herói favorito',
    corGradient: 'from-blue-400 to-cyan-600',
  },
  {
    id: 'espelho-redondo',
    nome: 'Espelho Decorativo',
    categoria: 'arte',
    emoji: '🪞',
    preco: 700,
    descricao: 'Espelho com moldura linda',
    corGradient: 'from-gray-400 to-gray-600',
  },

  // === BRINQUEDOS ===
  {
    id: 'guitarra-toy',
    nome: 'Guitarra de Brinquedo',
    categoria: 'brinquedos',
    emoji: '🎸',
    preco: 950,
    descricao: 'Uma guitarra colorida para tocar',
    corGradient: 'from-orange-400 to-red-600',
  },
  {
    id: 'bola-futebol',
    nome: 'Bola de Futebol',
    categoria: 'brinquedos',
    emoji: '⚽',
    preco: 600,
    descricao: 'Bola para jogar e se divertir',
    corGradient: 'from-black to-gray-600',
  },
  {
    id: 'console-retro',
    nome: 'Console Retro',
    categoria: 'brinquedos',
    emoji: '🕹️',
    preco: 1800,
    descricao: 'Um console clássico para diversão',
    corGradient: 'from-red-400 to-red-600',
  },
  {
    id: 'boneco-heroi',
    nome: 'Boneco Ação',
    categoria: 'brinquedos',
    emoji: '🦾',
    preco: 700,
    descricao: 'Boneco articulado do teu super-herói',
    corGradient: 'from-yellow-400 to-orange-600',
  },
];

/**
 * Agrupa itens por categoria
 */
export function agruparItensPorCategoria() {
  return HOUSE_ITEMS.reduce(
    (acc, item) => {
      if (!acc[item.categoria]) acc[item.categoria] = [];
      acc[item.categoria].push(item);
      return acc;
    },
    {} as Record<string, HouseItem[]>
  );
}

/**
 * Calcula progresso total da casa
 */
export function calcularProgressoCasa(itensComprados: string[]): number {
  const percentual = (itensComprados.length / HOUSE_ITEMS.length) * 100;
  return Math.min(percentual, 100);
}
