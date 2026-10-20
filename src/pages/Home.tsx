import { Link } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { disciplines, education, experience, languages, profile, skills } from '../content/profile';
import { products } from '../content/products';
import { architectureProjects } from '../content/architecture';
import { ArchDrawing } from '../components/ArchDrawing';
import { DeviceMockup } from '../components/DeviceMockup';
import { Cta } from '../components/Cta';
import { Img } from '../components/Img';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { PortfolioBridge } from '../components/PortfolioBridge';
import { StatusBadge } from '../components/StatusBadge';
import { ArrowRight } from '../components/Icons';

export default function Home() {
  useDocumentMeta('', profile.intro, '/');
  const heroProject = architectureProjects[0];
  const [lead, ...others] = products;
  const cardSizes = ['large', 'small', 'wide'] as const;

  return (
    <>
      {/* ——— Hero ——— */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__intro">
          <p className="eyebrow hero__eyebrow">
            <span>{profile.name}</span>
            <span aria-hidden className="hero__eyebrow-rule" />
            <span>{profile.identity}</span>
          </p>
          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">{profile.headline[0]}</span>
            <span className="hero__line hero__line--italic">{profile.headline[1]}</span>
          </h1>
          <p className="hero__lede">{profile.intro}</p>
        </div>

        <div className="hero__diptych">
          <Link to="/architecture" className="panel panel--arch">
            <div className="panel__visual">
              {heroProject ? (
                <Img image={heroProject.cover} priority sizes="(min-width: 900px) 50vw, 100vw" />
              ) : (
                <ArchDrawing className="panel__drawing" />
              )}
            </div>
            <div className="panel__caption">
              <span className="panel__index">01</span>
              <span className="panel__label">Architecture</span>
              <span className="panel__keywords">Spatial design · Documentation · Visualization</span>
              <span className="panel__cta">
                Explore Architecture <ArrowRight size={16} />
              </span>
            </div>
          </Link>

          <Link to="/technology" className="panel panel--tech">
            <div className="panel__visual panel__visual--devices">
              {products.slice(0, 2).map((p, i) => (
                <DeviceMockup
                  key={p.slug}
                  product={p}
                  screen={p.screens[0]}
                  className={`panel__device panel__device--${i}`}
                  priority={i === 0}
                  showCaption={false}
                />
              ))}
            </div>
            <div className="panel__caption">
              <span className="panel__index">02</span>
              <span className="panel__label">Technology</span>
              <span className="panel__keywords">Digital products · UX · Product strategy</span>
              <span className="panel__cta">
                Explore Technology <ArrowRight size={16} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ——— Introduction ——— */}
      <section className="section intro" aria-labelledby="intro-title">
        <div className="container intro__grid">
          <SectionHeading
            index="00"
            eyebrow="Introduction"
            id="intro-title"
            title={
              <>
                Two disciplines, <em>one</em> way of thinking.
              </>
            }
          />
          <div className="intro__body">
            {profile.about.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <figure className="intro__portrait">
            <Img image={profile.portrait} sizes="(min-width: 900px) 40vw, 100vw" />
            <figcaption>
              {profile.name} · {profile.location}
            </figcaption>
          </figure>
          <div className="intro__columns">
            {[disciplines.architecture, disciplines.technology].map((d) => (
              <div key={d.label} className="intro__column">
                <h3 className="intro__column-title">{d.label}</h3>
                <ul className="keyword-list">
                  {d.keywords.map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Selected architecture ——— */}
      <section className="section section--stone" aria-labelledby="home-arch-title">
        <div className="container">
          <SectionHeading
            index="01"
            eyebrow="Architecture"
            id="home-arch-title"
            title={
              <>
                Selected <em>architectural</em> work
              </>
            }
          >
            <Cta to="/architecture" variant="text">
              All architecture
            </Cta>
          </SectionHeading>
          {architectureProjects.length > 0 ? (
            <div className="project-grid project-grid--home">
              {architectureProjects.slice(0, 3).map((p, i) => (
                <ProjectCard key={p.slug} project={p} index={i} size={cardSizes[i]} />
              ))}
            </div>
          ) : (
            <PortfolioBridge compact />
          )}
        </div>
      </section>

      {/* ——— Selected products ——— */}
      <section className="section section--warm" aria-labelledby="home-tech-title">
        <div className="container">
          <SectionHeading
            index="02"
            eyebrow="Technology"
            id="home-tech-title"
            title={
              <>
                Selected <em>digital</em> products
              </>
            }
          >
            <Cta to="/technology" variant="text">
              All products
            </Cta>
          </SectionHeading>

          <article className="feature-product">
            <div className="feature-product__visual">
              <DeviceMockup product={lead} screen={lead.screens[0]} showCaption={false} />
            </div>
            <div className="feature-product__body">
              <StatusBadge status={lead.status} />
              <h3 className="feature-product__name">{lead.name}</h3>
              <p className="feature-product__tagline">{lead.tagline}</p>
              <p>{lead.overview}</p>
              {lead.role && (
                <p className="meta-line">
                  {lead.role} · {lead.period}
                </p>
              )}
              <Cta to={`/technology#${lead.slug}`}>Read the case study</Cta>
            </div>
          </article>

          <div className="product-pair">
            {others.map((p) => (
              <article key={p.slug} className="product-tile">
                <Link to={`/technology#${p.slug}`} className="product-tile__link">
                  <div className="product-tile__visual">
                    <DeviceMockup product={p} screen={p.screens[0]} className="device--small" showCaption={false} />
                  </div>
                  <div className="product-tile__body">
                    <StatusBadge status={p.status} />
                    <h3 className="product-tile__name">{p.name}</h3>
                    <p>{p.tagline}</p>
                    <span className="product-tile__more">
                      {p.status === 'Concept' ? 'View concept' : 'View project'} <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ——— Background ——— */}
      <section className="section" aria-labelledby="home-bg-title">
        <div className="container background">
          <SectionHeading
            index="03"
            eyebrow="Background"
            id="home-bg-title"
            title={
              <>
                Architecture, product <em>and</em> entrepreneurship.
              </>
            }
          />
          <div className="background__cols">
            <div>
              <h3 className="background__label">Experience</h3>
              <ol className="timeline">
                {experience.map((e) => (
                  <li key={e.organisation + e.role}>
                    <span className="timeline__period">{e.period ?? 'Earlier'}</span>
                    <span className="timeline__role">{e.role}</span>
                    <span className="timeline__org">{e.organisation}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3 className="background__label">Education</h3>
              <ol className="timeline">
                {education.map((e) => (
                  <li key={e.programme}>
                    <span className="timeline__period">{e.period}</span>
                    <span className="timeline__role">{e.programme}</span>
                    {(e.institution || e.note) && (
                      <span className="timeline__org">
                        {[e.institution, e.note].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
              <h3 className="background__label background__label--spaced">Tools</h3>
              <ul className="tool-list">
                {skills.flatMap((g) => g.items).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <h3 className="background__label background__label--spaced">Languages</h3>
              <p className="background__languages">{languages.join(' · ')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ——— Contact CTA ——— */}
      <section className="closing" aria-labelledby="closing-title">
        <div className="container closing__inner">
          <p className="eyebrow">Contact</p>
          <h2 id="closing-title" className="closing__title">
            Have a project, an idea, or an opportunity <em>to discuss?</em>
          </h2>
          <div className="closing__actions">
            <Cta to="/contact" variant="solid">
              Let’s connect
            </Cta>
            <a className="cta cta--text cta--email" href={`mailto:${profile.email}`}>
              <span>{profile.email}</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
