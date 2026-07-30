# Dívida Técnica — Guardiões do Saber 🧹

Este documento é honesto sobre o estado do código, para que qualquer programador
(ou o Claude Code) possa continuar sem surpresas. O objetivo da Fase 2 foi entregar
código **limpo, tipado e exportável**, mas registamos aqui o que ainda pode melhorar.

---

## Estado geral: saudável ✅

- **TypeScript:** 0 erros (`tsc --noEmit` limpo)
- **Build de produção:** sucesso (14 rotas)
- **Arquitetura:** lógica de jogo separada em funções puras (`lib/battleFlow.ts`, `lib/competencias.ts`, `lib/chests.ts`, `lib/missions.ts`, `lib/achievements.ts`, `lib/objectives.ts`), fáceis de testar e reutilizar
- **Dados separados da lógica:** `data/*.ts` contém conteúdo (colecionáveis, mundo, troféus, missões); `lib/*.ts` contém regras

---

## Itens de dívida técnica conhecidos

### 1. Código legado do MVP ainda presente (baixo risco)
- `lib/gameLogic.ts` → `gerarRecompensaBau()` já não é usado (substituído por `lib/chests.ts`), mas foi mantido para não quebrar imports antigos.
- `hooks/useBattle.ts` ainda importa `gerarRecompensaBau` (import não usado, inofensivo — `noUnusedLocals` está desligado).
- `components/portal/portal-visual.tsx` ficou órfão (o Portal foi substituído pelo sistema de Mundo com 8 edifícios), mas continua válido e sem erros.
- `data/items.ts` mantém `ACESSORIOS/PECAS_BASE/APARENCIAS/EFEITOS` antigos; só `NIVEIS`, `MONSTROS`, `MONSTRO_NOMES` e `PORTAL_ETAPAS` continuam a ser usados.

**Recomendação:** remover gradualmente na Beta, depois de confirmar que nenhum ecrã depende deles. Não é urgente.

### 2. `lib/types.ts` é um ficheiro obsoleto (ignorar)
- É um resto de um projeto anterior (gestor de despesas). **Os tipos reais do jogo estão em `types/index.ts`** (resolvido por `@/types`).
- **Recomendação:** apagar na Beta, após confirmar que nada o importa.

### 3. Nível máximo fixo em 5
- A curva de XP atinge o teto no nível 5. Para a Beta, considerar mais níveis ou prestígio, para não "esgotar" a progressão de crianças muito ativas.

### 4. Sem testes automatizados persistentes
- O playtest programático foi executado como script temporário (depois removido). Não há uma suite de testes no repositório.
- **Recomendação:** adicionar testes unitários às funções puras de `lib/` (Vitest/Jest) na Beta.

### 5. Colecionáveis representados por emoji
- Decisão deliberada: robusto, leve, sem dependência de geração de imagens, funciona em qualquer dispositivo.
- **Futuro (opcional):** substituir por ilustrações originais mantendo a mesma estrutura de dados.

### 6. Persistência apenas em localStorage
- O progresso é local ao dispositivo/browser. Sincronização entre dispositivos exigiria conta + base de dados remota (marco 1.0/2.0).

---

## O que NÃO é dívida (decisões intencionais)

- **Sem base de dados** — adequado ao âmbito e à privacidade infantil.
- **Seleção de perguntas por regras (sem IA no quiz)** — previsível, auditável, seguro.
- **Área dos Pais com longpress (sem PIN)** — reduz fricção; intencional.
- **Emoji para colecionáveis** — ver acima.

---

## Prioridade de limpeza sugerida (para a Beta)

1. Apagar `lib/types.ts` e o import não usado em `useBattle.ts`.
2. Remover código legado de baú em `lib/gameLogic.ts` e itens não usados em `data/items.ts`.
3. Adicionar suite de testes unitários às funções de `lib/`.
4. Reavaliar `portal-visual.tsx` (apagar ou reaproveitar num edifício do Mundo).
