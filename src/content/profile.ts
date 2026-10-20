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
  headline: ['Designing spaces.', 'Building ideas.'] as const,
  intro:
    'I’m Nicole Gofman — an architectural designer and digital product builder exploring the intersection of space, technology, and human experience.',
  about: [
    'I’m an Architecture & Interior Design student at Shenkar College of Engineering and work as an architect at Place & Space Architecture, on residential buildings and high-rise towers — from design and detailed drawings to building permits.',
    'Alongside architecture, I create and develop apps with Base44. I founded Flash Luz, a platform for beauty business management, and built it as a no-code app from concept to launch — designing its product architecture, UX/UI and user flows.',
    'Before that I worked across real estate, finance and administration. What connects it all: I love making things work better.',
  ],
  location: 'Ra’anana, Israel',
  email: 'Gof.nicole@gmail.com',
  linkedin: 'https://il.linkedin.com/in/nicole-gofman-0b4968296',
  /** Nicole's own architecture portfolio, hosted on Canva. */
  architecturePortfolio: 'https://p-ng.my.canva.site/portfolio',
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
    role: 'CEO’s Personal Assistant',
    organisation: 'Abre',
    period: '2024–2025',
    bullets: [
      'Supported real estate projects and administrative operations',
      'Managed client communication and documentation',
    ],
  },
  {
    role: 'Finance Assistant',
    organisation: 'Israeli Building Center Group',
    period: '2024',
    bullets: ['Managed SAP processes, payments, and supplier coordination'],
  },
  {
    role: 'Administrative Assistant',
    organisation: 'Gil Hirschman & Co.',
    period: '2023–2024',
    bullets: ['Managed client relations and legal documentation'],
  },
  {
    role: 'Security Office Soldier – Personal Assistant',
    organisation: 'Ministry of Defense, Israel',
    period: '2022–2023',
    bullets: ['Oversaw administrative operations, scheduling, and coordination'],
  },
];

export const education: EducationItem[] = [
  {
    programme: 'Architecture & Interior Design',
    institution: 'Shenkar College of Engineering',
    period: '2023 – 2027',
    note: 'Studies in progress · Dean’s List',
  },
  { programme: '3Ds Max & V-Ray Course', period: '2024' },
  { programme: 'Real Estate Agent License', period: '2023' },
  { programme: 'High School Diploma', institution: 'Metro West High School, Ra’anana', period: '2019 – 2022' },
];

/** Skills as listed in the CV. */
export const skills: { group: string; items: string[] }[] = [
  { group: 'Architecture & visualization', items: ['Revit', 'AutoCAD', 'SketchUp', '3DS MAX', 'Enscape', 'Twinmotion'] },
  { group: 'Digital products', items: ['Base44'] },
  {
    group: 'Office & business',
    items: ['Advanced Microsoft Office (Word, Excel, PowerPoint, Outlook)', 'SAP'],
  },
  { group: 'Design', items: ['Graphic Design', 'Canva'] },
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
