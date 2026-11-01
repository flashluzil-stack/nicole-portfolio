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
    slug: 'gymnasium',
    title: 'The Gymnasium',
    type: 'Public building',
    context: 'Final project · Shenkar · Herzl Street, Florentin, Tel Aviv · Supervisor: Moshe Alfasi',
    summary:
      'A national centre for sports culture in Florentin, Tel Aviv: lectures and sports broadcasts, a rehabilitation and physiotherapy centre, a café and an interactive centre on the history of sport in Israel. Two buildings are joined by a glass bridge that both connects and separates their functions.',
    cover: img('gymnasium', 'render-facade', 1572, 1001, 'Two-storey building with a folded light roof, a round skylight and a glazed façade over a colonnade along the street', 'Street façade'),
    sections: [
      {
        kind: 'concept',
        title: 'Concept — The Starting Line',
        text:
          'Like the starting line on a track, the Gymnasium marks a point of departure: every visit begins with movement. Lines of wood are the language of the project. Vertical timber ribs start at the reception desk, continue along the stair railing and landing as one continuous piece, and return through the space as a rhythm of lines, like running lanes marked on the ground. The reception building (café and administration, with the physiotherapy centre above) and the museum building (the sports museum, with the conference hall above) are joined by a glass bridge. A perimeter walking path surrounds the site and links Herzl, Frankel and HaShuk streets, with stepped seating for sitting, watching and gathering along the way.',
        images: [
          img('gymnasium', 'concept-board', 1600, 1000, 'Concept board: the Starting Line text, programme diagram and site circulation diagram with the perimeter walking path', 'Concept board — programme and circulation on the site', 'drawing', 2800),
        ],
      },
      {
        kind: 'exterior',
        images: [
          img('gymnasium', 'render-aerial', 1580, 996, 'Aerial view at dusk of two glazed buildings with light folded roofs joined by a glass bridge, with planted strips and a walking path along the street', 'Aerial view — two buildings joined by a glass bridge'),
          img('gymnasium', 'render-entrance-cafe', 1600, 924, 'Entrance under a cantilevered upper floor, with café tables outside and the wooden stair visible through the glass', 'Entrance and café'),
        ],
      },
      {
        kind: 'interior',
        text: 'The reception desk and the stair are designed as one piece of furniture: vertical wood ribs wrap the desk and rise with the stair to the upper floor, under a round skylight.',
        images: [
          img('gymnasium', 'render-stair-desk', 1384, 1136, 'Double-height lobby with a curved reception desk wrapped in vertical wood ribs that continue up the stair railing, under a round skylight', 'Lobby — reception desk and stair'),
          img('gymnasium', 'render-stair-ascent', 1205, 1306, 'Stone treads with lit edges rising between walls of vertical wood ribs toward the upper floor', 'The stair to the upper floor'),
        ],
      },
      {
        kind: 'plans',
        images: [
          img('gymnasium', 'site-ground-plan', 1600, 1701, 'Site plan and ground floor plan', 'Site and ground floor plan', 'drawing', 2800),
          img('gymnasium', 'floor-plan', 1600, 2704, 'Upper floor plan', 'Upper floor plan', 'drawing', 2800),
        ],
      },
      {
        kind: 'sections',
        images: [
          img('gymnasium', 'sections', 1600, 977, 'Construction sections A-A and B-B', 'Sections A-A and B-B', 'drawing', 2800),
          img('gymnasium', 'elevations', 1600, 998, 'Rendered elevations', 'Elevations', 'drawing', 2800),
        ],
      },
      {
        kind: 'technical',
        images: [img('gymnasium', 'details', 1600, 1024, 'Construction detail section and structural plans', 'Construction detail and structural plans', 'drawing', 2800)],
      },
    ],
  },
  {
    slug: 'shahar-apartment',
    title: 'Shahar’s Apartment',
    year: '2026',
    type: 'Interior design · AI',
    context: 'Living room redesign · Client project',
    summary:
      'A living room redesign for a client, run through an AI-assisted design process I built: a visual brief, AI renderings of his own room, and one shared project page.',
    cover: img('shahar-apartment', 'combo', 600, 550, 'Warm living room with a sheer ceiling-hung curtain, wood-slat wall, arc floor lamp and a round wooden coffee table', 'The balcony wall: sheer curtain, wood and warm light'),
    sections: [
      {
        kind: 'concept',
        title: 'Architecture meets AI',
        text:
          'A real living room redesign for a client, carried out through an AI-assisted process I designed. Instead of a PDF and a long chain of messages, the client gets one link. First comes a short visual questionnaire: budget, how to carry out the work, what replaces the desk, how to hide the shutter box and cables on the balcony wall, and lighting. Each option is drawn as a simple diagram, with my recommendation marked. His answers come straight back to me, and the design develops from them in AI renderings of his own room. The same page then becomes the project plan: the decisions, the renderings, a shopping list with prices and a task list to tick off.',
        images: [
          img('shahar-apartment', 'app-wall', 860, 1150, 'Questionnaire screen asking what replaces the desk, with drawn options and a “Nicole recommends” tag', 'The visual brief: options drawn as diagrams'),
          img('shahar-apartment', 'app-lighting', 860, 1150, 'Questionnaire screen about lighting, comparing a large ceiling fixture with a track of spotlights', 'Lighting choices, with my recommendation'),
          img('shahar-apartment', 'app-plan', 860, 1180, 'Project page titled “Shahar’s living room: what we’re doing”, with renderings of the shelf wall and balcony wall', 'The shared project page'),
        ],
      },
      {
        kind: 'plans',
        text: 'From a hand sketch drawn on site to a furnished plan with dimensions, finishes and a lighting plan.',
        images: [
          img('shahar-apartment', 'sketch', 675, 900, 'Hand-drawn sketch of the living room layout on paper', 'Site sketch', 'drawing'),
          img('shahar-apartment', 'plan', 290, 800, 'Furnished plan of the living room with dimensions, a palette of finishes and lighting notes', 'Furnished plan, finishes and lighting', 'drawing'),
        ],
      },
      {
        kind: 'renderings',
        text: 'The chosen direction: warm and modern. A sheer curtain hung from the ceiling hides the shutter box and rails, floating shelves with plants replace the desk, and soft central lighting warms the whole room. Most of it can be done without contractors.',
        images: [
          img('shahar-apartment', 'living', 773, 800, 'Living room with a beige sectional sofa, arc lamp, round wooden coffee table and a small dining corner', 'Living room and dining corner'),
          img('shahar-apartment', 'v1', 675, 900, 'Corner with floating lit shelves, plants, a wooden chair and a framed coastal print above the sofa', 'Floating shelves in place of the desk'),
          img('shahar-apartment', 'v2', 675, 900, 'View toward the balcony with a sheer ceiling-hung curtain and a large round ceiling light', 'Balcony wall and central light'),
          img('shahar-apartment', 'r3', 675, 900, 'Sheer curtain in front of the balcony door with a wood-slat wall and warm cove lighting', 'Curtain and wood slats'),
          img('shahar-apartment', 'panel', 800, 574, 'Upholstered pelmet with hidden LED light above a full-height sheer curtain', 'Pelmet with hidden LED'),
        ],
      },
    ],
  },
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
  { slug: 'gymnasium', image: img('gymnasium', 'render-aerial', 1580, 996, 'Two glazed buildings with light folded roofs joined by a glass bridge, at dusk', '') },
  { slug: 'mediterranean-villa', image: img('mediterranean-villa', 'garden-facade', 1600, 900, 'Tiled gable house with a glazed atrium and lit stone steps at dusk', '') },
  { slug: 'contemporary-villa', image: img('contemporary-villa', 'pool-facade', 1600, 929, 'Two-storey villa with full-height glazing beside a pool at sunset', '') },
  { slug: 'echoes-of-generations', image: img('echoes-of-generations', 'stair-garden', 1550, 1015, 'Glazed residential building with an external stair beside a green wall', '') },
  { slug: 'interior-architecture', image: img('interior-architecture', 'kitchen', 1600, 900, 'Kitchen with oak cabinets and a stone island in evening light', '') },
  { slug: 'contemporary-villa', image: img('contemporary-villa', 'living-dining', 1600, 900, 'Open living and dining space with a grand piano and oak wall', '') },
  { slug: 'gymnasium', image: img('gymnasium', 'render-stair-desk', 1384, 1136, 'Lobby with a reception desk and stair wrapped in vertical wood ribs', '') },
];

export const getArchitectureProject = (slug: string) =>
  architectureProjects.find((p) => p.slug === slug);
