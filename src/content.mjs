import { existsSync } from 'node:fs';

// Foto da bio: basta salvar o arquivo em assets/img/ com um destes nomes e rodar `node build.mjs`.
const aboutPhoto = ['sobre.webp', 'sobre.jpg', 'sobre.jpeg', 'sobre.png']
  .map((f) => `assets/img/${f}`)
  .find((f) => existsSync(new URL(`../${f}`, import.meta.url))) || '';

// Imagem opcional: devolve o caminho se existir em assets/img/ (webp/jpg/png), senão '' (placeholder).
const optionalImg = (name) =>
  ['webp', 'jpg', 'jpeg', 'png']
    .map((ext) => `assets/img/${name}.${ext}`)
    .find((f) => existsSync(new URL(`../${f}`, import.meta.url))) || '';

// Copy aprovada (consolidada). Etapa 03 altera só a apresentação, nunca o texto.
// Entregáveis e FAQ: copy consolidada recebida em 2026-10-26.

// Marca exibida no rodapé.
export const masthead = {
  brand: ['PARADA', 'TÉCNICA'],
};

// Primeira dobra. Fotos ficam em assets/img/.
export const hero = {
  eyebrow: 'PARADA TÉCNICA | PARA EMPRESÁRIOS',
  headline: 'Você cuida de tantas responsabilidades. Mas há quanto tempo não olha para si mesmo?',
  accent: 'olha para si mesmo?', // trecho final da headline em dourado itálico
  description: [
    'Conheça a Parada Técnica: Uma sessão de três horas com testes psicológicos e biofeedback, e um documento escrito com o que apareceu. Para o empresário que ainda está de pé, mas anda no limite.',
  ],
  cta: 'QUERO FAZER MINHA PARADA TÉCNICA',
  // hero.webp já vem com a faixa creme à esquerda; o enquadramento centraliza a Alessandra.
  // Desktop (≥1200px): hero.webp 1920×753 (creme + foto). Celular e tablet: hero-mobile.webp 1080×1350 (só a foto).
  photo: { src: 'assets/img/hero.webp', srcMobile: 'assets/img/hero-mobile.webp', alt: 'Psicóloga Alessandra Trentin', position: '' }, // enquadramento no CSS (.hero .photo--hero img)
  badge: { name: 'Alessandra Trentin', role: 'Psicóloga · CRP 07/14095', avatar: 'assets/img/avatar.webp' },
};

export const identification = {
  eyebrow: 'PARA QUEM É',
  headline: 'Você continua dando conta de tudo. Mas nem sempre se sente como antes.',
  accent: 'nem sempre se sente como antes.', // trecho final em dourado itálico, como na Hero
  intro: 'Administrar uma empresa exige decisões, responsabilidades e atenção constante. Com o tempo, algumas mudanças podem começar a fazer parte da rotina.',
  signs: [
    { title: 'O descanso já não parece suficiente.', text: 'Mesmo depois de uma noite de sono, a sensação de cansaço continua.' },
    { title: 'As decisões ficaram mais difíceis.', text: 'Assuntos que antes eram resolvidos com facilidade agora exigem um esforço maior.' },
    { title: 'A sobrecarga acompanha você para casa.', text: 'Desligar a mente do trabalho nem sempre é simples.' },
    { title: 'Você sente falta da disposição de antes.', text: 'A empresa continua funcionando, mas você percebe mudanças em si mesmo.' },
  ],
  closing: [
    'Nem sempre é fácil compreender o que está acontecendo enquanto você continua cuidando de tudo.',
    'A Parada Técnica oferece um espaço individual para olhar para essas questões com acompanhamento psicológico profissional.',
  ],
};

export const solution = {
  eyebrow: 'CONHEÇA A PARADA TÉCNICA',
  headline: 'Três horas dedicadas a compreender o que merece sua atenção.',
  accent: 'o que merece sua atenção.',
  description: [
    'A Parada Técnica é uma avaliação psicológica estruturada, conduzida pela psicóloga Alessandra Trentin.',
    'Durante o encontro, são utilizados recursos de avaliação psicológica, incluindo testes e biofeedback cardiovascular, conforme a indicação profissional, para ampliar a compreensão da sua situação.',
    'Após a sessão, você recebe um documento individualizado com os principais pontos avaliados e recomendações para os próximos passos.',
  ],
  highlight: 'Um processo com etapas definidas, sigilo profissional e liberdade para decidir como continuar.',
  cta: 'QUERO RESERVAR MINHA PARADA TÉCNICA',
};

export const steps = {
  eyebrow: 'COMO FUNCIONA',
  headline: 'Simples de começar. Estruturado do início ao fim.',
  accent: 'Estruturado do início ao fim.',
  items: [
    {
      n: '01',
      title: 'Primeiro contato',
      text: ['Garanta sua Parada Técnica pelo link de pagamento. Após a confirmação, a equipe entra em contato pelo WhatsApp para agendar a sessão e orientar sobre os próximos passos.'],
    },
    {
      n: '02',
      title: 'Avaliação individual de 3 horas',
      text: ['Após o agendamento e o preenchimento de um questionário preparatório, acontece a sessão individual com a Alessandra, utilizando os procedimentos adequados à sua situação.'],
    },
    {
      n: '03',
      title: 'Documento e devolutiva',
      text: [
        'Em até 7 dias úteis após a sessão, você recebe um documento com os principais pontos avaliados e as recomendações profissionais. Também está prevista uma conversa para esclarecer o conteúdo.',
        'A partir dessas informações, você e a profissional poderão avaliar a necessidade de acompanhamento adicional.',
      ],
    },
  ],
};

export const deliverables = {
  eyebrow: 'O QUE ESTÁ INCLUÍDO',
  headline: 'O que você recebe com a Parada Técnica?',
  accent: 'com a Parada Técnica?',
  intro: 'Uma avaliação organizada e um documento individualizado para compreender melhor sua situação.',
  items: [
    { title: 'Avaliação psicológica', text: 'Informações obtidas por meio dos procedimentos e instrumentos utilizados na sessão.' },
    { title: 'Compreensão das dificuldades', text: 'Análise profissional dos aspectos relevantes identificados durante a avaliação.' },
    { title: 'Mapeamento de decisões', text: 'Reflexão estruturada sobre dificuldades e decisões que estejam afetando sua rotina.' },
    { title: 'Impactos no dia a dia', text: 'Identificação de possíveis repercussões no trabalho, no descanso e na vida pessoal.' },
    { title: 'Plano de próximos passos', text: 'Orientações individualizadas e eventuais recomendações de acompanhamento.' },
  ],
  closing: 'Você participa ativamente das decisões sobre a continuidade do seu cuidado.',
  cta: 'QUERO MINHA PARADA TÉCNICA',
};

export const about = {
  eyebrow: 'QUEM CONDUZ',
  name: 'Alessandra Mangoni Galves Trentin',
  subtitle: 'Psicóloga clínica | CRP 07/14095',
  photo: { src: aboutPhoto, alt: 'Retrato profissional da psicóloga Alessandra Mangoni Galves Trentin', position: '50% 20%' },
  description: [
    'Com atuação clínica em Farroupilha, Alessandra utiliza recursos da Psicologia, incluindo avaliação psicológica, testes e biofeedback cardiovascular, em seu trabalho profissional.',
    'A Parada Técnica foi estruturada para oferecer uma experiência individual, com etapas definidas, avaliação cuidadosa e devolutiva por escrito.',
  ],
  trust: ['Atendimento individual', 'Sigilo profissional', 'Farroupilha/RS'],
};

export const faq = {
  eyebrow: 'DÚVIDAS',
  cta: 'QUERO GARANTIR MINHA PARADA TÉCNICA',
  headline: 'Perguntas frequentes',
  accent: 'frequentes',
  items: [
    {
      q: 'A Parada Técnica é uma terapia?',
      a: 'É uma avaliação psicológica estruturada, com duração prevista de 3 horas e devolutiva escrita. Caso seja indicado acompanhamento psicológico posterior, as possibilidades serão explicadas individualmente.',
    },
    {
      q: 'Preciso já ter feito terapia?',
      a: 'Não. Você pode entrar em contato mesmo que nunca tenha realizado acompanhamento psicológico.',
    },
    {
      q: 'Como funciona o sigilo?',
      a: 'As informações compartilhadas durante o atendimento são tratadas conforme o sigilo profissional e as regras aplicáveis à proteção dos dados pessoais.',
    },
    {
      q: 'Em quanto tempo recebo o documento?',
      a: 'O prazo previsto é de até 7 dias úteis após a sessão.',
    },
    {
      q: 'Posso fazer a Parada Técnica online?',
      a: '[Confirmar com Alessandra quais procedimentos podem ser realizados online e em quais condições.]',
      pending: true,
    },
  ],
};

// Link de checkout dos botões (vazio = os botões não levam a lugar nenhum).
export const checkout = {
  url: 'https://pay.sumup.com/b2c/QX5EAYO5',
};

// Onde ficam as imagens da página principal (/). Vazio = assets/img/ deste site.
// Preenchido (ex.: 'https://seudominio.com.br'), cada imagem vira <baseUrl>/<nome-do-arquivo>.
// A versão online continua usando assets/img/.
export const imageHost = {
  baseUrl: 'https://psicologaalessandratrentin.com.br/wp-content/uploads/2026/11',
  // Arquivos que estão no WordPress com outro nome (local → WordPress).
  rename: {
    'online-etapa-01-conversa.webp': 'online_etapa_01_conversa.webp',
    'online-etapa-02-testes.webp': 'online_etapa_02_testes.webp',
    'online-etapa-03-aprofundamento.webp': 'online_etapa_03_aprofundamento.webp',
    'online-etapa-04-analise.webp': 'online_etapa_04_analise.webp',
  },
};

export const footer = {
  line: 'Alessandra Mangoni Galves Trentin — Psicóloga — CRP 07/14095',
  city: 'Farroupilha, Rio Grande do Sul',
  disclaimer: 'Esta página apresenta informações gerais sobre um serviço psicológico e não substitui avaliação individualizada.',
};

// ---------------------------------------------------------------------------
// Versão B (/versao-b/): ajustes comerciais. A versão A (raiz e /versao-a/) não usa nada daqui.
// ---------------------------------------------------------------------------

// Condições comerciais centralizadas. Enquanto `confirmed` for false, a página mostra
// placeholders marcados como pendência — nunca valores hipotéticos como se fossem reais.
export const commercial = {
  price: { confirmed: true, value: 'R$ 2.500' },           // confirmado pelo cliente em 2026-10-27
  installments: { confirmed: true, value: 'em até 12x' },  // confirmado (com juros; o cliente pediu para não citar na página)
};

// Vídeo da versão presencial (não listado no YouTube; a versão online não usa).
export const video = {
  id: 'o8AK3dnc5Sc',
  poster: 'assets/img/video-capa.webp', // capa do próprio vídeo (1280×720)
  eyebrow: 'ASSISTA À APRESENTAÇÃO',
  title: 'Entenda a Parada Técnica em poucos minutos.',
  description: 'Assista à explicação e descubra como funciona a Parada Técnica.',
  playLabel: 'Reproduzir vídeo de apresentação da Parada Técnica',
  iframeTitle: 'Vídeo de apresentação da Parada Técnica',
};

export const versionB = {
  // CTAs antes da oferta levam até ela (#investimento); da oferta em diante, direto ao checkout.
  buyCta: 'QUERO FAZER MINHA PARADA TÉCNICA',

  // Revisão de copy da Alessandra (2026-10-30): substitui só os campos listados de cada seção.
  hero: {
    eyebrow: 'PARADA TÉCNICA | PARA EMPRESÁRIOS E EXECUTIVOS',
    // Desktop próprio da Versão B: 1920×882 (a Versão A segue com hero.webp, 1920×753).
    photo: { src: 'assets/img/hero-b.webp', srcMobile: 'assets/img/hero-mobile.webp', alt: 'Psicóloga Alessandra Trentin', position: '' },
    description: [
      'Conheça a Parada Técnica: uma avaliação psicológica estruturada, com preparação online e uma sessão presencial de três horas que reúne entrevista clínica, testes psicológicos e biofeedback cardiovascular, conforme indicação profissional.',
      'Depois, você recebe um documento individualizado com os principais pontos avaliados e orientações para os próximos passos.',
    ],
  },
  identification: {
    intro: 'Liderar pessoas, assumir responsabilidades e tomar decisões importantes exige atenção constante. Com o tempo, algumas mudanças podem começar a fazer parte da rotina, mesmo quando você continua cumprindo todas as suas obrigações.',
    signs: [
      { title: 'O descanso já não parece suficiente.', text: 'Mesmo depois de uma noite de sono, a sensação de cansaço continua.' },
      { title: 'As decisões ficaram mais difíceis.', text: 'Assuntos que antes eram resolvidos com facilidade agora exigem um esforço maior.' },
      { title: 'A sobrecarga acompanha você para casa.', text: 'Desligar a mente do trabalho nem sempre é simples.' },
      { title: 'Você sente falta da disposição de antes.', text: 'As responsabilidades continuam sendo cumpridas, mas você percebe mudanças em si mesmo.' },
    ],
  },
  deliverables: {
    intro: 'Cinco frentes de análise reunidas em um documento individualizado, com informações sobre seu momento atual e orientações para os próximos passos.',
    items: [
      { title: 'Medição com testes psicológicos', text: 'Instrumentos que ajudam a avaliar aspectos relevantes do seu momento atual, conforme as necessidades da avaliação.' },
      { title: 'O que está por trás do sintoma', text: 'Uma interpretação clínica dos fatores que podem estar relacionados às dificuldades que você vem percebendo.' },
      { title: 'O mapa das decisões travadas', text: 'Identificação das decisões que estão difíceis de avançar e dos possíveis obstáculos associados a elas.' },
      { title: 'A conta: quanto isso já custou na sua vida', text: 'Uma análise dos impactos percebidos no trabalho, no sono, na disposição, nas relações e em outras áreas importantes da rotina.' },
      { title: 'O plano escrito para os próximos passos', text: 'Recomendações individualizadas, incluindo possibilidades de acompanhamento ou tratamento, conforme a avaliação profissional.' },
    ],
  },
  about: {
    subtitle: 'Psicóloga Clínica | CRP 07/14095',
    description: [
      'Com atuação clínica em Farroupilha, Alessandra combina entrevista clínica, instrumentos de avaliação psicológica e biofeedback cardiovascular para investigar aspectos relacionados à sobrecarga e às dificuldades percebidas no cotidiano.',
      'A Parada Técnica é uma avaliação individual com etapas definidas, análise integrada das informações e documento escrito em até sete dias úteis após a sessão.',
    ],
  },
  offer: {
    eyebrow: 'SUA PARADA TÉCNICA',
    headline: 'Para quem sente que o corpo e a mente estão no limite e quer entender o que está acontecendo.',
    accent: 'entender o que está acontecendo.',
    description: 'Uma avaliação psicológica individual de três horas, precedida de formulários preparatórios online, com análise integrada das informações, documento escrito e devolutiva para esclarecer os resultados e as recomendações.',
    includedTitle: 'O QUE ESTÁ INCLUÍDO',
    included: [
      'Preparação online por briefing e formulários, além da análise integrada das informações realizada pela Alessandra.',
      'Avaliação psicológica individual de 3 horas, presencial em Farroupilha/RS.',
      'Entrevista clínica, instrumentos psicológicos e biofeedback cardiovascular, conforme indicação profissional.',
      'Documento individualizado com recomendações e plano de próximos passos, em até 7 dias úteis após a sessão.',
      'Devolutiva com a Alessandra para explicar o documento e esclarecer dúvidas.',
    ],
    priceLabel: 'INVESTIMENTO',
    pricePlaceholder: 'R$ [VALOR CONFIRMADO]',
    installmentsPlaceholder: '[CONDIÇÕES DE PARCELAMENTO]',
    cta: 'QUERO MINHA PARADA TÉCNICA',
    microcopy: 'Após a confirmação do pagamento, nossa equipe entrará em contato para encaminhar o agendamento da reunião online de boas-vindas de 20 minutos.',
  },
  // FAQ completo da Versão B. As perguntas atuais continuam; agendamento + pós-compra foram consolidadas.
  faqItems: [
    {
      q: 'A Parada Técnica é uma terapia?',
      a: 'É uma avaliação psicológica estruturada, com duração prevista de 3 horas e devolutiva escrita. Caso seja indicado acompanhamento psicológico posterior, as possibilidades serão explicadas individualmente.',
    },
    {
      q: 'Preciso já ter feito terapia?',
      a: 'Não. Você pode entrar em contato mesmo que nunca tenha realizado acompanhamento psicológico.',
    },
    {
      q: 'Uma única sessão de três horas é suficiente?',
      a: [
        'A Parada Técnica foi estruturada para reunir, em uma avaliação presencial de três horas, diferentes informações sobre seu momento atual. Antes do encontro, você também responde a formulários preparatórios online.',
        'Depois, a Alessandra realiza a análise integrada e prepara o documento individualizado.',
        'Esse processo tem uma proposta de avaliação e orientação. Se houver necessidade de acompanhamento terapêutico posterior, isso será explicado na devolutiva.',
      ],
    },
    {
      q: 'A Parada Técnica inclui hipnose?',
      a: [
        'Não. A Parada Técnica é uma avaliação psicológica estruturada, com entrevista clínica, instrumentos psicológicos e biofeedback cardiovascular, conforme indicação.',
        'A hipnose terapêutica pode fazer parte de um tratamento posterior, caso seja recomendada para sua situação e você decida continuar.',
      ],
    },
    {
      q: 'E se eu quiser continuar o acompanhamento com a Alessandra?',
      a: [
        'Se houver indicação, a Alessandra poderá apresentar uma proposta de acompanhamento terapêutico, com investimento à parte.',
        'Existem duas possibilidades de prosseguir com hipnose terapêutica: uma individual, mais breve, de 3 a 10 encontros; e outra em grupo, com acompanhamento mais longo e contínuo ao longo de alguns meses.',
        '**O acompanhamento posterior é uma nova contratação, não incluída no valor da Parada Técnica.** Caso você decida continuar, o valor investido na Parada Técnica poderá ser abatido do investimento no acompanhamento, conforme as condições apresentadas na proposta.',
        'O formato mais adequado depende do seu caso, e a decisão é sempre sua. A continuidade não é obrigatória.',
      ],
    },
    {
      q: 'Como funciona o sigilo?',
      a: 'As informações compartilhadas durante o atendimento são tratadas conforme o sigilo profissional e as regras aplicáveis à proteção dos dados pessoais.',
    },
    {
      q: 'Qual é o investimento para fazer a Parada Técnica?',
      a: 'O investimento é de R$ 2.500, com possibilidade de pagamento em até 12x. Você pode consultar os detalhes antes de concluir a compra.',
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'Ao clicar no botão de contratação, você será direcionado para uma página de pagamento, onde poderá conferir as condições disponíveis e concluir a compra.',
    },
    {
      q: 'Como faço para agendar e o que acontece depois que eu comprar?',
      a: [
        'Após a confirmação do pagamento, nossa equipe entrará em contato para encaminhar o link de agendamento de uma reunião online de boas-vindas de 20 minutos.',
        'Nesse encontro, você receberá orientações sobre a preparação online e o agendamento da avaliação presencial de três horas.',
        'Depois da avaliação, a Alessandra prepara seu documento individualizado, com os principais pontos avaliados e recomendações profissionais.',
      ],
    },
    {
      q: 'Em quanto tempo recebo o documento?',
      a: 'O prazo previsto é de até 7 dias úteis após a sessão presencial.',
    },
  ],
  finalCta: {
    eyebrow: 'O PRÓXIMO PASSO É SEU',
    headline: 'Você dedica tanto tempo às suas responsabilidades. Que tal reservar três horas para olhar para você?',
    accent: 'olhar para você?',
    subtitle: 'A Parada Técnica oferece um momento individual e estruturado para compreender melhor sua situação e receber orientações profissionais sobre os próximos passos.',
    cta: 'QUERO FAZER MINHA PARADA TÉCNICA',
    microcopy: 'Após a confirmação do pagamento, nossa equipe entrará em contato com as orientações para agendar sua reunião de boas-vindas.',
  },
};

// Versão B — seção única "Como a Parada Técnica acontece na prática" (substitui as seções 3 e 4).
// Imagens: salvar em assets/img/ com o id de cada etapa (ex.: etapa-01-escuta.webp, 16:10)
// e as páginas do documento como documento-01.webp, documento-02.webp (retrato, ~3:4).
export const practice = {
  eyebrow: 'CONHEÇA A PARADA TÉCNICA',
  headline: 'Mais do que uma conversa. Uma avaliação para compreender o que está acontecendo com você.',
  accent: 'compreender o que está acontecendo com você.',
  intro: [
    'A Parada Técnica combina uma preparação online com uma avaliação presencial de três horas.',
    'Durante esse processo, a Alessandra reúne informações da sua história, de instrumentos psicológicos e, quando indicado, do biofeedback cardiovascular, para construir uma compreensão individualizada do seu momento atual.',
  ],
  preparation: {
    title: 'Antes do encontro: uma preparação online',
    text: 'Você recebe links para responder a um briefing e a formulários preparatórios sobre aspectos como ansiedade, humor, sono, alimentação e energia. Essa etapa é realizada online, sem necessidade de agendar uma reunião.',
  },
  stepsTitle: 'Como acontece na prática?',
  steps: [
    {
      id: 'etapa-01-escuta',
      label: '01 · CONVERSA',
      title: 'Entendemos o seu momento',
      text: ['Falamos sobre sua rotina, responsabilidades e o que mudou no trabalho e na vida pessoal.'],
      alt: 'Alessandra Trentin em conversa profissional no ambiente de atendimento',
    },
    {
      id: 'etapa-02-testes',
      label: '02 · TESTES',
      title: 'Investigamos o que a conversa sozinha não mostra',
      text: ['Utilizamos questionários e instrumentos de avaliação psicológica selecionados pela Alessandra conforme as necessidades do seu caso.'],
      alt: 'Materiais profissionais de avaliação psicológica',
    },
    {
      id: 'etapa-03-biofeedback',
      label: '03 · CORPO',
      title: 'Observamos respostas do organismo',
      text: ['Quando indicado, sensores permitem acompanhar respostas cardiovasculares durante a avaliação e relacionar esses registros ao contexto da conversa.'],
      alt: 'Equipamento de biofeedback cardiovascular utilizado na avaliação',
    },
    {
      id: 'etapa-04-analise',
      label: '04 · ANÁLISE',
      title: 'Integramos as informações levantadas',
      text: ['Depois do encontro, a Alessandra analisa em conjunto a entrevista, os testes e os registros do biofeedback, quando utilizado, para elaborar uma interpretação individualizada.'],
      alt: 'Alessandra Trentin organizando as informações da avaliação',
    },
  ].map((step) => ({ ...step, src: optionalImg(step.id) })),
  document: {
    eyebrow: 'O QUE VOCÊ RECEBE',
    headline: 'As informações da sua avaliação, organizadas para orientar os próximos passos.',
    text: [
      'Após o encontro, a Alessandra reúne os resultados dos instrumentos psicológicos, as informações da entrevista clínica e os registros do biofeedback, quando utilizado.',
      'Essa análise é apresentada em um documento individualizado, que ajuda a compreender os aspectos identificados, os possíveis fatores associados às dificuldades e as recomendações profissionais para seguir adiante.',
      'Em até 7 dias úteis após a sessão, você recebe o documento e conta com uma devolutiva para esclarecer o conteúdo e conversar sobre os próximos passos.',
    ],
    deadline: 'ATÉ 7 DIAS ÚTEIS APÓS A SESSÃO',
    pages: ['documento-01', 'documento-02'].map((id) => ({ id, src: optionalImg(id) })),
    exampleLabel: 'Modelo ilustrativo · sem dados reais',
    // Páginas demonstrativas em HTML/CSS: só títulos neutros, sem resultados nem dados de pacientes.
    mockup: {
      brand: 'PARADA TÉCNICA',
      results: {
        title: 'Resultados da Avaliação',
        tableTitle: 'Avaliação psicológica',
        columns: ['Instrumento', 'Aspecto avaliado', 'Interpretação'],
        chartTitle: 'Biofeedback cardiovascular',
      },
      synthesis: {
        title: 'Síntese e Recomendações',
        groups: [
          { title: 'Aspectos identificados', icon: 'search' },
          { title: 'Decisões e impactos', icon: 'signpost' },
          { title: 'Próximos passos', icon: 'arrow' },
        ],
      },
    },
  },
  closing: 'Não é apenas sobre o que você sente. É sobre compreender melhor o que essas informações podem revelar quando são avaliadas em conjunto.',
  cta: 'QUERO RESERVAR MINHA PARADA TÉCNICA',
};

// ---------------------------------------------------------------------------
// Versão 2 — Online (/online/): proposta sujeita à validação da Alessandra.
// Substitui só os campos listados; a página principal (presencial) não usa nada daqui.
// Pendentes: duração da sessão e prazo do documento.
// ---------------------------------------------------------------------------
export const online = {
  title: 'Parada Técnica Online — Alessandra Trentin',

  // Vídeo do topo (mesma seção e textos da presencial; muda só o vídeo e a capa).
  video: { id: 'StpI-m0bp9Y', poster: 'assets/img/video-capa-online.webp' },

  // Funil da online (desde 2026-11-04): sem venda direta. Todos os CTAs abrem o agendamento de uma
  // reunião no Google Agenda, em nova aba; preço e contratação ficam para a conversa comercial.
  // Sem seção de investimento nem checkout nesta versão.
  schedule: {
    url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ0GER3Q9r-Cd6gEwGqULrC5vCWJhCJrV0Dz8c8rcJPvm0b8F3mPzIvNbHDvNGpO9MVX6Z8Qi9CI',
    cta: 'AGENDAR REUNIÃO GRATUITA', // gratuidade confirmada pela cliente em 2026-11-04
  },

  hero: {
    description: [
      'Conheça a Parada Técnica Online: uma avaliação psicológica individual e estruturada, com preparação prévia e um encontro por videoconferência, reunindo entrevista clínica e instrumentos de avaliação psicológica adequados à modalidade remota.',
      'Depois, você recebe um documento individualizado com os principais pontos avaliados e orientações profissionais para os próximos passos.',
    ],
  },

  practice: {
    intro: [
      'A Parada Técnica Online combina formulários preparatórios com uma avaliação psicológica individual por videoconferência.',
      'Durante esse processo, Alessandra reúne informações da sua história, da entrevista clínica e de instrumentos psicológicos adequados ao atendimento remoto, buscando construir uma compreensão individualizada do seu momento atual.',
    ],
    preparation: {
      title: 'Antes do encontro: uma preparação online',
      text: 'Você recebe links para responder a um briefing e a formulários preparatórios sobre aspectos como ansiedade, humor, sono, alimentação e energia. Essa etapa é realizada no seu próprio tempo, sem necessidade de uma reunião adicional.',
    },
    steps: [
      {
        id: 'online-etapa-01-conversa',
        label: '01 · CONVERSA',
        title: 'Entendemos o seu momento',
        text: ['Conversamos por videoconferência sobre sua rotina, responsabilidades e mudanças percebidas no trabalho e na vida pessoal.'],
        alt: 'Alessandra Trentin em conversa por videoconferência',
      },
      {
        id: 'online-etapa-02-testes',
        label: '02 · TESTES',
        title: 'Investigamos aspectos relevantes',
        text: ['Utilizamos questionários e instrumentos psicológicos adequados à modalidade online, selecionados conforme as necessidades da avaliação.'],
        alt: 'Instrumentos de avaliação psicológica adequados à modalidade online',
      },
      {
        id: 'online-etapa-03-aprofundamento',
        label: '03 · APROFUNDAMENTO',
        title: 'Exploramos dificuldades e decisões',
        text: ['Aprofundamos situações que estão afetando sua rotina, identificando aspectos que precisam ser considerados na compreensão das dificuldades relatadas.'],
        alt: 'Reflexão sobre dificuldades e decisões',
        icon: 'signpost',
      },
      {
        id: 'online-etapa-04-analise',
        label: '04 · ANÁLISE',
        title: 'Integramos as informações levantadas',
        text: ['Após o encontro, Alessandra analisa as informações da entrevista e dos instrumentos utilizados, considerando seu contexto individual para elaborar a interpretação e as recomendações profissionais.'],
        alt: 'Alessandra Trentin organizando as informações da avaliação',
      },
    ].map((step) => ({ ...step, src: optionalImg(step.id) })),
    document: {
      ...practice.document,
      text: [
        'Após o encontro online, Alessandra reúne as informações da entrevista clínica e os resultados dos instrumentos psicológicos utilizados na avaliação.',
        'Essa análise é apresentada em um documento individualizado, que ajuda a compreender os aspectos identificados, os possíveis fatores associados às dificuldades e as recomendações profissionais para seguir adiante.',
        'Em até 7 dias úteis após a sessão, você recebe o documento e conta com uma devolutiva para esclarecer o conteúdo e conversar sobre os próximos passos.',
      ],
      deadline: 'ATÉ 7 DIAS ÚTEIS APÓS A SESSÃO', // confirmado pela Alessandra em 2026-11-03
      exampleLabel: 'Ilustrativo · modelo sem dados reais',
      // Mesmo modelo de duas páginas da presencial, sem biofeedback: o gráfico vira um resumo em barras dos instrumentos.
      mockup: {
        ...practice.document.mockup,
        results: { ...practice.document.mockup.results, chartTitle: 'Síntese dos instrumentos', chart: 'bars' },
      },
    },
  },

  deliverables: {
    items: [
      { title: 'Medição com testes psicológicos', text: 'Instrumentos adequados à avaliação remota que ajudam a investigar aspectos relevantes do seu momento atual.' },
      { title: 'O que está por trás do sintoma', text: 'Uma interpretação clínica de fatores que podem estar associados às dificuldades relatadas.' },
      { title: 'O mapa das decisões travadas', text: 'Identificação de decisões que estão difíceis de avançar e de possíveis obstáculos relacionados a elas.' },
      { title: 'A conta: quanto isso já custou na sua vida', text: 'Análise dos impactos percebidos no trabalho, no sono, na disposição, nas relações e em outras áreas importantes da rotina.' },
      { title: 'O plano escrito para os próximos passos', text: 'Recomendações individualizadas e possibilidades de acompanhamento ou tratamento, conforme a avaliação profissional.' },
    ],
  },

  about: {
    description: [
      'Com atuação clínica online e presencial, Alessandra Trentin atende clientes de diferentes partes do Brasil e do mundo, combinando entrevista clínica e instrumentos de avaliação psicológica para investigar aspectos relacionados à sobrecarga emocional e às dificuldades percebidas no cotidiano.',
      'A Parada Técnica é uma avaliação individual, estruturada em etapas definidas, com análise integrada das informações e entrega de um documento escrito em até sete dias úteis após a sessão.',
    ],
    trust: ['Atendimento individual', 'Sigilo profissional', 'Atendimento online'],
    trustIcons: ['person', 'lock', 'video'],
  },

  faqItems: [
    {
      q: 'A Parada Técnica é uma terapia?',
      a: [
        'É uma avaliação psicológica individual e estruturada, que reúne entrevista clínica, instrumentos psicológicos e análise profissional das informações obtidas.',
        'Se houver indicação de acompanhamento terapêutico posterior, as possibilidades serão apresentadas individualmente.',
      ],
    },
    {
      q: 'Preciso já ter feito terapia?',
      a: 'Não. Você pode entrar em contato mesmo que nunca tenha realizado acompanhamento psicológico.',
    },
    {
      q: 'Uma única sessão é suficiente?',
      a: [
        'A Parada Técnica foi estruturada para reunir, em uma avaliação, diferentes informações sobre seu momento atual. Antes do encontro por videoconferência, você também responde a formulários preparatórios online.',
        'Depois, a Alessandra realiza a análise integrada e prepara o documento individualizado.',
        'Esse processo tem uma proposta de avaliação e orientação. Se houver necessidade de acompanhamento terapêutico posterior, isso será explicado na devolutiva.',
      ],
    },
    {
      q: 'A Parada Técnica inclui hipnose?',
      a: [
        'Não. A Parada Técnica é uma avaliação psicológica estruturada, com entrevista clínica e instrumentos psicológicos, conforme indicação.',
        'A hipnose terapêutica pode fazer parte de um tratamento posterior, caso seja recomendada para sua situação e você decida continuar.',
      ],
    },
    {
      q: 'E se eu quiser continuar o acompanhamento com a Alessandra?',
      a: [
        'Se houver indicação, a Alessandra poderá apresentar uma proposta de acompanhamento terapêutico, com investimento à parte.',
        'Existem duas possibilidades de prosseguir com hipnose terapêutica: uma individual, mais breve, de 3 a 10 encontros; e outra em grupo, com acompanhamento mais longo e contínuo ao longo de alguns meses.',
        '**O acompanhamento posterior é uma nova contratação, não incluída no valor da Parada Técnica.** Caso você decida continuar, o valor investido na Parada Técnica poderá ser abatido do investimento no acompanhamento, conforme as condições apresentadas na proposta.',
        'O formato mais adequado depende do seu caso, e a decisão é sempre sua. A continuidade não é obrigatória.',
      ],
    },
    {
      q: 'Como funciona o sigilo?',
      a: 'As informações compartilhadas durante o atendimento são tratadas conforme o sigilo profissional e as regras aplicáveis à proteção dos dados pessoais.',
    },
    {
      q: 'Como faço para agendar uma reunião?',
      a: [
        'Basta clicar em um dos botões de agendamento da página e escolher um horário disponível na agenda. A reunião é gratuita.',
        'Nessa conversa, você poderá conhecer melhor a proposta da Parada Técnica Online, esclarecer dúvidas e receber orientações sobre as condições de contratação e os próximos passos.',
      ],
    },
    {
      q: 'Em quanto tempo recebo o documento?',
      a: 'O prazo previsto é de até 7 dias úteis após a sessão por videoconferência.',
    },
  ],

  finalCta: {
    headline: 'Você dedica tanto tempo às suas responsabilidades. Que tal reservar um momento para olhar para você?',
    subtitle: 'A Parada Técnica Online propõe uma avaliação psicológica individual e estruturada para compreender melhor sua situação e receber orientações profissionais sobre os próximos passos, sem a necessidade de deslocamento até o consultório presencial.',
    cta: 'QUERO MINHA PARADA TÉCNICA',
    microcopy: '', // sem texto pós-pagamento: a online não tem venda direta
  },
};
