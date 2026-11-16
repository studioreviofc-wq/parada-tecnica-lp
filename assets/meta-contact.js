// Parada Técnica Online: evento "Contact" do pixel da Meta no clique dos botões de WhatsApp.
// O pixel (base) é instalado pelo Código Personalizado do Elementor; aqui só se usa o fbq que já existe.
// Sem pixel na página (GitHub Pages, bloqueador de anúncios), o clique segue normal e nada é enviado.
document.addEventListener('click', (e) => {
  const link = e.target.closest && e.target.closest('a[data-cta][href^="https://wa.me/"]');
  if (!link || typeof window.fbq !== 'function') return;
  window.fbq('track', 'Contact', { content_name: 'Parada Técnica Online', cta: link.dataset.cta });
});
