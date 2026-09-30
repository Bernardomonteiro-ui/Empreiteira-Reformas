/**
 * Pós-processamento do export estático para hospedagens sem reescrita de URL
 * (GitHub Pages).
 *
 * O Next.js grava os dados de prefetch de cada segmento em subpastas, ex.:
 *   out/projetos/__next.projetos/__PAGE__.txt
 * mas o navegador os solicita com o nome "achatado":
 *   out/projetos/__next.projetos.__PAGE__.txt
 * Este script cria as cópias achatadas. Sem ele, a navegação continua
 * funcionando, porém com requisições 404 e sem prefetch.
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const OUT = process.argv[2] ?? 'out';
let created = 0;

async function filesUnder(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await filesUnder(full)));
    else out.push(full);
  }
  return out;
}

async function walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('__next.')) {
      for (const file of await filesUnder(full)) {
        const rel = path.relative(full, file).split(path.sep).join('.');
        await fs.copyFile(file, path.join(dir, `${entry.name}.${rel}`));
        created++;
      }
    } else if (entry.name !== '_next') {
      await walk(full);
    }
  }
}

await walk(OUT);
console.log(`flatten-export: ${created} arquivo(s) de prefetch criados em ${OUT}/`);
