import { photos, type Photo } from '@/assets/images';

/* -------------------------------------------------------------------------- */
/* Processo                                                                    */
/* -------------------------------------------------------------------------- */

export type ProcessStep = {
  n: string;
  title: string;
  lead: string;
  text: string;
  deliverable: string;
  photo: Photo;
};

export const processSteps: ProcessStep[] = [
  {
    n: '01',
    title: 'Diagnóstico',
    lead: 'Entender o imóvel antes de propor qualquer coisa.',
    text: 'Visita técnica, medição, verificação das instalações existentes e conversa sobre como você usa — e quer usar — o espaço.',
    deliverable: 'Levantamento técnico e registro fotográfico',
    photo: photos.obraPisoDemolido,
  },
  {
    n: '02',
    title: 'Planejamento',
    lead: 'Definir o que será feito, em que ordem e por quem.',
    text: 'Fechamos o escopo, a sequência das etapas e as interfaces com arquitetos, condomínio e fornecedores.',
    deliverable: 'Escopo detalhado e sequência de obra',
    photo: photos.projetoDetalhamento,
  },
  {
    n: '03',
    title: 'Orçamento',
    lead: 'Um número que você entende — e que não muda sem motivo.',
    text: 'Orçamento aberto por etapa, com materiais e mão de obra identificados, e um cronograma físico-financeiro.',
    deliverable: 'Orçamento por etapa e cronograma',
    photo: photos.acabamentoRevestimento,
  },
  {
    n: '04',
    title: 'Execução',
    lead: 'Equipes próprias e parceiras coordenadas por um único responsável.',
    text: 'Cada frente entra no momento certo, com canteiro organizado, áreas protegidas e inspeção antes de cada etapa ser coberta.',
    deliverable: 'Obra conduzida por um gestor dedicado',
    photo: photos.obraCorteMadeira,
  },
  {
    n: '05',
    title: 'Acompanhamento',
    lead: 'Você sabe o que está acontecendo sem precisar perguntar.',
    text: 'Relatórios periódicos com fotos, avanço físico e financeiro. Qualquer mudança de escopo é registrada e aprovada por você.',
    deliverable: 'Relatórios de avanço e controle de mudanças',
    photo: photos.instalacoesHidraulicas,
  },
  {
    n: '06',
    title: 'Entrega',
    lead: 'Vistoria, ajustes e as chaves de volta.',
    text: 'Checklist ambiente por ambiente, limpeza final e orientações de uso e manutenção do que foi executado.',
    deliverable: 'Vistoria final e manual de uso',
    photo: photos.aptoEntregaVazio,
  },
];

/* -------------------------------------------------------------------------- */
/* Números                                                                     */
/* -------------------------------------------------------------------------- */

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  /** true enquanto o número não for confirmado pela empresa. */
  placeholder: boolean;
};

/**
 * ⚠️ PLACEHOLDER — NÃO SÃO NÚMEROS REAIS.
 * Substitua `value` pelos dados fornecidos pela empresa e altere
 * `placeholder` para `false`. Não publique estes valores.
 */
export const stats: Stat[] = [
  { value: 100, prefix: '+', label: 'Projetos executados', placeholder: true }, // PLACEHOLDER: +XXX
  { value: 10, label: 'Anos de experiência', placeholder: true }, // PLACEHOLDER: XX
  { value: 1000, suffix: ' m²', label: 'Transformados', placeholder: true }, // PLACEHOLDER: XXXX m²
  { value: 50, suffix: '%', label: 'Clientes por indicação', placeholder: true }, // PLACEHOLDER: XX%
];

/* -------------------------------------------------------------------------- */
/* Depoimentos                                                                 */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  name: string;
  project: string;
  location: string;
  /** Depoimentos de exemplo nunca geram schema Review. */
  sample: boolean;
  /** Nota de 1 a 5, somente se fornecida pelo cliente. */
  rating?: number;
};

/**
 * ⚠️ PLACEHOLDER — depoimentos de EXEMPLO para o layout.
 * Substitua por depoimentos reais e autorizados pelos clientes e marque
 * `sample: false`. Apenas depoimentos reais entram no schema JSON-LD.
 */
export const testimonials: Testimonial[] = [
  {
    quote: 'Pela primeira vez, uma obra terminou na data que estava no cronograma. E eu soube de tudo antes de precisar perguntar.',
    name: '[Nome do cliente]',
    project: 'Apartamento Jardins',
    location: '[Bairro — Cidade]',
    sample: true,
  },
  {
    quote: 'O orçamento que aprovamos foi o orçamento que pagamos. Quando surgiu um imprevisto, recebemos as opções antes de qualquer decisão.',
    name: '[Nome do cliente]',
    project: 'Casa Pátio',
    location: '[Bairro — Cidade]',
    sample: true,
  },
  {
    quote: 'Reformamos o escritório inteiro sem perder um dia de operação. A equipe trabalhou à noite e entregou tudo testado.',
    name: '[Nome do cliente]',
    project: 'Sede Corporativa',
    location: '[Bairro — Cidade]',
    sample: true,
  },
];

/* -------------------------------------------------------------------------- */
/* Formulário                                                                  */
/* -------------------------------------------------------------------------- */

export const propertyTypes = ['Apartamento', 'Casa ou sobrado', 'Loja ou ponto comercial', 'Escritório ou sala corporativa', 'Clínica ou consultório', 'Outro'];

export const renovationTypes = [
  'Reforma completa',
  'Reforma parcial',
  'Cozinha e/ou banheiros',
  'Elétrica e hidráulica',
  'Acabamentos',
  'Gerenciamento de obra',
  'Ainda não sei',
];
