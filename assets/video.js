/* Player da versão presencial: troca a capa pelo iframe do YouTube só depois do clique.
   - Sem API do YouTube: um iframe simples resolve.
   - Sem permissão de tela cheia: o vídeo fica dentro da página sempre que o navegador permitir. */
(function () {
  'use strict';

  var player = document.querySelector('.video__player');
  if (!player) return;
  var trigger = player.querySelector('.video__trigger');
  var status = player.querySelector('.video__status');
  var WAIT = 8000; // ms até mostrar o player mesmo sem o evento load (rede lenta ou bloqueador)

  // Capa que não carregou: fica o fundo escuro com o botão de reprodução, sem ícone de imagem quebrada.
  var poster = trigger.querySelector('img');
  var hidePoster = function () { poster.hidden = true; };
  poster.addEventListener('error', hidePoster);
  if (poster.complete && !poster.naturalWidth && poster.currentSrc) hidePoster();

  trigger.addEventListener('click', function () {
    var params = 'autoplay=1&playsinline=1&rel=0&fs=0';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(player.dataset.videoId) + '?' + params;
    iframe.title = player.dataset.videoTitle;
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin'; // o YouTube recusa a incorporação sem referrer
    iframe.setAttribute('playsinline', '');

    var shown = false;
    var reveal = function () {
      if (shown) return;
      shown = true;
      var hadFocus = document.activeElement === trigger;
      trigger.remove();
      player.classList.remove('is-loading');
      status.textContent = '';
      if (hadFocus) iframe.focus();
    };

    player.classList.add('is-loading');
    status.textContent = 'Carregando vídeo';
    iframe.addEventListener('load', reveal);
    setTimeout(reveal, WAIT);
    player.appendChild(iframe); // dentro do clique, para o navegador reconhecer o gesto do visitante
  }, { once: true });
})();
