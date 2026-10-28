/* Comportamentos da página: CTAs de checkout e barra de revisão.
   Os eventos de medição apenas vão para window.dataLayer. */
(function () {
  'use strict';

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem storage */ } },
  };

  // ---------- Medição (simulada) ----------
  // Evento previsto para a etapa de implementação: cta_click (posição do botão que levou ao checkout).
  window.dataLayer = window.dataLayer || [];
  function track(event, data) {
    var payload = Object.assign({ event: event }, data || {});
    window.dataLayer.push(payload);
    if (window.console) console.info('[wireframe:track]', payload);
  }

  // ---------- CTAs: checkout ----------
  // Enquanto o link de checkout não for definido (src/content.mjs), os botões apontam para
  // "#checkout" e o clique não faz nada além de registrar o evento.
  document.querySelectorAll('a[data-cta]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      track('cta_click', { position: a.dataset.cta });
      if (a.getAttribute('href') === '#checkout') e.preventDefault();
    });
  });

  // ---------- Versão B: CTAs que levam até a oferta (#investimento) ----------
  // Rolagem suave (ou instantânea com prefers-reduced-motion) e foco na seção, para teclado e leitor de tela.
  var offer = document.getElementById('investimento');
  if (offer) {
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var goToOffer = function (smooth) {
      offer.scrollIntoView({ behavior: smooth && !reduceMotion ? 'smooth' : 'auto', block: 'start' });
      offer.focus({ preventScroll: true });
    };
    document.querySelectorAll('a[href="#investimento"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        if (location.hash !== '#investimento') history.pushState(null, '', '#investimento');
        goToOffer(true);
      });
    });
    // Link direto (…/versao-b/#investimento): garante a posição depois que fontes e imagens assentam.
    if (location.hash === '#investimento') {
      window.addEventListener('load', function () { goToOffer(false); });
    }
  }

  // ---------- Barra de revisão ----------
  var bar = document.getElementById('review-bar');
  var notes = document.getElementById('toggle-notes');
  if (!bar || !notes) return; // página de apresentação: sem barra de revisão
  if (store.get('pt-wf-notes') === '0') { notes.checked = false; document.body.classList.add('hide-notes'); }
  notes.addEventListener('change', function () {
    document.body.classList.toggle('hide-notes', !notes.checked);
    store.set('pt-wf-notes', notes.checked ? '1' : '0');
  });
  if (/[?&]review=0/.test(location.search)) bar.hidden = true;
  document.getElementById('hide-review').addEventListener('click', function () { bar.hidden = true; });
})();
