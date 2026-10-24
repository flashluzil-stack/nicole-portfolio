import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import type { MediaImage } from '../content/types';
import { useI18n, Emph } from '../i18n';
import { Img } from '../components/Img';
import { Lightbox } from '../components/Lightbox';
import { ArrowLeft, ArrowRight, Download } from '../components/Icons';
import NotFound from './NotFound';

export default function ArchitectureProject() {
  const { slug = '' } = useParams();
  const { t, c } = useI18n();
  const { architectureProjects } = c;
  const project = architectureProjects.find((p) => p.slug === slug);
  const [viewer, setViewer] = useState<number | null>(null);

  useDocumentMeta(
    project?.title ?? t.meta.notFoundTitle,
    project?.summary ?? t.meta.projectNotFound,
    `/architecture/${slug}`,
  );

  // One continuous gallery for the viewer: cover first, then every section image.
  const gallery = useMemo<MediaImage[]>(
    () => (project ? [project.cover, ...project.sections.flatMap((s) => s.images)] : []),
    [project],
  );

  if (!project) return <NotFound />;

  const i = architectureProjects.indexOf(project);
  const prev = architectureProjects[(i - 1 + architectureProjects.length) % architectureProjects.length];
  const next = architectureProjects[(i + 1) % architectureProjects.length];
  const hasNeighbours = architectureProjects.length > 1;
  let offset = 1;

  return (
    <article className="project" aria-labelledby="project-title">
      <div className="container">
        <nav className="project__crumbs" aria-label={t.project.breadcrumb}>
          <Link to="/architecture" className="back-link">
            <ArrowLeft size={16} /> {t.project.index}
          </Link>
        </nav>

        <header className="project__header">
          <p className="eyebrow">
            <span className="eyebrow__index">{String(i + 1).padStart(2, '0')}</span>
            {project.type}
          </p>
          <h1 id="project-title" className="project__title">
            <Emph parts={[project.title]} />
          </h1>
          <dl className="project__facts">
            {project.year && (
              <div>
                <dt>{t.project.year}</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            <div>
              <dt>{t.project.type}</dt>
              <dd>{project.type}</dd>
            </div>
            {project.context && (
              <div>
                <dt>{t.project.context}</dt>
                <dd>{project.context}</dd>
              </div>
            )}
          </dl>
        </header>
      </div>

      <div className={`project__cover project__cover--${project.cover.kind}`}>
        <button type="button" className="zoomable" onClick={() => setViewer(0)}>
          <Img image={project.cover} priority sizes="100vw" />
          <span className="visually-hidden">{t.project.openCover}</span>
        </button>
      </div>

      <div className="container">
        <p className="project__summary">{project.summary}</p>

        {project.sections.map((section) => {
          const start = offset;
          offset += section.images.length;
          // A section with neither images nor text has nothing to show.
          if (!section.text && section.images.length === 0) return null;
          return (
            <section key={section.kind + start} className="project-section" aria-label={section.title ?? t.project.sections[section.kind]}>
              <div className="project-section__head">
                <h2>{section.title ?? t.project.sections[section.kind]}</h2>
                {section.text && <p>{section.text}</p>}
              </div>
              {section.images.length > 0 && (
                <ul className="project-section__images">
                  {section.images.map((img, k) => (
                    <li key={img.src} className={`plate plate--${img.kind}`}>
                      <button type="button" className="zoomable" onClick={() => setViewer(start + k)}>
                        <Img image={img} sizes={img.kind === 'drawing' ? '100vw' : '(min-width: 900px) 50vw, 100vw'} />
                        <span className="visually-hidden">{t.project.openImage(img.alt)}</span>
                      </button>
                      {img.caption && <p className="plate__caption">{img.caption}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}

        {project.pdf && (
          <p className="project__pdf">
            <a href={project.pdf.href} className="cta cta--line" target="_blank" rel="noopener noreferrer">
              <span>{project.pdf.label}</span>
              <Download size={16} />
              <span className="visually-hidden">{t.common.pdfNewTab}</span>
            </a>
          </p>
        )}

        <nav className="project-pager" aria-label={t.project.more}>
          {hasNeighbours ? (
            <>
              <Link to={`/architecture/${prev.slug}`} className="project-pager__link">
                <span className="project-pager__dir">
                  <ArrowLeft size={16} /> {t.project.previous}
                </span>
                <span className="project-pager__title">{prev.title}</span>
              </Link>
              <Link to="/architecture" className="project-pager__index">
                {t.project.all}
              </Link>
              <Link to={`/architecture/${next.slug}`} className="project-pager__link project-pager__link--next">
                <span className="project-pager__dir">
                  {t.project.next} <ArrowRight size={16} />
                </span>
                <span className="project-pager__title">{next.title}</span>
              </Link>
            </>
          ) : (
            <Link to="/architecture" className="project-pager__index">
              {t.project.all}
            </Link>
          )}
        </nav>
      </div>

      <Lightbox images={gallery} index={viewer} onChange={setViewer} label={project.title} />
    </article>
  );
}
