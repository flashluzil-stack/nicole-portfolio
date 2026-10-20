// Converts original artwork in /assets-src into web-ready WebP renditions in
// /public/images, preserving the folder structure:
//
//   assets-src/architecture/<project>/plan-01.png
//     → public/images/architecture/<project>/plan-01-1600.webp  (src)
//     → public/images/architecture/<project>/plan-01-2800.webp  (srcLarge, fullscreen viewer)
//
// PDFs are copied unchanged to /public/docs. Drawings keep full legibility:
// images are only ever resized down (never cropped) at high quality.
// A manifest with paths and intrinsic sizes is written to
// assets-src/manifest.json to paste into the content files.
import sharp from 'sharp';
import { copyFileSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';

const SRC = 'assets-src';
const OUT = 'public/images';
const DOCS = 'public/docs';
const SIZES = [1600, 2800];
const IMAGE_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif']);

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

const manifest = [];
for (const file of walk(SRC)) {
  const ext = extname(file).toLowerCase();
  const rel = relative(SRC, file);

  if (ext === '.pdf') {
    const target = join(DOCS, rel);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(file, target);
    manifest.push({ pdf: '/' + relative('public', target) });
    continue;
  }
  if (!IMAGE_EXT.has(ext)) continue;

  const meta = await sharp(file).metadata();
  const outDir = join(OUT, dirname(rel));
  mkdirSync(outDir, { recursive: true });
  const stem = basename(file, extname(file));
  const entry = { source: rel };

  for (const size of SIZES) {
    // Only write the large rendition when the original is clearly bigger
    // than the base one; otherwise it would be a near-duplicate.
    if (size !== SIZES[0] && meta.width <= SIZES[0] * 1.25) continue;
    const width = Math.min(size, meta.width);
    const target = join(outDir, `${stem}-${size}.webp`);
    const info = await sharp(file)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 88, smartSubsample: true, effort: 5 })
      .toFile(target);
    const key = size === SIZES[0] ? 'src' : 'srcLarge';
    entry[key] = '/' + relative('public', target).split('\\').join('/');
    if (key === 'src') Object.assign(entry, { width: info.width, height: info.height });
    else entry.widthLarge = info.width;
  }
  manifest.push(entry);
  console.log(`✓ ${rel}`);
}

writeFileSync(join(SRC, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} file(s) processed → ${SRC}/manifest.json`);
