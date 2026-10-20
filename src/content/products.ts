import type { MediaImage, Product } from './types';
import { asset } from '../lib/asset';

/**
 * Digital products.
 * Source: Flash.pdf ("Flash Apps — by Nicole"). The original copy is in
 * Hebrew; it is translated here as closely as possible. Screens are the
 * authentic app screenshots from the same document (the app UI is Hebrew).
 * Status labels follow the CV: Flash Luz was "built … from concept to
 * launch"; FlashTravel is shown through working screens; Worldly is
 * described only as an idea, with its app icon.
 */

const dir = asset('/images/technology');

const screen = (path: string, width: number, height: number, alt: string, caption: string): MediaImage => ({
  src: `${dir}/${path}-1600.webp`,
  width,
  height,
  alt,
  caption,
  kind: 'photo',
});

const logo = (path: string, width: number, height: number, alt: string): MediaImage => ({
  src: `${dir}/${path}-1600.webp`,
  width,
  height,
  alt,
  kind: 'drawing',
});

/** "Flash Apps — app & website development", Nicole's product studio brand. */
export const studio = {
  name: 'Flash Apps',
  by: 'Flash by Nicole',
  tagline: 'App & website development',
  logo: logo('brand/flash-by-nicole-logo', 340, 373, 'Flash by Nicole logo'),
  icons: {
    src: `${dir}/brand/app-icons-1600.webp`,
    width: 719,
    height: 351,
    alt: 'App icons for Worldly, FlashTravel and FlashLuz',
    kind: 'photo',
  } as MediaImage,
};

export const products: Product[] = [
  {
    slug: 'flash-luz',
    name: 'Flash Luz',
    tagline: 'All in one place — you no longer need eight apps to run one business.',
    status: 'Launched',
    role: 'Founder – Flash Luz · Product Builder',
    period: '2026 – Present',
    logo: logo('flash-luz/logo', 196, 250, 'Flash Luz logo'),
    screens: [
      screen('flash-luz/screen-home', 1280, 2768, 'Flash Luz home screen: “Find a manicurist easily”', 'Client home — find a professional easily'),
      screen('flash-luz/screen-booking', 642, 1389, 'Booking choice sheet with “Instant booking” and “Smart request”', 'How do you want to book? Instant booking or a smart request'),
      screen('flash-luz/screen-profile', 642, 1389, 'A professional’s profile page with services, gallery and reviews', 'Professional profile — services, gallery, reviews and booking'),
      screen('flash-luz/screen-dashboard', 514, 1112, 'Business dashboard with today’s appointments, income and management tools', 'Business dashboard — appointments, income, calendar and clients'),
      screen('flash-luz/screen-business-profile', 514, 1112, 'Business owner profile with clients, appointments and revenue figures', 'Business profile and activity overview'),
    ],
    boards: [],
    overview:
      'Flash Luz is a smart platform that connects clients with beauty professionals — quickly, conveniently and precisely, with everything happening in one place. Instead of searching for a manicurist, a barber or any other service provider, a client can place a request and receive offers, like Uber. It was built out of a real need in the field: a system for managing a beauty business that handles booking and managing appointments, clients and payments, and helps business owners work in a more organised, smarter and more efficient way.',
    caseStudy: [
      {
        heading: 'Who it is for',
        text: 'Beauty professionals and the clients who book them — from independent providers to training studios and salons with several employees. The stated audience focus also includes instructors and institutions that run training in the beauty industry.',
      },
      {
        heading: 'Building the product',
        text: 'Nicole built Flash Luz as a no-code app from concept to launch, designing the product architecture, UX/UI and user flows, and developing it into a platform for beauty business management. Nicole creates and develops her apps with Base44.',
      },
    ],
    lists: [
      {
        heading: 'The problem',
        items: [
          'Finding professionals and appointments means going through Instagram, WhatsApp and Facebook.',
          'There is no single place that shows every service provider with their availability and prices.',
          'Booking an appointment means talking to a person and going back and forth to find a time that suits both sides.',
          'Professionals are left with gaps in their calendar and lost income.',
          'The power is not in the client’s hands — there is no way to find a provider who comes to you, at a price that suits you.',
        ],
      },
      {
        heading: 'What makes it different',
        items: [
          'Built from real need and know-how — it answers the business’s needs from A to Z.',
          'The ball is back in the client’s court: send a request with a place, time and price, and receive offers to match.',
          'Fills calendar gaps for professionals and allows appointments outside “regular” hours.',
          'Organised business management in one place, with income and expense analysis and a receipt system.',
          'An organic marketing platform for business owners, models, courses and training.',
        ],
      },
    ],
    features: [
      { title: 'Find a professional', text: 'By time, location and real availability — with instant booking.' },
      { title: 'Smart request', text: 'Like InDrive: the client sets the price, time and location and receives offers to match.' },
      { title: 'Fill empty time', text: 'Lets professionals use gaps in their calendar and increase their income.' },
      { title: 'Courses & training management', text: 'A system for course managers to manage students and registrations and to find models.' },
      { title: 'Find courses', text: 'Users can develop professionally through the app.' },
      { title: 'Bring a friend', text: 'A referral system with rewards, for organic growth.' },
      { title: 'Three business tracks', text: 'Independent provider, training studio, and salon with several employees.' },
    ],
    url: { href: 'https://flashluz.com', label: 'Flashluz.com' },
    accent: '#B08D63',
  },
  {
    slug: 'flashtravel',
    name: 'FlashTravel',
    tagline: 'All in one place — you no longer need eight apps to enjoy a trip.',
    status: 'Prototype',
    logo: logo('flashtravel/logo', 256, 316, 'FlashTravel logo'),
    screens: [
      screen('flashtravel/screen-ai-trip', 1280, 2768, 'FlashTravel AI trip builder screen', 'Flash AI Trip Builder — describe a trip, get a route'),
      screen('flashtravel/screen-map', 514, 1112, 'Map of the Americas with travellers and places pinned', 'FlashLive map — where people are travelling'),
      screen('flashtravel/screen-flashsplit', 514, 1112, 'Shared expenses screen with balance and friends', 'FlashSplit — shared expenses between friends'),
      screen('flashtravel/screen-add', 642, 1389, 'Add menu: photo, place, AI trip, travel partner, expense and personal expense', 'Add anything — places, photos, expenses or a travel partner'),
    ],
    boards: [],
    overview:
      'FlashTravel is a smart trip-management platform that brings together planning, recommendations, people and expense management — in real time and in one place. It is a social app for travellers: build routes, discover places and meet travellers in the same area, simply and conveniently.',
    caseStudy: [],
    lists: [
      {
        heading: 'The problem',
        items: [
          'Recommendations are scattered across WhatsApp, Facebook and websites.',
          'There is nowhere to plan a route in an organised way.',
          'Day-to-day travel takes a lot of different apps.',
          'There is no tracking of expenses between friends.',
          'Information, people and location are not connected in real time.',
          'No platform connects you with other travellers and helps you make new connections.',
        ],
      },
      {
        heading: 'What makes it different',
        items: [
          'Everything in one place — all the apps and needs combined in a single interface.',
          'Real-time based — see when and where people will be.',
          'A social experience built into the travel experience.',
          'Connects travellers and opens the door to new friendships and travel partners.',
          'Gathers memories into a personal travel journal for each person.',
          'Anyone can recommend or warn, building an accessible knowledge base for the next travellers.',
        ],
      },
    ],
    features: [
      { title: 'FlashLive', text: 'Shows where people are travelling and plan to travel, so you can plan your route ahead.' },
      { title: 'Flash AI Trip Builder', text: 'Build a route with AI, without the hassle.' },
      { title: 'Smart Pins', text: 'Personal recommendations based on your location and preferences.' },
      { title: 'FlashSplit', text: 'Money management between friends — add friends and split payments.' },
      { title: 'Social Matching', text: 'A secure connection system between travellers.' },
      { title: 'Trip Sharing', text: 'Add things from other people’s routes to your own.' },
    ],
    accent: '#7E8C86',
  },
  {
    slug: 'worldly',
    name: 'Worldly',
    tagline: 'Know your destination — don’t just pass through it.',
    status: 'Concept',
    logo: logo('worldly/logo', 263, 372, 'Worldly logo'),
    screens: [
      screen('worldly/screen-splash', 471, 836, 'Worldly app splash screen with its globe-pin icon', 'Worldly — app icon and splash screen'),
    ],
    boards: [],
    overview:
      'Worldly is a smart, AI-based quiz platform born from Nicole’s own travels around the world. Its goal is to turn learning about places into an interactive experience — so that travellers truly get to know their destination, and don’t just pass through it.',
    caseStudy: [
      {
        heading: 'Status',
        text: 'Worldly is at the concept stage: its idea, name and visual identity are defined, while its features and screens are still to be designed.',
      },
    ],
    features: [
      { title: 'AI-based quizzes', text: 'Questions about travel destinations.' },
      { title: 'Interactive learning', text: 'Learning about places as an experience rather than a list of facts.' },
    ],
    accent: '#9A7B6A',
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
