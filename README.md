# Nicole Gofman — Portfolio

Personal portfolio for Nicole Gofman, presenting her work across **architecture** and **digital technology**.

Built with React 18, TypeScript, Vite and React Router. Styling is plain CSS organised around design tokens (`src/styles/tokens.css`). Fonts (Cormorant Garamond and Manrope) are self-hosted through Fontsource, so the site makes no third-party requests.

## Pages

| Route | Page |
| --- | --- |
| `/` | Home: hero diptych, introduction, selected architecture, selected products, background, contact CTA |
| `/technology` | Case studies for Flash Luz, FlashTravel and Worldly |
| `/architecture` | Architecture project index with type filters, plus practice and studies |
| `/architecture/:slug` | Project page: sections, fullscreen viewer, previous/next project |
| `/contact` | Email, LinkedIn and a contact form that opens a pre-filled email |

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Production build and preview:

```bash
npm run build      # type-checks, builds to dist/, writes dist/404.html
npm run preview    # http://localhost:4173
```

QA (needs `npm run preview` running in another terminal):

```bash
npm run test:e2e   # every route at 3 widths, in English and Hebrew: console errors,
                   # overflow, images, nav state, CTAs, LinkedIn URL, form,
                   # language switcher, RTL, untranslated text, axe a11y scan
```

## Content status

| Source | Imported |
| --- | --- |
| CV (PDF) | Titles, dates, responsibilities, education, skills and languages, worded as in the CV (`profile.ts`) |
| Flash.pdf | Flash by Nicole logo, app icons, Flash Luz / FlashTravel / Worldly logos, 10 app screenshots, two photos of Nicole, and all product copy (translated from Hebrew) |
| Canva architecture portfolio | **Not imported yet.** The site couldn't be reached from the build environment. Until projects are added, the Architecture page links to the Canva portfolio |

Product status labels: Flash Luz is labelled **Launched** because the CV says it was "built … from concept to launch". FlashTravel is labelled **Prototype** because it is shown through working app screens. Worldly is labelled **Concept** because only its idea and icon are documented.

## Languages (English / Hebrew)

The header has an **EN | עב** switcher. English is the default.

- **Interface strings** (navigation, buttons, headings, form messages, accessibility labels, metadata) live in `src/i18n/ui.ts`. The Hebrew dictionary must match the English shape, and TypeScript enforces this.
- **Long-form content** has a Hebrew counterpart in `src/content/he/` (`profile.ts`, `products.ts`, `architecture.ts`). The Hebrew files reuse the English images, links and statuses and replace only the text, including alt text and captions.
- **Choosing a language:**
  - Hebrew pages use `?lang=he`, so every page has a shareable, indexable Hebrew URL. English pages carry no parameter.
  - The choice is also saved in the browser and survives navigation and refreshes.
  - Each page sets `hreflang` alternates, `og:locale` and a translated title and description.
- **Direction:**
  - `<html lang dir>` switches between `en`/`ltr` and `he`/`rtl`.
  - The CSS uses logical properties, so layouts mirror automatically.
  - Only the directional arrow icons mirror. Images, drawings, logos and screenshots are never flipped.
- **Fonts:** Hebrew uses Frank Ruhl Libre for display text and Assistant for body text.

When you add content, add its Hebrew text next to the English. For architecture projects, use the `text` map in `src/content/he/architecture.ts`, keyed by slug.

## Content

All copy and project data lives in `src/content/`. The page components only read from these files.

- `profile.ts`: bio, contact details, education, experience and tools (from the CV)
- `products.ts`: digital products (from Flash.pdf)
- `architecture.ts`: architecture projects (from the Canva portfolio)
- `types.ts`: the content model, with a comment on every field

### Adding images

1. Put the original files in `assets-src/`, for example `assets-src/architecture/<slug>/plan-01.png` or `assets-src/technology/flash-luz/screen-01.png`.
2. Run `npm run images`. This writes WebP versions at 1600 px and 2800 px wide to `public/images/…`, copies PDFs to `public/docs/…`, and lists every file with its size in `assets-src/manifest.json`.
3. Copy the entries into the content files.

Images are only ever scaled down, never cropped. Mark plans, sections, elevations, diagrams and sheets as `kind: 'drawing'`. Drawings are always shown whole on a white mat, both on the page and in the fullscreen viewer, so annotations and dimensions stay readable.

### Adding an architecture project

```ts
// src/content/architecture.ts
export const architectureProjects: ArchitectureProject[] = [
  {
    slug: 'project-slug',
    title: 'Project title, as in the portfolio',
    year: '2024',
    type: 'Residential',
    context: 'Shenkar — Year 2 studio',
    summary: 'One or two sentences on the design intent.',
    cover: { src: '/images/architecture/project-slug/cover-1600.webp',
             srcLarge: '/images/architecture/project-slug/cover-2800.webp',
             width: 1600, height: 1000, alt: 'Exterior render', kind: 'photo' },
    sections: [
      { kind: 'concept', text: '…', images: [] },
      { kind: 'plans', images: [ /* drawing images */ ] },
      { kind: 'renderings', images: [ /* photo images */ ] },
    ],
    pdf: { href: '/docs/architecture/project-slug/presentation.pdf', label: 'Download presentation' },
  },
];
```

Only add the sections that the project material actually covers. The available section kinds are `concept`, `site`, `plans`, `sections`, `diagrams`, `renderings`, `interior`, `exterior`, `materials` and `technical`. Type filters appear automatically once projects have more than one type.

Until any project is added, the Home and Architecture pages link to Nicole's full Canva portfolio instead of showing placeholder projects.

### Adding product visuals

In `products.ts`, fill `logo`, `screens` (portrait mobile screenshots) and `boards` (wide images such as user flows or desktop views). While `screens` is empty, the device mockups show a title screen with the product name, not an invented interface. A "Screens & flows" gallery with the fullscreen viewer appears once there is more than one screen, or at least one board.

## Deploy

The site is a static single-page app. Every host needs to serve `index.html` for unknown paths, and this repo already includes that configuration for the hosts below.

- **Netlify**: import the repository. `netlify.toml` sets the build command and publish folder, and `public/_redirects` handles deep links.
- **Vercel**: import the repository and choose the Vite preset. `vercel.json` adds the rewrite.
- **GitHub Pages / any static host**: run `npm run build` and upload `dist/`. `dist/404.html` serves deep links.

Set `VITE_SITE_URL` (in `.env` or in the host's environment settings) to the final domain, for example `https://nicolegofman.com`. The Open Graph image and canonical URLs then become absolute, which link previews need.

The site is live at https://nicole-portfolio-six.vercel.app (Vercel, deploying from `claude/nicole-gofman-portfolio-uglqv1`).
