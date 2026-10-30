// Componentes reutilizáveis: funções puras que recebem conteúdo e devolvem HTML.
// A página é montada em `Page` e gerada por build.mjs.
import * as c from './content.mjs';
import { icon } from './icons.mjs';

// Versão em renderização: 'a' (original, intocada) ou 'b' (ajustes comerciais). Definida por Page().
let variant = 'a';
// Modo apresentação (/apresentacao/): página limpa para o cliente, sem barra de revisão nem itens pendentes.
let presentation = false;
const isB = () => variant === 'b';
// Copy da seção na versão atual: na B, os campos de versionB substituem os da A; a A nunca é afetada.
const copy = (key) => (isB() && c.versionB[key] ? { ...c[key], ...c.versionB[key] } : c[key]);
// Versão B: CTAs anteriores à oferta rolam até ela (mesmo texto); na A seguem para o checkout.
const toOffer = (label) => (isB() ? { label, href: '#investimento' } : { label });

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
// Com `srcMobile`, telas abaixo de 1200px recebem a versão própria para celular/tablet.
export const Photo = ({ src, srcMobile, alt, position }, frame) => {
  if (!src) return PhotoPlaceholder(alt, frame);
  const img = `<img src="${esc(src)}" alt="${esc(alt)}"${position ? ` style="object-position:${position}"` : ''} loading="${frame === 'photo--hero' ? 'eager' : 'lazy'}" decoding="async">`;
  return `<figure class="photo ${frame}${srcMobile ? ' has-mobile' : ''}">${
    srcMobile ? `<picture><source media="(max-width: 1199px)" srcset="${esc(srcMobile)}">${img}</picture>` : img
  }</figure>`;
};

const PhotoPlaceholder = (alt, frame) =>
  `<figure class="photo ${frame} photo--placeholder" role="img" aria-label="Espaço reservado: ${esc(alt)}">
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
      ${Eyebrow(copy('hero').eyebrow, false)}
      <h1 id="hero-title" class="display">${headlineWithAccent(c.hero)}</h1>
      <div class="hero__desc">
        ${paragraphs(copy('hero').description)}
      </div>
      <div class="hero__cta" id="hero-cta">
        ${Button({ ...toOffer(c.hero.cta), variant: 'gold', cta: 'hero', iconBox: 'arrowUpRight' })}
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
<section class="section theme-cream" aria-labelledby="identificacao-title" data-section="02-identificacao">
  <div class="container split">
    <header class="split__head">
      ${Eyebrow(c.identification.eyebrow, false)}
      <h2 id="identificacao-title">${headlineWithAccent(c.identification)}</h2>
      <p class="lead">${esc(copy('identification').intro)}</p>
    </header>
    <div class="split__body">
      <ul class="signs">
        ${copy('identification').signs
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
</section>`;

// Um ícone por parágrafo: quem conduz, recursos usados, documento final.
const solutionIcons = ['person', 'search', 'document'];

export const Solution = () => `
<section class="section theme-cream section--solution section--watermark" aria-labelledby="solucao-title" data-section="03-solucao">
  <div class="container">
    <div class="solution theme-dark">
      <div class="solution__intro">
        ${Eyebrow(c.solution.eyebrow, false)}
        <h2 id="solucao-title">${headlineWithAccent(c.solution)}</h2>
        <p class="solution__highlight">${esc(c.solution.highlight)}</p>
        ${Button({ ...toOffer(c.solution.cta), variant: 'gold', cta: 'solucao', iconBox: 'arrowUpRight' })}
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
  ${Watermark()}
</section>`;

const stepIcons = ['chat', 'clock', 'document'];

export const Steps = () => `
<section class="section theme-warm" aria-labelledby="como-funciona-title" data-section="04-como-funciona">
  <div class="container">
    <header class="steps__head">
      ${Eyebrow(c.steps.eyebrow, false)}
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
      ${Eyebrow(c.deliverables.eyebrow, false)}
      <h2 id="entregaveis-title">${headlineWithAccent(c.deliverables)}</h2>
      <p class="lead">${esc(copy('deliverables').intro)}</p>
    </header>
    <ul class="cards">
      ${copy('deliverables').items
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
    <div class="section-cta">${Button({ ...toOffer(c.deliverables.cta), variant: 'gold', cta: 'entregaveis', iconBox: 'arrowUpRight' })}</div>
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
      ${Eyebrow(c.about.eyebrow, false)}
      <h2 id="sobre-title">${esc(c.about.name)}</h2>
      <p class="about__credential">${esc(copy('about').subtitle)}</p>
      ${paragraphs(copy('about').description)}
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
      ${Eyebrow(c.faq.eyebrow, false)}
      <h2 id="faq-title">${headlineWithAccent(c.faq)}</h2>
    </header>
    <div class="faq">
      ${(isB() ? c.versionB.faqItems : c.faq.items)
        .filter((f) => !(presentation && f.pending))
        .map(
          (f) => `<details class="faq__item">
        <summary><h3>${esc(f.q)}</h3><span class="faq__toggle" aria-hidden="true">${icon('plus', 'faq__icon')}</span></summary>
        <div class="faq__answer">
          ${f.pending ? `<p class="tag">Provisória — pendente de confirmação</p>${Note(f.a)}` : paragraphs([].concat(f.a))}
        </div>
      </details>`
        )
        .join('\n')}
    </div>
    <div class="section-cta">${Button({ label: isB() ? c.versionB.buyCta : c.faq.cta, variant: 'gold', cta: 'faq', iconBox: 'arrowUpRight' })}</div>
  </div>
</section>`;

// ---------- Versão B: "Como a Parada Técnica acontece na prática" (substitui as seções 3 e 4) ----------
const practiceIcons = ['chat', 'clipboard', 'pulse', 'search'];

// Área visual de etapa: foto real quando existir (assets/img/<id>.webp), senão placeholder identificado.
const PracticeVisual = (step, i) =>
  step.src
    ? `<img src="${esc(step.src)}" alt="${esc(step.alt)}" width="1600" height="1000" loading="lazy" decoding="async">`
    : `<div class="practice-card__placeholder" role="img" aria-label="Espaço reservado para imagem: ${esc(step.alt)}" data-placeholder="${esc(step.id)}">
          ${icon(practiceIcons[i], 'icon')}
          <span>Imagem demonstrativa · ${esc(step.id)}</span>
        </div>`;

const DocumentPage = (page, i) =>
  page.src
    ? `<img class="doc-page doc-page--${i + 1}" src="${esc(page.src)}" alt="Página ${i + 1} do documento individualizado (exemplo)" width="900" height="1200" loading="lazy" decoding="async">`
    : `<div class="doc-page doc-page--${i + 1} doc-page--placeholder" data-placeholder="${esc(page.id)}" aria-hidden="true">
          <span class="doc-page__head"></span>
          <span class="doc-page__line"></span><span class="doc-page__line"></span><span class="doc-page__line doc-page__line--short"></span>
          <span class="doc-page__block"></span>
          <span class="doc-page__line"></span><span class="doc-page__line doc-page__line--short"></span>
        </div>`;

export const Practice = () => {
  const p = c.practice;
  const d = p.document;
  return `
<section class="section theme-cream section--practice section--watermark" aria-labelledby="pratica-title" data-section="03-pratica">
  <div class="container">
    <header class="practice__intro">
      <div>
        ${Eyebrow(p.eyebrow, false)}
        <h2 id="pratica-title">${headlineWithAccent(p)}</h2>
      </div>
      <div class="practice__lead">${paragraphs(p.intro)}</div>
    </header>

    <aside class="practice-prep" aria-labelledby="preparacao-title">
      <span class="practice-prep__icon" aria-hidden="true">${icon('clipboard', 'icon')}</span>
      <div>
        <h3 id="preparacao-title">${esc(p.preparation.title)}</h3>
        <p>${esc(p.preparation.text)}</p>
      </div>
    </aside>

    <h3 class="practice__subtitle">${esc(p.stepsTitle)}</h3>
    <ol class="practice__steps">
      ${p.steps
        .map(
          (s, i) => `<li class="practice-card">
        <div class="practice-card__media">
          ${PracticeVisual(s, i)}
          <span class="practice-card__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
        </div>
        <div class="practice-card__body">
          <p class="practice-card__label">${esc(s.label)}</p>
          <h4>${esc(s.title)}</h4>
          ${paragraphs(s.text)}
        </div>
      </li>`
        )
        .join('\n')}
    </ol>

    <div class="practice-doc theme-dark">
      <div class="practice-doc__text">
        ${Eyebrow(d.eyebrow, false)}
        <h3>${esc(d.headline)}</h3>
        ${paragraphs(d.text)}
        <p class="practice-doc__deadline">${icon('calendar', 'icon')}<span>${esc(d.deadline)}</span></p>
      </div>
      <figure class="practice-doc__visual">
        <div class="practice-doc__pages">
          ${d.pages.map(DocumentPage).join('\n')}
        </div>
        <figcaption>${esc(d.exampleLabel)}</figcaption>
      </figure>
    </div>

    <div class="practice__closing">
      <p>${esc(p.closing)}</p>
      ${Button({ label: p.cta, href: '#investimento', variant: 'gold', cta: 'pratica', iconBox: 'arrowUpRight' })}
    </div>
  </div>
  ${Watermark()}
</section>`;
};

// ---------- Versão B ----------

// Valor comercial: mostra o valor confirmado ou um placeholder identificado como pendência.
const commercialValue = ({ confirmed, value }, placeholder, cls) =>
  confirmed && value
    ? `<p class="${cls}">${esc(value)}</p>`
    : `<p class="${cls} is-placeholder"><span>${esc(placeholder)}</span><small class="placeholder-flag">pendente de confirmação</small></p>`;

export const Offer = () => {
  const o = c.versionB.offer;
  const k = c.commercial;
  return `
<section class="section theme-warm section--offer" id="investimento" tabindex="-1" aria-labelledby="oferta-title" data-section="06b-oferta">
  <div class="container">
    <div class="offer theme-dark">
      <div class="offer__intro">
        ${Eyebrow(o.eyebrow, false)}
        <h2 id="oferta-title">${headlineWithAccent(o)}</h2>
        <p class="offer__desc">${esc(o.description)}</p>
      </div>
      <div class="offer__card">
        <p class="offer__price-label">${esc(o.priceLabel)}</p>
        ${commercialValue(k.price, o.pricePlaceholder, 'offer__value')}
        ${commercialValue(k.installments, o.installmentsPlaceholder, 'offer__terms')}
        ${Button({ label: o.cta, variant: 'gold', cta: 'oferta', iconBox: 'arrowUpRight' })}
        <p class="offer__micro">${esc(o.microcopy)}</p>
        <hr class="offer__divider">
        <h3 class="offer__subtitle">${esc(o.includedTitle)}</h3>
        <ul class="offer__list">
          ${o.included.map((t) => `<li><span class="offer__check" aria-hidden="true">${icon('check', 'icon')}</span><span>${esc(t)}</span></li>`).join('\n')}
        </ul>
        
      </div>
    </div>
  </div>
</section>`;
};

export const FinalCta = () => {
  const f = c.versionB.finalCta;
  return `
<section class="section theme-dark section--final" aria-labelledby="final-title" data-section="08-chamada-final">
  <div class="container final">
    ${Eyebrow(f.eyebrow, false)}
    <h2 id="final-title">${headlineWithAccent(f)}</h2>
    <p class="final__subtitle">${esc(f.subtitle)}</p>
    <div class="section-cta">${Button({ label: f.cta, variant: 'gold', cta: 'chamada-final', iconBox: 'arrowUpRight' })}</div>
    <p class="final__micro">${esc(f.microcopy)}</p>
  </div>
</section>`;
};

export const Footer = () => `
<footer class="footer theme-dark" data-section="rodape">
  <div class="container">
    <p class="footer__line">${esc(c.footer.line)}</p>
  </div>
</footer>`;


// Barra de revisão: ferramenta interna para alternar versões. Não faz parte da LP.
export const ReviewBar = () => `
<aside class="review-bar" id="review-bar" aria-label="Barra de revisão">
  <span class="review-bar__title">Revisão</span>
  <nav class="review-bar__versions" aria-label="Versões da página">
    ${[['a', 'Versão A'], ['b', 'Versão B']]
      .map(([v, label]) => `<a href="versao-${v}/"${v === variant ? ' aria-current="page"' : ''}>${label}</a>`)
      .join('')}
  </nav>
  <label class="review-bar__opt"><input type="checkbox" id="toggle-notes" checked> Pendências</label>
  <button type="button" id="hide-review" class="review-bar__close" aria-label="Ocultar barra de revisão">×</button>
</aside>`;

export const Page = (v = 'a', opts = {}) => {
  variant = v;
  presentation = !!opts.presentation;
  return `<!doctype html>
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
<link rel="stylesheet" href="assets/styles.css">${isB() ? '\n<link rel="stylesheet" href="assets/motion.css">' : ''}
</head>
<body${isB() ? ' class="version-b"' : ''}>
<a class="skip-link" href="#conteudo">Ir para o conteúdo</a>
${presentation ? '' : `${ReviewBar()}\n`}<main id="conteudo" tabindex="-1">
${Hero()}
${Identification()}
${isB() ? `${Practice()}\n` : `${Solution()}\n${Steps()}\n`}${Deliverables()}
${About()}
${isB() ? `${Offer()}\n` : ''}${Faq()}
${isB() ? `${FinalCta()}\n` : ''}</main>
${Footer()}
<script src="assets/main.js" defer></script>${isB() ? '\n<script src="assets/motion.js" defer></script>' : ''}
</body>
</html>
`;
};
