# Parada Técnica — Landing page

Sem dependências (só Node). Fontes via Google Fonts (Playfair Display + Raleway).

- `node build.mjs` — gera `index.html` (a página) a partir de `src/`; `/versao-a/` e `/versao-b/` redirecionam para a raiz
- `node serve.mjs` — abre em http://localhost:8094

Estrutura:
- `src/content.mjs` — toda a copy
- `src/components.mjs` — componentes (Hero, seções, Button, Photo, PhotoBadge, StickyCta…)
- `src/icons.mjs` — ícones lineares
- `assets/styles.css` — tokens em `:root` + estilos
- `assets/main.js` — CTAs, barra fixa mobile, formulário demonstrativo, medição simulada
- `assets/img/` — hero.webp (fundo desktop 1920×753) e avatar.webp
- `_etapa-02/` — arquivo do wireframe aprovado

Nunca edite o `index.html` gerado. `?review=0` esconde a barra de revisão.

## Checkout

O formulário foi removido. Os botões (Hero, seção 3 e barra fixa do celular) levam ao link de checkout definido em `src/content.mjs` → `checkout.url`. Link atual: https://pay.sumup.com/b2c/QX5EAYO5. Para trocar, edite e rode `node build.mjs`.

## Versões A e B

- `/` e `/versao-a/` — **Versão A**: página aprovada, sem ajustes comerciais. Estado original marcado na tag Git `versao-a-original`.
- `/versao-b/` — **Versão B**: mesma página + ajustes comerciais (etapa 01 renomeada, seção de oferta, 4 perguntas no FAQ e chamada final).

Tudo sai do mesmo `node build.mjs`, com CSS, JS e imagens compartilhados. O que é só da versão B está em `src/content.mjs` → `versionB` e `commercial`, e nos componentes `Offer` e `FinalCta` de `src/components.mjs`.

### Condições comerciais

Em `src/content.mjs` → `commercial` (só a Versão B usa):
- `price`: **R$ 2.500** (confirmado).
- `installments`: **em até 12x** (confirmado; é com juros, mas o cliente pediu para não citar na página).
- `rebate` (abatimento no protocolo terapêutico posterior): **pendente de confirmação da Alessandra**. Aparece abaixo do botão da oferta com a etiqueta "pendente de confirmação" e some ao desmarcar "Pendências" na barra de revisão. Quando confirmado, mude `confirmed` para `true` (a etiqueta sai e o bloco fica sempre visível).

A barra de revisão (topo) tem os links **Versão A** e **Versão B** para alternar entre as páginas.

### Navegação comercial (só Versão B)

- Botões **antes** da oferta (Hero, solução e entregáveis): "VER INVESTIMENTO E DETALHES" → rolam até `#investimento` (seção de oferta).
- Botões **da oferta em diante** (oferta, FAQ e chamada final): "QUERO FAZER MINHA PARADA TÉCNICA" → checkout SumUp.
- O link direto `/versao-b/#investimento` abre já na seção de oferta.
