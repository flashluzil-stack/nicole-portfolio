import { useI18n, type Lang } from '../i18n';

const options: { lang: Lang; short: string; full: string }[] = [
  { lang: 'en', short: 'EN', full: 'English' },
  { lang: 'he', short: 'עב', full: 'עברית' },
];

/** EN | עב toggle. Each option is labelled in its own language. */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.language.label}>
      {options.map((o, i) => (
        <span key={o.lang} className="lang-switch__item">
          {i > 0 && (
            <span className="lang-switch__sep" aria-hidden>
              |
            </span>
          )}
          <button
            type="button"
            className="lang-switch__btn"
            lang={o.lang}
            aria-pressed={lang === o.lang}
            onClick={() => setLang(o.lang)}
          >
            {o.short}
            <span className="visually-hidden"> {o.full}</span>
          </button>
        </span>
      ))}
    </div>
  );
}
