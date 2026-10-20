import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { architectureProjects, getArchitectureProject } from '../content/architecture';
import type { ArchitectureSectionKind, MediaImage } from '../content/types';
import { Img } from '../components/Img';
import { Lightbox } from '../components/Lightbox';
import { ArrowLeft, ArrowRight, Download } from '../components/Icons';
import NotFound from './NotFound';

const sectionTitles: Record<ArchitectureSectionKind, string> = {
  concept: 'Concept & design intent',
  site: 'Site & context',
  plans: 'Plans',
  sections: 'Sections & elevations',
  diagrams: 'Diagrams',
  renderings: 'Renderings',
  interior: 'Interior views',
  exterior: 'Exterior views',
  materials: 'Material & spatial studies',
  technical: 'Technical documentation',
};

export default function ArchitectureProject() {
  const { slug = '' } = useParams();
  const project = getArchitectureProject(slug);
  const [viewer, setViewer] = useState<number | null>(null);

  useDocumentMeta(
    project?.title ?? 'Project not found',
    project?.summary ?? 'This project could not be found.',
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
        <nav className="project__crumbs" aria-label="Breadcrumb">
          <Link to="/architecture" className="back-link">
            <ArrowLeft size={16} /> Project index
          </Link>
        </nav>

        <header className="project__header">
          <p className="eyebrow">
            <span className="eyebrow__index">{String(i + 1).padStart(2, '0')}</span>
            {project.type}
          </p>
          <h1 id="project-title" className="project__title">
            {project.title}
          </h1>
          <dl className="project__facts">
            {project.year && (
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            <div>
              <dt>Type</dt>
              <dd>{project.type}</dd>
            </div>
            {project.context && (
              <div>
                <dt>Context</dt>
                <dd>{project.context}</dd>
              </div>
            )}
          </dl>
        </header>
      </div>

      <div className={`project__cover project__cover--${project.cover.kind}`}>
        <button type="button" className="zoomable" onClick={() => setViewer(0)}>
          <Img image={project.cover} priority sizes="100vw" />
          <span className="visually-hidden">Open cover image in fullscreen</span>
        </button>
      </div>

      <div className="container">
        <p className="project__summary">{project.summary}</p>

        {project.sections.map((section) => {
          const start = offset;
          offset += section.images.length;
          return (
            <section key={section.kind + start} className="project-section" aria-label={section.title ?? sectionTitles[section.kind]}>
              <div className="project-section__head">
                <h2>{section.title ?? sectionTitles[section.kind]}</h2>
                {section.text && <p>{section.text}</p>}
              </div>
              {section.images.length > 0 && (
                <ul className="project-section__images">
                  {section.images.map((img, k) => (
                    <li key={img.src} className={`plate plate--${img.kind}`}>
                      <button type="button" className="zoomable" onClick={() => setViewer(start + k)}>
                        <Img image={img} sizes={img.kind === 'drawing' ? '100vw' : '(min-width: 900px) 50vw, 100vw'} />
                        <span className="visually-hidden">Open “{img.alt}” in fullscreen</span>
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
              <span className="visually-hidden">(PDF, opens in a new tab)</span>
            </a>
          </p>
        )}

        <nav className="project-pager" aria-label="More projects">
          {hasNeighbours ? (
            <>
              <Link to={`/architecture/${prev.slug}`} className="project-pager__link">
                <span className="project-pager__dir">
                  <ArrowLeft size={16} /> Previous project
                </span>
                <span className="project-pager__title">{prev.title}</span>
              </Link>
              <Link to="/architecture" className="project-pager__index">
                All projects
              </Link>
              <Link to={`/architecture/${next.slug}`} className="project-pager__link project-pager__link--next">
                <span className="project-pager__dir">
                  Next project <ArrowRight size={16} />
                </span>
                <span className="project-pager__title">{next.title}</span>
              </Link>
            </>
          ) : (
            <Link to="/architecture" className="project-pager__index">
              All projects
            </Link>
          )}
        </nav>
      </div>

      <Lightbox images={gallery} index={viewer} onChange={setViewer} label={project.title} />
    </article>
  );
}
