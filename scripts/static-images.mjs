/**
 * Gera as variantes WebP responsivas usadas por src/lib/image-loader.ts
 * no export estático. Roda depois do `next build`.
 *
 *   foto.abc123.jpg → foto.abc123.w640.webp, .w1080.webp, .w1600.webp, .w2400.webp
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const WIDTHS = [640, 1080, 1600, 2400]; // manter igual a STATIC_IMAGE_WIDTHS
const MEDIA = path.join(process.argv[2] ?? 'out', '_next', 'static', 'media');

const files = (await fs.readdir(MEDIA)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let bytes = 0;

await Promise.all(
  files.map(async (file) => {
    const input = path.join(MEDIA, file);
    for (const w of WIDTHS) {
      const target = input.replace(/\.(jpe?g|png)$/i, `.w${w}.webp`);
      const info = await sharp(input).resize({ width: w, withoutEnlargement: true }).webp({ quality: 72 }).toFile(target);
      bytes += info.size;
    }
  }),
);

console.log(`static-images: ${files.length} imagem(ns) → ${files.length * WIDTHS.length} variantes WebP (${(bytes / 1e6).toFixed(1)} MB)`);
