/**
 * Geradores de dados estruturados (schema.org / JSON-LD).
 *
 * Regra: nenhum valor placeholder ("[ASSIM]") é publicado. Campos sem dado
 * real são removidos com `real()` e `clean()`. Avaliações só entram quando
 * forem depoimentos reais (`sample: false`).
 */
import { site, real, isPlaceholder } from '@/data/site';
import { testimonials } from '@/data/content';
import type { Service } from '@/data/services';
import type { Project } from '@/data/projects';
import { photos } from '@/assets/images';
import { absoluteUrl } from './seo';

type Json = Record<string, unknown>;

const ORG_ID = absoluteUrl('/#organizacao');
const BUSINESS_ID = absoluteUrl('/#empresa');

/** Remove chaves vazias/placeholder recursivamente. */
function clean<T>(value: T): T | undefined {
  if (value === null || value === undefined) return undefined;
  if (typeof value === 'string') return isPlaceholder(value) ? undefined : value;
  if (Array.isArray(value)) {
    const arr = value.map(clean).filter((v) => v !== undefined);
    return (arr.length ? arr : undefined) as T;
  }
  if (typeof value === 'object') {
    const out: Json = {};
    for (const [k, v] of Object.entries(value as Json)) {
      const c = clean(v);
      if (c !== undefined) out[k] = c;
    }
    // Um objeto que só sobrou com @type não tem informação útil.
    const keys = Object.keys(out).filter((k) => k !== '@type');
    return (keys.length ? out : undefined) as T;
  }
  return value;
}

function realReviews() {
  return testimonials
    .filter((t) => !t.sample)
    .map((t) => ({
      '@type': 'Review',
      reviewBody: t.quote,
      author: { '@type': 'Person', name: t.name },
      itemReviewed: { '@id': BUSINESS_ID },
      ...(t.rating ? { reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5 } } : {}),
    }));
}

export function organizationSchema(): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: absoluteUrl('/icon.svg'),
    email: site.email,
    telephone: real(site.whatsapp) ? `+${site.whatsapp.replace(/\D/g, '')}` : undefined,
    foundingDate: site.foundingYear,
    taxID: site.cnpj,
    sameAs: [site.social.instagram, site.social.linkedin, site.googleProfileUrl].filter(Boolean),
  }) as Json;
}

export function localBusinessSchema(): Json {
  const areaServed = [
    real(site.city) && { '@type': 'City', name: site.city },
    ...site.neighborhoods.filter((n) => !isPlaceholder(n)).map((n) => ({ '@type': 'Place', name: n })),
    real(site.region) && { '@type': 'AdministrativeArea', name: site.region },
  ].filter(Boolean);

  const reviews = realReviews();

  return clean({
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': BUSINESS_ID,
    name: `${site.name} ${site.descriptor}`,
    parentOrganization: { '@id': ORG_ID },
    url: site.url,
    image: absoluteUrl(photos.heroSalaIntegrada.src.src),
    telephone: real(site.whatsapp) ? `+${site.whatsapp.replace(/\D/g, '')}` : undefined,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.street}, ${site.address.district}`,
      addressLocality: site.city,
      addressRegion: site.state,
      postalCode: site.address.postalCode,
      addressCountry: 'BR',
    },
    geo: site.geo ? { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } : undefined,
    openingHours: site.openingHoursSchema,
    areaServed,
    review: reviews.length ? reviews : undefined,
  }) as Json;
}

export function websiteSchema(): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: `${site.name} ${site.descriptor}`,
    url: site.url,
    inLanguage: 'pt-BR',
    publisher: { '@id': ORG_ID },
  };
}

export function serviceSchema(service: Service & { page: NonNullable<Service['page']> }): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    serviceType: service.name,
    description: service.page.metaDescription,
    url: absoluteUrl(`/${service.slug}`),
    image: absoluteUrl(service.image.src.src),
    provider: { '@id': BUSINESS_ID },
    areaServed: real(site.city) ? { '@type': 'City', name: site.city } : undefined,
  }) as Json;
}

export function projectSchema(project: Project): Json {
  return clean({
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.name,
    about: project.type,
    description: project.summary,
    url: absoluteUrl(`/projetos/${project.slug}`),
    image: project.gallery.map((g) => absoluteUrl(g.photo.src.src)),
    creator: { '@id': BUSINESS_ID },
    locationCreated: { '@type': 'Place', name: project.location },
  }) as Json;
}

export function breadcrumbSchema(items: { name: string; path: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]): Json {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
