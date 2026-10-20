import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n, Emph } from '../i18n';
import { ProjectCard } from '../components/ProjectCard';
import { PortfolioIndex } from '../components/PortfolioIndex';
import { CvLink } from '../components/CvLink';
import { ArrowDown } from '../components/Icons';
import { SectionHeading } from '../components/SectionHeading';
import { Cta } from '../components/Cta';
import { Img } from '../components/Img';
import { architectureProjects as baseProjects } from '../content/architecture';

/** Rhythm of card sizes for the asymmetric index grid. */
// Rows of 12 columns: large + small, small + large, one wide, then two mediums.
const rhythm = ['large', 'small', 'small', 'large', 'wide', 'medium', 'medium'] as const;

export default function Architecture() {
  const { t, c } = useI18n();
  const { architectureProjects, education, experience, profile, skills } = c;
  useDocumentMeta(t.meta.architectureTitle, t.meta.architecture, '/architecture');

  const [params, setParams] = useSearchParams();
  const types = useMemo(() => [...new Set(architectureProjects.map((p) => p.type))], [architectureProjects]);
  // The ?type= filter always holds the English type, so a filtered link keeps
  // working in both languages and survives a language switch.
  const enTypes = useMemo(() => new Map(architectureProjects.map((p, i) => [p.type, baseProjects[i].type])), [architectureProjects]);
  const active = params.get('type');
  const visible = active ? architectureProjects.filter((p) => enTypes.get(p.type) === active) : architectureProjects;

  const setFilter = (type: string | null) => {
    const next = new URLSearchParams(params);
    if (type) next.set('type', enTypes.get(type) ?? type);
    else next.delete('type');
    setParams(next, { replace: true });
  };

  const studio = experience.find((e) => e.id === 'place-space');
  const studies = education.find((e) => e.id === 'shenkar');
  const archTools = skills.filter((g) => g.id === 'architecture');
  const course = education.find((e) => e.id === 'vray');

  return (
    <>
      <section className="arch-hero" aria-labelledby="arch-title">
        <div className="container arch-hero__grid">
          <div className="arch-hero__text">
            <p className="eyebrow">
              <span className="eyebrow__index">01</span>
              {t.architecture.eyebrow}
            </p>
            <h1 id="arch-title" className="arch-hero__title">
              <Emph parts={t.architecture.title} />
            </h1>
            <p className="arch-hero__lede">{t.architecture.lede}</p>
            <div className="home-hero__actions">
              <a className="cta cta--solid" href="#projects">
                <span>{t.architecture.viewProjects}</span>
                <ArrowDown size={16} />
              </a>
              <CvLink />
            </div>
          </div>
          <figure className="arch-hero__image">
            <Img image={profile.atWork} sizes="(min-width: 1000px) 45vw, 100vw" priority />
            <figcaption>{t.home.imageCaption}</figcaption>
          </figure>
        </div>
      </section>

      <section id="projects" className="section section--stone" aria-labelledby="arch-index-title">
        <div className="container">
          <SectionHeading
            eyebrow={t.architecture.indexEyebrow}
            id="arch-index-title"
            title={<Emph parts={t.architecture.indexTitle} />}
          />

          {architectureProjects.length === 0 ? (
            <PortfolioIndex />
          ) : (
            <>
              {types.length > 1 && (
                <div className="filters" role="group" aria-label={t.architecture.filterLabel}>
                  <button
                    type="button"
                    className="filter"
                    aria-pressed={!active}
                    onClick={() => setFilter(null)}
                  >
                    {t.architecture.all} <span className="filter__count">{architectureProjects.length}</span>
                  </button>
                  {types.map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="filter"
                      aria-pressed={active === enTypes.get(type)}
                      onClick={() => setFilter(type)}
                    >
                      {type}{' '}
                      <span className="filter__count">
                        {architectureProjects.filter((p) => p.type === type).length}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <p className="visually-hidden" aria-live="polite">
                {t.architecture.showing(visible.length)}
              </p>
              <div className="project-grid">
                {visible.map((p, i) => (
                  <ProjectCard
                    key={p.slug}
                    project={p}
                    index={architectureProjects.indexOf(p)}
                    size={rhythm[i % rhythm.length]}
                    headingLevel="h3"
                  />
                ))}
              </div>
              <p className="arch-more">
                <Cta to={profile.architecturePortfolio} external variant="text">
                  {t.architecture.completePortfolio}
                </Cta>
              </p>
            </>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="arch-practice-title">
        <div className="container practice">
          <SectionHeading
            eyebrow={t.architecture.practiceEyebrow}
            id="arch-practice-title"
            title={<Emph parts={t.architecture.practiceTitle} />}
          />
          <div className="practice__grid">
            {studies && (
              <article className="practice__item">
                <p className="practice__period">{studies.period}</p>
                <h3>{studies.programme}</h3>
                <p>
                  {[studies.institution, studies.note].filter(Boolean).join(' · ')}
                </p>
              </article>
            )}
            {studio && (
              <article className="practice__item">
                <p className="practice__period">{studio.period}</p>
                <h3>
                  <bdi>{studio.organisation}</bdi>
                </h3>
                <p>{studio.role}</p>
              </article>
            )}
            <article className="practice__item">
              <p className="practice__period">{t.architecture.tools}</p>
              <h3>{t.architecture.toolsTitle}</h3>
              <ul className="tool-list">
                {archTools.flatMap((g) => g.items).map((s) => (
                  <li key={s} dir="auto">{s}</li>
                ))}
              </ul>
              {course && (
                <p>
                  {course.programme}, {course.period}
                </p>
              )}
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
