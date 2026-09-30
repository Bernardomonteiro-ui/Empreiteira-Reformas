import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    // Tailwind gera CSS pequeno: inline elimina a requisição que bloqueia a renderização.
    inlineCss: true,
  },
  images: {
    // AVIF primeiro, WebP como fallback; JPEG original para navegadores antigos.
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
