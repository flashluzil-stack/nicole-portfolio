import type { Product } from './types';

/**
 * Digital products.
 * Source: Flash.pdf (descriptions as supplied in the project brief).
 *
 * To add authentic visuals: export the screenshots / logos from Flash.pdf,
 * run `npm run images` (see README) and list them under `logo`, `screens`
 * and `boards`. Until screens are added, the device mockups render a
 * typographic title screen instead of an invented interface.
 */
export const products: Product[] = [
  {
    slug: 'flash-luz',
    name: 'Flash Luz',
    tagline: 'Business management and customer bookings for beauty professionals.',
    status: 'Live product',
    role: 'Founder & Product Builder',
    period: '2026–present',
    screens: [],
    boards: [],
    overview:
      'Flash Luz is a platform for beauty-business management and customer bookings. It brings appointments, clients, payments and day-to-day workflows together in one place, designed to help beauty professionals operate more efficiently.',
    caseStudy: [
      {
        heading: 'The problem',
        text: 'Running a beauty business means coordinating appointments, keeping track of clients, handling payments and repeating the same operational steps every day. Flash Luz addresses that operational load so professionals can spend their time on their clients.',
      },
      {
        heading: 'Who it is for',
        text: 'Beauty professionals and beauty businesses — and the customers who book their services.',
      },
      {
        heading: 'Product vision',
        text: 'A single, calm system for the business side of beauty work: the professional manages the business, the customer books with ease, and the workflows between them are designed to be efficient.',
      },
      {
        heading: 'Building the product',
        text: 'As founder and product builder, Nicole leads the product from concept to working platform — defining the business logic, the user journeys of both professionals and customers, and the interface that connects them.',
      },
    ],
    features: [
      { title: 'Business management', text: 'An overview of the business in one place.' },
      { title: 'Appointments', text: 'Scheduling and managing bookings.' },
      { title: 'Clients', text: 'Keeping client information organised.' },
      { title: 'Payments', text: 'Handling payments as part of the workflow.' },
      { title: 'Customer bookings', text: 'Customers book appointments with the business.' },
      { title: 'Workflows', text: 'Operational flows designed for efficiency.' },
    ],
    url: { href: 'https://flashluz.com', label: 'flashluz.com' },
    accent: '#B08D63',
  },
  {
    slug: 'flashtravel',
    name: 'FlashTravel',
    tagline: 'Plan, discover, document and share a trip — in one place.',
    status: 'Concept',
    screens: [],
    boards: [],
    overview:
      'FlashTravel is a travel platform concept that combines trip planning, recommendations, travel documentation, location-based discovery, social connections and expense sharing in a single experience.',
    caseStudy: [
      {
        heading: 'The idea',
        text: 'A trip involves many separate tasks — planning, finding places, keeping documents, staying connected with fellow travellers and splitting costs. FlashTravel explores how these parts of the journey can live in one product.',
      },
      {
        heading: 'Design focus',
        text: 'The concept organises the journey around the traveller: what to plan before leaving, what to discover nearby while on the way, and what to record and settle with others along the trip.',
      },
    ],
    features: [
      { title: 'Trip planning' },
      { title: 'Recommendations' },
      { title: 'Travel documentation' },
      { title: 'Location-based discovery' },
      { title: 'Social connections' },
      { title: 'Expense sharing' },
    ],
    accent: '#7E8C86',
  },
  {
    slug: 'worldly',
    name: 'Worldly',
    tagline: 'An AI-based interactive quiz for discovering travel destinations.',
    status: 'Concept',
    screens: [],
    boards: [],
    overview:
      'Worldly is an AI-based interactive quiz product designed to make learning about travel destinations more engaging.',
    caseStudy: [
      {
        heading: 'The idea',
        text: 'Learning about a destination is often passive. Worldly turns it into an interactive quiz, using AI to make discovering places around the world more engaging.',
      },
    ],
    features: [
      { title: 'Interactive destination quiz' },
      { title: 'AI-based question experience' },
    ],
    accent: '#9A7B6A',
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
