/**
 * Registro central de imagens.
 *
 * ⚠️ PLACEHOLDER: as fotografias atuais são imagens de banco (Unsplash) usadas
 * apenas para o layout. Substitua pelos registros reais das obras mantendo os
 * mesmos nomes de arquivo — ou adicione novos e atualize este registro.
 *
 * Importações estáticas dão ao next/image largura/altura reais (zero CLS) e
 * um placeholder "blur" gerado em build.
 */
import type { StaticImageData } from 'next/image';

import heroSalaIntegrada from './hero-sala-integrada.jpg';
import planejamentoProjeto from './planejamento-projeto.jpg';
import obraDemolicao from './obra-demolicao.jpg';
import obraCorteMadeira from './obra-corte-madeira.jpg';
import obraPisoDemolido from './obra-piso-demolido.jpg';
import obraEquipeCanteiro from './obra-equipe-canteiro.jpg';
import instalacoesHidraulicas from './instalacoes-hidraulicas.jpg';
import acabamentoPintura from './acabamento-pintura.jpg';
import projetoDetalhamento from './projeto-detalhamento.jpg';
import cozinhaBrancaIlha from './cozinha-branca-ilha.jpg';
import banheiroBancadaMadeira from './banheiro-bancada-madeira.jpg';
import estruturaMetalica from './estrutura-metalica.jpg';
import acabamentoRevestimento from './acabamento-revestimento.jpg';
import aptoSalaEstar from './apto-sala-estar.jpg';
import aptoLivingLuz from './apto-living-luz.jpg';
import cozinhaGrafite from './cozinha-grafite.jpg';
import casaFachadaMadeira from './casa-fachada-madeira.jpg';
import casaNoturna from './casa-noturna.jpg';
import casaEscadaPiscina from './casa-escada-piscina.jpg';
import escritorioOpen from './escritorio-open.jpg';
import escritorioCorredor from './escritorio-corredor.jpg';
import escritorioLounge from './escritorio-lounge.jpg';
import banheiroGrafite from './banheiro-grafite.jpg';
import aptoEntregaVazio from './apto-entrega-vazio.jpg';

export type Photo = { src: StaticImageData; alt: string };

export const photos = {
  heroSalaIntegrada: {
    src: heroSalaIntegrada,
    alt: 'Sala integrada reformada, com painel de madeira, sofá claro e grandes esquadrias de vidro abertas para o jardim',
  },
  planejamentoProjeto: {
    src: planejamentoProjeto,
    alt: 'Profissional desenhando a planta de uma reforma sobre a prancheta, com régua e rolos de projeto',
  },
  obraDemolicao: {
    src: obraDemolicao,
    alt: 'Ambiente em obra com paredes descascadas, alvenaria aparente e escoramento de madeira',
  },
  obraCorteMadeira: {
    src: obraCorteMadeira,
    alt: 'Corte de tábuas com serra circular sobre cavaletes durante a execução da obra',
  },
  obraPisoDemolido: {
    src: obraPisoDemolido,
    alt: 'Furadeira sobre contrapiso descascado após a remoção do revestimento antigo',
  },
  obraEquipeCanteiro: {
    src: obraEquipeCanteiro,
    alt: 'Equipe técnica reunida no canteiro de obras avaliando a laje antes da concretagem',
  },
  instalacoesHidraulicas: {
    src: instalacoesHidraulicas,
    alt: 'Tubulações metálicas aparentes com registros e conexões sobre parede de tijolos',
  },
  acabamentoPintura: {
    src: acabamentoPintura,
    alt: 'Rolo aplicando tinta em parede branca durante a etapa de acabamento',
  },
  projetoDetalhamento: {
    src: projetoDetalhamento,
    alt: 'Mesa de trabalho com desenhos técnicos, esquadros e caixa de ferramentas durante o detalhamento do projeto',
  },
  cozinhaBrancaIlha: {
    src: cozinhaBrancaIlha,
    alt: 'Cozinha integrada com ilha branca, banquetas de madeira e pendentes pretos',
  },
  banheiroBancadaMadeira: {
    src: banheiroBancadaMadeira,
    alt: 'Banheiro com gabinete suspenso em madeira, cubas de apoio e parede verde acinzentada',
  },
  estruturaMetalica: {
    src: estruturaMetalica,
    alt: 'Estrutura metálica treliçada iluminada lateralmente sobre fundo escuro',
  },
  acabamentoRevestimento: {
    src: acabamentoRevestimento,
    alt: 'Detalhe de revestimento cerâmico branco assentado com rejunte fino e torneira metálica',
  },
  aptoSalaEstar: {
    src: aptoSalaEstar,
    alt: 'Sala de estar de apartamento reformado com sofá cinza, mesa de centro em madeira e luz natural',
  },
  aptoLivingLuz: {
    src: aptoLivingLuz,
    alt: 'Living claro com poltronas brancas, sofá de couro e janelas altas',
  },
  cozinhaGrafite: {
    src: cozinhaGrafite,
    alt: 'Cozinha reformada com armários grafite, prateleiras em madeira e revestimento branco',
  },
  casaFachadaMadeira: {
    src: casaFachadaMadeira,
    alt: 'Fachada de residência com volume revestido em madeira, vidro e muro escuro',
  },
  casaNoturna: {
    src: casaNoturna,
    alt: 'Residência contemporânea iluminada ao anoitecer, com jardim e árvore de grande porte',
  },
  casaEscadaPiscina: {
    src: casaEscadaPiscina,
    alt: 'Escada com degraus em madeira e caixilhos metálicos voltados para a piscina',
  },
  escritorioOpen: {
    src: escritorioOpen,
    alt: 'Escritório corporativo com piso em cimento, teto aparente e fachada envidraçada',
  },
  escritorioCorredor: {
    src: escritorioCorredor,
    alt: 'Corredor de escritório com divisórias de vidro, marcenaria escura e iluminação linear',
  },
  escritorioLounge: {
    src: escritorioLounge,
    alt: 'Área de convivência de escritório com poltronas, luminária articulada e divisórias em madeira',
  },
  banheiroGrafite: {
    src: banheiroGrafite,
    alt: 'Banheiro com banheira de apoio, revestimentos em tons de grafite e janela alta',
  },
  aptoEntregaVazio: {
    src: aptoEntregaVazio,
    alt: 'Apartamento pronto para entrega, com piso de madeira, paredes brancas e aparador',
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
