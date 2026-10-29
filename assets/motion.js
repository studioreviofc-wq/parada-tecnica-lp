/* Movimento da Versão B: revelação em sequência dos cards com IntersectionObserver.
   - Só roda com suporte a IntersectionObserver e sem prefers-reduced-motion.
   - Cards já visíveis ao carregar não somem; os demais entram uma única vez.
   - O atraso (85ms) é contado dentro de cada lote que entra junto na tela,
     então um card que entra sozinho aparece na hora. */
(function () {
  'use strict';

  var GROUPS = [
    '[data-section="02-identificacao"] .sign-card',
    '[data-section="04-como-funciona"] .step-card',
    '[data-section="05-entregaveis"] .cards > .card',
    '[data-section="03-pratica"] .practice-card',
    '[data-section="03-pratica"] .practice-doc',
  ];
  var STEP = 85;       // ms entre cards do mesmo lote
  var DURATION = 450;  // ms da entrada (igual ao CSS)

  var root = document.documentElement;
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  try {
    var cards = [];
    GROUPS.forEach(function (sel) {
      Array.prototype.push.apply(cards, document.querySelectorAll(sel));
    });
    if (!cards.length) return;

    var inView = function (el) {
      var r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0;
    };

    // Depois da entrada, devolve o card ao estado normal (libera o hover e evita estilo residual).
    var finish = function (el) {
      el.classList.remove('motion-reveal', 'motion-visible');
      el.style.removeProperty('--motion-delay');
    };

    var observer = new IntersectionObserver(function (entries) {
      var batch = entries
        .filter(function (e) { return e.isIntersecting; })
        .map(function (e) { return e.target; })
        .sort(function (a, b) { return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });

      batch.forEach(function (el, i) {
        observer.unobserve(el);
        var delay = i * STEP;
        el.style.setProperty('--motion-delay', delay + 'ms');
        el.classList.add('motion-visible');
        setTimeout(function () { finish(el); }, delay + DURATION + 50);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    cards.forEach(function (el) {
      if (inView(el)) return; // já na tela ao carregar: fica como está
      el.classList.add('motion-reveal');
      observer.observe(el);
    });

    root.classList.add('motion-ready');

    // Segurança: se algo impedir a revelação (ex.: impressão), mostra tudo.
    window.addEventListener('beforeprint', function () {
      cards.forEach(finish);
    });
  } catch (err) {
    root.classList.remove('motion-ready');
    document.querySelectorAll('.motion-reveal').forEach(function (el) {
      el.classList.remove('motion-reveal', 'motion-visible');
    });
  }
})();
