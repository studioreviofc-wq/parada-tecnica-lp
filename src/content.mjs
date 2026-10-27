// Copy aprovada (consolidada). Etapa 03 altera só a apresentação, nunca o texto.
// Entregáveis e FAQ: copy consolidada recebida em 2026-10-26.

// A única diferença entre as variantes: headline + descrição da primeira dobra.
export const heroVariants = {
  a: {
    id: 'a',
    label: 'Versão A — Acolhimento',
    headline: 'Você cuida de tantas responsabilidades. Mas há quanto tempo não olha para si mesmo?',
    accent: 'olha para si mesmo?', // trecho final em dourado itálico (mesma regra nas duas versões)
    description: [
      'Conheça a Parada Técnica: Uma sessão de três horas com testes psicológicos e biofeedback, e um documento escrito com o que apareceu. Para o empresário que ainda está de pé, mas anda no limite.',
    ],
  },
  b: {
    id: 'b',
    label: 'Versão B — Dor empresarial',
    headline: 'Sua empresa continua funcionando. Mas você sente que já não consegue tomar decisões como antes?',
    accent: 'tomar decisões como antes?',
    description: [
      'Anos de responsabilidades, pressão e decisões importantes podem afetar seu bem-estar, sua disposição e até a maneira como você conduz o negócio.',
      'A Parada Técnica é uma avaliação psicológica estruturada de 3 horas, criada para ajudar empresários a compreender essas dificuldades e identificar os próximos passos.',
    ],
  },
};

// Cabeçalho editorial: nome do serviço + linha de credencial da copy consolidada.
export const masthead = {
  brand: ['PARADA', 'TÉCNICA'],
  credential: 'Psicóloga Alessandra Trentin | CRP 07/14095',
};

// Fotos: quando a foto oficial chegar, basta preencher `src` (ex.: '../assets/img/alessandra-hero.jpg').
export const hero = {
  eyebrow: 'PARADA TÉCNICA | PARA EMPRESÁRIOS',
  cta: 'QUERO ENTENDER COMO FUNCIONA',
  microcopy: 'Preencha um formulário rápido e receba as informações pelo WhatsApp.',
  photo: { src: '', alt: 'Psicóloga Alessandra Trentin', position: '50% 25%' },
  badge: { name: 'Alessandra Trentin', role: 'Psicóloga · CRP 07/14095', avatar: '' },
};

export const identification = {
  headline: 'Você continua dando conta de tudo. Mas nem sempre se sente como antes.',
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
  description: [
    'A Parada Técnica é uma avaliação psicológica estruturada, conduzida pela psicóloga Alessandra Trentin.',
    'Durante o encontro, são utilizados recursos de avaliação psicológica, incluindo testes e biofeedback cardiovascular, conforme a indicação profissional, para ampliar a compreensão da sua situação.',
    'Após a sessão, você recebe um documento individualizado com os principais pontos avaliados e recomendações para os próximos passos.',
  ],
  highlight: 'Um processo com etapas definidas, sigilo profissional e liberdade para decidir como continuar.',
  cta: 'QUERO CONHECER A PARADA TÉCNICA',
};

export const steps = {
  headline: 'Simples de começar. Estruturado do início ao fim.',
  items: [
    {
      n: '01',
      title: 'Primeiro contato',
      text: ['Preencha um formulário rápido com seus dados. A equipe entra em contato pelo WhatsApp para explicar o funcionamento da Parada Técnica e orientar sobre os próximos passos.'],
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
  headline: 'O que você recebe com a Parada Técnica?',
  intro: 'Uma avaliação organizada e um documento individualizado para compreender melhor sua situação.',
  items: [
    { title: 'Avaliação psicológica', text: 'Informações obtidas por meio dos procedimentos e instrumentos utilizados na sessão.' },
    { title: 'Compreensão das dificuldades', text: 'Análise profissional dos aspectos relevantes identificados durante a avaliação.' },
    { title: 'Mapeamento de decisões', text: 'Reflexão estruturada sobre dificuldades e decisões que estejam afetando sua rotina.' },
    { title: 'Impactos no dia a dia', text: 'Identificação de possíveis repercussões no trabalho, no descanso e na vida pessoal.' },
    { title: 'Plano de próximos passos', text: 'Orientações individualizadas e eventuais recomendações de acompanhamento.' },
  ],
  closing: 'Você participa ativamente das decisões sobre a continuidade do seu cuidado.',
};

export const about = {
  eyebrow: 'QUEM CONDUZ A PARADA TÉCNICA',
  name: 'Alessandra Mangoni Galves Trentin',
  subtitle: 'Psicóloga clínica | CRP 07/14095',
  photo: { src: '', alt: 'Retrato profissional da psicóloga Alessandra Mangoni Galves Trentin', position: '50% 20%' },
  description: [
    'Com atuação clínica em Farroupilha, Alessandra utiliza recursos da Psicologia, incluindo avaliação psicológica, testes e biofeedback cardiovascular, em seu trabalho profissional.',
    'A Parada Técnica foi estruturada para oferecer uma experiência individual, com etapas definidas, avaliação cuidadosa e devolutiva por escrito.',
  ],
  trust: ['Atendimento individual', 'Sigilo profissional', 'Farroupilha/RS'],
  pendingNote: 'Inserir tempo de experiência e formação complementar após validação da cliente.',
};

export const faq = {
  headline: 'Perguntas frequentes',
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

export const form = {
  headline: 'Reserve um momento para olhar para você.',
  text: [
    'Se você deseja compreender melhor a Parada Técnica e descobrir como ela funciona, preencha seus dados abaixo.',
    'A equipe entrará em contato pelo WhatsApp para explicar o atendimento e esclarecer suas dúvidas.',
  ],
  nameLabel: 'Nome',
  namePlaceholder: 'Seu nome completo',
  phoneLabel: 'WhatsApp',
  phonePlaceholder: 'Seu número com DDD',
  interestLabel: 'Qual é o seu principal interesse?',
  interests: [
    'Entender melhor como funciona',
    'Saber valores e disponibilidade',
    'Conversar sobre minha situação',
  ],
  cta: 'QUERO RECEBER AS INFORMAÇÕES',
  microcopy: 'Seus dados serão utilizados para responder à sua solicitação de contato, conforme a',
  privacyLabel: 'Política de Privacidade',
};

export const footer = {
  line: 'Alessandra Mangoni Galves Trentin — Psicóloga — CRP 07/14095',
  city: 'Farroupilha, Rio Grande do Sul',
  disclaimer: 'Esta página apresenta informações gerais sobre um serviço psicológico e não substitui avaliação individualizada.',
};
