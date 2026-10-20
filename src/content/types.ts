/**
 * Content model for the portfolio.
 *
 * Every piece of copy, every project and every product lives in /src/content.
 * Layout components only read from here — to add or update work, edit the
 * data files, never the page components.
 */

/** An image that ships with the site (stored under /public). */
export interface MediaImage {
  /** Path under /public, e.g. "/images/architecture/studio-house/plan-01.webp". */
  src: string;
  /**
   * Optional larger rendition used in the fullscreen viewer and on high-DPI
   * screens. `npm run images` produces both automatically (…-1600 / …-2800).
   */
  srcLarge?: string;
  /** Pixel width of `srcLarge`. */
  widthLarge?: number;
  alt: string;
  caption?: string;
  /** Intrinsic size — prevents layout shift. */
  width: number;
  height: number;
  /**
   * "drawing" images (plans, sections, elevations, diagrams, sheets) are
   * never cropped: they are shown whole on a paper-coloured mat.
   * "photo" images (renders, models, photographs) may fill their frame.
   */
  kind: 'drawing' | 'photo';
}

export type ArchitectureSectionKind =
  | 'concept'
  | 'site'
  | 'plans'
  | 'sections'
  | 'diagrams'
  | 'renderings'
  | 'interior'
  | 'exterior'
  | 'materials'
  | 'technical';

export interface ArchitectureSection {
  kind: ArchitectureSectionKind;
  /** Optional override of the default heading for this kind. */
  title?: string;
  text?: string;
  images: MediaImage[];
}

export interface ArchitectureProject {
  slug: string;
  title: string;
  /** As stated in the source portfolio, e.g. "2024" or "2023–2024". */
  year?: string;
  /** e.g. "Residential", "Public building", "Interior design". */
  type: string;
  /** Location and/or academic context, e.g. "Shenkar College — Year 2 studio". */
  context?: string;
  summary: string;
  cover: MediaImage;
  sections: ArchitectureSection[];
  /** Optional downloadable presentation (path under /public). */
  pdf?: { href: string; label: string };
}

export type ProductStatus = 'Launched' | 'In development' | 'Prototype' | 'Concept';

export interface ProductFeature {
  title: string;
  text?: string;
}

export interface CaseStudyBlock {
  heading: string;
  text: string;
}

export interface Product {
  slug: string;
  name: string;
  /** One-line positioning statement. */
  tagline: string;
  status: ProductStatus;
  /** Nicole's role, worded as in the CV. */
  role?: string;
  period?: string;
  logo?: MediaImage;
  /** Authentic app screens (portrait mobile screenshots work best). */
  screens: MediaImage[];
  /** Wider imagery: desktop views, user-flow boards, brand sheets. */
  boards: MediaImage[];
  overview: string;
  /**
   * Case-study chapters (problem, audience, vision, flows, approach…).
   * Only chapters supported by source material should be added.
   */
  caseStudy: CaseStudyBlock[];
  /** Bulleted chapters, e.g. "The problem" and "What makes it different". */
  lists?: CaseStudyList[];
  features: ProductFeature[];
  /** Functionality described as planned or proposed — shown separately. */
  proposed?: ProductFeature[];
  /** Live destination, only when verified. */
  url?: { href: string; label: string };
  /** Accent used on the product's device screen. */
  accent: string;
}

export interface ExperienceItem {
  /** Stable key, identical in every language. */
  id: string;
  role: string;
  organisation: string;
  period?: string;
  text?: string;
  /** Responsibilities, worded as in the CV. */
  bullets?: string[];
}

export interface EducationItem {
  /** Stable key, identical in every language. */
  id: string;
  programme: string;
  institution?: string;
  period: string;
  note?: string;
}

export interface CaseStudyList {
  heading: string;
  items: string[];
}
