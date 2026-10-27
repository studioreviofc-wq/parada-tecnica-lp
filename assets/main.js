/* Comportamentos da página: CTAs, CTA fixo mobile, formulário demonstrativo e barra de revisão.
   Nenhum dado é enviado: o envio é simulado e os eventos de medição apenas vão para window.dataLayer. */
(function () {
  'use strict';

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sem storage */ } },
  };

  // ---------- Medição (simulada) ----------
  // Eventos previstos para a etapa de implementação: cta_click, form_start, form_validation_error,
  // form_submit, form_submit_success, form_submit_error. Abandono = form_start sem form_submit_success.
  window.dataLayer = window.dataLayer || [];
  function track(event, data) {
    var payload = Object.assign({ event: event }, data || {});
    window.dataLayer.push(payload);
    if (window.console) console.info('[wireframe:track]', payload);
  }

  var form = document.getElementById('lead-form');
  var formSection = document.getElementById('formulario');
  var formTitle = document.getElementById('form-title');
  var nome = document.getElementById('nome');
  var whatsapp = document.getElementById('whatsapp');
  var summary = document.getElementById('form-error-summary');
  var submitBtn = document.getElementById('submit-btn');
  var status = document.getElementById('form-status');
  var success = document.getElementById('form-success');

  // ---------- CTAs: âncora + foco no formulário ----------
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href="#formulario"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (a.dataset.cta) track('cta_click', { position: a.dataset.cta });
      e.preventDefault();
      formSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      // Foco no título (não no campo) para não abrir o teclado do celular de surpresa.
      formTitle.focus({ preventScroll: true });
      history.replaceState(null, '', '#formulario');
    });
  });

  // ---------- CTA fixo no mobile ----------
  // Aparece só depois que o CTA da primeira dobra sai da tela, e some quando o formulário
  // está visível, quando um campo está em foco (teclado aberto) ou após o envio.
  var sticky = document.getElementById('sticky-cta');
  var heroCta = document.getElementById('hero-cta');
  var heroVisible = true, formVisible = false, typing = false, done = false;

  function updateSticky() {
    var show = !heroVisible && !formVisible && !typing && !done;
    sticky.classList.toggle('is-visible', show);
    sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
    sticky.querySelector('a').tabIndex = show ? 0 : -1;
  }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting || entries[0].boundingClientRect.top > 0;
      updateSticky();
    }).observe(heroCta);
    new IntersectionObserver(function (entries) {
      formVisible = entries[0].isIntersecting;
      updateSticky();
    }, { rootMargin: '0px 0px -10% 0px' }).observe(formSection);
  }
  document.body.classList.add('has-sticky');
  document.addEventListener('focusin', function (e) {
    typing = e.target.matches('input, textarea, select'); updateSticky();
  });
  document.addEventListener('focusout', function () {
    setTimeout(function () { typing = document.activeElement && document.activeElement.matches('input, textarea, select'); updateSticky(); }, 0);
  });

  // ---------- Formulário demonstrativo ----------
  var started = false;
  form.addEventListener('input', function () {
    if (!started) { started = true; track('form_start'); }
  });

  function digits(v) { return v.replace(/\D/g, ''); }

  // Máscara (00) 00000-0000 / (00) 0000-0000
  whatsapp.addEventListener('input', function () {
    var d = digits(whatsapp.value).slice(0, 11);
    var out = d;
    if (d.length > 2) out = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 6) {
      var split = d.length === 11 ? 7 : 6;
      out = '(' + d.slice(0, 2) + ') ' + d.slice(2, split) + '-' + d.slice(split);
    }
    whatsapp.value = out;
    if (whatsapp.closest('.field').classList.contains('is-invalid')) validateField(whatsapp);
  });
  nome.addEventListener('input', function () {
    if (nome.closest('.field').classList.contains('is-invalid')) validateField(nome);
  });

  var rules = {
    nome: function (v) {
      v = v.trim();
      if (!v) return 'Informe seu nome.';
      if (v.length < 2) return 'O nome precisa ter pelo menos 2 letras.';
      return '';
    },
    whatsapp: function (v) {
      var d = digits(v);
      if (!d) return 'Informe seu WhatsApp com DDD.';
      if (d.length < 10 || d.length > 11) return 'Confira o número: são 2 dígitos de DDD e 8 ou 9 do telefone.';
      if (+d.slice(0, 2) < 11 || d[0] === '0' || d[1] === '0') return 'Confira o DDD informado.';
      if (d.length === 11 && d[2] !== '9') return 'Celulares com 11 dígitos começam com 9 depois do DDD.';
      return '';
    },
  };

  function validateField(input) {
    var msg = rules[input.name](input.value);
    var field = input.closest('.field');
    var err = document.getElementById(input.id + '-erro');
    field.classList.toggle('is-invalid', !!msg);
    field.classList.toggle('is-valid', !msg && input.value.trim() !== '');
    input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    err.textContent = msg;
    err.hidden = !msg;
    return msg;
  }

  [nome, whatsapp].forEach(function (input) {
    input.addEventListener('blur', function () { if (input.value.trim()) validateField(input); });
  });

  function setLoading(on) {
    submitBtn.setAttribute('aria-busy', on ? 'true' : 'false');
    submitBtn.disabled = on;
    status.textContent = on ? 'Enviando sua solicitação.' : '';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    summary.hidden = true;
    var errors = [nome, whatsapp]
      .map(function (input) { return { input: input, msg: validateField(input) }; })
      .filter(function (r) { return r.msg; });

    if (errors.length) {
      track('form_validation_error', { fields: errors.map(function (r) { return r.input.name; }) });
      summary.innerHTML = '<p>Corrija ' + (errors.length > 1 ? 'os campos' : 'o campo') + ' abaixo para continuar:</p><ul>' +
        errors.map(function (r) { return '<li><a href="#' + r.input.id + '">' + r.msg + '</a></li>'; }).join('') + '</ul>';
      summary.hidden = false;
      summary.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function (ev) { ev.preventDefault(); document.querySelector(a.getAttribute('href')).focus(); });
      });
      errors[0].input.focus();
      return;
    }

    track('form_submit');
    setLoading(true);
    var fail = document.getElementById('simulate-error').checked;
    setTimeout(function () {
      setLoading(false);
      if (fail) {
        track('form_submit_error');
        summary.innerHTML = '<p>Não foi possível enviar agora. Seus dados continuam preenchidos: tente novamente em instantes.</p>' +
          '<p class="pending-note" role="note"><strong>Pendência:</strong> canal alternativo de contato em caso de falha a definir.</p>';
        summary.hidden = false;
        summary.focus();
        return;
      }
      track('form_submit_success', { interesse: (form.interesse.value || null) });
      document.getElementById('success-phone').textContent = whatsapp.value;
      form.hidden = true;
      success.hidden = false;
      done = true; updateSticky();
      document.getElementById('success-title').focus();
    }, 1200);
  });

  document.getElementById('edit-phone').addEventListener('click', function () {
    success.hidden = true;
    form.hidden = false;
    done = false;
    whatsapp.focus();
    whatsapp.select();
  });

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
