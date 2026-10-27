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
