# Roadmap — Guardiões do Saber 🗺️

Este roadmap organiza o produto por marcos (milestones), do MVP à versão 2.0.
Cada marco separa o que é **essencial**, **importante** e **futuro**, para que o desenvolvimento
nunca perca o foco na regra de ouro: *"isto faz uma criança querer jogar mais uma partida?"*

---

## ✅ MVP (concluído — Fase 1)

Prova de conceito jogável: quiz-batalha com progressão básica.

- Dois perfis por dispositivo (irmãos)
- 100 perguntas do currículo português (2.º e 5.º ano, Matemática + Português)
- Batalhas de 5 perguntas contra 3 monstros
- Dois Guardiões (LUMIS, TORRAK), XP, moedas, níveis, streak
- Baú simples, Portal com 5 etapas, personalização básica
- Área dos Pais com métricas pedagógicas
- Persistência via localStorage

---

## ✅ Alpha (concluído — Fase 2: Produto)

Transformação de "protótipo funcional" em **produto que dá vontade de voltar todos os dias.**
Esta é a versão atual.

### Essencial (feito)
- **Guardião Vivo** — reage às respostas, cumprimenta pelo nome, expressões e falas contextuais (sempre positivas)
- **Sistema de Coleção** — 36 colecionáveis (chapéus, capacetes, óculos, capas, asas, efeitos, cores, companheiros) em 4 raridades
- **Baús por tier** (Comum → Lendário) com **probabilidades transparentes** (a criança pode ver as odds)
- **Progresso de Competências + Medalhas + Certificados** *(prioridade máxima pedagógica)* — domínio por tema (≥85% em ≥6 tentativas), medalhas por tema, certificado imprimível/partilhável
- **Construção do Mundo** — 8 edifícios que se desbloqueiam com o progresso
- **Economia + Loja** — moedas ganhas nas batalhas gastam-se em colecionáveis (nunca dinheiro real)
- **Missões** diárias, semanais e mensais com recompensas reclamáveis
- **Área dos Pais reformulada** — evolução, "o que já domina", "onde precisa de apoio", atividade dos 7 dias, recomendações (sem falar de moedas)

### Importante (feito)
- Redução de fricção de UX (hub central com objetivos e missões inline)
- Sistema de retenção ético (objetivos "próximo passo", sem manipulação/culpa/medo)
- Migração segura de perfis antigos (sem perda de dados)

---

## 🎯 Beta (próximo)

Foco: **profundidade de conteúdo, som e acessibilidade** — mais razões para voltar.

### Essencial
- **Som e feedback áudio** — acerto, erro, abertura de baú, subida de nível, fanfarra de vitória (Web Audio API, com opção de silenciar)
- **Expansão do banco de perguntas** — 100 → 300+, cobrindo mais temas de cada ano
- **Modo offline (PWA)** — manifest + service worker, jogável sem ligação

### Importante
- Novos monstros e biomas ligados aos edifícios do Mundo
- Eventos temáticos por época (missões especiais rotativas)
- Exportar/importar progresso em JSON (backup manual pelos pais)
- Acessibilidade: alto contraste, tamanhos de fonte, leitura por voz das perguntas

### Futuro
- Novos Guardiões desbloqueáveis por conquistas
- Histórias curtas ao derrotar cada monstro

---

## 🚀 1.0 (lançamento público)

Foco: **estabilidade, escala de conteúdo e confiança dos pais.**

### Essencial
- Cobertura completa do currículo do 2.º e 5.º ano (Matemática + Português)
- Onboarding guiado (primeira sessão da criança e primeira visita dos pais)
- Relatório de progresso exportável/partilhável para os pais (PDF)

### Importante
- Novas disciplinas: Estudo do Meio (2.º ano)
- Mais anos de escolaridade (3.º e 4.º ano)
- Painel de professor (turma) — opcional

### Futuro
- Sincronização entre dispositivos (requer conta + base de dados remota)

---

## 🌍 2.0 (expansão)

Foco: **crescimento e personalização de aprendizagem.**

- Ciências Naturais e História (5.º ano)
- Percursos de aprendizagem adaptativos por competência
- Outros currículos/países (arquitetura já prevê o campo `pais`)
- Modo cooperativo local entre irmãos (sem chat, sem estranhos)
- Desafios semanais de escola/família (sem ranking público de crianças)

---

## Princípios que nunca mudam (em qualquer marco)

- ❌ Sem dinheiro real, sem anúncios, sem loot boxes pagas, sem mecânicas de aposta
- ❌ Sem culpa, medo ou ansiedade para forçar retenção
- ✅ A aprendizagem está sempre dentro da diversão
- ✅ Probabilidades sempre transparentes
- ✅ Privacidade infantil: sem chat, sem dados pessoais, sem estranhos
