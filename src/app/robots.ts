import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

// Gerado como arquivo estático no build (compatível com GitHub Pages).
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
