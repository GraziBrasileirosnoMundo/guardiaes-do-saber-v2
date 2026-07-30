import { EventoTipo, EventoMetrica } from '@/types';
import { getMetrics, saveMetrics } from './storage';

export function registarEvento(
  profileId: string,
  tipo: EventoTipo,
  dados?: Record<string, any>
): void {
  if (!profileId) return;
  const metrics = getMetrics(profileId);
  const evento: EventoMetrica = {
    tipo,
    timestamp: new Date().toISOString(),
    dados: dados ?? undefined,
  };
  metrics.push(evento);
  // Keep max 5000 events per profile to avoid localStorage overflow
  const trimmed = metrics?.length > 5000 ? metrics.slice(-5000) : metrics;
  saveMetrics(profileId, trimmed);
}
