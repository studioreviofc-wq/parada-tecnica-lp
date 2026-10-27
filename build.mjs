// Gera a landing page (index.html na raiz) a partir dos componentes. Uso: node build.mjs
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
    .replace('assets/main.js"', `assets/main.js?v=${stamp('assets/main.js')}"`);

writeFileSync(join(root, 'index.html'), versioned(Page()));
console.log('ok  /');

// Endereços antigos do teste A/B levam para a página única.
const redirect = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="robots" content="noindex">
<meta http-equiv="refresh" content="0; url=../"><link rel="canonical" href="../">
<title>Parada Técnica</title><script>location.replace('../' + location.search + location.hash)</script>
</head><body><a href="../">Ir para a página</a></body></html>
`;
for (const old of ['versao-a', 'versao-b']) {
  mkdirSync(join(root, old), { recursive: true });
  writeFileSync(join(root, old, 'index.html'), redirect);
  console.log(`ok  /${old}/ → /`);
}
