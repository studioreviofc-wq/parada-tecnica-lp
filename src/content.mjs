import { existsSync } from 'node:fs';

// Foto da bio: basta salvar o arquivo em assets/img/ com um destes nomes e rodar `node build.mjs`.
const aboutPhoto = ['sobre.webp', 'sobre.jpg', 'sobre.jpeg', 'sobre.png']
  .map((f) => `assets/img/${f}`)
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
  photo: { src: 'assets/img/hero.webp', alt: 'Psicóloga Alessandra Trentin', position: '' }, // enquadramento no CSS (.hero .photo--hero img)
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
  price: { confirmed: false, value: '' },          // ex.: 'R$ 2.500' — só preencher com valor confirmado
  installments: { confirmed: false, value: '' },   // ex.: 'em até 10x no cartão' — idem
  rebate: {
    confirmed: false,
    text: 'Se você decidir continuar o acompanhamento: o valor investido na Parada Técnica poderá ser abatido do protocolo posterior, conforme as condições confirmadas pela Alessandra.',
  },
};

export const versionB = {
  stepOneTitle: 'Confirme sua Parada Técnica',
  offer: {
    eyebrow: 'SUA PARADA TÉCNICA',
    headline: 'Um primeiro passo para compreender o que está acontecendo e decidir como seguir.',
    description: 'Reserve três horas para uma avaliação psicológica individual, com testes, biofeedback cardiovascular conforme indicação profissional e um documento escrito com orientações para os próximos passos.',
    includedTitle: 'O que está incluído:',
    included: [
      'Avaliação individual de 3 horas.',
      'Recursos de avaliação psicológica, conforme indicação profissional.',
      'Documento individualizado em até 7 dias úteis.',
      'Devolutiva para esclarecer os resultados e as recomendações.',
    ],
    priceLabel: 'INVESTIMENTO',
    pricePlaceholder: 'R$ [VALOR CONFIRMADO]',
    installmentsPlaceholder: '[CONDIÇÕES DE PARCELAMENTO]',
    cta: 'QUERO FAZER MINHA PARADA TÉCNICA',
    microcopy: 'Pagamento pelo checkout. Após a confirmação, a equipe entra em contato para orientar o agendamento.',
  },
  faqExtra: [
    {
      q: 'Qual é o investimento para fazer a Parada Técnica?',
      a: 'O investimento é de R$ [VALOR CONFIRMADO], com possibilidade de pagamento [CONDIÇÕES CONFIRMADAS]. Você pode consultar os detalhes antes de concluir a compra.',
      pending: true, // depende de commercial.price e commercial.installments
    },
    {
      q: 'Como funciona o pagamento?',
      a: 'Ao clicar no botão de contratação, você será direcionado para uma página de pagamento, onde poderá conferir as condições disponíveis e concluir a compra.',
    },
    {
      q: 'Como faço para agendar minha sessão?',
      a: 'Após a confirmação do pagamento, nossa equipe entrará em contato pelo WhatsApp para orientar o agendamento e o preenchimento do questionário preparatório.',
    },
    {
      q: 'O que acontece depois que eu comprar?',
      a: 'Você receberá as orientações para agendar sua avaliação individual de 3 horas. Após a sessão, será preparado um documento com os principais pontos avaliados e recomendações profissionais, com entrega prevista em até 7 dias úteis.',
    },
  ],
  finalCta: {
    eyebrow: 'O PRÓXIMO PASSO É SEU',
    headline: 'Você já dedica tanto tempo à sua empresa. Que tal reservar três horas para olhar para você?',
    accent: 'olhar para você?',
    subtitle: 'A Parada Técnica oferece um momento individual e estruturado para compreender melhor sua situação e receber orientações profissionais sobre os próximos passos.',
    cta: 'QUERO FAZER MINHA PARADA TÉCNICA',
    microcopy: 'Após o pagamento, nossa equipe entrará em contato para orientar o agendamento.',
  },
};
