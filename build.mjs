// Gera a landing page a partir dos componentes. Uso: node build.mjs
// Saída: / (versão A), /versao-a/ (versão A) e /versao-b/ (versão B, com ajustes comerciais).
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

// Raiz = versão A (página aprovada; continua sendo o endereço principal).
writeFileSync(join(root, 'index.html'), versioned(Page('a')));
console.log('ok  /            (versão A)');

// Rotas de comparação: mesma base de CSS/JS/imagens, só os caminhos sobem um nível.
const nested = (html) => html.replace(/(href|src)="(assets|versao-[ab])\//g, '$1="../$2/');
for (const [dir, v] of [['versao-a', 'a'], ['versao-b', 'b']]) {
  mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(join(root, dir, 'index.html'), nested(versioned(Page(v))));
  console.log(`ok  /${dir}/   (versão ${v.toUpperCase()})`);
}
