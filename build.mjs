// Gera a landing page a partir dos componentes. Uso: node build.mjs
// Saída: / (Versão 1 Presencial) e /online/ (Versão 2 Online, em revisão).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Page } from './src/components.mjs';
import { imageHost } from './src/content.mjs';
import { buildElementor } from './elementor.mjs';

const root = dirname(fileURLToPath(import.meta.url));

// Versão curta do conteúdo de cada asset na URL, para o navegador não usar CSS/JS antigo do cache.
const stamp = (file) => createHash('sha1').update(readFileSync(join(root, file))).digest('hex').slice(0, 8);
const versioned = (html) =>
  html
    .replace('assets/styles.css"', `assets/styles.css?v=${stamp('assets/styles.css')}"`)
    .replace('assets/main.js"', `assets/main.js?v=${stamp('assets/main.js')}"`)
    .replace('assets/motion.css"', `assets/motion.css?v=${stamp('assets/motion.css')}"`)
    .replace('assets/motion.js"', `assets/motion.js?v=${stamp('assets/motion.js')}"`)
    .replace('assets/video.css"', `assets/video.css?v=${stamp('assets/video.css')}"`)
    .replace('assets/video.js"', `assets/video.js?v=${stamp('assets/video.js')}"`)
    .replace('assets/compat.css"', `assets/compat.css?v=${stamp('assets/compat.css')}"`)
    .replace('assets/compat.js"', `assets/compat.js?v=${stamp('assets/compat.js')}"`)
    .replace(/assets\/img\/([\w.-]+)"/g, (m, f) => `assets/img/${f}?v=${stamp(`assets/img/${f}`)}"`);

// Página principal (a aprovada pela cliente, antes em /apresentacao/). Sem barra de revisão.
const main = () => Page('b', { presentation: true });
// Com imageHost.baseUrl preenchido, as imagens saem da hospedagem: <baseUrl>/<arquivo>, sem ?v=.
const base = imageHost.baseUrl.replace(/\/+$/, '');
const hosted = (html) => (base ? html.replace(/assets\/img\/([\w.-]+)\?v=\w+"/g, (m, f) => `${base}/${f}"`) : html);
const mainHtml = hosted(versioned(main()));
writeFileSync(join(root, 'index.html'), mainHtml);
console.log('ok  /             (página principal)');
// Mesma página em um bloco só, para o widget HTML do Elementor (precisa das imagens hospedadas).
if (base) {
  buildElementor(root, mainHtml);
  console.log('ok  elementor/parada-tecnica-elementor.html');
}

// Versão 2 Online: mesma estrutura e os mesmos CSS/JS/imagens (só os caminhos sobem um nível).
const nested = (html) => html.replace(/(href|src|srcset)="assets\//g, '$1="../assets/');
mkdirSync(join(root, 'online'), { recursive: true });
writeFileSync(join(root, 'online', 'index.html'), nested(versioned(Page('b', { presentation: true, online: true }))));
console.log('ok  /online/      (versão 2 online)');

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
