import type { ArchitectureProject } from './types';

/**
 * Architecture projects.
 * Source: Nicole's Canva portfolio — https://p-ng.my.canva.site/portfolio
 *
 * Only Nicole's real projects belong here. Each project needs its exported
 * images (place originals in /assets-src/architecture/<slug>/ and run
 * `npm run images`). See README → "Adding an architecture project" for a
 * complete example entry.
 *
 * While this list is empty, the Architecture page and Home page link to the
 * full Canva portfolio instead of showing placeholder projects.
 */
export const architectureProjects: ArchitectureProject[] = [];

/**
 * The projects Nicole named for the "Selected Architectural Work" section.
 * Until their images are imported (see above), they are listed by name and
 * link to the full portfolio. Titles are project names and stay in English.
 */
export const portfolioIndex: { title: string }[] = [
  { title: 'Contemporary Villa' },
  { title: 'Interior Architecture' },
  { title: 'Echoes of Generations' },
];

export const getArchitectureProject = (slug: string) =>
  architectureProjects.find((p) => p.slug === slug);
