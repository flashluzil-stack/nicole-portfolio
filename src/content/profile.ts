import type { EducationItem, ExperienceItem } from './types';

/**
 * Personal and professional information.
 * Source: Nicole Gofman CV (facts as supplied in the project brief).
 * Keep titles and responsibilities worded exactly as in the CV.
 */
export const profile = {
  name: 'Nicole Gofman',
  identity: 'Architectural designer & digital product builder',
  headline: ['Designing spaces.', 'Building ideas.'] as const,
  intro:
    'I’m Nicole Gofman — an architectural designer and digital product builder exploring the intersection of space, technology, and human experience.',
  about: [
    'My work moves between two scales. In architecture, I study how people inhabit space — translating ideas into drawings and visualizations, and into the technical documentation that makes buildings possible.',
    'In technology, I apply the same thinking to digital products: organising business logic, mapping user journeys and shaping interfaces that turn an idea into a working system.',
  ],
  email: 'Gof.nicole@gmail.com',
  linkedin: 'https://il.linkedin.com/in/nicole-gofman-0b4968296',
  /** Nicole's own architecture portfolio, hosted on Canva. */
  architecturePortfolio: 'https://p-ng.my.canva.site/portfolio',
  contactInvitation:
    'Have a project, an idea, or an opportunity to discuss? I’d love to connect.',
};

export const education: EducationItem[] = [
  {
    programme: 'Architecture and Interior Design',
    institution: 'Shenkar College of Engineering',
    period: '2023–2027',
    note: 'Studies in progress',
  },
];

export const experience: ExperienceItem[] = [
  {
    role: 'Founder & Product Builder',
    organisation: 'Flash Luz',
    period: '2026–present',
    text: 'Building a platform for beauty-business management and customer bookings.',
  },
  {
    role: 'Architectural work',
    organisation: 'Place & Space Architecture',
    period: '2025–present',
  },
  {
    role: 'Real estate operations, finance, administration & coordination',
    organisation: 'Previous experience',
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: 'Architectural design & BIM', items: ['Revit', 'AutoCAD', 'SketchUp'] },
  { group: 'Visualization', items: ['3ds Max', 'Enscape', 'Twinmotion'] },
  { group: 'Digital products', items: ['Base44'] },
];

/** The qualities the portfolio emphasises, in Nicole's own framing. */
export const disciplines = {
  architecture: {
    label: 'Architecture',
    keywords: ['Spatial design', 'Architectural thinking', 'Technical documentation', 'Materiality', 'Visualization', 'The built environment'],
  },
  technology: {
    label: 'Technology',
    keywords: ['Digital products', 'Application design', 'User experience', 'Product strategy', 'Ideas into functional systems'],
  },
};
