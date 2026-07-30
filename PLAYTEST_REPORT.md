# Relatório de Playtest — Guardiões do Saber 🧪

**Data:** Julho 2026 · **Versão:** Alpha (Fase 2: Produto)

Este relatório documenta os testes realizados para validar que o jogo funciona
de ponta a ponta, que a progressão é saudável e que a regra de ouro se mantém:
*a criança quer jogar mais uma partida.*

---

## 1. Testes automáticos (build e tipos)

| Teste | Resultado |
|-------|-----------|
| Verificação de tipos (`tsc --noEmit`) | ✅ 0 erros |
| Build de produção | ✅ Sucesso — 14 rotas geradas |
| Arranque do servidor de desenvolvimento | ✅ HTTP 200 |
| Erros/avisos de hidratação na consola | ✅ Nenhum |

---

## 2. Simulação de progressão (playtest programático)

Simulámos centenas de batalhas com perfis reais, verificando toda a cadeia de
recompensas (XP → moedas → baú → missões → medalhas → troféus → mundo).

### Cenário A — Aluno do 2.º ano com ~90% de acerto
- **90 batalhas simuladas**
- Atingiu **nível 5** (máximo atual)
- **Coleção completa: 36/36** colecionáveis
- **18 medalhas** de tema conquistadas
- **10 troféus** desbloqueados
- **Mundo 8/8 edifícios** construídos
- ✅ Sem estados impossíveis; baús nunca saíram vazios

### Cenário B — Aluno do 5.º ano com ~60% de acerto
- Atingiu **nível 5**
- **2 medalhas** (domínio exige ≥85% em ≥6 tentativas — correto que sejam poucas)
- **9 troféus** desbloqueados
- ✅ A criança que erra mais **continua a progredir e a ser recompensada**, sem ser punida — mas o domínio pedagógico só é reconhecido quando é real

### Cenário C — Migração de perfil antigo (Fase 1 → Fase 2)
- Perfil criado no MVP carregado na nova versão
- ✅ Todos os campos novos (coleção, medalhas, missões, troféus, certificados) foram inicializados com segurança
- ✅ **Nenhuma perda de dados** (XP, moedas, histórico preservados)

---

## 3. Playtest manual no browser (loop completo)

Perfil de teste "Mariana" (2.º ano), percorrido ecrã a ecrã:

| Ecrã | Verificação | Resultado |
|------|-------------|-----------|
| Hub | Saudação do Guardião pelo nome, objetivos, missões inline, mini-mapa do Mundo | ✅ |
| Batalha | 5 perguntas, reações do Guardião, feedback de acerto/erro | ✅ |
| Recompensas | Baú Raro aberto → +41 moedas + "Capacete Guerreiro" (NOVO) | ✅ |
| Recompensas | Medalha "Sílabas dominado", troféu "Mestre do Combo", missão concluída | ✅ |
| Recompensas | Mundo avançou para 4/8, probabilidades do baú visíveis (toggle) | ✅ |
| Competências | Progresso por tema, medalhas, modal de certificado | ✅ |
| Coleção | 6/36 itens, separador de troféus | ✅ |
| Loja | Compra de colecionáveis com moedas | ✅ |
| Personalizar | Equipar por categoria (loadout) | ✅ |
| Mundo | 8 edifícios com estados de progresso | ✅ |
| Área dos Pais | Evolução, domínio, apoio, atividade 7 dias, recomendações | ✅ |

**Consola do browser durante todo o loop:** sem erros, sem avisos de hidratação.

---

## 4. Validação da regra de ouro

Em cada final de batalha existe **sempre pelo menos um motivo para voltar**:
- Progresso visível para o próximo nível / próximo edifício
- Missão quase concluída
- Item colecionável em falta (coleção incompleta)
- Medalha de tema perto de ser conquistada

✅ **Nunca há um ecrã final "vazio"** — há sempre um próximo objetivo claro e alcançável.

---

## 5. Validação ética

| Regra | Estado |
|-------|--------|
| Sem compras com dinheiro real | ✅ |
| Sem anúncios | ✅ |
| Sem loot boxes pagas | ✅ |
| Sem mecânicas de aposta | ✅ |
| Probabilidades dos baús transparentes | ✅ |
| Sem culpa/medo/ansiedade na retenção | ✅ (mensagens sempre positivas) |
| Sem chat/estranhos/dados pessoais | ✅ |

---

## 6. Bugs encontrados e corrigidos durante o playtest

1. **Mensagem enganadora nas competências** — temas com 100% mas poucas tentativas mostravam "Faltam 0% para dominar". Corrigido para "Responde a +N para a medalha".
2. **Ordenação de competências** — temas dominados passam a aparecer primeiro na lista.
3. **Flutuação do Guardião** — resolvida com uma propriedade `float` (o contentor flutua; o Guardião fica estável dentro).

---

## Conclusão

O jogo está **estável, jogável de ponta a ponta e pedagogicamente honesto**.
A progressão recompensa o esforço sem punir o erro, e o reconhecimento de domínio
(medalhas/certificados) só acontece quando a aprendizagem é real. Pronto para o marco Beta.
