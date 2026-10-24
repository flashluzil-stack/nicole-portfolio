import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dictionaries, type Dictionary } from './ui';
import { content, type Content } from './content';

export type Lang = 'en' | 'he';

const STORAGE_KEY = 'ng-lang';
const isLang = (v: unknown): v is Lang => v === 'en' || v === 'he';

function storedLang(): Lang | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return isLang(v) ? v : null;
  } catch {
    return null;
  }
}

interface I18n {
  lang: Lang;
  dir: 'ltr' | 'rtl';
  /** Interface strings for the current language. */
  t: Dictionary;
  /** Long-form content (profile, CV, products, projects) for the current language. */
  c: Content;
  setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18n | null>(null);

/**
 * Language state for the whole site.
 * Priority: `?lang=` in the URL, then the visitor's saved choice, then English.
 * Hebrew pages carry `?lang=he` so every Hebrew page has its own shareable,
 * indexable URL; English (the default) carries no parameter.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const urlLang = new URLSearchParams(location.search).get('lang');

  const [lang, setLangState] = useState<Lang>(() => (isLang(urlLang) ? urlLang : storedLang() ?? 'en'));

  // Follow an explicit ?lang= in the URL (e.g. a shared Hebrew link).
  useEffect(() => {
    if (isLang(urlLang) && urlLang !== lang) setLangState(urlLang);
    // Only URL changes should trigger this; the current language is read fresh.
  }, [urlLang]);

  // Keep the URL in step with the language without changing the page, its
  // other query parameters (such as filters) or its #anchor.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const wanted = lang === 'he' ? 'he' : null;
    if (params.get('lang') === wanted) return;
    if (wanted) params.set('lang', wanted);
    else params.delete('lang');
    const search = params.toString();
    navigate({ pathname: location.pathname, search: search ? `?${search}` : '', hash: location.hash }, { replace: true });
  }, [lang, location.pathname, location.search, location.hash, navigate]);

  // Document language and direction, before paint.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'he' ? 'rtl' : 'ltr';
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable — the URL still carries the language */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const value = useMemo<I18n>(
    () => ({ lang, dir: lang === 'he' ? 'rtl' : 'ltr', t: dictionaries[lang], c: content[lang], setLang }),
    [lang, setLang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}

/**
 * Renders a [before, emphasised, after] title triple from the dictionary.
 * Each word is wrapped in a masked span (`.w`), so headings can rise into
 * place word by word (see useReveal). The spaces stay as plain text, so
 * lines still wrap and read normally.
 */
export function Emph({ parts }: { parts: string[] }) {
  const [before, em, after] = parts;
  let n = 0;
  const words = (text?: string) =>
    text
      ? text.split(/(\s+)/).map((w, i) =>
          !w || /^\s+$/.test(w) ? (
            w
          ) : (
            <span key={i} className="w" style={{ '--w': n++ } as CSSProperties}>
              <span>{w}</span>
            </span>
          ),
        )
      : null;
  return (
    <>
      {words(before)}
      {em && <em>{words(em)}</em>}
      {words(after)}
    </>
  );
}

/**
 * Wraps runs of Latin text (company and product names) inside Hebrew text in
 * <bdi>, so punctuation and word order stay correct in right-to-left layouts.
 */
export function Isolate({ text }: { text: string }) {
  const { dir } = useI18n();
  if (dir === 'ltr') return <>{text}</>;
  const parts = text.split(/([A-Za-z][A-Za-z0-9&.'’\- ]*[A-Za-z0-9])/);
  return <span>{parts.map((part, i) => (i % 2 ? <bdi key={i} className="nowrap">{part}</bdi> : part))}</span>;
}
