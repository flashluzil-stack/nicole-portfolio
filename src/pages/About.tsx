import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n, Emph } from '../i18n';
import { CvLink } from '../components/CvLink';
import { Img } from '../components/Img';
import { ArrowUpRight, LinkedIn } from '../components/Icons';

/**
 * About page: who Nicole is, her full experience (from the CV, plus FIKS),
 * education, skills and languages, with the CV download and LinkedIn.
 */
export default function About() {
  const { t, c } = useI18n();
  const { profile, experience, architectureOffices, education, skills, languages } = c;
  useDocumentMeta(t.meta.aboutTitle, t.meta.about, '/about');

  // FIKS is not in the CV's experience list; show it after Place & Space.
  const fiks = architectureOffices.find((o) => o.id === 'fiks');
  const roles = experience.flatMap((e) =>
    e.id === 'place-space' && fiks
      ? [e, { id: fiks.id, role: fiks.role ?? '', organisation: fiks.organisation, period: fiks.period, bullets: fiks.bullets }]
      : [e],
  );

  return (
    <>
      <section className="section about-hero" aria-labelledby="about-title">
        <div className="container about-hero__grid">
          <figure className="about-hero__photo">
            <Img image={profile.portrait} sizes="(min-width: 1000px) 40vw, 100vw" priority />
          </figure>
          <div className="about-hero__text">
            <p className="eyebrow">{t.about.eyebrow}</p>
            <h1 id="about-title" className="arch-hero__title">
              <Emph parts={t.about.title} />
            </h1>
            <p>{profile.intro}</p>
            {profile.about.map((para) => (
              <p key={para}>{para}</p>
            ))}
            <div className="home-hero__actions">
              <CvLink variant="solid" />
              <a className="cta cta--line" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedIn size={16} />
                <span>{t.about.linkedin}</span>
                <ArrowUpRight size={14} />
                <span className="visually-hidden">{t.common.newTab}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--stone" aria-labelledby="about-exp-title">
        <div className="container about-grid">
          <div>
            <h2 id="about-exp-title" className="experience__label">
              {t.about.experience}
            </h2>
            <ul className="offices">
              {roles.map((o) => (
                <li key={o.id} className="office">
                  <div className="office__head">
                    <span className="office__name">{o.organisation}</span>
                    {o.period && <span className="office__period ltr">{o.period}</span>}
                  </div>
                  {o.role && <p className="office__role">{o.role}</p>}
                  {o.bullets && (
                    <ul className="office__bullets">
                      {o.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="experience__label">{t.about.education}</h2>
            <ul className="compact-list">
              {education.map((e) => (
                <li key={e.id}>
                  <span className="compact-list__main">{e.programme}</span>
                  <span className="compact-list__meta">
                    {e.institution && <>{e.institution} · </>}
                    <span className="ltr">{e.period}</span>
                  </span>
                  {e.note && <span className="compact-list__meta">{e.note}</span>}
                </li>
              ))}
            </ul>

            <h2 className="experience__label">{t.about.skills}</h2>
            <ul className="skill-groups">
              {skills.map((g) => (
                <li key={g.id}>
                  <span className="skill-groups__name">{g.group}</span>
                  <br />
                  <span className="skill-groups__items">{g.items.join(' · ')}</span>
                </li>
              ))}
            </ul>

            <h2 className="experience__label">{t.about.languages}</h2>
            <p className="skill-groups__items">{languages.join(' · ')}</p>
          </div>
        </div>
      </section>
    </>
  );
}
