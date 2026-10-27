/* Comportamentos da página: CTAs de checkout, CTA fixo mobile e barra de revisão.
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

  // ---------- CTA fixo no mobile ----------
  // Aparece só depois que o CTA da primeira dobra sai da tela.
  var sticky = document.getElementById('sticky-cta');
  var heroCta = document.getElementById('hero-cta');

  function updateSticky(show) {
    sticky.classList.toggle('is-visible', show);
    sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
    sticky.querySelector('a').tabIndex = show ? 0 : -1;
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      updateSticky(!(entries[0].isIntersecting || entries[0].boundingClientRect.top > 0));
    }).observe(heroCta);
  }
  document.body.classList.add('has-sticky');

  // ---------- Barra de revisão ----------
  var bar = document.getElementById('review-bar');
  var notes = document.getElementById('toggle-notes');
  if (store.get('pt-wf-notes') === '0') { notes.checked = false; document.body.classList.add('hide-notes'); }
  notes.addEventListener('change', function () {
    document.body.classList.toggle('hide-notes', !notes.checked);
    store.set('pt-wf-notes', notes.checked ? '1' : '0');
  });
  if (/[?&]review=0/.test(location.search)) bar.hidden = true;
  document.getElementById('hide-review').addEventListener('click', function () { bar.hidden = true; });
})();
