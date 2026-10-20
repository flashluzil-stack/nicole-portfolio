# Source artwork

Put original, full-resolution files here, grouped by section:

```
assets-src/
  architecture/<project-slug>/cover.jpg
  architecture/<project-slug>/plan-ground-floor.png
  architecture/<project-slug>/presentation.pdf
  technology/flash-luz/logo.png
  technology/flash-luz/screen-01.png
```

Then run `npm run images`. WebP renditions are written to `public/images/…`
(PDFs to `public/docs/…`) and `assets-src/manifest.json` lists every file
with its paths and dimensions, ready to paste into `src/content/*.ts`.
