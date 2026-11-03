/* Plano B do modelo de documento (ver compat.css): só roda onde o navegador não entende cqw. */
(function () {
  'use strict';

  if (window.CSS && CSS.supports && CSS.supports('width', '1cqw')) return;
  var docs = document.querySelectorAll('.doc-mock');
  if (!docs.length) return;

  // 1cqw = 1% da largura interna (sem padding) do contêiner.
  var measure = function (el) {
    var cs = getComputedStyle(el);
    var w = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    if (w > 0) el.style.setProperty('--u', (w / 100) + 'px');
  };
  var all = function () { Array.prototype.forEach.call(docs, measure); };

  all();
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(all);
    Array.prototype.forEach.call(docs, function (el) { ro.observe(el); });
  } else {
    window.addEventListener('resize', all);
  }
  window.addEventListener('load', all); // fontes e imagens assentadas
})();
