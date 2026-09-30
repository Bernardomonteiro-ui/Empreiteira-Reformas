import { photos, type Photo } from '@/assets/images';
import { site } from './site';

export type ServiceSlug =
  | 'reforma-completa'
  | 'reforma-de-apartamentos'
  | 'reforma-residencial'
  | 'reforma-comercial'
  | 'gerenciamento-de-obras'
  | 'eletrica-e-hidraulica'
  | 'acabamentos';

export type Service = {
  slug: ServiceSlug;
  name: string;
  /** Uma linha — aparece na lista interativa da home. */
  short: string;
  image: Photo;
  /** Se possui página própria (landing de SEO). */
  page?: ServicePage;
};

export type ServicePage = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  intro: string[];
  scopeTitle: string;
  scope: { title: string; text: string }[];
  audience: string;
  faq: { q: string; a: string }[];
};

const city = site.city;

export const services: Service[] = [
  {
    slug: 'reforma-completa',
    name: 'Reforma completa',
    short: 'Do diagnóstico à entrega das chaves, com uma única equipe responsável por tudo.',
    image: photos.heroSalaIntegrada,
    page: {
      metaTitle: `Reforma completa em ${city} | Planejamento e execução`,
      metaDescription: `Reforma completa com escopo, orçamento e cronograma definidos antes da obra. Uma equipe responsável da demolição ao acabamento em ${city}.`,
      h1: `Reforma completa em ${city}`,
      lead: 'Uma obra inteira, um único responsável. Planejamos, orçamos e executamos cada etapa para que você acompanhe o progresso — não os problemas.',
      intro: [
        'Uma reforma completa envolve dezenas de decisões e diferentes especialidades trabalhando no mesmo espaço: demolição, alvenaria, instalações elétricas e hidráulicas, gesso, impermeabilização, revestimentos, marcenaria e pintura. Quando cada frente é contratada separadamente, o cliente vira o gerente da própria obra.',
        'Na reforma completa, assumimos essa coordenação. Levantamos o imóvel, fechamos o escopo com você, entregamos um orçamento detalhado por etapa e um cronograma realista. Durante a execução, você recebe atualizações periódicas e sabe exatamente o que está sendo feito — e o que vem a seguir.',
      ],
      scopeTitle: 'O que uma reforma completa inclui',
      scope: [
        { title: 'Levantamento técnico', text: 'Medição, verificação de instalações existentes, análise de viabilidade e registro fotográfico do estado atual.' },
        { title: 'Escopo e orçamento por etapa', text: 'Cada serviço descrito, quantificado e precificado. Você entende para onde vai cada parte do investimento.' },
        { title: 'Demolição e infraestrutura', text: 'Remoções, novas alvenarias, instalações elétricas e hidráulicas, impermeabilização e regularização de pisos.' },
        { title: 'Acabamentos', text: 'Gesso, forros, revestimentos, pisos, pintura, louças, metais e instalação de marcenaria.' },
        { title: 'Gestão de fornecedores', text: 'Compras, prazos de entrega e coordenação de todas as equipes dentro do cronograma.' },
        { title: 'Limpeza e entrega', text: 'Vistoria final com checklist, ajustes e entrega do imóvel pronto para uso.' },
      ],
      audience: 'Indicada para quem comprou um imóvel e quer adaptá-lo antes da mudança, para quem vai renovar todos os ambientes de uma vez ou para quem precisa de uma obra com prazo definido.',
      faq: [
        { q: 'Quanto tempo leva uma reforma completa?', a: 'Depende da metragem, do escopo e das regras do condomínio. O prazo é definido no planejamento, antes de a obra começar, e fica registrado no cronograma que você recebe junto com o orçamento.' },
        { q: 'Preciso ter um projeto de arquitetura?', a: 'Não obrigatoriamente. Podemos executar a partir do projeto do seu arquiteto ou ajudar a definir o escopo quando a reforma não exige projeto autoral.' },
        { q: 'Como o orçamento é apresentado?', a: 'Separado por etapas e serviços, com materiais e mão de obra identificados. Assim fica claro o que está incluído e o que pode ser ajustado.' },
        { q: 'Vocês cuidam da documentação junto ao condomínio?', a: 'Orientamos e preparamos o que é necessário para a aprovação da obra, como plano de reforma e responsável técnico, conforme as exigências do seu condomínio.' },
      ],
    },
  },
  {
    slug: 'reforma-de-apartamentos',
    name: 'Reforma de apartamentos',
    short: 'Obras em condomínio com regras, horários e vizinhos — planejadas para não virarem atrito.',
    image: photos.aptoLivingLuz,
    page: {
      metaTitle: `Reforma de apartamento em ${city} | Execução com prazo`,
      metaDescription: `Reforma de apartamento com planejamento, respeito às regras do condomínio e cronograma definido. Obras completas ou parciais em ${city}.`,
      h1: `Reforma de apartamentos em ${city}`,
      lead: 'Reformar um apartamento é trabalhar dentro de regras: horários, elevador de serviço, síndico, vizinhos. Nosso planejamento começa por elas.',
      intro: [
        'A reforma de apartamento tem particularidades que não aparecem em uma casa: normas do condomínio, janela de horário para ruídos, transporte de material por elevador, descarte de entulho e, muitas vezes, a necessidade de um responsável técnico para aprovar a obra.',
        'Organizamos tudo isso antes do primeiro dia. O cronograma considera as restrições do prédio, a logística é combinada com a administração e o canteiro é mantido protegido e limpo. O resultado é uma obra mais previsível — para você e para quem mora ao lado.',
      ],
      scopeTitle: 'O que planejamos em uma reforma de apartamento',
      scope: [
        { title: 'Aprovação no condomínio', text: 'Plano de reforma, documentação técnica e alinhamento com síndico e administração.' },
        { title: 'Integração de ambientes', text: 'Análise de paredes, remoções possíveis e soluções para cozinhas abertas e livings integrados.' },
        { title: 'Cozinhas e banheiros', text: 'Novos pontos hidráulicos, impermeabilização, revestimentos, bancadas, louças e metais.' },
        { title: 'Elétrica e iluminação', text: 'Revisão do quadro, novos circuitos, pontos de tomada e projeto de iluminação executado.' },
        { title: 'Pisos, forros e pintura', text: 'Regularização, assentamento, sancas, rebaixos em gesso e pintura completa.' },
        { title: 'Proteção das áreas comuns', text: 'Proteção de elevadores e corredores, controle de entulho e limpeza diária.' },
      ],
      audience: 'Para apartamentos novos que precisam de personalização, apartamentos antigos com instalações a renovar e imóveis que serão reformados antes da mudança.',
      faq: [
        { q: 'É possível derrubar paredes no apartamento?', a: 'Depende da estrutura do edifício. Antes de qualquer demolição, verificamos plantas e, quando necessário, consultamos um engenheiro estrutural para confirmar o que pode ser removido com segurança.' },
        { q: 'Posso reformar apenas cozinha e banheiros?', a: 'Sim. Executamos reformas parciais com o mesmo cuidado de planejamento de uma obra completa.' },
        { q: 'Como vocês lidam com as regras do condomínio?', a: 'Levantamos o regulamento interno logo no início e montamos o cronograma respeitando horários, dias permitidos e a logística do prédio.' },
        { q: 'Preciso sair do apartamento durante a obra?', a: 'Em reformas completas, recomendamos. Em reformas parciais, é possível planejar etapas para que você continue morando no imóvel.' },
      ],
    },
  },
  {
    slug: 'reforma-residencial',
    name: 'Reforma residencial',
    short: 'Casas que precisam de mais espaço, mais luz ou simplesmente de um novo começo.',
    image: photos.casaNoturna,
    page: {
      metaTitle: `Reforma residencial em ${city} | Casas e sobrados`,
      metaDescription: `Reforma de casas e sobrados: ampliações, novas instalações e acabamentos com orçamento detalhado e cronograma. Atendimento em ${city} e região.`,
      h1: `Reforma residencial em ${city}`,
      lead: 'Casas carregam histórias — e, muitas vezes, instalações antigas, infiltrações e espaços que já não funcionam. Reformamos com respeito ao que fica e rigor no que muda.',
      intro: [
        'A reforma de uma casa costuma revelar o que estava escondido: tubulações antigas, fiação subdimensionada, umidade em paredes e lajes. Por isso nosso trabalho começa com um diagnóstico cuidadoso, que reduz as surpresas durante a obra e protege o seu orçamento.',
        'Executamos desde renovações de ambientes até reformas estruturais e ampliações, coordenando projeto, equipes e fornecedores. Você recebe um cronograma claro e acompanha a evolução da obra com registros periódicos.',
      ],
      scopeTitle: 'Frentes de uma reforma residencial',
      scope: [
        { title: 'Diagnóstico da edificação', text: 'Análise de estrutura, cobertura, instalações e pontos de umidade antes de definir o escopo.' },
        { title: 'Ampliações e novos ambientes', text: 'Novos cômodos, mezaninos e áreas externas, executados conforme projeto aprovado.' },
        { title: 'Coberturas e impermeabilização', text: 'Revisão de telhados, calhas, lajes e tratamento definitivo de infiltrações.' },
        { title: 'Instalações completas', text: 'Substituição de redes elétricas e hidráulicas, aquecimento e preparação para automação.' },
        { title: 'Fachadas e áreas externas', text: 'Revestimentos, esquadrias, muros, pisos externos e integração com paisagismo.' },
        { title: 'Acabamentos internos', text: 'Pisos, revestimentos, forros, pintura, marcenaria e iluminação.' },
      ],
      audience: 'Para casas e sobrados que precisam de modernização, ampliação ou correção de problemas acumulados ao longo dos anos.',
      faq: [
        { q: 'Vocês fazem ampliações?', a: 'Sim, a partir de projeto aprovado. Se ainda não houver projeto, orientamos sobre os profissionais e a documentação necessários.' },
        { q: 'E se aparecer um problema durante a obra?', a: 'O diagnóstico inicial reduz esse risco. Se algo não previsto surgir, apresentamos a situação, as alternativas e o impacto no custo e no prazo antes de seguir.' },
        { q: 'É possível reformar a casa por etapas?', a: 'Sim. Planejamos a sequência de etapas para que o investimento seja distribuído sem comprometer o resultado final.' },
      ],
    },
  },
  {
    slug: 'reforma-comercial',
    name: 'Reforma comercial',
    short: 'Lojas, escritórios e clínicas entregues no prazo que o seu negócio precisa.',
    image: photos.escritorioOpen,
    page: {
      metaTitle: `Reforma comercial e corporativa em ${city}`,
      metaDescription: `Reforma de lojas, escritórios, clínicas e espaços corporativos com cronograma rígido e mínima interrupção da operação. Atendimento em ${city}.`,
      h1: `Reforma comercial e corporativa em ${city}`,
      lead: 'No espaço comercial, cada dia de obra é um dia sem operação. Planejamos para que a reforma termine quando precisa terminar.',
      intro: [
        'Reformas comerciais exigem outro ritmo: prazos amarrados a inaugurações, contratos de locação e agendas de clientes. Também envolvem exigências específicas — normas de acessibilidade, prevenção de incêndio, regras de shoppings e edifícios corporativos.',
        'Trabalhamos com cronograma detalhado, turnos adaptados quando necessário e comunicação direta com o responsável pelo projeto. Executamos lojas, escritórios, consultórios, clínicas e salas corporativas, do layout ao acabamento.',
      ],
      scopeTitle: 'O que entregamos em espaços comerciais',
      scope: [
        { title: 'Adequação de layout', text: 'Divisórias, drywall, forros e redistribuição de ambientes para o novo uso.' },
        { title: 'Infraestrutura técnica', text: 'Elétrica, dados, climatização e hidráulica dimensionadas para a operação.' },
        { title: 'Normas e aprovações', text: 'Execução alinhada às exigências de acessibilidade, bombeiros e regulamentos do edifício ou shopping.' },
        { title: 'Obra fora do horário', text: 'Turnos noturnos ou em fins de semana quando a operação não pode parar.' },
        { title: 'Fachada e comunicação', text: 'Vitrines, fachadas e preparação para a instalação de comunicação visual.' },
        { title: 'Entrega para inauguração', text: 'Limpeza técnica, checklist e ajustes finais em tempo para abrir as portas.' },
      ],
      audience: 'Para lojistas, empresas, profissionais da saúde e gestores de facilities que precisam de uma obra com prazo e custo controlados.',
      faq: [
        { q: 'Vocês trabalham à noite ou nos fins de semana?', a: 'Sim, quando a operação exige. Os turnos são definidos no planejamento e considerados no orçamento.' },
        { q: 'Atendem obras em shopping centers?', a: 'Sim. Seguimos as regras de obra de cada empreendimento, incluindo horários de carga, documentação e vistorias.' },
        { q: 'Executam a partir do projeto do meu arquiteto?', a: 'Sim. Trabalhamos em conjunto com o escritório de arquitetura para garantir que o projeto seja executado com fidelidade.' },
      ],
    },
  },
  {
    slug: 'gerenciamento-de-obras',
    name: 'Gerenciamento de obra',
    short: 'Planejamento, compras, equipes e prazos sob controle — com relatórios que você entende.',
    image: photos.obraEquipeCanteiro,
    page: {
      metaTitle: `Gerenciamento de obras em ${city} | Prazo e custo sob controle`,
      metaDescription: `Gerenciamento de obras e reformas: cronograma, compras, equipes e relatórios periódicos. Controle de prazo e custo do início à entrega em ${city}.`,
      h1: `Gerenciamento de obras em ${city}`,
      lead: 'Uma obra bem gerenciada não é a que não tem imprevistos. É a que sabe exatamente o que fazer quando eles aparecem.',
      intro: [
        'O gerenciamento de obra é a camada que conecta projeto, orçamento e execução. Envolve planejar a sequência das etapas, contratar e coordenar equipes, negociar e acompanhar compras, controlar a qualidade dos serviços e manter o cliente informado.',
        'Oferecemos o gerenciamento como parte das nossas reformas ou como serviço independente, para quem já tem equipes contratadas e precisa de alguém técnico conduzindo a obra. Em ambos os casos, você recebe relatórios claros de avanço físico e financeiro.',
      ],
      scopeTitle: 'O que o gerenciamento cobre',
      scope: [
        { title: 'Cronograma físico-financeiro', text: 'Etapas, dependências e desembolsos planejados antes do início da obra.' },
        { title: 'Suprimentos', text: 'Cotações, compras, prazos de entrega e conferência de materiais.' },
        { title: 'Coordenação de equipes', text: 'Sequenciamento das frentes para evitar retrabalho e tempo ocioso.' },
        { title: 'Controle de qualidade', text: 'Inspeção de cada etapa antes que ela seja coberta pela seguinte.' },
        { title: 'Relatórios periódicos', text: 'Registro fotográfico, avanço físico, custos realizados e próximos passos.' },
        { title: 'Gestão de mudanças', text: 'Toda alteração de escopo documentada, com impacto em prazo e custo aprovado por você.' },
      ],
      audience: 'Para quem não tem tempo de acompanhar a obra, para investidores com mais de um imóvel em reforma e para empresas que precisam de controle e prestação de contas.',
      faq: [
        { q: 'Posso contratar apenas o gerenciamento?', a: 'Sim. Podemos gerenciar uma obra com equipes contratadas por você, assumindo planejamento, coordenação e controle.' },
        { q: 'Com que frequência recebo relatórios?', a: 'A periodicidade é combinada no início — normalmente semanal — e inclui fotos, avanço e custos.' },
        { q: 'Como ficam as mudanças no meio da obra?', a: 'Toda mudança é registrada e apresentada com seu impacto em prazo e custo. Nada é executado sem a sua aprovação.' },
      ],
    },
  },
  {
    slug: 'eletrica-e-hidraulica',
    name: 'Elétrica e hidráulica',
    short: 'O que fica dentro das paredes define a vida útil da reforma. Executamos com projeto e teste.',
    image: photos.instalacoesHidraulicas,
  },
  {
    slug: 'acabamentos',
    name: 'Acabamentos',
    short: 'Paginação, prumo, rejunte, arremate. Os detalhes que você vai ver todos os dias.',
    image: photos.acabamentoRevestimento,
  },
];

export const servicePages = services.filter((s): s is Service & { page: ServicePage } => Boolean(s.page));

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
