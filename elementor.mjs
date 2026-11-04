// Versão da página principal em um único bloco HTML, para colar no widget "HTML" do Elementor.
// Uso: node build.mjs (chama este arquivo) → elementor/parada-tecnica-elementor.html (presencial)
// e elementor/parada-tecnica-online-elementor.html (online).
// - CSS e JS ficam embutidos; as imagens já saem com o domínio de imageHost.baseUrl.
// - Todo o CSS é prefixado com #pt, para o tema e o kit do Elementor não sobrescreverem
//   fontes e cores, e para o CSS da página não vazar para o resto do site.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT_ID = '#pt';

// Prefixa um seletor. :root/body viram o próprio #pt; classes que o JS põe no <html> ficam antes dele.
const prefixSelector = (sel) => {
  const s = sel.trim();
  if (/^html\b/.test(s)) return s; // rolagem suave e ajuste de texto: valem para a página inteira
  if (s === ':root' || s === 'body') return ROOT_ID;
  if (/^body[.:\[]/.test(s)) return ROOT_ID + s.slice(4);
  if (s.startsWith('.motion-ready')) return s.replace('.motion-ready', `.motion-ready ${ROOT_ID}`);
  if (s.startsWith('.version-b')) return ROOT_ID + s; // a classe fica no próprio wrapper
  return `${ROOT_ID} ${s}`;
};

// Uma declaração por linha, para o CSS colado no Elementor ficar legível.
const declarations = (body, pad = '') =>
  body
    .split(/;(?![^(]*\))/)
    .map((d) => d.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .map((d) => `${pad}  ${d};\n`)
    .join('');

// Percorre o CSS regra a regra (o CSS do projeto é simples: sem strings com chaves).
const scopeCss = (css) => {
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  let out = '';
  let i = 0;
  const walk = (inKeyframes, pad = '') => {
    while (i < css.length) {
      const open = css.indexOf('{', i);
      const close = css.indexOf('}', i);
      if (close !== -1 && (open === -1 || close < open)) { out += `${pad.slice(2)}}\n`; i = close + 1; return; }
      if (open === -1) { out += css.slice(i); i = css.length; return; }
      const head = css.slice(i, open).trim();
      i = open + 1;
      if (head.startsWith('@media') || head.startsWith('@supports') || head.startsWith('@container')) {
        out += `${pad}${head} {\n`; walk(false, `${pad}  `);
      } else if (head.startsWith('@keyframes')) {
        out += `${pad}${head} {\n`; walk(true, `${pad}  `);
      } else {
        const end = css.indexOf('}', i);
        const body = css.slice(i, end);
        i = end + 1;
        const selector = inKeyframes ? head : head.split(',').map(prefixSelector).join(', ');
        out += `${pad}${selector} {\n${declarations(body, pad)}${pad}}\n`;
      }
    }
  };
  walk(false);
  return out;
};

export const buildElementor = (root, html, file = 'parada-tecnica-elementor.html') => {
  const read = (f) => readFileSync(join(root, f), 'utf8');
  // Neutraliza o que temas (Hello, Astra…) e o kit do Elementor costumam pôr nos elementos da página.
  // Especificidade (1,0,0): ganha do tema e perde para qualquer regra da página (todas vêm depois).
  // Só devolve os valores padrão do navegador; o visual continua vindo do CSS da página.
  const reset = `/* ---------- Proteção contra estilos do tema ---------- */
${ROOT_ID} {
  display: block;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  text-align: left;
}
${ROOT_ID} :where(div,section,header,footer,article,aside,nav,figure,details,summary,ul,ol,li,blockquote,hr) {
  background-color: transparent;
  background-image: none;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  float: none;
}
${ROOT_ID} :where(figure,blockquote,details,summary) { margin: 0; }
${ROOT_ID} :where(ul,ol) { list-style: none; margin: 0; }
${ROOT_ID} :where(p,li,span,strong,em,small,summary,label,figcaption,blockquote) {
  color: inherit;
  font-family: inherit;
  letter-spacing: inherit;
  text-transform: inherit;
}
${ROOT_ID} :where(h1,h2,h3,h4) {
  letter-spacing: inherit;
  text-transform: inherit;
  text-shadow: none;
}
${ROOT_ID} :where(img) {
  border: 0;
  border-radius: 0;
  box-shadow: none;
  max-width: 100%;
  height: auto;
}
${ROOT_ID} :where(a,button) {
  text-transform: inherit;
  letter-spacing: inherit;
  text-shadow: none;
  text-decoration: inherit;
}
${ROOT_ID} :where(button,button:hover,button:focus) {
  background: none;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  min-height: 0;
  font: inherit;
  color: inherit;
  white-space: normal;
  text-align: inherit;
  transition: none;
}
${ROOT_ID} :where(a:hover,a:focus) { color: inherit; }

`;
  const css = reset + ['assets/styles.css', 'assets/motion.css', 'assets/video.css', 'assets/compat.css']
    .map((f) => `/* ---------- ${f} ---------- */\n${scopeCss(read(f))}`)
    .join('\n');
  const js = ['assets/main.js', 'assets/motion.js', 'assets/video.js', 'assets/compat.js'].map(read).join('\n');

  const body = html
    .slice(html.indexOf('>', html.indexOf('<body')) + 1, html.indexOf('<script'))
    .replace(/<a class="skip-link"[^>]*>.*?<\/a>\n?/, '')
    .replace('<main id="conteudo" tabindex="-1">', '<div id="conteudo">') // o tema já tem o próprio <main>
    .replace('</main>', '</div>')
    .trim();
  if (/(src|srcset|href)="assets\//.test(body)) throw new Error('Elementor: há caminho local (assets/) no HTML; preencha imageHost.baseUrl.');

  const fonts = html.match(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^>]*>/)[0];
  const out = `<!-- Parada Técnica — página completa para o widget HTML do Elementor. Gerado por node build.mjs; não edite à mão. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
<style>
${css}</style>
<div id="pt" class="version-b">
${body}
</div>
<script>
${js}</script>
`;
  mkdirSync(join(root, 'elementor'), { recursive: true });
  writeFileSync(join(root, 'elementor', file), out);
};
