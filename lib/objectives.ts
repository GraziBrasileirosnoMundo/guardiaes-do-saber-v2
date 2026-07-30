import { Perfil } from '@/types';
import { xpFaltaProximoNivel } from '@/lib/gameLogic';
import { mundoProgresso } from '@/data/world';
import { podeReclamar } from '@/lib/missions';

export interface ObjetivoProximo {
  icone: string;
  texto: string;
  tipo: 'missao' | 'nivel' | 'mundo' | 'colecao';
}

// Devolve os objetivos mais próximos para alimentar o gancho "só mais uma partida".
export function proximosObjetivos(perfil: Perfil | null): ObjetivoProximo[] {
  if (!perfil) return [];
  const out: ObjetivoProximo[] = [];

  // Missão reclamável tem prioridade
  if (podeReclamar(perfil.missaoDiaria) || podeReclamar(perfil.missaoSemanal) || podeReclamar(perfil.missaoMensal)) {
    out.push({ icone: '🎁', texto: 'Tens uma recompensa de missão à tua espera!', tipo: 'missao' });
  }

  // Próximo edifício do mundo
  const w = mundoProgresso(perfil.batalhasConcluidas ?? 0);
  if (w.proximo && w.batalhasParaProximo > 0) {
    const n = w.batalhasParaProximo;
    const nome = w.proximo.edificio.nome;
    const verbo = w.proximo.estado === 'bloqueado' ? 'desbloquear' : 'terminar';
    out.push({
      icone: '🏗️',
      texto: `Falta${n === 1 ? '' : 'm'} ${n} ${n === 1 ? 'batalha' : 'batalhas'} para ${verbo} ${nome}`,
      tipo: 'mundo',
    });
  }

  // Próximo nível
  const { falta, proximoNivel } = xpFaltaProximoNivel(perfil.xp ?? 0);
  if (proximoNivel && falta > 0) {
    out.push({ icone: '⭐', texto: `Falta${falta === 1 ? '' : 'm'} ${falta} XP para o Nível ${proximoNivel}`, tipo: 'nivel' });
  }

  return out.slice(0, 2);
}
