import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { architectureProjects } from '../content/architecture';
import { disciplines, education, experience, profile, skills } from '../content/profile';
import { ProjectCard } from '../components/ProjectCard';
import { PortfolioBridge } from '../components/PortfolioBridge';
import { SectionHeading } from '../components/SectionHeading';
import { Cta } from '../components/Cta';

/** Rhythm of card sizes for the asymmetric index grid. */
const rhythm = ['large', 'small', 'small', 'wide', 'medium', 'medium'] as const;

export default function Architecture() {
  useDocumentMeta(
    'Architecture',
    'Architectural projects by Nicole Gofman — spatial design, technical documentation and visualization.',
    '/architecture',
  );

  const [params, setParams] = useSearchParams();
  const types = useMemo(() => [...new Set(architectureProjects.map((p) => p.type))], []);
  const active = params.get('type');
  const visible = active ? architectureProjects.filter((p) => p.type === active) : architectureProjects;

  const setFilter = (type: string | null) => {
    const next = new URLSearchParams(params);
    if (type) next.set('type', type);
    else next.delete('type');
    setParams(next, { replace: true });
  };

  const studio = experience.find((e) => e.organisation === 'Place & Space Architecture');
  const studies = education[0];
  const archTools = skills.filter((g) => g.group !== 'Digital products');

  return (
    <>
      <section className="page-hero page-hero--arch" aria-labelledby="arch-title">
        <div className="container page-hero__grid">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__index">02</span>Architecture
            </p>
            <h1 id="arch-title" className="page-hero__title">
              Space, drawn <em>with care.</em>
            </h1>
          </div>
          <div className="page-hero__lede">
            <p>
              Architecture is where my thinking begins: how a space is entered, crossed and lived in, how light and
              material shape it, and how it is communicated precisely — from the first sketch to the technical
              drawing.
            </p>
          </div>
        </div>
        <div className="container arch-keywords">
          <ul className="keyword-list keyword-list--inline">
            {disciplines.architecture.keywords.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="arch-index-title">
        <div className="container">
          <SectionHeading
            eyebrow="Project index"
            id="arch-index-title"
            title={
              <>
                Selected <em>projects</em>
              </>
            }
          />

          {architectureProjects.length === 0 ? (
            <PortfolioBridge />
          ) : (
            <>
              {types.length > 1 && (
                <div className="filters" role="group" aria-label="Filter projects by type">
                  <button
                    type="button"
                    className="filter"
                    aria-pressed={!active}
                    onClick={() => setFilter(null)}
                  >
                    All <span className="filter__count">{architectureProjects.length}</span>
                  </button>
                  {types.map((t) => (
                    <button
                      key={t}
                      type="button"
                      className="filter"
                      aria-pressed={active === t}
                      onClick={() => setFilter(t)}
                    >
                      {t}{' '}
                      <span className="filter__count">
                        {architectureProjects.filter((p) => p.type === t).length}
                      </span>
                    </button>
                  ))}
                </div>
              )}
              <p className="visually-hidden" aria-live="polite">
                Showing {visible.length} project{visible.length === 1 ? '' : 's'}
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
                  View the complete portfolio
                </Cta>
              </p>
            </>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="arch-practice-title">
        <div className="container practice">
          <SectionHeading
            eyebrow="Practice & studies"
            id="arch-practice-title"
            title={
              <>
                Learning in the studio, <em>working</em> in practice.
              </>
            }
          />
          <div className="practice__grid">
            {studies && (
              <article className="practice__item">
                <p className="practice__period">{studies.period}</p>
                <h3>{studies.programme}</h3>
                <p>
                  {studies.institution} · {studies.note}
                </p>
              </article>
            )}
            {studio && (
              <article className="practice__item">
                <p className="practice__period">{studio.period}</p>
                <h3>{studio.organisation}</h3>
                <p>{studio.role}</p>
              </article>
            )}
            <article className="practice__item">
              <p className="practice__period">Tools</p>
              <h3>Design, BIM &amp; visualization</h3>
              <ul className="tool-list">
                {archTools.flatMap((g) => g.items).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
