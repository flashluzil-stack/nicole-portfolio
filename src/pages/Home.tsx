import type { CSSProperties } from 'react';
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
import { DrawingStrip } from '../components/DrawingStrip';
import { ArrowRight } from '../components/Icons';

export default function Home() {
  const { t, c } = useI18n();
  const { profile, products, architectureProjects, homeSlides } = c;
  useDocumentMeta('', t.meta.home, '/');


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

      {/* ——— Drawings: the technical side, shown rather than described ——— */}
      <section className="section drawings" aria-labelledby="drawings-title">
        <div className="container">
          <SectionHeading eyebrow={t.home.drawingsEyebrow} id="drawings-title" title={<Emph parts={t.home.drawingsTitle} />} />
        </div>
        <DrawingStrip projects={architectureProjects} />
      </section>

      {/* ——— Professional experience, as a timeline ——— */}
      <section className="section experience" aria-labelledby="exp-title">
        <div className="container">
          <SectionHeading eyebrow={t.home.expEyebrow} id="exp-title" title={<Emph parts={t.home.expTitle} />}>
            <div className="experience__actions">
              <CvLink variant="solid" />
              <Cta to="/contact">{t.home.contactMe}</Cta>
            </div>
          </SectionHeading>
          <ol className="timeline" aria-label={t.home.timelineLabel}>
            {t.home.timeline.map((item, i) => (
              <li key={i} className="timeline__item" style={{ '--i': i } as CSSProperties}>
                <span className="timeline__year">{item.year}</span>
                <span className="timeline__title">
                  <bdi>{item.title}</bdi>
                </span>
                <span className="timeline__text">{item.text}</span>
              </li>
            ))}
          </ol>
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
