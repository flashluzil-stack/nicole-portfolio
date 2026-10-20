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
  kind: MediaImage['kind'] = 'photo',
  widthLarge?: number,
): MediaImage => ({
  src: asset(`/images/architecture/${slug}/${file}-1600.webp`),
  ...(widthLarge && { srcLarge: asset(`/images/architecture/${slug}/${file}-2800.webp`), widthLarge }),
  width,
  height,
  alt,
  caption,
  kind,
});

const echoes = 'echoes-of-generations';

/*
 * Visualizations, drawings and boards supplied by Nicole. Descriptions are
 * short project notes written from the material, at Nicole's request.
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
    slug: echoes,
    title: 'Echoes of Generations',
    type: 'Co-living housing',
    context: 'Washington Boulevard, Tel Aviv · Shenkar studio, lecturer Sharon Eshet',
    summary:
      'Housing for several families on Washington Boulevard in Tel Aviv, built around the idea that neighbours can share more than a staircase. Private apartments sit beside rooms that belong to the whole building, so ordinary routines become moments of meeting — and every household still has a home it can close the door on.',
    cover: img(echoes, 'stair-garden', 1550, 1015, 'Glazed residential building with an external stair rising beside a green wall', 'The stair and green wall along the long façade'),
    pdf: { href: asset('/docs/architecture/echoes-of-generations-board.pdf'), label: 'Download presentation board (PDF)' },
    sections: [
      {
        kind: 'concept',
        text: 'The building is organised in three bands — private homes, a band of movement, and spaces open to the whole community. Stepped balconies and an open stair turn circulation into shared outdoor space, and the façade shifts from wide glazing on the common floors to screened windows where the rooms are private.',
        images: [img(echoes, 'diagrams', 1600, 867, 'Concept diagrams: private, movement and public bands; balcony scheme; façade window rhythm; movement system', 'Concept diagrams — building scheme, balconies, façade and movement', 'drawing', 2800)],
      },
      {
        kind: 'site',
        text: 'The plot sits mid-block between neighbouring residential buildings, alongside the green strip of the boulevard. A planted garden runs the length of the site and connects the street to the shared spaces at the back.',
        images: [img(echoes, 'roof-plan', 1600, 1184, 'Roof and site plan at 1:250 showing the building between neighbouring blocks', 'Roof plan 1:250', 'drawing')],
      },
      {
        kind: 'plans',
        text: 'The ground floor opens with an entrance lobby and the garden; above it, apartments of different sizes are arranged around rooms that the residents share.',
        images: [
          img(echoes, 'plan-ground', 1600, 1035, 'Ground floor plan at 1:100 with entrance lobby, garden and apartment', 'Ground floor plan 1:100', 'drawing'),
          img(echoes, 'plan-level-1', 1600, 754, 'Level 1 floor plan at 1:100', 'Level 1 plan 1:100', 'drawing'),
          img(echoes, 'plan-level-2', 1600, 886, 'Level 2 floor plan at 1:100', 'Level 2 plan 1:100', 'drawing'),
          img(echoes, 'plan-level-3', 1600, 710, 'Level 3 floor plan at 1:100', 'Level 3 plan 1:100', 'drawing'),
          img(echoes, 'plan-level-4', 1600, 921, 'Level 4 floor plan at 1:100', 'Level 4 plan 1:100', 'drawing'),
        ],
      },
      {
        kind: 'sections',
        images: [
          img(echoes, 'sections', 1600, 1604, 'Sections A-A and B-B at 1:100', 'Sections A-A and B-B, 1:100', 'drawing'),
          img(echoes, 'elevations', 1600, 857, 'Elevation at 1:100 with the diagonal stair and green wall', 'Elevation 1:100', 'drawing'),
        ],
      },
      {
        kind: 'renderings',
        images: [img(echoes, 'courtyard', 1532, 1026, 'The building seen from the shared garden courtyard at sunset', 'From the shared courtyard')],
      },
      {
        kind: 'technical',
        title: 'Presentation board',
        images: [img(echoes, 'board', 1600, 2261, 'Full presentation board for Echoes of Generations', 'Presentation board (A3)', 'drawing', 2800)],
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
  {
    slug: 'mediterranean-villa',
    title: 'Mediterranean Villa',
    type: 'Residential',
    context: 'Private house',
    summary:
      'Two traditional gabled volumes with clay-tile roofs are joined by a glazed atrium, so the familiar form of a village house meets an open, light-filled centre. Stone terraces, olive trees and a sunken fire-pit lounge beside the pool extend the house into the landscape.',
    cover: img('mediterranean-villa', 'pool-terrace', 1600, 900, 'Tiled gable house with a glazed atrium, pool and sunken fire-pit lounge', 'Pool terrace and sunken lounge'),
    sections: [
      {
        kind: 'concept',
        text: 'The project takes the archetypal pitched-roof house as a starting point and opens it up: the two gables keep the intimate rooms, while the glass atrium between them becomes the shared heart of the home, filled with daylight and views of the garden.',
        images: [],
      },
      {
        kind: 'exterior',
        images: [img('mediterranean-villa', 'garden-facade', 1600, 900, 'Garden façade with stone steps leading up to the glazed atrium', 'Garden façade and stone steps at dusk')],
      },
    ],
  },
];

/** The Home page's lead image (a second view of the Mediterranean Villa). */
export const homeHero = {
  slug: 'mediterranean-villa',
  image: img(
    'mediterranean-villa',
    'garden-facade',
    1600,
    900,
    'Tiled gable house with a glazed atrium and lit stone steps at dusk',
    'Mediterranean Villa — garden façade',
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
