// Gera /versao-a e /versao-b a partir dos mesmos componentes. Uso: node build.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Page } from './src/components.mjs';
import { heroVariants } from './src/content.mjs';

const root = dirname(fileURLToPath(import.meta.url));

// Versão curta do conteúdo de cada asset na URL, para o navegador não usar CSS/JS antigo do cache.
const stamp = (file) => createHash('sha1').update(readFileSync(join(root, file))).digest('hex').slice(0, 8);
const versioned = (html) =>
  html
    .replace('../assets/styles.css"', `../assets/styles.css?v=${stamp('assets/styles.css')}"`)
    .replace('../assets/main.js"', `../assets/main.js?v=${stamp('assets/main.js')}"`);

for (const variant of Object.values(heroVariants)) {
  const dir = join(root, `versao-${variant.id}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), versioned(Page(variant)));
  console.log(`ok  /versao-${variant.id}/`);
}
