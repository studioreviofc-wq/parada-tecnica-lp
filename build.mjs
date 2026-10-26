// Gera /versao-a e /versao-b a partir dos mesmos componentes. Uso: node build.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Page } from './src/components.mjs';
import { heroVariants } from './src/content.mjs';

const root = dirname(fileURLToPath(import.meta.url));

for (const variant of Object.values(heroVariants)) {
  const dir = join(root, `versao-${variant.id}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), Page(variant));
  console.log(`ok  /versao-${variant.id}/`);
}
