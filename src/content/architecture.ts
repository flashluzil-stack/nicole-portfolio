import type { ArchitectureProject, MediaImage } from './types';
import { asset } from '../lib/asset';

/**
 * Architecture projects — Nicole's own work, from the visualizations she
 * supplied (originals in /assets-src/architecture/<slug>/; run
 * `npm run images` after adding more). Hebrew text lives in
 * ./he/architecture.ts.
 */
const img = (
  slug: string,
  file: string,
  width: number,
  height: number,
  alt: string,
  caption: string,
): MediaImage => ({
  src: asset(`/images/architecture/${slug}/${file}-1600.webp`),
  width,
  height,
  alt,
  caption,
  kind: 'photo',
});

/*
 * Visualizations supplied by Nicole. Descriptions are short project notes
 * written from the renderings, at Nicole's request.
 */
export const architectureProjects: ArchitectureProject[] = [
  {
    slug: 'contemporary-villa',
    title: 'Contemporary Villa',
    type: 'Residential',
    context: 'Private villa',
    summary:
      'A two-storey family villa that opens completely onto its stone terrace and pool. Floor-to-ceiling glazing turns the ground floor into one continuous space for living, dining and music, while a timber-clad upper volume holds the private rooms beneath a deep, cantilevered roof.',
    cover: img('contemporary-villa', 'pool-facade', 1600, 929, 'Two-storey villa with full-height glazing beside a pool at sunset', 'Pool façade at sunset'),
    sections: [
      {
        kind: 'concept',
        text: 'The house is designed as two stacked layers: an open, transparent ground floor that belongs to the garden, and a more sheltered upper floor wrapped in timber and shaded by the roof overhang. Sliding glass walls and continuous stone paving blur the line between inside and outside.',
        images: [],
      },
    ],
  },
  {
    slug: 'echoes-of-generations',
    title: 'Echoes of Generations',
    type: 'Residential',
    context: 'Private house',
    summary:
      'Two traditional gabled volumes with clay-tile roofs are joined by a glazed atrium, so the familiar form of a village house meets an open, light-filled centre. Stone terraces, olive trees and a sunken fire-pit lounge beside the pool extend the house into the landscape.',
    cover: img('echoes-of-generations', 'pool-terrace', 1600, 900, 'Tiled gable house with a glazed atrium, pool and sunken fire-pit lounge', 'Pool terrace and sunken lounge'),
    sections: [
      {
        kind: 'concept',
        text: 'The project takes the archetypal pitched-roof house as an inheritance and opens it up: the two gables keep the intimate rooms, while the glass atrium between them becomes the shared heart of the home, filled with daylight and views of the garden.',
        images: [],
      },
      {
        kind: 'exterior',
        images: [
          img('echoes-of-generations', 'garden-facade', 1600, 900, 'Garden façade with stone steps leading up to the glazed atrium', 'Garden façade and stone steps at dusk'),
        ],
      },
    ],
  },
  {
    slug: 'interior-architecture',
    title: 'Interior Architecture',
    type: 'Interior design',
    context: 'Family home and city apartment',
    summary:
      'Interior design for a family home and a city apartment: a warm kitchen of oak joinery with a stone island and integrated lighting, and a bright living room and balcony arranged around the view of the trees and skyline.',
    cover: img('interior-architecture', 'kitchen', 1600, 900, 'Kitchen with oak cabinets, a stone waterfall island and bar stools in evening light', 'Kitchen with oak joinery and stone island'),
    sections: [
      {
        kind: 'materials',
        text: 'A calm, natural palette runs through both spaces: oak, light stone and terrazzo, linen textiles and matt black details, with concealed lighting under the cabinets and counters to make the materials glow in the evening.',
        images: [],
      },
      {
        kind: 'interior',
        images: [
          img('interior-architecture', 'living-room', 823, 941, 'Living room with a white sectional sofa facing a large window and city view', 'Living room facing the view'),
          img('interior-architecture', 'balcony', 838, 941, 'Covered balcony with a grill, lounge seating and a view of trees and towers', 'Balcony lounge and outdoor kitchen'),
        ],
      },
    ],
  },
];

/** The Home page's lead image (a second view of Echoes of Generations). */
export const homeHero = {
  slug: 'echoes-of-generations',
  image: img(
    'echoes-of-generations',
    'garden-facade',
    1600,
    900,
    'Tiled gable house with a glazed atrium and lit stone steps at dusk',
    'Echoes of Generations — garden façade',
  ),
};

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
