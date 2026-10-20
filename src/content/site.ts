import type { Dictionary } from '../i18n/ui';

/** Primary navigation. Labels come from the dictionary (`nav.*`). */
export const navigation: { to: string; key: keyof Pick<Dictionary['nav'], 'home' | 'technology' | 'architecture' | 'contact'>; index: string }[] = [
  { to: '/', key: 'home', index: '00' },
  { to: '/technology', key: 'technology', index: '01' },
  { to: '/architecture', key: 'architecture', index: '02' },
  { to: '/contact', key: 'contact', index: '03' },
];
