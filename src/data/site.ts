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
  city: 'São Caetano do Sul',
  state: 'SP',
  /** Região de atendimento (ex.: "Grande São Paulo"). */
  region: '[REGIÃO DE ATENDIMENTO]',
  /** Bairros atendidos — use apenas bairros onde a empresa realmente atua. */
  neighborhoods: ['[BAIRRO 1]', '[BAIRRO 2]', '[BAIRRO 3]', '[BAIRRO 4]', '[BAIRRO 5]', '[BAIRRO 6]'],

  address: {
    /** O perfil do Google não informa o número. Acrescente quando tiver. */
    street: 'Alameda São Caetano',
    district: 'Santa Paula',
    postalCode: '09560-050',
  },
  /** Coordenadas do endereço (Google Maps). Deixe null se não quiser publicar. */
  geo: null as { lat: number; lng: number } | null,

  /** Somente números, com DDI + DDD. Ex.: 5511999999999 */
  whatsapp: '5511943642768',
  phoneDisplay: '(11) 94364-2768',
  email: '[contato@seudominio.com.br]',
  openingHours: 'Segunda a sexta, das 9h às 18h. Sábado, das 9h às 13h.',
  /** Formato schema.org */
  openingHoursSchema: ['Mo-Fr 09:00-18:00', 'Sa 09:00-13:00'],
  /** Responsável pela empresa (citado nas avaliações do Google). */
  responsible: 'Rafael',
  /** Avaliação pública no Google (conferir e atualizar periodicamente). */
  googleRating: { value: 5, count: 9 },
  /** Link do perfil no Google Maps — cole aqui o link "Compartilhar" do perfil. */
  googleProfileUrl: '[https://maps.app.goo.gl/...]',
  foundingYear: '[ANO DE FUNDAÇÃO]',

  /** A empresa ainda não tem redes sociais. Preencha quando tiver; vazio = oculto. */
  social: {
    instagram: '',
    linkedin: '',
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

/** Busca do endereço no Google Maps (enquanto não houver link do perfil). */
export function mapsUrl(): string {
  const profile = real(site.googleProfileUrl);
  if (profile) return profile;
  const q = `${site.address.street}, ${site.address.district}, ${site.city} - ${site.state}, ${site.address.postalCode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

export function whatsappUrl(message: string = site.whatsappMessage): string {
  const number = real(site.whatsapp)?.replace(/\D/g, '');
  const base = number ? `https://wa.me/${number}` : 'https://wa.me/';
  return `${base}?text=${encodeURIComponent(message)}`;
}
