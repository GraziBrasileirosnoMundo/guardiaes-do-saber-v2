# Handoff para Claude Code 🤖

Este documento permite que o Claude Code retome o desenvolvimento do **Guardiões do Saber** com contexto completo.

## Origem

Projeto gerado pelo Abacus AI Agent em Julho de 2026.
Repositório: https://github.com/GraziBrasileirosnoMundo/guardioes-do-saber

## Como Clonar e Executar

```bash
git clone https://github.com/GraziBrasileirosnoMundo/guardioes-do-saber.git
cd guardioes-do-saber/nextjs_space
npm install
npm run dev
# Abrir http://localhost:3000
```

## Estado do Projeto: Alpha (Fase 2 — Produto, Julho 2026)

> Ler também `CHANGELOG.md`, `ROADMAP.md`, `GAME_DESIGN.md`, `GAME_BALANCE.md`,
> `RETENTION_SYSTEM.md`, `PARENT_EXPERIENCE.md`, `PLAYTEST_REPORT.md` e `TECH_DEBT.md`.

### Implementado ✅
**Base (Fase 1 — MVP):**
- Dois perfis independentes no mesmo dispositivo
- 2.º e 5.º anos do currículo português, 100 perguntas originais
- Batalhas de 5 perguntas contra 3 monstros (NEBLUS, GROGMAR, VOLTIX)
- Dois Guardiões com SVG: LUMIS e TORRAK
- XP, moedas, níveis (1–5), streak diário
- Motor de seleção adaptativa sem IA (regras de dificuldade)
- Persistência via localStorage, registo de eventos de métricas

**Produto (Fase 2 — Alpha):**
- **Guardião Vivo** — reage às respostas, cumprimenta pelo nome, expressões + falas positivas (`guardian-avatar.tsx`, `guardian-speech.tsx`, `data/guardian-messages.ts`)
- **Coleção** — 36 colecionáveis em 4 raridades (`data/collection.ts`, ecrã `collection-screen.tsx`)
- **Baús por tier** com odds transparentes (`lib/chests.ts`)
- **Competências + Medalhas + Certificados** — domínio ≥85% em ≥6 tentativas (`lib/competencias.ts`, `skills-screen.tsx`)
- **Mundo** — 8 edifícios desbloqueáveis (`data/world.ts`, `world-map.tsx`, `world-screen.tsx`)
- **Economia + Loja** (`shop-screen.tsx`)
- **Missões** diárias/semanais/mensais (`data/missions.ts`, `lib/missions.ts`, `mission-row.tsx`)
- **Troféus** — 11 conquistas (`data/trophies.ts`, `lib/achievements.ts`)
- **Objetivos de retenção ética** (`lib/objectives.ts`)
- **Pipeline de batalha puro** (`lib/battleFlow.ts`) — centraliza XP/moedas/baús/missões/medalhas/troféus
- **Área dos Pais reformulada** — foco pedagógico, sem falar de moedas
- **Migração segura de perfis** antigos (`migrarPerfil` em `lib/storage.ts`)

### Não implementado ❌ (ver ROADMAP.md)
- Sons e música (marco Beta)
- Modo offline (PWA) (marco Beta)
- Pagamentos, compras, anúncios (nunca — decisão ética)
- Multiplayer, chat, ranking público
- IA generativa durante o quiz
- Outras disciplinas / outros países (marcos 1.0/2.0)

## Ficheiros Chave para Desenvolvimento

### Para adicionar/editar perguntas:
```
data/questions.ts
```
Estrutura de cada pergunta:
```typescript
{
  id: 'M2_026',
  pais: 'PT',
  ano: 2 | 5,
  disciplina: 'Matematica' | 'Portugues',
  tema: string,
  competencia: string,
  dificuldade: 1 | 2 | 3,
  enunciado: string,
  alternativas: string[],  // 3 para 2.º ano, 4 para 5.º ano
  correta: number,         // índice 0-based na array original
  explicacao: string
}
```

### Para editar itens (acessórios, peças, efeitos):
```
data/items.ts
```

### Para editar lógica de jogo:
```
lib/battleFlow.ts     → Pipeline puro de fim de batalha (XP/moedas/baús/missões/medalhas/troféus)
lib/competencias.ts   → Domínio por tema, medalhas, certificados
lib/chests.ts         → Geração de baús por tier (nunca vazios)
lib/missions.ts       → Progresso e reclamação de missões
lib/achievements.ts   → Deteção de novos troféus
lib/objectives.ts     → Próximos objetivos (retenção ética)
lib/gameLogic.ts      → XP, moedas, níveis
lib/questionSelector.ts → Seleção adaptativa de perguntas
lib/storage.ts        → localStorage + migração de perfis
lib/metrics.ts        → Registo de eventos
```

### Dados (conteúdo, separado da lógica):
```
data/questions.ts        → Banco de perguntas
data/collection.ts       → 36 colecionáveis, raridades, odds dos baús
data/world.ts            → 8 edifícios do Mundo
data/trophies.ts         → 11 troféus
data/missions.ts         → Modelos de missões
data/guardian-messages.ts→ Falas do Guardião (sempre positivas)
data/items.ts            → (legado) níveis, monstros, portal
```

### Para editar componentes visuais:
```
components/guardians/lumis.tsx      → SVG animado LUMIS
components/guardians/torrak.tsx     → SVG animado TORRAK
components/monsters/monster-svg.tsx → SVGs dos 3 monstros
components/portal/portal-visual.tsx → Visualização das 5 etapas
```

### Para editar ecrãs:
```
components/screens/profile-selector.tsx    → Seleção de perfil (início)
components/screens/profile-setup-screen.tsx → Criação de perfil
components/screens/game-hub.tsx            → Hub principal
components/screens/battle-screen.tsx       → Batalha
components/screens/rewards-screen.tsx      → Recompensas / Baú
components/screens/customize-screen.tsx    → Personalização
components/screens/parents-screen.tsx      → Área dos Pais
```

## Estrutura de Dados (localStorage)

```
gds_profiles         → Array<Perfil> (máx. 2)
gds_active_profile   → string (id do perfil ativo)
gds_metrics_[id]     → Array<EventoMetrica> (por perfil)
```

Chave `Perfil` (simplificada):
```typescript
{
  id, apelido, ano, guardiao, nomeGuardiao,
  nivel, xp, moedas, streak, ultimoJogo,
  portalProgress, portalEtapa,
  itensDesbloqueados, aparenciaAtiva, acessorioAtivo,
  perguntasRespondidas, dificuldadeAtual,
  errosPorTema, acertosPorTema,
  sequenciaAtual, batalhasConcluidas, batalhaSessions,
  criadoEm
}
```

## Motor de Seleção Adaptativa

Ficheiro: `lib/questionSelector.ts`

Regras implementadas:
- 3 acertos seguidos → aumenta dificuldade do tema
- 2 erros no mesmo tema → reduz dificuldade do tema
- Últimas 10 perguntas respondidas → não repetir
- Temas com erros recentes → aparecem mais frequentemente
- Alternativas sempre embaralhadas com Fisher-Yates

## Métricas Registadas

11 tipos de eventos em `lib/metrics.ts`:
```
perfil_criado, jogo_aberto, batalha_iniciada,
pergunta_respondida, resposta_correta, resposta_errada,
batalha_concluida, batalha_abandonada, jogar_novamente_clicado,
recompensa_aberta, perfil_trocado
```

## Progressão do Portal

5 etapas, cada batalha avança ~4%:
1. Terreno (0–20%)
2. Base (21–40%)
3. Estrutura (41–60%)
4. Energia (61–80%)
5. Portal Completo (81–100%)

## Guardiões

- **LUMIS**: ser de luz com estrelas. Para 2.º ano: amarelo/azul vibrante. Para 5.º ano: mago-estrela.
- **TORRAK**: guardião de cristal/terra. Para 2.º ano: verde/laranja arredondado. Para 5.º ano: verde-escuro/bronze angular.

## Monstros

- **NEBLUS**: ser de névoa azul-escura
- **GROGMAR**: criatura de lama com chifres
- **VOLTIX**: monstro elétrico com antenas

## Diferenças Visuais por Ano

**2.º ano:** botões mínimo 64px, fonte 20px+, 3 alternativas, cores vivas
**5.º ano:** 4 alternativas, linguagem menos infantil, visual mais sóbrio

## Próximas Tarefas Sugeridas (marco Beta — ver ROADMAP.md)

### Prioridade Alta
1. Som e feedback áudio (Web Audio API, com opção de silenciar)
2. Expandir banco de perguntas (100 → 300+)
3. Modo offline (manifest.json + service worker)

### Prioridade Média
4. Novos monstros e biomas ligados aos edifícios do Mundo
5. Eventos temáticos por época (missões especiais rotativas)
6. Exportar/importar progresso em JSON (backup pelos pais)
7. Acessibilidade: alto contraste, tamanhos de fonte, leitura por voz

### Limpeza de dívida técnica (ver TECH_DEBT.md)
8. Apagar `lib/types.ts` (obsoleto) e import não usado em `useBattle.ts`
9. Remover baú legado de `lib/gameLogic.ts` e itens não usados de `data/items.ts`
10. Adicionar testes unitários às funções puras de `lib/`

## Notas Importantes

- **Não usar IA durante o quiz**: todas as perguntas são do banco estático `data/questions.ts`
- **Sem dados pessoais**: apenas apelido (sem e-mail, foto, nome completo)
- **Sem compras**: todas as recompensas são gratuitas
- **localStorage**: o progresso é local ao dispositivo/browser; para sincronizar entre dispositivos seria necessário autenticação + base de dados remota
- **Área dos Pais**: protegida por longpress 3s (sem PIN), por design intencional para reduzir fricção

---

Última atualização: Julho 2026 | Abacus AI Agent
