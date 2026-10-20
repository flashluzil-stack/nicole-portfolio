// Builds a self-contained preview of the site (memory router, relative asset
// paths) into dist-preview/, plus page.html: the index body as a fragment for
// hosts that supply their own document skeleton.
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

execSync('npx vite build --base ./ --outDir dist-preview --emptyOutDir', {
  stdio: 'inherit',
  env: { ...process.env, VITE_ROUTER: 'memory' },
});
const html = readFileSync('dist-preview/index.html', 'utf8');
const head = html.match(/<head>([\s\S]*)<\/head>/)[1];
const body = html.match(/<body>([\s\S]*)<\/body>/)[1];
const keep = head
  .split('\n')
  .filter((l) => /<title>|rel="icon"|rel="stylesheet"|rel="modulepreload"|<script type="module"/.test(l))
  .join('\n');
writeFileSync('dist-preview/page.html', `${keep}\n${body}`);
console.log('preview: dist-preview/page.html');
