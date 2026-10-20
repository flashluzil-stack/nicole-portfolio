import type { EducationItem, ExperienceItem, MediaImage } from './types';
import { asset } from '../lib/asset';

/**
 * Personal and professional information.
 * Sources: Nicole Gofman's CV (titles, dates, responsibilities, education,
 * skills — worded as in the document) and the "About" page of Flash.pdf.
 */
export const profile = {
  name: 'Nicole Gofman',
  /** Title line as written at the top of the CV. */
  identity: 'Architect | Product Builder | Founder of Flash Luz',
  headline: ['Designing spaces.', 'Building ideas.'] as [string, string],
  intro:
    'I’m Nicole Gofman — an architectural designer and digital product builder exploring the intersection of space, technology, and human experience.',
  about: [
    'I work as an architect at Place & Space Architecture on residential buildings and high-rise towers, and studied Architecture & Interior Design at Shenkar (2023 – 2026).',
    'Alongside architecture, I create and develop apps with Base44. I founded Flash Luz, a platform for beauty business management, and built it as a no-code app from concept to launch — designing its product architecture, UX/UI and user flows.',
    'Before that I worked across real estate, finance and administration. What connects it all: I love making things work better.',
  ],
  location: 'Ra’anana, Israel',
  email: 'Gof.nicole@gmail.com',
  phone: '054-790-9722',
  phoneHref: 'tel:+972547909722',
  linkedin: 'https://il.linkedin.com/in/nicole-gofman-0b4968296',
  /** The CV as supplied by Nicole (PDF). */
  cv: asset('/docs/Nicole-Gofman-CV.pdf'),
  contactInvitation:
    'Have a project, an idea, or an opportunity to discuss? I’d love to connect.',
  portrait: {
    src: asset('/images/about/nicole-portrait-1600.webp'),
    width: 1210,
    height: 1613,
    alt: 'Portrait of Nicole Gofman',
    kind: 'photo',
  } satisfies MediaImage,
  atWork: {
    src: asset('/images/about/nicole-at-work-1600.webp'),
    width: 642,
    height: 930,
    alt: 'Nicole Gofman sketching on a pinned-up presentation board',
    kind: 'photo',
  } satisfies MediaImage,
};

export const experience: ExperienceItem[] = [
  {
    id: 'place-space',
    role: 'Architect',
    organisation: 'Place & Space Architecture',
    period: '2025 – Present',
    bullets: [
      'Led planning and design of residential buildings and high-rise towers',
      'Prepared architectural drawings, layouts, and detailed plans',
      'Managed building permits, municipal submissions, and zoning (TABA)',
      'Worked with AutoCAD / Revit on project development',
      'Coordinated with clients, consultants, and authorities',
    ],
  },
  {
    id: 'flash-luz',
    role: 'Product Builder',
    organisation: 'Founder – Flash Luz',
    period: '2026 – Present',
    bullets: [
      'Built a no-code app from concept to launch',
      'Designed product architecture, UX/UI, and user flows',
      'Developed a platform for beauty business management',
    ],
  },
  {
    id: 'abre',
    role: 'CEO’s Personal Assistant',
    organisation: 'Abre',
    period: '2024–2025',
    bullets: [
      'Supported real estate projects and administrative operations',
      'Managed client communication and documentation',
    ],
  },
  {
    id: 'ibc',
    role: 'Finance Assistant',
    organisation: 'Israeli Building Center Group',
    period: '2024',
    bullets: ['Managed SAP processes, payments, and supplier coordination'],
  },
  {
    id: 'hirschman',
    role: 'Administrative Assistant',
    organisation: 'Gil Hirschman & Co.',
    period: '2023–2024',
    bullets: ['Managed client relations and legal documentation'],
  },
  {
    id: 'mod',
    role: 'Security Office Soldier – Personal Assistant',
    organisation: 'Ministry of Defense, Israel',
    period: '2022–2023',
    bullets: ['Oversaw administrative operations, scheduling, and coordination'],
  },
];

/**
 * Architecture offices, shown together on the Home page. Place & Space is
 * from the CV; FIKS Architecture (period and responsibilities) was supplied
 * by Nicole separately. No job title was given for FIKS, so none is shown.
 */
export const architectureOffices: {
  id: string;
  organisation: string;
  role?: string;
  period?: string;
  bullets?: string[];
}[] = [
  {
    id: 'place-space',
    organisation: 'Place & Space Architecture',
    role: 'Architect',
    period: '2025 – Present',
    bullets: experience.find((e) => e.id === 'place-space')?.bullets,
  },
  {
    id: 'fiks',
    organisation: 'FIKS Architecture',
    period: '2025 – 2026',
    bullets: ['Promoted zoning plans (TABA)', 'Project management', 'Prepared and submitted permit applications'],
  },
];

export const education: EducationItem[] = [
  {
    id: 'shenkar',
    programme: 'Architecture & Interior Design',
    institution: 'Shenkar College of Engineering',
    period: '2023 – 2026',
    note: 'Dean’s List',
  },
  { id: 'vray', programme: '3Ds Max & V-Ray Course', period: '2024' },
  { id: 'realtor', programme: 'Real Estate Agent License', period: '2023' },
  { id: 'school', programme: 'High School Diploma', institution: 'Metro West High School, Ra’anana', period: '2019 – 2022' },
];

/** Skills as listed in the CV. */
export const skills: { id: string; group: string; items: string[] }[] = [
  { id: 'architecture', group: 'Architecture & visualization', items: ['Revit', 'AutoCAD', 'SketchUp', '3DS MAX', 'Enscape', 'Twinmotion'] },
  { id: 'digital', group: 'Digital products', items: ['Base44'] },
  {
    id: 'office',
    group: 'Office & business',
    items: ['Advanced Microsoft Office (Word, Excel, PowerPoint, Outlook)', 'SAP'],
  },
  { id: 'design', group: 'Design', items: ['Graphic Design', 'Canva'] },
];

export const languages = ['Hebrew', 'English', 'Russian'];

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
