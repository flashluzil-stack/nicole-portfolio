import { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n, Emph } from '../i18n';
import type { MediaImage, Product } from '../content/types';
import { DeviceMockup } from '../components/DeviceMockup';
import { Cta } from '../components/Cta';
import { Img } from '../components/Img';
import { Lightbox } from '../components/Lightbox';
import { StatusBadge } from '../components/StatusBadge';

function CaseStudy({ product, index }: { product: Product; index: number }) {
  const { t } = useI18n();
  const [viewer, setViewer] = useState<number | null>(null);
  const gallery: MediaImage[] = [...product.screens, ...product.boards];
  const titleId = `${product.slug}-title`;

  return (
    <section id={product.slug} className={`case case--${index % 2 ? 'alt' : 'main'}`} aria-labelledby={titleId}>
      <div className="container">
        <header className="case__header">
          <span className="case__number">{String(index + 1).padStart(2, '0')}</span>
          <div className="case__heading">
            <StatusBadge status={product.status} />
            <h2 id={titleId} className="case__name">
              {product.logo && <Img image={product.logo} sizes="96px" className="case__logo" />}
              <span>{product.name}</span>
            </h2>
            <p className="case__tagline">{product.tagline}</p>
          </div>
          <dl className="case__facts">
            {product.role && (
              <div>
                <dt>{t.technology.role}</dt>
                <dd>
                  <bdi>{product.role}</bdi>
                </dd>
              </div>
            )}
            {product.period && (
              <div>
                <dt>{t.technology.period}</dt>
                <dd>{product.period}</dd>
              </div>
            )}
            <div>
              <dt>{t.technology.status}</dt>
              <dd>{t.status[product.status]}</dd>
            </div>
            {product.url && (
              <div>
                <dt>{t.technology.website}</dt>
                <dd>
                  <a href={product.url.href} target="_blank" rel="noopener noreferrer" className="inline-link">
                    <span className="ltr">{product.url.label}</span>
                    <span className="visually-hidden"> {t.common.newTab}</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </header>

        <div className="case__body">
          <div className="case__stage">
            <DeviceMockup product={product} screen={product.screens[0]} />
          </div>
          <div className="case__text">
            <div className="case__block">
              <h3>{t.technology.overview}</h3>
              <p>{product.overview}</p>
            </div>
          </div>
        </div>

        <div className="case__features">
          <h3 className="case__features-title">
            {product.status === 'Concept' ? t.technology.conceptScope : t.technology.keyFeatures}
          </h3>
          <ul className="feature-list">
            {product.features.map((f, i) => (
              <li key={f.title}>
                <span className="feature-list__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="feature-list__title">{f.title}</span>
              </li>
            ))}
          </ul>
          {product.proposed && product.proposed.length > 0 && (
            <>
              <h3 className="case__features-title case__features-title--proposed">{t.technology.proposed}</h3>
              <ul className="feature-list feature-list--proposed">
                {product.proposed.map((f, i) => (
                  <li key={f.title}>
                    <span className="feature-list__index">{String(i + 1).padStart(2, '0')}</span>
                    <span className="feature-list__title">{f.title}</span>
                    {f.text && <span className="feature-list__text">{f.text}</span>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {gallery.length > 0 && (product.boards.length > 0 || product.screens.length > 1) && (
          <div className="case__gallery">
            <h3 className="case__features-title">{t.technology.screens}</h3>
            {product.screens.length > 0 && (
            <ul className="screen-row">
              {product.screens.map((s, i) => (
                <li key={s.src}>
                  <button type="button" className="screen-row__btn" onClick={() => setViewer(i)}>
                    <DeviceMockup product={product} screen={s} className="device--small" />
                    <span className="visually-hidden">{t.technology.openFullscreen(s.alt)}</span>
                  </button>
                </li>
              ))}
            </ul>
            )}
            {product.boards.length > 0 && (
              <ul className="board-grid">
                {product.boards.map((b, i) => (
                  <li key={b.src}>
                    <button
                      type="button"
                      className="board-grid__btn"
                      onClick={() => setViewer(product.screens.length + i)}
                    >
                      <Img image={b} sizes="(min-width: 900px) 50vw, 100vw" />
                      <span className="visually-hidden">{t.technology.openFullscreen(b.alt)}</span>
                    </button>
                    {b.caption && <p className="board-grid__caption">{b.caption}</p>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {product.url && (
          <div className="case__cta">
            <Cta to={product.url.href} external variant="solid">
              {t.technology.visit(product.name)}
            </Cta>
          </div>
        )}
      </div>
      <Lightbox images={gallery} index={viewer} onChange={setViewer} label={product.name} />
    </section>
  );
}

export default function Technology() {
  const { t, c } = useI18n();
  const { products, studio } = c;
  useDocumentMeta(t.meta.technologyTitle, t.meta.technology, '/technology');

  return (
    <>
      <section className="page-hero page-hero--tech" aria-labelledby="tech-title">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">02</span>
              {t.technology.eyebrow}
            </p>
            <h1 id="tech-title" className="page-hero__title">
              <Emph parts={t.technology.title} />
            </h1>
          </div>
          <p className="page-hero__lede">{t.technology.lede}</p>
        </div>

        <div className="container studio">
          <Img image={studio.logo} sizes="120px" className="studio__logo" />
          <div className="studio__text">
            <p className="eyebrow">{studio.by}</p>
            <p className="studio__name">
              {studio.name} <em>— {studio.tagline.toLocaleLowerCase()}</em>
            </p>
          </div>
          <Img image={studio.icons} sizes="(min-width: 900px) 360px, 80vw" className="studio__icons" />
        </div>

        <nav className="container product-index" aria-label={t.technology.productsNav}>
          <ol>
            {products.map((p, i) => (
              <li key={p.slug}>
                <a href={`#${p.slug}`} className="product-index__link">
                  <span className="product-index__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="product-index__name">{p.name}</span>
                  <span className="product-index__tagline">{p.tagline}</span>
                  <StatusBadge status={p.status} />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </section>

      {products.map((p, i) => (
        <CaseStudy key={p.slug} product={p} index={i} />
      ))}

      <section className="section approach" aria-label={t.technology.approachEyebrow}>
        <div className="container approach__cta">
          <Cta to="/contact" variant="solid">
            {t.technology.discussIdea}
          </Cta>
          <Cta to="/architecture">{t.technology.seeArchitecture}</Cta>
        </div>
      </section>
    </>
  );
}
