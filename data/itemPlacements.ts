/**
 * Item Placements — Posicionamento de colecionáveis no Guardião
 *
 * Cada item tem placements específicas para LUMIS e TORRAK
 * porque possuem formas e proporções diferentes.
 *
 * Coordenadas: (0,0) = centro do Guardião
 * X positivo = direita; Y positivo = abaixo
 * Scale: 1 = tamanho original do emoji
 * zIndex: ordem de renderização (maior = à frente)
 */

import { ItemPlacement } from '@/types';

export const ITEM_PLACEMENTS: Record<string, { lumis?: ItemPlacement; torrak?: ItemPlacement }> = {
  // ===== CHAPÉUS =====
  chapeu_aventureiro: {
    lumis: { offsetX: 0, offsetY: -18, scale: 0.8, rotation: 0, zIndex: 40 },
    torrak: { offsetX: 0, offsetY: -16, scale: 0.85, rotation: 0, zIndex: 40 },
  },
  chapeu_festa: {
    lumis: { offsetX: 0, offsetY: -20, scale: 0.9, rotation: 0, zIndex: 40 },
    torrak: { offsetX: 0, offsetY: -18, scale: 0.95, rotation: 0, zIndex: 40 },
  },
  chapeu_mago: {
    lumis: { offsetX: 0, offsetY: -22, scale: 0.85, rotation: -5, zIndex: 40 },
    torrak: { offsetX: 0, offsetY: -20, scale: 0.9, rotation: -5, zIndex: 40 },
  },
  chapeu_coroa: {
    lumis: { offsetX: 0, offsetY: -21, scale: 0.8, rotation: 0, zIndex: 40 },
    torrak: { offsetX: 0, offsetY: -19, scale: 0.85, rotation: 0, zIndex: 40 },
  },

  // ===== CAPACETES =====
  capacete_bronze: {
    lumis: { offsetX: 0, offsetY: -16, scale: 0.9, rotation: 0, zIndex: 40 },
    torrak: { offsetX: 0, offsetY: -14, scale: 1.0, rotation: 0, zIndex: 40 },
  },
  capacete_guerreiro: {
    lumis: { offsetX: 0, offsetY: -18, scale: 0.95, rotation: 0, zIndex: 40 },
    torrak: { offsetX: 0, offsetY: -16, scale: 1.05, rotation: 0, zIndex: 40 },
  },
  capacete_diamante: {
    lumis: { offsetX: 0, offsetY: -17, scale: 0.92, rotation: 0, zIndex: 40 },
    torrak: { offsetX: 0, offsetY: -15, scale: 1.02, rotation: 0, zIndex: 40 },
  },

  // ===== ÓCULOS =====
  oculos_leitura: {
    lumis: { offsetX: 0, offsetY: -8, scale: 0.7, rotation: 0, zIndex: 35 },
    torrak: { offsetX: 0, offsetY: -6, scale: 0.75, rotation: 0, zIndex: 35 },
  },
  oculos_sol: {
    lumis: { offsetX: 0, offsetY: -9, scale: 0.75, rotation: 0, zIndex: 35 },
    torrak: { offsetX: 0, offsetY: -7, scale: 0.8, rotation: 0, zIndex: 35 },
  },
  oculos_vr: {
    lumis: { offsetX: 0, offsetY: -10, scale: 0.8, rotation: 0, zIndex: 35 },
    torrak: { offsetX: 0, offsetY: -8, scale: 0.85, rotation: 0, zIndex: 35 },
  },
  oculos_sabio: {
    lumis: { offsetX: -4, offsetY: -8, scale: 0.65, rotation: 0, zIndex: 35 },
    torrak: { offsetX: -2, offsetY: -6, scale: 0.7, rotation: 0, zIndex: 35 },
  },

  // ===== CAPAS (ficam atrás, zIndex baixo) =====
  capa_iniciante: {
    lumis: { offsetX: 0, offsetY: 8, scale: 1.0, rotation: 0, zIndex: 5 },
    torrak: { offsetX: 0, offsetY: 6, scale: 1.05, rotation: 0, zIndex: 5 },
  },
  capa_heroi: {
    lumis: { offsetX: 0, offsetY: 6, scale: 1.1, rotation: 0, zIndex: 5 },
    torrak: { offsetX: 0, offsetY: 4, scale: 1.15, rotation: 0, zIndex: 5 },
  },
  capa_estrelas: {
    lumis: { offsetX: 0, offsetY: 8, scale: 1.05, rotation: 0, zIndex: 5 },
    torrak: { offsetX: 0, offsetY: 6, scale: 1.1, rotation: 0, zIndex: 5 },
  },
  capa_lendaria: {
    lumis: { offsetX: 0, offsetY: 10, scale: 1.15, rotation: 0, zIndex: 5 },
    torrak: { offsetX: 0, offsetY: 8, scale: 1.2, rotation: 0, zIndex: 5 },
  },

  // ===== ASAS (ficam atrás, zIndex baixo) =====
  asas_borboleta: {
    lumis: { offsetX: 0, offsetY: -5, scale: 1.2, rotation: 0, zIndex: 6 },
    torrak: { offsetX: 0, offsetY: -3, scale: 1.25, rotation: 0, zIndex: 6 },
  },
  asas_anjo: {
    lumis: { offsetX: 0, offsetY: -8, scale: 1.3, rotation: 0, zIndex: 6 },
    torrak: { offsetX: 0, offsetY: -6, scale: 1.35, rotation: 0, zIndex: 6 },
  },
  asas_dragao: {
    lumis: { offsetX: 0, offsetY: 0, scale: 1.25, rotation: 0, zIndex: 6 },
    torrak: { offsetX: 0, offsetY: 2, scale: 1.3, rotation: 0, zIndex: 6 },
  },
  asas_fenix: {
    lumis: { offsetX: 0, offsetY: -10, scale: 1.4, rotation: 0, zIndex: 6 },
    torrak: { offsetX: 0, offsetY: -8, scale: 1.45, rotation: 0, zIndex: 6 },
  },

  // ===== EFEITOS (flutuam à volta, zIndex médio) =====
  efeito_estrelas: {
    lumis: { offsetX: 0, offsetY: 0, scale: 1.2, rotation: 0, zIndex: 20 },
    torrak: { offsetX: 0, offsetY: 0, scale: 1.25, rotation: 0, zIndex: 20 },
  },
  efeito_fogo: {
    lumis: { offsetX: 0, offsetY: 2, scale: 1.1, rotation: 0, zIndex: 20 },
    torrak: { offsetX: 0, offsetY: 4, scale: 1.15, rotation: 0, zIndex: 20 },
  },
  efeito_gelo: {
    lumis: { offsetX: 0, offsetY: 2, scale: 1.1, rotation: 0, zIndex: 20 },
    torrak: { offsetX: 0, offsetY: 4, scale: 1.15, rotation: 0, zIndex: 20 },
  },
  efeito_relampago: {
    lumis: { offsetX: 0, offsetY: 0, scale: 1.15, rotation: 0, zIndex: 20 },
    torrak: { offsetX: 0, offsetY: 2, scale: 1.2, rotation: 0, zIndex: 20 },
  },
  efeito_arcoiris: {
    lumis: { offsetX: 0, offsetY: -5, scale: 1.3, rotation: 0, zIndex: 20 },
    torrak: { offsetX: 0, offsetY: -3, scale: 1.35, rotation: 0, zIndex: 20 },
  },

  // ===== CORES (não têm placement, afetam tint do Guardião) =====
  cor_original: {},
  cor_oceano: {},
  cor_floresta: {},
  cor_por_do_sol: {},
  cor_galaxia: {},
  cor_dourada: {},

  // ===== COMPANHEIROS (ao lado, sem cobrir o Guardião) =====
  comp_gatinho: {
    lumis: { offsetX: 35, offsetY: 10, scale: 0.85, rotation: 0, zIndex: 25 },
    torrak: { offsetX: 38, offsetY: 8, scale: 0.9, rotation: 0, zIndex: 25 },
  },
  comp_cachorro: {
    lumis: { offsetX: 35, offsetY: 15, scale: 0.9, rotation: 0, zIndex: 25 },
    torrak: { offsetX: 38, offsetY: 12, scale: 0.95, rotation: 0, zIndex: 25 },
  },
  comp_coruja: {
    lumis: { offsetX: 38, offsetY: -10, scale: 0.8, rotation: 10, zIndex: 30 },
    torrak: { offsetX: 40, offsetY: -8, scale: 0.85, rotation: 10, zIndex: 30 },
  },
  comp_robo: {
    lumis: { offsetX: 40, offsetY: 5, scale: 0.85, rotation: 0, zIndex: 25 },
    torrak: { offsetX: 42, offsetY: 3, scale: 0.9, rotation: 0, zIndex: 25 },
  },
  comp_dragaozinho: {
    lumis: { offsetX: -35, offsetY: 0, scale: 0.9, rotation: -15, zIndex: 25 },
    torrak: { offsetX: -38, offsetY: -2, scale: 0.95, rotation: -15, zIndex: 25 },
  },
  comp_unicornio: {
    lumis: { offsetX: 36, offsetY: -5, scale: 0.95, rotation: 5, zIndex: 30 },
    torrak: { offsetX: 39, offsetY: -7, scale: 1.0, rotation: 5, zIndex: 30 },
  },
};

/**
 * Obter placement de um item para um Guardião específico
 */
export function getItemPlacement(
  itemId: string,
  guardianType: 'LUMIS' | 'TORRAK'
): ItemPlacement | undefined {
  const placements = ITEM_PLACEMENTS[itemId];
  if (!placements) return undefined;

  return guardianType === 'LUMIS' ? placements.lumis : placements.torrak;
}

/**
 * Validar se item está bem alinhado (teste de desenvolvimento)
 */
export function validateItemPlacement(itemId: string): boolean {
  const placement = ITEM_PLACEMENTS[itemId];
  if (!placement) return false;

  const validateSinglePlacement = (p?: ItemPlacement) => {
    if (!p) return true;
    return (
      typeof p.offsetX === 'number' &&
      typeof p.offsetY === 'number' &&
      typeof p.scale === 'number' &&
      typeof p.rotation === 'number' &&
      typeof p.zIndex === 'number' &&
      p.scale > 0 &&
      p.zIndex >= 0 &&
      p.zIndex <= 100
    );
  };

  return validateSinglePlacement(placement.lumis) && validateSinglePlacement(placement.torrak);
}
