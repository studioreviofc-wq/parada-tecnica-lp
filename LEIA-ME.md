# Parada Técnica — Landing page (Etapa 03: UI editorial)

Sem dependências (só Node). Fontes via Google Fonts (Playfair Display + Inter).

- `node build.mjs` — gera `versao-a/index.html` e `versao-b/index.html` a partir de `src/`
- `node serve.mjs` — abre em http://localhost:8094 (`/versao-a/`, `/versao-b/`)

Estrutura:
- `src/content.mjs` — toda a copy (única diferença A/B: `heroVariants`)
- `src/components.mjs` — componentes (Masthead, Hero, seções, Button, Photo, StickyCta…)
- `src/icons.mjs` — ícones lineares
- `assets/styles.css` — tokens em `:root` + estilos
- `assets/main.js` — CTAs, barra fixa mobile, formulário demonstrativo, medição simulada
- `_etapa-02/` — arquivo do wireframe aprovado

Foto oficial: coloque o arquivo em `assets/img/` e preencha `photo.src` em `hero` e `about` (content.mjs); depois `node build.mjs`.
Nunca edite os HTML gerados. `?review=0` esconde a barra de revisão.
