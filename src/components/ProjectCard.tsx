import { Link } from 'react-router-dom';
import type { ArchitectureProject } from '../content/types';
import { Img } from './Img';

interface ProjectCardProps {
  project: ArchitectureProject;
  index: number;
  size?: 'large' | 'medium' | 'small' | 'wide';
  headingLevel?: 'h2' | 'h3';
}

export function ProjectCard({ project, index, size = 'medium', headingLevel: H = 'h3' }: ProjectCardProps) {
  return (
    <article className={`project-card project-card--${size}`}>
      <Link to={`/architecture/${project.slug}`} className="project-card__link">
        <div className={`project-card__media project-card__media--${project.cover.kind}`}>
          <Img image={project.cover} sizes="(min-width: 1000px) 50vw, 100vw" />
        </div>
        <div className="project-card__meta">
          <span className="project-card__index">{String(index + 1).padStart(2, '0')}</span>
          <H className="project-card__title">{project.title}</H>
          <p className="project-card__details">
            {[project.type, project.year, project.context].filter(Boolean).join(' · ')}
          </p>
        </div>
      </Link>
    </article>
  );
}
