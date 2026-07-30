import { Perfil, DropBau, TierBau, Raridade } from '@/types';
import {
  COLECIONAVEIS,
  ODDS_BAU_POR_ACERTOS,
  ODDS_ITEM_POR_TIER,
  MOEDAS_BAU,
  CHANCE_ITEM_BAU,
} from '@/data/collection';

function escolherPorPeso<T extends string>(odds: Record<T, number>): T {
  const total = Object.values(odds).reduce((a: number, b: any) => a + (b as number), 0);
  let r = Math.random() * total;
  for (const [k, v] of Object.entries(odds)) {
    r -= v as number;
    if (r <= 0) return k as T;
  }
  // fallback: primeira chave com peso > 0
  const first = (Object.entries(odds).find(([, v]) => (v as number) > 0)?.[0]) as T;
  return first ?? (Object.keys(odds)[0] as T);
}

function rand(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

// Escolhe o tier do baú consoante o desempenho (acertos 0-5)
export function escolherTierBau(acertos: number): TierBau {
  const linha = ODDS_BAU_POR_ACERTOS[Math.max(0, Math.min(5, acertos))] ?? ODDS_BAU_POR_ACERTOS[0];
  return escolherPorPeso<TierBau>(linha as Record<TierBau, number>);
}

// Sorteia um item colecionável (ainda não possuído) para o tier dado.
function sortearItem(tier: TierBau, possuidos: Set<string>): string | null {
  const raridadeAlvo = escolherPorPeso<Raridade>(ODDS_ITEM_POR_TIER[tier]);
  // ordem de fallback: raridade alvo -> descendente
  const ordem: Raridade[] = ['lendario', 'epico', 'raro', 'comum'];
  const candidatasOrdenadas = [raridadeAlvo, ...ordem.filter((r) => r !== raridadeAlvo)];
  for (const rar of candidatasOrdenadas) {
    const pool = COLECIONAVEIS.filter(
      (c) => c.raridade === rar && c.categoria !== 'medalha' && c.categoria !== 'trofeu' && !possuidos.has(c.id)
    );
    if (pool.length > 0) {
      const escolhido = pool[Math.floor(Math.random() * pool.length)];
      return escolhido?.id ?? null;
    }
  }
  return null;
}

// Gera o conteúdo de um baú. Nunca vazio: dá sempre moedas.
export function gerarBau(acertos: number, perfil: Perfil): DropBau {
  const tier = escolherTierBau(acertos);
  const [minM, maxM] = MOEDAS_BAU[tier];
  let moedas = rand(minM, maxM);
  const possuidos = new Set([...(perfil.colecao ?? [])]);
  const itens: string[] = [];

  const chance = CHANCE_ITEM_BAU[tier];
  if (Math.random() * 100 < chance) {
    const item = sortearItem(tier, possuidos);
    if (item) {
      itens.push(item);
    } else {
      // coleção completa para este tier -> compensa com moedas extra
      moedas += 25;
    }
  }

  return { tier, moedas, itens };
}
