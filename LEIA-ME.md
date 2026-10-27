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

### Condições comerciais (pendentes)

Em `src/content.mjs` → `commercial`:
- `price` e `installments`: enquanto `confirmed: false`, a página mostra `R$ [VALOR CONFIRMADO]` e `[CONDIÇÕES DE PARCELAMENTO]` marcados como "pendente de confirmação". Para publicar, preencha `value` e mude `confirmed` para `true`.
- `rebate` (abatimento no protocolo posterior): enquanto não confirmado, aparece só como pendência, nunca como condição válida.
- A resposta do FAQ sobre investimento também está marcada como pendente.
