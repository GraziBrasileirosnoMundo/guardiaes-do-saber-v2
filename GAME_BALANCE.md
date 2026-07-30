# GAME_BALANCE.md — Guardiões do Saber

Valores centrais de balanceamento. Todos ajustáveis nos ficheiros indicados.

## XP e Níveis (`data/items.ts` → `NIVEIS`, `lib/gameLogic.ts`)
| Nível | XP mínimo |
|------|-----------|
| 1 | 0 |
| 2 | 101 |
| 3 | 251 |
| 4 | 501 |
| 5 | 901 |

- XP por resposta certa: **5**.
- Bónus por batalha concluída: **+10**.
- Uma batalha 5/5 ≈ 35 XP. ~26 batalhas perfeitas para chegar ao nível 5 (progressão sentida mas não lenta).

## Moedas (`lib/gameLogic.ts` → `calcularMoedasPergunta`)
- Resposta certa: **10 moedas**.
- Bónus de combo: **+15** a cada 3 acertos seguidos (3.º, 6.º, ...).
- Baú (ver abaixo) acrescenta 15–130 moedas por batalha.
- Missões dão 35–450 moedas.

## Baús — probabilidades transparentes (`data/collection.ts`)
Tier do baú sorteado pelo n.º de acertos (cada linha soma 100%):

| Acertos | Comum | Raro | Épico | Lendário |
|--------|------|------|------|---------|
| 5 | 25 | 45 | 22 | 8 |
| 4 | 45 | 40 | 13 | 2 |
| 3 | 65 | 30 | 5 | 0 |
| 2 | 85 | 15 | 0 | 0 |
| 1 | 95 | 5 | 0 | 0 |
| 0 | 100 | 0 | 0 | 0 |

Moedas por tier: comum 15–30, raro 30–55, épico 55–85, lendário 90–130.
Chance de conter item: comum 45%, raro 80%, épico 100%, lendário 100%.
Raridade do item por tier em `ODDS_ITEM_POR_TIER`. Se a coleção do tier já estiver completa, o baú compensa com +25 moedas (nunca vazio).

## Competências / Medalhas (`lib/competencias.ts`)
- Critério de domínio: **≥85% de acerto** no tema **e ≥6 respostas**.
- Ao dominar: medalha + certificado + evento registado.
- 21 temas por ano → 21 medalhas possíveis por perfil.

## Dificuldade adaptativa (`lib/questionSelector.ts`)
- 3 acertos seguidos no tema → sobe dificuldade (máx 3).
- 2 erros no tema → desce dificuldade (mín 1).
- Seleção pondera: evitar repetição recente, reforçar temas fracos, alternar Matemática/Português.

## Construção do Mundo (`data/world.ts`)
| Edifício | Desbloqueia (batalhas) | Completo (batalhas) |
|---------|------------------------|---------------------|
| Ilha | 0 | 0 |
| Portal | 1 | 4 |
| Laboratório | 5 | 9 |
| Arena | 10 | 15 |
| Castelo | 18 | 25 |
| Floresta | 28 | 38 |
| Montanha | 45 | 58 |
| Templo | 68 | 85 |

Mundo completo em ~85 batalhas — objetivo de longo prazo saudável.

## Missões (`data/missions.ts`)
- Diária: metas ~1 sessão (3 batalhas / 12 acertos / 1 perfeita / combo 3). 35–50 moedas.
- Semanal: 15 batalhas / 60 acertos / 3 perfeitas / combo 4. 130–180 moedas.
- Mensal: 50 batalhas / 200 acertos / 8 itens. 400–450 moedas.
- Reset automático por período (dia/semana ISO/mês). Nunca obrigatórias.

## Troféus (`data/trophies.ts`)
1, 10, 25, 50, 100 batalhas · nível 5 · combo 5 · 15 e 30 itens · 5 medalhas · mundo completo.

## Notas de tuning
- A economia foi desenhada para o jogador **querer gastar**: preços de loja 40–320 escalonados por raridade, e itens só de baú (lendários) para aspiração.
- Playtest (90 batalhas a 90% de acerto, 2.º ano) → nível 5, coleção completa, 18 medalhas, mundo 100%. A 60% (5.º ano) → progressão mais lenta em medalhas (2), como esperado.
