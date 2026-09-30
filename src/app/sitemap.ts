import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';
import { servicePages } from '@/data/services';
import { absoluteUrl } from '@/lib/seo';

// Gerado como arquivo estático no build (compatível com GitHub Pages).
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/projetos'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...servicePages.map((s) => ({
      url: absoluteUrl(`/${s.slug}`),
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...projects.map((p) => ({
      url: absoluteUrl(`/projetos/${p.slug}`),
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ];
}
