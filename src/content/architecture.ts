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
 * Only the Yaakov Boulevard Tower is a real office project; the others are
 * Nicole's own design concepts and studio work and must never be described
 * as built or existing buildings.
 */
export const architectureProjects: ArchitectureProject[] = [
  {
    slug: 'contemporary-villa',
    title: 'Timber & Glass Villa',
    type: 'Residential',
    context: 'Design concept · Visualization',
    summary:
      'A two-storey villa concept that opens fully onto its terrace and pool.',
    cover: img('contemporary-villa', 'pool-facade', 1600, 929, 'Two-storey villa with full-height glazing beside a pool at sunset', 'Pool façade at sunset'),
    sections: [
      {
        kind: 'concept',
        images: [],
      },
      {
        kind: 'interior',
        images: [
          img('contemporary-villa', 'living-dining', 1600, 900, 'Open living room with a white sofa, glass-framed dining area with grand piano, kitchen and oak wall', 'Living and dining space facing the terrace'),
          img('contemporary-villa', 'music-room', 1600, 824, 'Music corner with grand piano and lounge chairs beside timber fins, kitchen island and dining table', 'Music corner, kitchen and dining'),
        ],
      },
    ],
  },
  {
    slug: echoes,
    title: 'Echoes of Generations',
    type: 'Co-living housing',
    context: 'Washington Boulevard, Tel Aviv · Shenkar studio, lecturer Sharon Eshet',
    summary:
      'Studio project: co-living housing on Washington Boulevard, Tel Aviv — private homes around shared spaces.',
    cover: img(echoes, 'stair-garden', 1550, 1015, 'Glazed residential building with an external stair rising beside a green wall', 'The stair and green wall along the long façade'),
    pdf: { href: asset('/docs/architecture/echoes-of-generations-board.pdf'), label: 'Download presentation board (PDF)' },
    sections: [
      {
        kind: 'concept',
        images: [img(echoes, 'diagrams', 1600, 867, 'Concept diagrams: private, movement and public bands; balcony scheme; façade window rhythm; movement system', 'Concept diagrams — building scheme, balconies, façade and movement', 'drawing', 2800)],
      },
      {
        kind: 'site',
        images: [img(echoes, 'roof-plan', 1600, 1184, 'Roof and site plan at 1:250 showing the building between neighbouring blocks', 'Roof plan 1:250', 'drawing')],
      },
      {
        kind: 'plans',
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
    title: 'Kitchens & Living Spaces',
    type: 'Interior design',
    context: 'Design concepts · Visualization',
    summary:
      'Interior concepts: two kitchens, a living room and a balcony.',
    cover: img('interior-architecture', 'kitchen', 1600, 900, 'Kitchen with oak cabinets, a stone waterfall island and bar stools in evening light', 'Kitchen with oak joinery and stone island'),
    sections: [
      {
        kind: 'materials',
        images: [
          img('interior-architecture', 'kitchen-black-island', 1600, 900, 'Dark kitchen with gloss charcoal cabinets, lit open shelf and an oak butcher-block breakfast bar with stools', 'Dark kitchen with oak breakfast bar'),
          img('interior-architecture', 'kitchen-black-counter', 1600, 900, 'Close view of an oak counter with black sink, lit shelf with glasses and a coffee machine', 'Oak counter and lit shelf'),
        ],
      },
      {
        kind: 'plans',
        images: [img('interior-architecture', 'floor-plan-3d', 1535, 1024, 'Furnished 3D floor plan with living room, kitchen island, dining table, music room with piano, study and bedroom', '3D floor plan', 'drawing')],
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
    slug: 'urban-renewal-tower',
    title: 'Yaakov Boulevard Tower',
    type: 'Urban renewal',
    context: 'Yaakov Boulevard, Rishon LeZion · Place & Space Architecture',
    summary:
      'Building appendix for an urban renewal tower on Yaakov Boulevard, Rishon LeZion.',
    cover: img('urban-renewal-tower', 'plan-ground', 1600, 1683, 'Ground floor plan at 1:250 with the tower footprint, gardens, driveway and parking', 'Ground floor plan 1:250', 'drawing', 2699),
    sections: [
      {
        kind: 'site',
        images: [img('urban-renewal-tower', 'location', 1200, 1040, 'Location map at 1:2500 with plot 427 outlined in red on Yaakov Boulevard', 'Location map 1:2500', 'drawing')],
      },
      {
        kind: 'plans',
        images: [
          img('urban-renewal-tower', 'plan-typical', 1600, 1687, 'Typical floor plan at 1:250', 'Typical floor plan 1:250', 'drawing', 2693),
          img('urban-renewal-tower', 'plan-penthouse', 1600, 1687, 'Penthouse floor plan at 1:250', 'Penthouse floor plan 1:250', 'drawing', 2693),
        ],
      },
      {
        kind: 'sections',
        images: [img('urban-renewal-tower', 'section-aa', 1600, 2188, 'Section A-A at 1:250 through the tower and two basement parking levels', 'Section A-A 1:250', 'drawing', 2359)],
      },
      {
        kind: 'technical',
        title: 'Building appendix',
        text: 'Plan no. 431-1167873 · Appendix by architect Ayelet Malis Cohen · Place & Space Architecture.',
        images: [],
      },
    ],
  },
  {
    slug: 'mediterranean-villa',
    title: 'Gabled House',
    type: 'Residential',
    context: 'Design concept · Visualization',
    summary:
      'Two gabled volumes joined by a glazed atrium — a design concept.',
    cover: img('mediterranean-villa', 'pool-terrace', 1600, 900, 'Tiled gable house with a glazed atrium, pool and sunken fire-pit lounge', 'Pool terrace and sunken lounge'),
    sections: [
      {
        kind: 'concept',
        images: [],
      },
      {
        kind: 'exterior',
        images: [img('mediterranean-villa', 'garden-facade', 1600, 900, 'Garden façade with stone steps leading up to the glazed atrium', 'Garden façade and stone steps at dusk')],
      },
    ],
  },
];

/** Home page carousel: one strong image per project, each linking to it. */
export const homeSlides: { slug: string; image: MediaImage }[] = [
  { slug: 'mediterranean-villa', image: img('mediterranean-villa', 'garden-facade', 1600, 900, 'Tiled gable house with a glazed atrium and lit stone steps at dusk', '') },
  { slug: 'contemporary-villa', image: img('contemporary-villa', 'pool-facade', 1600, 929, 'Two-storey villa with full-height glazing beside a pool at sunset', '') },
  { slug: 'echoes-of-generations', image: img('echoes-of-generations', 'stair-garden', 1550, 1015, 'Glazed residential building with an external stair beside a green wall', '') },
  { slug: 'interior-architecture', image: img('interior-architecture', 'kitchen', 1600, 900, 'Kitchen with oak cabinets and a stone island in evening light', '') },
  { slug: 'contemporary-villa', image: img('contemporary-villa', 'living-dining', 1600, 900, 'Open living and dining space with a grand piano and oak wall', '') },
];

/**
 * The projects Nicole named for the "Selected Architectural Work" section.
 * Until their images are imported (see above), they are listed by name and
 * link to the full portfolio. Titles are project names and stay in English.
 */
export const portfolioIndex: { title: string }[] = [
  { title: 'Timber & Glass Villa' },
  { title: 'Kitchens & Living Spaces' },
  { title: 'Echoes of Generations' },
];

export const getArchitectureProject = (slug: string) =>
  architectureProjects.find((p) => p.slug === slug);
