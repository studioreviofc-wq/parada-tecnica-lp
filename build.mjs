// Gera a landing page a partir dos componentes. Uso: node build.mjs
// Saída: / (página principal) e /versao-2/ (duplicata para o ajuste da versão 2).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Page } from './src/components.mjs';

const root = dirname(fileURLToPath(import.meta.url));

// Versão curta do conteúdo de cada asset na URL, para o navegador não usar CSS/JS antigo do cache.
const stamp = (file) => createHash('sha1').update(readFileSync(join(root, file))).digest('hex').slice(0, 8);
const versioned = (html) =>
  html
    .replace('assets/styles.css"', `assets/styles.css?v=${stamp('assets/styles.css')}"`)
    .replace('assets/main.js"', `assets/main.js?v=${stamp('assets/main.js')}"`)
    .replace('assets/motion.css"', `assets/motion.css?v=${stamp('assets/motion.css')}"`)
    .replace('assets/motion.js"', `assets/motion.js?v=${stamp('assets/motion.js')}"`)
    .replace(/assets\/img\/([\w.-]+)"/g, (m, f) => `assets/img/${f}?v=${stamp(`assets/img/${f}`)}"`);

// Página principal (a aprovada pela cliente, antes em /apresentacao/). Sem barra de revisão.
const main = () => Page('b', { presentation: true });
writeFileSync(join(root, 'index.html'), versioned(main()));
console.log('ok  /             (página principal)');

// Versão 2: duplicata da principal, com os mesmos CSS/JS/imagens (só os caminhos sobem um nível).
const nested = (html) => html.replace(/(href|src|srcset)="assets\//g, '$1="../assets/');
mkdirSync(join(root, 'versao-2'), { recursive: true });
writeFileSync(join(root, 'versao-2', 'index.html'), nested(versioned(main())));
console.log('ok  /versao-2/    (versão 2)');

// O link enviado à cliente continua funcionando: leva para a página principal.
const redirect = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=../"><link rel="canonical" href="../">
<title>Parada Técnica</title><script>location.replace('../' + location.search + location.hash)</script>
</head><body><a href="../">Ir para a página</a></body></html>
`;
mkdirSync(join(root, 'apresentacao'), { recursive: true });
writeFileSync(join(root, 'apresentacao', 'index.html'), redirect);
console.log('ok  /apresentacao/ → /');
