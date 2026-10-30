# Parada Técnica — Landing page

Sem dependências (só Node). Fontes via Google Fonts (Playfair Display + Raleway).

- `node build.mjs` — gera `index.html` (a página) a partir de `src/`, `/versao-2/` e o redirecionamento de `/apresentacao/`
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

## Páginas

- `/` — **página principal** (a aprovada pela cliente, antes em `/apresentacao/`).
- `/versao-2/` — **versão 2**: duplicata da principal, para ajustes pontuais.
- `/apresentacao/` — só redireciona para `/`, porque esse link já foi enviado à cliente.

As antigas `/versao-a/` e `/versao-b/` foram excluídas. Pontos de recuperação no Git: tags `versao-a-original` (página aprovada antes dos ajustes comerciais) e `antes-pagina-principal` (estado anterior a esta mudança).

### Condições comerciais

Em `src/content.mjs` → `commercial` (só a Versão B usa):
- `price`: **R$ 2.500** (confirmado).
- `installments`: **em até 12x** (confirmado; é com juros, mas o cliente pediu para não citar na página).

A barra de revisão (topo) tem os links **Versão A** e **Versão B** para alternar entre as páginas.

### Navegação comercial

- Botões **antes** da oferta (Hero, solução e entregáveis): mesmos textos da Versão A → rolam até `#investimento` (seção de oferta).
- Botões **da oferta em diante** (oferta, FAQ e chamada final): "QUERO FAZER MINHA PARADA TÉCNICA" → checkout SumUp.
- O link direto `/#investimento` abre já na seção de oferta.

### Movimento

`assets/motion.css` + `assets/motion.js`, carregados nas páginas atuais:
- Revelação em sequência (opacidade 0→1, sobe 14px, 450ms, 85ms entre cards) nos cards das seções 2 (sinais), 4 (etapas) e 5 (entregáveis), uma única vez, via IntersectionObserver.
- Hover discreto (sobe 3px + sombra) nesses cards, só com mouse.
- Sem JS, sem IntersectionObserver ou com "reduzir movimento" ativo, tudo aparece normalmente, sem animação.

### Seção "Como a Parada Técnica acontece na prática"

Substitui as antigas seções 3 (Conheça) e 4 (Como funciona). Conteúdo em `src/content.mjs` → `practice`.
Imagens (opcionais — enquanto não existirem, aparecem placeholders identificados):
- Etapas (16:10, ex. 1600×1000): `assets/img/etapa-01-escuta.webp`, `etapa-02-testes.webp`, `etapa-03-biofeedback.webp`, `etapa-04-analise.webp`.
- Documento (retrato 3:4, ex. 900×1200): `assets/img/documento-01.webp`, `documento-02.webp`.
Basta salvar o arquivo com o nome certo e rodar `node build.mjs`. Ponto de recuperação anterior: tag `antes-secao-pratica`.

### Revisão de copy da Alessandra (2026-10-30)

A copy da Versão B fica em `src/content.mjs` → `versionB` (substitui só os campos listados) e `practice`. A Versão A não usa esses campos. Ponto de recuperação: tag `antes-revisao-copy`.
