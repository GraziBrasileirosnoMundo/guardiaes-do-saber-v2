import { Perfil, MissaoEstado } from '@/types';
import { MISSOES_DIARIAS, MISSOES_SEMANAIS, MISSOES_MENSAIS, MissaoTemplate } from '@/data/missions';

// ---- Chaves de período ----
export function periodKeyDia(d: Date = new Date()): string {
  return d.toISOString().split('T')[0] ?? '';
}

export function periodKeySemana(d: Date = new Date()): string {
  // Semana ISO simplificada: ano + número da semana
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = (date.getUTCDay() + 6) % 7; // segunda = 0
  date.setUTCDate(date.getUTCDate() - dayNum + 3);
  const firstThursday = new Date(Date.UTC(date.getUTCFullYear(), 0, 4));
  const week = 1 + Math.round(
    ((date.getTime() - firstThursday.getTime()) / 86400000 - 3 + ((firstThursday.getUTCDay() + 6) % 7)) / 7
  );
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, '0')}`;
}

export function periodKeyMes(d: Date = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

// Escolhe deterministicamente um template do pool para a chave de período dada.
function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function escolherTemplate(pool: MissaoTemplate[], periodKey: string): MissaoTemplate {
  const idx = hashString(periodKey) % pool.length;
  return pool[idx] ?? pool[0];
}

function criarMissao(pool: MissaoTemplate[], periodKey: string): MissaoEstado {
  const t = escolherTemplate(pool, periodKey);
  return {
    id: t.id,
    descricao: t.descricao,
    metrica: t.metrica,
    meta: t.meta,
    progresso: 0,
    periodoKey: periodKey,
    recompensaMoedas: t.recompensaMoedas,
    recompensaItem: t.recompensaItem ?? null,
    recompensada: false,
  };
}

// Garante que o perfil tem as 3 missões do período atual (regenera se mudou o período).
export function garantirMissoes(perfil: Perfil): Perfil {
  const p = { ...perfil };
  const kDia = periodKeyDia();
  const kSem = periodKeySemana();
  const kMes = periodKeyMes();
  if (!p.missaoDiaria || p.missaoDiaria.periodoKey !== kDia) {
    p.missaoDiaria = criarMissao(MISSOES_DIARIAS, kDia);
  }
  if (!p.missaoSemanal || p.missaoSemanal.periodoKey !== kSem) {
    p.missaoSemanal = criarMissao(MISSOES_SEMANAIS, kSem);
  }
  if (!p.missaoMensal || p.missaoMensal.periodoKey !== kMes) {
    p.missaoMensal = criarMissao(MISSOES_MENSAIS, kMes);
  }
  return p;
}

export interface DeltasMissao {
  batalhas?: number;
  acertos?: number;
  perguntas?: number;
  vitorias_perfeitas?: number;
  itens?: number;
  comboMax?: number;
}

function aplicarNumaMissao(m: MissaoEstado | null | undefined, d: DeltasMissao): { missao: MissaoEstado | null; concluiuAgora: boolean } {
  if (!m) return { missao: m ?? null, concluiuAgora: false };
  const antesConcluida = m.progresso >= m.meta;
  let progresso = m.progresso;
  switch (m.metrica) {
    case 'batalhas': progresso += d.batalhas ?? 0; break;
    case 'acertos': progresso += d.acertos ?? 0; break;
    case 'perguntas': progresso += d.perguntas ?? 0; break;
    case 'vitorias_perfeitas': progresso += d.vitorias_perfeitas ?? 0; break;
    case 'itens': progresso += d.itens ?? 0; break;
    case 'combo': progresso = Math.max(progresso, d.comboMax ?? 0); break;
  }
  progresso = Math.min(progresso, m.meta);
  const novo = { ...m, progresso };
  const concluiuAgora = !antesConcluida && progresso >= m.meta;
  return { missao: novo, concluiuAgora };
}

// Aplica progresso a todas as missões. Devolve perfil atualizado + lista das concluídas agora.
export function aplicarProgressoMissoes(perfil: Perfil, d: DeltasMissao): { perfil: Perfil; concluidas: MissaoEstado[] } {
  const p = garantirMissoes(perfil);
  const concluidas: MissaoEstado[] = [];
  const rD = aplicarNumaMissao(p.missaoDiaria, d);
  const rS = aplicarNumaMissao(p.missaoSemanal, d);
  const rM = aplicarNumaMissao(p.missaoMensal, d);
  p.missaoDiaria = rD.missao;
  p.missaoSemanal = rS.missao;
  p.missaoMensal = rM.missao;
  if (rD.concluiuAgora && rD.missao) concluidas.push(rD.missao);
  if (rS.concluiuAgora && rS.missao) concluidas.push(rS.missao);
  if (rM.concluiuAgora && rM.missao) concluidas.push(rM.missao);
  return { perfil: p, concluidas };
}

export type TipoMissao = 'diaria' | 'semanal' | 'mensal';

export function getMissao(perfil: Perfil, tipo: TipoMissao): MissaoEstado | null {
  if (tipo === 'diaria') return perfil.missaoDiaria ?? null;
  if (tipo === 'semanal') return perfil.missaoSemanal ?? null;
  return perfil.missaoMensal ?? null;
}

export function missaoConcluida(m: MissaoEstado | null | undefined): boolean {
  return !!m && m.progresso >= m.meta;
}

export function podeReclamar(m: MissaoEstado | null | undefined): boolean {
  return missaoConcluida(m) && !!m && !m.recompensada;
}

// Reclama a recompensa de uma missão (moedas + item opcional). Devolve perfil atualizado.
export function reclamarMissao(perfil: Perfil, tipo: TipoMissao): { perfil: Perfil; recompensa: { moedas: number; item: string | null } | null } {
  const p = { ...perfil };
  const m = getMissao(p, tipo);
  if (!podeReclamar(m) || !m) return { perfil: p, recompensa: null };
  const atualizada = { ...m, recompensada: true };
  if (tipo === 'diaria') p.missaoDiaria = atualizada;
  else if (tipo === 'semanal') p.missaoSemanal = atualizada;
  else p.missaoMensal = atualizada;
  p.moedas = (p.moedas ?? 0) + (m.recompensaMoedas ?? 0);
  let item: string | null = null;
  if (m.recompensaItem) {
    item = m.recompensaItem;
    p.colecao = Array.from(new Set([...(p.colecao ?? []), m.recompensaItem]));
  }
  return { perfil: p, recompensa: { moedas: m.recompensaMoedas ?? 0, item } };
}
