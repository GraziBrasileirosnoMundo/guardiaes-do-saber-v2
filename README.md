# Guardiões do Saber 🏰✨

Jogo educativo infantil para crianças do 2.º e 5.º ano do sistema escolar português.

## Sobre o Projeto

Jogo de quiz onde crianças respondem perguntas escolares para derrotar monstros, ganhar moedas, evoluir um Guardião vivo, colecionar itens e construir um Mundo. A aprendizagem acontece dentro da batalha — parece um jogo de verdade, não uma plataforma escolar. Pensado com os princípios de progressão e retenção dos melhores jogos infantis, mas **100% educativo e ético** (sem dinheiro real, sem anúncios, sem loot boxes pagas, sem manipulação).

> **Estado atual: Alpha (Fase 2 — Produto).** Ver `CHANGELOG.md` e `ROADMAP.md`.

### Público-alvo
- Crianças do 2.º ano (7–8 anos)
- Crianças do 5.º ano (10–11 anos)

### Funcionalidades
- ✅ Dois perfis independentes por dispositivo (para irmãos)
- ✅ 100 perguntas originais do currículo português (Matemática + Português)
- ✅ Batalhas de 5 perguntas contra monstros originais
- ✅ **Guardião Vivo** — reage às respostas, cumprimenta pelo nome, expressões e falas positivas
- ✅ **Sistema de Coleção** — 36 colecionáveis em 4 raridades (chapéus, capacetes, óculos, capas, asas, efeitos, cores, companheiros)
- ✅ **Baús por tier** (Comum → Lendário) com **probabilidades transparentes**
- ✅ **Progresso de Competências + Medalhas + Certificados** (domínio real por tema)
- ✅ **Construção do Mundo** — 8 edifícios desbloqueáveis
- ✅ **Economia + Loja** — moedas das batalhas gastam-se em colecionáveis
- ✅ **Missões** diárias, semanais e mensais
- ✅ **Troféus** — 11 conquistas com critérios claros
- ✅ Sistema de XP, moedas, níveis e streak diário
- ✅ **Área dos Pais** reformulada com foco pedagógico (o que domina, onde precisa de apoio, 7 dias, recomendações)
- ✅ Persistência total via localStorage (com migração segura de perfis antigos)
- ✅ Design responsivo (mobile, tablet, desktop)
- ✅ Visual de aventura/fantasia original

## Tecnologias

- **Next.js 14** + TypeScript
- **Tailwind CSS**
- **Framer Motion** (animações)
- **localStorage** para persistência (sem base de dados externa)
- **Lucide React** (ícones)

## Como Executar Localmente

```bash
# Entrar na pasta do projeto
cd nextjs_space

# Instalar dependências
npm install
# ou
yarn install

# Iniciar servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

Abre [http://localhost:3000](http://localhost:3000) no browser.

## Estrutura do Projeto

```
nextjs_space/
├── app/                    # Rotas Next.js
│   ├── page.tsx            # Seleção de perfil (início)
│   ├── game/page.tsx       # Hub principal
│   ├── battle/page.tsx     # Batalha
│   ├── rewards/page.tsx    # Recompensas / Baú
│   ├── customize/page.tsx  # Personalização
│   ├── parents/page.tsx    # Área dos Pais
│   └── profile-setup/     # Criação de perfil
├── components/
│   ├── screens/            # Ecrãs principais
│   ├── guardians/          # SVGs animados LUMIS e TORRAK
│   ├── monsters/           # SVGs NEBLUS, GROGMAR, VOLTIX
│   ├── portal/             # Visualização das 5 etapas
│   └── ui/                 # Botões, barras de progresso
├── data/
│   ├── questions.ts        # ← EDITAR AQUI para adicionar perguntas
│   ├── collection.ts       # 36 colecionáveis, raridades, odds dos baús
│   ├── world.ts            # 8 edifícios do Mundo
│   ├── trophies.ts         # 11 troféus
│   ├── missions.ts         # Modelos de missões diárias/semanais/mensais
│   ├── guardian-messages.ts# Falas contextuais do Guardião (positivas)
│   └── items.ts            # (legado) níveis, monstros, portal
├── lib/
│   ├── storage.ts          # localStorage + migração de perfis
│   ├── questionSelector.ts # Motor de seleção adaptativa
│   ├── metrics.ts          # Registo de eventos
│   ├── battleFlow.ts       # Pipeline puro de fim de batalha
│   ├── competencias.ts     # Domínio, medalhas, certificados
│   ├── chests.ts           # Geração de baús por tier
│   ├── missions.ts         # Progresso e reclamação de missões
│   ├── achievements.ts     # Deteção de novos troféus
│   ├── objectives.ts       # Próximos objetivos (retenção ética)
│   └── gameLogic.ts        # XP, moedas, níveis
├── hooks/
│   ├── useProfile.ts       # Gestão de perfis
│   ├── useGame.ts          # Lógica de jogo (usa battleFlow)
│   └── useBattle.ts        # Mecânicas de batalha
└── types/
    └── index.ts            # Tipos TypeScript
```

## Como Adicionar Perguntas

Editar o ficheiro `data/questions.ts` e seguir a estrutura:

```typescript
{
  id: 'M2_026',           // Identificador único
  pais: 'PT',
  ano: 2,                 // 2 ou 5
  disciplina: 'Matematica', // 'Matematica' ou 'Portugues'
  tema: 'Adição',
  competencia: 'cálculo',
  dificuldade: 1,         // 1, 2 ou 3
  enunciado: 'Quanto é 12 + 15?',
  alternativas: ['27', '25', '30'], // 3 para 2.º ano, 4 para 5.º ano
  correta: 0,             // índice da resposta correta (0-based)
  explicacao: '12 + 15 = 27.'
}
```

**Importante:** As alternativas são embaralhadas automaticamente a cada apresentação. O campo `correta` refere-se à posição na array original, antes do embaralhamento.

## Área dos Pais

**Acesso:** Manter pressionado o botão "ÁREA DOS PAIS" durante **3 segundos**.

Mostra para cada perfil:
- Dias de utilização e partidas jogadas
- Taxa de acerto na primeira tentativa
- Desempenho por disciplina (%)
- Temas com dificuldade (< 50% de acerto)
- Recomendações automáticas de estudo
- Relatório dos últimos 7 dias

## Segurança Infantil

- Sem chat ou comunicação com terceiros
- Sem recolha de dados pessoais (apenas apelido)
- Sem publicidade, compras ou ligações externas
- Sem localização ou fotografias
- Sem ranking público

## Como Exportar / Fazer Download

O código completo está disponível neste repositório GitHub. Para descarregar:

```bash
git clone https://github.com/GraziBrasileirosnoMundo/guardioes-do-saber.git
cd guardioes-do-saber/nextjs_space
npm install
npm run dev
```

## Documentação de Produto

- `GAME_DESIGN.md` — visão de design e loops de jogo
- `GAME_BALANCE.md` — economia, XP, odds e balanceamento
- `RETENTION_SYSTEM.md` — retenção ética (sem manipulação)
- `PARENT_EXPERIENCE.md` — experiência e valor para os pais
- `ROADMAP.md` — MVP → Alpha → Beta → 1.0 → 2.0
- `PLAYTEST_REPORT.md` — resultados dos testes
- `TECH_DEBT.md` — dívida técnica conhecida
- `CHANGELOG.md` — histórico de versões
- `HANDOFF_TO_CLAUDE.md` — contexto para continuar o desenvolvimento

## Próximos Passos Sugeridos (ver ROADMAP.md)

1. Som e feedback áudio (Web Audio API)
2. Expandir banco de perguntas (100 → 300+)
3. Modo offline (PWA / Service Worker)
4. Novas disciplinas (Estudo do Meio, Ciências, História)
5. Mais monstros e biomas ligados aos edifícios do Mundo

---

Desenvolvido com Abacus AI Agent — Julho 2026
