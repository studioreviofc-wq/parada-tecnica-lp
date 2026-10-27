// Componentes reutilizáveis: funções puras que recebem conteúdo e devolvem HTML.
// As duas rotas usam exatamente os mesmos componentes; só `Hero` recebe a variante.
import * as c from './content.mjs';
import { icon } from './icons.mjs';

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);

const paragraphs = (list, cls = '') => list.map((p) => `<p${cls ? ` class="${cls}"` : ''}>${esc(p)}</p>`).join('\n');

// Destaque editorial em dourado: aplicado ao nome do serviço sempre que aparece num título,
// por regra única (não por variante), para manter A e B visualmente idênticas.
const accent = (text) => esc(text).replace(/Parada Técnica/g, '<span class="accent">Parada Técnica</span>');

// Pendência de conteúdo: continua visível até ser resolvida (pode ser ocultada pela barra de revisão).
export const Note = (text) => `<p class="pending-note" role="note"><strong>Pendência:</strong> ${esc(text)}</p>`;

export const Button = ({ label, href = '#formulario', variant = 'dark', cta, arrow = false, iconBox = '' }) =>
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

export const Hero = (variant) => `
<section class="hero" aria-labelledby="hero-title" data-section="01-primeira-dobra">
  <div class="hero__grid">
    <div class="hero__text">
      ${Eyebrow(c.hero.eyebrow, false)}
      <h1 id="hero-title" class="display" data-variant-slot="headline">${headlineWithAccent(variant)}</h1>
      <div class="hero__desc" data-variant-slot="description">
        ${paragraphs(variant.description)}
      </div>
      <div class="hero__cta" id="hero-cta">
        ${Button({ label: c.hero.cta, variant: 'gold', cta: 'hero', iconBox: 'arrowUpRight' })}
        <p class="microcopy">${esc(c.hero.microcopy)}</p>
      </div>
    </div>
    <div class="hero__media">
      ${Photo(c.hero.photo, 'photo--hero')}
      <div class="hero__overlay">${PhotoBadge(c.hero.badge)}</div>
    </div>
  </div>
</section>`;

export const Identification = () => `
<section class="section theme-cream" aria-labelledby="identificacao-title" data-section="02-identificacao">
  <div class="container split">
    <header class="split__head">
      <span class="rule" aria-hidden="true"></span>
      <h2 id="identificacao-title">${accent(c.identification.headline)}</h2>
      <p class="lead">${esc(c.identification.intro)}</p>
    </header>
    <div class="split__body">
      <ul class="signs">
        ${c.identification.signs
          .map(
            (s, i) => `<li class="signs__item">
          <span class="signs__n" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
          <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div>
        </li>`
          )
          .join('\n')}
      </ul>
      <div class="closing">
        ${paragraphs(c.identification.closing)}
      </div>
    </div>
  </div>
</section>`;

export const Solution = () => `
<section class="section theme-dark" aria-labelledby="solucao-title" data-section="03-solucao">
  <div class="container container--text solution">
    ${Eyebrow(c.solution.eyebrow)}
    <h2 id="solucao-title">${accent(c.solution.headline)}</h2>
    <div class="solution__body">
      ${paragraphs(c.solution.description)}
    </div>
    <p class="solution__highlight">${esc(c.solution.highlight)}</p>
    ${Button({ label: c.solution.cta, variant: 'champagne', cta: 'solucao', arrow: true })}
  </div>
</section>`;

export const Steps = () => `
<section class="section theme-warm" aria-labelledby="como-funciona-title" data-section="04-como-funciona">
  <div class="container">
    <header class="section__head">
      <span class="rule" aria-hidden="true"></span>
      <h2 id="como-funciona-title">${accent(c.steps.headline)}</h2>
    </header>
    <ol class="steps">
      ${c.steps.items
        .map(
          (s) => `<li class="steps__item">
        <span class="steps__n" aria-hidden="true">${s.n}</span>
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
    <header class="section__head">
      <span class="rule" aria-hidden="true"></span>
      <h2 id="entregaveis-title">${accent(c.deliverables.headline)}</h2>
      <p class="lead">${esc(c.deliverables.intro)}</p>
    </header>
    <ul class="cards">
      ${c.deliverables.items
        .map(
          (d, i) => `<li class="card">
        ${icon(deliverableIcons[i], 'icon card__icon')}
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
<section class="section theme-warm" aria-labelledby="sobre-title" data-section="06-sobre">
  <div class="container about">
    <div class="about__media">
      ${Photo(c.about.photo, 'photo--portrait')}
    </div>
    <div class="about__text">
      ${Eyebrow(c.about.eyebrow)}
      <h2 id="sobre-title">${esc(c.about.name)}</h2>
      <p class="about__credential">${esc(c.about.subtitle)}</p>
      ${paragraphs(c.about.description)}
      <ul class="trust" aria-label="Elementos de confiança">
        ${c.about.trust.map((t, i) => `<li>${icon(trustIcons[i])}<span>${esc(t)}</span></li>`).join('\n')}
      </ul>
      ${Note(c.about.pendingNote)}
    </div>
  </div>
</section>`;

export const Faq = () => `
<section class="section theme-cream" aria-labelledby="faq-title" data-section="07-faq">
  <div class="container split">
    <header class="split__head">
      <span class="rule" aria-hidden="true"></span>
      <h2 id="faq-title">${accent(c.faq.headline)}</h2>
    </header>
    <div class="split__body faq">
      ${c.faq.items
        .map(
          (f) => `<details class="faq__item">
        <summary><h3>${esc(f.q)}</h3><span class="faq__icon" aria-hidden="true"></span></summary>
        <div class="faq__answer">
          ${f.pending ? `<p class="tag">Provisória — pendente de confirmação</p>${Note(f.a)}` : `<p>${esc(f.a)}</p>`}
        </div>
      </details>`
        )
        .join('\n')}
    </div>
  </div>
</section>`;

export const LeadForm = () => `
<section class="section theme-dark section--form" id="formulario" aria-labelledby="form-title" data-section="08-formulario">
  <div class="container form-layout">
    <header class="form-layout__intro">
      <span class="rule" aria-hidden="true"></span>
      <h2 id="form-title" tabindex="-1">${esc(c.form.headline)}</h2>
      ${paragraphs(c.form.text)}
    </header>

    <div class="form-card">
      <p class="demo-banner" role="note">Formulário demonstrativo — nenhum dado é enviado ou armazenado nesta etapa.</p>

      <form id="lead-form" novalidate>
        <div class="form-error-summary" id="form-error-summary" role="alert" tabindex="-1" hidden></div>

        <div class="field" data-field="nome">
          <label for="nome">${esc(c.form.nameLabel)} <span class="field__req">(obrigatório)</span></label>
          <input id="nome" name="nome" type="text" autocomplete="name" autocapitalize="words" placeholder="${esc(c.form.namePlaceholder)}" required aria-describedby="nome-erro">
          <p class="field__error" id="nome-erro" hidden></p>
        </div>

        <div class="field" data-field="whatsapp">
          <label for="whatsapp">${esc(c.form.phoneLabel)} <span class="field__req">(obrigatório)</span></label>
          <input id="whatsapp" name="whatsapp" type="tel" inputmode="numeric" autocomplete="tel-national" placeholder="${esc(c.form.phonePlaceholder)}" maxlength="15" required aria-describedby="whatsapp-dica whatsapp-erro">
          <p class="field__hint" id="whatsapp-dica">Usaremos este número para o primeiro contato.</p>
          <p class="field__error" id="whatsapp-erro" hidden></p>
        </div>

        <fieldset class="field">
          <legend>${esc(c.form.interestLabel)} <span class="field__req">(opcional)</span></legend>
          <div class="choices">
            ${c.form.interests
              .map(
                (opt, i) => `<label class="choice">
              <input type="radio" name="interesse" value="${esc(opt)}" id="interesse-${i + 1}">
              <span>${esc(opt)}</span>
            </label>`
              )
              .join('\n')}
          </div>
        </fieldset>

        <button type="submit" class="btn btn--dark btn--block" id="submit-btn">
          <span class="btn__label">${esc(c.form.cta)}</span>
          <span class="btn__loading" aria-hidden="true">Enviando…</span>
        </button>
        <p class="form-legal">${esc(c.form.microcopy)} <a href="#politica-privacidade">${esc(c.form.privacyLabel)}</a>.</p>
        <p class="visually-hidden" id="form-status" aria-live="polite"></p>
      </form>

      <div class="form-success" id="form-success" hidden>
        <span class="rule" aria-hidden="true"></span>
        <h3 id="success-title" tabindex="-1">Solicitação recebida.</h3>
        <p>A equipe entrará em contato pelo WhatsApp <strong id="success-phone"></strong> para explicar o atendimento e esclarecer suas dúvidas.</p>
        <ol class="next-steps" aria-label="Próximo passo">
          <li>Fique atento à mensagem da equipe no WhatsApp informado.</li>
          <li>Responda quando puder: a conversa serve para explicar o funcionamento e orientar os próximos passos.</li>
        </ol>
        ${Note('Prazo e horário do primeiro contato, nome/número de origem da mensagem e texto final desta confirmação estão pendentes de definição.')}
        <button type="button" class="btn btn--editorial" id="edit-phone"><span>O número está errado? Corrigir dados</span>${icon('arrow', 'btn__arrow')}</button>
      </div>
    </div>
  </div>
</section>`;

export const Footer = () => `
<footer class="footer theme-dark" data-section="rodape">
  <div class="container">
    <p class="masthead__brand footer__brand"><span>${esc(c.masthead.brand[0])}</span> <span class="masthead__gold">${esc(c.masthead.brand[1])}</span></p>
    <p class="footer__line">${esc(c.footer.line)}</p>
    <p>${esc(c.footer.city)}</p>
    <div class="footer__links">
      <div class="footer__ph" id="politica-privacidade" tabindex="-1">
        <h2 class="footer__h">Política de Privacidade</h2>
        <p>[Espaço reservado — texto e link da Política de Privacidade a definir.]</p>
      </div>
      <div class="footer__ph">
        <h2 class="footer__h">Informações de contato</h2>
        <p>[Espaço reservado — informações de contato a confirmar.]</p>
      </div>
    </div>
    <p class="footer__disclaimer">${esc(c.footer.disclaimer)}</p>
  </div>
</footer>`;

// Barra editorial fixa no mobile (inspirada na barra escura da referência).
export const StickyCta = () => `
<div class="sticky-cta theme-dark" id="sticky-cta" aria-hidden="true">
  <a class="sticky-cta__link" href="#formulario" data-cta="sticky-mobile" tabindex="-1">
    <span>${esc(c.hero.cta)}</span>${icon('arrow', 'btn__arrow')}
  </a>
</div>`;

// Barra de revisão: ferramenta interna para alternar versões. Não faz parte da LP.
export const ReviewBar = (variant) => `
<aside class="review-bar" id="review-bar" aria-label="Barra de revisão">
  <span class="review-bar__title">Revisão<span class="review-bar__label"> · ${esc(variant.label)}</span></span>
  <nav class="review-bar__nav" aria-label="Alternar versão">
    <a href="../versao-a/"${variant.id === 'a' ? ' aria-current="page"' : ''}>A</a>
    <a href="../versao-b/"${variant.id === 'b' ? ' aria-current="page"' : ''}>B</a>
  </nav>
  <label class="review-bar__opt"><input type="checkbox" id="toggle-notes" checked> Pendências</label>
  <label class="review-bar__opt"><input type="checkbox" id="simulate-error"> Falha</label>
  <button type="button" id="hide-review" class="review-bar__close" aria-label="Ocultar barra de revisão">×</button>
</aside>`;

export const Page = (variant) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#171411">
<title>Parada Técnica — Versão ${variant.id.toUpperCase()}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&family=Raleway:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="../assets/styles.css">
</head>
<body data-variant="${variant.id}">
<a class="skip-link" href="#formulario">Ir para o formulário</a>
${ReviewBar(variant)}
<main>
${Hero(variant)}
${Identification()}
${Solution()}
${Steps()}
${Deliverables()}
${About()}
${Faq()}
${LeadForm()}
</main>
${Footer()}
${StickyCta()}
<script src="../assets/main.js" defer></script>
</body>
</html>
`;
