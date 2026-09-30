/**
 * Otimiza fotografias para o site.
 *
 * Uso:  npm run images -- <pasta-de-origem> [pasta-de-destino]
 *
 * - Redimensiona para no máximo 2400px de largura (suficiente para telas 2x).
 * - Recomprime em JPEG progressivo (mozjpeg). O next/image gera AVIF/WebP
 *   responsivos automaticamente a partir deste arquivo mestre.
 * - Mantém o nome do arquivo (use nomes descritivos: "cozinha-apartamento-jardins.jpg").
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [, , src, out = 'src/assets/images'] = process.argv;
if (!src) {
  console.error('Informe a pasta de origem: npm run images -- ./fotos-originais');
  process.exit(1);
}

await fs.mkdir(out, { recursive: true });
const files = (await fs.readdir(src)).filter((f) => /\.(jpe?g|png|webp|tiff?)$/i.test(f));

for (const file of files) {
  const name = path.parse(file).name.toLowerCase().replace(/\s+/g, '-');
  const target = path.join(out, `${name}.jpg`);
  await sharp(path.join(src, file))
    .rotate()
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(target);
  console.log('✓', target);
}
