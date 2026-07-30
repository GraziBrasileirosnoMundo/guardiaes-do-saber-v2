# PARENT_EXPERIENCE.md — Guardiões do Saber

## Objetivo
Os pais **não** querem saber de moedas nem de cosméticos. Querem saber: **o que o filho domina, onde tem dificuldades, quanto evoluiu e o que precisa de revisão.** A Área dos Pais foi reformulada exatamente com esse foco.

## Acesso
Botão "Área dos Pais" no canto inferior da Base, protegido por **long-press de 3 segundos** (evita entrada acidental da criança). Suporta rato e toque.

## O que mostra (`components/screens/parents-screen.tsx`)
1. **Evolução** — Nível atual, competências dominadas (X/21), medalhas conquistadas, dias ativos.
2. **Desempenho por disciplina** — barras simples de Matemática e Português (percentagem de acerto).
3. **O que já domina** — temas com ≥70% de acerto (medalha assinalada nos dominados).
4. **Onde precisa de apoio** — temas com <50% de acerto (com ≥2 tentativas), destacados a vermelho.
5. **Atividade dos últimos 7 dias** — gráfico de barras de batalhas por dia.
6. **Recomendações** — sugestões concretas de revisão, geradas a partir dos dados reais.

## Princípios de design
- **Simplicidade primeiro:** poucos números, bem escolhidos. Sem sobrecarga de informação.
- **Linguagem construtiva:** "precisa de apoio" em vez de "falhou". Foco no crescimento.
- **Dados autênticos:** o domínio vem de `acertosPorTema`/`errosPorTema` persistidos por perfil; a atividade vem dos eventos de métrica (`lib/metrics.ts`).
- **Multi-perfil:** seletor no topo quando há 2 perfis no dispositivo.

## Fonte de dados
- Domínio/competências: `lib/competencias.ts` (a partir do perfil).
- Engajamento (dias, atividade semanal): eventos em `gds_metrics_<profileId>` no localStorage.

## Futuro (ver ROADMAP)
- Exportar/imprimir relatório e certificados.
- Definir metas semanais em conjunto com a criança.
- Comparar evolução mês a mês.
