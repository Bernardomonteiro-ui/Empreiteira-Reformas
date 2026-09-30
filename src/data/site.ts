/**
 * Dados institucionais da empresa.
 *
 * ⚠️ Tudo que está entre colchetes — "[ASSIM]" — é PLACEHOLDER e deve ser
 * substituído por informações reais antes da publicação.
 *
 * Valores com colchetes são omitidos automaticamente do schema JSON-LD
 * (ver `isPlaceholder` e `lib/schema.ts`), para que nenhum dado fictício
 * chegue aos buscadores.
 */

export const site = {
  /** PLACEHOLDER — nome comercial provisório usado no layout. */
  name: 'Estrato',
  /** Complemento exibido junto à marca. */
  descriptor: 'Reformas & Construção',
  legalName: '[RAZÃO SOCIAL LTDA]',
  cnpj: '[00.000.000/0001-00]',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.seudominio.com.br',

  /** Cidade principal — aparece em títulos, textos e no schema. */
  city: '[CIDADE]',
  state: '[UF]',
  /** Região de atendimento (ex.: "Grande São Paulo"). */
  region: '[REGIÃO DE ATENDIMENTO]',
  /** Bairros atendidos — use apenas bairros onde a empresa realmente atua. */
  neighborhoods: ['[BAIRRO 1]', '[BAIRRO 2]', '[BAIRRO 3]', '[BAIRRO 4]', '[BAIRRO 5]', '[BAIRRO 6]'],

  address: {
    street: '[RUA, NÚMERO]',
    complement: '[COMPLEMENTO]',
    district: '[BAIRRO]',
    postalCode: '[00000-000]',
  },
  /** Coordenadas do endereço (Google Maps). Deixe null se não quiser publicar. */
  geo: null as { lat: number; lng: number } | null,

  /** Somente números, com DDI + DDD. Ex.: 5511999999999 */
  whatsapp: '[5500000000000]',
  phoneDisplay: '[(00) 00000-0000]',
  email: '[contato@seudominio.com.br]',
  openingHours: '[Seg a Sex, 8h às 18h]',
  /** Formato schema.org — ex.: ['Mo-Fr 08:00-18:00'] */
  openingHoursSchema: [] as string[],
  foundingYear: '[ANO DE FUNDAÇÃO]',

  social: {
    instagram: '[https://instagram.com/perfil]',
    linkedin: '[https://linkedin.com/company/perfil]',
  },

  /** Mensagem padrão ao abrir o WhatsApp. */
  whatsappMessage: 'Olá! Vim pelo site e gostaria de conversar sobre uma reforma.',

  showPlaceholderMarkers: process.env.NEXT_PUBLIC_HIDE_PLACEHOLDERS !== 'true',
} as const;

/** Um valor é placeholder quando ainda contém colchetes. */
export function isPlaceholder(value: unknown): boolean {
  return typeof value === 'string' && /\[.*\]/.test(value);
}

/** Retorna o valor apenas se for real (útil para schema e links). */
export function real<T>(value: T): T | undefined {
  return isPlaceholder(value) ? undefined : value;
}

export function whatsappUrl(message: string = site.whatsappMessage): string {
  const number = real(site.whatsapp)?.replace(/\D/g, '');
  const base = number ? `https://wa.me/${number}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}
