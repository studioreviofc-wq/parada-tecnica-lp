// Componentes reutilizáveis: funções puras que recebem conteúdo e devolvem HTML.
// A página é montada em `Page` e gerada por build.mjs.
import * as c from './content.mjs';
import { icon } from './icons.mjs';

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);

const paragraphs = (list, cls = '') => list.map((p) => `<p${cls ? ` class="${cls}"` : ''}>${esc(p)}</p>`).join('\n');

// Destaque editorial em dourado: aplicado ao nome do serviço sempre que aparece num título.
const accent = (text) => esc(text).replace(/Parada Técnica/g, '<span class="accent">Parada Técnica</span>');

// Pendência de conteúdo: continua visível até ser resolvida (pode ser ocultada pela barra de revisão).
export const Note = (text) => `<p class="pending-note" role="note"><strong>Pendência:</strong> ${esc(text)}</p>`;

const checkoutHref = () => c.checkout.url || '#checkout';

export const Button = ({ label, href = checkoutHref(), variant = 'dark', cta, arrow = false, iconBox = '' }) =>
  `<a class="btn btn--${variant}" href="${href}"${cta ? ` data-cta="${cta}"` : ''}><span>${esc(label)}</span>${arrow ? icon('arrow', 'btn__arrow') : ''}${iconBox ? `<span class="btn__iconbox">${icon(iconBox)}</span>` : ''}</a>`;

// Selo flutuante com nome e registro, sobre a foto da primeira dobra.
export const PhotoBadge = ({ name, role, avatar }) => `
  <div class="photo-badge">
    <span class="photo-badge__avatar">${avatar ? `<img src="${esc(avatar)}" alt="">` : icon('person')}</span>
    <span class="photo-badge__text"><strong>${esc(name)}</strong><span>${esc(role)}</span></span>
  </div>`;

// Foto oficial: com `src` renderiza <img>; sem `src`, um placeholder identificado do mesmo tamanho.
export const Photo = ({ src, alt, position }, frame) =>
  src
    ? `<figure class="photo ${frame}"><img src="${esc(src)}" alt="${esc(alt)}"${position ? ` style="object-position:${position}"` : ''} loading="${frame === 'photo--hero' ? 'eager' : 'lazy'}" decoding="async"></figure>`
    : `<figure class="photo ${frame} photo--placeholder" role="img" aria-label="Espaço reservado: ${esc(alt)}">
    <figcaption class="photo__label">FOTO OFICIAL DA ALESSANDRA<small>${frame === 'photo--hero' ? 'vertical, rosto no terço superior · ocupa a metade direita no desktop' : 'proporção 4:5'}</small></figcaption>
  </figure>`;

export const Eyebrow = (text, rule = true) =>
  `<p class="eyebrow${rule ? ' eyebrow--rule' : ''}">${esc(text)}</p>`;

const headlineWithAccent = ({ headline, accent }) =>
  accent && headline.endsWith(accent)
    ? `${esc(headline.slice(0, -accent.length))}<em class="display__accent">${esc(accent)}</em>`
    : esc(headline);

export const Hero = () => `
<section class="hero" aria-labelledby="hero-title" data-section="01-primeira-dobra">
  <div class="hero__grid">
    <div class="hero__text">
      ${Eyebrow(c.hero.eyebrow, false)}
      <h1 id="hero-title" class="display">${headlineWithAccent(c.hero)}</h1>
      <div class="hero__desc">
        ${paragraphs(c.hero.description)}
      </div>
      <div class="hero__cta" id="hero-cta">
        ${Button({ label: c.hero.cta, variant: 'gold', cta: 'hero', iconBox: 'arrowUpRight' })}
      </div>
    </div>
    <div class="hero__media">
      ${Photo(c.hero.photo, 'photo--hero')}
      <div class="hero__overlay">${PhotoBadge(c.hero.badge)}</div>
    </div>
  </div>
</section>`;

// Marca d'água com o nome do serviço no pé da seção (decorativa).
export const Watermark = (text = 'Parada Técnica', mod = '') =>
  `<p class="watermark${mod ? ` watermark--${mod}` : ''}" aria-hidden="true">${esc(text)}</p>`;

// Um ícone por sinal: cansaço, decisões, sobrecarga em casa, disposição em queda.
const signIcons = ['batteryLow', 'signpost', 'home', 'trendingDown'];

export const Identification = () => `
<section class="section theme-cream section--watermark" aria-labelledby="identificacao-title" data-section="02-identificacao">
  <div class="container split">
    <header class="split__head">
      <h2 id="identificacao-title">${headlineWithAccent(c.identification)}</h2>
      <p class="lead">${esc(c.identification.intro)}</p>
    </header>
    <div class="split__body">
      <ul class="signs">
        ${c.identification.signs
          .map(
            (s, i) => `<li class="sign-card">
          <span class="sign-card__iconbox" aria-hidden="true">${icon(signIcons[i], 'icon sign-card__icon')}</span>
          <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
        </li>`
          )
          .join('\n')}
      </ul>
      <div class="closing-card">
        ${paragraphs(c.identification.closing)}
      </div>
    </div>
  </div>
  ${Watermark()}
</section>`;

// Um ícone por parágrafo: quem conduz, recursos usados, documento final.
const solutionIcons = ['person', 'search', 'document'];

export const Solution = () => `
<section class="section theme-cream section--solution" aria-labelledby="solucao-title" data-section="03-solucao">
  <div class="container">
    <div class="solution theme-dark">
      <div class="solution__intro">
        ${Eyebrow(c.solution.eyebrow, false)}
        <h2 id="solucao-title">${headlineWithAccent(c.solution)}</h2>
        <p class="solution__highlight">${esc(c.solution.highlight)}</p>
        ${Button({ label: c.solution.cta, variant: 'gold', cta: 'solucao', iconBox: 'arrowUpRight' })}
      </div>
      <ul class="solution__list">
        ${c.solution.description
          .map(
            (t, i) => `<li class="solution__item">
          <span class="solution__iconbox" aria-hidden="true">${icon(solutionIcons[i], 'icon')}</span>
          <p>${esc(t)}</p>
        </li>`
          )
          .join('\n')}
      </ul>
    </div>
  </div>
</section>`;

const stepIcons = ['chat', 'clock', 'document'];

export const Steps = () => `
<section class="section theme-warm" aria-labelledby="como-funciona-title" data-section="04-como-funciona">
  <div class="container">
    <header class="steps__head">
      <h2 id="como-funciona-title">${headlineWithAccent(c.steps)}</h2>
    </header>
    <ol class="steps">
      ${c.steps.items
        .map(
          (s, i) => `<li class="step-card${i === 0 ? ' step-card--accent' : ''}">
        <span class="step-card__n" aria-hidden="true">${s.n}</span>
        <div class="step-card__visual" aria-hidden="true"><span class="step-card__icon">${icon(stepIcons[i])}</span></div>
        <h3><span class="visually-hidden">Etapa ${s.n}: </span>${esc(s.title)}</h3>
        ${paragraphs(s.text)}
      </li>`
        )
        .join('\n')}
    </ol>
  </div>
</section>`;

const deliverableIcons = ['clipboard', 'search', 'signpost', 'calendar', 'document'];

export const Deliverables = () => `
<section class="section theme-cream" aria-labelledby="entregaveis-title" data-section="05-entregaveis">
  <div class="container">
    <header class="deliv__head">
      <h2 id="entregaveis-title">${headlineWithAccent(c.deliverables)}</h2>
      <p class="lead">${esc(c.deliverables.intro)}</p>
    </header>
    <ul class="cards">
      ${c.deliverables.items
        .map(
          (d, i) => `<li class="card">
        <span class="card__iconbox" aria-hidden="true">${icon(deliverableIcons[i], 'icon card__icon')}</span>
        <h3>${esc(d.title)}</h3>
        <p>${esc(d.text)}</p>
      </li>`
        )
        .join('\n')}
    </ul>
    <p class="pull">${esc(c.deliverables.closing)}</p>
  </div>
</section>`;


const trustIcons = ['person', 'lock', 'pin'];

export const About = () => `
<section class="section theme-warm section--watermark section--watermark-about" aria-labelledby="sobre-title" data-section="06-sobre">
  <div class="container about">
    <div class="about__media">
      ${Photo(c.about.photo, 'photo--portrait')}
      ${PhotoBadge(c.hero.badge)}
    </div>
    <div class="about__text">
      <h2 id="sobre-title">${esc(c.about.name)}</h2>
      <p class="about__credential">${esc(c.about.subtitle)}</p>
      ${paragraphs(c.about.description)}
      <ul class="trust" aria-label="Elementos de confiança">
        ${c.about.trust.map((t, i) => `<li>${icon(trustIcons[i])}<span>${esc(t)}</span></li>`).join('\n')}
      </ul>
    </div>
  </div>
  ${Watermark(c.hero.badge.name, 'about')}
</section>`;

export const Faq = () => `
<section class="section theme-cream section--faq" aria-labelledby="faq-title" data-section="07-faq">
  <div class="container faq-wrap">
    <header class="faq__head">
      <h2 id="faq-title">${headlineWithAccent(c.faq)}</h2>
    </header>
    <div class="faq">
      ${c.faq.items
        .map(
          (f) => `<details class="faq__item">
        <summary><h3>${esc(f.q)}</h3><span class="faq__toggle" aria-hidden="true">${icon('plus', 'faq__icon')}</span></summary>
        <div class="faq__answer">
          ${f.pending ? `<p class="tag">Provisória — pendente de confirmação</p>${Note(f.a)}` : `<p>${esc(f.a)}</p>`}
        </div>
      </details>`
        )
        .join('\n')}
    </div>
  </div>
</section>`;

export const Footer = () => `
<footer class="footer theme-dark" data-section="rodape">
  <div class="container">
    <p class="footer__line">${esc(c.footer.line)}</p>
  </div>
</footer>`;

// Barra editorial fixa no mobile (inspirada na barra escura da referência).
export const StickyCta = () => `
<div class="sticky-cta theme-dark" id="sticky-cta" aria-hidden="true">
  <a class="sticky-cta__link" href="${checkoutHref()}" data-cta="sticky-mobile" tabindex="-1">
    <span>${esc(c.hero.cta)}</span>${icon('arrow', 'btn__arrow')}
  </a>
</div>`;

// Barra de revisão: ferramenta interna para alternar versões. Não faz parte da LP.
export const ReviewBar = () => `
<aside class="review-bar" id="review-bar" aria-label="Barra de revisão">
  <span class="review-bar__title">Revisão</span>
  <label class="review-bar__opt"><input type="checkbox" id="toggle-notes" checked> Pendências</label>
  <button type="button" id="hide-review" class="review-bar__close" aria-label="Ocultar barra de revisão">×</button>
</aside>`;

export const Page = () => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#171411">
<title>Parada Técnica — Alessandra Trentin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&family=Raleway:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="assets/styles.css">
</head>
<body>
<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
${ReviewBar()}
<main id="conteudo" tabindex="-1">
${Hero()}
${Identification()}
${Solution()}
${Steps()}
${Deliverables()}
${About()}
${Faq()}
</main>
${Footer()}
${StickyCta()}
<script src="assets/main.js" defer></script>
</body>
</html>
`;
