import { photos, type Photo } from '@/assets/images';
import type { ServiceSlug } from './services';
import { site } from './site';

/**
 * Portfólio.
 *
 * ⚠️ PLACEHOLDER: os projetos abaixo são EXEMPLOS de estrutura e texto.
 * Nomes, metragens, prazos, localizações e fotografias devem ser substituídos
 * por obras reais executadas pela empresa. Enquanto `sample: true`, um selo
 * de placeholder aparece no layout (ver `site.showPlaceholderMarkers`).
 */

export type GalleryPhase = 'antes' | 'durante' | 'depois';

export type Project = {
  slug: string;
  name: string;
  type: string;
  location: string;
  area: number; // m²
  duration: string;
  year: string;
  services: ServiceSlug[];
  cover: Photo;
  summary: string;
  challenge: string;
  solution: string;
  highlights: string[];
  gallery: { phase: GalleryPhase; photo: Photo; caption: string }[];
  sample: boolean;
};

export const projects: Project[] = [
  {
    slug: 'apartamento-jardins',
    name: 'Apartamento Jardins',
    type: 'Reforma completa',
    location: `Jardins — ${site.city}`,
    area: 92,
    duration: '[XX] semanas',
    year: '[ANO]',
    services: ['reforma-completa', 'reforma-de-apartamentos'],
    cover: photos.aptoSalaEstar,
    summary: 'Um apartamento dos anos 1980 reorganizado para uma rotina contemporânea: living integrado, cozinha aberta e instalações inteiramente novas.',
    challenge: 'Planta compartimentada, instalações elétricas originais e um condomínio com janela de obra restrita a seis horas por dia. Os proprietários precisavam se mudar em data fixa.',
    solution: 'Levantamento completo antes da demolição, verificação estrutural das paredes a remover e um cronograma montado sobre as restrições do prédio. Elétrica e hidráulica refeitas por inteiro; marcenaria fabricada em paralelo à obra civil para ganhar prazo.',
    highlights: ['Integração de cozinha e living', 'Quadro elétrico e circuitos novos', 'Marcenaria fabricada em paralelo'],
    gallery: [
      { phase: 'antes', photo: photos.obraDemolicao, caption: 'Levantamento e remoção das paredes não estruturais.' },
      { phase: 'durante', photo: photos.obraCorteMadeira, caption: 'Peças de madeira preparadas enquanto a obra civil avançava.' },
      { phase: 'depois', photo: photos.aptoSalaEstar, caption: 'Living integrado com luz natural em toda a extensão.' },
      { phase: 'depois', photo: photos.aptoLivingLuz, caption: 'Estar com esquadrias preservadas e novo piso.' },
    ],
    sample: true,
  },
  {
    slug: 'casa-patio',
    name: 'Casa Pátio',
    type: 'Reforma residencial',
    location: `[BAIRRO] — ${site.city}`,
    area: 240,
    duration: '[XX] meses',
    year: '[ANO]',
    services: ['reforma-residencial', 'gerenciamento-de-obras'],
    cover: photos.casaFachadaMadeira,
    summary: 'Uma casa térrea voltada para dentro: fachada renovada, novas aberturas para o pátio e correção definitiva de infiltrações antigas.',
    challenge: 'Infiltrações recorrentes na laje, fachada deteriorada e ambientes escuros. A família continuaria morando no imóvel durante parte da obra.',
    solution: 'Obra dividida em fases para manter áreas habitáveis. Impermeabilização completa da cobertura, novas esquadrias voltadas ao pátio e fachada revestida em madeira tratada.',
    highlights: ['Execução em fases com a casa habitada', 'Impermeabilização completa da cobertura', 'Nova fachada em madeira'],
    gallery: [
      { phase: 'antes', photo: photos.aptoEntregaVazio, caption: 'Ambientes internos antes da abertura para o pátio.' },
      { phase: 'durante', photo: photos.obraEquipeCanteiro, caption: 'Preparação da cobertura para impermeabilização.' },
      { phase: 'depois', photo: photos.casaFachadaMadeira, caption: 'Fachada renovada com volume em madeira.' },
      { phase: 'depois', photo: photos.casaEscadaPiscina, caption: 'Circulação voltada para a área externa.' },
    ],
    sample: true,
  },
  {
    slug: 'apartamento-grafite',
    name: 'Apartamento Grafite',
    type: 'Cozinha e áreas molhadas',
    location: `[BAIRRO] — ${site.city}`,
    area: 68,
    duration: '[XX] semanas',
    year: '[ANO]',
    services: ['reforma-de-apartamentos', 'acabamentos', 'eletrica-e-hidraulica'],
    cover: photos.cozinhaGrafite,
    summary: 'Reforma concentrada em cozinha e banheiros, com a família morando no apartamento durante toda a obra.',
    challenge: 'Executar as áreas molhadas sem deixar o apartamento sem cozinha e sem banheiro ao mesmo tempo.',
    solution: 'Sequenciamento rigoroso: um banheiro por vez e cozinha com estrutura provisória. Impermeabilização testada com lâmina d’água antes de cada revestimento.',
    highlights: ['Obra com moradores no imóvel', 'Teste de estanqueidade em todas as áreas molhadas', 'Paginação de revestimento sob medida'],
    gallery: [
      { phase: 'antes', photo: photos.obraPisoDemolido, caption: 'Remoção dos revestimentos antigos da cozinha.' },
      { phase: 'durante', photo: photos.acabamentoRevestimento, caption: 'Assentamento de revestimento com paginação definida em projeto.' },
      { phase: 'depois', photo: photos.cozinhaGrafite, caption: 'Cozinha com armários grafite e prateleiras em madeira.' },
      { phase: 'depois', photo: photos.banheiroGrafite, caption: 'Banheiro com banheira de apoio e iluminação zenital.' },
    ],
    sample: true,
  },
  {
    slug: 'sede-corporativa',
    name: 'Sede Corporativa',
    type: 'Reforma corporativa',
    location: `[BAIRRO] — ${site.city}`,
    area: 410,
    duration: '[XX] semanas',
    year: '[ANO]',
    services: ['reforma-comercial', 'gerenciamento-de-obras'],
    cover: photos.escritorioOpen,
    summary: 'Um andar corporativo convertido em escritório aberto, com salas de reunião envidraçadas e infraestrutura técnica refeita.',
    challenge: 'Prazo amarrado ao fim do contrato do escritório anterior e regras rígidas do edifício para horários de obra e carga.',
    solution: 'Turnos noturnos para as etapas ruidosas, pré-fabricação de divisórias e comissionamento de elétrica, dados e climatização antes da entrega.',
    highlights: ['Turnos noturnos planejados', 'Divisórias de vidro pré-fabricadas', 'Comissionamento técnico antes da mudança'],
    gallery: [
      { phase: 'antes', photo: photos.estruturaMetalica, caption: 'Estrutura aparente após a retirada do forro antigo.' },
      { phase: 'durante', photo: photos.escritorioCorredor, caption: 'Instalação das divisórias e da iluminação linear.' },
      { phase: 'depois', photo: photos.escritorioOpen, caption: 'Planta livre com piso em cimento e teto aparente.' },
      { phase: 'depois', photo: photos.escritorioLounge, caption: 'Área de convivência integrada ao salão principal.' },
    ],
    sample: true,
  },
  {
    slug: 'apartamento-luz',
    name: 'Apartamento Luz',
    type: 'Reforma de apartamento',
    location: `[BAIRRO] — ${site.city}`,
    area: 110,
    duration: '[XX] semanas',
    year: '[ANO]',
    services: ['reforma-de-apartamentos', 'acabamentos'],
    cover: photos.cozinhaBrancaIlha,
    summary: 'Cozinha com ilha, banheiros renovados e acabamentos claros para ampliar a sensação de espaço.',
    challenge: 'Reposicionar pontos hidráulicos para a nova ilha sem interferir na laje do vizinho de baixo.',
    solution: 'Estudo prévio do caminhamento das tubulações pelo piso elevado e aprovação técnica junto ao condomínio antes do início.',
    highlights: ['Ilha com pontos hidráulicos novos', 'Aprovação técnica junto ao condomínio', 'Paleta clara e iluminação indireta'],
    gallery: [
      { phase: 'antes', photo: photos.planejamentoProjeto, caption: 'Estudo do caminhamento hidráulico para a ilha.' },
      { phase: 'durante', photo: photos.acabamentoPintura, caption: 'Pintura executada antes da instalação da marcenaria.' },
      { phase: 'depois', photo: photos.cozinhaBrancaIlha, caption: 'Cozinha integrada com ilha central e banquetas em madeira.' },
      { phase: 'depois', photo: photos.banheiroBancadaMadeira, caption: 'Banheiro com gabinete suspenso em madeira e cubas de apoio.' },
    ],
    sample: true,
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByService(slug: ServiceSlug) {
  return projects.filter((p) => p.services.includes(slug));
}

export function getNextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}

export const phaseLabel: Record<GalleryPhase, string> = {
  antes: 'Antes',
  durante: 'Durante',
  depois: 'Depois',
};
