/**
 * Loader de imagens para o export estático (GitHub Pages).
 *
 * Não há otimizador sob demanda nessa hospedagem, então o build gera versões
 * WebP em larguras fixas (scripts/static-images.mjs) e este loader aponta o
 * srcset do next/image para a largura gerada mais próxima.
 */
export const STATIC_IMAGE_WIDTHS = [640, 1080, 1600, 2400] as const;

export default function staticImageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!/\/_next\/static\/media\/[^/]+\.(jpe?g|png)$/i.test(src)) return src;
  const w = STATIC_IMAGE_WIDTHS.find((x) => x >= width) ?? STATIC_IMAGE_WIDTHS[STATIC_IMAGE_WIDTHS.length - 1];
  return src.replace(/\.(jpe?g|png)$/i, `.w${w}.webp`);
}
