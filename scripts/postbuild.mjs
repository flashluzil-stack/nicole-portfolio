// Copies index.html to 404.html so static hosts without rewrite rules
// (e.g. GitHub Pages) still serve the single-page app on deep links.
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
console.log('postbuild: dist/404.html written');
