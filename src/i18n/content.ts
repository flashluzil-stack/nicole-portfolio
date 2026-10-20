import * as enProfile from '../content/profile';
import * as heProfile from '../content/he/profile';
import * as enProducts from '../content/products';
import * as heProducts from '../content/he/products';
import * as enArchitecture from '../content/architecture';
import * as heArchitecture from '../content/he/architecture';

const build = (
  profile: typeof enProfile,
  products: typeof enProducts | typeof heProducts,
  architecture: typeof enArchitecture | typeof heArchitecture,
) => ({
  profile: profile.profile,
  experience: profile.experience,
  education: profile.education,
  skills: profile.skills,
  languages: profile.languages,
  architectureOffices: profile.architectureOffices,
  disciplines: profile.disciplines,
  products: products.products,
  studio: products.studio,
  architectureProjects: architecture.architectureProjects,
  portfolioIndex: architecture.portfolioIndex,
  homeHero: architecture.homeHero,
});

/** All long-form content, per language, with identical structure. */
export const content = {
  en: build(enProfile, enProducts, enArchitecture),
  he: build(heProfile as unknown as typeof enProfile, heProducts, heArchitecture),
};

export type Content = (typeof content)['en'];
