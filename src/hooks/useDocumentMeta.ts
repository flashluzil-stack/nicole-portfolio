import { useEffect } from 'react';
import { useI18n } from '../i18n';

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

function setLink(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
}

/**
 * Per-route title, description, canonical, Open Graph and hreflang tags in
 * the current language. English URLs have no parameter; Hebrew URLs add
 * `?lang=he`.
 */
export function useDocumentMeta(title: string, description: string, path: string) {
  const { t, lang } = useI18n();

  useEffect(() => {
    const full = title ? `${title} — ${t.meta.siteName}` : t.meta.defaultTitle;
    const enUrl = `${SITE_URL}${path}`;
    const heUrl = `${SITE_URL}${path}?lang=he`;
    const url = lang === 'he' ? heUrl : enUrl;

    document.title = full;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', full);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', t.meta.locale);
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', full);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', url);

    if (SITE_URL) {
      setLink('link[rel="canonical"]', { rel: 'canonical', href: url });
      setLink('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: enUrl });
      setLink('link[rel="alternate"][hreflang="he"]', { rel: 'alternate', hreflang: 'he', href: heUrl });
      setLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: enUrl });
    }
  }, [title, description, path, lang, t]);
}
