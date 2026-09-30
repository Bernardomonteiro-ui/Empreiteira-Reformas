import type { Metadata } from 'next';
import { site } from '@/data/site';
import { photos } from '@/assets/images';

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; width: number; height: number; alt: string };
  /** Títulos já completos (com a marca) não recebem o sufixo do template. */
  absoluteTitle?: boolean;
};

/** Metadata única por página: title, description, canonical e Open Graph. */
export function pageMetadata({ title, description, path, image, absoluteTitle }: PageMeta): Metadata {
  const og = image ?? {
    src: photos.heroSalaIntegrada.src.src,
    width: photos.heroSalaIntegrada.src.width,
    height: photos.heroSalaIntegrada.src.height,
    alt: photos.heroSalaIntegrada.alt,
  };
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      siteName: `${site.name} ${site.descriptor}`,
      title,
      description,
      url: absoluteUrl(path),
      images: [{ url: absoluteUrl(og.src), width: og.width, height: og.height, alt: og.alt }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

/** URL absoluta preservando subcaminhos do domínio (ex.: GitHub Pages). */
export function absoluteUrl(path = '/') {
  if (/^https?:\/\//.test(path)) return path;
  // Arquivos estáticos já vêm com o basePath; site.url também o contém.
  const base = process.env.BASE_PATH;
  if (base && path.startsWith(`${base}/`)) path = path.slice(base.length);
  // Export estático usa barra final nas páginas (trailingSlash).
  const isPage = !/\.[a-z0-9]+$/i.test(path) && !path.includes('#');
  if (process.env.STATIC_EXPORT === 'true' && isPage && !path.endsWith('/')) path += '/';
  return `${site.url.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}
