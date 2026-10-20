import { useEffect } from 'react';

const SITE = 'Nicole Gofman';
const SITE_URL = (import.meta.env.VITE_SITE_URL as string | undefined) ?? '';

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Per-route title, description, canonical and Open Graph tags. */
export function useDocumentMeta(title: string, description: string, path: string) {
  useEffect(() => {
    const full = title ? `${title} — ${SITE}` : `${SITE} — Architecture & Technology`;
    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', full);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', `${SITE_URL}${path}`);

    if (SITE_URL) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = `${SITE_URL}${path}`;
    }
  }, [title, description, path]);
}
