# RETENTION_SYSTEM.md — Guardiões do Saber

Referência dos sistemas de retenção. **Princípio:** motivar, nunca manipular. Nada de escassez artificial, contagens decrescentes ameaçadoras, ou culpa.

## 1. Gancho "só mais uma partida"
`lib/objectives.ts` calcula, a cada momento, os 1–2 objetivos mais próximos, por prioridade:
1. Missão pronta a reclamar ("Tens uma recompensa à tua espera!").
2. Próximo edifício do mundo ("Faltam N batalhas para desbloquear/terminar X").
3. Próximo nível ("Faltam N XP para o Nível X").

Mostrados na Base e no ecrã de Recompensas — o jogador termina sempre a ver o que falta pouco para conquistar.

## 2. Progressão em múltiplas camadas
Cada batalha avança **vários** medidores ao mesmo tempo, por isso há sempre algo perto de completar:
- XP → Nível
- Moedas → Loja
- Batalhas → Mundo (8 edifícios)
- Acertos por tema → Medalhas/Certificados
- Contadores de missões (dia/semana/mês)
- Coleção (36 itens)
- Troféus (11 marcos)

## 3. Ritmo de recompensa
- **Baú a cada batalha** (nunca vazio), com tier melhor consoante o desempenho.
- **Abertura interativa** (toca para abrir) + explosão de partículas + contadores animados (`CountUp`).
- **Celebrações empilhadas**: subida de nível, medalha, troféu, missão — cada uma com o seu destaque.

## 4. Ligação emocional (o Guardião)
- Saudação ao entrar ("Senti a tua falta!").
- Reação a cada resposta (expressão + balão de fala).
- Celebração nas vitórias ("Estou tão orgulhoso de ti!").
- Encorajamento nos erros ("Errar faz parte de aprender!").
Um companheiro que se personaliza (cosméticos) reforça o vínculo e o desejo de voltar.

## 5. Streak diária
`atualizarStreak` conta dias consecutivos. É apresentada como conquista positiva ("3 dias"), **nunca** como algo que se "perde" com aviso ameaçador.

## 6. Missões pequenas e possíveis
Sempre alcançáveis numa sessão (diárias) ou ao longo do período. Nunca obrigatórias; ignorá-las não penaliza. Reset por período dá razão para voltar amanhã/próxima semana.

## 7. Colecionar + personalizar
Itens raros/épicos/lendários criam aspiração. Equipar o Guardião (chapéus, óculos, capas, asas, efeitos, cores, companheiros) dá expressão pessoal — motivação intrínseca de longo prazo.

## O que NÃO fazemos (anti-manipulação)
- Sem timers de energia/vidas que bloqueiam o jogo.
- Sem "perdeste a tua streak!" dramático.
- Sem loot boxes pagas nem probabilidades escondidas (as chances do baú são sempre visíveis).
- Sem notificações de culpa.
