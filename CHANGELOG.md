# Changelog — Guardiões do Saber

Todas as alterações relevantes deste projeto são documentadas aqui.

---

## [Alpha] — Fase 2: Produto — Julho 2026

Transformação do MVP num **produto que dá vontade de voltar todos os dias**, pensado
como um jogo de verdade (à imagem dos princípios de retenção e progressão dos melhores
jogos infantis) mas **100% educativo e ético**.

### Adicionado
- **Guardião Vivo** — reage às respostas, cumprimenta pelo nome, com expressões e falas contextuais (sempre positivas). Novos componentes `guardian-avatar.tsx` e `guardian-speech.tsx`; Guardiões LUMIS/TORRAK ganham cor, expressão e flutuação.
- **Sistema de Coleção** — 36 colecionáveis (chapéus, capacetes, óculos, capas, asas, efeitos, cores, companheiros) em 4 raridades. Novo ecrã de Coleção.
- **Baús por tier** (Comum, Raro, Épico, Lendário) com **probabilidades transparentes** visíveis à criança. Novo `lib/chests.ts` (baús nunca saem vazios).
- **Progresso de Competências + Medalhas + Certificados** — domínio por tema (≥85% em ≥6 tentativas), medalhas por tema e certificado imprimível. Novo ecrã de Competências e `lib/competencias.ts`.
- **Construção do Mundo** — 8 edifícios que se desbloqueiam com o progresso. Novo ecrã de Mundo, `data/world.ts` e componente `world-map.tsx`.
- **Economia + Loja** — moedas das batalhas gastam-se em colecionáveis (sem dinheiro real). Novo ecrã de Loja.
- **Missões** diárias, semanais e mensais com recompensas reclamáveis. Novo `lib/missions.ts`, `data/missions.ts` e componente `mission-row.tsx`.
- **Troféus** — 11 conquistas com critérios claros. Novo `data/trophies.ts` e `lib/achievements.ts`.
- **Objetivos de retenção ética** — `lib/objectives.ts` garante sempre um "próximo passo" claro, sem culpa nem pressão.
- **Pipeline de batalha puro** — `lib/battleFlow.ts` centraliza XP, moedas, baús, missões, medalhas e troféus numa função testável.
- **Documentação de produto** — GAME_DESIGN, GAME_BALANCE, RETENTION_SYSTEM, PARENT_EXPERIENCE, ROADMAP, PLAYTEST_REPORT, TECH_DEBT e este CHANGELOG.

### Alterado
- **Área dos Pais reformulada** — foco pedagógico: evolução, "o que já domina", "onde precisa de apoio", atividade dos últimos 7 dias e recomendações (sem falar de moedas ou recompensas).
- **Hub principal reformulado** — saudação viva do Guardião, objetivos do dia, missões com reclamação inline, mini-mapa do Mundo e navegação clara (Coleção, Loja, Competências, Personalizar, Mundo).
- **Ecrã de Personalização** reescrito como "loadout" por categoria (equipar colecionáveis).
- **Ecrã de Recompensas** reformulado com baús por tier, odds transparentes e celebração de medalhas/troféus/missões.
- **Migração segura de perfis** — perfis do MVP recebem os novos campos sem perda de dados.

### Garantias éticas mantidas
- Sem dinheiro real, sem anúncios, sem loot boxes pagas, sem mecânicas de aposta.
- Sem culpa, medo ou ansiedade na retenção.
- Sem chat, sem estranhos, sem recolha de dados pessoais.

---

## [MVP] — Fase 1 — Julho 2026

### Adicionado
- Dois perfis por dispositivo, 100 perguntas do currículo português (2.º e 5.º ano).
- Batalhas de 5 perguntas, 3 monstros, 2 Guardiões, XP/moedas/níveis/streak.
- Baú simples, Portal com 5 etapas, personalização básica.
- Área dos Pais com métricas pedagógicas e persistência via localStorage.
