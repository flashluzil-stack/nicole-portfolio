import { useState } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { products, studio } from '../content/products';
import type { MediaImage, Product } from '../content/types';
import { DeviceMockup } from '../components/DeviceMockup';
import { Cta } from '../components/Cta';
import { Img } from '../components/Img';
import { Lightbox } from '../components/Lightbox';
import { SectionHeading } from '../components/SectionHeading';
import { StatusBadge } from '../components/StatusBadge';

const approach = [
  {
    title: 'Business logic',
    text: 'Understanding how a business actually operates — its services, schedules, people and money — and organising it into a clear structure.',
  },
  {
    title: 'User journeys',
    text: 'Mapping the path of each user, from the professional running the business to the customer booking a service.',
  },
  {
    title: 'Interface',
    text: 'Designing calm, legible screens with the same attention to hierarchy and proportion used in architectural drawings.',
  },
  {
    title: 'Working system',
    text: 'Turning the concept into a functional product that people can use.',
  },
];

function CaseStudy({ product, index }: { product: Product; index: number }) {
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
                <dt>Role</dt>
                <dd>{product.role}</dd>
              </div>
            )}
            {product.period && (
              <div>
                <dt>Period</dt>
                <dd>{product.period}</dd>
              </div>
            )}
            <div>
              <dt>Status</dt>
              <dd>{product.status}</dd>
            </div>
            {product.url && (
              <div>
                <dt>Website</dt>
                <dd>
                  <a href={product.url.href} target="_blank" rel="noopener noreferrer" className="inline-link">
                    {product.url.label}
                    <span className="visually-hidden"> (opens in a new tab)</span>
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
              <h3>Overview</h3>
              <p>{product.overview}</p>
            </div>
            {product.caseStudy.map((b) => (
              <div key={b.heading} className="case__block">
                <h3>{b.heading}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </div>
        </div>

        {product.lists && product.lists.length > 0 && (
          <div className="case__lists">
            {product.lists.map((l) => (
              <div key={l.heading} className="case__list">
                <h3 className="case__features-title">{l.heading}</h3>
                <ul>
                  {l.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="case__features">
          <h3 className="case__features-title">
            {product.status === 'Concept' ? 'Concept scope' : 'Key features'}
          </h3>
          <ul className="feature-list">
            {product.features.map((f, i) => (
              <li key={f.title}>
                <span className="feature-list__index">{String(i + 1).padStart(2, '0')}</span>
                <span className="feature-list__title">{f.title}</span>
                {f.text && <span className="feature-list__text">{f.text}</span>}
              </li>
            ))}
          </ul>
          {product.proposed && product.proposed.length > 0 && (
            <>
              <h3 className="case__features-title case__features-title--proposed">Proposed — not yet built</h3>
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
            <h3 className="case__features-title">Screens &amp; flows</h3>
            {product.screens.length > 0 && (
            <ul className="screen-row">
              {product.screens.map((s, i) => (
                <li key={s.src}>
                  <button type="button" className="screen-row__btn" onClick={() => setViewer(i)}>
                    <DeviceMockup product={product} screen={s} className="device--small" />
                    <span className="visually-hidden">Open {s.alt} in fullscreen</span>
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
                      <span className="visually-hidden">Open {b.alt} in fullscreen</span>
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
              Visit {product.name}
            </Cta>
          </div>
        )}
      </div>
      <Lightbox images={gallery} index={viewer} onChange={setViewer} label={product.name} />
    </section>
  );
}

export default function Technology() {
  useDocumentMeta(
    'Technology',
    'Digital products by Nicole Gofman — Flash Luz, FlashTravel and Worldly: product strategy, user journeys and interface design.',
    '/technology',
  );

  return (
    <>
      <section className="page-hero page-hero--tech" aria-labelledby="tech-title">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">01</span>Technology
            </p>
            <h1 id="tech-title" className="page-hero__title">
              From idea to <em>working system.</em>
            </h1>
          </div>
          <p className="page-hero__lede">
            Digital products designed with an architect’s eye — clear structure, considered journeys and calm
            interfaces that help people get things done.
          </p>
        </div>

        <div className="container studio">
          <Img image={studio.logo} sizes="120px" className="studio__logo" />
          <div className="studio__text">
            <p className="eyebrow">{studio.by}</p>
            <p className="studio__name">
              {studio.name} <em>— {studio.tagline.toLowerCase()}</em>
            </p>
          </div>
          <Img image={studio.icons} sizes="(min-width: 900px) 360px, 80vw" className="studio__icons" />
        </div>

        <nav className="container product-index" aria-label="Products on this page">
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

      <section className="section approach" aria-labelledby="approach-title">
        <div className="container">
          <SectionHeading
            index="04"
            eyebrow="Approach"
            id="approach-title"
            title={
              <>
                How an architect <em>builds</em> products.
              </>
            }
          />
          <ol className="approach__list">
            {approach.map((a, i) => (
              <li key={a.title}>
                <span className="approach__num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ol>
          <div className="approach__cta">
            <Cta to="/contact" variant="solid">
              Discuss a product idea
            </Cta>
            <Cta to="/architecture">See the architecture work</Cta>
          </div>
        </div>
      </section>
    </>
  );
}
