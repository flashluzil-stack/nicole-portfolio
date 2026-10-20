/** Resolves a /public path against the build's base URL (works for relative-base builds too). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, '');
