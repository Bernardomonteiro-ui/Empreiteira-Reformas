import type { NextConfig } from 'next';

/**
 * Dois modos de publicação:
 *
 * - Servidor Node / Vercel (padrão): otimização de imagens sob demanda (AVIF/WebP).
 * - Estático (STATIC_EXPORT=true): gera a pasta `out/` com HTML/CSS/JS puros,
 *   usada pelo GitHub Pages. BASE_PATH define o subcaminho do repositório
 *   (ex.: "/Empreiteira-Reformas").
 */
const isStatic = process.env.STATIC_EXPORT === 'true';
const basePath = process.env.BASE_PATH ?? '';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(isStatic && {
    output: 'export',
    trailingSlash: true,
  }),
  basePath,
  experimental: {
    // Tailwind gera CSS pequeno: inline elimina a requisição que bloqueia a renderização.
    inlineCss: true,
  },
  images: {
    // Hospedagem estática não tem otimizador de imagens: as variantes WebP são
    // geradas no build (scripts/static-images.mjs) e servidas por um loader próprio.
    ...(isStatic && { loader: 'custom', loaderFile: './src/lib/image-loader.ts' }),
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
