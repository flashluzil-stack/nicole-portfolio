import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { Cta } from '../components/Cta';
import { useI18n, Emph } from '../i18n';

export default function NotFound() {
  const { t } = useI18n();
  useDocumentMeta(t.meta.notFoundTitle, t.meta.notFound, '/404');
  return (
    <section className="not-found" aria-labelledby="nf-title">
      <div className="container">
        <p className="eyebrow">404</p>
        <h1 id="nf-title" className="page-hero__title">
          <Emph parts={t.notFound.title} />
        </h1>
        <p className="page-hero__lede">{t.notFound.lede}</p>
        <div className="closing__actions">
          <Cta to="/" variant="solid">
            {t.nav.home}
          </Cta>
          <Cta to="/architecture">{t.nav.architecture}</Cta>
          <Cta to="/technology">{t.nav.technology}</Cta>
        </div>
      </div>
    </section>
  );
}
