# Redesign do Well Cooked — instruções de implementação

Você é um desenvolvedor frontend sênior trabalhando no meu projeto **Well Cooked**, um jogo
educacional em **React + TypeScript** (Create React App, animações com Sprite JS) que ensina
lógica de programação. O jogador monta uma fila de instruções (um algoritmo) para um personagem
chamado **Chef Droid** e depois executa tudo de uma vez. Repositório:
https://github.com/EderMiqueias/well-coocked-app

Quero modernizar o design e corrigir dois problemas de usabilidade reais (apontados num relatório
de avaliação). **Não altere a lógica do jogo nem a mecânica de execução** — o trabalho é de
UI/UX e de refatorar o componente da fila de instruções.

Antes de escrever qualquer código, **leia a estrutura do projeto** (`src/`, componentes de tela,
arquivos de estilo, onde fica o estado da fila de instruções e a definição dos níveis) e me
apresente um plano curto do que vai mudar e em quais arquivos. Só implemente depois que eu aprovar.

---

## 1. Modelo mental do jogo (não viole isto)

- O Chef Droid **não é controlado em tempo real**. O jogador primeiro **monta uma fila de
  instruções**, depois clica em **"Cozinhar!"** e todas as instruções são executadas em sequência.
- Os comandos disponíveis são instruções que se **adicionam à fila**, não controles diretos:
  - **Setas** (cima/baixo/esquerda/direita): mover.
  - **Pegar/Soltar**: é **UMA única instrução** com comportamento dependente de contexto na
    execução — pega o item se a mão estiver vazia, solta se estiver segurando algo. **Não é um
    toggle de estado da interface.** Clicar nele apenas adiciona o bloco à fila, igual às setas.
  - **Aguardar**: instrução de espera.
- **Inserir instrução:** clicar no comando preenche o próximo slot da fila.
- **Editar/remover:** clicar (ou hover + ação) num slot já preenchido remove aquela instrução; os
  passos seguintes recuam uma posição.
- **Limite da fila:** cada nível define um **limite fixo** de instruções (ex.: nível 1 = 14).
  O limite deve vir da configuração do nível, **nunca hardcoded** no componente da fila.
- **Pontuação:** usar **menos** instruções é melhor (é o desafio do jogo). O design deve
  **premiar a economia**, não incentivar encher a fila.

---

## 2. Nova identidade visual (paleta "kitchen tech" dark)

Substituir o coral/salmão chapado atual. Defina estas cores como **CSS custom properties / tokens**
num único lugar (ex.: `:root` num arquivo de tema ou um objeto de tema) e use em todo o app — nada
de hex espalhado pelos componentes.

```
--bg:            #0f1419   /* fundo da página */
--surface:       #1a212b   /* painéis / cards principais */
--surface-2:     #232c38   /* superfícies internas, células, botões secundários */
--border:        #2a3441   /* bordas padrão */
--border-strong: #2f3a48   /* bordas em destaque/hover */

--text:          #f1f5f9   /* texto primário */
--text-muted:    #8b97a6   /* texto secundário / labels */
--text-faint:    #64748b   /* dicas, contadores */

--brand:         #f59e0b   /* âmbar — cor de marca, ação primária, instrução "mão" */
--brand-hover:   #fbbf24
--action:        #10b981   /* verde — só para confirmar (Cozinhar!, Continuar) */
--move:          #93c5fd   /* azul — instruções de movimento (setas) */
--wait:          #a78bfa   /* roxo — instrução Aguardar */
--danger:        #ef4444   /* remover / limite atingido */
```

Princípios:
- **Hierarquia de botões:** ação primária = preenchida com `--brand` e texto escuro
  (`#1a1207`); secundárias = estilo "ghost" (fundo `--surface-2`, borda, texto claro).
  No menu, "Jogar" é primário; "Tutorial" e "Sobre" são secundários.
- **Contraste alto** em todo texto sobre cor (corrige o problema antigo de texto vermelho sobre
  fundo claro sobre salmão).
- Flat: sem gradientes nem sombras decorativas. Bordas de 1px, cantos arredondados (8–16px).
- Reserve o **verde** exclusivamente para confirmação. Não use verde em botões neutros.

---

## 3. Correções de usabilidade

### 3.1 Botão "Pegar/Soltar"
Era o item com pior avaliação porque os usuários não entendiam o que ele faz. Mantenha-o como
**uma instrução única** (ver seção 1), mas:
- Dê a ele cor própria na fila (`--brand`/âmbar) e ícone de "mão" (ex.: ícone grab) — sem
  rotular "pegar" OU "soltar", já que a ação é contextual.
- Garanta que, na **fila**, esse bloco seja visualmente distinto de "mover" e "aguardar"
  (ver 3.3), pra que a sequência de passos seja legível.

### 3.2 Proporção personagem/célula no grid
Os blocos do tabuleiro eram grandes demais (mais que o dobro do personagem), criando a ilusão de
que cada casa exigia dois passos horizontais. Ajuste para que o personagem ocupe a célula de forma
proporcional (alvo: o sprite preenche ~60–70% da célula, centralizado), eliminando essa leitura
ambígua.

### 3.3 Fila de instruções — refatorar para escalar (PRINCIPAL)

A fila atual é fixa em ~14 slots em wrap (várias linhas), o que quebra: com poucos slots sobra
espaço morto, com muitos vira um paredão ilegível. Substitua por uma **trilha horizontal com
scroll**:

Requisitos do novo componente `<InstructionQueue>`:
- Recebe via props: `instructions` (array), `limit` (número, vindo do nível), e callbacks
  `onRemove(index)` / (a inserção continua vindo dos botões de comando).
- **Layout em trilha horizontal única** com `overflow-x: auto` — **altura constante** seja com
  5 ou 100+ instruções. Lê da esquerda pra direita como uma linha do tempo.
- Cada passo preenchido mostra: **número do passo** (1, 2, 3…) e o **ícone** da instrução,
  colorido por tipo: movimento = `--move`, Pegar/Soltar = `--brand`, Aguardar = `--wait`.
- Conectores curtos entre os passos reforçando a sequência.
- **Não renderize slots vazios.** Mostre apenas o **próximo alvo** (slot destacado com `--brand`
  e um "+") e um resumo textual do restante (ex.: `+85 livres`). Isso mantém a tela limpa em
  qualquer escala.
- **Remover:** clicar num passo (ou hover revelando um X em `--danger`) remove a instrução; os
  seguintes recuam.
- **Auto-scroll** para o fim da trilha ao adicionar uma instrução.
- Botão **"Limpar"** para zerar a fila.

Medidor de orçamento (acima ou junto da fila):
- Mostra `usadas de {limit} instruções`.
- Barra/medidor que funciona **ao contrário de uma barra de progresso**: fica **verde quando a
  fila está enxuta** e esquenta para âmbar e depois vermelho conforme se aproxima do limite.
  Sugestão de faixas: ≤50% do limite = verde ("fila enxuta — ótima pontuação"); ≤80% = âmbar
  ("dá pra otimizar"); >80% ou no limite = vermelho ("perto do limite").
- Quando `usadas === limit`, desabilitar os comandos de adicionar.
- (Opcional, só se os níveis passarem de ~50 passos) botões "ir ao início / ir ao fim" da trilha.

---

## 4. Telas a atualizar

Aplique a nova paleta e hierarquia em todas, mantendo o conteúdo/textos atuais:
1. **Menu inicial** — título, subtítulo curto, "Jogar" (primário) + "Tutorial" e "Sobre"
   (secundários). Mascotes nas laterais.
2. **Níveis disponíveis** — cards de nível com a nova paleta; nível bloqueado em estado
   desabilitado claro.
3. **Gameplay** — header com voltar / nome do nível / timer; grid à esquerda; painel de receita
   + botão "Cozinhar!" (verde) à direita; fila + comandos no rodapé (ver seção 3).
4. **Modal de vitória** — ícone de sucesso, "Receita pronta!", e stats (tempo restante e nº de
   instruções usadas), botão "Continuar".

---

## 5. Restrições e qualidade

- **Não** mude a lógica de execução da fila, regras dos níveis, nem a integração com Sprite JS.
- Centralize cores e espaçamentos em tokens; nada de valores mágicos repetidos.
- Componentes tipados (TypeScript), props explícitas, sem `any`.
- Reaproveite componentes existentes quando fizer sentido em vez de duplicar.
- Garanta que a tela de gameplay caiba sem precisar de zoom out em monitores menores (era uma
  queixa do relatório) — layout responsivo.
- Acessibilidade básica: `aria-label` em botões só-ícone, foco visível, contraste adequado.

Comece lendo o projeto e me devolvendo o plano de mudanças por arquivo. Aguarde minha aprovação
antes de editar.

<!-- SPECKIT START -->
## Active Feature Plan

**Feature**: Well Cooked UI/UX Redesign
**Plan**: [specs/001-ui-ux-redesign/plan.md](specs/001-ui-ux-redesign/plan.md)
**Spec**: [specs/001-ui-ux-redesign/spec.md](specs/001-ui-ux-redesign/spec.md)
**Tasks**: [specs/001-ui-ux-redesign/tasks.md](specs/001-ui-ux-redesign/tasks.md) *(generated by /speckit-tasks)*
<!-- SPECKIT END -->
