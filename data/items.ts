import { ItemLoja } from '@/types';

export const ACESSORIOS: ItemLoja[] = [
  { id: 'chapeu_aventureiro', nome: 'Chapéu de Aventureiro', tipo: 'acessorio', descricao: 'Um chapéu mágico que brilha na escuridão', custo: 0 },
  { id: 'capa_brilhante', nome: 'Capa Brilhante', tipo: 'acessorio', descricao: 'Uma capa que emite uma luz suave', custo: 100 },
  { id: 'escudo_cristal', nome: 'Escudo de Cristal', tipo: 'acessorio', descricao: 'Um escudo feito de cristal puro', custo: 200 },
];

export const PECAS_BASE: ItemLoja[] = [
  { id: 'torre_vigia', nome: 'Torre de Vigia', tipo: 'peca_base', descricao: 'Uma torre alta para observar os arredores', custo: 150 },
  { id: 'jardim_magico', nome: 'Jardim Mágico', tipo: 'peca_base', descricao: 'Um jardim com plantas que brilham', custo: 120 },
  { id: 'portao_antigo', nome: 'Portão Antigo', tipo: 'peca_base', descricao: 'Um portão de pedra com runas', custo: 180 },
];

export const APARENCIAS: ItemLoja[] = [
  { id: 'lumis_normal', nome: 'Lumis Normal', tipo: 'aparencia', descricao: 'A aparência original de Lumis', custo: 0 },
  { id: 'lumis_dourado', nome: 'Lumis Dourado', tipo: 'aparencia', descricao: 'Lumis brilha com uma aura dourada', custo: 300 },
  { id: 'torrak_normal', nome: 'Torrak Normal', tipo: 'aparencia', descricao: 'A aparência original de Torrak', custo: 0 },
  { id: 'torrak_cristalino', nome: 'Torrak Cristalino', tipo: 'aparencia', descricao: 'Torrak com cristais luminosos', custo: 300 },
];

export const EFEITOS: ItemLoja[] = [
  { id: 'particulas_estrela', nome: 'Partículas Estelares', tipo: 'efeito', descricao: 'Estrelas à volta do Guardião', custo: 250 },
  { id: 'aura_fogo', nome: 'Aura de Fogo', tipo: 'efeito', descricao: 'Chamas suaves rodeiam o Guardião', custo: 250 },
];

export const TODOS_ITEMS: ItemLoja[] = [...ACESSORIOS, ...PECAS_BASE, ...APARENCIAS, ...EFEITOS];

export const MONSTROS = ['NEBLUS', 'GROGMAR', 'VOLTIX'] as const;
export type MonstroTipo = typeof MONSTROS[number];

export const MONSTRO_NOMES: Record<string, string> = {
  NEBLUS: 'Neblus',
  GROGMAR: 'Grogmar',
  VOLTIX: 'Voltix',
};

export const NIVEIS = [
  { nivel: 1, xpMin: 0, xpMax: 100 },
  { nivel: 2, xpMin: 101, xpMax: 250 },
  { nivel: 3, xpMin: 251, xpMax: 500 },
  { nivel: 4, xpMin: 501, xpMax: 900 },
  { nivel: 5, xpMin: 901, xpMax: 9999 },
];

export const PORTAL_ETAPAS = [
  { etapa: 1, nome: 'Terreno', min: 0, max: 20 },
  { etapa: 2, nome: 'Base', min: 21, max: 40 },
  { etapa: 3, nome: 'Estrutura', min: 41, max: 60 },
  { etapa: 4, nome: 'Energia', min: 61, max: 80 },
  { etapa: 5, nome: 'Portal Completo', min: 81, max: 100 },
];
