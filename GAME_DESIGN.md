# GAME_DESIGN.md — Guardiões do Saber

## Visão
Um jogo educativo (Matemática e Português, 2.º e 5.º ano, currículo português) que uma criança **quer** abrir todos os dias por vontade própria. O concorrente não é a escola virtual — são o Brawl Stars, o Roblox e o Minecraft. Copiamos **princípios** de progressão, recompensa e ligação emocional (nunca elementos protegidos dessas marcas).

## Princípio orientador
Antes de cada mecânica pergunta-se: **"Isto faz uma criança querer jogar mais uma partida?"** Se a resposta for não, não entra.

## Pilares de experiência
1. **Companheiro emocional (o Guardião).** LUMIS e TORRAK não são apenas mascotes: têm expressões (feliz, muito feliz, animado, calmo, surpreso, pensativo), reagem a cada resposta e falam com o jogador. Comemoram vitórias, encorajam nos erros — **sem culpa, sem medo, sem ansiedade**. O erro é sempre enquadrado como parte de aprender.
2. **Progressão sempre visível.** XP/níveis, moedas, streak, construção de um mundo inteiro e domínio de competências. Há sempre um "próximo objetivo" à vista.
3. **Coleção profunda.** 36 colecionáveis em 8 categorias equipáveis + medalhas + 11 troféus. Colecionar e personalizar o Guardião é uma motivação de longo prazo.
4. **Recompensa com ritmo.** Baús por tier (comum→lendário) com probabilidades **transparentes**, animação de abertura interativa, contadores animados.
5. **Aprendizagem a sério.** Seleção adaptativa de perguntas (motor baseado em regras, sem IA), dificuldade dinâmica por tema, e progresso de competências que gera medalhas e certificados.

## Ciclo de jogo (game loop)
```
Base (Hub) → JOGAR → Batalha (5 perguntas vs monstro) → Recompensas (baú + celebrações + teasers) → "Jogar novamente" ou volta à Base
```
Cada volta do ciclo alimenta: XP, moedas, missões, construção do mundo, progresso de competências, coleção. Ao terminar, o jogador vê sempre o que falta para a próxima conquista → gancho "só mais uma".

## Personagens originais
- **Guardiões:** LUMIS (luz/estrelas, azul) e TORRAK (pedra/cristal, verde) — SVG originais animados, agora com sistema de expressões e cor personalizável.
- **Monstros:** NEBLUS, GROGMAR, VOLTIX — SVG originais. Nunca assustadores; são "desafios" simpáticos a derrotar com conhecimento.

## Ecrãs
- **Base/Hub** (`/game`): Guardião vivo + saudação, estatísticas, objetivos próximos, JOGAR, missões, mini-mundo, navegação.
- **Batalha** (`/battle`): 5 perguntas, combos, feedback imediato, Guardião a reagir.
- **Recompensas** (`/rewards`): baú por tier, medalhas/troféus/missões, teasers de progresso.
- **Coleção** (`/collection`): itens, medalhas, troféus.
- **Loja** (`/shop`): compra com moedas (tudo conquistável a jogar).
- **Competências** (`/skills`): progresso por tema + certificados.
- **Mundo** (`/world`): mapa dos 8 edifícios.
- **Personalizar** (`/customize`): equipar loadout do Guardião.
- **Área dos Pais** (`/parents`): foco em aprendizagem (long-press de 3s).

## Regras éticas (não negociáveis)
- Sem compras com dinheiro real, sem anúncios, sem loot boxes pagas.
- Sem mecânicas de aposta: o baú dá **sempre** algo e as probabilidades são mostradas.
- Sem punição, culpa ou medo. Streak nunca é ameaça — é celebração.
- Área dos Pais protegida e focada em valor educativo, não em vaidade (moedas).
