import { Perfil, RecompensaBau } from '@/types';
import { NIVEIS, PORTAL_ETAPAS } from '@/data/items';

const PORTAL_INCREMENTO = 4; // % por batalha

// Quanto falta (em XP) para o próximo nível. Retorna null se estiver no nível máximo.
export function xpFaltaProximoNivel(xp: number): { falta: number; proximoNivel: number | null } {
  const nivelAtual = calcularNivel(xp);
  const proximo = NIVEIS?.find((n: any) => n?.nivel === nivelAtual + 1);
  if (!proximo) return { falta: 0, proximoNivel: null };
  return { falta: Math.max(0, (proximo?.xpMin ?? 0) - xp), proximoNivel: proximo?.nivel ?? null };
}

// Etapa atual do Portal (1-5), consistente com avancarPortal.
export function etapaAtualPortal(progresso: number): number {
  const p = Math.min(100, Math.max(0, progresso ?? 0));
  if (p <= 20) return 1;
  if (p <= 40) return 2;
  if (p <= 60) return 3;
  if (p <= 80) return 4;
  return 5;
}

// Quantas batalhas faltam para atingir a próxima etapa do Portal.
export function batalhasParaProximaEtapa(progresso: number): { batalhas: number; proximaEtapa: string | null } {
  const p = Math.min(100, Math.max(0, progresso ?? 0));
  const cur = etapaAtualPortal(p);
  if (cur >= 5) return { batalhas: 0, proximaEtapa: null };
  // A etapa (cur+1) surge pela primeira vez quando o progresso atinge cur*20 + incremento.
  const alvo = cur * 20 + PORTAL_INCREMENTO;
  const batalhas = Math.max(1, Math.ceil((alvo - p) / PORTAL_INCREMENTO));
  const etapaAlvo = PORTAL_ETAPAS?.find((e: any) => (e?.etapa ?? 0) === cur + 1);
  return { batalhas, proximaEtapa: etapaAlvo?.nome ?? null };
}

// Progresso (0-100) dentro da etapa atual do Portal.
export function progressoDentroEtapa(progresso: number): number {
  const p = Math.min(100, Math.max(0, progresso ?? 0));
  const cur = etapaAtualPortal(p);
  const base = (cur - 1) * 20;
  const dentro = ((p - base) / 20) * 100;
  return Math.min(100, Math.max(0, dentro));
}

export function calcularNivel(xp: number): number {
  for (let i = (NIVEIS?.length ?? 0) - 1; i >= 0; i--) {
    if (xp >= (NIVEIS?.[i]?.xpMin ?? 0)) return NIVEIS?.[i]?.nivel ?? 1;
  }
  return 1;
}

export function xpParaProximoNivel(xp: number): { atual: number; proximo: number; progresso: number } {
  const nivelAtual = calcularNivel(xp);
  const nivelInfo = NIVEIS?.find((n: any) => n?.nivel === nivelAtual);
  const proximoNivel = NIVEIS?.find((n: any) => n?.nivel === nivelAtual + 1);
  const min = nivelInfo?.xpMin ?? 0;
  const max = proximoNivel ? (proximoNivel?.xpMin ?? 0) - 1 : (nivelInfo?.xpMax ?? 9999);
  const progresso = max > min ? ((xp - min) / (max - min)) * 100 : 100;
  return { atual: min, proximo: max, progresso: Math.min(100, Math.max(0, progresso)) };
}

export function calcularMoedasPergunta(correta: boolean, sequenciaAcertos: number): number {
  if (!correta) return 0;
  let moedas = 10;
  if (sequenciaAcertos >= 3 && sequenciaAcertos % 3 === 0) moedas += 15;
  return moedas;
}

export function calcularXpPergunta(correta: boolean): number {
  return correta ? 5 : 0;
}

export function calcularXpBatalha(): number {
  return 10;
}

export function atualizarStreak(perfil: Perfil): Perfil {
  const hoje = new Date().toISOString().split('T')[0] ?? '';
  const ultimoJogo = perfil?.ultimoJogo?.split('T')?.[0] ?? '';
  if (hoje === ultimoJogo) return perfil;
  const ontem = new Date(Date.now() - 86400000).toISOString().split('T')[0] ?? '';
  const novoStreak = ultimoJogo === ontem ? (perfil?.streak ?? 0) + 1 : 1;
  return { ...(perfil ?? {}), streak: novoStreak, ultimoJogo: new Date().toISOString() } as Perfil;
}

export function avancarPortal(perfil: Perfil): Perfil {
  const progresso = Math.min(100, (perfil?.portalProgress ?? 0) + 4);
  const etapa = progresso <= 20 ? 1 : progresso <= 40 ? 2 : progresso <= 60 ? 3 : progresso <= 80 ? 4 : 5;
  return { ...(perfil ?? {}), portalProgress: progresso, portalEtapa: etapa } as Perfil;
}

export function gerarRecompensaBau(perfil: Perfil): RecompensaBau {
  const moedas = 20 + Math.floor(Math.random() * 31);
  const recompensa: RecompensaBau = { moedas };
  const todosAcessorios = ['chapeu_aventureiro', 'capa_brilhante', 'escudo_cristal'];
  const todasPecas = ['torre_vigia', 'jardim_magico', 'portao_antigo'];
  const todosEfeitos = ['particulas_estrela', 'aura_fogo'];
  const desbloqueados = perfil?.itensDesbloqueados ?? [];
  const acessoriosPorDesbloquear = todosAcessorios?.filter((a: string) => !desbloqueados?.includes(a)) ?? [];
  const pecasPorDesbloquear = todasPecas?.filter((a: string) => !desbloqueados?.includes(a)) ?? [];
  const efeitosPorDesbloquear = todosEfeitos?.filter((a: string) => !desbloqueados?.includes(a)) ?? [];
  const roll = Math.random();
  if (roll < 0.3 && acessoriosPorDesbloquear?.length > 0) {
    recompensa.acessorio = acessoriosPorDesbloquear[Math.floor(Math.random() * acessoriosPorDesbloquear.length)];
  } else if (roll < 0.6 && pecasPorDesbloquear?.length > 0) {
    recompensa.pecaBase = pecasPorDesbloquear[Math.floor(Math.random() * pecasPorDesbloquear.length)];
  } else if (roll < 0.8 && efeitosPorDesbloquear?.length > 0) {
    recompensa.efeitoVisual = efeitosPorDesbloquear[Math.floor(Math.random() * efeitosPorDesbloquear.length)];
  }
  return recompensa;
}
