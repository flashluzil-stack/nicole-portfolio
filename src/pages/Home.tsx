import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n, Emph, Isolate } from '../i18n';
import { DeviceMockup } from '../components/DeviceMockup';
import { Cta } from '../components/Cta';
import { Img } from '../components/Img';
import { SectionHeading } from '../components/SectionHeading';
import { WorkGrid } from '../components/WorkGrid';
import { StatusBadge } from '../components/StatusBadge';
import { CvLink } from '../components/CvLink';
import { HeroCarousel } from '../components/HeroCarousel';
import { ArrowRight } from '../components/Icons';

export default function Home() {
  const { t, c } = useI18n();
  const { profile, products, architectureProjects, architectureOffices, realEstate, education, homeSlides } = c;
  useDocumentMeta('', t.meta.home, '/');

  const studies = education.find((e) => e.id === 'shenkar');

  return (
    <>
      {/* ——— Hero: who, what, where to look ——— */}
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="container home-hero__grid">
          <div className="home-hero__text">
            <p className="eyebrow">
              <Isolate text={t.home.heroEyebrow} />
            </p>
            <h1 id="hero-title" className="home-hero__title">
              <Emph parts={t.home.heroTitle} />
            </h1>
            <p className="home-hero__lede">{t.home.heroLede}</p>
            <div className="home-hero__actions">
              <Cta to="/architecture#projects" variant="solid">
                {t.home.exploreArchitecture}
              </Cta>
              <CvLink />
            </div>
            <ul className="facts">
              {t.home.facts.map((f) => (
                <li key={f.label}>
                  <span className="facts__value ltr">{f.value}</span>
                  <span className="facts__label">{f.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="home-hero__image">
            <HeroCarousel slides={homeSlides} />
          </div>
        </div>
      </section>

      {/* ——— Selected architectural work ——— */}
      <section id="work" className="section section--stone work" aria-labelledby="work-title">
        <div className="container">
          <SectionHeading eyebrow={t.home.workEyebrow} id="work-title" title={<Emph parts={t.home.workTitle} />}>
            <Cta to="/architecture#projects" variant="text">
              {t.home.allArchitecture}
            </Cta>
          </SectionHeading>
          <WorkGrid projects={architectureProjects.slice(0, 3)} />
        </div>
      </section>

      {/* ——— Professional experience ——— */}
      <section className="section experience" aria-labelledby="exp-title">
        <div className="container experience__grid">
          <div className="experience__intro">
            <SectionHeading eyebrow={t.home.expEyebrow} id="exp-title" title={<Emph parts={t.home.expTitle} />} />
            <p className="experience__summary">
              <Isolate text={t.home.expSummary} />
            </p>
            <div className="experience__actions">
              <CvLink variant="solid" />
              <Cta to="/contact">{t.home.contactMe}</Cta>
            </div>
          </div>

          <div className="experience__body">
            <h3 className="experience__label">{t.home.architectureOffices}</h3>
            <ul className="offices">
              {architectureOffices.map((o) => (
                <li key={o.id} className="office">
                  <div className="office__head">
                    <span className="office__name" lang="en">
                      {o.organisation}
                    </span>
                    {o.period && <span className="office__period">{o.period}</span>}
                  </div>
                  {o.role && <p className="office__role">{o.role}</p>}
                  {o.bullets && (
                    <ul className="office__bullets">
                      {o.bullets.slice(0, 3).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <h3 className="experience__label">{t.home.realEstate}</h3>
            <ul className="offices">
              {realEstate.map((o) => (
                <li key={o.id} className="office">
                  <div className="office__head">
                    <span className="office__name">{o.organisation}</span>
                    {o.period && <span className="office__period">{o.period}</span>}
                  </div>
                  {o.role && <p className="office__role">{o.role}</p>}
                  {o.bullets && (
                    <ul className="office__bullets">
                      {o.bullets.slice(0, 3).map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="experience__more">
              {studies && (
                <div>
                  <h3 className="experience__label">{t.home.education}</h3>
                  <ul className="compact-list">
                    <li>
                      <span className="compact-list__main">{studies.programme}</span>
                      <span className="compact-list__meta">
                        {studies.institution} · <span className="ltr">{studies.period}</span>
                      </span>
                      {studies.note && <span className="compact-list__meta">{studies.note}</span>}
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ——— Technology, compact ——— */}
      <section className="section section--warm tech-strip" aria-labelledby="home-tech-title">
        <div className="container">
          <SectionHeading eyebrow={t.home.techEyebrow} id="home-tech-title" title={<Emph parts={t.home.techTitle} />}>
            <Cta to="/technology" variant="text">
              {t.home.allProducts}
            </Cta>
          </SectionHeading>
          <ul className="tech-strip__list">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to={`/technology#${p.slug}`} className="tech-card">
                  <div className="tech-card__visual">
                    <DeviceMockup product={p} screen={p.screens[0]} className="device--mini" showCaption={false} />
                  </div>
                  <div className="tech-card__body">
                    <div className="tech-card__head">
                      {p.logo && <Img image={p.logo} sizes="40px" className="tech-card__logo" />}
                      <h3 className="tech-card__name">{p.name}</h3>
                    </div>
                    <StatusBadge status={p.status} />
                    <p className="tech-card__tagline">{p.tagline}</p>
                    <span className="tech-card__more">
                      {p.status === 'Concept' ? t.home.viewConcept : t.home.viewProject} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Contact CTA ——— */}
      <section className="closing" aria-labelledby="closing-title">
        <div className="container closing__inner">
          <p className="eyebrow">{t.home.contactEyebrow}</p>
          <h2 id="closing-title" className="closing__title">
            <Emph parts={t.home.closingTitle} />
          </h2>
          <div className="closing__actions">
            <Cta to="/contact" variant="solid">
              {t.home.connect}
            </Cta>
            <a className="cta cta--text cta--email" href={`mailto:${profile.email}`}>
              <span className="ltr">{profile.email}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
